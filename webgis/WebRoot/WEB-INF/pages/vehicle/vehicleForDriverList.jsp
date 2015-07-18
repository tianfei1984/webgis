<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.validate.js"></script><!--表单数据验证-->
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.metadata.js"  charset="UTF-8"></script><!--表单数据验证-->
		<!--下拉树的配置,三个文件不能缺少-->	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

</head>

		<script type="text/javascript" charset="utf-8">		

			function getCheckboxColumn(key)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  '<input class="cb" type=checkbox name=vehicleId value="' + entityId + '" />';
							//alert(html);
						   return html;
				          }
				  };
			}

			function bindVehicle()
			{
				var url = "<%=ApplicationPath%>/data/enclosureBinding!bind.action";
				var queryUrl = $("#queryForm").attr("action");
				//Excel下载地址
				$("#queryForm").attr("action",url); 
				$("#queryForm").attr("method","POST"); 
				//$("#queryForm").attr("target","_blank"); //弹屏下载
				$("#queryForm").ajaxSubmit(function(result)
						{
							if(result.success == true)
							{						
								$("#queryForm").attr("action",queryUrl); //恢复到原来的查询地址
								$("#queryForm").attr("target",""); 
								  $("#btnQuery").click();//重新查询
							}else								
								alert(result.message);
						}
				);
				//document.getElementById("queryForm").submit();
				$("#queryForm").attr("action",queryUrl); //恢复到原来的查询地址
				$("#queryForm").attr("target",""); 
			}
			
			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			      var columns = [
				getCheckboxColumn("vehicleId"), 
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "simNo" },
						{ "mData": "vendor" },
						{ "mData": "factoryNo" },
						{ "mData": "runStatus" },
						{ "mData": "depName1" }
					];
				 
				 $("#enclosures").lookup({queryID:"selectEnclosureList", selectedValue:"${enclosureId}"});
				 $("#enclosures").change(function()
				{
					 $("#enclosureId").val($("#enclosures").val());
				});
				 //创建下拉树菜单, 参数是: 输入选择框ID，菜单的divID, 和ajax 数据URL
				 createTree($("#depName"), $("#treeMenu"), "<%=ApplicationPath%>/data/depMenu.action", function(node)
					{
						 $("#depId").val(node.id); //将点击选择的部门ID赋值给隐含参数，提交后台
					});
				  //此方法有命名约定，表单ID是queryForm, 
				  //表格ID是dataTable,
                  //查询按钮的ID是btnQuery
				  // 严格区分大小写,
			      Utility.initTable(columns, "<%=ApplicationPath%>/data/getUnbindVehicle.action");
				  //Utility.ajaxSubmitForm("entityForm"); //将围栏下发的表单转化ajax提交 
				  	$("#selectAll").toggle(function () { 
			                     $("input:checkbox[name='vehicleId']").attr("checked", true); 
					   }
					 , function () { 
						  $("input:checkbox[name='vehicleId']").attr("checked", false); 
					 }
		 );
			} );
		</script>
<body>
		<div id="container" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/data/getUnbindVehicle.action" method="POST">
			   <input type="hidden" name="queryId" value="selectVehicles" />		
			   <input type="hidden" name="enclosureId" id="enclosureId"  value="${enclosureId}" />		      
			   <input type="hidden" name="fileName" value="车辆列表" />	   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 车牌号码: </td>
			    <td>			    <input type="text" name="plateNo" size="10"  id="plateNo">   </td>
         	   <td> 终端卡号 </td>
			    <td>			    <input type="text" name="simNo" size="10" >   </td>
            <td>车辆组:</td>
			    <td>			
				<input type="text" id="depName" name="depName" > 
							<input type="hidden" id="depId" name="depId" value="" />
<div id="menuContent" class="menuContent" style="display:none; position: absolute;height:100px;">
	<ul id="treeMenu" class="ztree" style="margin-top:0; width:170px;height:200px;"></ul>
</div>
				</td>
    </tr>
           		<tr>
 <td> 区域: </td>
        <td colspan="5" align="left">
	      <select id="enclosures" name="enclosures"  class="required"> </select>&nbsp;&nbsp;&nbsp;&nbsp;
           <input type="button" value="绑定车辆" title="绑定车辆"  onclick="bindVehicle();"/>
	       <input type="button" value="查询未绑定车辆"  title="" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
        </td>
    </tr>
		</table>

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
				   <col width="5%">
				   <col width="15%">
				   <col width="9%">
				   <col width="15%">
				   <col width="18%">
				   <col width="18%">
				   <col width="6%">
					<thead>
						<tr>
							<tr>
							    <th width="3%"><input type='checkbox' id='selectAll'></input>
								<th width="15%">车牌号</th>
							<th width="7%">颜色</th>
							<th width="15%">终端卡号</th>
							<th width="15%">厂商</th>
							<th width="15%">出厂号</th>
							<th width="15%">状态</th>
							<th width="17%">车组</th>
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

