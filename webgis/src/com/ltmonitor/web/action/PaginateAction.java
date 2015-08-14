package com.ltmonitor.web.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
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
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ibatis.sqlmap.client.PageResult;
import com.ltmonitor.dao.impl.DaoIbatisImpl;
import com.ltmonitor.entity.AlarmConfig;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.GPSRealData;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.service.IRealDataService;
import com.ltmonitor.service.IVehicleService;
import com.ltmonitor.service.JT808Constants;
import com.ltmonitor.util.DateUtil;
import com.opensymphony.xwork2.ActionContext;

/**
 * 针对Jquery datable 做的分页Action
 */
public class PaginateAction extends GenericAction {

	private int page;

	private int rows;

	protected int depId;

	protected String queryId;

	protected DaoIbatisImpl queryDao;
	
	protected String type;
	
	/**
	 * 分页结果，输出到前台js表格中
	 */
	protected Map paginateResult = new HashMap();

	@SuppressWarnings("rawtypes")
	private Map resultMap = new HashMap();

	protected String forward;

	protected Map<String, Map> queryConfigMap;
	// 查询条件对应的字段名称的映射，写入到Excel报表中
	protected Map<String, List<String>> queryConditionMap;

	protected IBasicDataService basicDataService;

	protected IVehicleService vehicleService;
	// excel文件名字，由前台定义
	protected String fileName;

	// excel文件流
	protected InputStream excelStream;
	// 列名和单元格的映射，在struts文件中配置
	protected String[] columnNames;
	protected String[] headers;

	// 列名和单元格的映射，在struts文件中配置
	protected Map<String, List<String>> columnMap = new HashMap<String, List<String>>();
	//需要转换日期格式的字段
	private List<String> dateFields = new ArrayList<String>();

	public String view() {
		return "input";
	}

	/**
	 * 分页查询
	 */
	public String execute() {
		UserInfo user = super.getOnlineUser();
		if (queryId == null || queryId.isEmpty() || user == null)
			return "input";
		/**
		 * 如果报表文件名不为空，说明是报表查询，记录到系统日志中
		 */
		if(StringUtil.isNullOrEmpty(fileName) == false && this.page <= 1){
			this.LogOperation("查询 "+fileName);
		}

		try {
			Map parameters = ActionContext.getContext().getParameters();
			Map paraMap = new HashMap();
			paraMap.put("userId", user.getEntityId());
//			if(type != null && !"".equals(type)){
//				paraMap.put("type", type);
//			}
			// 查询数据，加入部门查询条件，限制用户只能查询自己授权的部门下的车辆数据
			//List<Integer> depIdList = super.getAuthorizedDepIdList();
			//paraMap.put("depIdList", depIdList);

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

			if (depId > 0) {
				List<Integer> depIdList = super.getDepartmentService()
						.getDepIdList(depId);
				paraMap.put("depIdList", depIdList);
			} else
				paraMap.remove("depId");

			// 如果当前页为零，则默认为1
			if (this.getPage() == 0) {
				this.setPage(1);
			}
			if("selectUsers".equals(this.queryId))
			{
				//区域限制，只能同区域或区域下面的子区域的用户
				int regionId = this.getOnlineUser().getRegionId();
				if(regionId > 0 && this.getOnlineUser().isSuperAdmin() == false)
				{
					List<Integer> regionIdList = super.getDepartmentService()
							.getDepIdList(regionId);
					paraMap.put("regionIdList", regionIdList);
				}
			}
			/**
			 * 历史轨迹的查询，比较复杂，如果只查询一天，则只查询一个表，如果查询两天，需要联合连个表查询
			 */
			if (this.queryId.equals("selectHisotryGpsInfos")) {

				String startTime = "" + paraMap.get("startTime");
				String endTime = "" + paraMap.get("endTime");
				startTime = startTime.substring(0, 10).replace("-", "");
				endTime = endTime.substring(0, 10).replace("-", "");
				Date d1 = DateUtil.toDateByFormat(startTime, "yyyyMMdd");
				Date d2 = DateUtil.getDate(d1,Calendar.DAY_OF_YEAR,1);
				String limitTime = DateUtil.toStringByFormat(d2, "yyyyMMdd");
				//只能查询相隔两天的记录
				if (endTime.compareTo(limitTime) > 0)
					endTime = limitTime;
				
				String tableName1 = "gpsInfo" + startTime;
				paraMap.put("tableName1", tableName1);
				String tableName2 = "gpsInfo" + endTime;
				paraMap.put("tableName2", tableName2);

				if (tableName1.equals(tableName2) == false) {
					queryId = "selectGpsInfosIn2Days";
				}
			} else if (this.queryId.equals("selectProcessedAlarms")) {

				String startTime = "" + paraMap.get("startTime");
				String endTime = "" + paraMap.get("endTime");
				if (paraMap.get("startTime") == null) {
					Date d = new Date();
					startTime = DateUtil.toStringByFormat(d, "yyyyMM");
					endTime = DateUtil.toStringByFormat(d, "yyyyMM");
				} else {
					startTime = startTime.substring(0, 7).replace("-", "");
					endTime = endTime.substring(0, 7).replace("-", "");
				}
				String today = DateUtil.toStringByFormat(new Date(), "yyyyMM");
				if (endTime.compareTo(today) > 0)
					endTime = today;
				String tableName1 = "NewAlarm" + startTime;
				paraMap.put("tableName1", tableName1);
				String tableName2 = "NewAlarm" + endTime;
				paraMap.put("tableName2", tableName2);

				if (tableName1.equals(tableName2) == false) {
					queryId = "selectProcessedAlarmsIn2Months";
				}
			}
			// Map params = new HashMap();
			PageResult result = getQueryDao().queryByPagination(getQueryId(),
					paraMap, getPage(), rows);

			for (Object rowData : result.getResults()) {
				try {
					// 对返回的每行数据，进行格式化转换
					convert((Map) rowData);
				} catch (Exception ex) {
					Log.error(ex.getMessage(), ex);
				}
			}

			paginateResult.put("total", result.getTotalCount());
			paginateResult.put("rows", result.getResults());

			// paginateResult = (new PaginateResult(result.getTotalCount(),
			// result.getResults(), sEcho));
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}

		return "success";
	}

	/**
	 * 导出时不带分页，要查出所有结果
	 * 
	 * @return
	 */
	public String export() {
		/**
		 * 如果报表文件名不为空，说明是报表查询，记录到系统日志中
		 */
		if(StringUtil.isNullOrEmpty(fileName) == false ){
			this.LogOperation("报表导出 "+fileName);
		}

		try {
			Map params = this.getParams();
			params.put("depIdList", super.getAuthorizedDepIdList());

			if (depId > 0) {
				List<Integer> depIdList = super.getDepartmentService()
						.getDepIdList(depId);
				params.put("depIdList", depIdList);
			}

			if (this.queryId.equals("selectHisotryGpsInfos")) {

				String startTime = "" + params.get("startTime");
				String endTime = "" + params.get("endTime");
				startTime = startTime.substring(0, 10).replace("-", "");
				endTime = endTime.substring(0, 10).replace("-", "");

				Date d1 = DateUtil.toDateByFormat(startTime, "yyyyMMdd");
				Date d2 = DateUtil.getDate(d1,Calendar.DAY_OF_YEAR,1);
				String limitTime = DateUtil.toStringByFormat(d2, "yyyyMMdd");
				//只能查询相隔两天的记录
				if (endTime.compareTo(limitTime) > 0)
					endTime = limitTime;
				String tableName1 = "gpsInfo" + startTime;
				params.put("tableName1", tableName1);
				String tableName2 = "gpsInfo" + endTime;
				params.put("tableName2", tableName2);

				if (tableName1.equals(tableName2) == false) {
					queryId = "selectGpsInfosIn2Days";
				}
			} else if (this.queryId.equals("selectProcessedAlarms")) {

				String startTime = "" + params.get("startTime");
				String endTime = "" + params.get("endTime");
				startTime = startTime.substring(0, 7).replace("-", "");
				endTime = endTime.substring(0, 7).replace("-", "");
				String today = DateUtil.toStringByFormat(new Date(), "yyyyMM");
				if (endTime.compareTo(today) > 0)
					endTime = today;
				String tableName1 = "NewAlarm" + startTime;
				params.put("tableName1", tableName1);
				String tableName2 = "NewAlarm" + endTime;
				params.put("tableName2", tableName2);

				if (tableName1.equals(tableName2) == false) {
					queryId = "selectProcessedAlarmsIn2Months";
				}
			}
			List list = this.getQueryDao().queryForList(queryId, params);
			for (Object rowData : list) {
				try {
					// 对返回的每行数据，进行格式化转换
					convert((Map) rowData);
				} catch (Exception ex) {
					Log.error(ex.getMessage(), ex);
				}
			}
			if (fileName == null)
				fileName = queryId;
			String reportName = fileName;
			fileName += DateUtil.toStringByFormat(new Date(), "yyMMddHHmmss");

			// 将工作簿写入最上面定义的InputStream流——名称为excelStream，这个名字对应struts.xml中配置的inputName参数
			HSSFWorkbook workbook = getWorkbook(list, queryId, 0, params,
					reportName);
			if (workbook != null) {
				this.workbook2InputStream(workbook, fileName);
				return "success";
			} else
				return "error";

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return "error";
		}
	}

	/**
	 * 将Workbook写入到InputStream
	 * 
	 * @param workbook
	 *            HSSFWorkbook
	 * @param fileName
	 *            String 文件名
	 * 
	 * */
	private void workbook2InputStream(HSSFWorkbook workbook, String fileName)
			throws Exception {
		this.setFileName(URLEncoder.encode(fileName, "UTF-8"));
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		workbook.write(baos);
		baos.flush();
		byte[] aa = baos.toByteArray();
		excelStream = new ByteArrayInputStream(aa, 0, aa.length);
		baos.close();
	}

	private HSSFCell createCell(HSSFRow row, int col, String value) {
		HSSFCell cell = row.createCell(col++); // 创建第i列
		cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
		cell.setCellValue(value);
		return cell;
	}

	private HSSFWorkbook getWorkbook(List list, String sheetNames, int isSum,
			Map params, String reportName) throws Exception {
		List<String> queryConditionNames = queryConditionMap.get(queryId);

		List<String> columns = columnMap.get(queryId);
		columnNames = new String[columns.size()];
		headers = new String[columns.size()];
		for (int m = 0; m < columns.size(); m++) {
			String[] strName = columns.get(m).split(",");
			columnNames[m] = strName[0];
			headers[m] = strName[1];
		}
		HSSFWorkbook workbook = new HSSFWorkbook();// 创建Excel文件

		HSSFCellStyle style = workbook.createCellStyle(); // 样式对象
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 指定单元格垂直居中对齐
		// //////////////////

		HSSFSheet sheet = workbook.createSheet();// 创建sheet
		workbook.setSheetName(0, reportName);// HSSFCell.ENCODING_UTF_16);为指定第K个sheet命名，并设定字符集类型
		int rowNo = 0;

		HSSFRow row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
		createCell(row, 1, reportName);
		// int columnNum = columns.size();
		if (queryConditionNames != null) {
			row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
			int col = 0;
			createCell(row, col, "查询条件:");

			HSSFCellStyle ss = workbook.createCellStyle();
			ss.setFillForegroundColor(HSSFColor.RED.index);
			HSSFFont font = workbook.createFont();
			font.setFontName(HSSFFont.FONT_ARIAL);// 字体
			// font.setFontHeightInPoints((short) 20);//字号
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗
			font.setColor(HSSFColor.BLUE.index);// 颜色
			ss.setFont(font);

			for (int m = 0; m < queryConditionNames.size(); m++) {
				String[] strName = queryConditionNames.get(m).split(",");
				String param = strName[0];
				String paramName = strName[1] + "：";
				String paramValue = "" + params.get(param);
				if (param.equals("depId") && params.get(param) != null) {
					int depId = Integer.parseInt(paramValue);
					if (depId > 0) {
						Department dep = this.getDepartmentService()
								.fetchDepartment(depId);
						if (dep != null)
							paramValue = dep.getName();
					} else
						paramValue = "无";
				}
				if (params.get(param) == null)
					paramValue = "无";
				// if (StringUtil.isNullOrEmpty(paramValue) == false ) {
				if (paramValue.indexOf("请选择") >= 0)
					paramValue = "全部";
				// paramValue += params.get(param);
				if (col % 8 == 0) {
					row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
					col = 0;
				}
				createCell(row, col++, paramName);
				HSSFCell cell = createCell(row, col++, paramValue);
				// ss.setFont(font)
				cell.setCellStyle(ss);
				// }
			}
		}

		row = sheet.createRow(rowNo++); // 创建数据表格标题第1行，也就是输出表头
		// cell = row.createCell((short) 0);
		// cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
		for (short i = 0; i < headers.length; i++) {
			createCell(row, i, headers[i]);
		}

		List colunData = null;
		// 下面是输出各行的数据(留出最后一行，如果是合计信息单独输出，如果非合计信息按照原本样式输出)

		for (int i = 0; i < list.size(); i++) {
			Map rowData = (Map) list.get(i);
			row = sheet.createRow(rowNo++);// 创建第i行
			for (short j = 0; j < columnNames.length; j++) {
				// cell = row.createCell(j); // 创建第j列
				// cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
				Object fieldValue = rowData.get(columnNames[j]);
				String value = "" + (fieldValue == null ? "" : fieldValue);// 通过列名找到字段值
				// cell.setCellValue(value);
				createCell(row, j, value);
			}
		}
		/**
		 * if (isSum == 0) {// 无需统计信息 colunData = (List) list.get(list.size() -
		 * 1); row = sheet.createRow(list.size() - 1);// 创建第i行 for (short j = 0;
		 * j < colunData.size(); j++) { cell = row.createCell(j); // 创建第j列
		 * cell.setCellType(HSSFCell.CELL_TYPE_STRING); //
		 * cell.setEncoding(HSSFCell.ENCODING_UTF_16);
		 * cell.setCellValue(colunData.get(j).toString()); } } else if (isSum ==
		 * 1) { colunData = (List) list.get(list.size() - 1);// 此处留下最后一列 row =
		 * sheet.createRow(list.size() - 1);// 创建第i行 sheet.addMergedRegion(new
		 * Region(list.size() - 1, (short) 0, list .size() - 1, (short) 2)); for
		 * (short j = 0; j < colunData.size(); j++) { if (j == 0) { cell =
		 * row.createCell(j); // 创建第j列 cell.setCellStyle(style);// 设置居中 } else {
		 * cell = row.createCell((short) (j + 2)); // 创建第j列 }
		 * cell.setCellType(HSSFCell.CELL_TYPE_STRING); //
		 * cell.setEncoding(HSSFCell.ENCODING_UTF_16);
		 * cell.setCellValue(colunData.get(j).toString()); } }
		 */

		return workbook;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Map<String, List<String>> getColumnMap() {
		return columnMap;
	}

	public void setColumnMap(Map<String, List<String>> columnMap) {
		this.columnMap = columnMap;
	}

	public InputStream getExcelStream() {
		return excelStream;
	}

	public void setExcelStream(InputStream excelStream) {
		this.excelStream = excelStream;
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
					} else {
						String status = "" + rowData.get("status");
						if (status.equals("New")) {
							Date startTime = (Date) rowData.get("startTime");
							timeSpan = 0.1 * DateUtil.getSeconds(startTime,
									new Date()) / 6;
						}
						rowData.put(field, getIntervalDescr(timeSpan));
					}
				} else if (parentCode.equals("GpsStatus")) {
					String status = getStatusDescr(fieldValue);
					rowData.put(field, status);
				} else if (parentCode.equals("onlineStatus")) {
					String simNo = fieldValue;
					IRealDataService realService = getRealDataService();
					String online = "离线";
					if (realService != null) {
						GPSRealData rd = realService.get(simNo);
						if (rd != null && rd.getOnline()) {
							// 将实时数据更新到map
							online = "在线";
							rowData.put("sendTime", rd.getOnlineDate());
							rowData.put("onlineDate", rd.getOnlineDate());
						}
					}
						
					rowData.put("online", online);

					Date sendTime = (Date) rowData.get("onlineDate");
					if (sendTime != null) {
						double seconds = DateUtil.getSeconds(sendTime,
								new Date()) / 60;
						rowData.put("offlineTimeSpan",
								getIntervalDescr(seconds));
					}

				} else if(parentCode.equals("alarmType"))
				{
					String alarmType = fieldValue;
					String alarmSource = ""+rowData.get("alarmSource");
					AlarmConfig ac = this.getBaseService().getAlarmConfig(
							alarmType, alarmSource);
					if(ac != null)
						rowData.put(field, ac.getName());
				}else if (parentCode.equals("DirectionDescr")) {
					int direction = Integer.parseInt(fieldValue);
					String strDirection = this.getDirectionDescr(direction);
					rowData.put("directionDescr", strDirection);
				} else if (parentCode.equals("AlarmStateDescr")) {
					int alarmState = Integer.parseInt(fieldValue);
					String strAlarmState = this.getAlarmDescr(alarmState);
					rowData.put("alarmStateDescr", strAlarmState);
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
		//时间格式转换
		if(true && !dateFields.isEmpty()){
			for(int i = 0,size = dateFields.size();i < size; i++){
				String key = dateFields.get(i);
				if(rowData.containsKey(key)){
					String s = DateUtil.datetimeToString((Date) rowData.get(key));
					rowData.put(key, s);
				}
			}
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
		int seconds = (int) (minutes * 60);
		if (seconds > 0) {
			descr.append(seconds + "秒");
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

	public Map getPaginateResult() {
		return paginateResult;
	}

	public void setPaginateResult(Map paginateResult) {
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

	public Map<String, List<String>> getQueryConditionMap() {
		return queryConditionMap;
	}

	public void setQueryConditionMap(Map<String, List<String>> queryConditionMap) {
		this.queryConditionMap = queryConditionMap;
	}

	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public Map getResultMap() {
		return resultMap;
	}

	public void setResultMap(Map resultMap) {
		this.resultMap = resultMap;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public List<String> getDateFields() {
		return dateFields;
	}

	public void setDateFields(List<String> dateFields) {
		this.dateFields = dateFields;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
