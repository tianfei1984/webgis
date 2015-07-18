<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
			//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(lue, rowData, rowIndex)
			{  
				var entityId = rowData.baseId;
				var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('deleteBasicData.action','" +entityId+"');\"/>";
				return html;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.baseId;
				var html =  "<a href=\"javascript:InfoWindow.viewBasicData('" + entityId+ "');\">" +" 编辑</a>";
				return html;

			}

			function newBasicData()
			{
				var parentCode = $("#parent").val();
				InfoWindow.newBasicData(parentCode);
			}

			

			$(document).ready(function() {
			      $("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				        Utility.loadGridWithParams();
                 $("#parent").lookup({category:"Root"});
				  $("#parent").change(function()
				{
					   $("#btnQuery").click();
				});
			} );
		</script>
<body>
		<div id="toolbar" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/system/basicDataList.action">
			   <input type="hidden" name="queryId" value="selectBasicData" />	
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				   <td> 基础数据类型：	<select  id="parent" value=""
						name="parent"  > <option  value="Root1" selected></option></select>
			 <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnNew" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="newBasicData();" >新增</a>&nbsp;
        </td>
    </tr>
	</table>
		</form>	 
		</div>

			<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: false,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/system/basicDataList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'name'" width="180">名称</th>
							<th data-options="field:'code'" width="100">编码</th>
							<th data-options="field:'parentName'" width="120">类型</th>
							<th data-options="field:'createDate'" width="140"> 创建时间</th>
							<th data-options="field:'1',formatter:getEditActionColumn" width="5%">编辑</th>
							<th data-options="field:'2',formatter:getDeleteActionColumn" width="5%">删除</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

