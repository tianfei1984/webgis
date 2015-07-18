 package com.ltmonitor.web.filter;
 
 import java.io.IOException;
 import java.util.Iterator;
 import java.util.Set;
 import javax.servlet.FilterChain;
 import javax.servlet.FilterConfig;
 import javax.servlet.RequestDispatcher;
 import javax.servlet.ServletContext;
 import javax.servlet.ServletException;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import javax.servlet.http.HttpSession;
 import org.apache.commons.logging.Log;
 import org.springframework.util.PatternMatchUtils;
 import org.springframework.web.filter.OncePerRequestFilter;
 import org.springframework.web.util.UrlPathHelper;
 
 public class StaticFilter extends OncePerRequestFilter
 {
   private static final String DEFAULT_INCLUDES = "*.html";
   private static final String DEFAULT_EXCLUDES = "";
   private static final String INCLUDES_PARAMETER = "includes";
   private static final String EXCLUDES_PARAMETER = "excludes";
   private static final String SERVLETNAME_PARAMETER = "servletName";
   private String[] excludes;
   private String[] includes;
   private String servletName;
 
   public void initFilterBean()
   {
     String includesParam = getFilterConfig().getInitParameter("includes");
 
     if (org.apache.commons.lang.StringUtils.isEmpty(includesParam))
       this.includes = parsePatterns("*.html");
     else {
       this.includes = parsePatterns(includesParam);
     }
 
     String excludesParam = getFilterConfig().getInitParameter("excludes");
 
     if (org.apache.commons.lang.StringUtils.isEmpty(excludesParam))
       this.excludes = parsePatterns("");
     else {
       this.excludes = parsePatterns(excludesParam);
     }
 
     this.servletName = getFilterConfig().getInitParameter("servletName");
   }
 
   private String[] parsePatterns(String delimitedPatterns)
   {
     Set patternSet = org.springframework.util.StringUtils.commaDelimitedListToSet(delimitedPatterns);
 
     String[] patterns = new String[patternSet.size()];
     int i = 0;
     for (Iterator iterator = patternSet.iterator(); iterator.hasNext(); i++)
     {
       String pattern = (String)iterator.next();
       patterns[i] = pattern.trim();
     }
     return patterns;
   }
 
   public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
     throws IOException, ServletException
   {
     String method = request.getMethod().toUpperCase();
     if ("HEAD, PUT, DELETE, OPTIONS".indexOf(method) >= 0) {
       response.sendRedirect(request.getContextPath() + "/index.jsp");
       return;
     }
     if ((request.getSession().isNew()) && (request.getServletPath().endsWith("login.jsp")))
     {
       response.sendRedirect(request.getContextPath() + "/index.jsp");
     }
 
     UrlPathHelper urlPathHelper = new UrlPathHelper();
     String path = urlPathHelper.getPathWithinApplication(request);
     boolean pathExcluded = PatternMatchUtils.simpleMatch(this.excludes, path);
     boolean pathIncluded = PatternMatchUtils.simpleMatch(this.includes, path);
 
     if ((pathIncluded) && (!pathExcluded)) {
       if (this.logger.isDebugEnabled()) {
         this.logger.debug("Forwarding to static resource: " + path);
       }
 
       if (path.contains(".html")) {
         response.setContentType("text/html");
       }
 
       RequestDispatcher rd = getServletContext().getRequestDispatcher(path);
 
       rd.include(request, response);
       return;
     }
 
     if (this.servletName != null) {
       RequestDispatcher rd = getServletContext().getNamedDispatcher(this.servletName);
 
       rd.forward(request, response);
       return;
     }
 
     if (request.getHeader("User-Agent") != null) {
       String ua = request.getHeader("User-Agent").toLowerCase();
       request.setAttribute("isFirefox", Integer.valueOf(ua.indexOf("firefox")));
       request.setAttribute("isIE", Integer.valueOf(ua.indexOf("msie")));
       request.setAttribute("isIE6", Boolean.valueOf(ua.contains("msie 6.")));
     }
 
     chain.doFilter(request, response);
   }
 }
