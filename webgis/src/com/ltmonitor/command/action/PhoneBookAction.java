package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

public class PhoneBookAction extends TerminalCommandAction {
	// 信息点播的信息项目
	/**
	 * 信息项目设置类型, 0：删除终端全部信息项； 1：更新菜单； 2：追加菜单； 3：修改菜单
	 */
	private int configType;
	private int[] tagIds;

	private String[] phoneNumbers;

	private String[] contacts;

	public String execute() {

		try {
			if (input != null)
				return "input";
			StringBuilder sb = new StringBuilder();
			for (int m = 0; m < tagIds.length; m++) {
				sb.append(tagIds[m]).append(",").append(phoneNumbers[m])
						.append(",").append(contacts[m]).append(";");
			}
			
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_PHONE_BOOK);
			tc.setCmdData(sb.toString());
			tc.setCmd("" + getConfigType());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(true, e.getMessage());
		}
	}

	public int getConfigType() {
		return configType;
	}

	public void setConfigType(int configType) {
		this.configType = configType;
	}


	public int[] getTagIds() {
		return tagIds;
	}

	public void setTagIds(int[] tagIds) {
		this.tagIds = tagIds;
	}

	public String[] getPhoneNumbers() {
		return phoneNumbers;
	}

	public void setPhoneNumbers(String[] phoneNumbers) {
		this.phoneNumbers = phoneNumbers;
	}

	public String[] getContacts() {
		return contacts;
	}

	public void setContacts(String[] contacts) {
		this.contacts = contacts;
	}

}
