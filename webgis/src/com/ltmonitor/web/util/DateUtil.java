package com.ltmonitor.web.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.i18n.LocaleContextHolder;

public final class DateUtil {
	//private static Log log = LogFactory.getLog(DateUtil.class);
	private static final String TIME_PATTERN = "HH:mm";

	public static String getDatePattern() {
		Locale locale = LocaleContextHolder.getLocale();
		String defaultDatePattern;
		try {
			defaultDatePattern = ResourceBundle.getBundle(
					"ApplicationResources", locale).getString("date.format");
		} catch (MissingResourceException mse) {
			defaultDatePattern = "yyyy-MM-dd";
		}

		return defaultDatePattern;
	}

	public static String getDateTimePattern() {
		return getDatePattern() + " HH:mm:ss";
	}

	public static String getDate(Date aDate) {
		String returnValue = "";

		if (aDate != null) {
			SimpleDateFormat df = new SimpleDateFormat(getDatePattern());
			returnValue = df.format(aDate);
		}

		return returnValue;
	}

	public static Date convertStringToDate(String aMask, String strDate)
			throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat(aMask);

		Date date;
		try {
			date = df.parse(strDate);
		} catch (ParseException pe) {
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return date;
	}

	public static String getTimeNow(Date theTime) {
		return getDateTime("HH:mm", theTime);
	}

	public static Calendar getToday() throws ParseException {
		Date today = new Date();
		SimpleDateFormat df = new SimpleDateFormat(getDatePattern());

		String todayAsString = df.format(today);
		Calendar cal = new GregorianCalendar();
		cal.setTime(convertStringToDate(todayAsString));

		return cal;
	}

	public static String getDateTime(String aMask, Date aDate) {
		SimpleDateFormat df = null;
		String returnValue = "";

		if (aDate == null) {
		} else {
			df = new SimpleDateFormat(aMask);
			returnValue = df.format(aDate);
		}

		return returnValue;
	}

	public static String convertDateToString(Date aDate) {
		return getDateTime(getDatePattern(), aDate);
	}

	public static Date convertStringToDate(String strDate)
			throws ParseException {
		Date aDate = null;
		try {

			if (strDate == null)
				return new Date();

			if (strDate.indexOf(':') < 0) {
				aDate = convertStringToDate("yyyy-MM-dd", strDate);
			} else {
				aDate = convertStringToDate(getDateTimePattern(), strDate);
			}
		} catch (ParseException pe) {
			
			pe.printStackTrace();
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return aDate;
	}
}
