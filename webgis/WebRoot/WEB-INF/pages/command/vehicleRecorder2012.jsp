
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/common.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
  
<script type="text/javascript" src="<%=jsPath%>/datatable/jquery.dataTables.js"></script>
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
				 $("#entityForm").validate(); //初始化验证信息

				 var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
				//ajax填充下拉框数据 填充监听类型 选项
				 $("#cmdType").lookup({category:"CmdWord2012", selectedValue:1});
				 //初始化数据表格
				 var dataTable = Utility.initTable(columns, "<%=ApplicationPath%>/report/queryRecorder.action");
				 
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
			
		<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/data/vehicleRecorder.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="6" style="font-weight: bold; background: #EFEFEF;" height="25">记录仪数据采集
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">采集命令
							:</td>
						<td><select id="cmdType"  style="width: 150px;" name="mediaType">
						   </select></td>						
					</tr>
					<tr>
						<td align="right">开始日期:</td>
						<td >
							  <input type="text" name="startDate" value='<s:date name="entity.installDate" format="yyyy-MM-dd"/>' class="datetimepicker"></input>
						</td>
						<td align="right">结束日期:</td>
					    <td>
							  <input type="text" name="endDate" value='<s:date name="entity.installDate" format="yyyy-MM-dd"/>' class="datetimepicker"></input>
						</td>
					

						<td  align="left" colspan=2><input type="submit" class="sendjson" value="发送"> </td>
						
					</tr>
				</tbody></table>
				</form>

			<form id="queryForm" action="<%=ApplicationPath%>/report/queryRecorder.action">
			   <input type="hidden" name="queryId" value="selectVehicleRecorders" />	<!--对应的Ibatis的sql查询Id -->      
			   <input type="hidden" name="fileName" value="用户信息" />	   
			   <input type="hidden" name="commandId" value="-1" />	   
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
       
	       <input type="button" value="查询"  title="查询" id="btnQuery"/>&nbsp;&nbsp;
           <input type="reset" value="重置" title="重置"/>&nbsp;&nbsp;
		    <button class="btnExport"  value="l" title="导出" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');"/> 导出Excel</button> <!--调用utility.js-->
        </td>
    </tr>
		</form>	 
		

			<div id="dynamic">
				<table class="t1" id="dataTable" width="100%">
					<thead>
						<tr>
							<th width="7%">车牌号</th>
							<th width="15%">车组</th>
							<th width="7%">车牌颜色</th>
							<th width="10%">Sim卡号</th>
							<th width="10%">命令类型</th>
							<th width="15%">内容</th>
							<th width="15%">上传时间</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
			</div>
			<div class="spacer"></div>
			</div>


</body>

