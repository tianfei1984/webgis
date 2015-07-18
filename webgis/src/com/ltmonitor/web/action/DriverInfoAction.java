package com.ltmonitor.web.action;

import java.util.List;

import com.ltmonitor.entity.DriverInfo;
import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.entity.Terminal;

public class DriverInfoAction extends PersistenceAction{
	
	private boolean mainDriver ;


	protected Class getEntityClass() {
		entityClass = DriverInfo.class;
		return entityClass;
	}
	
	/**
	 * 新增后的保存操作
	 * 
	 * @return
	 */
	public String save() throws Exception {

		try {

			entity = populateEntity();
			
			DriverInfo d = (DriverInfo)entity;
			
			d.setMainDriver(mainDriver);
			//一个车只能有一个主驾驶，需要将同一车的其他主驾驶设置为false
			if(mainDriver && d.getVehicleId() > 0)
			{
				String hsql = "from DriverInfo where vehicleId = ? and mainDriver = ? and entityId <> ? ";
				List ls = this.getBaseService().query(hsql, new Object[]{d.getVehicleId(),true,d.getEntityId()});
				for(Object obj : ls)
				{
					DriverInfo dr = (DriverInfo)obj;
					dr.setMainDriver(false);
					this.getBaseService().saveOrUpdate(dr);
				}
			}

			if (entityID == null)
				baseService.save(d);
			else
				baseService.saveOrUpdate(d);

			this.setMessage("保存成功");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}

		return SAVE_SUCCESS;
	}


	public boolean isMainDriver() {
		return mainDriver;
	}


	public void setMainDriver(boolean mainDriver) {
		this.mainDriver = mainDriver;
	}
}
