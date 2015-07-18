 package com.ltmonitor.web.servlet;
 
 import java.io.IOException;
 import java.io.PrintWriter;
 import java.util.Random;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 
 public class RandomSender
   implements Runnable
 {
   HttpServletResponse response;
   HttpServletRequest request;
   Random random;
   int status = 0;
 
   public RandomSender(HttpServletRequest request, HttpServletResponse response)
   {
     this.response = response;
     this.request = request;
     this.random = new Random();
   }
 
   public void run()
   {
     while (true)
     {
       if (this.status == 1)
       {
         return;
       }
       try
       {
         PrintWriter out = this.response.getWriter();
         out.write("<data>" + String.valueOf(this.random.nextInt(10)) + "</data>");
         out.flush();
         try
         {
           Thread.sleep(3000L);
         }
         catch (InterruptedException e)
         {
           e.printStackTrace();
         }
 
       }
       catch (IOException e)
       {
         e.printStackTrace();
       }
     }
   }
 
   public int getStatus()
   {
     return this.status;
   }
 
   public void setStatus(int status)
   {
     this.status = status;
   }
 }
