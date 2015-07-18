
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
  <%@ page language="java" pageEncoding="UTF-8"%>

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
		
			
			function getEndTimeColumn(value, rowData, rowIndex)
			{
				var endTime = rowData.endTime;
				var status = rowData.status;
				if(status == 'New')
				   return '<span style="color:red;font-weight:bold;">报警中..</span>';
				return endTime;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				 var entityId = rowData.id;
				 var sVal = rowData.processed; //处理标志位
				 if(sVal != '未处理')
					 return sVal;
				  var html =  "<a href=\"javascript:InfoWindow.viewAlarm('" + entityId+ "');\">" +" 未处理</a>";
				 return html;

			}

			function validateDate()
 {
	   var startTime = $("#startTime").val();
	   var endTime =$("#endTime").val();
	   startTime = new Date(Date.parse(startTime.replace(/-/g, "/")));
	   endTime = new Date(Date.parse(endTime.replace(/-/g, "/")));
	   if(isNaN( startTime.getTime() ) || isNaN(endTime.getTime() ) )
	   {
			$.messager.alert('提示','非法的日期格式'); 
	   }
	   var today = new Date();

	   var date1 = new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate());
	   var date2 = new Date(endTime.getFullYear(),endTime.getMonth(),endTime.getDate());
		if(startTime > today)
		{
			$.messager.alert('提示','开始日期不能大于当前日期'); 
			return false;
		}
		if(startTime >= endTime)
		{
			$.messager.alert('提示','开始时间不能大于等于结束时间'); 
			return false;
		}

		var  iMonth = endTime.getMonth() - startTime.getMonth();  
		if(iMonth > 1 || (iMonth < 0 && iMonth != -11))
		{
			$.messager.alert('提示', '一次只能查询不超过两个月的历史数据'); 
			return false;
		}
		return true;
 }

			

			$(document).ready(function() {
				
				   var now = Utility.today();
				  $("#endTime").val(now + " 23:59:00");
				  var now = Utility.today();
				  $("#startTime").val(now + " 00:00:00");
//创建下拉部门树
				Utility.createDepTree("depId");
				$("#btnQuery").click(function(){
					if(validateDate())
				        Utility.loadGridWithParams();
				});
				  
					
			 $("#processed").lookup({category:"processType"});
				  
                 $("#alarmType").lookup({category:"alarmType"});//填充报警类型下拉框
             $("#alarmType").change(function()
				{
				       var txt = $("#alarmType").find("option:selected").text(); 
					   $("#alarmTypeName").val(txt);
				});
				$("#processed").change(function()
				{
				       var txt = $("#processed").find("option:selected").text(); 
					   $("#processedName").val(txt);
				});

			} );
		</script>
<body>
		<div id="toolbar">				
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/processedAlarmList.action">
			   <input type="hidden" name="queryId" value="selectProcessedAlarms" />		    
			   <input type="hidden" name="fileName" value="报警信息" />	     
			   <input type="hidden" id="alarmTypeName"  name="alarmTypeName" value="所有" />	
			   <input type="hidden" id="processedName"  name="processedName" value="所有" />	     
			  <table width="100%"  class="TableBlock">
			   			   <tr>
						    <td> 车牌号码 </td>
					<td>			   
					<input type="text" id="plateNo" name="plateNo" > 
					</td>
				   <td> 车组名称 </td>
					<td>			   
				<select id="depId" name="depId" style="width:200px;"></select>
               </td>
				<td>报警类型</td>
			   <td> <select id="alarmType" name="alarmType" width="10"></select></td>
			   
				<td>处理情况</td>
			   <td> <select id="processed" name="processed" width="10"></select>
			   </td>
            </tr>
				<tr>
						
						<td align="right">开始时间
							:</td>
						<td>
      <input type="text" name="startTime"  id="startTime" class="datetimepicker" />
						</td>
						<td>结束时间:</td>
						<td align="left">
      <input type="text" name="endTime"  id="endTime"  class="datetimepicker" />
						</td>
				
        <td colspan="4" align="left">
	      <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
				<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;height:480px"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/report/processedAlarmList.action',method:'post'">
					<thead>
							<tr>
								<th data-options="field:'plateNo'"  width="8%">车牌号</th>
								<th data-options="field:'plateColor'"  width="5%">颜色</th>
								<th data-options="field:'depName'"  width="10%">车组</th>
								<th data-options="field:'alarmType'"  width="6%">报警类型</th>
								<th data-options="field:'alarmSource'"  width="6%">报警来源</th>
								<th data-options="field:'location'"  width="20%">报警地点</th>
								<th data-options="field:'alarmTime'"  width="12%">报警时间</th>
								<th data-options="field:'speed'"  width="6%">车速(km/h)</th>
								<th data-options="field:'id',formatter:getEditActionColumn"  >处理状态</th>
								<th data-options="field:'processedTime'"  >处理时间</th>
								<th data-options="field:'processedUserName'"  >处理人</th>
								<th data-options="field:'remark'"  >备注</th>
						</tr>
					</thead>				
				</table>
</body>

