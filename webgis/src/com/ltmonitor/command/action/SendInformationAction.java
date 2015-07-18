package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.web.action.PersistenceAction;

/**
 * 信息服务下发
 * 
 */
public class SendInformationAction extends TerminalCommandAction {
	private int vehicleId;
	// 下发的文本内容
	private String textContent;
	/**
	 * 信息类型
	 */
	private int configType;

	public String execute() {

		if (input != null)
			return "input";
		try {
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_INFORMATION);
			tc.setCmdData(configType + ";" + getTextContent());
			tc.setCmd("" + getConfigType());

			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public String view() {
		return "view";
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public int getConfigType() {
		return configType;
	}

	public void setConfigType(int configType) {
		this.configType = configType;
	}

	public String getTextContent() {
		return textContent;
	}

	public void setTextContent(String textContent) {
		this.textContent = textContent;
	}

}
