<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
			//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(alue, rowData, rowIndex)
			{  
				var entityId = rowData.termId;
				var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('deleteTerminal.action','" +entityId+"');\"/>";
				return html;
			}
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.termId;
				var html =  "<a href=\"javascript:InfoWindow.viewTerminal('" + entityId+ "');\">" +" 编辑</a>";
				return html;

			}

			

			$(document).ready(function() {
				  
                  $("#state").lookup({category:"TerminalState", selectedValue:""}); //终端状态
				     $("#state").change(function()
				{
				       var txt = $("#state").find("option:selected").text(); 
					   $("#stateName").val(txt);
				});
				$("#bind").change(function()
				{
				       var txt = $("#bind").find("option:selected").text(); 
					   $("#bindName").val(txt);
				});
				
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				        Utility.loadGridWithParams();
			} );
		</script>
<body>	
			<div id="toolbar">
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/terminalList.action">
			   <input type="hidden" name="queryId" value="selectTerminals" />		    
			   <input type="hidden" name="fileName" value="终端信息" />	 
			   <input type="hidden" id="stateName"  name="stateName" value="" />	
			   <input type="hidden" id="bindName"  name="bindName" value="" />	  
			  <table width="100%"  class="TableBlock">
			   			 <tr>
				<td>终端号:</td>
				<td align="left"><input type="text" name="termNo" value="" id="termNo" >
				</td>
				
				<td>出厂号:</td>
				<td align="left"><input type="text" name="devNo" value="" id="devNo">
				</td>
				
				<td>Sim卡号码:</td>
				<td align="left"><input type="text" name="simNo" value="" id="simNo">
				</td>				
				
			</tr>
			<tr>
				<td>是否绑定
				</td>
				<td><select name="bind" id="bind" style="width: 150px;">
    <option value="" selected="selected">请先择</option>
    <option value="0">未绑定</option>
    <option value="1">已绑定</option>

</select>

				</td>
				<td>设备当前状态
				</td>
				<td ><select name="state" id="state" style="width: 150px;">

</select>

				</td>
				
				
        <td  align="left" colspan=2>
		
	        <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnNew" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="InfoWindow.viewTerminal(0);" >新增</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->

        </td>
    </tr>
   </table>
		</form>	 
		</div>

					<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;height:480px"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/vehicle/terminalList.action',method:'post'">
					<thead>
							<tr>
								<th data-options="field:'termNo'"  width="15%">终端号</th>
								<th data-options="field:'devNo'"  width="15%">出厂号</th>
								<th data-options="field:'termType'"  width="15%">终端类型</th>
								<th data-options="field:'simNo'"  width="15%">手机号码</th>
								<th data-options="field:'plateNo'"  width="15%">绑定车辆</th>
								<th data-options="field:'state'"  width="15%">设备当前状态</th>
							<th data-options="field:'1',formatter:getEditActionColumn" width="5%">编辑</th>
							<th data-options="field:'2',formatter:getDeleteActionColumn" width="5%">删除</th>
						</tr>
					</thead>				
				</table>
</body>

