package com.ltmonitor.web.action;

import java.util.List;

public class PaginateResult {
	//实际的行数
	private int	iTotalRecords;	
	//过滤之后，实际的行数。
	private int	iTotalDisplayRecords;	
	//来自客户端 sEcho 的没有变化的复制品，
	private String	sEcho;	
	//可选，以逗号分隔的列名，
	private String	sColumns;	
	//数组的数组，表格中的实际数据。　　　　
	private List aaData	;
	
	public PaginateResult()
	{
		
	}

	public PaginateResult(int total, List result,String echo)
	{
		aaData = result;
		iTotalRecords = total;
		iTotalDisplayRecords = total;//result.size();
		this.sEcho = echo;
	}
	
	public int getiTotalRecords() {
		return iTotalRecords;
	}
	public void setiTotalRecords(int iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}
	public int getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}
	public void setiTotalDisplayRecords(int iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}
	public String getsEcho() {
		return sEcho;
	}
	public void setsEcho(String sEcho) {
		this.sEcho = sEcho;
	}
	public List getAaData() {
		return aaData;
	}
	public void setAaData(List aaData) {
		this.aaData = aaData;
	}

}
