<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
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
							var html =  "<img style='cursor: pointer;' src='<%=imgPath%>/cross.gif' onclick=\"Utility.deleteEntity('deletePlatformInfo.action','" +entityId+"');\"/>";
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
				           var html =  "<a href=\"javascript:InfoWindow.editPlatformInfo('" + entityId+ "');\">" +" 编辑</a>";
						   return html;
						 }};

			}

			

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "descr" },
						{ "mData": "funcType" },
						{ "mData": "parentName" },
						{ "mData": "url" },
						{ "mData": "icon" },
						{ "mData": "menuSort" },
						{ "mData": "createDate" }
					     getEditActionColumn("funcId"),
						 getDeleteActionColumn("funcId", "deleteDriver.action")
					];
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/system/funcInfoList.action");
				
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/system/funcInfoList.action">
			   <input type="hidden" name="queryId" value="selectFuncInfos" />		    
			   <input type="hidden" name="fileName" value="权限信息" />	      
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 名称: </td>
			    <td>			    <input type="text" name="name" size="10"  id="name">   </td>
          
        <td  align="left">
	       <input type="button" value="查询"  title="查询" id="btnQuery" class="button gray medium"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置" class="button gray medium"/>&nbsp;&nbsp;
           <input type="button" value="新增" title="新增" onclick="InfoWindow.editPlatformInfo(0);" class="button gray medium"/>  
		   <button  value="l" title="导出"  class="button gray medium" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        </td>
    </tr>
		</form>	 
		</table>

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<th>名称</th>
							<th>菜单类型</th>
							<th>上级菜单</th>
							<th>URL地址</th>
							<th>css图标</th>
							<th>排序值</th>
							<th>创建日期</th>
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

