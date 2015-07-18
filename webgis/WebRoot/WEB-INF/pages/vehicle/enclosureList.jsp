<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
           ServerConfig.ApplicationPath = "<%=ApplicationPath%>";
			//删除表格的某一行，删除后，会自动刷新表格			
			function getDeleteActionColumn(key, url)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  "<img src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('" + url + "','" +entityId+"');\"/>";
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
				           var html =  "<a href=\"javascript:InfoWindow.viewTerminal('" + entityId+ "');\">" +" 编辑</a>";
						   return html;
						 }};

			}

		$("#selectAll").toggle(function () { 
			   $("checkboxSelector", dataTable.fnGetNodes()).attr("checked", true); }
			 , function () { 
				 $("checkboxSelector", dataTable.fnGetNodes()).attr("checked", false); 
			 }
		 );

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
				{   "sTitle": "<input type='checkbox' id='selectAll'></input>"},
						{ "mData": "name" },
						{ "mData": "loginName" },
						{ "mData": "userState" },
						{ "mData": "roleName" },
						{ "mData": "creator" },
						{ "mData": "createDate" },
						{ "mData": "depName" },
						{ "mData": "vehicleType" },
						{ "mData": "industry" },
						{ "mData": "city" },
						{ "mData": "installData" },
					     getEditActionColumn("depId"),
						 getDeleteActionColumn("depId", "<%=ApplicationPath%>/vehicle/deleteTerminal.action"),
					];
				 
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/vehicle/terminalList.action");
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/sendEnclosure.action">
			   <input type="hidden" name="queryId" value="selectEnclosures" />		   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				   <td> 车组名称 </td>
					<td>			    <input type="text" name="testSelect" size="10"  id="testSelect">   </td>
				<td>所属业户</td>
			   <td>
			   <select id="encloureOperation" name="encloureOperation" > </select>
			   </td>
            </tr>
           		<tr>
        <td colspan="6" align="left">
	       <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
           <input type="button" value="配置终端区域" title="配置终端区域" onclick="InfoWindow.viewTerminal(0);"/>
        </td>
    </tr>
		</form>	 
		

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<tr>
							    <th><input type="checkbox" ></input>
								<th>围栏名称</th>
								<th>围栏类型</th>
								<th>报警类型</th>
								<th>开始时间</th>
								<th>结束时间</th>
								<th>限速</th>
								<th>状态</th>
								<th>选择</th>
								</tr>
							<th width="5%">编辑</th>
							<th width="5%">删除</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			</div>

</body>

