package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.GenericAction;

public class MobileUserAction extends GenericAction {

	private DaoIbatisImpl queryDao;

	private String oldPsd;

	private String newPsd;
	private double lat;

	private double lng;

	private int zoom;

	public String onlineUserList() {
		try {
			Collection<UserInfo> userList = MobileOnlineUser
					.getOnlineUserList();
			ArrayList<Map> users = new ArrayList();
			List<Integer> userIdList = new ArrayList<Integer>();
			for (UserInfo u : userList) {
				userIdList.add(u.getEntityId());
			}
			UserInfo u = this.getOnlineUser();
			if(u == null){
				return json(false,"会话过期，请重新登录");
			}
			String queryId = "selectUserGpsRealData";
			Map params = new HashMap();
			int depId = u.getRegionId();
			if(depId > 0)
			{
			    List<Integer> depIdList = this.getDepartmentService().getDepIdList(depId);
			    params.put("depIdList", depIdList);
			}
			//params.put("userIdList", userIdList);
			Date today = new Date();
			Date date = DateUtil.getDate(today, Calendar.MINUTE, -30);
			params.put("sendTime", date);
			List result = queryDao.queryForList(queryId,params);
			return json(true, result);
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
			return json(false, ex.getMessage());
		}
	}

	/**
	 * 设置地图中心
	 * 
	 * @return
	 */
	public String setMapCenter() {
		try {
			UserInfo user = this.getOnlineUser();
			if (user != null) {
				user = (UserInfo) this.getBaseService().load(UserInfo.class,
						user.getEntityId());
				user.setMapCenterLng(lng);
				user.setMapCenterLat(lat);
				user.setMapLevel(zoom);
				this.getBaseService().saveOrUpdate(user);// 保存到用户信息中
				this.setOnlineUser(user);
				return json(true, "已设置为当前默认地图中心！");
			}
			return json(false, "会话过期，请重新登录!");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}

	}

	public String updatePassword() {

		UserInfo user = getOnlineUser();
		if (user != null) {
			if (user.getPassword().equals(oldPsd)) {
				user.setPassword(newPsd);
				getBaseService().update(user);
				return json(true, "修改成功");
			} else {
				return json(false, "旧密码不正确");

			}
		}
		return json(false, "会话过期，请重新登录!");
	}

	public String getOldPsd() {
		return oldPsd;
	}

	public void setOldPsd(String oldPsd) {
		this.oldPsd = oldPsd;
	}

	public String getNewPsd() {
		return newPsd;
	}

	public void setNewPsd(String newPsd) {
		this.newPsd = newPsd;
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

	public int getZoom() {
		return zoom;
	}

	public void setZoom(int zoom) {
		this.zoom = zoom;
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

}
