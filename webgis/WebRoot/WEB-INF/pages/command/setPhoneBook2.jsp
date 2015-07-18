<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
  
        <script type="text/javascript" src="<%=ApplicationPath%>/js/edittable/jquery.edittable.js?v=0.1.0"></script>
        <link rel="stylesheet" href="<%=ApplicationPath%>/js/edittable/jquery.edittable.css?v=0.1.0">


 <script>
        $(window).ready(function () {
        	
        	// Initialize table example 0
        	var eTable =$('#source1').editTable({
			headerCols: [
	        		'标志',
	        		'电话号码',
	        		'联系人'
	        	],
	        	maxRows: 100
				});

		
			$(".sendjson").click(function()
			 {
				   var gridData = eTable.getJsonData();
				   alert(gridData);
				   $("#bookList").val(gridData);
				   $("#EntityForm").ajaxSubmit(function()
						 {
					         alert("命令已经下发,请等待处理!");
						 }
					 ); //提交表单
			 });

			 
			 var defaultConfigType = ${configType}; //默认的菜单设置类型
			//ajax填充下拉框数据
			 $("#configType").lookup({category:"PhoneBook", selectedValue:defaultConfigType});
					   
		});
</script>
 <BODY>
 <form id="EntityForm" method="post" action="<%=ApplicationPath%>/data/phoneBook.action">
        <input type="hidden"  name="bookList"  id="bookList" />
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
		设置类型:&nbsp;&nbsp;<select id="configType" name="configType"  style="width: 150px;"></select>&nbsp;&nbsp;<button type="button" class="sendjson" >发送</button> 
		<div id="source1">
		</div>	
		
		
</form>
  
 </BODY>
</HTML>
