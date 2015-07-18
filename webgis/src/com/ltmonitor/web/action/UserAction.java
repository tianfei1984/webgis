package com.ltmonitor.web.action;

import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.Role;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.service.IDepartmentService;

/**
 * 用户信息编辑更新，修改密码
 * 
 * @author DELL
 * 
 */
public class UserAction extends PersistenceAction {

	private IDepartmentService departmentService;
	// 用户选择的多个部门车组ID，用逗号隔开,如1，21，34的形式
	private String strDepId;
	// 用户分配的角色Id
	private int roleId;

	private String oldPsd;

	private String newPsd;

	private double lat;

	private double lng;

	private int zoom;

	private String mapType;

	/**
	 * 用户更改自己的密码
	 * 
	 * @return
	 */
	public String updatePassword() {
		if (input != null)
			return "input";

		UserInfo user = getOnlineUser();
		if (user != null) {
			if (user.getPassword().equals(oldPsd)) {
				user.setPassword(newPsd);
				getBaseService().update(user);
				setMessage("修改成功");
			} else {
				setMessage("旧密码不正确");

			}
		}
		return "success";
	}

	public String view() {
		super.view();
		UserInfo user = (UserInfo) this.getEntity();
		if (user.getEntityId() > 0) {
			user.setPassword("");
			Role r = user.getRole();
			if (r != null)
				roleId = r.getEntityId(); // 用于页面显示用户已经分配的角色
		}
		return "view";
	}

	public String save() {
		try {
			UserInfo user = (UserInfo) populateEntity();
			this.setEntity(user);
			String hql = "from UserInfo where loginName = ? and deleted = ? and entityId <> ?";
			UserInfo otherUser = (UserInfo) this.getBaseService().find(
					hql,
					new Object[] { user.getLoginName(), false,
							user.getEntityId() });
			if (otherUser != null) {
				this.setMessage("用户登录名已经存在，请重选输入");
				return "success";
			}
			if(user.getRegionId() == 0)
			{
				this.setMessage("请选择用户所属部门!");
				return "success";				
			}
			if ("clear".equals(strDepId)) {
				user.getDepartments().clear();
			} else if (strDepId != null && strDepId.length() > 0) {

				user.getDepartments().clear();
				String[] depIdArray = strDepId.split(",");
				for (String str : depIdArray) {
					if (str != null && str.length() > 0) {
						int depId = Integer.parseInt(str);
						if (depId > 0) {
							Department dep = (Department) this.getBaseService()
									.load(Department.class, depId);
							user.getDepartments().add(dep);
						}
					}
				}
			}
			if (roleId > 0) {
				// 分配角色
				Role r = user.getRole();
				if (r == null || r.getEntityId() != roleId) {
					user.getRoles().clear();
					r = (Role) this.getBaseService().load(Role.class, roleId);
					user.getRoles().add(r);
				}
			}
			this.getBaseService().saveOrUpdate(user);

			setMessage("保存成功!");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage("保存失败:" + ex.getMessage());
		}
		return "success";
	}

	/**
	 * 设置地图中心
	 * 
	 * @return
	 */
	public String setMapCenter() {
		try {
			UserInfo user = this.getOnlineUser();
			if (user != null) {
				user = (UserInfo) this.getBaseService().load(UserInfo.class,
						user.getEntityId());
				user.setMapCenterLng(lng);
				user.setMapCenterLat(lat);
				user.setMapLevel(zoom);
				this.getBaseService().saveOrUpdate(user);// 保存到用户信息中
				this.setOnlineUser(user);
				/**
				 * SystemConfig sc = (SystemConfig) getSession().get(
				 * "systemConfig"); if (sc != null) { sc.setInitLat(lat);
				 * sc.setInitLng(lng); sc.setInitZoomLevel(zoom); }
				 */
				return json(true, "已设置为当前默认地图中心！");
			}
			return json(false, "网页过期，请重新登录!");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}

	}

	/**
	 * 用户修改自己的地图类型
	 * 
	 * @return
	 */
	public String setMyMapType() {
		try {
			UserInfo user = this.getOnlineUser();
			if (user != null) {
				user = (UserInfo) this.getBaseService().load(UserInfo.class,
						user.getEntityId());
				user.setMapType(mapType);
				this.getBaseService().saveOrUpdate(user);// 保存到用户信息中
				this.setOnlineUser(user);

				return json(true, "");
			}
			return json(false, "网页过期，请重新登录!");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}

	}

	public IDepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	protected Class getEntityClass() {
		entityClass = UserInfo.class;
		return entityClass;
	}

	public String getStrDepId() {
		return strDepId;
	}

	public void setStrDepId(String strDepId) {
		this.strDepId = strDepId;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getOldPsd() {
		return oldPsd;
	}

	public void setOldPsd(String oldPsd) {
		this.oldPsd = oldPsd;
	}

	public String getNewPsd() {
		return newPsd;
	}

	public void setNewPsd(String newPsd) {
		this.newPsd = newPsd;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	public int getZoom() {
		return zoom;
	}

	public void setZoom(int zoom) {
		this.zoom = zoom;
	}

	public String getMapType() {
		return mapType;
	}

	public void setMapType(String mapType) {
		this.mapType = mapType;
	}

}