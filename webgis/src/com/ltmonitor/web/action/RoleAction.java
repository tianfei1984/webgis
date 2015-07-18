package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.Role;
import com.ltmonitor.entity.FuncModel;
import com.ltmonitor.entity.UserInfo;

public class RoleAction extends PersistenceAction {

	private String strFuncMenu;

	private int roleId;
	private List<TreeNode> nodeList = new ArrayList<TreeNode>();

	protected Class getEntityClass() {
		entityClass = Role.class;
		return entityClass;
	}

	// 生成权限功能菜单树
	@SuppressWarnings("rawtypes")
	private List functionItemList = new ArrayList();

	public String save() {
		try {
			Role role = (Role) populateEntity();
			this.setEntity(role);
			if (strFuncMenu != null && strFuncMenu.length() > 0) {
				role.getFuncs().clear();
				String[] funcIdArray = strFuncMenu.split(",");
				Map<Integer, Integer> funcIdMap = new HashMap<Integer, Integer>();
				for (String str : funcIdArray) {
					int funcId = Integer.parseInt(str);
					FuncModel func = (FuncModel) this.getBaseService().load(
							FuncModel.class, funcId);
					if (funcIdMap.containsKey(func.getEntityId()) == false) {
						role.getFuncs().add(func);
						funcIdMap.put(func.getEntityId(), func.getEntityId());
						if (func.getParentId() > 0
								&& funcIdMap.containsKey(func.getParentId()) == false) {
							FuncModel parent = (FuncModel) this
									.getBaseService().load(FuncModel.class,
											func.getParentId());
							role.getFuncs().add(parent);
							funcIdMap.put(parent.getEntityId(),
									parent.getEntityId());
						}
					}
				}

				this.getBaseService().saveOrUpdate(role);
				setMessage("保存成功");
			}else
			{
				this.setMessage("请选择功能权限");
			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
			this.setMessage("保存失败:" + ex.getMessage());
		}
		return "save";
	}

	public List<TreeNode> createFuncTree() {

		List<BasicData> bs = this.basicDataService
				.getBasicDataByParentCode("FunctionType");

		Map<String, TreeNode> nodeMap = new HashMap<String, TreeNode>();
		for (BasicData bd : bs) {
			TreeNode node = new TreeNode(bd.getCode(), bd.getName(),
					"", "icon-polygon");
			nodeMap.put(node.getId(), node);
			getNodeList().add(node);
		}

		String hql = "from FuncModel where deleted = ?";
		List funcList = this.getBaseService().query(hql, false);

		for (Object obj : funcList) {
			FuncModel func = (FuncModel) obj;
			String parentId = func.getParentId() == 0 ? ("" + func
					.getFuncType()) : ("" + func.getParentId());
			TreeNode node = new TreeNode("" + func.getEntityId(),
					func.getDescr(), parentId, "icon-polygon");
			//node.setChildren(null);
			node.setState("open");
			node.setLeaf(true);
			
			nodeMap.put(node.getId(), node);
			//nodeList.add(node);
		}

		for (TreeNode node : nodeMap.values()) {
			if (node.getPid() != null) {
				TreeNode parentNode = nodeMap.get(node.getPid());
				if (parentNode != null) {
					parentNode.getChildren().add(node);
				}
			}
		}

		// Map checkedDepMap = new HashMap();
		if (roleId > 0) {
			Role u = (Role) this.getBaseService().load(Role.class, roleId);
			Set<FuncModel> funcs = u.getFuncs();
			for (FuncModel func : funcs) {
				String nodeId = "" + func.getEntityId();
				TreeNode node = nodeMap.get(nodeId);
				if (node != null) {
					node.setChecked(true);
				}
			}
		}
		
		for(TreeNode tn : this.nodeList)
		{
			if(tn.getChildren() == null || tn.getChildren().size() == 0)
				tn.setState("open");
		}

		return getNodeList();

	}

	/**
	 * 加载权限列表,提供给前台，形成权限列表树
	 * 
	 * @return
	 */
	public String getFuncMenu() {
		try {
			createFuncTree();
		} catch (Exception ex) {
			log.error(ex.getMessage());
			log.error(ex.getStackTrace());
		}

		return "success";

	}

	public List getFunctionItemList() {
		return functionItemList;
	}

	public void setFunctionItemList(List functionItemList) {
		this.functionItemList = functionItemList;
	}

	public String getStrFuncMenu() {
		return strFuncMenu;
	}

	public void setStrFuncMenu(String strFuncMenu) {
		this.strFuncMenu = strFuncMenu;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public List<TreeNode> getNodeList() {
		return nodeList;
	}

	public void setNodeList(List<TreeNode> nodeList) {
		this.nodeList = nodeList;
	}

}
