package com.ltmonitor.command.action;
/**
 * 行车记录仪参数
 * @author Administrator
 *
 */
public class RecorderParam {
	private String cmd;

	private String driverNo;

	private String driverLicense;

	private String vin;

	private String vehicleNo;

	private String vehicleType;

	private String clock;
	
	private String feature;
	
	private double mileageIn2d;
	
	private double mileageIn360h;

	public String getDriverNo() {
		return driverNo;
	}

	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}

	public String getDriverLicense() {
		return driverLicense;
	}

	public void setDriverLicense(String driverLicense) {
		this.driverLicense = driverLicense;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getClock() {
		return clock;
	}

	public void setClock(String clock) {
		this.clock = clock;
	}

	public String getFeature() {
		return feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public double getMileageIn2d() {
		return mileageIn2d;
	}

	public void setMileageIn2d(double mileageIn2d) {
		this.mileageIn2d = mileageIn2d;
	}

	public double getMileageIn360h() {
		return mileageIn360h;
	}

	public void setMileageIn360h(double mileageIn360h) {
		this.mileageIn360h = mileageIn360h;
	}
	
}
