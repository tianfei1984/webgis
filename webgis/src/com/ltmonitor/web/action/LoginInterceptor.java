package com.ltmonitor.web.action;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.StrutsStatics;

import com.ltmonitor.dao.IBaseDao;
import com.ltmonitor.entity.OperationLog;
import com.ltmonitor.entity.UserInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

/**
 * 登录拦截器，如果没有登录，就跳转到登陆页面
 * 
 * @author Administrator
 * 
 */
public class LoginInterceptor extends AbstractInterceptor {
	public static final String ONLINE_USER = "currUserInfo";
	// public static final String COOKIE_REMEMBERME_KEY =
	// "wallet.cookie.rememberme";
	public static final String GOING_TO_URL_KEY = "GOING_TO";

	private IBaseDao baseDao;
	protected Logger log = Logger.getLogger(getClass());

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {

		ActionContext actionContext = invocation.getInvocationContext();
		HttpServletRequest request = (HttpServletRequest) actionContext
				.get(StrutsStatics.HTTP_REQUEST);

		Map session = actionContext.getSession();
		UserInfo ui = (UserInfo) session.get(ONLINE_USER);
		
		if ( ui != null) {
			String url = request.getRequestURI();
			/**
			String queryString = request.getQueryString();
			if (queryString != null
					&& queryString.indexOf("input=true&vehicleId") >= 0) {
				//不做记录
			} else {

				int index = url.lastIndexOf('/') + 1;

				String actionName = url.substring(index);

				OperationLog ol = new OperationLog();
				ol.setUserId(ui.getEntityId());
				ol.setUserName(ui.getName());
				ol.setDetail(actionName);
				ol.setUrl(url);
				ol.setIp(request.getRemoteAddr());
				try {
					baseDao.save(ol);
				} catch (Exception ex) {
					log.error(ex.getMessage(), ex);
				}
			}*/
			return invocation.invoke();
		}

		/**
		 * Cookie[] cookies = request.getCookies(); if (cookies!=null) { for
		 * (Cookie cookie : cookies) { if
		 * (COOKIE_REMEMBERME_KEY.equals(cookie.getName())) { String value =
		 * cookie.getValue(); if (StringUtils.isNotBlank(value)) { String[]
		 * split = value.split("=="); String userName = split[0]; String
		 * password = split[1]; try { User user = userDao
		 * .attemptLogin(userName, password); session.put(USER_SESSION_KEY,
		 * user); } catch (UserNotFoundException e) { setGoingToURL(session,
		 * invocation); return "login"; } } else { setGoingToURL(session,
		 * invocation); return "login"; } return invocation.invoke(); } } }
		 * setGoingToURL(session, invocation);
		 */
		return "login";
	}


	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}

}