
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	 //var now = Utility.today(1);
	 var now = Utility.today();
	 $("#endDate").datetimebox("setValue",now + " 23:59:00");
	 $("#startDate").datetimebox("setValue",now + " 00:00:00");


	 $("#platformCmdType").lookup({category:"JT809Command", selectedValue:1});
	 Utility.ajaxSubmitForm("entityForm");
});
</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/sendPlatformCmd.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;" height="25">监管平台命令
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">操作类型
							:</td>
						<td><select id="platformCmdType"  style="width: 150px;" name="platformCmdType" class="required">
						   </select>
						   </td>
					</tr>					
					<tr>
						<td align="right">时间段:</td>
						<td >
			<input class="easyui-datetimebox" name="startDate" id="startDate"  style="width:160px" required value="" class="required">
							  至
			<input class="easyui-datetimebox" name="endDate" id="endDate"  style="width:160px" required value="" class="required">
					  </td>
					</tr>
					
					<tr>

						<td colspan=2 align="center"><button type="submit" class="sendjson" >发送</button> </td>
						
					</tr>

				
					
				</tbody></table>
 </BODY>
</HTML>
