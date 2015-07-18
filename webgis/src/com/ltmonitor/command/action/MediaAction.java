package com.ltmonitor.command.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;

/**
 * 下发媒体文件列表检索或媒体上传的指令
 * 
 * @author DELL
 * 
 */
public class MediaAction extends TerminalCommandAction {

	// 媒体类型 0：图像；1：音频；2：视频
	private int mediaType;
	// 通道
	private int channel;
	// 事件类型 0：平台下发指令；1：定时动作；2：抢劫报警触发；3：碰撞侧翻报警触发；其他保留
	private int eventType;

	private Date startDate;
	private Date endDate;
	// 删除标志 BYTE 0：保留；1：删除；
	private int saveType;

	private int commandId;
	// 单挑多媒体的记录Id
	private int mediaId;

	// 多媒体文件上传命令
	public String execute() {

		if (input != null)
			return "input";
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(mediaType).append(";").append(channel).append(";")
					.append(eventType).append(";")
					.append(DateUtil.datetimeToString(startDate)).append(';')
					.append(DateUtil.datetimeToString(endDate)).append(';')
					.append(saveType);

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_MEDIA_UPLOAD);
			tc.setCmdData(sb.toString());
			tc.setCmd("" + getMediaType());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	// 单挑多媒体上传
	public String singleUpload() {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(mediaId).append(";").append(saveType);

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_MEDIA_UPLOAD_SINGLE);
			tc.setCmdData(sb.toString());
			// tc.setCmd("" + getMediaType());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	// 多媒体文件列表检索
	public String search() {

		if (input != null)
			return "input";
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(mediaType).append(';').append(channel).append(';')
					.append(eventType).append(';')
					.append(DateUtil.datetimeToString(startDate)).append(';')
					.append(DateUtil.datetimeToString(endDate));

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_MEDIA_SEARCH);
			tc.setCmdData(sb.toString());
			tc.setCmd("" + getMediaType());
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	public String queryMediaInfo() {
		try {
			TerminalCommand tc = getTerminalCommand(commandId);
			BasicData bd = getBasicDataService().getBasicDataByCode(
					tc.getStatus(), "TCommandStatus");
			String status = bd != null ? bd.getName() : "";
			Map result = new HashMap();
			result.put("status", status);
			if (TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus())) {
				String hsql = "from MediaItem where commandId = ?";
				List data = this.getBaseService().query(hsql, commandId);
				result.put("data", data);
				return json(true, result);
			} else if (TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
					&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false) {
				return json(true, status);
			} else {
				return json(false, status);
			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
			return json(false, "查询时发送错误:" + ex.getMessage());
		}
	}

	public int getMediaType() {
		return mediaType;
	}

	public void setMediaType(int mediaType) {
		this.mediaType = mediaType;
	}

	public int getChannel() {
		return channel;
	}

	public void setChannel(int channel) {
		this.channel = channel;
	}

	public int getEventType() {
		return eventType;
	}

	public void setEventType(int eventType) {
		this.eventType = eventType;
	}

	public int getSaveType() {
		return saveType;
	}

	public void setSaveType(int saveType) {
		this.saveType = saveType;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public int getMediaId() {
		return mediaId;
	}

	public void setMediaId(int mediaId) {
		this.mediaId = mediaId;
	}

}
