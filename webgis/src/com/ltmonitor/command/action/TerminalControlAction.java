package com.ltmonitor.command.action;

import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;

/**
 * 终端控制
 * 
 * @author DELL
 * 
 */
public class TerminalControlAction extends TerminalCommandAction {

	private String url;
	private String apn;
	private String apnUser;
	private String apnPass;
	private String address;
	private int tcpPort;
	private int udpPort;
	private String vendorId;
	private String hardVersion;
	private String softVersion;
	private int timeout;

	// 控制类型
	private int controlType;

	public String execute() {

		if (input != null)
			return "input";
		try {
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdType(JT808Constants.CMD_CONTROL_TERMINAL);
			tc.setCmd("" + controlType); // 控制命令字
			String strTcpPint = this.changeCharset(""+tcpPort, "GBK");
			if (controlType == 1) {
				StringBuilder sb = new StringBuilder();
				sb.append(url).append(";").append(apn).append(";")
						.append(apnUser).append(";").append(apnPass)
						.append(";").append(address).append(";")
						.append(strTcpPint).append(";").append(udpPort)
						.append(";").append(vendorId).append(";")
						.append(hardVersion).append(";").append(softVersion)
						.append(";").append(timeout).append(";");
				tc.setCmdData(sb.toString());
			}
			SendCommand(tc);

			return json(true, tc.getEntityId());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	/**
	 * 字符串编码转换的实现方法
	 * 
	 * @param str
	 *            待转换编码的字符串
	 * @param newCharset
	 *            目标编码
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String changeCharset(String str, String newCharset) throws Exception {
		if (str != null) {
			// 用默认字符编码解码字符串。
			byte[] bs = str.getBytes();
			// 用新的字符编码生成字符串
			return new String(bs, newCharset);
		}
		return null;
	}

	public int getControlType() {
		return controlType;
	}

	public void setControlType(int controlType) {
		this.controlType = controlType;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getApn() {
		return apn;
	}

	public void setApn(String apn) {
		this.apn = apn;
	}

	public String getApnUser() {
		return apnUser;
	}

	public void setApnUser(String apnUser) {
		this.apnUser = apnUser;
	}

	public String getApnPass() {
		return apnPass;
	}

	public void setApnPass(String apnPass) {
		this.apnPass = apnPass;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getTcpPort() {
		return tcpPort;
	}

	public void setTcpPort(int tcpPort) {
		this.tcpPort = tcpPort;
	}

	public int getUdpPort() {
		return udpPort;
	}

	public void setUdpPort(int udpPort) {
		this.udpPort = udpPort;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public String getHardVersion() {
		return hardVersion;
	}

	public void setHardVersion(String hardVersion) {
		this.hardVersion = hardVersion;
	}

	public String getSoftVersion() {
		return softVersion;
	}

	public void setSoftVersion(String softVersion) {
		this.softVersion = softVersion;
	}

	public int getTimeout() {
		return timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}

}
