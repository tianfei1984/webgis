<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
<%@ include file="/common/dateUtil.jsp"%>
  
	<!--下拉树的配置,三个文件不能缺少-->	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->
</head>

		<script type="text/javascript" charset="utf-8">
			//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(key, url)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  "<img src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('" 
								+ url + "'," +entityId+");\"/>";
							//alert(html);
						   return html;
				          }
				  };
			}
			//编辑列
			function getEditActionColumn(key)
			{
				return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {
					       var entityId = oObj.aData[key];
				           var html =  "<a href=\"javascript:InfoWindow.viewUser('" + entityId+ "');\">" +" 编辑</a>";
						   return html;
						 }};

			}

			$(document).ready(function() {
				//创建下拉部门树
				Utility.createDepTree("depId");
			      //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "depName" },
						{ "mData": "simNo" },
						{ "mData": "cmd" },
						{ "mData": "cmdData" },
						{ "mData": "createDate" }
					];
				 
				 //记录仪命令字下拉框
				 $("#cmdWord").lookup({category:"CmdWord"});
				    //创建下拉树菜单, 参数是: 输入选择框ID，菜单的divID, 和ajax 数据URL
				 createTree($("#depName"), $("#treeMenu"), "<%=ApplicationPath%>/data/depMenu.action", function(node)
					{
						 $("#depId").val(node.id); //将点击选择的部门ID赋值给隐含参数，提交后台
					});
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/report/queryRecorder.action");
				  
				$("#cmdWord").change(function()
				{
				       var txt = $("#cmdWord").find("option:selected").text(); 
					   $("#cmdWordName").val(txt);
				});
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/queryRecorder.action">
			   <input type="hidden" name="queryId" value="selectVehicleRecorders" />	<!--对应的Ibatis的sql查询Id -->      
			   <input type="hidden" name="fileName" value="行车记录仪信息" />	   
			   <input type="hidden" id="cmdWordName"  name="cmdWordName" value="" />	
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
				<td>命令类型</td>
			   <td> <select id="cmdWord" name="cmdWord" width="10"></select></td>
			   
            </tr>
				<tr>
						
						<td align="right">上传时间
							:</td>
						<td colspan=3>
	      <input type="text" name="startTime"  class="datetimepicker" />至
	      <input type="text" name="endTime"  class="datetimepicker" />
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
						url:'<%=ApplicationPath%>/report/queryRecorder.action',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'plateNo'" width="6%">车牌号</th>
							<th data-options="field:'plateColor'" width="4%">车牌颜色</th>
							<th data-options="field:'depName'" width="7%">车组</th>
							<th data-options="field:'simNo'" width="5%">Sim卡号</th>
							<th data-options="field:'cmd'" width="19%">命令类型</th>
							<th data-options="field:'cmdData'" width="19%">命令</th>
							<th data-options="field:'createDate'" width="11%">上传时间</th>
						</tr>
					</thead>
			</table>
				
				

</body>

