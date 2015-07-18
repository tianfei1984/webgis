package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 数据透明传输下行
 * 
 * @author DELL
 * 
 */
public class TransparentSendAction extends TerminalCommandAction {

	// 消息类型
	private int msgType;
	// 格式 hex 表示16进制，txt表示文本
	private String msgFormat;
	// 内容
	private String msgContent;

	// 监听命令 或者电话回拨
	public String execute() {

		if (input != null)
			return "input";
		TerminalCommand tc = new TerminalCommand();
		try {
			tc.setCmdType(JT808Constants.CMD_TRANS);
			tc.setCmdData(msgFormat + ";" + msgType + ";" + msgContent);
			SendCommand(tc);
			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}

	public int getMsgType() {
		return msgType;
	}

	public void setMsgType(int msgType) {
		this.msgType = msgType;
	}

	public String getMsgFormat() {
		return msgFormat;
	}

	public void setMsgFormat(String msgFormat) {
		this.msgFormat = msgFormat;
	}

	public String getMsgContent() {
		return msgContent;
	}

	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}
}
