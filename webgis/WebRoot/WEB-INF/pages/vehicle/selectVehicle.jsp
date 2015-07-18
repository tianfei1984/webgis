<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>
		<script type="text/javascript" charset="utf-8">
				
//删除表格的某一行，删除后，会自动刷新表格			
			function getOnlineColumn(value, rowData, rowIndex)
			{  
				var online = rowData.online;
				var html = online == "在线" ? "<span style='color:green;font-weight:bold;'>在线</span>" : "<span style='color:red'>离线</span>";
			    return html;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.vehicleId;
				var html =  "<a href=\"javascript:InfoWindow.viewVehicle('" + entityId+ "&input=true');\">" +" 查看</a>";
				return html;
			}
			function onGridDblClickRow(rowIndex, rowData)
			{
				var plateNo = rowData.plateNo; 
				var vehicleId = rowData.vehicleId; 
					   //$("#plateNo").val(txt);
					   //parent.HistoryRoutePanel.setHisoryRoutePlateNo(txt);
					   //parent.closeIFrameWindow();
					   if(window.opener.onVehicleSelected)
						   window.opener.onVehicleSelected(vehicleId,plateNo);
					   close();
			}
			$(document).ready(function() {
			     
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				Utility.loadGridWithParams();
				  
				//创建下拉部门树
				Utility.createDepTree("depId");
				$("#status").change(function()
				{
				       var txt = $("#status").find("option:selected").text(); 
					   $("#statusName").val(txt);
				});
			} );
		</script>
<body>
			<div id="toolbar">
			<form id="queryForm" action="<%=ApplicationPath%>/report/onlineVehicleList.action">
			   <input type="hidden" name="queryId" value="selectOnlineVehicles" />	   
			   <input type="hidden" name="fileName" value="车辆上线状态" />	     	
			   <input type="hidden" name="statusName" id="statusName" value="所有" />	    
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 车牌号码: </td>
			    <td>			    <input type="text" name="plateNo" size="10"  id="plateNo" style="width:80px">   </td>
          <td> 终端卡号 </td>
			    <td>			    <input type="text" name="simNo" size="20" style="width:100px">   </td>
            <td>车辆组:</td>
			    <td>			
				<select id="depId" name="depId" style="width:180px;"></select>
				</td>
            </tr>
 <tr>
			  
           
            <td>上线状态</td>
			    <td>			  
				   <select name="status" id="status">
				       <option value="">所有</option>
				       <option value="online">上线</option>
				       <option value="offline">离线</option>
				   </select>
				   
				</td>
        <td colspan="4" align="left">
		 <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <font color="red">(双击选择车辆)</font>
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
			<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,onDblClickRow:onGridDblClickRow,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/report/onlineVehicleList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'plateNo'"  width="10%">车牌号</th>
							<th data-options="field:'simNo'"  width="12%">终端卡号</th>
							<th data-options="field:'depName1'"  width="14%">车组</th>
							<th data-options="field:'online',formatter:getOnlineColumn"  width="6%">上线</th>
							<th data-options="field:'sendTime'"  width="18%">上线时间</th>
							<th data-options="field:'offlineTimeSpan'"  width="18%">离线时长</th>
							<th data-options="field:'runStatus'"  width="10%">运行状态</th>
							<th data-options="field:'vehicleTypeName'"  width="10%">车辆类型</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

