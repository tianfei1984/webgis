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
	       <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
           <input type="button" value="新增" title="新增" onclick="InfoWindow.viewMember(0);"/>
		  
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
							<th data-options="field:'orgNo'"  width="13%">代码证</th>
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

