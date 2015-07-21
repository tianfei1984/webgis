package com.ltmonitor.web.action;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.GPSRealData;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.service.IDepartmentService;
import com.ltmonitor.service.IRealDataService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.web.util.OnlineUserStatistic;

/**
 * 车辆树
 * 
 * @author DELL
 * 
 */
public class VehicleTreeAction extends PersistenceAction {

	private IVehicleService vehicleService;
	private IDepartmentService departmentService;

	private DaoIbatisImpl queryDao;
	//在线数量
	private int onlineNum;
	//总数量
	private int totalNum;
	// 处于停车状态的车辆数目
	private int parkingNum;
	/**
	 * 是否是过滤模式，如果是过滤模式，则默认节点全部打开，否则节点是收缩延迟加载的模式
	 */
	private boolean filter;
	/**
	 * 前台刷新车辆数的标志，表示是更新节点的状态，而不是创建
	 */
	private boolean updateNode;

	// Map<Integer, Department> depMap = new HashMap<Integer, Department>();
	Map<String, String> childMap = new HashMap<String, String>();
	
	Map<Integer,Integer> depOnlineVehicleNum = new HashMap<Integer, Integer>();
	Map<Integer,Integer> depTotalVehicleNum = new HashMap<Integer, Integer>();
	
	//车辆树结点集合
	private Map<String, TreeNode> treeNodeMap = new HashMap<String, TreeNode>();

	private ArrayList<TreeNode> treeData = new ArrayList<TreeNode>();
	// private Map<String, Map> treeDataIndex = new HashMap<String, Map>();

	private Map resultMap = new HashMap();

	// 生成车辆树菜单
	public String getVehicleTree() {
		// 生成车辆树
		try {
			UserInfo user = getOnlineUser();
			if (user == null)
				return "error";
			// 用户分配的车队
			Set<Department> depSet = user.getDepartments();
			List<Department> depList = new ArrayList<Department>();
//			List<Integer> depIdList = super.getAuthorizedDepIdList();
			Map<Integer, Integer> nodeMap = new HashMap<Integer, Integer>();
			for (Department dep : depSet) {
				dep = this.departmentService.fetchDepartment(dep.getEntityId());
				if (dep == null || nodeMap.containsKey(dep.getEntityId()))
					continue;
				if (!nodeMap.containsKey(dep.getEntityId())) {
					depList.add(dep);
					setTreeData(dep);
					nodeMap.put(dep.getEntityId(), dep.getEntityId());
				}
			}

			Collections.sort(depList, new Comparator<Department>() {
				@Override
				public int compare(Department o1, Department o2) {
					if (o1.getName() == null)
						return -1;

					return o1.getName().compareTo(o2.getName());
				}

			});

			createVehicleTreeNode();// 创建车辆树节点
			for (Department dep : depList) {
				String childNodeId = "dep" + dep.getEntityId();
				TreeNode node = this.treeNodeMap.get(childNodeId);
				if (dep == null  || node == null || node.getTotalNum() == 0)
					continue;

				String parentNodeId = "dep" + dep.getParentId();
				TreeNode parentNode = this.treeNodeMap.get(parentNodeId);
				if (parentNode != null) {
					parentNode.getChildren().add(node);
				} else if (updateNode == false) {
					node.setState("open");
					this.treeData.add(node);
				}

				String nodeText = dep.getName() + "(" + node.getOnlineNum()
						+ "/" + node.getTotalNum() + ")";
				node.setText(nodeText);

				if (filter) {
					// 过滤模式下，默认展开所有节点
					node.setState("open");
				}

				if (updateNode) {
					if (this.needRefresh(node)) {
						this.treeData.add(node);
					}
				}
				addSession(node);
			}

		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			log.error(ex.getStackTrace());
		}

		if (treeData.size() == 0) {
			TreeNode mzTn = new TreeNode("1",
					"<font color='red'>没有查询到车辆</font>", "0");
			mzTn.setIconCls("department");
			treeData.add(mzTn);
		}

		resultMap.put("TreeData", treeData);
		// 统计上线车辆数和上线率,显示在前台
		Map<String, Comparable> onlineInfo = new HashMap<String, Comparable>();
		onlineInfo.put("onlineNum", onlineNum);
		onlineInfo.put("totalNum", totalNum);
		int offlineNum = totalNum - onlineNum;
		onlineInfo.put("offlineNum", offlineNum);
		onlineInfo.put("parkingNum", this.parkingNum);
		double onlineRate = 0;
		if (totalNum > 0 && onlineNum > 0)
			onlineRate = 100.00 * onlineNum / totalNum;
		if (onlineRate > 0) {
			DecimalFormat df = new DecimalFormat("######0.00");
			String rate = df.format(onlineRate);
			onlineInfo.put("onlineRate", rate);
		} else
			onlineInfo.put("onlineRate", "0");
		// 更新用户的在线时间
		OnlineUserStatistic.UpdateOnlineTime(this.getOnlineUser().getEntityId());
		// 得到在线用户数
		int onlineUserNum = OnlineUserStatistic.getOnlineUserNum();

		onlineInfo.put("onlineUserNum", onlineUserNum);

		resultMap.put("onlineInfo", onlineInfo);

		return "success";
	}
	/**
	 * 根据用户权限，查询所分配的车辆，返回车辆列表，并缓存在Session中
	 * 首次查询数据库，以后就从session中获取
	 * @return
	 */
	private List queryVehicleTree()
	{
		List result = null;
		if (updateNode) {
			result = (List)this.getFromSession("vehicleTree");
		}
		
		if(result == null)
		{
			Date start = new Date();
			String queryId = "selectVehicleTree";
			Map params = super.getParams();
			params.put("userId", this.getOnlineUser().getEntityId());
			result = queryDao.queryForList(queryId, params);
			this.putSession("vehicleTree", result);
		}

		if (result == null)
			result = new ArrayList();

		return result;
	}

	/**
	 * 创建车辆树节点
	 */
	private void createVehicleTreeNode() {
		List result = queryVehicleTree();
		IRealDataService realService = this.getRealDataService();
		this.totalNum = result.size();
		Map<String, GPSRealData> realMap = new HashMap<String, GPSRealData>();
		if (realService != null) {
			try {
				List<GPSRealData> onlineRealDataList = realService.getOnlineRealDataList();
				for (GPSRealData rd : onlineRealDataList) {
					realMap.put(rd.getSimNo(), rd);
				}
			} catch (Exception e) {
				log.error(e.getMessage());
			}
		}

		Map<Integer, Integer> nodeMap = new HashMap<Integer, Integer>();
		for (Object obj : result) {
			Map rowData = (Map) obj;
			String plateNo = "" + rowData.get("plateNo");
			String simNo = "" + rowData.get("simNo");
			String driverName = "" + rowData.get("driverName");
			int vehicleId = (Integer) rowData.get("vehicleId");
			int depId = (Integer) rowData.get("depId");
			double velocity = 0;
			String strVelocity = "" + rowData.get("velocity");
			try {
				if (rowData.get("velocity") != null
						&& StringUtil.isNullOrEmpty(strVelocity) == false)
					velocity = Double.parseDouble(strVelocity);
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
			String onlineStatus = "" + rowData.get("online");
			boolean online = false;// "true".equals(onlineStatus);

			if (!realMap.isEmpty()) {
				GPSRealData rd = realMap.get(simNo);
				if (rd != null) {
					online = rd.getOnline();
					velocity = rd.getVelocity();
				} else
					online = false;
			}

			String icon = "offlinecar"; // 离线图标
			if (online) {
				this.onlineNum++;
				if (velocity > 1)
					icon = "onlinecar"; // 运行图标
				else {
					this.parkingNum++;
					icon = "parkingcar";// 停车图标
				}
			}
			String tid = "v" + vehicleId;
			String parentNodeId = "dep" + depId;
			TreeNode mzTn = new TreeNode(tid, plateNo, parentNodeId, icon);
			// mzTn.setIsExpand(false);
			mzTn.setChildren(null);
			mzTn.setLeaf(true);
			mzTn.setState("open");
			boolean isRefresh = needRefresh(mzTn);
			if (this.updateNode) {
				if (isRefresh) {
					if (nodeMap.containsKey(vehicleId) == false) {
						// treeData.add(mzTn);
						nodeMap.put(vehicleId, vehicleId);
						this.treeData.add(mzTn);
					}
				}
			} else {
				addSession(mzTn);
				if (nodeMap.containsKey(vehicleId) == false) {
					// treeData.add(mzTn);
					nodeMap.put(vehicleId, vehicleId);

					TreeNode parentNode = this.treeNodeMap.get(parentNodeId);
					if (parentNode != null) {
						parentNode.getChildren().add(mzTn);
					}
				}
			}

			//Department dep = departmentService.fetchDepartment(depId);
			TreeNode depNode = this.treeNodeMap.get(parentNodeId);
			while (depNode != null) {
				depNode.setTotalNum(depNode.getTotalNum() + 1);
				if (online)
					depNode.setOnlineNum(depNode.getOnlineNum() + 1);
				parentNodeId = depNode.getPid();
				depNode = this.treeNodeMap.get(parentNodeId);
			}

		}
		//Date end = new Date();
		//double seconds = DateUtil.getSeconds(start, end);
		// log.error("实时数据刷新耗时:" + seconds + ",条数：" + result.size());
	}

	private void addSession(TreeNode tn) {
		String SESSION_FOR_TREE_NODE_MAP = "VehicleTreeNodeMap";
		Map<String, TreeNode> nodeMap = (Map<String, TreeNode>) this
				.getSession().get(SESSION_FOR_TREE_NODE_MAP);
		if (nodeMap == null) {
			nodeMap = new HashMap<String, TreeNode>();
			nodeMap.put(tn.getId(), tn);
			this.getSession().put(SESSION_FOR_TREE_NODE_MAP, nodeMap);
		}
		nodeMap.put(tn.getId(), tn);
	}

	private boolean needRefresh(TreeNode tn) {
		String SESSION_FOR_TREE_NODE_MAP = "VehicleTreeNodeMap";
		Map<String, TreeNode> nodeMap = (Map<String, TreeNode>) this
				.getSession().get(SESSION_FOR_TREE_NODE_MAP);
		if (nodeMap == null) {
			nodeMap = new HashMap<String, TreeNode>();
			nodeMap.put(tn.getId(), tn);
			this.getSession().put(SESSION_FOR_TREE_NODE_MAP, nodeMap);

			return true;
		}
		TreeNode oldTn = nodeMap.get(tn.getId());
		if (oldTn == null) {
			nodeMap.put(tn.getId(), tn);
			return true;
		}

		if (oldTn.getIconCls() != null
				&& oldTn.getIconCls().equals(tn.getIconCls())
				&& oldTn.getText().equals(tn.getText())) {
			// 节点没有变化不需要刷新
			nodeMap.put(tn.getId(), tn);
			return false;
		}
		nodeMap.put(tn.getId(), tn);
		return true;
	}

	private void setTreeData(Department dep) {
		try {
			String depNodeId = "dep" + dep.getEntityId();
			int parentId = dep.getParentId();
			// parentId = parentId > 0 ? ("dep_"+parentId) : 1;
			String strParentNodeId = "dep" + parentId;
			if (parentId == 0) {
				strParentNodeId = "1";
			}

			//String nodeText = dep.getName() + "(" + dep.getOnlineNum() + "/"
					//+ dep.getTotalNum() + ")";
			TreeNode depNode = new TreeNode(depNodeId, dep.getName(), strParentNodeId);

			depNode.setIconCls("department");
			treeNodeMap.put(depNode.getId(), depNode);

		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
	}

	private IRealDataService getRealDataService() {
		try {
			ApplicationContext ctx = WebApplicationContextUtils
					.getRequiredWebApplicationContext(this.getRequest()
							.getSession().getServletContext());
			if (ctx != null) {
				IRealDataService rd = (IRealDataService) ctx
						.getBean("realDataService");
				return rd;
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return null;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
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

	public Map<String, Map> getResultMap() {
		return resultMap;
	}

	public void setResultMap(Map<String, Map> resultMap) {
		this.resultMap = resultMap;
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

	public boolean isUpdateNode() {
		return updateNode;
	}

	public void setUpdateNode(boolean updateNode) {
		this.updateNode = updateNode;
	}

	public boolean isFilter() {
		return filter;
	}

	public void setFilter(boolean filter) {
		this.filter = filter;
	}
	
	
	

}

