
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
  <%@ page language="java" pageEncoding="UTF-8"%>
	<!--下拉树的配置,三个文件不能缺少-->	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

	<style>
        select {
			width:80px;
	    }
		input 
		{
			width:150px;
		}
	</style>
</head>

		<script type="text/javascript" charset="utf-8">	
			

			$(document).ready(function() {

			     
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/data/excelExport.action">
			   <input type="hidden" name="queryId" value="selectHisotryGpsInfos" />		  
					<input type="hidden" id="plateNo" name="plateNo" >    
					<input type="hidden" id="startTime" name="startTime" >    
					<input type="hidden" id="endTime" name="endTime" >   
			   <input type="hidden" name="fileName" value="历史轨迹数据" />	     
		</form>	 
		
		</table>

			

</body>

