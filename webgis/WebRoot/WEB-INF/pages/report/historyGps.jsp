<!--
 页面功能: 查询历史GPS数据
-->
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
  <%@ page language="java" pageEncoding="UTF-8"%>
	<style>
        select {
			width:80px;
	    }
		input[type="text"]
		{
			width:150px;
		}
	</style>
</head>

		<script type="text/javascript" charset="utf-8">	

function doSelectVehicle()
{
	InfoWindow.selectVehicle();
}
/**
 * 当选择车辆的窗口选择后，触发回调
 */
function onVehicleSelected(vehicleId,plateNo)
{
	$("#vehicleId").val(vehicleId);
	$("#plateNo").val(plateNo);
}
			
function queryVehicle()
{
	//var depId = $("#depId").val();
	var fieldName = $("#queryFieldName").val();
	var fieldValue = $("#queryFieldValue").val();
	if(fieldValue.length == 0)
	{
		alert("请输入模糊查询条件!");
		return;
	}
	var params = {queryID:"selectVehicleList"};
	params[fieldName] = fieldValue;

     $("#vehicleId").lookup(params);

}

			$(document).ready(function() {
				
					var now = Utility.today();
				  $("#endTime").val(now + " 23:59:00");
				  $("#startTime").val(now + " 00:00:00");
					
				$("#depId").lookup({queryID:"selectDepList"});
				$("#depId").change(function()
				{
			             var depId = $("#depId").val();
                        if(depId.length == 0 )
						{
							return;
						}
						var params = {queryID:"selectVehicleList", depId:depId};
						 $("#vehicleId").lookup(params);
				});
				$("#btnQuery").click(function(){
					var vehicleId = $("#vehicleId").val();
					if(vehicleId == null || vehicleId.length == 0)
					{
						$.messager.alert("提示","请输入车牌号!");
						return;
					}

				        Utility.loadGridWithParams();
				});

                $("#vehicleId").change(function()
				{
				       var txt = $("#vehicleId").find("option:selected").text(); 
					   $("#plateNo").val(txt);
				});
			} );
		</script>
<body>	
			<div id="toolbar">
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/historyGpsList.action">
			   <input type="hidden" name="queryId" value="selectHisotryGpsInfos" />		    
			   <input type="hidden" name="vehicleId" id="vehicleId" value="" />		    
			   <input type="hidden" name="fileName" value="历史轨迹数据" />	                
			  <table width="100%"  class="TableBlock">
			   			   <tr>
						    <td> 车牌号码 </td>
					<td width="150">	
					<input type="text" name="plateNo" id="plateNo"  value="请选择.." style="width:90px" readonly/>
					
	       <a id="btnSelectVehicle" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="doSelectVehicle();"></a>
				
					</td>
						
						<td align="right">开始时间
							:</td>
						<td>
      <input type="text" name="startTime" id="startTime"  class="datetimepicker" />
						至
      <input type="text" name="endTime"  id="endTime" class="datetimepicker" />
						</td>
				
        <td  align="left">
	       <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
		   <span style="color:red;">由于历史数据量大，限制查询最多两天的数据</span>
        </td>
    </tr>
		
		</table>
		</form>	 
		</div>
				<table id="queryGrid" class="easyui-datagrid" title="" style="width:1200px" 
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/report/historyGpsList.action',method:'post'">
						<thead>
							<tr>
								<th data-options="field:'plateNo'" width="6%">车牌号</th>
								<!-- <th data-options="field:'plateColor'" width="4%">颜色</th> -->
								<th data-options="field:'depName'" width="10%">车组</th>
								<th data-options="field:'sendTime'" width="12%">GPS时间</th>
								<th data-options="field:'longitude'" width="6%">经度</th>
								<th data-options="field:'latitude'" width="6%">纬度</th>
								<th data-options="field:'velocity'" width="3%">速度</th>
								<th data-options="field:'recordVelocity'" width="3%">记录仪<br/>速度</th>
								<th data-options="field:'mileage'" width="4%">里程</th>
								<th data-options="field:'gas'" width="3%">油量</th>
								<th data-options="field:'location'" width="15%">位置</th>
								<th data-options="field:'directionDescr'" width="5%">方向</th>
								<th data-options="field:'altitude'" width="3%">海拔</th>
								<th data-options="field:'status'" width="11%">状态</th>
								<th data-options="field:'alarmStateDescr'" width="12%">报警</th>
								<th data-options="field:'valid'" width="4%">有效性</th>
						</tr>
					</thead>				
				</table>

</body>

