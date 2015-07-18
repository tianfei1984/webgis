 package com.ltmonitor.web.util;
 
 import java.io.PrintStream;

 
 public class Base64Encode
 {
   public static String encode(byte[] ba)
   {
     char p = '=';
 
     String tab = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!/";
     ByteArray s = new ByteArray();
     int l = ba.length;
     int rm = l % 3;
     int x = l - rm;
     int i = 0;
     while (i < x) {
       int t = ba[(i++)] << 16 & 0xFF0000 | ba[(i++)] << 8 & 0xFF00 | ba[(i++)] & 0xFF;
 
       s.addByte((byte)tab.charAt(t >>> 18 & 0x3F));
       s.addByte((byte)tab.charAt(t >>> 12 & 0x3F));
       s.addByte((byte)tab.charAt(t >>> 6 & 0x3F));
       s.addByte((byte)tab.charAt(t & 0x3F));
     }
     switch (rm) {
     case 2:
       int t = ba[(i++)] << 16 & 0xFF0000 | ba[(i++)] << 8 & 0xFF00;
       s.addByte((byte)tab.charAt(t >>> 18 & 0x3F));
       s.addByte((byte)tab.charAt(t >>> 12 & 0x3F));
       s.addByte((byte)tab.charAt(t >>> 6 & 0x3F));
       s.addByte((byte)p);
       break;
     case 1:
       t = ba[(i++)] << 16 & 0xFF0000;
       s.addByte((byte)tab.charAt(t >>> 18 & 0x3F));
       s.addByte((byte)tab.charAt(t >>> 12 & 0x3F));
       s.addByte((byte)p);
       s.addByte((byte)p);
       break;
     }
 
     String str = new String(s.toArray());
     return str;
   }
 
   public static void main(String[] args) {
     byte[] bs = { 85, -86, 3, 35, 1, 1, 37, 13, 10 };
 
     String str = encode(bs);
     System.out.println(str);
   }
 }