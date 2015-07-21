
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
					 $(".commandMsg").html(data.status);
					 if(data.fileName )
					 {
				          var picturePath = "<%=ApplicationPath%>/vehiclePicture/"; 
						  picturePath += data.fileName;
						 $("#imgPic").attr("src", picturePath);
						 var html = "<a href='"+ picturePath + "'>下载文件</a>";
						 $("#td_ViewFile").html(html);
					 }
}

$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息

	 var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
	//ajax填充下拉框数据 填充监听类型 选项
	 $("#picSize").lookup({category:"Resolution", selectedValue:1});
	 $("#quality").lookup({category:"ImageQuality", selectedValue:5});
	Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
							   
							     var saveType = $("#saveType").val();
								if (result.success) {
										 var commandId = result.data; //下发成功后，获取到命令Id
									 if(saveType == 0)
									 {
										 var url = "<%=ApplicationPath%>/command/getPictureResult.action";
										 TerminalCommand.times=100;
										 TerminalCommand.startQueryResult(commandId,url,onCommandSuccess);//命令下发成功,根据命令id,开始尝试获取检索结果
									  }else
									 {
									 //如果类型是保存到终端，则不需要检测上传
									    TerminalCommand.startQueryResult(commandId);
									 }
								}
								else {
									$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//$('body').stopTime ();  
								 }
						 }
				 });
	$(".advanced").hide();
});
var hide = true;
function showAdvanced()
{
	if(hide)
	{
		$(".advanced").show();
	}else
		$(".advanced").hide();
	hide = hide != true;
}
</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/takePicture.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
        <input type="hidden"  name="alarmId"  id="alarmId" value="${alarmId}"/><!--报警处理时，需要把报警ID带给后台-->
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">拍照信息
						<input type="submit" class="sendjson" value="发送命令">
						<span class="commandMsg"></span>
						</td>
					</tr>
					<tr>
						<td align="right">拍摄方式:</td>
						<td >
						    <select id="action" name="action">
						    <option value="1">拍照</option>
						    <option value="2">连拍</option>
						    <option value="3">录像</option>
						    <option value="0">停止</option>
							</select>
						</td>
						<td align="right">摄像头:</td>
						<td >
						    <select id="channel" name="channel">
						    <option value="1">通道1</option>
						    <option value="2">通道2</option>
						    <option value="3">通道3</option>
						    <option value="4">通道4</option>
							</select>
						</td>
					</tr>
					
					<tr>
						
						<td align="right">拍摄张数
							:</td>
						<td>
						<input type="text" id="photoNum"   name="photoNum" maxlength="16" size="20"  value="1"
						   class="required digits min:1" style="width:80px">
						  </td>
						<td align="right">时长(分钟):</td>
						<td ><input id="interval" name="interval" class="required digits"  value="0" maxlength="16" size="20" style="width:100px"  class="required digits">
						</td>
					</tr>
					
					<tr>
						<td align="right">保存方式:</td>
						<td >
						 <select id="saveType" name="saveType" class="required">
						    <option value="0">实时上传</option>
						    <option value="1">保存本地</option>
						 </select>
						</td>
						<td align="right">图片尺寸:</td>
						<td >
						   <select id="picSize" name="picSize" class="required" style="width:100px"></select>
						   <a href="#" onclick="showAdvanced();" style="color:#660000">高级设置</a>
						</td>

					</tr>
					
					<tr class="advanced">
						
						<td align="right">品质(1-10):</td>
						<td >
						    <select id="quality" name="quality" class="required"></select>
						</td>
						<td align="right">亮度(0～255):</td>
						<td ><input id="light" name="light" class="required"  value="125" maxlength="16" size="20" style="width:80px" >
						</td>
					</tr>
				
					<tr  class="advanced">
						<td align="right">对比度(0~127):</td>
						<td ><input id="compare" name="compare" class="required"  value="125" maxlength="16" size="20" style="width:80px">
						</td>
						<td align="right">饱和度(0~127):</td>
						<td ><input id="stature" name="stature" class="required"  value="125" maxlength="16" size="20" style="width:80px">
						</td>
					</tr>
					
					<tr  class="advanced">
						<td align="right">色度(0~255):</td>
						<td ><input id="grade" name="grade" class="required"  value="125" maxlength="16" size="20" style="width:80px">
						</td>
						
					</tr>
					
					<tr>
					   <td id="td_ViewFile"colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">
										</td>						
						
					</tr>

					<tr>

						<td colspan=4 align="center">
						   <img id="imgPic" src="" style="height:240px;width:500px;"/>
						</td>
						
					</tr>




				
					
				</tbody></table>
 </BODY>
</HTML>
