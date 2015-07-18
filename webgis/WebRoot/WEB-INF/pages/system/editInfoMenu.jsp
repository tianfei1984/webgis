
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<script>
$().ready(function() {
 $("#entityForm").validate(); //初始化验证信息

 
});
</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/system/saveInfoMenu.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
					<input type="hidden" name="parent"
					value="InfoMenu"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">基础信息
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">信息类型ID:</td>
						<td align="left"><input  id="name" value="${entity.code}"
						name="code" class="required digits" maxlength="10"  size="6">  (只能输入整数)
						</td>
					</tr>
					<tr>
						<td align="right">类型名称:</td>
						<td align="left"><input id="name" name="name" value="${entity.name}" maxlength="16" size="20"  class="required">
						</td>
					</tr>
	                 <tr>
						<td align="right">备注:</td>
						<td align="left"><input id="name" name="remark" value="${entity.remark}" maxlength="16" size="20"  class="">
						</td>
					</tr>
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="sendjson" >保存</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
