package com.ltmonitor.mobile.action;

import java.util.HashMap;
import java.util.List;

import com.ltmonitor.entity.AlarmConfig;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.web.action.GenericAction;
/**
 * 配置报警类型是否启用，报警声音是否启用。
 * @author Administrator
 *
 */
public class MobileAlarmConfigAction extends GenericAction {

	private List<BasicData> alarmTypes;

	private int[] alarmEnable;
	private int[] alarmSoundEnable;

	public String view() {
		try {
			alarmTypes = getAlarmTypeList();
			for(Object obj:alarmTypes)
			{
				AlarmConfig a = (AlarmConfig)obj;
				String sourceDescr = super.convert(a.getAlarmSource(), "AlarmSource");
				a.setAlarmSource(sourceDescr);
			}
			

			return json(true, alarmTypes);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return json(false,e.getMessage());
		}
	}
	
	private List getAlarmTypeList()
	{		
		String queryString = "from AlarmConfig b  order by b.alarmSource ASC";
		return this.getBaseService().query(queryString);
	}

	public String config() {
		try {
			alarmTypes = getAlarmTypeList();
			// alarmTypes =
			// basicDataService.getBasicDataByParentCode("AlarmType");
			HashMap<Integer, Integer> alarmEnableMap = new HashMap<Integer, Integer>();
			HashMap<Integer, Integer> soundEnableMap = new HashMap<Integer, Integer>();
			if (alarmEnable != null) {
				for (int typeId : alarmEnable) {
					alarmEnableMap.put(typeId, typeId);
				}
			}
			if (alarmSoundEnable != null) {
				for (int typeId : alarmSoundEnable) {
					soundEnableMap.put(typeId, typeId);
				}
			}
			for (BasicData bd : alarmTypes) {
				int typeId = bd.getEntityId();
				bd.setDeleted(alarmEnableMap.containsKey(typeId)==false);
				bd.setMeta("" + soundEnableMap.containsKey(typeId));
			}
			this.basicDataService.save(alarmTypes);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}
		return "success";
	}

	public List<BasicData> getAlarmTypes() {
		return alarmTypes;
	}

	public void setAlarmTypes(List<BasicData> alarmTypes) {
		this.alarmTypes = alarmTypes;
	}

	public int[] getAlarmSoundEnable() {
		return alarmSoundEnable;
	}

	public void setAlarmSoundEnable(int[] alarmSoundEnable) {
		this.alarmSoundEnable = alarmSoundEnable;
	}

	public int[] getAlarmEnable() {
		return alarmEnable;
	}

	public void setAlarmEnable(int[] alarmEnable) {
		this.alarmEnable = alarmEnable;
	}

}
