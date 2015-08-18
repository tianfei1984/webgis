package com.ltmonitor.command.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.Alarm;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;

public class TerminalCommandAction extends QueryAction {

	protected int vehicleId;

	protected String plateNo;

	private int page;

	private int rows;

	/**
	 * 终端下发的命令Id
	 */
	protected int commandId;

	private ITerminalService terminalService;

	protected IVehicleService vehicleService;

	@SuppressWarnings("rawtypes")
	private Map commandList = new HashMap();

	// 打开页面的Action 方法,不做操作，直接打开页面
	public String view() {
		return "view";
	}

	// 点名
	public String callNow() {
		if (input != null)
			return "input";
		try {
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_REAL_MONITOR);
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public String getCommandResult() {
		TerminalCommand tc = getTerminalCommand(commandId);
		BasicData bd = getBasicDataService().getBasicDataByCode(tc.getStatus(),
				"TCommandStatus");
		String status = bd != null ? bd.getName() : "";
		if (TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
				&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false) {
			return json(true, status);
		}

		return json(false, status);
	}

	protected void SendCommand(TerminalCommand tc) {
		SendCommand(tc,getVehicleId());
	}

	protected void SendCommand(TerminalCommand tc,int vId) {
		VehicleData vd = vehicleService.getVehicleData(vId);
		tc.setPlateNo(vd.getPlateNo());
		tc.setSimNo(vd.getSimNo());
		tc.setVehicleId(vd.getEntityId());
		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setUserId(onlineUser.getEntityId());
			tc.setOwner(onlineUser.getName());
			
			Integer cmdType = tc.getCmdType();
			String strCmd = Integer.toHexString(cmdType);
			while (strCmd.length() < 4)
				strCmd = "0" + strCmd;
			strCmd = "0x" + strCmd;
			String descr = JT808Constants.GetDescr(strCmd);
			
			this.LogOperation(vd.getPlateNo()+"下发" + descr + "[" + strCmd + "]命令");
			
			getTerminalService().SendCommand(tc);
		}
	}

	protected TerminalCommand getTerminalCommand(int commandId) {
		return (TerminalCommand) this.getBaseService().load(
				TerminalCommand.class, commandId);
	}

	/**
	 * 分页查询终端命令列表
	 * 
	 * @return
	 */
	public String query() {
		Map params = new HashMap();
		params.put("userId", this.getOnlineUser().getEntityId());//根据用户权限查询自己的终端命令
		//params.put("depIdList", super.getAuthorizedDepIdList());// 只查询本部门的车辆的终端上报消息
		String queryId = "selectTerminalCommand";
		if (getOnlineUser() != null) {
			// 只查询用户自己下发的命令
			// params.put("userId", getOnlineUser().getEntityId());
		}
		params.put("plateNo", this.plateNo);
		try {
			PageResult result = getQueryDao().queryByPagination(queryId,
					params, page, rows);
			for (Object obj : result.getResults()) {
				Map rowData = (Map) obj;

				Date createDate = (Date) rowData.get("createDate");
				rowData.put("createDate",
						DateUtil.toStringByFormat(createDate, "MM-dd HH:mm:ss"));

				Date updateDate = (Date) rowData.get("updateDate");
				rowData.put("updateDate",
						DateUtil.toStringByFormat(updateDate, "MM-dd HH:mm:ss"));

				Integer cmdType = (Integer) rowData.get("cmdType");
				String strCmd = Integer.toHexString(cmdType);
				while (strCmd.length() < 4)
					strCmd = "0" + strCmd;
				strCmd = "0x" + strCmd;
				String descr = JT808Constants.GetDescr(strCmd);
				rowData.put("cmdType", descr);

				String commandStatus = "" + rowData.get("status");
				BasicData bd = getBasicDataService().getBasicDataByCode(
						commandStatus, "TCommandStatus");
				if (bd != null) {
					rowData.put("status", bd.getName());
				}
			}
			getCommandList().put("total", result.getTotalCount());
			getCommandList().put("rows", result.getResults());

		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
		return "jsonSuccess";
	}

	/**
	 * 当发生报警时，需要进行拍照，监听，文本下发等命令下发时，同时更新处理报警信息
	 * 
	 * @param alarmId
	 */
	protected void processAlarm(int alarmId, int processType) {
		if (alarmId == 0)
			return;
		

		Alarm alarm = this.getAlarm(alarmId);
		alarm.setRemark("");
		alarm.setProcessed(processType);
		alarm.setProcessedTime(new Date());
		UserInfo onlineUser = this.getOnlineUser();
		if (onlineUser != null) {
			alarm.setProcessedUserId(onlineUser.getEntityId());
			alarm.setProcessedUserName(onlineUser.getName());
		}
		//this.getBaseService().saveOrUpdate(alarm);
		String tableName = "NewAlarm"
				+ DateUtil.toStringByFormat(new Date(), "yyyyMM");
		alarm.setTableName(tableName);
		String statementName = "updateAlarmProcessedState";
		this.getQueryDao().update(statementName, alarm);
		
		this.LogOperation(alarm.getPlateNo()+"报警处理");
		

		/**
		 * 809命令，主动上报转发给上级平台的报警处理结果
		 */
		JT809Command jc = new JT809Command();
		try {
			int subCmd = 0x1403;
			jc.setCmd(0x1400);
			jc.setSubCmd(subCmd);
			int result = 1;
			jc.setCmdData(alarm.getEntityId() + ";" + result);
			String hql = "from VehicleData where plateNo = ?";
			VehicleData vd = (VehicleData) this.getBaseService().find(hql,
					alarm.getPlateNo());
			jc.setPlateNo(vd.getPlateNo());
			jc.setPlateColor((byte) vd.getPlateColor());

			// UserInfo onlineUser = getOnlineUser();
			if (onlineUser != null) {
				jc.setOwner(onlineUser.getName());
				jc.setUserId(onlineUser.getEntityId());
			}
			this.getBaseService().save(jc);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
	}

	private Alarm getAlarm(int alarmId)
	{
		Map params = new HashMap();
		String tableName = "NewAlarm"
				+ DateUtil.toStringByFormat(new Date(), "yyyyMM");
		params.put("tableName", tableName);// 报警数据是一个月一张表
		params.put("alarmId", alarmId);
		//Date date = DateUtil.getDate(new Date(), Calendar.MINUTE, -2); // 当前一分钟内产生的报警
		//params.put("startTime", date);
		String queryId = "selectNewAlarms";
		result = this.getQueryDao().queryForList(queryId, params);
		//result = filterAlarmResult(result);
		Alarm alarm = new Alarm();
		// alarmData.put("alarm", result);
		if (result.size() > 0)
		{
			Map a = (Map) result.get(0);
			//this.convert(a);
			alarm.setEntityId((Integer)a.get("id"));
			alarm.setVehicleId((Integer)a.get("vehicleId"));
			if(a.containsKey("ackSn"))
			  alarm.setAckSn((Integer)a.get("ackSn"));
			alarm.setPlateNo(""+a.get("plateNo"));
			alarm.setAlarmType(""+a.get("alarmTypeDescr"));
			alarm.setLocation(""+a.get("location"));
			if(a.get("remark")!=null)
			   alarm.setRemark(""+a.get("remark"));
			else
				alarm.setRemark("已处理");
			alarm.setAlarmTime((Date)a.get("alarmTime"));
		}
		
		return alarm;		
	}

	protected static boolean isNumeric(String str) {
		if (str.matches("\\d*")) {
			return true;
		}
		return false;
	}

	public Map getCommandList() {
		return commandList;
	}

	public void setCommandList(Map commandList) {
		this.commandList = commandList;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public ITerminalService getTerminalService() {
		return terminalService;
	}

	public void setTerminalService(ITerminalService terminalService) {
		this.terminalService = terminalService;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}
}
