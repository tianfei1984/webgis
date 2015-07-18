package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.PointLatLng;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.mobile.model.GpsData;
import com.ltmonitor.service.MapFixService;
import com.ltmonitor.util.Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;

public class VehicleListAction extends QueryAction {

	private static String REGISTER_KEY = "mobile_registerVehicleIds";
	private String plateNo;
	private String simNo;
	private int depId;
	private String onlineState;
	/**
	 * 用户选择的车辆Id
	 */
	private String registerVehicleIds;

	private int pageNo;

	private int pageSize;

	public String register() {
		getVehicleIdMap().clear();
		if (StringUtil.isNullOrEmpty(registerVehicleIds) == false) {
			String[] vehicleIds = registerVehicleIds.split(",");
			for (String vehicleId : vehicleIds) {
				// vehicleIdList.add(Integer.parseInt(vehicleId));
				getVehicleIdMap().put(Integer.parseInt(vehicleId),
						Integer.parseInt(vehicleId));
			}
			this.LogOperation("移动端实时监控车辆，选择车辆数:" + vehicleIds.length);
		} else {
		}
		return json(true, "");
	}

	public String myVehicle() {
		try {
			if (this.getOnlineUser() == null)
				return json(false, "会话过期，请重新登录");
			List<GpsData> result = new ArrayList<GpsData>();
			String queryId = "selectGpsData";
			Map params = this.getParams();
			params.put("userId", this.getOnlineUser().getEntityId());

			// params.put("depIdList", super.getAuthorizedDepIdList());
			pageNo = pageNo == 0 ? 1 : pageNo;
			pageSize = pageSize == 0 ? 10 : pageSize;

			List rs = super.queryDao.queryForList(queryId, params);

			if (rs.size() > 0) {
				for (Object obj : rs) {
					Map data = (Map) obj;
					GpsData gd = new GpsData();
					Integer vehicleId = (Integer) data.get("vehicleId");
					Map vehicleIdMap = this.getVehicleIdMap();
					if (vehicleIdMap.containsKey(vehicleId) == false)
						continue;
					gd.setVehicleId(vehicleId);
					gd.setPlateNo("" + data.get("plateNo"));
					gd.setDepName("" + data.get("depName1"));
					gd.setSimNo("" + data.get("simNo"));
					if (data.get("location") != null)
						gd.setLocation("" + data.get("location"));
					else
						gd.setLocation("");
					if (data.get("latitude") != null)
						gd.setLat(Double.parseDouble("" + data.get("latitude")));
					if (data.get("longitude") != null)
						gd.setLng(Double.parseDouble("" + data.get("longitude")));
					if (data.get("direction") != null)
						gd.setDirection((Integer) data.get("direction"));
					if (data.get("velocity") != null)
						gd.setSpeed(Double.parseDouble(""
								+ data.get("velocity")));
					String online = "" + data.get("online");
					gd.setOnline(online.equals("online"));
					Date sendTime = (Date) data.get("sendTime");
					gd.setSendTime(DateUtil.toStringByFormat(sendTime,
							"yyyy-MM-dd HH:mm:ss"));
					result.add(gd);
				}
			}

			return json(true, result);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	private Map<Integer, Integer> getVehicleIdMap() {
		Map<Integer, Integer> vehicleIdMap = (Map<Integer, Integer>) getSession()
				.get(REGISTER_KEY);
		if (vehicleIdMap == null) {
			vehicleIdMap = new HashMap<Integer, Integer>();
			getSession().put(REGISTER_KEY, vehicleIdMap);
		}
		return vehicleIdMap;
	}

	public String list() {
		try {
			UserInfo user = this.getOnlineUser();
			if (user == null)
				return json(false, "会话已过期，请重新登录");
			List<GpsData> result = new ArrayList<GpsData>();
			String queryId = "selectGpsData";
			Map params = this.getParams();
			params.put("userId", user.getEntityId());
			// params.put("depIdList", super.getAuthorizedDepIdList());

			pageNo = pageNo == 0 ? 1 : pageNo;
			pageSize = pageSize == 0 ? 10 : pageSize;

			PageResult pr = super.queryDao.queryByPagination(queryId, params,
					pageNo, pageSize);

			if (pr.getResults().size() > 0) {
				for (Object obj : pr.getResults()) {
					Map data = (Map) obj;
					GpsData gd = new GpsData();
					gd.setVehicleId((Integer) data.get("vehicleId"));
					gd.setPlateNo("" + data.get("plateNo"));
					gd.setDepName("" + data.get("depName1"));
					gd.setSimNo("" + data.get("simNo"));
					gd.setLocation("" + data.get("location"));
					if (data.get("latitude") != null)
						gd.setLat((Double) data.get("latitude"));
					if (data.get("longitude") != null)
						gd.setLng((Double) data.get("longitude"));
					if (data.get("direction") != null)
						gd.setDirection((Integer) data.get("direction"));
					if (data.get("speed") != null)
						gd.setSpeed((Double) data.get("speed"));
					String online = "" + data.get("online");
					gd.setOnline(online.equals("在线"));
					Date sendTime = (Date) data.get("sendTime");
					if (sendTime != null) {
						gd.setSendTime(DateUtil.toStringByFormat(sendTime,
								"yyyy-MM-dd HH:mm:ss"));
					}
					if(gd.getLat() > 0 && gd.getLng() > 0){
						PointLatLng pl = MapFixService.fix(gd.getLat(), gd.getLng(),
								Constants.MAP_GOOGLE);
						gd.setLat(pl.getLat());
						gd.setLng(pl.getLng());
					}
					result.add(gd);
				}
			}

			pr.setResults(result);

			this.LogOperation("移动端查询车辆");
			return json(true, pr);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public String getOnlineState() {
		return onlineState;
	}

	public void setOnlineState(String onlineState) {
		this.onlineState = onlineState;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public String getSimNo() {
		return simNo;
	}

	public void setSimNo(String simNo) {
		this.simNo = simNo;
	}

	public String getRegisterVehicleIds() {
		return registerVehicleIds;
	}

	public void setRegisterVehicleIds(String registerVehicleIds) {
		this.registerVehicleIds = registerVehicleIds;
	}

}
