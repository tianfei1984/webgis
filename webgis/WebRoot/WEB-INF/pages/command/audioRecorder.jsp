
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
	
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->

<script>

//当终端命令执行成功时
function onCommandSuccess(result){		
				  var data = result.data;
					 //停止所有的在$('body')上定时器  
					 $('body').stopTime ();  
					$(".sendjson").val("发送命令");
					$('.sendjson').attr("disabled",false);
					 $(".commandMsg").html(data.status);
					 if(data.fileName )
					 {
				          var picturePath = "<%=ApplicationPath%>/vehiclePicture/"; 
						  picturePath += data.fileName;
						 //$("#imgPic").attr("src", picturePath);
						 var html = "<a href='"+ picturePath + "' style='font-weight:bold'>上传成功,右键另存录音文件:"+data.fileName+"</a>";
						 $(".commandMsg").html(html);
					 }
		  }

$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	//ajax填充下拉框数据 填充监听类型 选项
	 $("#frequency").lookup({category:"AudioFrequency", selectedValue:3});
	 $("#quality").lookup({category:"ImageQuality"});
	
	 
	 Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
								if (result.success) {
									 var commandId = result.data; //下发成功后，获取到命令Id
                                     var url = "<%=ApplicationPath%>/command/getPictureResult.action";
									 TerminalCommand.times=100;
									 TerminalCommand.startQueryResult(commandId,url,onCommandSuccess);//命令下发成功,根据命令id,开始尝试获取检索结果
								}
								else {
									$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
								  }
						 }
	 });
});


</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/audioRecorder.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">录音信息
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">录音命令:</td>
						<td >
						    <select id="action" name="action">
						    <option value="1">开始录音</option>
						    <option value="0">停止</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="right">录音时间(秒):</td>
						<td ><input id="interval" name="interval" class="required digits"  value="120" maxlength="16" size="20" >
						</td>
					</tr>
					<tr>
						<td align="right">保存方式:</td>
						<td >
						 <select id="saveType" name="saveType">
						    <option value="0">实时上传</option>
						    <option value="1">保存本地</option>
						 </select>
						</td>
					</tr>
					<tr>
						<td align="right">音频采样率:</td>
						<td >
						    <select id="frequency" name="frequency"></select>
						</td>
					</tr>
					
					<tr>

						<td colspan=2 align="center">
						   <input type="submit" class="sendjson" value="发送命令">
						   <span class="commandMsg"></span>
						</td>
						
					</tr>
				</tbody></table>
 </BODY>
</HTML>
