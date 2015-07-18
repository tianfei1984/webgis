package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.MemberInfo;
import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.util.ClassUtil;
import com.ltmonitor.util.StringUtil;

/**
 * 基础数据的查询，维护Action
 * 
 * @author DELL
 * 
 */
public class BasicDataAction extends PersistenceAction {

	private String category;
	private String queryID;

	private DaoIbatisImpl queryDao;

	private List<TreeNode> nodeList = new ArrayList<TreeNode>();

	private String name;

	private String code;

	private String parent;

	private IBasicDataService basicDataService;

	protected Class getEntityClass() {
		entityClass = BasicData.class;
		return entityClass;
	}

	/**
	 * 获取某一类型的基础数据 用于前台生成下拉框列表
	 */
	public String execute() {
		List results = new ArrayList();
		try {
			if (category != null) {
				// 查询基础数据表
				results = getBasicDataService().getBasicDataByParentCode(
						category);
			} else if (queryID != null) {
				// 根据Ibatis的queryId, 来调用Ibatis查询
				Map params = this.getParams();
				if(this.getOnlineUser() != null)
					params.put("userId", this.getOnlineUser().getEntityId());
				results = getQueryDao().queryForList(queryID, params);
			}

			return json(true, results);
		} catch (Exception ex) {
			super.log.error(ex.getMessage());
			super.log.error(ex.getStackTrace());
			return json(false, ex.getMessage());
		}
	}

	public String tree() {
		if (queryID != null) {
			// 根据Ibatis的queryId, 来调用Ibatis查询
			Map params = this.getParams();
			results = getQueryDao().queryForList(queryID, params);
			for (Object obj : results) {
				Map rowData = (Map) obj;

			}

			Map<String, TreeNode> nodeMap = new HashMap<String, TreeNode>();
			for (Object obj : results) {
				Map rowData = (Map) obj;
				String parentId = "" + rowData.get("pId");
				String id = "" + rowData.get("id");
				String code = "" + rowData.get("code");
				String name = "" + rowData.get("name");
				TreeNode node = new TreeNode("" + id, name, parentId,
						"icon-polygon");
				node.setState("open");
				node.setLeaf(true);
				nodeMap.put(node.getId(), node);
			}
			for (TreeNode node : nodeMap.values()) {
				if (StringUtil.isValidStr(node.getPid())) {
					TreeNode parentNode = nodeMap.get(node.getPid());
					if (parentNode != null) {
						parentNode.getChildren().add(node);
						parentNode.setLeaf(false);
					} else
						getNodeList().add(node);
				} else
					getNodeList().add(node);
			}

		}

		return "success";
	}

	/**
	 * 查看
	 * 
	 * @return
	 */
	public String view() {
		if (StringUtil.isValidStr(entityID) && !entityID.equals("0")) {
			entity = baseService.load(getEntityClass(), new Integer(entityID));
		} else {
			entity = ClassUtil.newInstance(getEntityClass());
			entityID = null;
			BasicData bd = (BasicData) entity;
			bd.setParent(parent);
		}

		if (entity == null) {
			String error = "找不到实体对象,id:" + entityID + "; 类：" + getEntityClass();
			// return super.forwardError(error);
		}

		return VIEW;
	}

	/**
	 * 新增后的保存操作
	 * 
	 * @return
	 */
	public String save() throws Exception {

		try {
			entity = populateEntity();

			BasicData bd = (BasicData) entity;
			if (bd.getParent() == null || bd.getParent().length() == 0)
				bd.setParent("Root");
			String hql = "from BasicData where code = ? and parent = ? and entityId <> ?";
			Object obj = this.getBaseService().find(hql,
					new Object[] { bd.getCode(), bd.getParent(),bd.getEntityId() });
			if (obj != null) {
				this.setMessage("保存失败,数据字典编码重复，请重新编码");
			} else {
				basicDataService.save(bd);
				entityID = "" + ((TenantEntity) entity).getEntityId();

				this.setMessage("保存成功");
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}

		return SAVE_SUCCESS;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getQueryID() {
		return queryID;
	}

	public void setQueryID(String queryID) {
		this.queryID = queryID;
	}

	public IBasicDataService getBasicDataService() {
		return basicDataService;
	}

	public void setBasicDataService(IBasicDataService basicDataService) {
		this.basicDataService = basicDataService;
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public List<TreeNode> getNodeList() {
		return nodeList;
	}

	public void setNodeList(List<TreeNode> nodeList) {
		this.nodeList = nodeList;
	}

}
