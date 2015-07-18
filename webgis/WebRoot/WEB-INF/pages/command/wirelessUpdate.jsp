
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
	
<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息

	 var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
	//ajax填充下拉框数据 填充监听类型 选项
	 $("#picSize").lookup({category:"Resolution", selectedValue:1});
	 $("#quality").lookup({category:"ImageQuality", selectedValue:1});
	 Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
								if (result.success) {
									 var commandId = result.data; //下发成功后，获取到命令Id
									 TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
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
			action='<%=ApplicationPath%>/command/wirelessUpdate.action' method="POST">
				<!--控制类型为无线升级-->
        <input type="hidden"  name="controlType"  id="controlType" value="1"/>
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">无线升级
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					
					<tr>
						<td align="right">URL地址
							:</td>
						<td>
						<input type="text" id="url"   name="url" maxlength="16" size="20"  value=""
						   class="">
						  </td>
					</tr>
					<tr>
						<td align="right">拨号点名称:</td>
						<td >
						<input type="text" id="apn"   name="apn" maxlength="16" size="20"  value="CMNET"
						   class="required">
						</td>
					</tr>
					<tr>
						<td align="right">拨号用户名:</td>
						<td >
						<input type="text" id="apnUser"   name="apnUser" maxlength="16" size="20"  value=""
						   class="">
						</td>
					</tr>
					<tr>
						<td align="right">拨号密码:</td>
						<td >
						<input type="text" id="apnPass"   name="apnPass" maxlength="16" size="20"  value=""
						   class="">
						</td>
					</tr>
					<tr>
						<td align="right">服务器地址:</td>
						<td >
						<input type="text" id="address"   name="address" maxlength="16" size="20"  value="192.168.1.103"
						   class="required">
						</td>
					</tr>
					<tr>
						<td align="right">TCP端口:</td>
						<td >
						<input type="text" id="tcp"   name="tcp" maxlength="16" size="20"  value="6000"
						   class="required">
						</td>
					</tr>
					<tr>
						<td align="right">UDP端口:</td>
						<td><input type="text" id="udp"   name="udp" maxlength="16" size="20"  value=""
						   class="">
						</td>
					</tr>
					<tr>
						<td align="right">制造商ID:</td>
						<td ><input id="vendorId" name="vendorId"  value="125"  class="required"value="" >
						</td>
					</tr>
					<tr>
						<td align="right">硬件版本:</td>
						<td ><input id="hardVersion" name="hardVersion" class="required" value="1.03" maxlength="16" size="20" >
						</td>
					</tr>
					<tr>
						<td align="right">固件版本:</td>
						<td ><input id="softVersion" name="softVersion" value="1.00" class="required" >
						</td>
					</tr>
					<tr>
						<td align="right">连接到指定服务器时限(分):</td>
						<td ><input id="timeout" name="timeout" class="required" value="3600" maxlength="16" size="20" >
						</td>
					</tr>
					<tr>

						<td colspan=2 align="center">
						   <input type="submit" class="sendjson" value="发送">
						   <span class="commandMsg"></span></td>
						
					</tr>

				
					
				</tbody></table>
 </BODY>
</HTML>
