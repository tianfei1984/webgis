 package com.ltmonitor.web.filter;
 
 import java.io.IOException;
 import javax.servlet.Filter;
 import javax.servlet.FilterChain;
 import javax.servlet.FilterConfig;
 import javax.servlet.ServletException;
 import javax.servlet.ServletRequest;
 import javax.servlet.ServletResponse;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import org.apache.commons.logging.Log;
 import org.apache.commons.logging.LogFactory;
 
 public class WapFilter
   implements Filter
 {
   protected final transient Log log = LogFactory.getLog(getClass());
 
   public void destroy()
   {
   }
 
   boolean isWap(String userAgent)
   {
     return (userAgent == null) || (userAgent.indexOf("Mozilla") != 0);
   }
 
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
     throws IOException, ServletException
   {
     HttpServletRequest req = (HttpServletRequest)request;
 
     String userAgent = req.getHeader("User-Agent");
     this.log.info("userAgent:" + userAgent);
     if (isWap(userAgent))
       req.setAttribute("wapFlag", "1");
     else {
       req.setAttribute("wapFlag", "0");
     }
 
     HttpServletResponse resp = (HttpServletResponse)response;
     String uri = req.getRequestURI();
 
     if (isWap(userAgent)) {
       resp.setCharacterEncoding("utf-8");
       resp.setContentType("text/vnd.wap.wml;charset=utf-8");
       resp.setCharacterEncoding("utf-8");
       if ((uri.endsWith("/qc")) || (uri.endsWith("/qc/")))
         resp.sendRedirect(req.getContextPath() + "/qc/wap.jsp");
       else {
         filterChain.doFilter(request, response);
       }
     }
     else if ((uri.endsWith("/qc")) || (uri.endsWith("/qc/"))) {
       resp.sendRedirect(req.getContextPath() + "/qc/web.jsp");
     } else {
       filterChain.doFilter(request, response);
     }
   }
 
   public void init(FilterConfig arg0)
     throws ServletException
   {
   }
 }
