package com.ltmonitor.command.action;

import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 下发监听命令
 * 
 * @author DELL
 * 
 */
public class ListenTerminalAction extends TerminalCommandAction {

	// 监听类型
	private int listenType;
	// 监听电话
	private String phoneNo;
	// 报警处理Id
	private int alarmId;

	// 监听命令 或者电话回拨
	public String execute() {
		try {
			if (input != null)
				return "input";
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_DIAL_BACK);
			tc.setCmdData(listenType + ";" + phoneNo);
			tc.setCmd("" + listenType);
			SendCommand(tc);

			if (alarmId > 0)
				this.processAlarm(alarmId, AlarmRecord.PROCESS_LISTEN);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public int getListenType() {
		return listenType;
	}

	public void setListenType(int listenType) {
		this.listenType = listenType;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public int getAlarmId() {
		return alarmId;
	}

	public void setAlarmId(int alarmId) {
		this.alarmId = alarmId;
	}

}
