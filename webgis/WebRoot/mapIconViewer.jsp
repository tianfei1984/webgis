<%@ page language="java" import="java.util.*,java.io.File" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>地图图标选择器</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
  </head>
 
  <body>
   	 <%
   	 /***
   	 ** 
   	 ** content: 文件夹下图片实现浏览并分页效果
   	 */
  	String strRealPath = getServletContext().getRealPath("/");//得到项目的绝对路径
  	List data=null;
  	String picPath="map/MapIcon";
	String picDir = basePath+picPath+"\\";
  	//out.println("strRealPath="+strRealPath);
 	data=recursion(strRealPath+picPath,true,0);//第一个参数图片文件夹路径,第二个参数只需设置true,或false,true表示也循环子目录下的图片，第三个参数默认为0即可,千万不要改动
 	//data=recursion("D:\\resin\\webapps\\PicList\\images",false);
 	if(data==null){out.println("该文件夹不存在!");return ;}
 	//	out.println("大小："+data.size());
 	//out.println("-----------------分页开始--------------------");
 	int pageSize=70;//每页显示多少条
 	int showPage=1;//第几页
 	int totle=data.size();//共有多少条数据(多少张照片)
 	String state="";
 	String upPage=request.getParameter("upPage");
 	String nextPage=request.getParameter("nextPage");
 	if(upPage!=null){
 		showPage=Integer.parseInt(upPage);
 	}
 	if(nextPage!=null){
 		showPage=Integer.parseInt(nextPage);
 	}
 	
  	if(data.size()>0){
			 if(totle%pageSize==0){
				  totlePage=totle/pageSize; //共有多少页
			  }
			  else{
				  totlePage=totle/pageSize+1;
			  }
			  //当前页小于等于第一页 则按第一页算 如果 当前页大于等于总页数则为最后页
			    if(showPage <=1){
			    	state="当前已是首页！";
			        showPage = 1;
			    }
			    else if(showPage >= totlePage){
			        showPage =  totlePage;
			        if(showPage==totlePage){ state="当前已是最后一页！";}
			        
			    }
%>
 <table border="0" align="center">
   	<tr>
   	<td align="center" colspan="8"><b>图片列表信息</b><hr/></td>
   	</tr>
<%
			  //System.out.println("共 "+totle+" 张图片, "+totlePage+" 页。当前"+showPage+"页，每页显示"+pageSize+"条");
			   //游标的位置 (当前页 - 1) * 页面大小 + 1
			  int posion = (showPage-1) * pageSize + 1;
			  int endData=pageSize*showPage;
			  for (int i = posion; i <= data.size(); i++) {
				  if(i>endData){
				  //out.println("break;---"+i);
					  break;
				  }
				  else{
				    	if((i-posion)%10==0){
				    		%>
				    		<tr>
				    		<%
						  }
						  %>
						  	<td align="center">
						  	<DIV class=thumbnail style="margin-left:0">
							  	<A  href="javascript:selectIcon('<%=data.get(i-1) %>');">
							  	<img src="<%=picDir+data.get(i-1) %>" width="36" height="36" border="0"/>
							  	</A>
						  	</DIV>
						  	</td>
						  <%
						if((i-posion)%10==9){
						%>
							</tr>
						<%
						}

					  //out.println("图片：>>>"+data.get(i-1)+"\r\n");//有问题，要判断，小于4，
				  }
				  
			  }
		}
		else{
			out.println("该目录下没有图片");
		}
   %>
   	<tr>
	   	<td align="center" colspan="8" nowrap="nowrap" style="font-size: 12px;">
	   	图片数量: <font color="red"><%=data.size() %></font> 张,共 <font color="red"><%=totlePage %></font>  页,当前第 <font color="red"><%=showPage %></font> 页&nbsp;
	   	<a href="mapIconViewer.jsp?upPage=<%=1 %>" style="text-decoration: none">首页</a>&nbsp;<a style="text-decoration: none" href="mapIconViewer.jsp?upPage=<%=showPage-1 %>">上一页</a>&nbsp;<a href="mapIconViewer.jsp?nextPage=<%=showPage+1 %>" style="text-decoration: none">下一页</a>&nbsp;<a href="mapIconViewer.jsp?nextPage=<%=totlePage %>" style="text-decoration: none">尾页</a>&nbsp;
	   	跳转第&nbsp;<input id="goPage" type="text" style="width:30px;text-align: center;" value="<%=showPage %>" />&nbsp;页&nbsp;<input type="button" value="GO" onclick="ck()"/>
	   	&nbsp;<span><%=state %></span>
	   	</td>
   	</tr>
   </table>
   <%!
   //遍历某个目录下所有文件
  	  int folderCount;//文件夹个数
	  int fileCount;//文件个数
	  int picFilCount=0;//图片个数
	// 总共的数据量   (图片个数)
      int totle;   

    // 共有多少页   
      int totlePage;    
    // 数据   
      List list;
   /**
	 * 
	 * @param root 文件夹所在位置
	 * @param isBlAll 是否连子文件夹下的某个文件(图片)也遍历
	 * @param isrRef 可设为0或1,为0时，表示是翻页或刷新时请求，为1时表示循环内部所有文件夹时请求，我们调用时,只需要设置为0就ok，其他的不用操心
	 */
	public  List recursion(String root,boolean isBlAll,int isRef){
		if(isRef==0){
			list=new ArrayList();
		}
		//Java中读取某个目录下的所有文件和文件夹
		  String filePath=getServletContext().getRealPath("/");
		  String picPath=root.replace(filePath,"");
		  File file=new File(root);
		  if(file.isDirectory()){
		  File[] tempList = file.listFiles();
		  //System.out.println("该目录下对象个数："+tempList.length);
		  for (int i = 0; i < tempList.length; i++) {
			   if (tempList[i].isFile()) {
				fileCount++;
			    //System.out.println("文     件："+tempList[i]);
			    String fileName=tempList[i].getName();//文件名称
			    String hzm=fileName.substring(fileName.indexOf(".")+1,fileName.length()); //文件后缀名
			    hzm=hzm.toLowerCase();
			    if(hzm.equals("jpg")||hzm.equals("bmp")||hzm.equals("gif")||hzm.equals("png")){
			    	picFilCount++;
			    	//list.add(tempList[i]);//这里要注意，data.add(fileName);
			    	//list.add(picPath+"\\"+fileName);
					list.add(fileName);
			    }
			   // System.out.println("名称"+hzm);
			   }
			   if (tempList[i].isDirectory()) {
				 folderCount++;
				 //System.out.println("文件夹："+tempList[i]);
				 if(isBlAll){
					 recursion(tempList[i].getAbsolutePath(),isBlAll,1);
				 }
			  
			   }
		  }
		  totle=picFilCount;
		 // System.out.println("文件夹个数："+folderCount+"\r\n文件个数："+fileCount+"\r\n图片个数："+picFilCount);
			return list;
		}
		else{
			return null;
		}
	}
	
   
    %>
  </body>
  <script type="text/javascript">
  function ck(){
	  var va=document.getElementById("goPage");
	  var strPage=va.value.replace( / /g,""); 
	  if(strPage==""){alert("跳转的值不能为空!");return ;}
	  if(isNaN(va.value)){alert("跳转的值必须为数字!");return ;}
	   window.location.href="mapIconViewer.jsp?nextPage="+va.value;
  }

  function selectIcon(iconName)
  {
	  window.opener.setIcon(iconName);
	  window.close();
  }
  </script>
</html>
