package com.ltmonitor.web.action;

import java.util.HashMap;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.ltmonitor.entity.AlarmConfig;
/**
 * 配置报警类型是否启用，报警声音是否启用。
 * @author Administrator
 *
 */

public class AlarmConfigAction extends GenericAction {

	private List<AlarmConfig> alarmConfigs;

	private int[] alarmEnable;
	private int[] alarmSoundEnable;
	//
	private int[] alarmPopupEnable;

	public String view() {
		alarmConfigs = getAlarmTypeList();
		
		for(Object obj:alarmConfigs)
		{
			AlarmConfig a = (AlarmConfig)obj;
			String sourceDescr = super.convert(a.getAlarmSource(), "AlarmSource");
			a.setAlarmSource(sourceDescr);
		}

		return "success";

	}
	
	private List getAlarmTypeList()
	{		
		String queryString = "from AlarmConfig b  order by b.alarmSource ASC";
		return this.getBaseService().query(queryString);
	}

	public String config() {
		try {
			alarmConfigs = getAlarmTypeList();
			// alarmTypes =
			// AlarmConfigService.getAlarmConfigByParentCode("AlarmType");
			HashMap<Integer, Integer> alarmEnableMap = new HashMap<Integer, Integer>();
			HashMap<Integer, Integer> soundEnableMap = new HashMap<Integer, Integer>();
			HashMap<Integer, Integer> popupEnableMap = new HashMap<Integer, Integer>();
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
			if (alarmPopupEnable != null) {
				for (int typeId : alarmPopupEnable) {
					popupEnableMap.put(typeId, typeId);
				}
			}
			
			for (AlarmConfig bd : alarmConfigs) {
				int typeId = bd.getEntityId();
				bd.setEnabled(alarmEnableMap.containsKey(typeId));
				bd.setSoundEnabled(soundEnableMap.containsKey(typeId));
				bd.setPopupEnabled(popupEnableMap.containsKey(typeId));
			}
			this.getBaseService().saveAlarmConfig(alarmConfigs);
			this.setMessage("");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}
		return "success";
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

	public int[] getAlarmPopupEnable() {
		return alarmPopupEnable;
	}

	public void setAlarmPopupEnable(int[] alarmPopupEnable) {
		this.alarmPopupEnable = alarmPopupEnable;
	}

	public List<AlarmConfig> getAlarmConfigs() {
		return alarmConfigs;
	}

	public void setAlarmConfigs(List<AlarmConfig> alarmConfigs) {
		this.alarmConfigs = alarmConfigs;
	}

}
