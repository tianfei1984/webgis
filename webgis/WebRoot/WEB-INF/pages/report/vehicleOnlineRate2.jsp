<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>
  
	<!--下拉树的配置,三个文件不能缺少-->	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->
</head>

		<script type="text/javascript" charset="utf-8">
			

			

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "depName" },
						{ "mData": "onlineTime" },
						{ "mData": "offlineTime" },
						{ "mData": "totalTime" },
						{ "mData": "onlineRate" },
						{ "mData": "staticDate" }
					];
				 
					  $("#intervalType").lookup({category:"ReportType"}); //统计类型下拉框
				  //创建下拉树菜单, 参数是: 输入选择框ID，菜单的divID, 和ajax 数据URL
				 createTree($("#depName"), $("#treeMenu"), "<%=ApplicationPath%>/data/depMenu.action", function(node)
					{
						 $("#depId").val(node.id); //将点击选择的部门ID赋值给隐含参数，提交后台
					});
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/report/vehicleOnlineRate.action");
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/vehicleOnlineRate.action">
			   <input type="hidden" name="queryId" value="selectVehicleOnlineRate" />		   
			   <input type="hidden" name="fileName" value="车辆上线率" />	        
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 车牌号码: </td>
			    <td>			    <input type="text" name="plateNo" size="10"  id="plateNo">   </td>
            <td>车辆组:</td>
			    <td>			
				<input type="text" id="depName" name="depName" > 
							<input type="hidden" id="depId" name="depId" value="" />
<div id="menuContent" class="menuContent" style="display:none; position: absolute;height:100px;">
	<ul id="treeMenu" class="ztree" style="margin-top:0; width:170px;height:200px;"></ul>
</div>
				</td>
            <td>统计类型</td>
			    <td>	<select id="intervalType"  name="intervalType"></select>   </td>
            </tr>
 <tr>
			   <td> 统计日期 </td>
			    <td colspan="3">			    <input type="text" name="startDate" size="10"  class="datepicker">
              至<input type="text" name="endDate" size="10"   class="datepicker">   </td>
             
        <td  align="left">
	       <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
		   <button class="btnExport"  value="l" title="导出" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        </td>
    </tr>
		</form>	 
		</table>

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<th width="15%">车牌号</th>
							<th width="15%">车牌颜色</th>
							<th width="7%">车组</th>
							<th width="15%">上线时间</th>
							<th width="15%">离线时间</th>
							<th width="15%">上线率</th>
							<th width="15%">统计日期</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			</div>

</body>

