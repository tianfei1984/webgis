package com.ltmonitor.mobile.model;
/**
 * 服务器推送的报警项目
 * @author DELL
 *
 */
public class AlarmItem {
	
	private int vehicleId;
	
	private String plateNo;

	private String alarmType;
	
	private String alarmTypeDescr;
	
	private String alarmSource;
	
	private String alarmTime;
	
	private String depName;
	
	private String location;
	
	private double latitude;
	
	private double longitude;
	
	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(String alarmType) {
		this.alarmType = alarmType;
	}

	public String getAlarmTypeDescr() {
		return alarmTypeDescr;
	}

	public void setAlarmTypeDescr(String alarmTypeDescr) {
		this.alarmTypeDescr = alarmTypeDescr;
	}

	public String getAlarmTime() {
		return alarmTime;
	}

	public void setAlarmTime(String alarmTime) {
		this.alarmTime = alarmTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}


	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getAlarmSource() {
		return alarmSource;
	}

	public void setAlarmSource(String alarmSource) {
		this.alarmSource = alarmSource;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

}

