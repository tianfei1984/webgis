package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.entity.Terminal;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.IDepartmentService;
import com.ltmonitor.web.action.TreeNode;
import com.ltmonitor.web.action.PersistenceAction;

public class DepartmentAction extends PersistenceAction {

	private int userId;

	private IDepartmentService departmentService;

	private DaoIbatisImpl queryDao;

	private int depId;

	private List<TreeNode> nodeList = new ArrayList<TreeNode>();

	public String view() {
		if (depId > 0)
			this.setEntityID("" + depId);
		try {
			entity = this.populateEntity();
			Department vd = (Department) entity;
			return json(true, vd);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String depList() {
		try {
			if (this.getOnlineUser() == null)
				return json(false, "会话过期，请重新登录");

			String queryId = "statisticVehicleNum";
			Map params = this.getParams();

			params.put("userId", this.getOnlineUser().getEntityId());
			params.put("depIdList", super.getAuthorizedDepIdList());

			List rs = queryDao.queryForList(queryId, params);

			for (Object obj : rs) {
				Map data = (Map) obj;

				int depId = (Integer) data.get("depId");

				Department dep = this.departmentService.fetchDepartment(depId);
				if (dep.getParentId() > 0) {
					Department parentDep = this.departmentService
							.fetchDepartment(dep.getParentId());
					data.put("parentDepName", parentDep.getName());
				} else
					data.put("parentDepName", "");
				data.put("depName", dep.getName());
				data.put("parentId", dep.getParentId());

			}

			return json(true, rs);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	public String save() {
		try {

			entity = populateEntity();
			Department dep = (Department) entity;
			int depId = dep.getEntityId();
			if (depId > 0) {
				if (depId == dep.getParentId()) {
					this.setMessage("保存错误:上级车组不能是本车组!");
					return json(false, getMessage());
				}

				List<Integer> depIdList = this.departmentService
						.getDepIdList(depId);
				if (depIdList.contains(dep.getParentId())) {
					this.setMessage("上级车组不能是本车组的下级车组!");
					return json(false, getMessage());
				}
			}

			// this.save();
			departmentService.saveDepartment(dep);
			entityID = "" + ((TenantEntity) entity).getEntityId();

			if (depId == 0) {
				String hql = "select u from UserInfo u inner join u.departments f where u.deleted=? and f.entityId=? and f.entityId <> ?";

				List result = this.baseService.query(hql, new Object[] { false,
						dep.getParentId(), dep.getEntityId() });
				for (Object obj : result) {
					UserInfo u = (UserInfo) obj;
					u.getDepartments().add(dep);
					this.baseService.saveOrUpdate(u);
				}
			}
			UserInfo u = this.getOnlineUser();
			u = (UserInfo) this.getBaseService().load(UserInfo.class,
					u.getEntityId());
			this.setOnlineUser(u);
			super.setAuthorizedDep(u);

			this.setMessage("保存成功");
			return json(true, this.getMessage());
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}

	}

	public String fakeDelete() {
		// int depId = Integer.parseInt(entityID);
		try {
			String hql = "select plateNo from VehicleData where depId = ? and deleted = ?";
			Object obj = this.baseService.find(hql,
					new Object[] { depId, false });
			if (obj != null) {
				return super.json(false, "该车组下分配有车辆，不能删除!");
			}
			hql = "select name from Department where parentId = ? and deleted = ?";
			obj = this.baseService.find(hql, new Object[] { depId, false });
			if (obj != null) {
				return super.json(false, "该车组下有子部门，不能删除!");
			}

			baseService.removeByFake(getEntityClass(), depId);
			return super.json(true, "记录已被成功刪除!");
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}
	}

	// 加载部门数据列表，在前端形成树状菜单
	public String getDepMenu() {
		try {
			List<Integer> depIdList = this.getAuthorizedDepIdList();

			String hql = "from Department where deleted = ?";
			List depList = null;
			if (super.getOnlineUser().getUserFlag() == UserInfo.USER_FLAG_SUPER_ADMIN) {
				depList = this.baseService.query(hql, false);
			} else {
				depList = new ArrayList<Department>();
				for (int depId : depIdList) {
					Department dep = departmentService.fetchDepartment(depId);
					if (dep.getDeleted() == false)
						depList.add(dep);
				}
			}

			Map<String, TreeNode> nodeMap = new HashMap<String, TreeNode>();
			for (Object obj : depList) {
				Department bd = (Department) obj;
				String parentId = bd.getParentId() == 0 ? null : ("" + bd
						.getParentId());
				TreeNode node = new TreeNode("" + bd.getEntityId(),
						bd.getName(), parentId, "icon-polygon");
				node.setState("open");
				nodeMap.put(node.getId(), node);
			}

			// 判断是否选中
			Map checkedDepMap = new HashMap();
			if (userId > 0) {
				UserInfo u = (UserInfo) this.getBaseService().load(
						UserInfo.class, userId);
				/**
				 * if (u.getUserFlag() == UserInfo.USER_FLAG_SUPER_ADMIN) {
				 * //超级用户默认全部选中 for (Object depObj : depList) { Department dep =
				 * (Department) depObj; checkedDepMap.put(dep.getEntityId(),
				 * dep); } } else {
				 */
				Set<Department> deps = u.getDepartments();
				for (Department dep : deps) {
					String nodeId = "" + dep.getEntityId();
					TreeNode node = nodeMap.get(nodeId);
					if (node != null) {
						node.setChecked(true);
					}
				}
				// }
			}
			TreeNode rootNode = new TreeNode("0", "所有部门", "0", "icon-polygon");
			this.nodeList.add(rootNode);
			for (TreeNode node : nodeMap.values()) {
				if (node.getPid() != null) {
					TreeNode parentNode = nodeMap.get(node.getPid());
					if (parentNode != null) {
						parentNode.getChildren().add(node);
					} else
						rootNode.getChildren().add(node);
				}
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			// return json(false, ex.getMessage());
		}
		return "success";

	}

	protected Class getEntityClass() {
		entityClass = Department.class;
		return entityClass;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public IDepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public List<TreeNode> getNodeList() {
		return nodeList;
	}

	public void setNodeList(List<TreeNode> nodeList) {
		this.nodeList = nodeList;
	}

}
