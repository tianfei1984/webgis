package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.GPSRealData;
import com.ltmonitor.entity.PointLatLng;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.IDepartmentService;
import com.ltmonitor.service.IRealDataService;
import com.ltmonitor.service.MapFixService;
import com.ltmonitor.util.Constants;
import com.ltmonitor.util.DateUtil;

/**
 * 实时数据查询
 * 
 * @author DELL
 * 
 */
public class RealDataAction extends QueryAction {
	private static String REGISTER_VEHICLEID_KEY = "registerVehicleIds";
	private static String REGISTER_SIMNO_KEY = "registerSimNos";
	/**
	 * session 主键，存放此主键的map
	 */
	private static String UPDATE_KEY = "session_update_realdata";
	/**
	 * 用户选择的车辆Id
	 */
	private String registerVehicleIds;

	private int vehicleId;

	private IDepartmentService departmentService;
	/**
	 * 第一次整个加载，第二次是判断更新，如果GPS状态发生了变化，才更新到前端
	 */
	private boolean update;
	
	private Map dataOutPut = new HashMap();
	/**
	 * 是否显示扩展信号如刹车、转向等状态
	 */
	//private boolean displaySignalState;

	// 用户选择要监控的车辆
	public String registerVehicles() {
		getVehicleIdList().clear();
		if (StringUtil.isNullOrEmpty(registerVehicleIds) == false) {
			String[] vehicleIds = registerVehicleIds.split(",");
			List simNoList = getSimNoListFromSession();
			simNoList.clear();
			for (String strVehicleId : vehicleIds) {
				// vehicleIdList.add(Integer.parseInt(vehicleId));
				int vehicleId = Integer.parseInt(strVehicleId);
				getVehicleIdList().add(vehicleId);

				VehicleData vd = this.getVehicleService().getVehicleData(vehicleId);
				simNoList.add(vd.getSimNo());
			}
			/**
			Map<Integer, Integer> vehicleIdMap = this.getVehicleIdMap();
			Collection<Integer> c = vehicleIdMap.values();
			List<Integer> vs = new ArrayList<Integer>(c);
			List<VehicleData> vehicleList = new ArrayList<VehicleData>();

			List<Map> result = new ArrayList<Map>();
			Date start1 = new Date();
			for (Integer vehicleId : vs) {
				if (vd != null) {
					vehicleList.add(vd);
					simNoList.add(vd.getSimNo());
				}
			}*/
			

			this.LogOperation("实时监控车辆，选择车辆数:"+vehicleIds.length);
		} else {
		}
		return json(true, "");
	}

	private List<Integer> getVehicleIdList() {
		List<Integer> vehicleIdList = (List<Integer>) getSession()
				.get(REGISTER_VEHICLEID_KEY);
		if (vehicleIdList == null) {
			vehicleIdList = new ArrayList<Integer>();
			getSession().put(REGISTER_VEHICLEID_KEY, vehicleIdList);
		}
		return vehicleIdList;
	}
	
	private List getSimNoListFromSession()
	{
		List<String> simNoList = (List<String>)getSession().get(REGISTER_SIMNO_KEY);
		if(simNoList == null)
		{
			simNoList = new ArrayList<String>();
			getSession().put(REGISTER_SIMNO_KEY, simNoList);
		}
		return simNoList;
		
	}

	private Map<Integer, Date> getUpdateMap() {
		Map<Integer, Date> updateMap = (Map<Integer, Date>) getSession().get(
				UPDATE_KEY);
		if (updateMap == null) {
			updateMap = new HashMap<Integer, Date>();
			getSession().put(UPDATE_KEY, updateMap);
		}
		return updateMap;
	} 

	public String getAllRealData() {

		Map params = new HashMap();
		params.put("userId", getUserId());
		List<Integer> depIdList = this.getAuthorizedDepIdList();
		try {
			queryId = "selectVehicleInfo"; // 查询单个车辆的综合信息
			params.put("depIdList", depIdList);
			result = (getQueryDao().queryForList(queryId, params));
			convert(result);
			// if (result.size() > 0)
			return json(true, result);
			// else
			// return json(false, "没有查询到该车辆的实时数据");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	/**
	 * 刷新实时数据，前端不断的采用定时刷新的方式获取实时数据，刷新实时数据表格。 如果和以前的数据没有变化，则直接不刷新，只刷新GPS数据发生变化的数据
	 * 
	 * @return
	 */
	public String refreshRealData() {
		if (input != null)
			return "input"; // 跳转到单车实时监控

		String queryId = "selectGpsRealData";
		HashMap<Object, Object> params = new HashMap<Object, Object>();
		//params.put("userId", getUserId());
		if (vehicleId > 0) {
			// 单车监控，用于生成监控车辆轨迹
			params.put("vehicleId1", vehicleId);
			params.put("vehicleId", vehicleId);
			try {
				queryId = "selectVehicleInfo"; // 查询单个车辆的综合信息
				result = (getQueryDao().queryForList(queryId, params));
				if (result.size() > 0) {
					Map resultMap = (Map) result.get(0);
					String simNo = "" + resultMap.get("simNo");
					IRealDataService realService = getRealDataService();
					if (realService != null) {
						GPSRealData rd = realService.get(simNo);
						if (rd != null) {
							// 将实时数据更新到map
							setRealDataMap(resultMap, rd);
						}
					}
					this.convert(resultMap);
					return json(true, resultMap);
				} else
					return json(false, "没有查询到该车辆的实时数据");
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
				return json(false, ex.getMessage());
			}
		} else {
			if (getVehicleIdList().isEmpty() == false) {
				Date start = new Date();
				try {
					List ls = this.getRealDataList();
					//Date start2 = new Date();
					//List ls = convert(result);
					dataOutPut.put("rows", ls);
				} catch (Exception ex) {
					log.error(ex.getMessage(), ex);
				}

				Date end = new Date();
				double seconds = DateUtil.getSeconds(start, end);
				// log.error("查询数据耗时:" + seconds);
			}
			return "success";
		}

	}

	private List<Map> getRealDataList() {
		
		//Date end1 = new Date();
		//double seconds1 = DateUtil.getSeconds(start1, end1);
		// log.error("车辆查询耗时:" + seconds1 );
		//开始调用808服务器的实时数据服务，获取实时数据
		IRealDataService realService = getRealDataService();
		Map<Integer, GPSRealData> realDataMap = new HashMap<Integer, GPSRealData>();
		if (realService != null) {
			Date start = new Date();
			//用户监控所选车辆的simNo
			List<String>simNoList = this.getSimNoListFromSession();
			List<GPSRealData> realList = realService.getRealDataList(simNoList);
			for (GPSRealData rd : realList) {
				realDataMap.put(rd.getVehicleId(), rd);
			}

			//Date end = new Date();

			//double seconds = DateUtil.getSeconds(start, end);
			// log.error("实时数据更新耗时:" + seconds + ",条数：" + realList.size());
		}
		ArrayList filterResult = new ArrayList();
		Map<Integer, Date> updateMap = this.getUpdateMap();
		if (update == false) {
			updateMap.clear();// 第一次加载要清空表格
		}
		
		List<Integer> vehicleIdList = this.getVehicleIdList();
		for (int vehicleId : vehicleIdList) {
			VehicleData vd = this.getVehicleService().getVehicleData(vehicleId);
			Map<String, Comparable> rowData = new HashMap();
			Department dep = this.departmentService
					.fetchDepartment(vd.getDepId());
			rowData.put("vehicleId", vd.getEntityId());
			rowData.put("depName", dep.getName());
			rowData.put("plateColor", vd.getPlateColor());
			rowData.put("simNo", vd.getSimNo());
			rowData.put("plateNo", vd.getPlateNo());

			GPSRealData rd = realDataMap.get(vd.getEntityId());
			Date sendTime = null;
			if (rd != null) {
				setRealDataMap(rowData, rd);
				sendTime = rd.getSendTime();
			}
			if (update && updateMap.containsKey(vehicleId)) {
				Date lastSendTime = updateMap.get(vehicleId);
				if (sendTime == null || (lastSendTime != null && sendTime.compareTo(lastSendTime) == 0)) {
					continue;// 说明数据没有发生变化,不刷新
				}
			}
			updateMap.put(vehicleId, sendTime);
			try {
				// 对返回的每行数据，进行格式化转换
				convert(rowData);
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
			}	
			filterResult.add(rowData);		
		}
		
		return filterResult;
	}

	private void setRealDataMap(Map rowData, GPSRealData rd) {
		rowData.put("valid", rd.IsValid());
		rowData.put("latitude", rd.getLatitude());
		rowData.put("longitude", rd.getLongitude());
		rowData.put("altitude", rd.getAltitude());
		rowData.put("alarmState", rd.getAlarmState());
		rowData.put("status", rd.getStatus());
		rowData.put("gas", rd.getGas());
		rowData.put("signal", rd.getSignal());
		rowData.put("location", rd.getLocation());
		rowData.put("mileage", rd.getMileage());
		rowData.put("online", rd.getOnline());
		rowData.put("sendTime", rd.getSendTime());
		rowData.put("velocity", rd.getVelocity());
		rowData.put("recordVelocity", rd.getRecordVelocity());
		rowData.put("direction", rd.getDirection());
		rowData.put("enclosureAlarm", rd.getEnclosureAlarm());
		rowData.put("enclosureType", rd.getEnclosureType());
		rowData.put("enclosureId", rd.getEnclosureId());
		rowData.put("overSpeedAreaId", rd.getOverSpeedAreaId());
		rowData.put("overSpeedAreaType", rd.getOverSpeedAreaType());
		rowData.put("routeAlarmType", rd.getRouteAlarmType());
		rowData.put("routeSegmentId", rd.getRouteSegmentId());
		rowData.put("runTimeOnRoute", rd.getRunTimeOnRoute());
	}

	private IRealDataService getRealDataService() {
		try {
			ApplicationContext ctx = WebApplicationContextUtils
					.getRequiredWebApplicationContext(this.getRequest()
							.getSession().getServletContext());
			if (ctx != null) {
				IRealDataService rd = (IRealDataService) ctx
						.getBean("realDataService");
				return rd;
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 结果转换，对状态、车牌颜色等整数字段转成用户可以阅读的文字描述。
	 * 
	 * @param ls
	 * @param isFix
	 */
	private List convert(List ls) {
		ArrayList filterResult = new ArrayList();
		Map<Integer, Date> updateMap = this.getUpdateMap();
		if (update == false) {
			updateMap.clear();// 第一次加载要清空表格
		}
		for (Object rowData : ls) {
			Map rd = (Map) rowData;
			int vehicleId = (Integer) rd.get("vehicleId");
			Date sendTime = (Date) rd.get("sendTime");
			if (update && updateMap.containsKey(vehicleId)) {
				Date lastSendTime = updateMap.get(vehicleId);
				if (sendTime == null || (lastSendTime != null && sendTime.compareTo(lastSendTime) == 0)) {
					continue;// 说明数据没有发生变化,不刷新
				}
			}
			updateMap.put(vehicleId, sendTime);
			try {
				// 对返回的每行数据，进行格式化转换
				convert(rd);
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
			}
			filterResult.add(rd);

		}
		return filterResult;
	}

	private void convert(Map rowData) {
		//根据系统配置的显示类型，显示状态
		String displaySignalState = this.getSystemConfig().getDisplayStateType();
		if(Constants.STATE_TYPE_BARKER.equals(displaySignalState))
		{
			//显示刹车、转向
			int signal = rowData.get("signal") != null ? (Integer)rowData.get("signal") : 0;
			//signal = 24;
			String descr = this.getSignalDescr(signal);
			rowData.put("status", descr);			
		}else
		{
			//显示车辆ACC开关等状态
			String status = "" + rowData.get("status");
			String descr = getStatusDescr(status);
			rowData.put("status", descr);			
		}

		String alarmState = "" + rowData.get("alarmState");
		alarmState = this.getAlarmDescr(alarmState);

		if (rowData.get("valid") != null) {
			boolean valid = (Boolean) rowData.get("valid");
			rowData.put("valid", valid ? "有效" : "无效");
		}

		// String vehicleType = "" + rowData.get("vehicleType");
		this.convert(rowData, "vehicleType", "VehicleType");

		if (rowData.get("driverName") == null) {
			rowData.put("driverName", "");
		}

		if (rowData.get("ewayBill") == null) {
			rowData.put("ewayBill", "");
		}

		// String plateColor = "" + rowData.get("plateColor");
		this.convert(rowData, "plateColor", "plateColor");
		Date sendTime = (Date) rowData.get("sendTime");
		if (sendTime != null) {
			rowData.put("sendTime",
					DateUtil.toStringByFormat(sendTime, "MM-dd HH:mm:ss"));

			Double latitude = Double.parseDouble("" + rowData.get("latitude"));
			Double longitude = Double
					.parseDouble("" + rowData.get("longitude"));
			// 坐标加偏
			PointLatLng pl = MapFixService.fix(latitude, longitude,
					super.getMapType());
			rowData.put("latitude", pl.getLat());
			rowData.put("longitude", pl.getLng());

			rowData.put("orgLatitude", latitude);
			rowData.put("orgLongitude", longitude);
			
			int direction = (Integer) rowData.get("direction");
			String directionDescr = this.getDirectionDescr(direction);
			rowData.put("directionDescr", directionDescr);
			rowData.put("direction", getDirection(direction));

			int enclosureType = (Integer) rowData.get("enclosureType");
			int enclosureId = (Integer) rowData.get("enclosureId");
			if (enclosureType > 0) {
				int enclosureAlarm = (Integer) rowData.get("enclosureAlarm");
				String temp = enclosureAlarm == 0 ? "进入" : "离开";
				alarmState += this.getAreaTypeDescr(enclosureType) + "Id:"
						+ enclosureId + temp + "报警,";
			}

			int overSpeedAreaType = (Integer) rowData.get("overSpeedAreaType");
			int overSpeedAreaId = (Integer) rowData.get("overSpeedAreaId");
			if (overSpeedAreaType > 0) {
				alarmState += this.getAreaTypeDescr(overSpeedAreaType) + "Id:"
						+ overSpeedAreaId + "超速报警,";
			}
			int routeSegmentId = (Integer) rowData.get("routeSegmentId");
			int routeAlarmType = (Integer) rowData.get("routeAlarmType");
			if (routeSegmentId > 0) {
				int runTimeOnRoute = (Integer) rowData.get("runTimeOnRoute");
				String temp = routeAlarmType == 0 ? "不足" : "过长";
				alarmState += "路段Id:" + enclosureId + "行驶时间:" + runTimeOnRoute
						+ "秒,行驶" + temp + "报警,";
			}
		}
		if (rowData.get("location") == null) {
			rowData.put("location", "");
		}

		if (StringUtil.isNullOrEmpty(alarmState))
			alarmState = "无";
		rowData.put("alarmStateDescr", alarmState);// 报警状态描述

	}

	/**
	 * 0：无特定位置； 1：圆形区域； 2：矩形区域； 3：多边形区域； 4：路段
	 * 
	 * @param areaType
	 * @return
	 */
	protected String getAreaTypeDescr(int areaType) {
		if (areaType == 0)
			return "无特定位置";
		else if (areaType == 1)
			return "圆形区域";
		else if (areaType == 2)
			return "矩形区域";
		else if (areaType == 3)
			return "多边形区域";
		else if (areaType == 4)
			return "路段";
		return "未知区域类型";
	}

	protected String getDirectionDescr(int direction) {
		String descr = "";
		if (direction == 0) {
			descr = "正北";
		} else if (direction == 90) {
			descr = "正东";
		} else if (direction == 180) {
			descr = "正南";
		} else if (direction == 270) {
			descr = "正西";
		} else if (direction == 45) {
			descr = "东北";
		} else if (direction == 135) {
			descr = "东南";
		} else if (direction == 225) {
			descr = "西南";
		} else if (direction == 315) {
			descr = "西北";
		} else if (direction < 90) {
			descr = "东偏北" + direction + "度";
		} else if (direction > 90 && direction < 180) {
			descr = "东偏南" + (180 - direction) + "度";
		} else if (direction > 180 && direction < 270) {
			descr = "西偏南" + (direction - 180) + "度";
		} else if (direction > 270 && direction < 360) {
			descr = "西偏北" + (360 - direction) + "度";
		}
		return descr;
	}
	//用于图片展示
	protected int getDirection(int direction) {
		if (direction == 0 || direction == 90 || direction == 180 || direction ==270 || direction == 45 || direction == 135 
				|| direction == 225 || direction == 315) {
			return direction;
		} else if(direction < 10){
			return 0;
		} else if (direction < 80) {
			return 45;
		} else if(direction < 100){
			return 90;
		} else if (direction < 170) {
			return 135;
		} else if(direction < 190){
			return 180;
		} else if (direction < 260) {
			return 225;
		} else if(direction < 280){
			return 270;
		}
		else if (direction < 350) {
			return 315;
		} 
		return 0;
	}

	protected String getStatusDescr(String status) {
		StringBuilder sb = new StringBuilder();

		if (StringUtil.isNullOrEmpty(status) == false) {
			char[] ch = status.toCharArray();
			if (ch.length == 32) {
				int m = 31;
				int c = ch[m - 0] - 48;
				sb.append(c == 1 ? "ACC开" : "ACC关").append(",");
				c = ch[m - 1] - 48;
				sb.append(c == 1 ? "定位" : "未定位").append(",");
				c = ch[m - 4] - 48;
				sb.append(c == 1 ? "停运" : "运营").append(",");
				c = ch[m - 10] - 48;
				sb.append(c == 1 ? "油路断开" : "油路正常").append(",");
				c = ch[m - 11] - 48;
				sb.append(c == 1 ? "电路断开" : "电路正常").append(",");
				c = ch[m - 12] - 48;
				sb.append(c == 1 ? "车门加锁" : "车门解锁").append(",");
			}
		}

		return sb.toString();
	}

	private static String[] signalDescr = new String[] { "近光灯", "远光灯", "右转向灯",
			"左转向灯", "制动", "倒档" };

	protected String getSignalDescr(int signal) {
		StringBuilder sb = new StringBuilder();
		String strStatus = Integer.toBinaryString(signal);
		strStatus = StringUtil.leftPad(strStatus, 32, '0');

		char[] ch = strStatus.toCharArray();
		for (int m = 0; m < ch.length && m < signalDescr.length; m++) {
			int c = ch[31 - m] - 48;
			if (StringUtil.isNullOrEmpty(signalDescr[m])==false) {
				sb.append(signalDescr[m]).append(c == 1 ? "开" : "关").append(",");
			}
		}

		return sb.toString();
	}

	/**
	 * 报警描述
	 * 
	 * @param alarm
	 * @return
	 */
	protected String getAlarmDescr(String alarm) {
		StringBuilder sb = new StringBuilder();

		if (StringUtil.isNullOrEmpty(alarm) == false) {
			char[] ch = alarm.toCharArray();
			for (int m = 0; m < ch.length; m++) {
				int tag = Integer.parseInt("" + ch[m]);
				if (tag == 1) {
					int alarmId = 31 - m; // 倒序，转换为部标的报警序号
					BasicData bd = basicDataService.getBasicDataByCode(""
							+ alarmId, "AlarmType");
					if (bd != null) {
						sb.append(bd.getName()).append(",");
					}
				}
			}
		}

		return sb.toString();
	}

	public String getRegisterVehicleIds() {
		return registerVehicleIds;
	}

	public void setRegisterVehicleIds(String registerVehicleIds) {
		this.registerVehicleIds = registerVehicleIds;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public IDepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public boolean isUpdate() {
		return update;
	}

	public void setUpdate(boolean update) {
		this.update = update;
	}

	public Map getDataOutPut() {
		return dataOutPut;
	}

	public void setDataOutPut(Map dataOutPut) {
		this.dataOutPut = dataOutPut;
	}

}
