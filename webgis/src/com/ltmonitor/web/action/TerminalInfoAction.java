package com.ltmonitor.web.action;

import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.entity.Terminal;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.IVehicleService;

/**
 * 终端信息
 * 
 * @author DELL
 * 
 */
public class TerminalInfoAction extends PersistenceAction {

	private IVehicleService vehicleService;

	protected Class getEntityClass() {
		entityClass = Terminal.class;
		return entityClass;
	}

	public String delete() {
		try {
			String hql = "from VehicleData where termId = ?";
			VehicleData vd = (VehicleData) this.baseService.find(hql,
					Integer.parseInt(entityID));
			if (vd != null) {
				vd.setTermId(0);
				this.baseService.saveOrUpdate(vd);
			}
			return super.delete();
		} catch (Exception e) {
			return json(false, e.getMessage());
		}
	}

	/**
	 * 新增后的保存操作
	 * 
	 * @return
	 */
	public String save() throws Exception {

		try {

			entity = populateEntity();
			vehicleService.saveTerminal((Terminal) entity);
			entityID = "" + ((TenantEntity) entity).getEntityId();

			this.setMessage("保存成功");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}

		return SAVE_SUCCESS;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

}
