<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">			

			$(document).ready(function() {
                  $("#platformId").lookup({queryID:"selectPlatformInfoList"});
                  $("#status").lookup({category:"PlatformCheckStatus"});
				 
					$("#btnQuery").click(function(){
							Utility.loadGridWithParams();
					});
			} );
		</script>
<body>
		<div id="toolbar">	
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/checkInfoList.action">
			   <input type="hidden" name="queryId" value="selectCheckInfos" />		    
			   <input type="hidden" name="fileName" value="平台信息" />	      
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 名称: </td>
			    <td>			    <input type="text" name="name" size="10"  id="name">   </td>
				<td align="right">所属平台:</td>
						<td align="left"><select id="platformId"  style="width: 150px;" name="platformId" >
						   </select>
						</td><td align="right">记录状态:</td>
						<td align="left"><select id="status"  style="width: 150px;" name="status" >
						   </select>
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
				<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/report/checkInfoList.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'infoId'"  width="13%">查岗信息Id</th>
							<th data-options="field:'name'"  width="13%">查岗平台</th>
							<th data-options="field:'message'"  width="15%">查岗问题</th>
							<th data-options="field:'answer'"  width="13%">平台应答</th>
							<th data-options="field:'createDate'"  width="13%">查岗时间</th>
							<th data-options="field:'updateDate'" width="13%" >应答时间</th>
							<th data-options="field:'status'"  width="13%">状态</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

