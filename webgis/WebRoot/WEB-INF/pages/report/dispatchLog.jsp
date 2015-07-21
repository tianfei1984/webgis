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
			} );
		</script>
<body>
		<div id="toolbar">		
			
			<form id="queryForm" action="<%=ApplicationPath%>/system/terminalLog.action">
			   <input type="hidden" name="queryId" value="selectTerminalCommand" />		
			   <!--指定要查询调度信息指令-->
			   <input type="hidden" name="dispatch" value="dispatch" />		   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 车牌号: </td>
			    <td>			    <input type="text" name="plateNo" size="15"  id="name">   </td>
            <td>SIM卡号:</td>
			    <td>			    <input type="text" name="simNo" size="15" >   </td>
             <td>操作时间:</td>
			    <td>			    <input type="text" name="startDate" size="10" class="datepicker">  
				至    <input type="text" name="endDate" size="10" class="datepicker">
				</td>
        <td  align="left">
	      <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
				<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;height:480px"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/system/terminalLog.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'plateNo'"  width="8%">车牌号</th>
							<th data-options="field:'plateColor'"  width="5%">车牌颜色</th>
							<th data-options="field:'simNo'"  width="7%">卡号</th>
							<th data-options="field:'remark'"   width="12%">信息显示类型</th>
							<th data-options="field:'cmdData'"  width="24%">信息内容</th>
							<th data-options="field:'status'"  width="8%">执行结果</th>
							<th data-options="field:'createDate'"  width="13%">下发时间</th>
							<th data-options="field:'updateDate'"  width="13%">执行时间</th>
							<th data-options="field:'owner'"  width="6%">操作人</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

