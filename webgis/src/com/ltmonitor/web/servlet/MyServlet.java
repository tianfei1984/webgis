 package com.ltmonitor.web.servlet;
 
 import java.io.IOException;
 import java.io.PrintStream;
 import java.io.PrintWriter;
 import java.util.Enumeration;
 import javax.servlet.ServletException;
 import javax.servlet.http.HttpServlet;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 
 public class MyServlet extends HttpServlet
 {
   protected void doGet(HttpServletRequest request, HttpServletResponse response)
     throws ServletException, IOException
   {
     Enumeration en = request.getHeaderNames();
     response.getWriter().write("--------------------header info----------------------<br/>");
 
     while (en.hasMoreElements())
     {
       String name = (String)en.nextElement();
       String strName = request.getHeader(name);
       System.out.println(strName + "::" + request.getHeader(strName));
       response.getWriter().write(strName + ":" + request.getHeader(strName) + "<br/>");
     }
   }
 
   protected void doPost(HttpServletRequest req, HttpServletResponse resp)
     throws ServletException, IOException
   {
     super.doPost(req, resp);
   }
 }
