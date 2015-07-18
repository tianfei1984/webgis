 package com.ltmonitor.web.util;

 
 class ByteArray
 {
   private byte[] buf;
   public int length = 0;
 
   public void clear() {
     this.length = 0;
   }
 
   public ByteArray() {
     this.buf = new byte[''];
   }
 
   public ByteArray(byte[] bs) {
     this.buf = new byte[bs.length];
     this.length = bs.length;
     System.arraycopy(bs, 0, this.buf, 0, bs.length);
   }
 
   public ByteArray(byte[] bs, int lenght) {
     this.buf = new byte[this.length];
     this.length = bs.length;
     System.arraycopy(bs, 0, this.buf, 0, lenght);
   }
 
   public ByteArray(int size) {
     this.buf = new byte[size];
   }
 
   public void addBytes(byte[] bs) {
     addBytes(bs, 0, bs.length);
   }
 
   public void addByteArray(ByteArray ba) {
     addBytes(ba.toArray(), 0, ba.length);
   }
 
   public void addByte(byte b) {
     byte[] bs = { b };
     addBytes(bs);
   }
 
   public void addBytes(byte[] bs, int begin, int end) {
     if (this.buf.length < this.length + bs.length) {
       byte[] tmp = this.buf;
       this.buf = new byte[this.length + bs.length + 128];
       System.arraycopy(tmp, 0, this.buf, 0, this.length);
     }
     System.arraycopy(bs, begin, this.buf, this.length, end - begin);
     this.length += end - begin;
   }
 
   public byte[] toArray() {
     byte[] ret = new byte[this.length];
     System.arraycopy(this.buf, 0, ret, 0, this.length);
     return ret;
   }
 
   public byte[] toClearArray() {
     int i = this.length - 1;
     while ((i >= 0) && 
       (this.buf[i] == 0)) {
       i--;
     }
 
     byte[] ret = new byte[i + 1];
     System.arraycopy(this.buf, 0, ret, 0, i + 1);
     return ret;
   }
 
   public byte[] getBytes(int begin, int end) {
     if (begin > end) {
       return null;
     }
     if ((begin < 0) || (begin > this.length)) {
       return null;
     }
     if ((end < 0) || (end > this.length)) {
       return null;
     }
     byte[] b = new byte[end - begin];
     System.arraycopy(this.buf, begin, b, 0, end - begin);
     return b;
   }
 
   public byte[] getBytes(int begin) {
     return getBytes(begin, this.length);
   }
 
   public byte getByte(int i) {
     return this.buf[i];
   }
 }
