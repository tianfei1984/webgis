package com.ltmonitor.mobile.action;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.jfree.util.Log;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.ltmonitor.web.action.GenericAction;
import com.ltmonitor.web.action.PaginateResult;
import com.opensymphony.xwork2.ActionContext;

/**
 * 针对Jquery datable 做的分页Action
 */
public class MobilePaginateAction extends GenericAction {
	
	private int pageNo;
	
	private int pageSize;

	private int depId;

	protected String queryId;

	private DaoIbatisImpl queryDao;

	private PaginateResult paginateResult;

	private IBasicDataService basicDataService;

	private IVehicleService vehicleService;
	
	private Map<String,Map<String,String>> queryConfigMap = new HashMap<String,Map<String,String>>();


	public String view() {
		return "input";
	}

	/**
	 * 分页查询
	 */
	public String execute() {
		if (queryId == null || queryId.isEmpty())
			return json(false, "查询ID不能为空");

		try {
			Map parameters = ActionContext.getContext().getParameters();
			Map paraMap = new HashMap();
			// 查询数据，加入部门查询条件，限制用户只能查询自己授权的部门下的车辆数据
			paraMap.put("depIdList", super.getAuthorizedDepIdList());

			if (depId > 0) {
				List<Integer> depIdList = super.getDepartmentService()
						.getDepIdList(depId);
				paraMap.put("depIdList", depIdList);
			}
			paraMap.put("tableName1", "gpsInfo");//查询的表名
			for (Object key : parameters.keySet()) {
				String strKey = "" + key;
				String[] values = (String[]) parameters.get(key);
				if (values.length == 1) {
					String strValue = values[0];
					if (strValue != null && strValue.isEmpty() == false)
						paraMap.put(strKey, strValue);
				} else
					paraMap.put(strKey, values);
			}
			String sEcho = "" + paraMap.get("sEcho");
			if (getPageSize() == 0)
				setPageSize((10));

			// 如果当前页为零，则默认为1
			if (this.pageNo == 0) {
				this.pageNo = 1;
			}
			// 得到每页显示数量
			int limit = this.getPageSize();
			paraMap.put("maxSpeed", 200);
			// Map params = new HashMap();
			PageResult result = getQueryDao().queryByPagination(getQueryId(),
					paraMap, pageNo, limit);

			for (Object rowData : result.getResults()) {
				try {
					// 对返回的每行数据，进行格式化转换
					convert((Map) rowData);
				} catch (Exception ex) {
					Log.error(ex.getMessage(), ex);
				}
			}

			paginateResult = (new PaginateResult(result.getTotalCount(),
					result.getResults(), sEcho));
			return json(true,paginateResult);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false,ex.getMessage());
		}

	}



	protected void convert(Map rowData) {
		Map<String, String> fieldConfig = queryConfigMap.get(queryId);
		if (fieldConfig != null) {
			Set<String> fields = fieldConfig.keySet();
			for (String field : fields) {
				String parentCode = fieldConfig.get(field);
				String fieldValue = "" + rowData.get(field);

				if (field.equals("plateNo") && parentCode.equals("depName")) {
					// 根据车辆转换成部门
					String depName = "";
					Department dep = vehicleService
							.getDepartmentByPlateNo(fieldValue);
					if (dep != null)
						depName = dep.getName();
					rowData.put("depName", depName);
				} else if (parentCode.equals("timeSpan")) {
					Double timeSpan = Double.parseDouble(""
							+ rowData.get(field));
					if (timeSpan > 0) {
						rowData.put(field, getIntervalDescr(timeSpan));
					}
				} else if (parentCode.equals("GpsStatus")) {
					String status = getStatusDescr(fieldValue);
					rowData.put(field, status);
				} else if (parentCode.equals("DirectionDescr")) {
					int direction = Integer.parseInt(fieldValue);
					String strDirection = this.getDirectionDescr(direction);
					rowData.put("alarmStateDescr", strDirection);
				} else if (parentCode.equals("AlarmStateDescr")) {
					int alarmState = Integer.parseInt(fieldValue);
					String strAlarmState = this.getAlarmDescr(alarmState);
					rowData.put("directionDescr", strAlarmState);
				} else if (parentCode.equals("808CmdType")) {
					try {
						Integer cmdType = (Integer) rowData.get(field);
						String strCmd = Integer.toHexString(cmdType);
						if (strCmd.length() < 4)
							strCmd = "0" + strCmd;
						strCmd = "0x" + strCmd;
						String descr = JT808Constants.GetDescr(strCmd);
						rowData.put(field, descr);
					} catch (Exception e) {
						log.error(e.getMessage(), e);
					}
				} else {
					this.convert(rowData, field, parentCode);
				}
			}
		}
	}

	protected String getStatusDescr(String strStatus) {

		int status = Integer.parseInt(strStatus);
		strStatus = Integer.toBinaryString(status);
		strStatus = StringUtil.leftPad(strStatus, 32, '0');
		// strStatus = getStatusDescr(strStatus);

		StringBuilder sb = new StringBuilder();

		if (StringUtil.isNullOrEmpty(strStatus) == false) {
			char[] ch = strStatus.toCharArray();
			if (ch.length == 32) {
				int m = 31;
				int c = ch[m - 0] - 48;
				sb.append(c == 1 ? "ACC开" : "ACC关").append(",");
				c = ch[m - 1] - 48;
				sb.append(c == 1 ? "定位" : "未定位").append(",");
				c = ch[m - 4] - 48;
				sb.append(c == 1 ? "停运" : "运营").append(",");
				c = ch[m - 10] - 48;
				sb.append(c == 1 ? "油路断开" : "油路正常").append(",");
				c = ch[m - 11] - 48;
				sb.append(c == 1 ? "电路断开" : "电路正常").append(",");
				c = ch[m - 12] - 48;
				sb.append(c == 1 ? "车门加锁" : "车门解锁").append(",");
			}
		}

		return sb.toString();
	}

	protected String getDirectionDescr(int direction) {
		Map directionMap = new HashMap();
		String descr = "";
		if (direction == 0) {
			descr = "正东";
		} else if (direction == 90) {
			descr = "正北";
		} else if (direction == 180) {
			descr = "正西";
		} else if (direction == 270) {
			descr = "正南";
		} else if (direction == 45) {
			descr = "东北";
		} else if (direction == 135) {
			descr = "西北";
		} else if (direction == 225) {
			descr = "西南";
		} else if (direction == 315) {
			descr = "东南";
		} else if (direction < 90) {
			descr = "东偏北" + direction + "度";
		} else if (direction > 90 && direction < 180) {
			descr = "西偏北" + (180 - direction) + "度";
		} else if (direction > 180 && direction < 270) {
			descr = "西偏南" + (direction - 180) + "度";
		} else if (direction > 270 && direction < 360) {
			descr = "东偏南" + (360 - direction) + "度";
		}
		return descr;
	}

	/**
	 * 报警描述
	 * 
	 * @param alarm
	 * @return
	 */
	protected String getAlarmDescr(int alarmState) {
		StringBuilder sb = new StringBuilder();
		String alarm = Integer.toBinaryString(alarmState);
		alarm = StringUtil.leftPad(alarm, 32, '0');
		if (StringUtil.isNullOrEmpty(alarm) == false) {
			char[] ch = alarm.toCharArray();
			for (int m = 0; m < ch.length; m++) {
				int tag = Integer.parseInt("" + ch[m]);
				if (tag == 1) {
					int alarmId = 31 - m; // 倒序，转换为部标的报警序号
					BasicData bd = basicDataService.getBasicDataByCode(""
							+ alarmId, "AlarmType");
					if (bd != null) {
						sb.append(bd.getName()).append(",");
					}
				}
			}
		}

		return sb.toString();
	}

	protected String convert(Map rowData, String field, String parentCode) {
		String fieldValue = "" + rowData.get(field);
		BasicData bd = getBasicDataService().getBasicDataByCode(fieldValue,
				parentCode);
		if (bd != null) {
			rowData.put(field, bd.getName());
			return bd.getName();
		}
		return "";
	}

	private String getIntervalDescr(double minutes) {
		StringBuilder descr = new StringBuilder();

		if (minutes > 1440) {
			descr.append(((int) minutes) / 1440 + "天");
			minutes -= ((int) minutes / 1440) * 1440;
		}
		if (minutes > 60) {
			descr.append(((int) minutes) / 60 + "小时");
			minutes -= ((int) minutes / 60) * 60;
		}
		if (minutes >= 1) {
			descr.append((int) minutes + "分");
			minutes -= (int) minutes;
		}
		if (minutes > 0) {
			descr.append((int) (minutes * 60) + "秒");
		}
		return descr.toString();
	}

	public DaoIbatisImpl getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(DaoIbatisImpl queryDao) {
		this.queryDao = queryDao;
	}


	public String getQueryId() {
		return queryId;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}


	public PaginateResult getPaginateResult() {
		return paginateResult;
	}

	public void setPaginateResult(PaginateResult paginateResult) {
		this.paginateResult = paginateResult;
	}


	public Map getQueryConfigMap() {
		return queryConfigMap;
	}

	public void setQueryConfigMap(Map queryConfigMap) {
		this.queryConfigMap = queryConfigMap;
	}

	public IBasicDataService getBasicDataService() {
		return basicDataService;
	}

	public void setBasicDataService(IBasicDataService basicDataService) {
		this.basicDataService = basicDataService;
	}

	public IVehicleService getVehicleService() {
		return vehicleService;
	}

	public void setVehicleService(IVehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}


	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}
