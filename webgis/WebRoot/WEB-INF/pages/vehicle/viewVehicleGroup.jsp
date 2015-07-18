<%@ include file="/common/taglibs.jsp"%>

<head>
<meta name="heading" content="<fmt:message key='vehicle.group.info'/>" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/styles/calendar-aqua/theme.css" />
<script src="${ctx}/myscripts/calendar/calendar.js"></script>
<script src="${ctx}/myscripts/calendar/lang/cn_utf8.js"></script>
<script src="${ctx}/myscripts/calendar/calendar-setup.js"></script>
<script src="${ctx}/scripts/corp.js"></script>

<script type="text/javascript">
	/*
	 var currVehicleGroupId = '<s:property value="%{vehicleGroupInfo.id}"/>';
	 var url = '<c:url value="/goss_data/vehicleGroupsTreeXml.action"></c:url>';
	 if (currVehicleGroupId != "") {
	 url = '<c:url value="/goss_data/vehicleGroupsTreeXml.action"></c:url>?currVehicleGroupId='
	 + currVehicleGroupId;
	 }
	 $(function() {
	 $('#parentGroupSelectLayer').tree({
	 checkbox : false,
	 url : url,
	 onClick : function(node) {
	 //$(this).tree('toggle', node.target);
	 //alert("node.id=="+node.id);
	 $("#parentGroupId").val(node.id);
	 },
	 onContextMenu : function(e, node) {
	 e.preventDefault();
	 //$('#parentGroupSelectLayer').tree('select', node.target);
	 }
	 });
	 });
	 */
</script>
</head>

<div>
	<table width="100%" class="table">
		<tr>
			<td width="20%"><fmt:message key="vehicleGroupInfo.name"></fmt:message>:</td>
			<td align="left"><s:property value="%{vehicleGroupInfo.name}" />
			</td>
			<td align="right" width="20%"><fmt:message
					key="vehicleGroupInfo.type"></fmt:message> :</td>
			<td><s:property
					value="%{fetchVechileGroupType(vehicleGroupInfo.type)}" /></td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.memNo"></fmt:message>:</td>
			<td align="left"><s:property value="%{vehicleGroupInfo.memNo}" />
			</td>
			<td><fmt:message key="vehicleGroupInfo.id"></fmt:message>:</td>
			<td align="left"><s:property
					value="%{vehicleGroupInfo.id % 1000000}" />
			</td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.roadPermitWord"></fmt:message>:</td>
			<td align="left"><s:property
					value="%{vehicleGroupInfo.roadPermitWord}" /></td>
			<td><fmt:message key="vehicleGroupInfo.roadPermitNo"></fmt:message>:</td>
			<td align="left"><s:property
					value="%{vehicleGroupInfo.roadPermitNo}" /></td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.businessScope"></fmt:message>:</td>
			<td align="left"><s:property
					value="%{vehicleGroupInfo.businessScope}" /></td>
			<td><fmt:message key="vehicleGroupInfo.regionId"></fmt:message>:</td>
			<td align="left"><s:property
					value="%{fetchRegionName(vehicleGroupInfo.regionId)}" /></td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.assoMan"></fmt:message>:</td>
			<td align="left"><s:property value="%{vehicleGroupInfo.assoMan}" />
			</td>
			<td><fmt:message key="vehicleGroupInfo.assoTel"></fmt:message>:</td>
			<td align="left"><s:property value="%{vehicleGroupInfo.assoTel}" />
			</td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.parent"></fmt:message>:</td>
			<td align="left" colspan="3"><s:property
					value="%{vehicleGroupInfo.parentVehicleGroupInfo.name}" /></td>
		</tr>
		<tr>
			<td><fmt:message key="vehicleGroupInfo.remark"></fmt:message>:</td>
			<td align="left" colspan="3"><s:property
					value="%{vehicleGroupInfo.remark}" /></td>
		</tr>
	</table>

	<div align="center">
		<c:if test="${not empty backUrl}">
			<input type="button" class="bar-button"
				onclick="document.location.href='${backUrl}'"
				value="<fmt:message key="button.cancel"></fmt:message>" />
		</c:if>
	</div>
</div>


<script type="text/javascript">
	function select(parentGroupId, nodes) {
		for ( var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			//alert(node.id+","+parseInt($("#parentGroupId").val()));
			if (node.id == parseInt($("#parentGroupId").val())) {
				$("#parentGroupSelectLayer").tree("select", node.target);
				return;
			} else {
				var childs = $("#parentGroupSelectLayer").tree("getChildren",
						node.target);
				select(node.id, childs);
			}
		}
	}
	function selectParentVehicleGroup(parentGroupId) {
		var roots = $("#parentGroupSelectLayer").tree("getRoots");
		select(parentGroupId, roots);
	}

	function init() {
		//alert("parentGroupId=="+$("#parentGroupId").val());
		if (parseInt($("#parentGroupId").val()) > 0) {
			selectParentVehicleGroup($("#parentGroupId").val())
		}
	}
	$(function() {
		//
		window.setTimeout("init();", 1000);
	});
</script>
