package com.ltmonitor.web.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.StringUtil;
import com.ltmonitor.util.DateUtil;
/**
 * 报警统计
 * 统计输出各个报警类型的报警次数
 * @author DELL
 *
 */
public class AlarmStaticAction extends PaginateAction {

	private List alarmTypeList;

	private String[] alarmType;
	private Map<String, List<String>> queryConditionMap;

	public Map<String, List<String>> getQueryConditionMap() {
		return queryConditionMap;
	}

	public void setQueryConditionMap(Map<String, List<String>> queryConditionMap) {
		this.queryConditionMap = queryConditionMap;
	}

	/**
	 * excel文件流
	 */
	private InputStream excelStream;

	private Date startDate;

	private Date endDate;

	public String view() {
		getAlarmConfigs();
		return "input";
	}

	private List getAlarmConfigs()
	{		
		String queryString = "from AlarmConfig b where enabled = true order by b.alarmSource ASC";
		alarmTypeList = this.getBaseService().query(queryString);
		return alarmTypeList;
	}
	
	

	public String execute() {

		getAlarmConfigs();
		
		if (queryId == null || queryId.isEmpty())
			return "input";
		
		if(this.getOnlineUser()==null)
			return json(false,"会话已过期请重新");
		String queryId = "selectAlarmStatic";
		// 将纵向的报警统计列表，转变成横向的表格数据
		try {
			Map params = this.getParams();
			String startTime = "" + params.get("startDate");
			startTime = startTime.substring(0, 7).replace("-", "");
			String tableName1 = "NewAlarm" + startTime;

			params.put("AlarmTableName", tableName1);
			params.put("userId", this.getOnlineUser().getEntityId());
			params.put("alarmTypeList", getAlarmType());
			//params.put("depIdList", super.getAuthorizedDepIdList());
			List result = this.getQueryDao().queryForList(queryId, params);
			Collection<Map> c = convert(result);
			for (Map rowData : c) {
				for (String t : alarmType) {
					if (rowData.containsKey(t) == false) {
						rowData.put(t, 0);// 如果没有发生该报警项，则补零。
					}
				}
			}
			return json(true, c);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			return json(false, ex.getMessage());
		}
	}

	/**
	 * Excel导出
	 */
	public String export() {
		if (alarmType == null)
			return "error";

		String[] columnNames = new String[3 + alarmType.length];
		columnNames[0] = "plateNo";
		columnNames[1] = "plateColor";
		columnNames[2] = "depName";
		//columnNames[columnNames.length - 1] = "staticDate";
		System.arraycopy(alarmType, 0, columnNames, 3, alarmType.length);

		String[] headers = new String[columnNames.length];
		headers[0] = "车牌号";
		headers[1] = "车牌颜色";
		headers[2] = "车组";
		//headers[columnNames.length - 1] = "统计日期";
		int index = 3;
		for (String strType : alarmType) {
			BasicData bd = this.getBasicDataService().getBasicDataByCode(
					strType, "AlarmType");
			headers[index++] = bd.getName() != null ? bd.getName() : strType;
		}

		String queryId = "selectAlarmStatic";
		Map params = this.getParams();
		String startTime = "" + params.get("startDate");
		startTime = startTime.substring(0, 7).replace("-", "");
		String tableName1 = "NewAlarm" + startTime;

		params.put("AlarmTableName", tableName1);
		params.put("alarmTypeList", getAlarmType());
		params.put("userId", this.getOnlineUser().getEntityId());
		//params.put("depIdList", super.getAuthorizedDepIdList());
		// 将纵向的报警统计列表，转变成横向的表格数据
		try {
			List result = this.getQueryDao().queryForList(queryId, params);
			List<Map> c = convert(result);
			for (Map rowData : c) {
				for (String t : alarmType) {
					if (rowData.containsKey(t) == false) {
						rowData.put(t, 0);// 如果没有发生该报警项，则补零。
					}
				}
			}

			String fileName = "报警统计"
					+ DateUtil.toStringByFormat(new Date(), "yyMMddHHmmss")
					+ ".xls";
			HSSFWorkbook workbook = getWorkbook(c, "报警统计", columnNames, headers, params);
			if (workbook != null) {
				this.workbook2InputStream(workbook, fileName);
				return "success";
			} else
				return "error";

			// return json(true, c);
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			// return json(false, ex.getMessage());
		}

		return "success";
	}

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

	private HSSFWorkbook getWorkbook(List<Map> list, String sheetNames,
			String[] columnNames, String[] headers, Map params) throws Exception {

		HSSFWorkbook workbook = new HSSFWorkbook();// 创建Excel文件

		HSSFCellStyle style = workbook.createCellStyle(); // 样式对象
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 指定单元格垂直居中对齐
		// //////////////////

		HSSFSheet sheet = workbook.createSheet();// 创建sheet
		workbook.setSheetName(0, sheetNames);// 
		int rowNo = 0;
		HSSFRow row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
		List<String> queryConditionNames = queryConditionMap.get(queryId);
		if (queryConditionNames != null) {
			row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
			int col = 0;
			createCell(row, col, "查询条件:");

			HSSFCellStyle ss = workbook.createCellStyle();
			ss.setFillForegroundColor(HSSFColor.RED.index);
			HSSFFont font = workbook.createFont();
	        font.setFontName(HSSFFont.FONT_ARIAL);//字体
	        //font.setFontHeightInPoints((short) 20);//字号 
	        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗
	        font.setColor(HSSFColor.BLUE.index);//颜色
	        ss.setFont(font);
	        
			for (int m = 0; m < queryConditionNames.size(); m++) {
				String[] strName = queryConditionNames.get(m).split(",");
				String param = strName[0];
				String paramName = strName[1]+"：";
				String paramValue = ""+params.get(param);
				if(params.get(param) == null)
					paramValue = "";
					if (col % 8 == 0) {
						row = sheet.createRow(rowNo++); // 创建第1行，也就是输出表头
						col = 0;
					}
					createCell(row, col++, paramName);
					HSSFCell cell = createCell(row, col++, paramValue);
					//ss.setFont(font)
					cell.setCellStyle(ss);
				//}
			}
		}

		row = sheet.createRow(rowNo++); //标题头
		for (short i = 0; i < headers.length; i++) {
			createCell(row, i, headers[i]);
		}

		List colunData = null;
		// 下面是输出各行的数据，从第二行开始填充
		for (int i = 0; i < list.size(); i++) {
			Map rowData = (Map) list.get(i);
			row = sheet.createRow(rowNo++);// 创建第i行
			for (short j = 0; j < columnNames.length; j++) {
				// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
				String value = "" + rowData.get(columnNames[j]);// 通过列名找到字段值
				createCell(row, j, value);
			}
		}

		return workbook;
	}
	

	private HSSFCell createCell(HSSFRow row, int col, String value) {
		HSSFCell cell = row.createCell(col++); // 创建第i列
		cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
		cell.setCellValue(value);
		return cell;
	}

	private List<Map> convert(List ls) {
		List result = new ArrayList();
		Map<String, Map> staticMap = new LinkedHashMap<String, Map>();
		for (Object obj : ls) {
			Map rowData = (Map) obj;
			String plateNo = "" + rowData.get("plateNo");
			String plateColor = "" + rowData.get("plateColor");
			convert(rowData, "plateColor", "plateColor");// 调用基础数据，转换成文字描述
			String depName = "" + rowData.get("depName");
			String staticDate = DateUtil.dateToString(startDate) + "-"
					+ DateUtil.dateToString(endDate);// "" +
														// rowData.get("staticDate");
			rowData.put("staticDate", staticDate);
			String alarmType = "" + rowData.get("alarmType");
			long alarmTimes = Long.parseLong(""+rowData.get("alarmTimes"));
			Map newRowData = staticMap.get(plateNo);
			if (newRowData == null) {
				newRowData = new HashMap();
				plateColor = "" + rowData.get("plateColor");
				newRowData.put("plateNo", plateNo);
				newRowData.put("plateColor", plateColor);
				newRowData.put("depName", depName);
				newRowData.put("staticDate", staticDate);
				staticMap.put(plateNo, newRowData);
			}
			if (alarmType != null)
				newRowData.put(alarmType, alarmTimes);
		}
		List<Map> res = new ArrayList<Map>();
		res.addAll(staticMap.values());
		return res;
	}

	public String[] getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(String[] alarmType) {
		this.alarmType = alarmType;
	}

	public List getAlarmTypeList() {
		return alarmTypeList;
	}

	public void setAlarmTypeList(List alarmTypeList) {
		this.alarmTypeList = alarmTypeList;
	}

	public InputStream getExcelStream() {
		return excelStream;
	}

	public void setExcelStream(InputStream excelStream) {
		this.excelStream = excelStream;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
