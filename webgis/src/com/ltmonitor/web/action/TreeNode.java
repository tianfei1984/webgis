package com.ltmonitor.web.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.struts2.json.annotations.JSON;

public class TreeNode implements Serializable{

	private String id;

	private String pid;

	private String text;

	private Boolean checked = false;

	private Boolean leaf;

	private String iconCls;
	
	private int onlineNum;
	
	
	private int totalNum;
	
	private String state = "closed";
	
	private HashMap attributes = new HashMap();

	private List<TreeNode> children = new ArrayList<TreeNode>();

	public TreeNode() {
	}

	public TreeNode(String _id, String _text, String pid) {
		setId(_id);
		text = _text;
		leaf = false;
		this.setIconCls("");
		this.setPid(pid);
	}

	public TreeNode(String _id, String _text, String pid, String _iconCss) {
		setId(_id);
		text = _text;
		leaf = false;
		this.setPid(pid);
		this.setIconCls(_iconCss);
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}



	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public HashMap getAttributes() {
		return attributes;
	}

	public void setAttributes(HashMap attributes) {
		this.attributes = attributes;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	@JSON(serialize=false)
	public int getOnlineNum() {
		return onlineNum;
	}

	public void setOnlineNum(int onlineNum) {
		this.onlineNum = onlineNum;
	}
	@JSON(serialize=false)
	public int getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
	}

}
