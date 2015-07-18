<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
</head>

		<script type="text/javascript" charset="utf-8">
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
				           var html =  "<a href=\"javascript:InfoWindow.viewInfoMenu('" + entityId+ "');\">" +" 编辑</a>";
						   return html;
						 }};

			}

			

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "code" },
						{ "mData": "name" },
						{ "mData": "remark" },
					     getEditActionColumn("baseId"),
						 getDeleteActionColumn("baseId", "<%=ApplicationPath%>/system/deleteBasicData.action"),
					];
				 
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/system/infoMenuList.action");
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/system/infoMenuList.action">
			   <input type="hidden" name="queryId" value="selectBasicData" />		
			   <input type="hidden" name="parent" value="InfoMenu" />		
			  <table width="100%"  class="TableBlock">
        <td colspan="6" align="left">
	       <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="button" value="添加信息点播类型" title="" onclick="InfoWindow.viewInfoMenu(0);"/>
        </td>
    </tr>
		</form>	 
		

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<th>信息类型ID</th>
							<th>类型名称</th>
							<th>备注</th>
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

