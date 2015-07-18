package com.ltmonitor.command.action;

import org.apache.commons.lang.ArrayUtils;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;
/**
 * 车门控制
 * @author DELL
 *
 */
public class DoorControlAction extends TerminalCommandAction {

	// 监听类型
	private int controlType;
	//开关状态  0 开 1关
	private int switchState;

	// 门控制
	public String execute() {

		if(input != null)
			return "input";
		int[] bitValues = new int[8];
		if(controlType < 8)
		{
			bitValues[controlType] = switchState;
		}
		StringBuilder strBit=new StringBuilder();
		ArrayUtils.reverse(bitValues);
		for(int bit : bitValues)
			strBit.append(bit);
		byte bitValue = Byte.valueOf(strBit.toString(), 2); //将位数组转换为字节值
		
		TerminalCommand tc = new TerminalCommand();
		tc.setCmdType(JT808Constants.CMD_CONTROL_VEHICLE);
		tc.setCmdData(""+bitValue);
		tc.setCmd("" + bitValue);
		SendCommand(tc);

		return json(true, tc.getEntityId());
	}

	public int getControlType() {
		return controlType;
	}

	public void setControlType(int controlType) {
		this.controlType = controlType;
	}

	public int getSwitchState() {
		return switchState;
	}

	public void setSwitchState(int switchState) {
		this.switchState = switchState;
	}



}
