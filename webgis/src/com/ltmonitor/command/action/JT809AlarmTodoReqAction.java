package com.ltmonitor.command.action;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.T809Constants;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.entity.WarnMsgUrgeTodoReq;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.GenericAction;
import com.ltmonitor.web.action.QueryAction;
/**
 * 报警督办
 * @author Administrator
 *
 */
public class JT809AlarmTodoReqAction extends QueryAction {

	private int vehicleId;

	private ITerminalService terminalService;

	private IVehicleService vehicleService;
	
	//分页查询的属性
	private int page;

	private int start;

	private int rows;

	private Map commandList = new HashMap();
		
	private int msgId;

	private Map entity = new HashMap();

	/**
	 * 查看报警督办应答
	 * 
	 * @return
	 */
	public String view() {
		WarnMsgUrgeTodoReq req = (WarnMsgUrgeTodoReq) this.getBaseService()
				.load(WarnMsgUrgeTodoReq.class, msgId);
		BasicData bd = getBasicDataService().getBasicDataByCode(""+req.getWarnSrc(), "GovAlarmSrc");
		String warnSrc = bd != null ? bd.getName() : "";
		entity.put("warnSrc", warnSrc);
		
		bd = getBasicDataService().getBasicDataByCode(""+req.getWarnType(), "GovAlarmType");
		String warnType = bd != null ? bd.getName() : "";
		entity.put("warnSrc", warnType);
		entity.put("warnTime", req.getWarnTime());
		entity.put("plateNo", req.getPlateNo());

		bd = getBasicDataService().getBasicDataByCode(""+req.getPlateColor(), "PlateColor");
		String plateColor = bd != null ? bd.getName() : "";
		entity.put("plateColor", plateColor);

		entity.put("supervicsionId", req.getSupervicsionId());
		entity.put("supervisionEndtime", req.getSupervisionEndtime());
		entity.put("supervisionLevel", req.getSupervisionLevel() == 0 ? "紧急" : "一般");
		entity.put("supervisor", req.getSupervisor());
		entity.put("supervisorTel", req.getSupervisorTel());
		entity.put("supervisorEmail", req.getSupervisorEmail());
		
		return "success";
	}
	
	
	/**
	 * 分页查询终端命令列表
	 * 
	 * @return
	 */
	public String query() {
		Map params = new HashMap();
		String queryId = "selectMsgTodoReq";
		if(getOnlineUser() != null)
		{
			//只查询用户自己下发的命令
			params.put("userId", getOnlineUser().getEntityId());
		}
		try {
			PageResult result = getQueryDao().queryByPagination(queryId,
					params, page, rows);
			for(Object obj : result.getResults())
			{
				
				Map rowData = (Map)obj;
				String warnSrc = ""+rowData.get("warnSrc");
				String warnType = ""+rowData.get("warnType");
				
				String supervisionLevel = ""+rowData.get("supervisionLevel");
				
				supervisionLevel = "0".equals(supervisionLevel) ? "紧急" : "一般";

				rowData.put("supervisionLevel", supervisionLevel);
				
				BasicData bd = getBasicDataService().getBasicDataByCode(warnSrc, "GovAlarmSrc");
				warnSrc = bd != null ? bd.getName() : "";
				rowData.put("warnSrc", warnSrc);
				
				bd = getBasicDataService().getBasicDataByCode(warnType, "GovAlarmType");
				warnType = bd != null ? bd.getName() : "";
				rowData.put("warnType", warnType);

				String plateColor = ""+rowData.get("plateColor");
				bd = getBasicDataService().getBasicDataByCode(plateColor, "plateColor");
				plateColor  = bd != null ? bd.getName() : "";
				rowData.put("plateColor", plateColor);
				
				Date warnTime = (Date) rowData.get("warnTime");
				rowData.put("warnTime",
						DateUtil.toStringByFormat(warnTime, "MM-dd HH:mm:ss"));

				Date supervisionEndTime = (Date) rowData.get("supervisionEndTime");
				rowData.put("supervisionEndtime",
						DateUtil.toStringByFormat(supervisionEndTime, "MM-dd HH:mm:ss"));
			}
			getCommandList().put("total", result.getTotalCount());
			getCommandList().put("rows", result.getResults());
			
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
		return "jsonSuccess";
	}

	protected void SendCommand(JT809Command tc) {
		if (vehicleId > 0) {
			VehicleData vd = vehicleService.getVehicleData(getVehicleId());
			tc.setPlateNo(vd.getPlateNo());
			tc.setPlateColor((byte)vd.getPlateColor());
		}
		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setOwner(onlineUser.getName());
			tc.setUserId(onlineUser.getEntityId());
		}
		getTerminalService().SendPlatformCommand(tc);
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

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}


	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
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


	public int getMsgId() {
		return msgId;
	}


	public void setMsgId(int msgId) {
		this.msgId = msgId;
	}


	public Map getEntity() {
		return entity;
	}


	public void setEntity(Map entity) {
		this.entity = entity;
	}


	public int getRows() {
		return rows;
	}


	public void setRows(int rows) {
		this.rows = rows;
	}

}
