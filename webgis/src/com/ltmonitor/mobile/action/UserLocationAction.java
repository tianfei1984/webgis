package com.ltmonitor.mobile.action;

import java.util.Date;

import com.ltmonitor.mobile.entity.UserGpsInfo;
import com.ltmonitor.mobile.entity.UserGpsRealData;
import com.ltmonitor.service.ILocationService;
import com.ltmonitor.web.action.PersistenceAction;
import com.ltmonitor.web.action.QueryAction;

/**
 * 用户位置汇报
 * 
 * @author DELL
 * 
 */
public class UserLocationAction extends PersistenceAction {

	// 经度
	private double longitude;
	// 纬度
	private double latitude;
	// 速度
	private double velocity;
	// 方向
	private int direction;

	private Date sendTime;

	private int userId;
	/**
	 * 定位精度
	 */
	private double accuracy;

	private ILocationService locationService;

	public String execute() {
		try {
			String hql = "from UserGpsRealData where userId = ?";

			UserGpsRealData g = (UserGpsRealData) this.baseService.find(hql,
					userId);
			if (g == null) {
				g = new UserGpsRealData();
				g.setUserId(userId);
			}else if(g.getSendTime() != null && g.getSendTime().compareTo(sendTime) >= 0)
			{
				//重复定位数据，不再入库
				return json(true,"");
			}

			g.setLatitude(latitude);
			g.setLongitude(longitude);
			g.setAccuracy(accuracy);
			g.setSendTime(sendTime);
			String location = locationService.getLocation(latitude, longitude);
			g.setLocation(location);
			//保存到实时表
			this.baseService.saveOrUpdate(g);

			UserGpsInfo gi = new UserGpsInfo();
			gi.setLatitude(latitude);
			gi.setLongitude(longitude);
			gi.setSendTime(sendTime);
			gi.setVelocity(velocity);
			gi.setAccuracy(accuracy);
			gi.setDirection(direction);
			gi.setUserId(userId);
			gi.setLocation(g.getLocation());
			//保存到历史定位表中
			this.baseService.save(gi);
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
			return json(false, ex.getMessage());
		}

		return json(true, "");
	}

	public String getRealData() {
		try {
			String hql = "from UserGpsRealData where userId = ?";

			UserGpsRealData g = (UserGpsRealData) this.baseService.find(hql,
					userId);
			return json(true, g);
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
			return json(false, ex.getMessage());
		}

	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getVelocity() {
		return velocity;
	}

	public void setVelocity(double velocity) {
		this.velocity = velocity;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public ILocationService getLocationService() {
		return locationService;
	}

	public void setLocationService(ILocationService locationService) {
		this.locationService = locationService;
	}

	public double getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(double accuracy) {
		this.accuracy = accuracy;
	}

}
