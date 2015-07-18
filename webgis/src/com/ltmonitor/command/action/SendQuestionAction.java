package com.ltmonitor.command.action;

import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.ArrayUtils;

import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.web.action.PersistenceAction;

public class SendQuestionAction extends TerminalCommandAction {
	// 下发的文本内容
	private String question;

	private String answerList;
	/**
	 * 设置类型 0 1：紧急 1 保留 2 1：终端显示器显示 3 1：终端TTS播读 4 1：广告屏显示 5～7 保留
	 */
	private String displayOptions;

	// private int configType;

	public String execute() {

		if (input != null)
			return "input";

		try {
			Map params = super.getParams();
			JSONArray arry = JSONArray.fromObject(params.get("inserted"));
			displayOptions = ""+params.get("displayOptions");
			String[] displayOption = displayOptions.split(",");

			StringBuilder errorMsg = new StringBuilder();
			if (displayOption == null || displayOption.length == 0) {
				errorMsg.append("请选择提问下发类型!");
			}

			int rowNo = 1;
			this.answerList = "";
			for (int m = 0; m < arry.size(); m++) {
				JSONObject mi = arry.getJSONObject(m);
				String ID = mi.getString("ID");
				String content = mi.getString("content");
				if (isNumeric(ID) == false)
					errorMsg.append("第一列").append("第" + rowNo + "行必须为数字整数, ");
				if (StringUtil.isNullOrEmpty(content))
					errorMsg.append("第二列").append("第" + rowNo + "行不能为空, ");
				this.answerList += ID + "," + content + ";";
				rowNo++;
			}
			if (errorMsg.length() > 0)
				return json(false, errorMsg.toString());

			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_QUESTION);
			tc.setRemark(question);
			tc.setCmdData(this.answerList);
			int[] bitValues = new int[8];
			for (String op : displayOption) {
				int index = Integer.parseInt(op);
				bitValues[index] = 1;
			}
			ArrayUtils.reverse(bitValues);
			String strBit = "";
			for (int bit : bitValues)
				strBit += bit;
			byte bitValue = Byte.valueOf(strBit, 2); // 将位数组转换为字节值
			tc.setCmd("" + bitValue);
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
	}

	public String getDisplayOptions() {
		return displayOptions;
	}

	public void setDisplayOption(String displayOptions) {
		this.displayOptions = displayOptions;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnwserList() {
		return getAnswerList();
	}

	public void setAnwserList(String anwserList) {
		this.setAnswerList(anwserList);
	}

	public String getAnswerList() {
		return answerList;
	}

	public void setAnswerList(String answerList) {
		this.answerList = answerList;
	}

}
