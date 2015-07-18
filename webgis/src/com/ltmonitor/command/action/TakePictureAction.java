package com.ltmonitor.command.action;

import java.util.HashMap;
import java.util.List;

import org.jfree.util.Log;

import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.MediaItem;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 拍照/录像
 * 
 * @author DELL
 * 
 */
public class TakePictureAction extends TerminalCommandAction {

	// 通道
	private int channel;
	// 拍摄方式
	private int action;
	// 拍摄张数
	private int photoNum;
	// 拍摄时间
	private int interval;
	// 保存方式
	private int saveType;
	// 图片尺寸
	private int picSize;
	// 质量
	private int quality;
	// 亮度
	private int light;
	// 对比度
	private int compare;
	// 饱和度
	private int stature;
	// 色度
	private int grade;
	// 报警处理Id
	private int alarmId;

	public String execute() {
		if (input != null)
			return "input";

		try {
			if (action == 3)
				action = 0xFFFF;
			if (action == 2)
				action = photoNum;

			StringBuilder sb = new StringBuilder();
			sb.append(channel).append(";").append(action).append(";")
					.append(interval).append(";").append(saveType).append(";")
					.append(picSize).append(";").append(quality).append(";")
					.append(light).append(";").append(compare).append(";")
					.append(stature).append(";").append(grade);
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_TAKE_PHOTO);
			tc.setCmdData(sb.toString());
			SendCommand(tc);

			if (alarmId > 0)
				this.processAlarm(alarmId, AlarmRecord.PROCESS_TAKE_PICTURE);
			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			Log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}
/**
 * 获取拍照上传结果
 * 
 * @return true表示执行结束，false代表正在执行
 */
	public String queryResult() {
		HashMap result = new HashMap();		
		TerminalCommand tc = getTerminalCommand(commandId);

		BasicData bd = getBasicDataService().getBasicDataByCode(
				tc.getStatus(), "TCommandStatus");
		String status = bd != null ? bd.getName() : "";
		result.put("status", status);
		
		if (TerminalCommand.STATUS_UPLOADED.equals(tc.getStatus())) {
			String hsql = "from MediaItem where commandId = ?";
			MediaItem mi = (MediaItem) this.getBaseService().find(hsql,
					commandId);
			if (mi != null) {
				result.put("fileName", mi.getFileName());
				return json(true, result);
			} else
			{
				result.put("status", "没找到照片文件");
				return json(true, result);
			}
		}
		if (TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus())) {
			status = "执行成功，等待上传";
			result.put("status", status);
			return json(false, status);
		} else if (TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
				&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false) {
			return json(true, result);
		} else
			return json(false, status);
	}

	public int getChannel() {
		return channel;
	}

	public void setChannel(int channel) {
		this.channel = channel;
	}

	public int getAction() {
		return action;
	}

	public void setAction(int action) {
		this.action = action;
	}

	public int getPhotoNum() {
		return photoNum;
	}

	public void setPhotoNum(int photoNum) {
		this.photoNum = photoNum;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getSaveType() {
		return saveType;
	}

	public void setSaveType(int saveType) {
		this.saveType = saveType;
	}

	public int getPicSize() {
		return picSize;
	}

	public void setPicSize(int picSize) {
		this.picSize = picSize;
	}

	public int getQuality() {
		return quality;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public int getLight() {
		return light;
	}

	public void setLight(int light) {
		this.light = light;
	}

	public int getCompare() {
		return compare;
	}

	public void setCompare(int compare) {
		this.compare = compare;
	}

	public int getStature() {
		return stature;
	}

	public void setStature(int stature) {
		this.stature = stature;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}
	public int getAlarmId() {
		return alarmId;
	}
	public void setAlarmId(int alarmId) {
		this.alarmId = alarmId;
	}

}
