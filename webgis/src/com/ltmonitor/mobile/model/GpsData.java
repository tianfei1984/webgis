package com.ltmonitor.mobile.model;
/**
 * gps数据，用于将数据推送到客户端
 * @author DELL
 *
 */
public class GpsData {
	
	public static String ONLINE = "online";
	
	public static String OFFLINE = "offline";
	
	private int vehicleId;
	
	private String plateNo;
	
	private String depName;
	
	private String simNo;
	
	private boolean online;
	
	private double lat;
	
	private double lng;
	
	private double speed;
	
	private int direction;
	/**
	 * 终端报警状态 参见808协议
	 */
	private String alarm;
	/**
	 * 终端状态位
	 */
	private String status;
	/**
	 * 记录仪状态位参见808协议 0200定位包的扩展状态位
	 */
	private String signal;
	
	private String location;
	
	private String sendTime;
	
	private double mileage;
	
	private double oil;

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}


	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	public double getSpeed() {
		return speed;
	}

	public void setSpeed(double speed) {
		this.speed = speed;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	public String getAlarm() {
		return alarm;
	}

	public void setAlarm(String alarm) {
		this.alarm = alarm;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSimNo() {
		return simNo;
	}

	public void setSimNo(String simNo) {
		this.simNo = simNo;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSignal() {
		return signal;
	}

	public void setSignal(String signal) {
		this.signal = signal;
	}

	public double getMileage() {
		return mileage;
	}

	public void setMileage(double mileage) {
		this.mileage = mileage;
	}

	public double getOil() {
		return oil;
	}

	public void setOil(double oil) {
		this.oil = oil;
	}

	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

}
