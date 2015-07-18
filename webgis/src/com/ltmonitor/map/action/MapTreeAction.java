package com.ltmonitor.map.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.entity.Enclosure;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.web.action.GenericAction;
import com.ltmonitor.web.action.TreeNode;

/**
 * 将地图的地标、区域和关键点 组成一个树菜单
 * 
 * @author DELL
 * 
 */
public class MapTreeAction extends GenericAction {

	private List<TreeNode> treeNodes;

	private List getEnclosureList() {
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

			List ls = super.getBaseService().queryByNamedParam(hql,
					"depIdList", parentIdList.toArray());
			return ls;
		}
	}

	public String getMapTree() {
		List ls = this.getEnclosureList();
		treeNodes = new ArrayList<TreeNode>();
		Map<Integer, TreeNode> nodeMap = new HashMap<Integer, TreeNode>();
		TreeNode polygonNode = new TreeNode("polygon", "多边形电子围栏", "",
				"icon-polygon");
		polygonNode.setState("open");
		TreeNode rectNode = new TreeNode("rect", "矩形电子围栏", "", "icon-rect");
		rectNode.setState("open");
		TreeNode circleNode = new TreeNode("circle", "圆形电子围栏", "",
				"icon-circle");
		circleNode.setState("open");
		TreeNode keyPointNode = new TreeNode("keyPoint", "关键点", "",
				"icon-keyPoint");
		keyPointNode.setState("open");
		TreeNode routeNode = new TreeNode("route", "路线", "", "icon-route");
		routeNode.setState("open");
		TreeNode markerNode = new TreeNode("marker", "地图标注", "", "icon-marker");
		markerNode.setState("open");
		for (Object obj : ls) {
			Enclosure ec = (Enclosure) obj;
			TreeNode tn = null;
			if (ec.getKeyPoint() == 1) {
				tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
						"keyPoint");
				tn.setChildren(null);
				tn.setLeaf(true);
				keyPointNode.getChildren().add(tn);
			} else {
				if (Enclosure.POLYGON.equals(ec.getEnclosureType())) {
					tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
							"polygon");
					tn.setChildren(null);
					tn.setLeaf(true);
					polygonNode.getChildren().add(tn);
				} else if (Enclosure.RECT.equals(ec.getEnclosureType())) {
					tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
							"rect");
					tn.setChildren(null);
					tn.setLeaf(true);
					rectNode.getChildren().add(tn);
				} else if (Enclosure.CIRCLE.equals(ec.getEnclosureType())) {
					tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
							"circle");
					tn.setChildren(null);
					circleNode.getChildren().add(tn);
				} else if (Enclosure.ROUTE.equals(ec.getEnclosureType())) {
					tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
							"route");
					tn.setChildren(null);
					tn.setLeaf(true);
					routeNode.getChildren().add(tn);
				} else if (Enclosure.MARKER.equals(ec.getEnclosureType())) {
					tn = new TreeNode("" + ec.getEntityId(), ec.getName(),
							"marker");
					tn.setChildren(null);
					tn.setLeaf(true);
					markerNode.getChildren().add(tn);
				}
			}

			if (tn != null) {
				tn.getAttributes().put("lat", ec.getCenterLat());
				tn.getAttributes().put("lng", ec.getCenterLng());
				tn.setIconCls("icon-area");
				tn.setChildren(null);
				tn.setState("open");
				tn.setLeaf(true);
			}
		}

		if (polygonNode.getChildren().size() > 0)
			this.getTreeNodes().add(polygonNode);
		if (rectNode.getChildren().size() > 0)
			this.getTreeNodes().add(rectNode);
		if (circleNode.getChildren().size() > 0)
			this.getTreeNodes().add(circleNode);
		if (keyPointNode.getChildren().size() > 0)
			this.getTreeNodes().add(keyPointNode);
		if (routeNode.getChildren().size() > 0)
			this.getTreeNodes().add(routeNode);
		if (markerNode.getChildren().size() > 0)
			this.getTreeNodes().add(markerNode);

		return "success";
	}

	public List<TreeNode> getTreeNodes() {
		return treeNodes;
	}

	public void setTreeNodes(List<TreeNode> treeNodes) {
		this.treeNodes = treeNodes;
	}

}
