
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
		input [type="text"]
		{
			width:150px;
		}
	</style>
</head>

		<script type="text/javascript" charset="utf-8">
			//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(key, url)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  "<img src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('" + url + "','" +entityId+"');\"/>";
							//alert(html);
						   return html;
				          }
				  };
			}
			function getEndTimeColumn(key)
			{
				return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {
							  var endTime = oObj.aData[key];
							  var status = oObj.aData["status"];
							  if(status == 'New')
								  return '<span style="color:red;font-weight:bold;">报警中..</span>';
							  return endTime;
						 }};
			}
			//编辑列
			function getEditActionColumn(key)
			{
				return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {
					       var entityId = oObj.aData[key];
						   sVal = oObj.aData["processed"]; //处理标志位
						   if(sVal != '未处理')
							   return sVal;
				           var html =  "<a href=\"javascript:InfoWindow.viewAlarm('" + entityId+ "');\">" +" 未处理</a>";
						   return html;
						 }};

			}

			

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "childType" },
						{ "mData": "type" },
						{ "mData": "location" },
						{ "mData": "startTime" },
						//{ "mData": "endTime" },
					     getEndTimeColumn("endTime"),
						{ "mData": "timeSpan" },
						{ "mData": "depName" },
						{ "mData": "velocity" },
					     getEditActionColumn("alarmId"),
						{ "mData": "processedTime" },
						{ "mData": "remark" }
					];
				   //创建下拉树菜单, 参数是: 输入选择框ID，菜单的divID, 和ajax 数据URL
				 createTree($("#depName"), $("#treeMenu"), "<%=ApplicationPath%>/data/depMenu.action", function(node)
					{
						 $("#depId").val(node.id); //将点击选择的部门ID赋值给隐含参数，提交后台
					});
					
			 $("#processed").lookup({category:"processType"});
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/report/alarmList.action");
				  
                 $("#alarmType").lookup({category:"alarmType"});//填充报警类型下拉框
             $("#alarmType").change(function()
				{
				       var txt = $("#alarmType").find("option:selected").text(); 
					   $("#childTypeName").val(txt);
				});
				$("#processed").change(function()
				{
				       var txt = $("#processed").find("option:selected").text(); 
					   $("#processedName").val(txt);
				});
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/alarmList.action">
			   <input type="hidden" name="queryId" value="selectAlarms" />		    
			   <input type="hidden" name="fileName" value="报警信息" />	     
			   <input type="hidden" id="childTypeName"  name="childTypeName" value="所有" />	
			   <input type="hidden" id="processedName"  name="processedName" value="所有" />	     
			  <table width="100%"  class="TableBlock">
			   			   <tr>
						    <td> 车牌号码 </td>
					<td>			   
					<input type="text" id="plateNo" name="plateNo" > 
					</td>
				   <td> 车组名称 </td>
					<td>			   
					<input type="text" id="depName" name="depName" > 
							<input type="hidden" id="depId" name="depId" value="" />
							<!--车组下拉框-->
						<div id="menuContent" class="menuContent" style="display:none; position: absolute;height:100px;">
							<ul id="treeMenu" class="ztree" style="margin-top:0; width:170px;height:200px;"></ul>
						</div>
               </td>
				<td>报警类型</td>
			   <td> <select id="alarmType" name="childType" width="10"></select></td>
			   
				<td>处理情况</td>
			   <td> <select id="processed" name="processed" width="10"></select>
			   </td>
            </tr>
				<tr>
						
						<td align="right">开始时间
							:</td>
						<td>
      <input type="text" name="startTime"  class="datetimepicker" />
						</td>
						<td>结束时间:</td>
						<td align="left">
      <input type="text" name="endTime"  class="datetimepicker" />
						</td>
				
        <td colspan="4" align="left">
	       <input type="button" value="查询"  title="查询" id="btnQuery" class="button gray medium"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置" class="button gray medium"/>&nbsp;&nbsp;
		   <button class="button gray medium" value="l" title="导出" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        </td>
    </tr>
		</form>	 
		
		</table>

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
				   <col width="6%"> 
				   <col width="5%">
					<col width="8%">
				   <col width="6%"> 
					<col width="18%">
					<col width="13%">
					<col width="13%">
					<thead>
						<tr>
							<tr>
								<th style="width:50px">车牌号</th>
								<th width="6%">颜色</th>
								<th width="6%">报警类型</th>
								<th width="6%">报警来源</th>
								<th width="10%">报警地点</th>
								<th width="20%">开始时间</th>
								<th width="20%">结束时间</th>
								<th width="10%">时长</th>
								<th width="10%">车组</th>
								<th width="10%">车速(km/h)</th>
								<th >处理状态</th>
								<th >处理时间</th>
								<th >备注</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			</div>

</body>

