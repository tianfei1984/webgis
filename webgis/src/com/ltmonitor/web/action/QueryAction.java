package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.service.IVehicleService;

public class QueryAction extends GenericAction{

	protected DaoIbatisImpl queryDao;
	
	protected String queryId;

	private int userId;
	
	protected List result = new ArrayList();


	private IVehicleService vehicleService;
	
	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}

	public List getResult() {
		return result;
	}

	public void setResult(List result) {
		this.result = result;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}



	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	public String getQueryId() {
		return queryId;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}

}
