package com.ltmonitor.web.listener;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class StartupListener implements ServletContextListener {

	protected static Logger log = Logger.getLogger(StartupListener.class);
	private static Timer timer = null;

	public void contextInitialized(ServletContextEvent event) {
		log.debug("Initializing context...");
		System.setProperty("java.util.Arrays.useLegacyMergeSort", "true");

		ServletContext context = event.getServletContext();

		Map config = (HashMap) context.getAttribute("appConfig");

		if (config == null) {
			config = new HashMap();
		}

		if (context.getInitParameter("csstheme") != null) {
			config.put("csstheme", context.getInitParameter("csstheme"));
		}

		ApplicationContext ctx = WebApplicationContextUtils
				.getRequiredWebApplicationContext(context);


		setupContext(context);

		log.info("AppData.init.......");

	}

	public static void setupContext(ServletContext context) {
		ApplicationContext ctx = WebApplicationContextUtils
				.getRequiredWebApplicationContext(context);

		log.debug("Drop-down initialization complete [OK]");
		
	}

	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		ApplicationContext ctx = WebApplicationContextUtils
				.getRequiredWebApplicationContext(servletContextEvent
						.getServletContext());

		log.info("contextDestroyed...................");
	}
}
