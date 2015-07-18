<%@ include file="/common/taglibs.jsp"%>

<head>
<meta name="heading" content="<fmt:message key='batch.save.data'/>" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/styles/calendar-aqua/theme.css" />
<script src="${ctx}/myscripts/calendar/calendar.js"></script>
<script src="${ctx}/myscripts/calendar/lang/cn_utf8.js"></script>
<script src="${ctx}/myscripts/calendar/calendar-setup.js"></script>
<script src="${ctx}/scripts/corp.js"></script>

<script type="text/javascript">
	function valid_vehicle_group()
	{
		var val = document.getElementById("vehicleGroupFile");
		if(val.value == "" ) {
			alert("<fmt:message key='not.upload.group.file'/>");
			return false;
		}				
		return true;
	}

	function valid_fitting()
	{
		var val = document.getElementById("fittingFile");
		if(val.value == "" ) {
			alert("<fmt:message key='not.upload.fitting.file'/>");
			return false;
		}				
		return true;
	}	
</script>
</head>
<br />
<s:form name="vehicleGroupUploadForm" id="vehicleGroupUploadForm" action="batchSaveVehicleGroup" onSubmit="return valid_vehicle_group()"  method="post"
	validate="false" enctype="multipart/form-data">
	<div class="buttonBar right">
		<c:set var="buttons">
			<s:submit key="button.save" method="batchSaveVehicleGroup" theme="simple" cssClass="bar-button" />
		</c:set>
	</div>

	<table width="100%" class="table">
		<tr>
			<td><fmt:message key="batch.save.vehicle.group"></fmt:message>:</td>
			<td align="left"><s:file name="image" id="vehicleGroupFile" maxlength="12"  size="30"
					theme="simple" /><fmt:message key="batch.save.vehiclegroup.file.tip"></fmt:message>
					<span class="required">*</span></td>			
		</tr>
		<tr>
			<td align="right" width="15%"><fmt:message key="allow.cover.old.vehiclegroup"></fmt:message>:</td>
			<td><s:checkbox key="allowCoverExistVehicleGroup" /></td>				
		</tr>
	</table>
	<div class="buttom-buttons-bar">
		<c:out value="${buttons}" escapeXml="false" />
	</div>
</s:form>
<br>
<br>
<br>
<br>
<br>
<s:form name="fittingUploadForm" id="fittingUploadForm" action="batchSaveFitting" onSubmit="return valid_fitting()"  method="post"
	validate="false" enctype="multipart/form-data">
	<div class="buttonBar right">
		<c:set var="buttons">
			<s:submit key="button.save" method="batchSaveFitting" theme="simple" cssClass="bar-button" />
		</c:set>
	</div>

	<table width="100%" class="table">
		<tr>
			<td><fmt:message key="batch.save.fitting"></fmt:message>:</td>
			<td align="left"><s:file name="image" id="fittingFile" maxlength="12"  size="30"
					theme="simple" /><fmt:message key="batch.save.fitting.file.tip"></fmt:message>
					<span class="required">*</span></td>			
		</tr>
		<tr>
			<td align="right" width="15%"><fmt:message key="allow.cover.old.fiiting"></fmt:message>:</td>
			<td><s:checkbox key="allowCoverExistFitting" /></td>				
		</tr>
	</table>
	<div class="buttom-buttons-bar">
		<c:out value="${buttons}" escapeXml="false" />
	</div>
</s:form>

<br>







