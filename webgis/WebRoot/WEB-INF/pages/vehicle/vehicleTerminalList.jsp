<%@ include file="/common/taglibs.jsp"%>

<head>
<title><fmt:message key="vehilceTermial.manager" />
</title>
<meta name="heading"
	content="<fmt:message key='vehilceTermial.manager'/>" />
</head>
<c:set var="excelFileName">
	<fmt:message key="vehicle.info.list"></fmt:message>
	<s:property value="%{fetchSystemTime()}" />.xls
</c:set>
<c:set var="buttons">
	<c:if test="${systemConfig.driverschoolFlag!=1}">
		<input type="button" class="bar-button"
			onclick="location.href='<c:url value="/goss_vehicle/editVehicleTerminal.action"/>'"
			value="<fmt:message key="button.add"/>" />
	</c:if>
	<input type="button" class="bar-button" onclick="edit()"
		value="<fmt:message key="button.edit"/>" />
	<input type="button" class="bar-button" onclick="remove()"
		value="<fmt:message key="button.delete"/>" />
	<input type="button" class="bar-button" onclick="bindDriverInfo()"
		value="<fmt:message key="button.bind.driver"/>" style="display: none;" />
</c:set>
<div>
	<s:form action="vehicleTerminalList" method="post" validate="false">
		<table class="query-table">
			<tr>
				<td><fmt:message key="vehicleTerminal.termNo"></fmt:message>:</td>
				<td align="left"><s:textfield key="termNo"></s:textfield>
				</td>
				
				<td><fmt:message key="vehicleTerminal.devNo"></fmt:message>:</td>
				<td align="left"><s:textfield key="devNo"></s:textfield>
				</td>
				
				<td><fmt:message key="siminfo.code"></fmt:message>:</td>
				<td align="left"><s:textfield key="sminfoCode"></s:textfield>
				</td>				
				
			</tr>
			<tr>
				<td><fmt:message key="vehicleTerminal.bindFlag"></fmt:message>
				</td>
				<td><s:select cssStyle="width: 150px;" name="bindFlag"
						list="#{'-1':getText('vehicleTerminal.bindFlag.-1'),'0':getText('vehicleTerminal.bindFlag.0'),'1':getText('vehicleTerminal.bindFlag.1')}"></s:select>
				</td>
				<td><fmt:message key="vehicleTerminal.state"></fmt:message>
				</td>
				<td colspan="3"><s:select cssStyle="width: 150px;" name="state"
						list="#{'-1':getText('vehicleTerminal.state.-1'),'0':getText('vehicleTerminal.state.0'),'1':getText('vehicleTerminal.state.1'),'2':getText('vehicleTerminal.state.2'),'3':getText('vehicleTerminal.state.3')}"></s:select>
				</td>
				
				
			</tr>
			<tr>
				<td colspan="8">
					<div align="right">
						<s:submit value="%{getText('button.query')}" cssClass="bar-button"></s:submit>
					</div>
				</td>
			</tr>
		</table>
	</s:form>
</div>
<div>
	<display:table name="vehicleTerminals" cellspacing="0" cellpadding="0"
		requestURI="" id="vehicleTerminal" class="table" partialList="false"
		pagesize="${pagesize}" export="true">
		<display:column property="termNo" titleKey="vehicleTerminal.termNo">
		</display:column>
		<display:column property="devNo" titleKey="vehicleTerminal.devNo" />
		<display:column titleKey="vehicleTerminal.termType">
			<fmt:message
				key="vehicleTerminal.termType.${vehicleTerminal.termType}"></fmt:message>
		</display:column>
		<display:column property="siminfo.code" titleKey="siminfo.code" />
		
		<display:column titleKey="vehicleTerminal.bindFlag">
			<fmt:message
				key="vehicleTerminal.bindFlag.${vehicleTerminal.bindFlag}"></fmt:message>
		</display:column>

		<display:column titleKey="vehicleTerminal.state">
			<fmt:message key="vehicleTerminal.state.${vehicleTerminal.state}"></fmt:message>
		</display:column>

		<display:column titleKey="menu.select" media="html">
			<input type="radio" name="selectId"
				onclick="selectRow(${vehicleTerminal.id})" />
		</display:column>
		<display:setProperty name="export.excel.filename"
			value="${excelFileName}" />
	</display:table>
</div>
<div>
	<c:out value="${buttons}" escapeXml="false" />
</div>
<script type="text/javascript">
$('input:radio[name="selectId"]').change(function(){
	$(this.parentNode.parentNode).css("background-color", "yellow")
	$(this.parentNode.parentNode).siblings().css("background-color", "white");
}); 
	var rowId = "";
	var vehicleId = "";
	function selectRow(obj,obj2)
	{
		rowId = obj;		
	}

	function edit() {
		if (rowId) {
			document.location.href = "${ctx}/goss_vehicle/editVehicleTerminal.action?vehicleTerminalId="
					+ rowId;
		} else {
			alert('<fmt:message key="please.select.record"></fmt:message>');
		}
	}

	function remove() {
		if (rowId) {
			if (window
					.confirm('<fmt:message key="delete.confirm"></fmt:message>')) {
				document.location.href = "${ctx}/goss_vehicle/removeVehicleTerminal.action?vehicleTerminalId="
						+ rowId;
			}
		} else {
			alert('<fmt:message key="please.select.record"></fmt:message>');
		}

	}

	function bindDriverInfo()
	{
		if (vehicleId) {
			document.location.href = "${ctx}/goss_vehicle/fitting2DriverInfoList.action?vehicleId="
				+ vehicleId;
		} else {
			alert('<fmt:message key="please.select.record"></fmt:message>');
		}
	}

	function queryDriverInfoDetail(id)
	{
		document.location.href='driverInfoDetails.action?backUrl=fittingList.action&driverInfoId='+id;
	}
</script>