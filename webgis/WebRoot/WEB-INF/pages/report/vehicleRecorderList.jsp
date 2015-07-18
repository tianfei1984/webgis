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
					<input type="text" id="depName" name="depName" > 
							<input type="hidden" id="depId" name="depId" value="" />
							<!--车组下拉框-->
						<div id="menuContent" class="menuContent" style="display:none; position: absolute;height:100px;">
							<ul id="treeMenu" class="ztree" style="margin-top:0; width:170px;height:200px;"></ul>
						</div>
               </td>
				<td>命令类型</td>
			   <td> <select id="cmdWord" name="cmdWord" width="10"></select></td>
			   
            </tr>
				<tr>
						
						<td align="right">上传时间
							:</td>
						<td colspan=5>
      <input type="text" name="startTime"  class="datetimepicker" />至
      <input type="text" name="endTime"  class="datetimepicker" />
       
	       <input type="button" value="查询"  title="查询" id="btnQuery" class="button gray medium"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置" class="button gray medium"/>&nbsp;&nbsp;
		    <button class="button gray medium"  value="l" title="导出" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        </td>
    </tr>
		</form>	 
		

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<th width="4%">车牌号</th>
							<th width="4%">车牌颜色</th>
							<th width="7%">车组</th>
							<th width="5%">Sim卡号</th>
							<th width="19%">命令类型</th>
							<th width="19%">内容</th>
							<th width="11%">上传时间</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			</div>

</body>

