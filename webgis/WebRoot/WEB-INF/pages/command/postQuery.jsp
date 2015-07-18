
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
	<!--下拉树的配置-->
	
<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	  Utility.ajaxSubmitForm("entityForm", {
		  success:function(result)
		  {
			    if(result.success)
			  {
					alert("对上级平台应答成功!");
			  }else
			  {
				  alert("应答失败:"+result.message);
			  }
			  
			 window.parent.closeCommandWindow();
		}});

});
</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/postQueryAck.action' method="POST">
				<input type="hidden" name="commandId"
					value="${entity.commandId}"/>
					<input type="hidden" name="infoId"
					value="${entity.infoId}"/>
					<input type="hidden" name="platformId"
					value="${entity.platformId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">上级平台查岗信息
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">查岗对象:</td>
						<td align="left"><input  id="objId" value="${entity.objId}"
						name="objId"  size="20" readonly> 
						</td>
					</tr>
					<tr>
						<td align="right">查岗类型:</td>
						<td align="left">
							<input  id="objType" value="${entity.objType}"
						name="objType"  size="20" readonly> 
                         </td>
					</tr>
					<tr>
						<td align="right">查岗问题:</td>
						<td align="left"><input id="memNo" name="content" class=""  value="${entity.content}"  size="60" readonly>
						</td>
					
						
					</tr>

					<tr>
					
						<td align="right">回答:</td>
						<td align="left" colspan=3>
						   <textarea rows=2 cols=65 name="answer" class="required"></textarea>
						</td>
					</tr>
					<tr>
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="sendjson" >发送给上级平台</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
