
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/common.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
  
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
</head>

		<script type="text/javascript" charset="utf-8">

		var queryParam = {};

		var queryItems = {};

		//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(value, rowData, rowIndex)
			{  	              
				var rowNo = value;
				var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"removeRow('" +rowNo+"');\"/>";
				return html;
			}

		  //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "areaName" },
						{ "mData": "startDate" },
						{ "mData": "endDate" },
					     getDeleteActionColumn("rowId")
					];
        var queryResultColumn = [
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "depName" },
						{ "mData": "location" },
						{ "mData": "startTime" }
					];


//查询命令执行结果
var first = true;
function queryResult()
{	
	//alert(times);
       var url = "<%=ApplicationPath%>/report/queryVehicleInArea.action";
	  //var commandId = 0;
	 //var params = {enclosures:["1","2"]};
	 var enclosureIds = [];
	 var startDates = [];
	 var endDates = [];
	 for(var key in queryItems)
	{
		 var item = queryItems[key];
		 if(item.enclosureId)
		{
		 enclosureIds.push(item.enclosureId);
		 startDates.push(item.startDate); 
		 endDates.push(item.endDate);
		}
	}
	if(enclosureIds.length==0)
	{
		alert("添加区域和时间段的查询条件!");
		return;
	}
	var params = {enclosureIds:enclosureIds, startDates:startDates, endDates:endDates};
	//alert($.param( params, true ));
	   $.post(url, $.param( params, true ), 
			function(result){		
		          //alert(result);
				  if(result.success == true)
				 {
				    
				      $("#dataGrid").datagrid("loadData",result.data);
					
				}else {
					
				}
		  }
	  );
}


var datatable;
//添加新表
var rowId = 0;
function addrow() {
	if($("#entityForm").valid() == false)
		return; //验证失败

	var enclosureId =  $('#enclosure').val();
	var areaName = $('#enclosure').find("option:selected").text();
	//queryParam[enclosureId] = $('#enclosure').val() + ","+ $('#startDate').val()+","+$('#endDate').val();
	var item = {areaName: areaName,
        startDate:$('#startDate').val(),
       endDate: $('#endDate').val() , rowId:rowId, enclosureId:enclosureId};
	if(isExistInTable(item))
	{
		alert("该区域及时间段已经添加到查询列表中!");
		return;
	}
    $("#queryGrid").datagrid("appendRow",item);

	queryItems[rowId] = item;
	rowId++;
   
}


function removeRow(rowId)
{
	var row = $("#queryGrid").datagrid('getSelected');
    if (row) {
         var rowIndex = $("#queryGrid").datagrid('getRowIndex', row);
         $("#queryGrid").datagrid('deleteRow', rowIndex);
    }
	delete queryItems[rowId]; //删除这一行的数据
}

function isExistInTable(newItem)
{

	for(var key in queryItems)
	{
		 var item = queryItems[key];
		 if(item.enclosureId == newItem.enclosureId && item.startDate==newItem.startDate 
			 &&  item.endDate==newItem.endDate)
		{
			 return true;
		}
	}
	return false;

}

			$(document).ready(function() {
				 $("#entityForm").validate(); //初始化验证信息
				
				 $("#enclosure").lookup({queryID:"selectEnclosureList"});
				
			} );
		</script>
<body>
		<div id="container" >		
			
		<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/report/queryVehicleInArea.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody>
					<tr>
						<td align="right">区域列表
							:</td>
						<td><select id="enclosure"  style="width: 150px;" name="enclosure" class="required">
						   </select>
						  </td>

						<td align="right">时间段:</td>
						<td >
							  <input type="text" name="startDate" id="startDate"  value='<s:date name="entity.installDate" format="yyyy-MM-dd"/>' class="required datetimepicker"  ></input>
						至
							  <input type="text" name="endDate" id="endDate" value='<s:date name="entity.installDate" format="yyyy-MM-dd"/>' class="required datetimepicker" ></input>
						</td>
					

						<td  align="left" colspan=2>
						<input type="button" value="添加区域查询条件" onclick="addrow();">
						<input type="button" value="查询" onclick="queryResult();">
						</td>
						
					</tr>
				</tbody></table>
				</form>
				<table id="queryGrid" class="easyui-datagrid" 
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						fit:true,toolbar:'#toolbar',
						url:'',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'areaName'" width="18%">区域</th>
							<th data-options="field:'startDate'" width="15%">开始时间</th>
							<th data-options="field:'endDate'" width="15%">结束时间</th>
							<th data-options="field:'rowId',formatter:getDeleteActionColumn" width="5%">删除查询条件</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
<br/>
				<div style="font-size:17px;font-weight:bold;color:blue;">经过指定区域的车辆列表</div>
				<table id="dataGrid" class="easyui-datagrid" 
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						fit:true,toolbar:'#toolbar',
						url:'',method:'get'">
					<thead>
						<tr>
							<th data-options="field:'plateNo'" width="7%">车牌号</th>
							<th data-options="field:'plateColor'" width="7%">车牌颜色</th>
							<th data-options="field:'depName'" width="15%">车组</th>
							<th data-options="field:'location'" width="15%">区域名称</th>
							<th data-options="field:'startTime'" width="15%">经过时间</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>


</body>

