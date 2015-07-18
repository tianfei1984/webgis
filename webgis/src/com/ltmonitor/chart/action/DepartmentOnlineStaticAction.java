package com.ltmonitor.chart.action;

import java.util.Date;

import com.ltmonitor.web.action.QueryAction;
/**
 * 部门上线率统计查询
 * @author Administrator
 *
 */
public class DepartmentOnlineStaticAction extends QueryAction {
	
	private int depId;
	
	private Date staticDate;
	
	
	public String execute()
	{
		return SUCCESS;
	}

}
