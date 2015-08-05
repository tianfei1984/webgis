package com.ltmonitor.command.action;

import java.util.ArrayList;
import java.util.List;

import com.ltmonitor.entity.Enclosure;
import com.ltmonitor.entity.EnclosureBinding;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.service.IBaseService;

/**
 * 围栏下发
 * 
 * @author DELL
 * 
 */
public class SendEnclosureAction extends TerminalCommandAction {

	private String[] enclosureId;
	private String areaIds;

	/**
	 * 配置类型 0：更新区域； 1：追加区域； 2：修改区域 ；3 删除单个区域
	 */
	private int configType;

	private String enclosureType;

	private String bindType;

	private IBaseService baseService;

	public String execute() {
		if (input != null)
			return "input";
		if (areaIds == null) {
			// this.setMessage("请选择要下发的区域");
			return json(false, "请选择要下发的区域或线路!");
		}
		int commandId = 0;
		try {
			enclosureId = areaIds.split(",");
			for (String strId : enclosureId) {
				int id = Integer.parseInt(strId);
				Enclosure ec = (Enclosure) baseService
						.load(Enclosure.class, id);
				EnclosureBinding eb = getBinding(id, this.getVehicleId());
				if (bindType.equals(EnclosureBinding.BINDING_TERMINAL)) {
					TerminalCommand tc = createCommand(ec);
					eb.setCommandId(tc.getEntityId());
					commandId = tc.getEntityId();
				}
				eb.setRemark(ec.getEnclosureType());//围栏类型
				eb.setConfigType(configType);
				eb.setBindType(bindType);
				this.baseService.saveOrUpdate(eb);
			}
		} catch (Exception ex) {
			return json(false, ex.getMessage());
		}
		return json(true, commandId);
	}

	private EnclosureBinding getBinding(int enclosureId, int vehicleId) {
		String hql = "from EnclosureBinding where enclosureId = ? and vehicleId = ?";

		EnclosureBinding eb = (EnclosureBinding) this.baseService.find(hql,
				new Object[] { enclosureId, vehicleId });
		if (eb == null) {
			eb = new EnclosureBinding();
			eb.setEnclosureId(enclosureId);
			eb.setVehicleId(vehicleId);
		}
		return eb;
	}

	private List<EnclosureBinding> getAllBinding(int vehicleId,
			String enclosureType) {
		String hql = "from EnclosureBinding where  vehicleId = ? and remark = ? and bindType=?";

		List ebList = (List) this.baseService.query(hql, new Object[] {
				vehicleId, enclosureType ,EnclosureBinding.BINDING_TERMINAL});
		List<EnclosureBinding> result = new ArrayList<EnclosureBinding>();
		for (int m = 0; m < ebList.size(); m++) {
			EnclosureBinding eb = (EnclosureBinding) ebList.get(m);
			Enclosure ec = (Enclosure) baseService.load(Enclosure.class,
					eb.getEnclosureId());

			if (ec.getEnclosureType().equals(enclosureType)) {
				result.add(eb);
			}

		}
		return result;
	}

	/**
	 * 删除终端的某一区域类型的所有区域
	 * 
	 * @return
	 */
	public String deleteAll() {
		try {
			int commandId = 0;
			TerminalCommand tc = new TerminalCommand();
			tc.setCmdData("");
			// tc.setCmd("" + configType);
			if (Enclosure.CIRCLE.equals(enclosureType)) {
				tc.setCmdType(JT808Constants.CMD_DELETE_CIRCLE);
			} else if (Enclosure.RECT.equals(enclosureType)) {
				tc.setCmdType(JT808Constants.CMD_DELETE_RECT);
			} else if (Enclosure.POLYGON.equals(enclosureType)) {
				tc.setCmdType(JT808Constants.CMD_DELETE_POLYGON);
			} else if (Enclosure.ROUTE.equals(enclosureType)) {
				tc.setCmdType(JT808Constants.CMD_DELETE_ROUTE);
			}

			SendCommand(tc);
			commandId = tc.getEntityId();
			List<EnclosureBinding> ebList = getAllBinding(this.getVehicleId(),
					enclosureType);
			for (EnclosureBinding eb : ebList) {
				eb.setCommandId(tc.getEntityId());
				eb.setConfigType(3);
			}
			if(!ebList.isEmpty()){
				this.baseService.saveOrUpdateAll(ebList);
			}

			return json(true, commandId);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	private TerminalCommand createCommand(Enclosure ec) {

		TerminalCommand tc = new TerminalCommand();
		tc.setCmdData("" + ec.getEntityId());
		tc.setCmd("" + configType);
		if (Enclosure.CIRCLE.equals(ec.getEnclosureType())) {
			tc.setCmdType(JT808Constants.CMD_CIRCLE_CONFIG);
			if (configType == 3) {
				tc.setCmdType(JT808Constants.CMD_DELETE_CIRCLE);
			}
		} else if (Enclosure.RECT.equals(ec.getEnclosureType())) {
			tc.setCmdType(JT808Constants.CMD_RECT_CONFIG);
			if (configType == 3) {
				tc.setCmdType(JT808Constants.CMD_DELETE_RECT);
			}
		} else if (Enclosure.POLYGON.equals(ec.getEnclosureType())) {
			tc.setCmdType(JT808Constants.CMD_POLYGON_CONFIG);
			if (configType == 3) {
				tc.setCmdType(JT808Constants.CMD_DELETE_POLYGON);
			}
		} else if (Enclosure.ROUTE.equals(ec.getEnclosureType())) {
			tc.setCmdType(JT808Constants.CMD_ROUTE_CONFIG);
			if (configType == 3) {
				tc.setCmdType(JT808Constants.CMD_DELETE_ROUTE);
			}
		}

		SendCommand(tc);
		return tc;

	}

	public String getEnclosureList() {
		try {
			List result = getAuthoriedEnclosureList();
			
			return json(true, result);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}
	

	private List getAuthoriedEnclosureList() {
		if (this.getOnlineUser().isSuperAdmin()) {
			//超级用户能看到所有区域
			String hsql = "from Enclosure where  deleted = 0";
			return this.getBaseService().query(hsql);
		} else {
			//根据用户所属的部门，查询区域
			List<Integer> parentIdList = this.getDepartmentService()
					.getParentDepIdList(this.getOnlineUser().getRegionId());
			parentIdList.add(0);
			String hql = "from Enclosure where depId in (:depIdList) and deleted = 0";

			List ls = this.getBaseService().queryByNamedParam(hql,
					"depIdList", parentIdList.toArray());
			return ls;
		}
	}
	

	public String[] getEnclosureId() {
		return enclosureId;
	}

	public void setEnclosureId(String[] enclosureId) {
		this.enclosureId = enclosureId;
	}

	public IBaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}

	public int getConfigType() {
		return configType;
	}

	public void setConfigType(int configType) {
		this.configType = configType;
	}

	public String getEnclosureType() {
		return enclosureType;
	}

	public void setEnclosureType(String enclosureType) {
		this.enclosureType = enclosureType;
	}

	public String getAreaIds() {
		return areaIds;
	}

	public void setAreaIds(String areaIds) {
		this.areaIds = areaIds;
	}

	public String getBindType() {
		return bindType;
	}

	public void setBindType(String bindType) {
		this.bindType = bindType;
	}

}
