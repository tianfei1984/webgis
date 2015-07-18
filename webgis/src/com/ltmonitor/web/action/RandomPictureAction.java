 package com.ltmonitor.web.action;
 
 import java.awt.Color;
 import java.awt.Font;
 import java.awt.Graphics;
 import java.awt.image.BufferedImage;
 import java.io.ByteArrayInputStream;
 import java.io.ByteArrayOutputStream;
 import java.io.File;
 import java.io.FileInputStream;
 import java.io.InputStream;
 import java.net.URL;
 import java.util.Date;
 import java.util.Random;
 import javax.imageio.ImageIO;
 import javax.imageio.stream.ImageOutputStream;
 import javax.servlet.ServletContext;
 import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
 
 public class RandomPictureAction extends GenericAction
 {
   private static final long serialVersionUID = 7848092970366563600L;
   private ByteArrayInputStream inputStream;
 
   public String execute()
     throws Exception
   {
     Date d = new Date();
 
     int width = 60; int height = 20;
     BufferedImage image = new BufferedImage(width, height, 1);
 
     Graphics g = image.getGraphics();
 
     Random random = new Random();
 
     g.setColor(getRandColor(200, 250));
     g.fillRect(0, 0, width, height);
 
     g.setFont(new Font("Times New Roman", 0, 18));
 
     g.setColor(getRandColor(160, 200));
     for (int i = 0; i < 155; i++)
     {
       int x = random.nextInt(width);
       int y = random.nextInt(height);
       int xl = random.nextInt(12);
       int yl = random.nextInt(12);
       g.drawLine(x, y, x + xl, y + yl);
     }
 
     String sRand = "";
     for (int i = 0; i < 4; i++)
     {
       String rand = String.valueOf(random.nextInt(10));
       sRand = sRand + rand;
 
       g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
 
       g.drawString(rand, 13 * i + 6, 16);
     }
 
     HttpSession session = getRequest().getSession(true);
     session.setAttribute("randomCode", sRand);
 
     g.dispose();
     ByteArrayOutputStream output = new ByteArrayOutputStream();
     ImageOutputStream imageOut = ImageIO.createImageOutputStream(output);
     ImageIO.write(image, "JPEG", imageOut);
     imageOut.close();
     ByteArrayInputStream input = new ByteArrayInputStream(output.toByteArray());
     output.close();
     setInputStream(input);
 
     return "success";
   }
 
 
   public static int computeStringByteLen(String s)
   {
     int length = 0;
     for (int t = 0; t < s.length(); t++)
     {
       if (s.charAt(t) > 'ÿ')
       {
         length += 2;
       }
       else
       {
         length += 1;
       }
     }
     return length;
   }
 
   private Color getRandColor(int fc, int bc)
   {
     Random random = new Random();
     if (fc > 255)
       fc = 255;
     if (bc > 255)
       bc = 255;
     int r = fc + random.nextInt(bc - fc);
     int g = fc + random.nextInt(bc - fc);
     int b = fc + random.nextInt(bc - fc);
     return new Color(r, g, b);
   }
 
   public void setInputStream(ByteArrayInputStream inputStream)
   {
     this.inputStream = inputStream;
   }
 
   public ByteArrayInputStream getInputStream()
   {
     return this.inputStream;
   }
 }
