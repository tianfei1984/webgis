package com.ltmonitor.command.action;

import java.util.HashMap;
import java.util.Map;

import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.web.action.GenericAction;

/**
 * 平台间报文 
 * @author DELL
 * 
 */
public class PlatformPostQueryAction extends GenericAction {
	// 命令Id
	private int commandId;
	
	private String infoId;
	
	private String objId;
	
	private String content;
	
	private String objType;
	
	private String answer;
	/**
	 * 如果809连接多个上级平台，应答时需要判断是那个平台的，只给对应平台进行应答
	 */
	private int platformId;
	
	private Map entity = new HashMap();

	private ITerminalService terminalService;

	/**
	 * 获取查岗信息，并显示在前台窗口
	 */
	public String postQuery()
	{
		try {
			String hql = "from JT809Command where cmdId = ?";
			JT809Command tc = (JT809Command)this.getBaseService().find(hql, commandId);
			if(tc != null)
			{
				String[] msg = tc.getCmdData().split(";");
				entity.put("infoId", msg[0]);
				entity.put("objId", msg[1]);
				entity.put("objType", msg[2]);
				entity.put("content", msg[3]);
				entity.put("commandId", commandId);
				entity.put("platformId", tc.getUserId());
				
			}else
				setMessage("没有找到查岗命令");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			setMessage(e.getMessage());
		}
		
		return "success";
	}
	
	/**
	 * 查岗应答
	 * @return
	 */
	public String postQueryAck()
	{
		try {
			JT809Command jc = new JT809Command();
			jc.setCmd(0x1300);
			jc.setSubCmd(0x1301);
			StringBuilder sb = new StringBuilder();
			sb.append(objType).append(";").append(objId).append(";").append(infoId).append(";").append(answer);
			jc.setCmdData(sb.toString());
			if(platformId == 0)
				platformId = this.getOnlineUser().getEntityId();
			jc.setUserId(this.platformId);
			UserInfo onlineUser = getOnlineUser();
			if (onlineUser != null) {
				jc.setOwner(onlineUser.getName());
				//jc.setUserId(onlineUser.getEntityId());
			}
			getTerminalService().SendPlatformCommand(jc);
			return json(true, "");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			setMessage(e.getMessage());
			return json(false, e.getMessage());
		}
	}


	public String getInfoId() {
		return infoId;
	}


	public void setInfoId(String infoId) {
		this.infoId = infoId;
	}


	public String getObjId() {
		return objId;
	}


	public void setObjId(String objId) {
		this.objId = objId;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public String getObjType() {
		return objType;
	}


	public void setObjType(String objType) {
		this.objType = objType;
	}


	public ITerminalService getTerminalService() {
		return terminalService;
	}


	public void setTerminalService(ITerminalService terminalService) {
		this.terminalService = terminalService;
	}


	public String getAnswer() {
		return answer;
	}


	public void setAnswer(String answer) {
		this.answer = answer;
	}


	public Map getEntity() {
		return entity;
	}


	public void setEntity(Map entity) {
		this.entity = entity;
	}


	public int getCommandId() {
		return commandId;
	}


	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public int getPlatformId() {
		return platformId;
	}

	public void setPlatformId(int platformId) {
		this.platformId = platformId;
	}
}
