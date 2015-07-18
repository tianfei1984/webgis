
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
	<!--下拉树的配置,三个文件不能缺少-->	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

<script>

$().ready(function() {
		 $("#EntityForm").validate();

		 var mesasge = "${message}";
			if(mesasge.length > 0)
			{
				//保存成功后，刷新主窗口数据
				 window.parent.refreshDataWindow();
			}
	  $('#checkStartTime').datetimepicker({
						datepicker:false,
						format:'H:i',
						step:5
				  });
	  $('#checkEndTime').datetimepicker({
						datepicker:false,
						format:'H:i',
						step:5
				  });
});
</script>
 <BODY>
	<form id="EntityForm" name="EntityForm" 
			action='<c:url value="/vehicle/savePlatformInfo.action" />' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					基本信息<span class="MessageFromServer">${message}</span></td>
			</tr>
			
			
				<td align=right>平台名称:</td>
				<td align="left"><input type="text" name="name" size="20" maxlength="10" value="${entity.name}" id="name" class="required"  /></td>
				<td align=right>平台中心ID:</td>
				<td align="left"><input type="text" name="platformId" size="20" maxlength="10"   value="${entity.platformId}" class="required digits"/><span
					></td>
			</tr>
			
			<tr>
				<td  align=right>用户账号:</td>
				<td align="left"><input type="text" name="userId" size="20" maxlength="30" value="${entity.userId}" id="userId" class="required digits"/>
               </td>
			   <td  align=right>密码:</td>
				<td align="left"><input type="text" name="password" size="20" maxlength="30" value="${entity.password}" id="password" class="required" /></td>
			</tr>
			<tr>
				<td  align=right>从链路服务器IP:</td>
				<td align="left"><input type="text" name="sublinkServerIp" size="20" maxlength="18" value="${entity.sublinkServerIp}" id="sublinkServerIp" /></td>
				<td  align=right>从链路服务器端口:</td>
				<td>
				<input type="text" name="sublinkPort" size="20" maxlength="30" value="${entity.sublinkPort}" id="sublinkPort" />
				</td>
			</tr>
			<tr>
				<td  align=right>查岗开始时间:</td>
				<td align="left"><input type="text" name="checkStartTime" size="20" maxlength="12" value="${entity.checkStartTime}" id="checkStartTime" class="required" readonly> </td>
				<td  align=right>查岗结束时间:</td>
				<td align="left"><input type="text" name="checkEndTime" size="20" maxlength="12" value="${entity.checkEndTime}" id="checkEndTime" class="required" readonly/></td>
			</tr>
		
			<tr>
				<td  align=right>查岗时间间隔:</td>
				<td align="left">
				<input type="text" name="checkInterval" size="20" maxlength="12" value="${entity.checkInterval}" id="checkInterval" class="required digits"  />(秒)
				</td>
				
			</tr>
			
			<tr>
						<td colspan="4" align="center">
							<div align="center">
								<input type="submit" class="bar-button" value="保存">
							</div></td>
					</tr>
			
		
		</table>
 </BODY>
</HTML>
