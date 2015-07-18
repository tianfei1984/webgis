package com.ltmonitor.mobile.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.jfree.util.Log;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.Alarm;
import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.MediaItem;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;

public class MobileCommandAction extends QueryAction {

	protected int vehicleId;

	protected String plateNo;
	
	//拍照的通道
	private int channel;

	/**
	 * 终端下发的命令Id
	 */
	protected int commandId;

	private ITerminalService terminalService;

	protected IVehicleService vehicleService;

	@SuppressWarnings("rawtypes")
	private Map commandList = new HashMap();

	// 打开页面的Action 方法,不做操作，直接打开页面
	public String view() {
		return "view";
	}

	public String takePhoto() {
		if (input != null)
			return "input";

		try {
			int action = 1;
			int interval = 0;//连续拍照时间
			int saveType = 0;//保存类型
			int picSize = 2; //画面大小
			int quality = 0; //画面品质 0- 10
			int light = 0; //亮度 0-255
			int compare = 0; //对比度 0-127
			int stature = 0;//饱和度 0-127
			int grade = 0;//色度 0-255
			
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

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			Log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}
	
	/**
	 * 查询拍照指令的执行状态
	 * 如果消息不为空，就代表出错，指令停止执行
	 * @return
	 */
	public String queryPhotoCommandResult()
	{
		TerminalCommand tc = getTerminalCommand(commandId);
		if(TerminalCommand.STATUS_SUCCESS.equals(tc.getStatus()))
		{
			String hsql = "from MediaItem where commandId = ?";
			MediaItem mi = (MediaItem)this.getBaseService().find(hsql, commandId);
			if(mi != null)
			   return json(true, mi.getFileName());
			else 
			   return json(false, "");
		}
		
		if(TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
				&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false )
		{					
			BasicData bd = getBasicDataService().getBasicDataByCode(tc.getStatus(), "TCommandStatus");
			String status = bd != null ? bd.getName() : "";
			return json(false, status);		
		}
		else
			return json(false, "");
	}
	
	
	public String getCommandResult()
	{
		TerminalCommand tc = getTerminalCommand(commandId);
		if(TerminalCommand.STATUS_NEW.equals(tc.getStatus()) == false
				&& TerminalCommand.STATUS_PROCESSING.equals(tc.getStatus()) == false )
		{
			BasicData bd = getBasicDataService().getBasicDataByCode(tc.getStatus(), "TCommandStatus");
			String status = bd != null ? bd.getName() : "";
			return json(true, status);
		}

		return json(false, "");
	}

	protected void SendCommand(TerminalCommand tc) {
		VehicleData vd = vehicleService.getVehicleData(getVehicleId());
		tc.setPlateNo(vd.getPlateNo());
		tc.setSimNo(vd.getSimNo());
		tc.setVehicleId(vd.getEntityId());
		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setUserId(onlineUser.getEntityId());
			tc.setOwner(onlineUser.getName());
		}
		getTerminalService().SendCommand(tc);
	}
	
	protected TerminalCommand getTerminalCommand(int commandId)
	{
		return (TerminalCommand)this.getBaseService().load(TerminalCommand.class, commandId);
	}
	



	protected static boolean isNumeric(String str) {
		if (str.matches("\\d*")) {
			return true;
		}
		return false;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public ITerminalService getTerminalService() {
		return terminalService;
	}

	public void setTerminalService(ITerminalService terminalService) {
		this.terminalService = terminalService;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public int getChannel() {
		return channel;
	}

	public void setChannel(int channel) {
		this.channel = channel;
	}

}
