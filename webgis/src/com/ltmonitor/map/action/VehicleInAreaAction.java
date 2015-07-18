package com.ltmonitor.map.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.ltmonitor.entity.PointLatLng;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.service.MapFixService;
import com.ltmonitor.web.action.PaginateAction;
/**
 * 区域查询车辆
 * @author Administrator
 *
 */
public class VehicleInAreaAction extends PaginateAction {

	private String strRoutePoints;
	
	private double maxLatitude;
	
	private double maxLongitude;
	
	private double minLatitude;
	
	private double minLongitude;
	
	
	private int[] enclosureIds;
	
	private Date[] startDates;
	
	private Date[] endDates;
	

	public String view() {
		if (strRoutePoints != null) {
			String[] points = getStrRoutePoints().split(";");
			int m = 1;
			maxLatitude = 0;
			maxLongitude = 0;
			minLatitude= 1000;
			minLongitude = 1000;
			
			for (String strPt : points) {
				if (StringUtil.isNullOrEmpty(strPt))
					continue;
				String[] pt = strPt.split(",");
				Double lng = Double.parseDouble(pt[0]);
				Double lat = Double.parseDouble(pt[1]);
				
				if(lat > maxLatitude)
					maxLatitude = lat;
				if(lat < minLatitude)
					minLatitude = lat;
				if(lng > maxLongitude)
					maxLongitude = lng;
				if(lng < minLongitude)
					minLongitude = lng;
			}
			//将地图坐标还原成原始坐标，这样可以和GPS坐标进行比对，进行区域查车
			String mapType = super.getMapType();//当前用户使用的地图类型
			PointLatLng p1 = MapFixService.reverse(maxLatitude, maxLongitude,mapType);
			PointLatLng p2 = MapFixService.reverse(minLatitude, minLongitude,mapType);
			maxLatitude = p1.getLat();
			maxLongitude = p1.getLng();
			minLatitude = p2.getLat();
			minLongitude = p2.getLng();
		}
		return "input";
	}
	
	public String input()
	{
		return "input";
	}
	
	
	public String queryVehicleInArea()
	{
		Map params = super.getParams();
		if(enclosureIds == null)
		{			
			return "input";
		}
		
		int m = 0;
		String queryId = "selectAlarms";
		List result = new ArrayList();
		for(int ec : enclosureIds)
		{
			params.put("enclosureId", ec);
			params.put("startTime", startDates[m]);
			params.put("endTime", endDates[m]);
			List ls = this.getQueryDao().queryForList(queryId, params);
			result.addAll(ls);
		}
		
		for(Object obj : result)
		{
			Map rowData = (Map)obj;
			super.convert(rowData, "plateColor", "PlateColor");
		}
		
		return json(true, result);
	}

	public String getStrRoutePoints() {
		return strRoutePoints;
	}

	public void setStrRoutePoints(String strRoutePoints) {
		this.strRoutePoints = strRoutePoints;
	}

	public double getMinLongitude() {
		return minLongitude;
	}

	public void setMinLongitude(double minLongitude) {
		this.minLongitude = minLongitude;
	}

	public double getMinLatitude() {
		return minLatitude;
	}

	public void setMinLatitude(double minLatitude) {
		this.minLatitude = minLatitude;
	}

	public double getMaxLongitude() {
		return maxLongitude;
	}

	public void setMaxLongitude(double maxLongitude) {
		this.maxLongitude = maxLongitude;
	}

	public double getMaxLatitude() {
		return maxLatitude;
	}

	public void setMaxLatitude(double maxLatitude) {
		this.maxLatitude = maxLatitude;
	}


	public int[] getEnclosureIds() {
		return enclosureIds;
	}

	public void setEnclosureIds(int[] enclosureIds) {
		this.enclosureIds = enclosureIds;
	}

	public Date[] getStartDates() {
		return startDates;
	}

	public void setStartDates(Date[] startDates) {
		this.startDates = startDates;
	}

	public Date[] getEndDates() {
		return endDates;
	}

	public void setEndDates(Date[] endDates) {
		this.endDates = endDates;
	}

}
