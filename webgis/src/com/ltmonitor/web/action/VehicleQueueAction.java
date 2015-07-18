package com.ltmonitor.web.action;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ltmonitor.entity.Enclosure;
import com.ltmonitor.entity.PointLatLng;
import com.ltmonitor.service.MapFixService;
import com.ltmonitor.util.Constants;

/**
 * 车辆排队
 * 
 * @author DELL
 * 
 */
public class VehicleQueueAction extends QueryAction {
	/**
	 * 车组
	 */
	private int depId;
	/**
	 * 车辆所拉的材料
	 */
	private String material;
	/**
	 * 围栏区域Id
	 */
	private int areaId;
	/**
	 * 物料类型
	 */
	private String useType;

	private Map dataOutPut = new HashMap();

	public String execute() {
		if (depId == 0 || areaId == 0)
			return "input";

		String queryId = "selectOnlineVehicles";

		Map params = new HashMap();
		params.put("userId", super.getOnlineUser().getEntityId());
		params.put("areaId", areaId);
		params.put("useType", useType);
		if (depId > 0) {
			List<Integer> depIdList = super.getDepartmentService()
					.getDepIdList(depId);
			params.put("depIdList", depIdList);
		}

		result = (getQueryDao().queryForList(queryId, params));

		DecimalFormat df = new DecimalFormat("#.00");
		List<Map> ls = new ArrayList<Map>();
		if (result.size() > 0) {
			Enclosure area = (Enclosure) this.getBaseService().load(
					Enclosure.class, areaId);
			PointLatLng p = MapFixService.fix(area.getCenterLat(),
					area.getCenterLng(), area.getMapType());
			for (Object obj : result) {
				Map rowData = (Map) obj;
				if (rowData.containsKey("latitude")
						&& rowData.containsKey("longitude")) {
					double lat = Double.parseDouble(""
							+ rowData.get("latitude"));
					double lng = Double.parseDouble(""
							+ rowData.get("longitude"));
					double d = MapFixService.GetDistanceByMeter(lng, lat,
							area.getCenterLng(), area.getCenterLat());
					d = d / 1000;// 转成公里
					String strDis = (df.format(d));
					rowData.put("distance", d);
					rowData.put("strDistance", strDis);
				}
				ls.add((Map) obj);
			}
			Collections.sort(ls, new Comparator<Map>() {
				public int compare(Map param1, Map param2) {
					if (param1.containsKey("distance") == false)
						return -1;
					else if (param2.containsKey("distance") == false)
						return 1;

					double d1 = (Double) param1.get("distance");
					double d2 = (Double) param2.get("distance");
					if (d1 > d2)
						return 1;
					else if (d1 < d2)
						return -1;
					else
						return 0;
				}
			});
		}

		dataOutPut.put("rows", ls);
		return "success";
	}

	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public int getAreaId() {
		return areaId;
	}

	public void setAreaId(int areaId) {
		this.areaId = areaId;
	}

	public Map getDataOutPut() {
		return dataOutPut;
	}

	public void setDataOutPut(Map dataOutPut) {
		this.dataOutPut = dataOutPut;
	}

	public String getUseType() {
		return useType;
	}

	public void setUseType(String useType) {
		this.useType = useType;
	}

}
