
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
<style>
<!-- 控制宽度的自动适应 -->
<style type="text/css">
.comments {
 width:100%;/*自动适应父布局宽度*/
 overflow:auto;
 word-break:break-all;/*在ie中解决断行问题(防止自动变为在一行显示，主要解决ie兼容问题，ie8中当设宽度为100%时，文本域类容超过一行时，当我们双击文本内容就会自动变为一行显示，所以只能用ie的专有断行属性“word-break或word-wrap”控制其断行)*/
}
</style>
<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息

	 $("#configType").lookup({category:"infomenu"});
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
			action='<%=ApplicationPath%>/command/sendInformation.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">文本信息
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">信息类型
							:</td>
						<td>
						    <select id="configType" name="configType" class="required"></select>
						</td>
					</tr>
					<tr>
						<td align="right">下发内容:</td>
						<td >
						   <textarea name="textContent" class="required" rows=6 cols=50  ></textarea>
						</td>
					<tr>
						<td colspan=2 align="center">
						   <input type="submit" class="sendjson" value="发送">
						   <span class="commandMsg"></span></td>
					</tr>
						
					</tr>

				
					
				</tbody></table>
 </BODY>
</HTML>
