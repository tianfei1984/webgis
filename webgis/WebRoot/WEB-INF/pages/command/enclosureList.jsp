<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>

    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.validate.js"></script><!--表单数据验证-->
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.metadata.js"  charset="UTF-8"></script><!--表单数据验证-->
    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--命令结果查询-->

</head>

		<script type="text/javascript" charset="utf-8">
			//编辑列
			function getEditActionColumn(value, rowData, rowIndex)
			{
				var entityId = rowData.enclosureId;
				var html =  "<a href=\"javascript:InfoWindow.viewEnclosure('" + entityId+ "');\">" +" 编辑</a>";
				return html;

			}
			function getBindTypeColumn(value, rowData, rowIndex)
			{
				if(value == "platform")
					return "平台报警";
				else if(value == "terminal")
					return "终端报警";
				else
					return "未绑定";
			}

			function getCommandStatus(value, rowData, rowIndex)
			{
				var bindType = rowData.bindType;
				if(bindType == "platform")
					return "绑定成功";
				else
					return value;

			}



			function getCheckboxColumn(value, rowData, rowIndex)
			{
				var html = "<input type='checkbox' name='enclosureId' value='"+value + "' />";
				return html;
			}
			
			function deleteAll(enclosureType,buttonId)
			{
				  var url = "<%=ApplicationPath%>/command/deleteAllEnclosure.action";
				  var params = {enclosureType:enclosureType,vehicleId:"${vehicleId}"};
				  $.getJSON(url, params, function(result)
				{
					     if(result.success)
					{
						var commandId = result.data; //下发成功后，获取到命令Id
						if(commandId > 0)
						{
							TerminalCommand.commandButton = $("#"+buttonId);
							TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
						}
					}
					   else
						   $.messager.alert("提示","发送失败:"+result.message);
				});
			}

			function doBindArea(bindType)
			{
				//获取checkbox选中的行的区域Id
				var checkedItems = $('#queryGrid').datagrid('getChecked');
				var names = [];
				$.each(checkedItems, function(index, item){
                   names.push(item.enclosureId);
                });               
				if(names.length == 0)
				{
				   $.messager.alert("提示","请选择要下发的区域!");
				   return;
				}
                var areaIds = names.join(",");
				$("#areaIds").val(areaIds);
				$("#bindType").val(bindType);
				$('#entityForm').form('submit',{
					onSubmit: function () {
                  //表单验证
                     return $("#entityForm").form('validate');
                  },
	                success:function (data) {
						var result = eval("(" + data + ")");
						$("#btnQuery").click();
						if (result.success) {
							$.messager.alert("提示","命令已经下发,请稍后刷新状态!");
						}
						else 
							$.messager.alert("提示","提交失败! 错误原因：" + (result.message ? result.message : result.Data));
				    }
				});

			}
			
			function doUnbindArea(bindType)
			{
				//获取checkbox选中的行的区域Id
				var checkedItems = $('#queryGrid').datagrid('getChecked');
				var names = [];
				$.each(checkedItems, function(index, item){
                   names.push(item.enclosureId);
                });               
				if(names.length == 0)
				{
				   $.messager.alert("提示","请选择要下发的区域!");
				   return;
				}
                var areaIds = names.join(",");
				$("#areaIds").val(areaIds);
				$("#bindType").val(bindType);
				$("#configType").val("3");
				$('#entityForm').form('submit',{
					onSubmit: function () {
                  //表单验证
                     return $("#entityForm").form('validate');
                  },
	                success:function (data) {
						var result = eval("(" + data + ")");
						$("#btnQuery").click();
						if (result.success) {
							$.messager.alert("提示","命令已经下发,请稍后刷新状态!");
						}
						else 
							$.messager.alert("提示","提交失败! 错误原因：" + (result.message ? result.message : result.Data));
				    }
				});

			}

			$(document).ready(function() {
			     
					  $("#configType").lookup({category:"AreaConfigCommand",selectedValue:"0"}); //区域设置类型下拉框
					  $("#enclosureType").lookup({category:"EnclosureType"}); //围栏类型下拉框
					  
					$("#btnQuery").click(function(){
							Utility.loadGridWithParams();
					});
					Utility.loadGridWithParams();


				  Utility.ajaxSubmitForm("entityForm", {
					  success: function(responseText){
							var result = responseText;
							

						}
					  
				  }); //将围栏下发的表单转化ajax提交 
				   //全选checkbox
				  $("#selectAll").change(
						function () { 
						         var checked = $(this).attr("checked");
								 if(!checked)
									 checked = false;
			                     $("input:checkbox[name='enclosureId']").attr("checked", checked); 
					   }
		           );
			} );
		</script>
<body>
		<div id="toolbar" >		
			
			<form id="queryForm" action="<%=ApplicationPath%>/vehicle/enclosureList.action">
			   <input type="hidden" name="queryId" value="selectBindEnclosures" />		  
			   <input type="hidden" name="excludeRoute" value="route" />		  <!--只查询围栏，不查询线路-->
			   
        		<input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
			  <table width="100%"  class="TableBlock">
			   			   <tr>
				   <td> 围栏名称: </td>
					<td>			    <input type="text" name="name" size="10"  id="name">   </td>
				<td>围栏类型:</td>
			   <td>
			   <select id="enclosureType" name="enclosureType" > </select>
			   </td>
			   <td>
			     绑定状态:
			   </td>
			   <td>
			   <select id="bindState" name="bindState" > 
			       <option value=""> 所有</option>
			       <option value="none"> 未绑定</option>
			       <option value="success"> 已绑定</option>
			   </select>
			   </td>

			   <td> <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
		   </td>
            </tr>
			</table>
			
		   	</form>
	<form id="entityForm" action="<%=ApplicationPath%>/command/sendEnclosure.action">
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="areaIds"  id="areaIds" value="" />
		<input type="hidden"  name="bindType"  id="bindType" value="terminal" />
			<table width="100%"  class="TableBlock">
           		<tr>

        <td colspan="6" align="left">
	      <select id="configType" name="configType"  class="required" required> </select>&nbsp;&nbsp;
           <input type="button" value="下发给终端" title="下发给终端" onclick="doBindArea('terminal');"/>&nbsp;&nbsp;
		   
           <input type="button" value="下发给平台" title="下发给平台" onclick="doBindArea('platform');"/>
		   
           <input type="button" value="解除绑定" title="解除绑定" onclick="doUnbindArea('terminal');"/>
		  <span style="color:red;"> (注:下发给终端，由终端报警，下发给平台由平台报警)</span>
          
        </td>
    </tr>
	<tr>
	    <td colspan=6> <input type="button" value="删除终端所有多边形区域" id='btnDeleteAllPolygon' onclick="deleteAll('polygon','btnDeleteAllPolygon');" />&nbsp;&nbsp;
           <input type="button" value="删除终端所有矩形区域" id='btnDeleteAllRect' onclick="deleteAll('rect','btnDeleteAllRect');" />&nbsp;&nbsp;
           <input type="button" value="删除终端所有圆形形区域"  id='btnDeleteAllCircle' onclick="deleteAll('circle','btnDeleteAllCircle');" />
		   <span class="commandMsg"></span></td>
		 </td>
	</tr>
		</table>
			</div>
				<table id="queryGrid" class="easyui-datagrid" 
						data-options="pagination:true,pageSize:15,singleSelect:true,rownumbers:true,striped:true,fitColumns: true,
						pageList: [15, 20, 50, 100, 150, 200],fit:true,toolbar:'#toolbar',checkOnSelect: false, selectOnCheck: false,
						url:'<%=ApplicationPath%>/vehicle/enclosureList.action',method:'post'">
					<thead>
						<tr>
							    <th data-options="field:'enclosureId',checkbox:true"   width="100"><input type='checkbox' id='selectAll'></input></th>
								<th data-options="field:'name'"  width="150">围栏名称</th>
								<th data-options="field:'enclosureType'"  width="120">围栏类型</th>
								<th data-options="field:'alarmType'" width="250" >报警类型</th>
								<th data-options="field:'configType'"   width="100">配置类型</th>
								<th data-options="field:'bindType',formatter:getBindTypeColumn"  width="150" >绑定类型</th>
								<th data-options="field:'commandStatus',formatter:getCommandStatus"  width="150" >执行状态</th>
								<th data-options="field:'updateDate'"  width="150" >执行时间</th>
								<!--<th data-options="field:'descr'"  >创建时间</th>-->
							    <!-- <th data-options="field:'1',formatter:getEditActionColumn" width="50">编辑</th>-->
						</tr>
					</thead>			
				</table>
			
		</form>	 

</body>

