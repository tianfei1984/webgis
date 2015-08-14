<%@ page language="java" pageEncoding="UTF-8"%>

<!--日期控件-->
<%@ include file="/common/paginateUtil.jsp"%>
<%@ include file="/common/dateUtil.jsp"%>
  
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->

</head>

		<script type="text/javascript" charset="utf-8">
		  //对应数据库SQL查询的字段名
			      var columns = [
						{ "mData": "plateNo" },
						{ "mData": "plateColor" },
						{ "mData": "simNo" },
						{ "mData": "cmd" },
						{ "mData": "cmdData" },
						{ "mData": "startTime" },
						{ "mData": "speed" },
						{ "mData": "signal" },
						{ "mData": "sortId" }
					];
var timerName = "timerForQuery";
var times=7;
 function startQueryResult(commandId)
{ 
	$("#commandId").val(commandId);
	times=7;
	$('.sendjson').attr("disabled","disabled");
	$(".sendjson").val("等待终端返回查询结果("+times+" )");
	  //最多执行5次
	$('body').oneTime('500ms', timerName,function(){  
		 queryResult(commandId); //查询命令的返回结果
	});
}
//查询命令执行结果
var first = true;
function queryResult(commandId)
{	
    times--;
	$(".sendjson").val("等待终端返回查询结果("+times+" )");
	//alert(times);
       var url = "<%=ApplicationPath%>/data/queryMediaInfo.action";
	  //var commandId = 0;
	  var params = {commandId:commandId};
	   $.getJSON(url, params, 
			function(result){		
				  if(result.success == true)
				 {
					    if(first == false)
							$('#datatable').dataTable().fnDestroy();
						$("#datatable").children().remove(); //清空表格，重新初始化data table
					  $('#dataTable').dataTable( {
						  "aaData":result.data, //查询出来的结果，赋给表格显示
						 "aoColumns":columns,
							   "sDom": ''
					  });
					 //停止所有的在$('body')上定时器  
					 $('body').stopTime ();  
					 $(".sendjson").val("发送");
					$('.sendjson').attr("disabled",false); 
					first = false;
					//$('.sendjson').removeAttr("disabled");
				}else {
					if(times == 1)
				   {
						 alert("命令执行超时，没有返回结果,请重新查询");
						 $(".sendjson").val("发送");
						$('.sendjson').attr("disabled",false); 
					    $('body').stopTime ();  
				   }else
					{
					     //最多执行5次
						 $('body').oneTime('500ms', timerName,function(){  
								 queryResult(commandId); //查询命令的返回结果
						});
					}
					
				}
		  }
	  );
}


			$(document).ready(function() {
				 //$("#entityForm").validate(); //初始化验证信息

				 var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
				//ajax填充下拉框数据 填充监听类型 选项
				 $("#cmdType").lookup({category:"CmdWord2012", selectedValue:1});
				 $("#cmdWord").lookup({category:"CmdWord2012", selectedValue:1});
				 //创建下拉部门树
				Utility.createDepTree("depId");
				 //初始化数据表格
				 //var dataTable = Utility.initTable(columns, "<%=ApplicationPath%>/report/queryRecorder.action");
				 
	             Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
								if (result.success) {
									 //alert("命令已经下发,请等待处理!");
									 var commandId = result.data; //下发成功后，获取到命令Id
									 startQueryResult(commandId);	   //命令下发成功,根据命令id,开始尝试获取检索结果
								}
								else {
									alert("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
								  }
						 }
				 });
			} );
		</script>
<body>
		<div id="container" >		
		
		<!-- 行车记录仪采集 -->
		<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/vehicleRecorder.action' method="POST">
	        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
	        <input type="hidden" name="ver" value="2012">
	        <input type="hidden" name="query" value="operation">
	 		<table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="6" style="font-weight: bold; background: #EFEFEF;" height="25">记录仪数据采集
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">采集命令
							:</td>
						<td><select id="cmdType"  style="width: 150px;" name="cmdType">
						   </select></td>						
					</tr>
					<tr>
						<td align="right">开始日期:</td>
						<td >
							  <input type="text" name="startDate" class="datetimepicker"></input>
						</td>
						<td align="right">结束日期:</td>
					    <td>
							  <input type="text" name="endDate" class="datetimepicker"></input>
						</td>
						<td  align="left" colspan=2><input type="submit" class="sendjson" value="发送"> </td>
					</tr>
				</tbody></table>
		</form>
		<!-- 行车记录仪数据查询 -->
		<form id="queryForm" action="<%=ApplicationPath%>/report/queryRecorder.action">
			   <input type="hidden" name="queryId" value="selectVehicleRecorders" />	<!--对应的Ibatis的sql查询Id -->      
			   <input type="hidden" name="fileName" value="行车记录仪" />	   
			   <input type="hidden" name="commandId" value="-1" />	   
			  <table width="100%"  class="TableBlock">
			   	 <tr>
				    <td> 车牌号码 </td>
					<td>			   
					<input type="text" id="plateNo" name="plateNo" > 
					</td>
				   <td> 车组名称 </td>
					<td>	
					<select id="depId" name="depId" style="width: 200px;"></select>		   
               </td>
				<td>命令类型</td>
			   <td> <select id="cmdWord" name="cmdWord" width="10"></select></td>
			   
            </tr>
			<tr>
				<td align="right">上传时间:</td>
				<td colspan=3>
		      <input type="text" name="startTime"  class="datetimepicker" />至
		      <input type="text" name="endTime"  class="datetimepicker" />
		      </td>
       
	      <!--  <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
		    <button class="btnExport"  value="l" title="导出" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        	<td colspan="2">
	        	<a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
			   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
			   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
        	</td>
    		</tr>
		</table>
		</form>	 
		
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
		</div>
		
		
</body>

