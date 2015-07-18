
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	 $("#code").lookup({category:"InfoMenu", selectedValue:"${entity.code}"});
	 var mesasge = "${message}";
			if(mesasge.length > 0)
			{
				//保存成功后，刷新主窗口数据
				 window.parent.refreshDataWindow();
			}
 
});
</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/system/saveInformation.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
					<input type="hidden" name="parent"
					value="Information"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">信息发布
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">信息类型:</td>
						<td align="left"><select  id="code" value="${entity.code}"
						name="code" class="required" > 
						</select>
						</td>
					</tr>
					<tr>
						<td align="right">信息:</td>
						<td align="left"><input id="name" name="name" value="${entity.name}" maxlength="16" size="50"  class="required">
						</td>
					</tr>
	
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="button gray medium" >保存</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
