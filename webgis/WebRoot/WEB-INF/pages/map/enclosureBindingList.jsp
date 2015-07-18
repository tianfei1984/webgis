<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
  
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.validate.js"></script><!--表单数据验证-->
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.metadata.js"  charset="UTF-8"></script><!--表单数据验证-->

</head>

		<script type="text/javascript" charset="utf-8">		

		    //绑定车辆
			function bindEnclosure()
			{
				var url = "<%=ApplicationPath%>/data/bindEnclosure.action";
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
								  alert("绑定成功");
							}else								
								alert(result.message);
						}
				);
				//document.getElementById("queryForm").submit();
				$("#queryForm").attr("action",queryUrl); //恢复到原来的查询地址
				$("#queryForm").attr("target",""); 
			}

			//解除绑定
			function unbindEnclosure()
			{
				var url = "<%=ApplicationPath%>/data/unbindEnclosure.action";
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
								  alert("解除绑定成功");
							}else								
								alert(result.message);
						}
				);
				//document.getElementById("queryForm").submit();
				$("#queryForm").attr("action",queryUrl); //恢复到原来的查询地址
				$("#queryForm").attr("target",""); 
			}

			function getCheckboxColumn(key)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var entityId = oObj.aData[key];
						   //alert(entityId);
							var html =  '<input class="cb" type=checkbox name=vehicleIds value="' + entityId + '" />';
							//alert(html);
						   return html;
				          }
				  };
			}

			function getBindColumn(key, url)
			{  
	              return { "mData": null ,
						"fnRender": function ( oObj, sVal ) {			
					       var bind = oObj.aData[key];
						    var html = bind ? "<span style='color:green;font-weight:bold;'>已绑定</span>" : "<span style='color:red'>未绑定</span>";
						   return html;
				          }
				  };
			}

			function openUnbindVehicleWindow()
			{
				var enclosureId = $("#enclosureId").val();
				InfoWindow.viewUnbindVehicle(enclosureId);
			}
			

			$(document).ready(function() {
			    
				  //创建部门下拉树菜单,
				  Utility.createDepTree("depId");
				 $("#enclosureId").lookup({queryID:"selectEnclosureList", selectedValue:"${enclosureId}"});
				  Utility.ajaxSubmitForm("entityForm"); //将围栏下发的表单转化ajax提交 
				  
					$("#btnQuery").click(function(){
							Utility.loadGridWithParams();
					});

					
					Utility.loadGridWithParams();

				  //全选checkbox
				  $("#selectAll").change(
						function () { 
						         var checked = $(this).attr("checked");
								 if(!checked)
									 checked = false;
			                     $("input:checkbox[name='vehicleIds']").attr("checked", checked); 
					   }
		           );
			} );
		</script>
<body>
		<div id="toolbar" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/data/getBindVehicle.action" method="POST">
			   <input type="hidden" name="queryId" value="selectBindVehicles" />		   
			   <input type="hidden" name="fileName" value="车辆列表" />	   
			  <table width="100%"  class="TableBlock">
			  
			   
			   			   <tr>
			   <td> 车牌号码: </td>
			    <td>			    <input type="text" name="plateNo" size="10"  id="plateNo">   </td>
         	   <td> 终端卡号 </td>
			    <td>			    <input type="text" name="simNo" size="10" >   </td>
            <td>车辆组:</td>
			    <td>			
							<select id="depId"  style="width: 150px;" name="depId" >

				</td>
           </tr>
		
           		<tr>
				
	   <td width=60> 围栏: </td>
        <td  align="left" width=220>
	      <select id="enclosureId" name="enclosureId"  class="required"> </select>&nbsp;&nbsp;&nbsp;&nbsp;
        
        </td>
		 <td width=70>
			     绑定状态:
			   </td>
			   <td colspan=3>
			   <select id="bindState" name="bindState" > 
			       <option value=""> 所有</option>
			       <option value="none" selected> 未绑定</option>
			       <option value="success"> 已绑定</option>
			   </select>
		   <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		</td>
    </tr>
	<tr>
	<td colspan=6>   <input type="submit" value="解除绑定" class="button gray medium" onclick="unbindEnclosure();"/>
           <input type="button" value="绑定车辆" class="button gray medium" onclick="bindEnclosure();"/>
		  
		 </td>
		</tr>
		</table>
   </div><!-- end of toolbar-->
			<table id="queryGrid" class="easyui-datagrid" 
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',
						url:'<%=ApplicationPath%>/system/functionInfoList.action',method:'post'">
					<thead>
						<tr>
							<tr>
							    <th data-options="field:'vehicleId',checkbox:true" width="3%"></th>
								<th data-options="field:'plateNo'" width="15%">车牌号</th>
							<th data-options="field:'plateColor'" width="7%">颜色</th>
							<th data-options="field:'simNo'" width="15%">终端卡号</th>
							<th data-options="field:'online'" width="15%">上线状态</th>
							<th data-options="field:'runStatus'" width="15%">运行状态</th>
							<th data-options="field:'depName1'" width="17%">车组</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			
		</form>	 

</body>

