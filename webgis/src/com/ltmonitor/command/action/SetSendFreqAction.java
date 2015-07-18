package com.ltmonitor.command.action;

import java.util.ArrayList;
import java.util.List;

import com.ltmonitor.entity.Enclosure;
import com.ltmonitor.entity.EnclosureBinding;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.IBaseService;

/**
 * 设置发送频率
 * 
 * @author DELL
 * 
 */
public class SetSendFreqAction extends TerminalCommandAction {

	private String strVehicleIds;
	
	private int freq;

	private IBaseService baseService;

	public String execute() {
		if (input != null)
			return "input";
		if (getStrVehicleIds() == null) {
			// this.setMessage("请选择要下发的区域");
			return json(false, "请选择要下发的车辆!");
		}
		int commandId = 0;
		try {
			String[] strVehicleId = getStrVehicleIds().split(",");
			for (String strId : strVehicleId) {
				int id = Integer.parseInt(strId);
				createCommand(id);
			}
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
		return json(true, commandId);
	}


	private TerminalCommand createCommand(int vehicleId) {

		TerminalCommand tc = new TerminalCommand();
		tc.setCmdType(JT808Constants.CMD_CONFIG_PARAM);
		int paramId = 0x0029;
		String cmdData = paramId + "," + freq;
		tc.setCmdData(cmdData.toString());
		VehicleData vd = vehicleService.getVehicleData(vehicleId);
		tc.setPlateNo(vd.getPlateNo());
		tc.setSimNo(vd.getSimNo());
		tc.setVehicleId(vd.getEntityId());
		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setUserId(onlineUser.getEntityId());
			tc.setOwner(onlineUser.getName());
		}
		getTerminalService().SendCommand(tc);
		return tc;

	}

	public IBaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}


	public String getStrVehicleIds() {
		return strVehicleIds;
	}


	public void setStrVehicleIds(String strVehicleIds) {
		this.strVehicleIds = strVehicleIds;
	}


	public int getFreq() {
		return freq;
	}


	public void setFreq(int freq) {
		this.freq = freq;
	}

}
