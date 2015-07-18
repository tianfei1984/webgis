package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.List;

import com.ltmonitor.entity.EnclosureBinding;

/**
 * 车辆绑定
 * 
 * @author Administrator
 * 
 */
public class EnclosureBindingAction extends PaginateAction {

	private int[] vehicleIds;

	private int vehicleId;

	private int[] enclosureIds;

	private int[] bindId;

	private int enclosureId;

	public String view() {
		return "input";
	}

	/**
	 * 绑定
	 * 
	 * @return
	 */
	public String bindEnclosure() {
		try {
			if (vehicleIds == null)
				return json(false, "请选择要绑定的车辆");

			if (enclosureId == 0)
				return json(false, "请选择要绑定的围栏");
			List<EnclosureBinding> result = new ArrayList<EnclosureBinding>();
			for (int vId : vehicleIds) {
				EnclosureBinding eb = this.getBinding(enclosureId, vId);
				eb.setBindType(EnclosureBinding.BINDING_PLATFORM);
				result.add(eb);
			}
			if (result.size() > 0) {
				this.getBaseService().saveOrUpdateAll(result);
			}
			return json(true, "");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}

	/**
	 * 解除绑定
	 * 
	 * @return
	 */
	public String unbindEnclosure() {
		if (vehicleIds == null)
			return json(false, "请选择要解除的车辆");
		if (enclosureId == 0)
			return json(false, "请选择要解除的围栏");
		try {
			List<EnclosureBinding> result = new ArrayList<EnclosureBinding>();
			for (int vId : vehicleIds) {
				EnclosureBinding eb = this.getBinding(enclosureId, vId);
				eb.setBindType(EnclosureBinding.BINDING_PLATFORM);
				result.add(eb);
			}
			if (result.size() > 0) {
				this.getBaseService().saveOrUpdateAll(result);
			}
			return json(true, "");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	/**
	 * 绑定
	 * 
	 * @return
	 */
	public String bindVehicle() {
		try {
			if (enclosureIds == null)
				return json(false, "请选择要绑定的区域或线路");
			List<EnclosureBinding> result = new ArrayList<EnclosureBinding>();
			for (int eId : enclosureIds) {
				EnclosureBinding eb = getBinding(eId, this.getVehicleId());
				eb.setBindType(EnclosureBinding.BINDING_PLATFORM);
				// EnclosureBinding eb = new EnclosureBinding(eId, vehicleId);
				result.add(eb);
			}
			if (result.size() > 0) {
				this.getBaseService().saveOrUpdateAll(result);
			}
			// return json(true, "");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			// return json(false, ex.getMessage());
		}
		return json(true, "");

	}

	private EnclosureBinding getBinding(int enclosureId, int vehicleId) {
		String hql = "from EnclosureBinding where enclosureId = ? and vehicleId = ?";

		EnclosureBinding eb = (EnclosureBinding) this.getBaseService().find(
				hql, new Object[] { enclosureId, vehicleId });
		if (eb == null) {
			eb = new EnclosureBinding();
			eb.setEnclosureId(enclosureId);
			eb.setVehicleId(vehicleId);
		}
		return eb;
	}

	/**
	 * 解除绑定
	 * 
	 * @return
	 */
	public String unbindVehicle() {
		try {
			String hql = "from EnclosureBinding where vehicleId = ? and enclosureId = ? and platform = ?";
			EnclosureBinding eb = (EnclosureBinding) this.getBaseService()
					.find(hql, new Object[] { vehicleId, enclosureId, true });
			if (eb != null) {
				eb.setBindType(EnclosureBinding.BINDING_PLATFORM);
				this.getBaseService().saveOrUpdate(eb);
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
		return json(true, "");
	}

	public int[] getVehicleIds() {
		return vehicleIds;
	}

	public void setVehicleIds(int[] vehicleId) {
		this.vehicleIds = vehicleId;
	}

	public int[] getBindId() {
		return bindId;
	}

	public void setBindId(int[] bindId) {
		this.bindId = bindId;
	}

	public int getEnclosureId() {
		return enclosureId;
	}

	public void setEnclosureId(int enclosureId) {
		this.enclosureId = enclosureId;
	}

	public int[] getEnclosureIds() {
		return enclosureIds;
	}

	public void setEnclosureIds(int[] enclosureIds) {
		this.enclosureIds = enclosureIds;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

}
