
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>


<script>
//报警处理方法
function processAlarm(tag)
{
    $("#processed").val(tag);
    var vehicleId = ${alarm.vehicleId};
	var alarmId = ${alarmId};
	var param = "?input=true&vehicleId="+vehicleId+"&alarmId="+alarmId;
    if(tag == 1)
	{
		//监听
	      var url = "<%=ApplicationPath%>/command/listenTerminal.action"+param;
		  var title = "${alarm.plateNo}报警处理-监听";
		  window.parent.closeCommandWindow();
          InfoWindow.open(url,  480, 220, title);
	}else if(tag == 2)
	{
		//拍照
	      var url = "<%=ApplicationPath%>/command/takePicture.action"+param;
		  var title = "${alarm.plateNo}报警处理-拍照";
						   window.parent.closeCommandWindow();
          InfoWindow.open(url,   620, 620, title);
	}else if(tag == 3)
	{
		//文本下发
	      var url = "<%=ApplicationPath%>/command/sendText.action"+param;
		  var title = "${alarm.plateNo}报警处理-文本下发";
						   window.parent.closeCommandWindow();
          InfoWindow.open(url,   620, 300, title);
	}else if(tag == 4)
	{
			    $("#entityForm").ajaxSubmit(function(data)
						 {
					          if(data.success)
					         alert("报警已处理,命令下发给终端!");
						   else
							   alert("提交失败! 错误:" + data.message);
						   window.parent.closeCommandWindow();
						 }
					 ); //提交表单
	}
}
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
  

});
</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/data/processAlarm.action' method="POST">
				
        <input type="hidden"  name="alarmId"  id="alarmId" value="${alarmId}"/>
        <input type="hidden"  name="processed"  id="processed" value="1"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">报警信息
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					  <tr>
						<td align="right" width="100">车牌号:</td>
						<td >
						   ${alarm.plateNo}
						</td>
						<tr style="background-color:#CCFFFF">
						<td align="right">报警类型:</td>
						<td >
						   ${alarm.alarmType}
						</td>
					</tr>
					</tr>
					  <tr>
						<td align="right">报警时间:</td>
						<td >
						   ${alarm.alarmTime}
						</td>
						<tr>
						<td align="right">报警地点:</td>
						<td >
						   ${alarm.location}
						</td>
					</tr>
					<tr>
						<td align="right">处理情况:
						</td>
						<td>
						     <input type="text" name="remark" value="${alarm.remark}" />
						   </td>
					</tr>				
					<tr>
						<td colspan=2 align="center">
							<button type="button" id="btnListen" onclick="processAlarm(1)" class="button gray medium">监听</button> 
							<button type="button" id="btnTakePicture"  onclick="processAlarm(2)" class="button gray medium">拍照</button> 
							<button type="button" id="btnSendMessage" onclick="processAlarm(3)" class="button gray medium">文本下发</button> 
							<button type="button" id="btnClearAlarm" onclick="processAlarm(4)" class="button gray medium">解除报警</button> 
						</td>						
					</tr>
		</tbody></table>
 </BODY>
</HTML>
