<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
		//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(alue, rowData, rowIndex)
			{  
				var entityId = rowData.id;
				var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('deleteMember.action','" +entityId+"');\"/>";
				return html;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.id;
				var html =  "<a href=\"javascript:InfoWindow.viewMember('" + entityId+ "');\">" +" 编辑</a>";
				return html;

			}

			

			$(document).ready(function() {
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				Utility.loadGridWithParams();
			} );
		</script>
<body>		
			<div id="toolbar">
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/memberInfoList.action">
			   <input type="hidden" name="queryId" value="selectMembers" />		      
			   <input type="hidden" name="fileName" value="车组信息" />	     
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				<td>业户名称</td>
			   	<td>			    <input type="text" name="name" size="10"  id="name">   </td>
           
        <td colspan="" align="left">
         	<a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnNew" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="InfoWindow.viewMember(0);" >新增</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
        </td>
    </tr>
	</table>
		</form>	 
		</div>

					<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;height:480px"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/vehicle/memberInfoList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'name'"  width="13%">名称</th>
							<th data-options="field:'licenseNo'"  width="13%">营业执照</th>
							<th data-options="field:'orgNo'"  width="13%">组织机构代码</th>
							<th data-options="field:'businessScope'" width="13%" >经营范围</th>
							<th data-options="field:'contact'"  width="13%">联系人</th>
							<th data-options="field:'contactPhone'" width="12%" >联系电话</th>
							<th data-options="field:'address'"  width="13%">办公地址</th>
							<th data-options="field:'1',formatter:getEditActionColumn" width="5%">编辑</th>
							<th data-options="field:'2',formatter:getDeleteActionColumn" width="5%">删除</th>
						</tr>
					</thead>				
				</table>

</body>

