
<%@ include file="/common/taglibs.jsp"%>
<!--共用的页面-->
<%@ include file="/common/common.jsp"%>
<!--日期下拉框-->
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
<script>
//查询行车记录参数
var timerName = "timerForQuery";
//var commandId;//命令id，根据此id查询命令返回的结果
var times=10;; //计数器 倒计时，如果查询10次，仍然没有结果，就超时返回
function startQueryResult(commandId)
{ 
	 
	times=10;
	$('#btnQuery').attr("disabled","disabled");
	$("#btnQuery").val("等待终端返回查询结果("+times+" )");
	  //最多执行5次
	$('body').oneTime('500ms', timerName,function(){  
		 queryResult(commandId); //查询命令的返回结果
	});
}
//查询命令执行结果
function queryResult(commandId)
{
    times--;
	$("#btnQuery").val("等待终端返回查询结果("+times+" )");
       var url = "<%=ApplicationPath%>/command/queryRecorder.action";
	  var cmdType = $("#cmdTypeId").val();
	  var params = {cmdType:cmdType, commandId:commandId};
	   $.getJSON(url, params, 
				function(result){		
					 if(result.success == true)
						 {
							  //返回的查询结果，填充到input输入框中		
							 $.each(result.data, function(key, value) { 
								      var inputId = "input[name='"+key + "']";
									  //alert(inputId);
									 //console.log(inputId);
									  $(inputId) .val(value);
								}); 
							  
							 //停止所有的在$('body')上定时器  
							 $('body').stopTime ();  
							 $("#btnQuery").val("参数查询");
							$('#btnQuery').attr("disabled",false); 
							//$('#btnQuery').removeAttr("disabled");
						}else {
							if(times == 1)
						   {
								 alert("命令执行超时，没有返回结果,请重新查询");
								 $("#btnQuery").val("发送");
								$('#btnQuery').attr("disabled",false); 
								$('body').stopTime ();  
						   }else
							{
								 //最多执行10次
								 $('body').oneTime('500ms', timerName,function(){  
										 queryResult(commandId); //查询命令的返回结果
								});
							}
							
						}
			  }
	  );
}


//ajax提交表单
function ajaxCommitForm(operation)
{	
	var cmdType = $("#cmdTypeId").val();
	var isValid = $("#entityForm_"+cmdType).valid();
	if(isValid == false)
		return;
				   $("#entityForm_"+cmdType).ajaxSubmit(function(result)
						 {
					        if(result.success)
							 {
							    var commandId = result.data.entityId;
								// alert(operation);
								 if(operation == "query")
								 {
									 //开始查询结果
									 //alert(commandId);
									 startQueryResult(commandId);
								 }else
								 {
					             //alert("命令已经下发,请等待处理!");
									 TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
								 }
							 }
							else
					             $("#commandMsg").html("命令下发失败:"+result.message);

						 }
					 ); //提交表单
}

var cmdType = "";
$().ready(function() {
	 $(".entityForm").validate(); //初始化验证信息

	//ajax填充下拉框数据 填充监听类型 选项
	// Utility.ajaxSubmitForm("entityForm");

	  $("#btnModify").click(function()
			 {
		           $("#operation").val("modify");
				  ajaxCommitForm();//提交表单
			 });
	 $("#btnQuery").click(function()
			 {
		           $("#operation").val("query");
				   ajaxCommitForm("query");//提交表单
			 });


	 $(".childtable").hide();

	 $(".cmdType").click(function()
	{
	      $(".childtable").hide();
	      //$(".childtable tr").hide();
		   var id = $(this).attr('id');
		   cmdType = id;
		   $("#cmdTypeId").val(id);
		   //alert($(this).html());
		   $("#msgTip").html($(this).html());
		   //alert(id);
		   $("."+id).show();
		   $("."+id + " tr").show();
	});
    
	var id = "driverInfo";
   $("#cmdTypeId").val(id);
		   //alert(id);
		   $("."+id).show();


});
</script>
<style>
  .childtable
  {
      border:0px;
	  table-layout:fixed;
    empty-cells:show; 
    border-collapse: collapse;

  }

  .cmdType
  {
	  padding-left:10px;
	  cursor:hand;
  }

  .childtable td
  {
	  border: 0px #b8d1e2 solid;
		padding: 7px;
		color: #000000;
		font-size:12px;
  }

</style>
 <BODY>
				
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">行车记录仪设置
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>

					<tr>
					<td width="25%" style="background-color:#99CCFF;"> 1、驾驶员车辆信息</td>
					<td>
						       <input type="button" class="sendjson" id="btnModify" value="设置" />
							   <input type="button" class="sendjson"  id="btnQuery"  value="查询" />
							   
							   <span id="commandMsg" class="commandMsg">></span>
							   <span id="msgTip"></span>
					</tr>
					    
					<tr>	<td class="cmdType" id="driverInfo"><a href="#">驾驶员信息>></a> </td>		
					 <td rowspan=11 valign="top" height=400>     
						        
	<form id="entityForm_driverInfo" name="entityForm" class="entityForm" 
			action='<%=ApplicationPath%>/command/vehicleRecorder.action' method="POST">
			
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="cmdType"  id="cmdTypeId" value="${cmdType}"/>
		
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
								<table width="100%" class="childtable driverInfo">			
							   
								   <tr class="driverInfo">
									  <td width="35%">驾驶员代码:</td> <td align=left>   <input type="text" name="driverNo" value="" class="required" />
									  </td>
								   </tr>
								   <tr >
							      <td >机动车驾驶证号码:</td> <td >   <input type="text" name="driverLicense" value=""  class="required"/>
								  </td>
							      </tr>
								 </table>
								</form>
							
	<form id="entityForm_vehicleInfo" name="entityForm"  class="entityForm" 
			action='<%=ApplicationPath%>/command/vehicleRecorder.action' method="POST">
			<table  width="100%" class="childtable vehicleInfo">	
			
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="cmdType"  id="cmdTypeId" value="${cmdType}"/>
		
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
								   <tr class="vehicleInfo">
									  <td width="20%">车辆VIN号:</td> <td align=left>   <input type="text" name="vin" value=""  class="required"/>
									  </td>
								   </tr>
								   <tr class="vehicleInfo">
							      <td width="20%">车牌号码:</td> <td >   <input type="text" name="vehicleNo" value=""  class="required"/>
								  </td>
							      </tr>
								  <tr class="vehicleInfo">
							      <td width="20%">车辆分类:</td> <td >   <input type="text" name="vehicleType" value=""  class="required" />
								  </td>
							      </tr>
								 </table>
								</form>
								
	<form id="entityForm_clock" name="entityForm"  class="entityForm" 
			action='<%=ApplicationPath%>/command/vehicleRecorder.action' method="POST">
			
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="cmdType"  id="cmdTypeId" value="${cmdType}"/>
		
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
			<table width="100%" class="childtable clock">	
								  <tr class="clock">
							      <td width="20%">实时时钟:</td> <td >   <input type="text" name="clock" value="" class="datetimepicker"  class="required"/>
								  </td>
							      </tr>
								 </table>
				</form>
				
	<form id="entityForm_feature" name="entityForm"  class="entityForm" 
			action='<%=ApplicationPath%>/command/vehicleRecorder.action' method="POST">
			
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="cmdType"  id="cmdTypeId" value="${cmdType}"/>
		
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
			<table  width="100%" class="childtable feature">	
								  <tr class="feature">
							      <td width="20%">车辆特征系数:</td> <td >   <input type="text" name="feature" value=""  class="required"/>
								  </td>
							      </tr>
								 </table>
				</form>
				
			<table  width="100%" class="childtable mileageIn2d">	
			
								    <tr class="mileageIn2d">
							      <td width="20%">2天内累计行驶里程(米):</td> <td >   <input type="text" name="mileageInTwoDays" value="" />
								  </td>
								  </tr>
								    <tr class="mileageIn2d">
								    <td width="20%">截至时间:</td> <td >   <input type="text" name="byTimeFor2d" value=""  class="datetimepicker"/>
								  </td>
							      </tr>
			</table>

			<table  width="100%" class="childtable mileageIn360h">	
								   <tr class="mileageIn360h">
							      <td width="20%">360小时内累计行驶里程(米):</td> <td >   <input type="text" name="mileageIn360h" value="" />
								  </td>
								  </tr>
								    <tr class="mileageIn360h">
								    <td width="20%">截至时间:</td> <td >   <input type="text" name="byTimeFor360" value="" class="datetimepicker"/>
								  </td>
							      </tr>
			</table>

			<table  width="100%" class="childtable overdrive">	
								  <!--2天内疲劳驾驶数据-->
								    <tr class="overdrive">
										<td >
											  <table id="table_overTimeFor2d" class="easyui-datagrid" title="2天内疲劳驾驶数据" style="width:100%;height:400px;"
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: true,fit:false">
												<thead>
													<tr>
														<th data-options="field:'No'" width="15%">编号</th>
														<th data-options="field:'startDate'" width="7%">开始时间</th>
														<th data-options="field:'endDate'" width="15%">结束时间</th>
													</tr>
												<thead>
											</table>
									  </td>
							      </tr>
								 </table>
								 
			<table  width="100%" class="childtable speedIn360h">	
								  <!--360小时内速度数据-->
								    <tr class="speedIn360h">
										<td >
											  <table id="table_speedIn360h" class="easyui-datagrid" title="360小时内速度数据" style="width:100%;"
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: false,fit:true">
												<thead>
													<tr>
														<th data-options="field:'No'"  width="15%">编号</th>
														<th data-options="field:'startDate'"  width="7%">开始时间</th>
														<th data-options="field:'endDate'"  width="15%">速度</th>
													</tr>
												<thead>
											</table>
									  </td>
							      </tr>
								 </table>
								 
			<table  width="100%" class="childtable speedIn2d">	
								   <!--2天内速度数据-->
								    <tr class="speedIn2d">
										<td >
											  <table id="table_speedIn2d" class="easyui-datagrid" title="2天内速度数据" style="width:100%;"
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: false,fit:true">
												<thead>
													<tr>
														<th data-options="field:'No'" width="15%">编号</th>
														<th data-options="field:'startDate'" width="7%">开始时间</th>
														<th data-options="field:'speed'" width="15%">速度</th>
													</tr>
												<thead>
											</table>
									  </td>
							      </tr>
								 </table>
								 
			<table  width="100%" class="childtable accident">	
								   <!--事故疑点数据-->
								    <tr class="accident">
										<td >
											  <table id="table_accident" class="easyui-datagrid" title="2天内速度数据" style="width:100%;"
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: false,fit:true">
												<thead>
													<tr>
														<th data-options="field:'No'" width="15%">编号</th>
														<th data-options="field:'time'" width="7%">时间</th>
														<th data-options="field:'speed'" width="15%">速度</th>
														<th data-options="field:'status'" width="15%">状态</th>
													</tr>
												<thead>
											</table>
									  </td>
							      </tr>
							   </table>
						       
					    </td> 
					
					</tr>
					<tr ><td class="cmdType" id="vehicleInfo"><a href="#">车辆信息>> </a></td>		</tr>
					<tr>	<td style="background-color:#99CCFF;">2、行驶数据信息 </td>		</tr>
					<tr>	<td class="cmdType" id="clock"><a href="#">实时时钟>></a> </td>		</tr>
					<tr>	<td class="cmdType" id="feature"><a href="#">车辆特征系数>> </td>		</tr>
					<tr>	<td class="cmdType" id="mileageIn2d"><a href="#">2天内累计行驶里程(米)>> </td>		</tr>
					<tr>	<td class="cmdType" id="mileageIn360h"><a href="#">360h内累计行驶里程(米)>> </td>		</tr>
					<tr>	<td class="cmdType" id="overdrive"><a href="#">2天内连续驾驶时间超过2h数据>> </td>		</tr>
					<tr>	<td class="cmdType" id="speedIn360h"><a href="#">最近360h内行驶速度数据>> </td>		</tr>
					<tr>	<td class="cmdType" id="speedIn2d"><a href="#">2天内行驶速度数据>> </td>		</tr>
					<tr>	<td class="cmdType" id="accident"><a href="#">采集记录仪事故疑点数据 >></td>		</tr>
			
					
				</tbody></table>
</form>

			<div id="dynamic">
						
					<div class="spacer"></div>
			</div>
 </BODY>
</HTML>
