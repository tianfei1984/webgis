package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.entity.Alarm;
import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.PlatformState;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.T809Constants;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.mobile.model.AlarmItem;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;

public class AlarmAction extends QueryAction {
	private static String SUBSCRIBE_ALARMS_KEY = "subscribeAlarmTypes";

	private static String KEY_ALARM_MAP = "key_alarm_map";

	private int alarmId;

	private String remark;

	private Alarm alarm;
	// 报警处理标志 0 未处理，1已处理 2已解除报警
	private int processed;

	private Map alarmData = new HashMap();

	private String subscribeAlarmTypes;

	private IVehicleService vehicleService;
	private ITerminalService terminalService;

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	/**
	 * 报警订阅
	 * 
	 * @return
	 */
	public String subscribe() {
		getSubscribeAlarmTypeMap().clear();
		if (StringUtil.isNullOrEmpty(subscribeAlarmTypes) == false) {
			String[] vehicleIds = subscribeAlarmTypes.split(",");
			for (String alarmType : vehicleIds) {
				// vehicleIdList.add(Integer.parseInt(vehicleId));
				getSubscribeAlarmTypeMap().put(alarmType, alarmType);
			}
		} else {
		}
		return json(true, "");
	}

	private Map<String, String> getSubscribeAlarmTypeMap() {
		Map<String, String> alarmTypeMap = (Map<String, String>) getSession()
				.get(SUBSCRIBE_ALARMS_KEY);
		if (alarmTypeMap == null) {
			alarmTypeMap = new HashMap<String, String>();
			getSession().put(SUBSCRIBE_ALARMS_KEY, alarmTypeMap);
		}
		return alarmTypeMap;
	}

	// 将报警数据发给页面弹窗显示
	public String alarm() {
		if (this.getOnlineUser() == null)
			return json(false, "会话已过期,请重新登录");
		try {
			String queryId = "selectNewAlarms";
			Map params = new HashMap();
			String tableName = "NewAlarm"
					+ DateUtil.toStringByFormat(new Date(), "yyyyMM");
			params.put("tableName", tableName);// 报警数据是一个月一张表
			
			Date date = DateUtil.getDate(new Date(), Calendar.MINUTE, -2); // 当前一分钟内产生的报警
			params.put("startTime", date);
			// params.put("status", "New");
			try {
				result = this.getQueryDao().queryForList(queryId, params);
				result = filterAlarmResult(result);
				// alarmData.put("alarm", result);
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
			}

			return json(true, result);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String view() {
		try {
			alarm = (Alarm) this.getBaseService().load(Alarm.class, alarmId);
			BasicData bd = getBasicDataService().getBasicDataByCode(
					alarm.getAlarmType(), "AlarmType");
			if (bd != null)
				alarm.setAlarmType(bd.getName());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			alarm = new Alarm();
		}

		return "input";
	}

	/**
	 * 报警处理
	 * 
	 * @return
	 */
	public String process() {
		try {
			alarm = (Alarm) this.getBaseService().load(Alarm.class, alarmId);
			alarm.setRemark(remark);
			alarm.setProcessed(processed);
			alarm.setProcessedTime(new Date());
			UserInfo onlineUser = this.getOnlineUser();
			if (onlineUser != null) {
				alarm.setProcessedUserId(onlineUser.getEntityId());
				alarm.setProcessedUserName(onlineUser.getName());
			}
			this.getBaseService().saveOrUpdate(alarm);

			if (processed == AlarmRecord.PROCESS_CLEAR) {
				// 报警解除，需要给终端发送通用应答
				TerminalCommand tc = new TerminalCommand();
				tc.setCmdType(JT808Constants.CMD_CLEAR_ALARM);
				int msgId = 0x0200;
				int ackResult = 4;// 报警处理确认
				tc.setCmdData("" + alarm.getAckSn() + ";" + msgId + ";" + 4);
				tc.setVehicleId(alarm.getVehicleId());
				SendCommand(tc);
			}

			/**
			 * 809命令，主动上报转发给上级平台的报警处理结果
			 */
			JT809Command jc = new JT809Command();
			try {
				int subCmd = 0x1403;
				jc.setCmd(0x1400);
				jc.setSubCmd(subCmd);
				int result = 1;
				jc.setCmdData(alarm.getEntityId() + ";" + result);
				String hql = "from VehicleData where plateNo = ?";
				VehicleData vd = (VehicleData) this.getBaseService().find(hql,
						alarm.getPlateNo());
				jc.setPlateNo(vd.getPlateNo());
				jc.setPlateColor((byte) vd.getPlateColor());

				SendCommand(jc);
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
			}

			return json(true, "");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}

	protected void SendCommand(TerminalCommand tc) {
		VehicleData vd = vehicleService.getVehicleData(tc.getVehicleId());
		if (vd != null) {
			tc.setPlateNo(vd.getPlateNo());
			tc.setSimNo(vd.getSimNo());
		}
		// tc.setVehicleId(vd.getEntityId());
		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setUserId(onlineUser.getEntityId());
			tc.setOwner(onlineUser.getName());
		}
		getTerminalService().SendCommand(tc);
	}

	protected void SendCommand(JT809Command tc) {

		UserInfo onlineUser = getOnlineUser();
		if (onlineUser != null) {
			tc.setOwner(onlineUser.getName());
			tc.setUserId(onlineUser.getEntityId());
		}
		this.getBaseService().save(tc);
	}

	private List filterMsgTodoResult(List alarmList) {
		Map<String, Date> alarmMap = getAlarmMap();
		List result = new ArrayList();
		for (Object obj : alarmList) {
			Map rowData = (Map) obj;
			Integer alarmId = (Integer) rowData.get("id");
			String key = "warnMsgTodo_" + alarmId;
			if (alarmMap.containsKey(key)) {
				continue;
			} else {
				result.add(rowData);
				alarmMap.put(key, new Date());
			}

			String warnSrc = "" + rowData.get("warnSrc");
			String warnType = "" + rowData.get("warnType");

			String supervisionLevel = "" + rowData.get("supervisionLevel");

			supervisionLevel = "0".equals(supervisionLevel) ? "紧急" : "一般";

			rowData.put("supervisionLevel", supervisionLevel);

			BasicData bd = getBasicDataService().getBasicDataByCode(warnSrc,
					"GovAlarmSrc");
			warnSrc = bd != null ? bd.getName() : "";
			rowData.put("warnSrc", warnSrc);

			bd = getBasicDataService().getBasicDataByCode(warnType,
					"GovAlarmType");
			warnType = bd != null ? bd.getName() : "";
			rowData.put("warnType", warnType);

			String plateColor = "" + rowData.get("plateColor");
			bd = getBasicDataService().getBasicDataByCode(plateColor,
					"plateColor");
			plateColor = bd != null ? bd.getName() : "";
			rowData.put("plateColor", plateColor);

			Date warnTime = (Date) rowData.get("warnTime");
			rowData.put("warnTime",
					DateUtil.toStringByFormat(warnTime, "MM-dd HH:mm:ss"));

			Date supervisionEndTime = (Date) rowData.get("supervisionEndTime");
			rowData.put("supervisionEndtime", DateUtil.toStringByFormat(
					supervisionEndTime, "MM-dd HH:mm:ss"));
		}
		return result;
	}

	private List filterJt808Result(List alarmList) {
		Map<String, Date> alarmMap = getAlarmMap();
		List result = new ArrayList();
		for (Object obj : alarmList) {
			Map rowData = (Map) obj;
			Integer alarmId = (Integer) rowData.get("cmdId");
			String key = "808_" + alarmId;
			if (alarmMap.containsKey(key) == false) {
				result.add(rowData);
				alarmMap.put(key, new Date());
				// convert(rowData);
			} else
				continue;

			Date createDate = (Date) rowData.get("createDate");
			rowData.put("createDate",
					DateUtil.toStringByFormat(createDate, "MM-dd HH:mm:ss"));
			Integer cmdType = (Integer) rowData.get("cmdType");
			String strCmd = Integer.toHexString(cmdType);
			if (strCmd.length() < 4)
				strCmd = "0" + strCmd;
			strCmd = "0x" + strCmd;
			String descr = JT808Constants.GetDescr(strCmd);
			// descr +=","+rowData.get("cmdData");
			rowData.put("cmdType", strCmd);
			rowData.put("subDescr", descr);
		}
		return result;
	}

	/**
	 * 已经报警的，将不再重复弹出
	 * 
	 * @param alarmList
	 * @return
	 */
	private List<AlarmItem> filterAlarmResult(List alarmList) {
		Map<String, Date> alarmMap = getAlarmMap();
		/**
		 * 终端用户订阅的报警类型
		 */
		Map<String, String> subscribeAlarmTypeMap = getSubscribeAlarmTypeMap();
		List<AlarmItem> result = new ArrayList<AlarmItem>();
		for (Object obj : alarmList) {
			Map rowData = (Map) obj;
			Integer alarmId = (Integer) rowData.get("id");
			Integer depId = (Integer) rowData.get("depId");
			// 车辆不是用户所管辖的部门
			if (super.isAuthorizedDep(depId) == false)
				continue;
			String alarmType = "" + rowData.get("alarmType");

			String key = "_" + alarmId;
			// 只推送未推送的报警，已经推送到前台的，不再推送。
			if (alarmMap.containsKey(key) == false
					&& subscribeAlarmTypeMap.containsKey(alarmType)) {
				// 查看该类型的报警，数据库中是否配置
				BasicData bd = getBasicDataService().getBasicDataByCode(
						alarmType, "AlarmType");
				if (bd != null && bd.getDeleted() == false) {
					// 报警声音的开关配置在meta属性中.
					boolean alarmSoundEnabled = bd.getMeta() != null
							&& bd.getMeta().equals("true");

					rowData.put("alarmSoundEnabled", alarmSoundEnabled);
					alarmMap.put(key, new Date());
					AlarmItem item = convert(rowData);
					result.add(item);
				}

			}

		}
		return result;
	}

	private AlarmItem convert(Map rowData) {
		AlarmItem item = new AlarmItem();
		String alarmType = "" + rowData.get("alarmType");
		item.setAlarmType(alarmType);

		BasicData bd = getBasicDataService().getBasicDataByCode(alarmType,
				"AlarmType");
		String alarmTypeDescr = "报警类型未定义:" + alarmType;
		if (bd != null)
			alarmTypeDescr = bd.getName();

		if (rowData.get("descr") != null)
			alarmTypeDescr += "," + rowData.get("descr");
		item.setAlarmTypeDescr(alarmTypeDescr);

		item.setLatitude(Double.parseDouble("" + rowData.get("latitude")));
		item.setLongitude(Double.parseDouble("" + rowData.get("longitude")));
		item.setLocation("" + rowData.get("location"));
		item.setDepName("" + rowData.get("depName"));
		// 报警来源
		String alarmSource = "" + rowData.get("alarmSource");
		bd = getBasicDataService().getBasicDataByCode(alarmSource,
				"AlarmSource");
		if (bd != null)
			item.setAlarmSource(bd.getName());
		// 车牌号
		String plateColor = "" + rowData.get("plateColor");
		bd = getBasicDataService().getBasicDataByCode(plateColor, "PlateColor");
		if (bd != null)
			rowData.put("plateColor", bd.getName());

		String processed = "" + rowData.get("processed");
		bd = getBasicDataService().getBasicDataByCode(processed, "ProcessType");
		if (bd != null)
			rowData.put("processed", bd.getName());

		String plateNo = "" + rowData.get("plateNo");
		item.setPlateNo(plateNo);
		Department dep = getVehicleService().getDepartmentByPlateNo(plateNo);

		Date alarmDate = (Date) rowData.get("startTime");
		item.setAlarmTime(DateUtil.toStringByFormat(alarmDate,
				"yyyy-MM-dd HH:mm:ss"));

		String depName = "";
		if (dep != null)
			depName = dep.getName();
		item.setDepName(depName);

		return item;

	}

	/**
	 * 已经报警的记录，保存在Session中，避免重复报警
	 * 
	 * @return
	 */
	public Map<String, Date> getAlarmMap() {
		Map<String, Date> alarmMap = (Map<String, Date>) getSession().get(
				KEY_ALARM_MAP);
		if (alarmMap == null) {
			alarmMap = new HashMap<String, Date>();
			getSession().put(KEY_ALARM_MAP, alarmMap);
		}
		return alarmMap;
	}

	public int getAlarmId() {
		return alarmId;
	}

	public void setAlarmId(int alarmId) {
		this.alarmId = alarmId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getProcessed() {
		return processed;
	}

	public void setProcessed(int processed) {
		this.processed = processed;
	}

	public ITerminalService getTerminalService() {
		return terminalService;
	}

	public void setTerminalService(ITerminalService terminalService) {
		this.terminalService = terminalService;
	}

	public Alarm getAlarm() {
		return alarm;
	}

	public void setAlarm(Alarm alarm) {
		this.alarm = alarm;
	}

}
