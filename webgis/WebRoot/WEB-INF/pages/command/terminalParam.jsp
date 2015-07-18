
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script>

var timerName = "timerForQuery";
var operation = "";//操作类型是查询query还是修改modify
var times=30;
 function startQueryResult(commandId)
{ 
	times=30;
	if(operation == "query")
	{
		$('#btnQuery').attr("disabled","disabled");
		$("#btnQuery").val("等待终端返回查询结果("+times+" )");
	}else
	{
		$('#btnModify').attr("disabled","disabled");
		$("#btnModify").val("等待终端返回查询结果("+times+" )");
	}
	  //最多执行5次
	$('body').oneTime('500ms', timerName,function(){  
		 queryResult(commandId); //查询命令的返回结果
	});
}
//根据下发命令ID，来查询命令执行结果
function queryResult(commandId)
{	
    times--;
	if(operation == "query")
	{
		$('#btnQuery').attr("disabled","disabled");
		$("#btnQuery").val("等待终端返回查询结果("+times+" )");
	}else
	{
		$('#btnModify').attr("disabled","disabled");
		$("#btnModify").val("等待终端返回查询结果("+times+" )");
	}

	//alert(times);
       var url = "<%=ApplicationPath%>/command/queryTerminalParam.action";
	  //var commandId = 0;
	  var params = {commandId:commandId,operation:operation};
	   $.getJSON(url, params, 
			function(result){		
				  if(result.success == true)
				 {
					   $(".commandMsg").html(result.message);
					   if(operation == "query")
					   {
					         $(".commandMsg").html('查询成功');
								//返回的查询结果，填充到input输入框中
							  $(result.data).each(function(i, obj)
							 {
									//if(console.log)
										//console.log(obj.code + "_"+ obj.value);
									 var inputId = "input_"+obj.code;
									 if(console.log)
									 console.log(inputId);
									 $("#"+inputId).val(obj.value);
							 });
							 $("#btnQuery").val("参数查询");
							$('#btnQuery').attr("disabled",false);
					   }else
						 {
						     $("#btnModify").val("批量修改");
							$('#btnModify').attr("disabled",false);
						 }

					  
					 //停止所有的在$('body')上定时器  
					 $('body').stopTime ();   
					//$('#btnQuery').removeAttr("disabled");
				}else {
					if(times == 1)
				   {
						 $(".commandMsg").html("命令执行超时，没有返回结果,请重新查询");
						  if(operation == "query")
					   {
						 $("#btnQuery").val("参数查询");
							$('#btnQuery').attr("disabled",false);
					   }else
						 {
						     $("#btnModify").val("批量修改");
							$('#btnModify').attr("disabled",false);
						 }
					    $('body').stopTime ();  
				   }else
					{
					   $(".commandMsg").html(result.message);
					     //最多执行10次
						 $('body').oneTime('900ms', timerName,function(){  
								 queryResult(commandId); //查询命令的返回结果
						});
					}
					
				}
		  }
	  );
}


//ajax提交下发命令的表单，下发成功后，开始不断查询后台是否有终端返回结果
function ajaxCommitForm(operation)
{	
				   $("#entityForm").ajaxSubmit(function(result)
						 {
					        if(result.success)
							 {
								 var commandId = result.data;
								 startQueryResult(commandId);
								 if(operation == "query")
								 {
									 //开始查询结果
								 }else
								 {
					             $(".commandMsg").html("命令已经下发,请等待处理!");
								 }
							 }
							else
					             $(".commandMsg").html("下发失败:"+result.message);

						 }
					 ); //提交表单
}

$().ready(function() {
	
	 $("#btnModify").click(function()
			 {
		           operation = "modify";
		           $("#operation").val("modify");
				  ajaxCommitForm();//提交表单
			 });
	 $("#btnQuery").click(function()
			 {
		           operation = "query";
		           $("#operation").val("query");
				  ajaxCommitForm("query");//提交表单
			 });

	 $("#checkAll").click(function() {
                $('input[name="paramId"]').attr("checked",this.checked);
				$(".paramInput").attr("disabled", this.checked == false);
      });

	   $('input[name="paramId"]').click(function()
	{
		   //alert(this.checked);
             $("#input_"+$(this).val()).attr("disabled", this.checked == false);
	});


   
	 $("#paramType").lookup({category:"TerminalParamType", selectedValue:"${paramType}"});

	 $("#paramType").change(function()
	{
		 //var paramType = $("#paramType").val();
		 //alert(paramType);
          var url = "<%=ApplicationPath%>/command/terminalParamTemplate.action" ;
		  $("#entityForm").attr("action", url);
		  $("#entityForm").submit();
	});
});
</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/terminalParam.action' method="POST">
				<!--修改和查询的标志-->
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="5" style="font-weight: bold; background: #EFEFEF;" height="25">监听信息
						<span style="color:red;background:blue;">${message}</span>
						参数类型:
						<select id="paramType"  style="width: 150px;" name="paramType" class="required digits">
						   </select>
						<input type="button" name="query"  id="btnQuery"  value="参数查询" />  
					
						<input type="button" name="modify"  id="btnModify" value="批量修改" />
						<input type="checkbox" name="allSelectedVehicle" id="allSelectedVehicle" value="on"/>设置所有选中的车辆
						<!--请勾选后修改参数-->
						<span class="commandMsg"></span>
						</td>
					</tr>
					<tr class="TableHeader">
                          <TD><input type="checkbox" id="checkAll" name="checkAll" /></TD>
                          <TD>参数ID</TD>
						  <TD>参数值</TD>		
						  <TD width="55%">描述</TD>				  
						 <!-- <TD>提交修改</TD>-->
					</tr>
					  <s:iterator value="paramTemplateData" id="bd" status="status">  
					<tr>
					    <td align="center">
						  <input type="checkbox" id="paramId_${bd.name}" name="paramId" value="${bd.name}" />
						</td>
						<td align="right">
						  ${bd.name}
						</td>
					
						<td class="edit2">
						 <s:if test="%{#bd.name=='0x0020'}">
						       <select class="paramInput" value="" name="paramValue" id="input_${bd.name}" disabled>
							          <option value="0">定时汇报</option>
									  <option value="1">定距汇报</option>
									  <option value="2">定时和定距汇报</option>
							   </select>
						</s:if>
						<s:elseif test="%{#bd.name=='0x0045'}">  
								<select class="paramInput" value="" name="paramValue" id="input_${bd.name}" disabled>
							          <option value="0">自动接听</option>
									  <option value="1">ACC ON时自动接听,OFF时手动接听</option>
							   </select>
						</s:elseif>  
                        <s:else>
						<input  class="paramInput" value="" name="paramValue" id="input_${bd.name}" disabled/>
						</s:else>
						</td>
						<td align="left">
						      ${bd.remark}
						</td>
						<!--
						<td>
						  <image src="<%=ApplicationPath%>/image/accept.gif" style="cursor:hand"
						  onclick=""></image>
						</td>
						-->
					</tr>
					</s:iterator>  

				
					
				</tbody></table>
 </BODY>
</HTML>
