package com.ltmonitor.command.action;

import java.util.Map;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 事件设置
 * 
 * @author DELL
 * 
 */
public class TerminalEventAction extends TerminalCommandAction {
	// 信息点播的信息项目
	private String eventList;
	/**
	 * 信息项目设置类型, 0：删除终端全部事件项； 1：更新事件； 2：追加事件； 3：修改事件 4:删除指定事件
	 */
	private int configType;

	public String execute() {

		if (input != null)
			return "input";
		// eventList = eventList.replaceAll("\\],\\[", ";").replaceAll("\"", "")
		// .replaceAll("\\[", "").replaceAll("\\]", "");
		try {
			Map params = super.getParams();

			JSONArray arry = JSONArray.fromObject(params.get("inserted"));
			String eventList = "";
			StringBuilder errorMsg = new StringBuilder();
			int rowNo = 1;
			if (configType > 0) {
				for (int m = 0; m < arry.size(); m++) {
					JSONObject mi = arry.getJSONObject(m);
					if(mi.isNullObject())
					{
						return json(false,"请录入事件");
					}
					String ID = mi.getString("ID");
					String content = mi.getString("content");
					if (isNumeric(ID) == false)
						errorMsg.append("第一列").append(
								"第" + rowNo + "行必须为数字整数, ");
					if (configType != 4 && StringUtil.isNullOrEmpty(content))
						errorMsg.append("第二列").append("第" + rowNo + "行不能为空, ");
					eventList += ID + "," + content + ";";

					rowNo++;
				}
			}

			if (errorMsg.length() > 0)
				return json(false, errorMsg.toString());

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_EVENT_SET);
			tc.setCmdData(eventList);
			tc.setCmd("" + getConfigType());
			SendCommand(tc);
			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	public static boolean isNumeric(String str) {
		if (str.matches("\\d*")) {
			return true;
		}
		return false;
	}

	public int getConfigType() {
		return configType;
	}

	public void setConfigType(int configType) {
		this.configType = configType;
	}

	public String getEventList() {
		return eventList;
	}

	public void setEventList(String eventList) {
		this.eventList = eventList;
	}

}
