
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
	
<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
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
			action='<%=ApplicationPath%>/command/tiredConfig.action' method="POST">
				<!--超速设置-->
        <input type="hidden"  name="operation"  id="operation" value="modify"/>
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">超速设置
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					
					<tr>
						<td align="right">连续驾驶时间门限
							:</td>
						<td>
						<input type="hidden" name="paramId" value="0x0057" />
						<input type="text" id="param_1"   name="paramValue" maxlength="16" size="20"  value="14400"
						   class="required digits">(秒)
						  </td>
					</tr>
					<tr>
						<td align="right">当天累计驾驶时间门限:</td>
						<td >
						<input type="hidden" name="paramId" value="0x0058" />
						<input type="text" id="param_2"   name="paramValue" maxlength="16" size="20"  value="28800"
						   class="required digits">(秒)
						</td>
					</tr>
					<tr>
						<td align="right">最小休息时间:</td>
						<td >
						<input type="hidden" name="paramId" value="0x0059" />
						<input type="text" id="param_2"   name="paramValue" maxlength="16" size="20"  value="7200"
						   class="required digits">(秒)
						</td>
					</tr>
					<tr>

						<td colspan=2 align="center">
						   <input type="submit" class="sendjson" value="设置">
						   <span class="commandMsg"></span></td>
						
					</tr>

				
					
				</tbody></table>
 </BODY>
</HTML>
