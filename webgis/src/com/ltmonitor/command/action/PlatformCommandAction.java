package com.ltmonitor.command.action;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.apache.struts2.json.annotations.JSON;
import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.T809Constants;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;
/**
 * 平台命令
 * @author tianfei
 *
 */
public class PlatformCommandAction extends QueryAction {

	private int vehicleId;
	// 命令Id
	private int commandId;

	private String platformCmdType;

	private Date startDate;

	private Date endDate;

	private ITerminalService terminalService;

	private IVehicleService vehicleService;

	// 分页查询的属性
	private int page;

	private int rows;

	private int start;

	private int limit;

	private Map commandList = new HashMap();

	private int linkCmd;

	public PlatformCommandAction() {
		endDate = new Date();
		startDate = DateUtil.getDate(endDate, Calendar.HOUR, -24);
	}

	public String execute() {
		if (input != null)
			return "input";

		JT809Command jc = new JT809Command();
		if (StringUtil.isNullOrEmpty(platformCmdType) == false) {
			try {
				int subCmd = Integer.valueOf(platformCmdType, 16);
				jc.setCmd(0x1200);
				jc.setSubCmd(subCmd);
				jc.setCmdData(DateUtil.datetimeToString(startDate) + ";"
						+ DateUtil.datetimeToString(endDate));
				SendCommand(jc);

				return json(true, jc.getEntityId());
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
				return json(false, ex.getMessage());
			}
		} else
			return json(false, "命令不能为空");
	}

	/**
	 * 关闭平台连接 link : mainLink 主连接 subLink 从连接
	 * 
	 * @return
	 */
	public String sendLinkRequest() {
		JT809Command jc = new JT809Command();

		if (getLinkCmd() > 0) {
			jc.setCmd(getLinkCmd());
			try {
				SendCommand(jc);

				return json(true, jc.getEntityId());
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
				return json(false, ex.getMessage());
			}
		} else
			return json(false, "命令不能为空");
	}

	/**
	 * 分页查询JT809命令列表
	 * @return
	 */
	public String query() {
		Map<String, Integer> params = new HashMap<String, Integer>();
		String queryId = "selectJT809Command";
		//TODO:userId与后台SQL不一致
		if (getOnlineUser() != null) {
			// 只查询用户自己下发的命令
			params.put("userId", getOnlineUser().getEntityId());
		}
		try {
			PageResult result = getQueryDao().queryByPagination(queryId,
					params, page, rows);
			for (Object obj : result.getResults()) {
				Map rowData = (Map) obj;
				Integer cmdType = (Integer) rowData.get("cmd");
				Integer subType = (Integer) rowData.get("subCmd");
				subType = subType == 0 ? cmdType : subType;
				String subDescr = T809Constants.getMsgDescr(subType);

				String strCmd = "0x" + Integer.toHexString(cmdType);
				subDescr = "[" + "0x" + Integer.toHexString(subType) + "]"
						+ subDescr;

				rowData.put("cmdType", strCmd);
				rowData.put("subDescr", subDescr);
				String plateColor = "" + rowData.get("plateColor");
				BasicData bd = getBasicDataService().getBasicDataByCode(
						plateColor, "plateColor");
				plateColor = bd != null ? bd.getName() : "";
				rowData.put("plateColor", plateColor);

				String commandStatus = "" + rowData.get("status");
				bd = getBasicDataService().getBasicDataByCode(commandStatus,
						"TCommandStatus");
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

	protected void SendCommand(JT809Command tc) {
		if (vehicleId > 0) {
			VehicleData vd = vehicleService.getVehicleData(getVehicleId());
			tc.setPlateNo(vd.getPlateNo());
			tc.setPlateColor((byte) vd.getPlateColor());
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

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getPlatformCmdType() {
		return platformCmdType;
	}

	public void setPlatformCmdType(String platformCmdType) {
		this.platformCmdType = platformCmdType;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}
	@JSON(format="yyyy-MM-dd HH:mm:ss")
	public Map getCommandList() {
		return commandList;
	}

	public void setCommandList(Map commandList) {
		this.commandList = commandList;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
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

	public int getLinkCmd() {
		return linkCmd;
	}

	public void setLinkCmd(int linkCmd) {
		this.linkCmd = linkCmd;
	}

}
