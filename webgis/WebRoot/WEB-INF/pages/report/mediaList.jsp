
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
  <%@ page language="java" pageEncoding="UTF-8"%>

	<style>
        select {
			width:80px;
	    }
		input 
		{
			width:150px;
		}
		.vpic
		{
			height:150px;
		}
	</style>
</head>

		<script type="text/javascript" charset="utf-8">
				 var picturePath = "<%=ApplicationPath%>/vehiclePicture/";
			//格式化输出图片列			
			function getPicColumn(value, rowData, rowIndex)
			{  		
					       var fileName = rowData.fileName;
						   var filePath = picturePath + fileName;
							 var html =  "<a href=# onclick=\"javascript:window.open('" + filePath+ "');\">" +" 下载</a>";
						   return html;
			}	

			

			$(document).ready(function() {
				
				   var now = Utility.today(1);
				  $("#endDate").val(now + " 23:59:00");
				  var now = Utility.today();
				  $("#startDate").val(now + " 00:00:00");

			     //创建下拉部门树
				Utility.createDepTree("depId");
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});

				 $("#mediaType").lookup({category:"MediaType"});
				 
			} );
		</script>
<body>
		<div id="toolbar">		
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/mediaList.action">
			   <input type="hidden" name="queryId" value="selectMediaItems" />		   	   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
						    <td> 车牌号码 </td>
					<td>			   
					<input type="text" id="plateNo" name="plateNo" > 
					</td>
				   <td> 车组名称 </td>
					<td>			   
				<select id="depId" name="depId" style="width:200px;"></select>
               </td>
				<td align="right">多媒体类型
							:</td>
						<td><select id="mediaType"  style="width: 150px;" name="mediaType">
						   </select></td>
            </tr>
				<tr>
						
						<td align="right">开始时间
							:</td>
						<td>
      <input type="text" name="startDate" id="startDate" class="datetimepicker"></input>
						</td>
						<td>结束时间:</td>
						<td align="left">
							  <input type="text" name="endDate" id="endDate" class="datetimepicker"></input>
						</td>
				
        <td colspan="2" align="left">
	       <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
			<table id="queryGrid" class="easyui-datagrid" title="" style="width:100%;"
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/report/mediaList.action',method:'post'">
					<thead>
							<tr>
							
								<th data-options="field:'plateNo1'"   width="10%">车牌号</th>
								<th data-options="field:'plateColor'"   width="8%">车牌颜色</th>
								<th data-options="field:'sendTime'"   width="12%">上传时间</th>
								<th data-options="field:'location'"   width="30%">地点</th>
								<th data-options="field:'speed'"   width="5%">速度(km/h)</th>
								<th data-options="field:'depName'"   width="10%">车组</th>
								<th data-options="field:'mediaType'"   width="5%">类型</th>
								<th data-options="field:'codeFormat'"   width="5%">格式</th>
								<th data-options="field:'fileName',formatter:getPicColumn"   width="10%">文件下载</th>

						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>

</body>

