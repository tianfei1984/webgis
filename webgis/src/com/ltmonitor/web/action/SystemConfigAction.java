package com.ltmonitor.web.action;

import com.ltmonitor.entity.PlatformState;
import com.ltmonitor.entity.SystemConfig;

public class SystemConfigAction extends PersistenceAction{

	protected Class getEntityClass() {
		entityClass = SystemConfig.class;
		return entityClass;
	}
	
	public String platformState()
	{
		try {
			PlatformState ps = this.getBaseService().getPlatformState();
			
			return json(true, ps);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			
			return json(false, e.getMessage());
		}
	}

}
