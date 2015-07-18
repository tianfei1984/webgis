package com.ltmonitor.web.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.ltmonitor.util.DateUtil;

public class DepOnlineRateChartAction extends QueryAction {

	private int depId;

	private Date chartDate;

	private Map results = new HashMap();
	

	public String view() {
		return "input";
	}
	

	public String execute() {
		try {
			Map params = new HashMap();
			params.put("depId", depId);
			String strEndDate = DateUtil.dateToString(chartDate) + " 23:59";
			params.put("startDate", DateUtil.dateToString(chartDate));
			params.put("endDate", strEndDate);
			queryId = "selectDepartmentOnlineRate";
			List rs = this.queryDao.queryForList(queryId, params);
			return json(true, rs);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
		/**
		 * String depName=""; for(Object obj :rs) { Map rowData=(Map)obj;
		 * depName = ""+rowData.get("depName"); int hour =
		 * (Integer)rowData.get("stHour"); double rate =
		 * Double.parseDouble(""+rowData.get("onlineRate"));
		 * 
		 * }
		 */
	}


	public int getDepId() {
		return depId;
	}


	public void setDepId(int depId) {
		this.depId = depId;
	}


	public Date getChartDate() {
		return chartDate;
	}


	public void setChartDate(Date chartDate) {
		this.chartDate = chartDate;
	}

}
