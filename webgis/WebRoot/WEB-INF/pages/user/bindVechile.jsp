<%@ include file="/common/taglibs.jsp"%>

<head>
<title><fmt:message key="vehicle.info.manager" />
</title>
<meta name="heading"
	content="<fmt:message key='user.bind.vechile.manager'/>" />
<script type='text/javascript'
	src='${ctx}/dwr/interface/UserDwrService.js'></script>
<script type='text/javascript' src='${ctx}/dwr/engine.js'></script>

</head>
<c:set var="excelFileName">
	<fmt:message key="vehicle.info.list"></fmt:message>
	<s:property value="%{fetchSystemTime()}" />.xls
</c:set>
<c:set var="buttons">
	<input type="button" class="bar-button"
		onclick="location.href='<c:url value="/goss_user/userInfoList.action"/>'"
		value="<fmt:message key="button.cancel"/>" />
</c:set>
<div>
	<div>
		<s:form action="bindVechile" method="post" validate="false">
			<table class="query-table">
				<tr>
					<td><fmt:message key="bind.status"></fmt:message>:</td>
					<td><s:select name="bindStatus" id="bindStatus"
							list="#{1:getText('bind.status.1'),2:getText('bind.status.2')}"
							listKey="key" listValue="value" theme="simple"
							cssStyle="width:100px;" headerKey="-1"
							headerValue="%{getText('please.select')}">
						</s:select>
					</td>
					<td><fmt:message key="user.vhechile.group"></fmt:message>:</td>
					<td><s:select key="vehicleGroupInfoId" id="vehicleGroupInfoId"
							list="%{vehicleGroupInfos}" listKey="id" listValue="name"
							theme="simple" cssStyle="width:100px;" headerKey="-1"
							headerValue="%{getText('please.select')}">
						</s:select> <s:hidden key="userId" id="userId"></s:hidden></td>
				</tr>

				<tr>
					<td colspan="4">
						<div align="right">
							<s:submit value="%{getText('button.query')}"
								cssClass="bar-button"></s:submit>
						</div></td>
				</tr>
			</table>
		</s:form>
	</div>
	<div>
		<display:table name="fittings" cellspacing="0" cellpadding="0"
			requestURI="" id="fitting" class="table" partialList="false"
			pagesize="${pagesize}" export="false">
			<display:column property="vehicleInfo.vehNoCode"
				titleKey="vehicleInfo.vehNoCode" />
			<display:column property="vehicleInfo.vehNoCol"
				titleKey="vehicleInfo.vehNoCol">
			</display:column>
			<display:column titleKey="vehicleInfo.vehicleRacketNo"
				property="vehicleInfo.vehicleRacketNo">
			</display:column>
			<display:column titleKey="vehicleInfo.vehBland"
				property="vehicleInfo.vehBland">
			</display:column>
			<display:column titleKey="vehicleInfo.vehicleRacketNo"
				property="vehicleInfo.vehicleRacketNo">
			</display:column>
			<display:column property="status" titleKey="fitting.status"
				decorator="com.yuweitek.goss.webapp.decorator.FittingStatusColumnDecorator">
			</display:column>
			<display:column titleKey="menu.bind">
				<input type="checkbox"
					onclick="selectVehicleInfo(${fitting.id},this)"
					<c:if test="${fitting.bindFlag}">
						checked
					</c:if> />

			</display:column>
			<display:setProperty name="export.excel.filename"
				value="${excelFileName}" />
		</display:table>
	</div>
</div>

<div>
	<c:out value="${buttons}" escapeXml="false" />
</div>
<script type="text/javascript">
	function selectVehicleInfo(fittingId,obj)
	{
		var callback = function(data)
		{
			if(data>-1)
			{
				alert('<fmt:message key="opr.success"></fmt:message>');
				
			}
			else
			{
				alert('<fmt:message key="opr.fail"></fmt:message>');
				if(obj.checked)
				{
					obj.checked = false;
				}
				else
				{
					obj.checked = true;
				}
			}
		}
		if(obj.checked)
		{
			if(window.confirm('<fmt:message key="user.bind.confirm"></fmt:message>'))
			{
				UserDwrService.saveBindUserVechile(fittingId,${userId},true,callback)
			}
			else
			{
				if(obj.checked)
				{
					obj.checked = false;
				}
				else
				{
					obj.checked = true;
				}
			}
		}
		else
		{
			if(window.confirm('<fmt:message key="user.unbind.confirm"></fmt:message>'))
			{
				UserDwrService.saveBindUserVechile(fittingId,${userId},false,callback)
			}
			else
			{
				if(obj.checked)
				{
					obj.checked = false;
				}
				else
				{
					obj.checked = true;
				}
			}
		}
	}
</script>