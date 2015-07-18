package com.ltmonitor.command.action;

import java.util.Date;

import org.apache.commons.lang.ArrayUtils;

import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.web.action.PersistenceAction;

public class SendTextAction extends TerminalCommandAction {
	// 下发的文本内容
	private String textContent;
	/**
	 * 文本信息设置类型 0 1：紧急 1 保留 2 1：终端显示器显示 3 1：终端TTS播读 4 1：广告屏显示 5～7 保留
	 */
	private String[] displayOption;
	// 报警处理Id
	private int alarmId;

	// private int configType;

	public String execute() {

		if (input != null)
			return "input";
		try {
			if (displayOption == null || displayOption.length == 0) {
				return json(false, "请选择文本显示类型!");
			}
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_SEND_TEXT);
			int[] bitValues = new int[8];
			String strDisplay = "";
			for (String op : displayOption) {
				int index = Integer.parseInt(op);
				bitValues[index] = 1;

				if (index == 0)
					strDisplay += "紧急,";
				else if (index == 2)
					strDisplay += "终端显示器显示,";
				else if (index == 3)
					strDisplay += "终端TTS播读,";
				else if (index == 4)
					strDisplay += "广告牌显示,";
				else if (index == 5)
					strDisplay += "弗斯特广告屏,";
			}

			// 0x80”不用标准的。"0xc0"
			strDisplay = strDisplay.substring(0, strDisplay.length() - 1);

			StringBuilder strBit = new StringBuilder();
			ArrayUtils.reverse(bitValues);
			for (int bit : bitValues)
				strBit.append(bit);
			byte bitValue = Byte.valueOf(strBit.toString(), 2); // 将位数组转换为字节值

			if (bitValues[2] == 1) {
				bitValue = (byte) 0x80;
			}
			tc.setCmd("" + bitValue);
			tc.setCmdData(bitValue + ";" + getTextContent());
			tc.setRemark(strDisplay);
			SendCommand(tc);

			if (alarmId > 0)
				this.processAlarm(alarmId, AlarmRecord.PROCESS_SEND_TEXT);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public String[] getDisplayOption() {
		return displayOption;
	}

	public void setDisplayOption(String[] displayOption) {
		this.displayOption = displayOption;
	}

	public String getTextContent() {
		return textContent;
	}

	public void setTextContent(String textContent) {
		this.textContent = textContent;
	}

	public int getAlarmId() {
		return alarmId;
	}

	public void setAlarmId(int alarmId) {
		this.alarmId = alarmId;
	}

}
