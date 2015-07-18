<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.validate.js"></script><!--表单数据验证-->
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.metadata.js"  charset="UTF-8"></script><!--表单数据验证-->
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

			function getCheckboxColumn(key)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  '<input class="cb" type=checkbox name=enclosureId value="' + entityId + '" />';
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
				           var html =  "<a href=\"javascript:InfoWindow.viewEnclosure('" + entityId+ "');\">" +" 编辑</a>";
						   return html;
						 }};

			}

	

			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
				getCheckboxColumn("enclosureId"), 
						{ "mData": "name" },
						{ "mData": "enclosureType" },
						{ "mData": "alarmType" },
						{ "mData": "startDate" },
						{ "mData": "endDate" },
						{ "mData": "maxSpeed" },
						{ "mData": "createDate" },
					     getEditActionColumn("enclosureId"),
						 getDeleteActionColumn("enclosureId", "<%=ApplicationPath%>/vehicle/deleteEnclosure.action"),
					];
				 
					  $("#configType").lookup({category:"AreaConfigCommand"}); //区域设置类型下拉框
					  $("#enclosureType").lookup({category:"EnclosureType"}); //围栏类型下拉框
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      var dataTable = Utility.initTable(columns, "<%=ApplicationPath%>/vehicle/enclosureList.action");
				  Utility.ajaxSubmitForm("entityForm"); //将围栏下发的表单转化ajax提交 
				  	$("#selectAll").toggle(function () { 
			                     $("input:checkbox[name='enclosureId']").attr("checked", true); 
					   }
					 , function () { 
						  $("input:checkbox[name='enclosureId']").attr("checked", false); 
					 }
		 );
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/enclosureList.action">
			   <input type="hidden" name="queryId" value="selectEnclosures" />		  
			   <input type="hidden" name="excludeRoute" value="route" />		  <!--只查询围栏，不查询线路-->
			   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				   <td> 围栏名称 </td>
					<td>			    <input type="text" name="name" size="10"  id="name">   </td>
				<td>围栏类型</td>
			   <td>
			   <select id="enclosureType" name="enclosureType" > </select>
			   </td>
			   <td> <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
		   </td>
            </tr>
			</table>
			
		   	</form>
	<form id="entityForm" action="<%=ApplicationPath%>/data/sendEnclosure.action">
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
			<table width="100%"  class="TableBlock">
           		<tr>

        <td colspan="6" align="left">
	      <select id="configType" name="configType"  class="required"> </select>&nbsp;&nbsp;&nbsp;&nbsp;
           <input type="submit" value="配置终端区域" title="配置终端区域" /> <span class="message">${message}</span>
        </td>
    </tr>
		</table>

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<tr>
							    <th width="3%"><input type='checkbox' id='selectAll'></input>
								<th>围栏名称</th>
								<th>围栏类型</th>
								<th>报警类型</th>
								<th>开始时间</th>
								<th>结束时间</th>
								<th>限速</th>
								<th>创建时间</th>
							<th width="3%">编辑</th>
							<th width="3%">删除</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			
		</form>	 
			</div>

</body>

