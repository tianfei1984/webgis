package com.ltmonitor.command.action;

import java.util.ArrayList;
import java.util.List;

import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.IBasicDataService;
/**
 * 终端参数配置和查询
 * @author DELL
 *
 */
public class TerminalParamAction extends TerminalCommandAction {

	private IBasicDataService basicDataService;

	private List<BasicData> paramTemplateData;

	private String paramType; // 参数类型分类

	// 要查询或者修改的参数Id列表
	private String[] paramId;
	// 要修改的参数值
	private String[] paramValue;

	private String operation;
	// 要查询命令返回结果的下发命令Id
	private int commandId;
	
	private String allSelectedVehicle;

	public String execute() {
		if ("modify".equals(operation)
				&& (paramId == null || paramId.length == 0))
			return json(false, "请选择要修改的参数！");
		int m = 0;
		try {
			StringBuilder cmdData = new StringBuilder();
			if (paramId != null) {
				for (String id : paramId) {
					int index = id.indexOf("0x");
					if (index >= 0)
						id = id.substring(index + 2);
					int intValue = Integer.valueOf(id, 16);
					cmdData.append(intValue);
					if ("modify".equals(operation))
						cmdData.append(",").append(paramValue[m]);
					cmdData.append(';');
					m++;
				}
			}
			TerminalCommand tc = new TerminalCommand();
			if ("modify".equals(operation))
			{
				tc.setCmdType(JT808Constants.CMD_CONFIG_PARAM);
				if("on".equals(allSelectedVehicle))
				{
					String REGISTER_KEY = "registerVehicleIds";
					List<Integer> vehicleIdList = (List<Integer>) getSession()
							.get(REGISTER_KEY);
					if (vehicleIdList != null && vehicleIdList.size() > 1) {
						TerminalCommand command = new TerminalCommand();
						command.setCmdData(cmdData.toString());
						command.setCmdType(JT808Constants.CMD_CONFIG_PARAM);
						for (int vId : vehicleIdList)
						{
							if(vId != vehicleId)
							SendCommand(command,vId);
						}
					}
				}
				
			}
			else
				tc.setCmdType(JT808Constants.CMD_QUERY_PARAM);
			tc.setCmdData(cmdData.toString());
			SendCommand(tc);
			
			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}

	public String queryTerminalParam() {

		TerminalCommand tc = getTerminalCommand(commandId);
		BasicData bd = getBasicDataService().getBasicDataByCode(tc.getStatus(),
				"TCommandStatus");
		String status = bd != null ? bd.getName() : "";

		if (TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus()) == false) {
			if (TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
					&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false) {
				return json(true, status);
			}
			return json(false, status);
		}
		//如果是修改参数，则不返回查询结果，只有是查询参数，才返回查询结果
		if ("modify".equals(operation)) {
			return json(true, status);
		}
		String hsql = "from TerminalParam where commandId = ?";
		List result = this.getBaseService().query(hsql, commandId);
		if (result.size() == 0)
			return json(false, "");
		return json(true, result);
	}
	
	public String overSpeedConfig()
	{
		if (input != null)
			return "input";
		return execute();
	}
	

	public String tiredConfig()
	{
		if (input != null)
			return "input";
		return execute();
	}
	

	public String getTemplate() {
		if (input != null)
			paramType = "common";

		List<BasicData> result = basicDataService
				.getBasicDataByParentCode("TerminalParam");
		if (paramTemplateData == null)
			paramTemplateData = new ArrayList();
		for (BasicData bd : result) {
			if (StringUtil.isNullOrEmpty(paramType) == false
					&& paramType.equals(bd.getCode()) == false)
				continue;
			this.paramTemplateData.add(bd);
		}
		getRequest().setAttribute("paramTemplateData", result);
		return "success";
	}

	public IBasicDataService getBasicDataService() {
		return basicDataService;
	}

	public void setBasicDataService(IBasicDataService basicDataService) {
		this.basicDataService = basicDataService;
	}

	public List getParamTemplateData() {
		return paramTemplateData;
	}

	public void setParamTemplateData(List paramTemplateData) {
		this.paramTemplateData = paramTemplateData;
	}

	public String[] getParamValue() {
		return paramValue;
	}

	public void setParamValue(String[] paramValue) {
		this.paramValue = paramValue;
	}

	public String[] getParamId() {
		return paramId;
	}

	public void setParamId(String[] paramId) {
		this.paramId = paramId;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public String getParamType() {
		return paramType;
	}

	public void setParamType(String paramType) {
		this.paramType = paramType;
	}

	public String getAllSelectedVehicle() {
		return allSelectedVehicle;
	}

	public void setAllSelectedVehicle(String allSelectedVehicle) {
		this.allSelectedVehicle = allSelectedVehicle;
	}

}
