
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

	
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->

<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
     $(".datetimepicker").today();
	//ajax填充下拉框数据 填充监听类型 选项
	 $("#eventType").lookup({category:"MediaEvent", selectedValue:0});
	 $("#mediaType").lookup({category:"MediaType", selectedValue:0});
	
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
						 var html = "<a href='"+ picturePath + "' style='font-weight:bold'>上传成功,右键另存文件:"+data.fileName+"</a>";
						 $(".commandMsg").html(html);
					 }
		  }

</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/mediaUpload.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">多媒体上传信息
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">多媒体类型
							:</td>
						<td><select id="mediaType"  style="width: 150px;" name="mediaType" class="required">
						   </select></td>
					</tr>
					<tr>
						<td align="right">通道
							:</td>
						<td>
						 <select id="channel" name="channel">
						    <option value="1">通道1</option>
						    <option value="2">通道2</option>
						    <option value="3">通道3</option>
						    <option value="4">通道4</option>
							</select>
							</td>
					</tr>
                    <tr>
						<td align="right">事件类型
							:</td>
						<td><select id="eventType"  style="width: 150px;" name="eventType" class="required">
						   </select></td>
					</tr>
					<tr>
						<td align="right">开始时间:</td>
						<td >
							  <input type="text" name="startDate" value='' class="datetimepicker" class="required"></input>
					  </td>
					</tr>
					<tr>
							<td align="right">结束时间:</td>
						  <td >
							  <input type="text" name="endDate" value=''  class="datetimepicker" class="required"></input>
					  </td>
					</tr>
					<tr>
						<td align="right">保留方式:</td>
						<td >
						 <select id="saveType" name="saveType">
						    <option value="0">保留</option>
						    <option value="1">删除</option>
						 </select>
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
