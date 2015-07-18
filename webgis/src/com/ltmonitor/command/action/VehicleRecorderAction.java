package com.ltmonitor.command.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.VehicleRecorder;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.ClassInstantiateException;

/**
 * 车辆行驶记录仪查询
 * 
 * @author Administrator
 * 
 */
public class VehicleRecorderAction extends TerminalCommandAction {

	private String cmdType;

	private int commandId;

	private String operation;
	
	private Date startDate;
	
	private Date endDate;
	
	private String ver;

	public VehicleRecorderAction() {

	}

	// 获取命令下发的结果
	public String queryResult() {
		TerminalCommand tc = getTerminalCommand(commandId);
		if (TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus()) == false) {
			BasicData bd = this.getBasicDataService().getBasicDataByCode(
					tc.getStatus(), "TCommandStatus");
			String msg = bd != null ? bd.getName() : "";
			return json(false, msg);
		}
		String hsql = "from VehicleRecorder where commandId = ?";
		List result = this.getBaseService().query(hsql, commandId);
		if (result.size() > 0) {
			Map resultMap = new HashMap();
			int cmd = Integer.parseInt(tc.getCmd());
			if (cmd == 1) {
				VehicleRecorder vr = (VehicleRecorder) result.get(0);
				String data = vr.getCmdData();
				String[] strData = data.split(",");
				if (strData.length >= 2) {
					resultMap.put("driverNo", strData[0]);
					resultMap.put("driverLicense", strData[1]);
				}
			}else if(cmd == 2)
			{
				VehicleRecorder vr = (VehicleRecorder) result.get(0);
				String data = vr.getCmdData();
				//String[] strData = data.split(",");.
				resultMap.put("clock", data);
			}else if(cmd == 4)
			{
				VehicleRecorder vr = (VehicleRecorder) result.get(0);
				String data = vr.getCmdData();
				//String[] strData = data.split(",");.
				resultMap.put("feature", data);
			}
			return json(true, resultMap);

		}
		return json(false, result);
	}
	

	public String queryRecorderResult()
	{
		TerminalCommand tc = getTerminalCommand(commandId);
		if(TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus()) == false)
		{
			return json(false, "");
		}
		String hsql = "from MediaItem where commandId = ?";
		List result = this.getBaseService().query(hsql, commandId);
		return json(true, result);
	}
	

	/**
	 * 行车记录仪设置和数据采集
	 */
	public String execute() {
		if(ver != null)
		{
			return "input2012";
		}
		if (input != null)
			return "input";
		// 数据采集
		if ("query".equals(operation)) {
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_VEHICLE_RECORDER);

			Integer cmd = JT808Constants.getRecorderCmd(cmdType);
			if (cmd != null) {
				tc.setCmd("" + cmd);
				tc.setCmdData("" + cmd+";"+startDate+";"+ endDate);
			}
			this.SendCommand(tc);
			return json(true, tc);
		}

		Map parameters = super.getParams();
		RecorderParam rp = new RecorderParam();
		try {
			BeanUtils.copyProperties(rp, parameters);

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_VEHICLE_RECORDER_CONFIG);

			Integer cmd = JT808Constants.getRecorderCmd("set" + cmdType);
			if (cmd != null) {
				tc.setCmd("" + cmd);
			}
			StringBuilder sb = new StringBuilder();
			if ("vehicleInfo".equals(cmdType)) {// 存储的车辆VIN号、车牌号码、分类
				sb.append(cmd).append(";").append(rp.getVin()).append(";")
						.append(rp.getVehicleNo()).append(";")
						.append(rp.getVehicleType()).append(";");
			} else if ("clock".equals(cmdType)) {
				sb.append(cmd).append(";").append(rp.getClock());
			} else if ("driverInfo".equals(cmdType)) {
				sb.append(cmd).append(";").append(rp.getDriverNo()).append(";")
						.append(rp.getDriverLicense());
			} else if ("feature".equals(cmdType)) {
				sb.append(cmd).append(";").append(rp.getFeature());
			}
			tc.setCmdData(sb.toString());
			this.SendCommand(tc);
			return json(true, tc);

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String getCmdType() {
		return cmdType;
	}

	public void setCmdType(String cmdType) {
		this.cmdType = cmdType;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getVer() {
		return ver;
	}

	public void setVer(String ver) {
		this.ver = ver;
	}

}
