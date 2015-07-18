
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
	<!--下拉树的配置-->
	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

<script>
$().ready(function() {
 $("#entityForm").validate(); //初始化验证信息
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
			action='<%=ApplicationPath%>/vehicle/saveMember.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">业户信息
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">业户名称:</td>
						<td align="left"><input  id="name" value="${entity.name}"
						name="name" class="required" maxlength="10"  size="20"> 
						</td>
						<td align="right">经营范围:</td>
						<td align="left"><input id="businessScope" name="businessScope" value="${entity.businessScope}" maxlength="16" size="20">
						</td>
					</tr>
	<tr>
						<td align="right">联系人:</td>
						<td align="left"><input id="contact" name="contact" value="${entity.contact}" maxlength="16" size="20" class="required">
						</td>
						
						<td align="right">联系电话:</td>
						<td align="left"><input id="contactPhone" name="contactPhone" value="${entity.contactPhone}" class="required" maxlength="16" size="20">
						</td>
					</tr>		
					<tr>
						<td align="right">营业执照:</td>
						<td align="left"><input id="licenseNo" name="licenseNo" value="${entity.licenseNo}" maxlength="16" size="20">
						</td>
						
						<td align="right">组织机构代码证:</td>
						<td align="left"><input id="orgNo" name="orgNo" value="${entity.orgNo}" maxlength="16" size="20">
						</td>
					</tr>
					<tr>
						
						
						<td align="right">地址:</td>
						<td align="left" colspan=3><input id="address" name="address" value="${entity.address}" maxlength="16" size="75">
						</td>
					</tr>
				
					<tr>
					
						<td align="right">备注:</td>
						<td align="left" colspan=3>
						   <textarea rows=2 cols=65 name="remark">${entity.remark}</textarea>
						</td>
					</tr>
					<tr>
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="sendjson" >保存</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
