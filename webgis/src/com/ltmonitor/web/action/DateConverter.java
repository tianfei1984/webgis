package com.ltmonitor.web.action;

import org.apache.commons.beanutils.Converter;
import org.apache.commons.beanutils.ConversionException;

import com.ltmonitor.util.DateUtil;


import java.sql.Timestamp;
import java.util.Date;


/**
 * 主要是用于BeanUtils类，提供的日期转换插件机制。
 */
public class DateConverter implements Converter {
    public Object convert(Class aClass, Object value) {
         if (value == null) {
             return null;
        }

        if (value instanceof Date) {
            return (value);
        }

        try {

            String str = value.toString();

            if (str != null && str.isEmpty() == false)
            {
                Date d = (DateUtil.getDate(str));
                return new Timestamp(d.getTime());
            }

            return null;
        } catch (Exception e) {
                throw new ConversionException(e);
        }
    }
}
