<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>
		<script type="text/javascript" charset="utf-8">
				
			function onGridDblClickRow(rowIndex, rowData)
			{
				var depName = rowData.name; 
				var depId = rowData.depId; 
					   //$("#plateNo").val(txt);
					   //parent.HistoryRoutePanel.setHisoryRoutePlateNo(txt);
					   //parent.closeIFrameWindow();
					   if(window.opener.onDepSelected)
						   window.opener.onDepSelected(depId,depName);
					   close();
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
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/depList.action">
			   <input type="hidden" name="queryId" value="selectDeps" />	   
			   <input type="hidden" name="fileName" value="车辆上线状态" />	     	
			   <input type="hidden" name="statusName" id="statusName" value="所有" />	    
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 部门名称: </td>
			    <td><input type="text" name="name" size="15"  id="name">   </td>
         
        <td  align="left">
		 <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <font color="red">(双击选择部门)</font>
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
			<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,onDblClickRow:onGridDblClickRow,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/vehicle/depList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'name'" width="37%">车组名称</th>
							<th data-options="field:'parentDepName'" width="37%">上级车辆组</th>
							<th data-options="field:'assoMan'" width="11%">联系人</th>
							<th data-options="field:'assoTel'" width="14%">联系电话</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

