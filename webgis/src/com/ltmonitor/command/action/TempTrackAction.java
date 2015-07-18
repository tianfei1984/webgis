package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 临时位置跟踪
 * 
 * @author DELL
 * 
 */
public class TempTrackAction extends TerminalCommandAction {

	// 上报时间间隔
	private int interval;
	// 有效期
	private int timeSpan;

	// 监听命令 或者电话回拨
	public String execute() {
		try {
			if (input != null)
				return "input";
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_TEMP_TRACK);
			tc.setCmdData(getInterval() + ";" + getTimeSpan());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getTimeSpan() {
		return timeSpan;
	}

	public void setTimeSpan(int timeSpan) {
		this.timeSpan = timeSpan;
	}

}
