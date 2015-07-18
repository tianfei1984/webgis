package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.DriverInfo;
import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.entity.Terminal;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.entity.VehicleInfoModifyRecord;
import com.ltmonitor.service.IDepartmentService;
import com.ltmonitor.service.IRealDataService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.web.action.PersistenceAction;
import com.mysql.jdbc.Driver;

public class VehicleAction extends PersistenceAction {

	private VehicleData vehicleData;
	
	private int depId;

	private int vehicleId;

	private int driverId;

	private int terminalId;

	private String termNo;

	private String terminalType;

	private IVehicleService vehicleService;

	private IDepartmentService departmentService;

	private DaoIbatisImpl queryDao;

	private Map vehicleInfo;

	private Map driverInfo;

	private Terminal terminal;

	private int saveAndNew = 0;

	public String view() {
		if (vehicleId > 0)
			this.setEntityID("" + vehicleId);
		entity = this.populateEntity();
		VehicleData vd = (VehicleData) entity;

		if (input != null) {
			vehicleId = vd.getEntityId();
			viewVehicleInfo();
			return "input";
		}

		if (vd.getTermId() > 0) {
			try {
				terminal = this.vehicleService.getTerminal(vd.getTermId());
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		}
		if (terminal == null)
			terminal = new Terminal();
		return "view";
	}
	

	

	/**
	 * 假删除
	 * 
	 * @return
	 */
	public String fakeDelete() {
		try {
			int id = vehicleId;
			VehicleInfoModifyRecord vr = new VehicleInfoModifyRecord();
			vr.setVehicleId(id);
			vr.setType(VehicleInfoModifyRecord.MODIFY_DELETE);

			UserInfo user = this.getOnlineUser();
			vr.setUserName(user.getName());
			StringBuilder detail = new StringBuilder();
			detail.append("车辆删除");

			vr.setDetail("删除车辆");
			this.baseService.saveOrUpdate(vr);
			vehicleService.delete(id);
			return super.json(true, "记录已被成功刪除!");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String viewVehicleInfo() {
		try {

			Map params = new HashMap();
			// 单车监控，用于生成监控车辆轨迹
			params.put("vehicleId", vehicleId);
			String queryId = "selectVehicles"; // 查询单个车辆的综合信息
			List result = this.queryDao.queryForList(queryId, params);
			// convert(result);
			if (result.size() > 0)
				vehicleInfo = (Map) result.get(0);
			else {
				vehicleInfo = new HashMap();
				this.setMessage("没有该车辆的信息数据");
			}
			// 还要加载驾驶员信息
			//this.viewDriverInfo();
			return json(true, vehicleInfo);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
			return json(false, ex.getMessage());
		}
	}

	public String getTerminalInfo() {
		try {
			Terminal t = (Terminal) this.baseService.load(Terminal.class,
					this.terminalId);

			return json(true, t);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	/**
	 * 查看驾驶员信息
	 * 
	 * @return
	 */
	public String viewDriverInfo() {
		try {
			if (vehicleId == 0 && driverId == 0) {
				driverInfo = new HashMap();
				this.setMessage("没有驾驶员信息数据");
			} else {

				Map params = new HashMap();
				// 单车监控，用于生成监控车辆轨迹
				if (vehicleId > 0) {
					params.put("vehicleId", vehicleId);
				}
				if (driverId > 0) {
					params.put("driverId", driverId);
				}

				String queryId = "selectDrivers"; // 查询单个车辆的综合信息
				List result = this.queryDao.queryForList(queryId, params);
				convertDriverInfo(result);
				if (result.size() > 0)
					driverInfo = (Map) result.get(0);
				else {
					driverInfo = new HashMap();
					this.setMessage("没有驾驶员信息数据");
				}
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}
		return "view";

	}

	private void convertDriverInfo(List ls) {
		for (Object rowData : ls) {
			Map rd = (Map) rowData;
			convert(rd, "sex", "Sex");// 性别转换
			convert(rd, "drivingType", "drivingType");// 驾驶车型
		}
	}

	private void convert(List ls) {
		for (Object rowData : ls) {
			Map rd = (Map) rowData;
			convert(rd, "runStatus", "runStatus");
			convert(rd, "useType", "UseType");
			convert(rd, "plateColor", "plateColor");
		}
	}

	public String save() {
		entity = populateEntity();
		VehicleData vd = (VehicleData) entity;
		if(depId == 0)
		{
			this.setMessage("请选择车组");
			return json(false, this.getMessage());
		}
		vehicleId = vd.getEntityId();
		List<VehicleInfoModifyRecord> modifyRecordList = new ArrayList<VehicleInfoModifyRecord>();
		if (vehicleId > 0) {
			UserInfo user = this.getOnlineUser();
			VehicleData oldVd = this.vehicleService.getVehicleData(vehicleId);

			if (oldVd.getPlateNo().equals(vd.getPlateNo()) == false
					|| oldVd.getPlateColor() != vd.getPlateColor()) {
				VehicleInfoModifyRecord vr = new VehicleInfoModifyRecord();
				vr.setVehicleId(vehicleId);
				vr.setType(VehicleInfoModifyRecord.MODIFY_PLATENO);
				vr.setUserName(user.getName());
				StringBuilder detail = new StringBuilder();
				if (oldVd.getPlateNo().equals(vd.getPlateNo()) == false) {
					detail.append("车牌号由[").append(oldVd.getPlateNo())
							.append("]变更为[").append(vd.getPlateNo())
							.append("]");
				}
				if (oldVd.getPlateColor() != vd.getPlateColor()) {
					String oldColorDescr = super.convert(
							"" + oldVd.getPlateColor(), "plateColor");
					String colorDescr = super.convert("" + vd.getPlateColor(),
							"plateColor");
					if (detail.length() > 0)
						detail.append(",");
					detail.append("车牌颜色由[").append(oldColorDescr)
							.append("]变更为[").append(colorDescr).append("]");
				}
				vr.setDetail(detail.toString());
				modifyRecordList.add(vr);
			}
			if (oldVd.getSimNo().equals(vd.getSimNo()) == false) {
				VehicleInfoModifyRecord vr = new VehicleInfoModifyRecord();
				vr.setVehicleId(vehicleId);
				vr.setType(VehicleInfoModifyRecord.MODIFY_SIMNO);
				vr.setUserName(user.getName());
				StringBuilder detail = new StringBuilder();
				detail.append("sim卡号由[").append(oldVd.getPlateNo())
						.append("]变更为[").append(vd.getPlateNo()).append("]");

				vr.setDetail(detail.toString());
				modifyRecordList.add(vr);
			}
			if (oldVd.getDepId() != vd.getDepId()) {
				VehicleInfoModifyRecord vr = new VehicleInfoModifyRecord();
				vr.setVehicleId(vehicleId);
				vr.setType(VehicleInfoModifyRecord.MODIFY_DEPARTMENT);
				vr.setUserName(user.getName());
				Department oldDep = this.departmentService.fetchDepartment(oldVd
						.getDepId());
				Department dep = this.departmentService.fetchDepartment(vd
						.getDepId());
				StringBuilder detail = new StringBuilder();
				detail.append("过户由[").append(oldDep.getName()).append("]变更为[")
						.append(dep.getName()).append("]");
				vr.setDetail(detail.toString());
				modifyRecordList.add(vr);
			}
			if (oldVd.getTermId() != vd.getTermId()) {
				if (oldVd.getTermId() > 0) {
					try {
						Terminal t = (Terminal) baseService.load(
								Terminal.class, oldVd.getTermId());
						t.setBind(false);
						baseService.saveOrUpdate(t);
					} catch (Exception e) {
						log.error(e.getMessage(), e);
					}
				}
			}
		}
		try {
			Terminal t = null;
			if (vd.getTermId() > 0) {
				try {
					t = (Terminal) baseService.load(Terminal.class,
							vd.getTermId());
				} catch (Exception e) {
					log.error(e.getMessage(), e);
				}
			} else {
				t = new Terminal();
			}
			t.setTermNo(this.termNo);
			t.setTermType(this.terminalType);
			t.setBind(true);
			t.setSimNo(vd.getSimNo());
			vehicleService.saveTerminal(t);
			vd.setTermId(t.getEntityId());
			vehicleService.saveVehicleData(vd, modifyRecordList);
			entityID = "" + ((TenantEntity) entity).getEntityId();
			setMessage("保存成功!");
			return json(true, this.getMessage());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			setMessage(ex.getMessage());
			return json(false, this.getMessage());
		}

	}

	protected Class getEntityClass() {
		entityClass = VehicleData.class;
		return entityClass;
	}

	public VehicleData getVehicleData() {
		return vehicleData;
	}

	public void setVehicleData(VehicleData vehicleData) {
		this.vehicleData = vehicleData;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

	public Map getVehicleInfo() {
		return vehicleInfo;
	}

	public void setVehicleInfo(Map vehicleInfo) {
		this.vehicleInfo = vehicleInfo;
	}

	public int getDriverId() {
		return driverId;
	}

	public void setDriverId(int driverId) {
		this.driverId = driverId;
	}

	public Map getDriverInfo() {
		return driverInfo;
	}

	public void setDriverInfo(Map driverInfo) {
		this.driverInfo = driverInfo;
	}

	public IDepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public Terminal getTerminal() {
		return terminal;
	}

	public void setTerminal(Terminal terminal) {
		this.terminal = terminal;
	}

	public int getTerminalId() {
		return terminalId;
	}

	public void setTerminalId(int terminalId) {
		this.terminalId = terminalId;
	}

	public int getSaveAndNew() {
		return saveAndNew;
	}

	public void setSaveAndNew(int saveAndNew) {
		this.saveAndNew = saveAndNew;
	}

	public String getTermNo() {
		return termNo;
	}

	public void setTermNo(String termNo) {
		this.termNo = termNo;
	}

	public String getTerminalType() {
		return terminalType;
	}

	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}


	public int getDepId() {
		return depId;
	}


	public void setDepId(int depId) {
		this.depId = depId;
	}
}
