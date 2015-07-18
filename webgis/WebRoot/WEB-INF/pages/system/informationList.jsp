<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
		//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(alue, rowData, rowIndex)
			{  
				var entityId = rowData.baseId;
				var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('deleteBasicData.action','" +entityId+"');\"/>";
				return html;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.baseId;
				var html =  "<a href=\"javascript:InfoWindow.viewInformation('" + entityId+ "');\">" +" 编辑</a>";
				return html;
			}

			$(document).ready(function() {
				 
 			$("#code").lookup({category:"InfoMenu", selectedValue:"${entity.code}"});
				 $("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				Utility.loadGridWithParams();
			} );
		</script>
<body>
		<div id="toolbar" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/system/informationList.action">
			   <input type="hidden" name="queryId" value="selectInformation" />		
			   <input type="hidden" name="parent" value="Information" />		
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				   <td> 信息类型 </td>
					<td>		<select  id="code" value=""
						name="code"  > 
						</select>   
		 <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnNew" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="InfoWindow.viewInformation(0);" >新增</a>&nbsp;
        </td>
    </tr>
	</table>
		</form>	 
		</div>

			<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/vehicle/vehicleList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'infoMenuType'" >信息类型</th>
							<th data-options="field:'name'" >信息</th>
							<th data-options="field:'createDate'" >创建时间</th>
							<th data-options="field:'1',formatter:getEditActionColumn" >编辑</th>
							<th data-options="field:'2',formatter:getDeleteActionColumn" >删除</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
</body>

