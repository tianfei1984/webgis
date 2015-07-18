package com.ltmonitor.mobile.action;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.jfree.util.Log;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.entity.Alarm;
import com.ltmonitor.entity.AlarmRecord;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.JT809Command;
import com.ltmonitor.entity.MediaItem;
import com.ltmonitor.entity.TerminalCommand;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.entity.VehicleData;
import com.ltmonitor.service.ITerminalService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.QueryAction;

public class MobileDepOnlineAction extends QueryAction {

	protected int depId;
	//统计日期
	private Date staticDate;

	
	/**
	 * 查询部门上线率
	 * @return
	 */
	public String view()
	{
		Map params = super.getParams();
		Date endDate = DateUtil.getDate(staticDate, Calendar.DAY_OF_YEAR, 1); 
		params.put("startDate", staticDate);
		params.put("endDate", endDate);
		// params.put("status", "New");
		try {
			queryId = "selectDepartmentOnlineRate";
			result = this.getQueryDao().queryForList(queryId, params);
			
			for (Object obj : result) {
				Map rowData = (Map) obj;
				//Integer alarmId = (Integer) rowData.get("id");
			}
			
			return json(true, result);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
		
	}

	public Date getStaticDate() {
		return staticDate;
	}

	public void setStaticDate(Date staticDate) {
		this.staticDate = staticDate;
	}

}
