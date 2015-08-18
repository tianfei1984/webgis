<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>

</head>

<script type="text/javascript" charset="utf-8">			
			

			$(document).ready(function() {
			     $("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				Utility.loadGridWithParams();
				  
			} );
		</script>
<body>
	<div id="toolbar">

		<form id="queryForm"
			action="<%=ApplicationPath%>/system/terminalLog.action">
			<input type="hidden" name="queryId" value="selectTerminalCommand" />
			<table width="100%" class="TableBlock">
				<tr>
					<td>车牌号:</td>
					<td><input type="text" name="plateNo" size="10" id="name">
					</td>
					<td>卡号:</td>
					<td><input type="text" name="simNo" size="10"></td>
					<td>操作时间:</td>
					<td><input type="text" name="startDate" size="10"
						class="datepicker"> 至 <input type="text" name="endDate"
						size="10" class="datepicker"></td>
					<td align="left"><a id="btnQuery" href="#"
						class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>&nbsp;
						<a id="btnReset" href="#" class="easyui-linkbutton"
						data-options="iconCls:'icon-clear'">重置</a>&nbsp;
						<a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
						</td>
				</tr>
				</form>
			</table>
	</div>

	<table id="queryGrid" class="easyui-datagrid" title=""
		style="width:100%;"
		data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/system/terminalLog.action',method:'post'">
		<thead>
			<tr>
				<th data-options="field:'plateNo'" width="10%">车牌号</th>
				<th data-options="field:'plateColor'" width="6%">车牌颜色</th>
				<th data-options="field:'simNo'" width="10%">卡号</th>
				<th data-options="field:'cmdType'">命令类型</th>
				<th data-options="field:'cmdData'" width="17%">命令内容</th>
				<th data-options="field:'SN'">流水号</th>
				<th data-options="field:'status'">执行结果</th>
				<th data-options="field:'createDate'">下发时间</th>
				<th data-options="field:'updateDate'">执行时间</th>
			</tr>
		</thead>

	</table>

</body>

