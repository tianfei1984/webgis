package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 下发监听命令
 * 
 * @author DELL
 * 
 */
public class AudioRecorderAction extends TerminalCommandAction {

	// 操作方式
	private int action;
	// 录音时间
	private int interval;
	// 保存方式
	private int saveType;

	private int frequency;

	// 监听命令 或者电话回拨
	public String execute() {

		if (input != null)
			return "input";
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(action).append(';').append(interval).append(';')
					.append(saveType).append(';').append(frequency);

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_AUDIO_RECORDER);
			tc.setCmdData(sb.toString());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public int getAction() {
		return action;
	}

	public void setAction(int action) {
		this.action = action;
	}

	public int getSaveType() {
		return saveType;
	}

	public void setSaveType(int saveType) {
		this.saveType = saveType;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getFrequency() {
		return frequency;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}

}
