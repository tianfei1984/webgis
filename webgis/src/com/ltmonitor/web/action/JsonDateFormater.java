package com.ltmonitor.web.action;

import java.text.SimpleDateFormat;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

/**
 * [Java -> JSON] java.util.Date -> "yyyy-MM-dd" etc. string <br/>
 * 
 * Json-lib默认的Java -> JSON的日期表示格式与java经常用的大相径庭，所以使用此 扩展来将Date格式化为字符串。
 * 
 * 
 * @author btpka3
 */

public class JsonDateFormater implements JsonValueProcessor {
	private String dateFormat = "yyyy-MM-dd";

	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		return null;
	}

	public Object processObjectValue(String key, Object value,
			JsonConfig jsonConfig) {
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		return sdf.format(value);
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
}