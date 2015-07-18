 package com.ltmonitor.web.util;
 
 import javax.servlet.http.Cookie;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

 
 public final class RequestUtil
 {
   private static final Log log = LogFactory.getLog(RequestUtil.class);
 
   public static void setCookie(HttpServletResponse response, String name, String value, String path)
   {
     if (log.isDebugEnabled())
     {
       log.debug("Setting cookie '" + name + "' on path '" + path + "'");
     }
 
     Cookie cookie = new Cookie(name, value);
     cookie.setSecure(false);
     cookie.setPath(path);
     cookie.setMaxAge(2592000);
 
     response.addCookie(cookie);
   }
 
   public static Cookie getCookie(HttpServletRequest request, String name)
   {
     Cookie[] cookies = request.getCookies();
     Cookie returnCookie = null;
 
     if (cookies == null)
     {
       return returnCookie;
     }
 
     for (Cookie thisCookie : cookies)
     {
       if ((!thisCookie.getName().equals(name)) || ("".equals(thisCookie.getValue())))
         continue;
       returnCookie = thisCookie;
       break;
     }
 
     return returnCookie;
   }
 
   public static void deleteCookie(HttpServletResponse response, Cookie cookie, String path)
   {
     if (cookie != null)
     {
       cookie.setMaxAge(0);
       cookie.setPath(path);
       response.addCookie(cookie);
     }
   }
 
   public static String getAppURL(HttpServletRequest request)
   {
     if (request == null) {
       return "";
     }
     StringBuffer url = new StringBuffer();
     int port = request.getServerPort();
     if (port < 0)
     {
       port = 80;
     }
     String scheme = request.getScheme();
     url.append(scheme);
     url.append("://");
     url.append(request.getServerName());
     if (((scheme.equals("http")) && (port != 80)) || ((scheme.equals("https")) && (port != 443)))
     {
       url.append(':');
       url.append(port);
     }
     url.append(request.getContextPath());
     return url.toString();
   }
 }
