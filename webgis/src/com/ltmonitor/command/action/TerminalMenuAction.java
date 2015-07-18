package com.ltmonitor.command.action;

import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 菜单设置
 * 
 * @author DELL
 * 
 */
public class TerminalMenuAction extends TerminalCommandAction {
	// 信息点播的信息项目
	private String menuList;
	/**
	 * 信息项目设置类型, 0：删除终端全部信息项； 1：更新菜单； 2：追加菜单； 3：修改菜单
	 */
	private int configType;

	public String execute() {

		if (input != null)
			return "input";
		Map params = super.getParams();
		try {
			JSONArray arry = JSONArray.fromObject(params.get("inserted"));
			StringBuilder errorMsg = new StringBuilder();

			int rowNo = 1;
			this.menuList = "";
			if (configType > 0) {
				for (int m = 0; m < arry.size(); m++) {
					JSONObject mi = arry.getJSONObject(m);
					String ID = mi.getString("ID");
					String content = mi.getString("content");
					if (isNumeric(ID) == false)
						errorMsg.append("第一列").append(
								"第" + rowNo + "行必须为数字整数, ");
					if (StringUtil.isNullOrEmpty(content))
						errorMsg.append("第二列").append("第" + rowNo + "行不能为空, ");
					this.menuList += ID + "," + content + ";";
				}
				rowNo++;
			}
			if (errorMsg.length() > 0)
				return json(false, errorMsg.toString());

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_SET_MENU);
			tc.setCmdData(menuList);
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

	public String getMenuList() {
		return menuList;
	}

	public void setMenuList(String menuList) {
		this.menuList = menuList;
	}

	public int getConfigType() {
		return configType;
	}

	public void setConfigType(int configType) {
		this.configType = configType;
	}

}
