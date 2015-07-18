<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
		
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var vehicleId = value;
				           var html =  "<a href=\"javascript:InfoWindow.viewVehicle('" + vehicleId+ "&input=true');\">" +" 查看</a>";
						   return html;

			}
			//删除表格的某一行，删除后，会自动刷新表格			
			function getOnlineColumn(value, rowData, rowIndex)
			{  
				var online = value;
				var html = online == true ? "在线" : "离线";
				return html;
			}

			function onBeforeLoadGrid(param)
			{
				if(param.queryId)
				{
					return true;
				}else
					return false;
			}

			

			$(document).ready(function() {
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});

				
				Utility.loadGridWithParams();
			} );
		</script>
<body>
		<div id="toolbar" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/vehicleInArea.action">
			   <input type="hidden" name="queryId" value="selectGpsRealData" />		   
			   <input type="hidden" name="minLongitude" value="${minLongitude}" />	
			   <input type="hidden" name="maxLongitude" value="${maxLongitude}" />		
			   <input type="hidden" name="minLatitude" value="${minLatitude}" />		
			   <input type="hidden" name="maxLatitude" value="${maxLatitude}" />	
			   <input type="hidden" name="areaBounds" value="true" />			
			   
			  <table width="100%"  class="TableBlock">
			   			
           		<tr>
        <td colspan="6" align="left">
	       <input type="button" value="刷新"  title="查询" id="btnQuery"/>
        </td>
    </tr>
		</form>	 
		</table>
		</div>
<table id="queryGrid" class="easyui-datagrid" 
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',onBeforeLoad:onBeforeLoadGrid,
						url:'<%=ApplicationPath%>/vehicle/vehicleInArea.action',method:'post'">
					<thead>
						<tr>	
							<th data-options="field:'plateNo'" width="10%">车牌号</th>
							<th data-options="field:'depName'" width="15%">车组</th>
							<th data-options="field:'simNo'" width="15%">终端卡号</th>
							<th data-options="field:'location'" width="17%">位置</th>
							<!--<th data-options="field:'descr'" width="15%">状态</th>-->
							<th data-options="field:'sendTime'" width="18%">GPS时间</th>
							<th data-options="field:'velocity'" width="6%">速度</th>
							<th data-options="field:'online',formatter:getOnlineColumn" width="5%">上线</th>
							<th data-options="field:'vehicleId',formatter:getEditActionColumn" width="5%">查看</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			

</body>

