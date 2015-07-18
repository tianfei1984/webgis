<%@ include file="/common/taglibs.jsp"%>

<head>
<meta name="heading"
	content="<fmt:message key='vehicle.group.manager'/>" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/styles/calendar-aqua/theme.css" />
<script src="${ctx}/myscripts/calendar/calendar.js"></script>
<script src="${ctx}/myscripts/calendar/lang/cn_utf8.js"></script>
<script src="${ctx}/myscripts/calendar/calendar-setup.js"></script>
<script src="${ctx}/scripts/corp.js"></script>

<script type="text/javascript">
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
</script>
</head>
<s:form action="saveVehicleGroup" method="post" validate="false">
	<s:hidden key="vehicleGroupInfo.id"></s:hidden>
	<s:hidden key="parentVehicleGroupInfoId" id="parentGroupId"></s:hidden>
	<div>
		<table width="100%" class="table">
			<tr>
				<td><fmt:message key="vehicleGroupInfo.name"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.name"
						maxLength="20"></s:textfield> <span class="required">*</span></td>
				<td align="right"><fmt:message key="vehicleGroupInfo.type"></fmt:message>
					:</td>
				<td><s:select key="vehicleGroupInfo.type"
						list="%{vechileGroupTypeMap}" listKey="key" listValue="value"
						theme="simple" required="true" cssStyle="width:160px;">
					</s:select></td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.memNo"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.memNo"
						maxLength="16" />
				</td>
				<td><fmt:message key="vehicleGroupInfo.password1"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.password1"
						maxLength="16" />
				</td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.roadPermitWord"></fmt:message>:</td>
				<td align="left"><s:textfield
						key="vehicleGroupInfo.roadPermitWord" maxLength="16" />
				</td>
				<td><fmt:message key="vehicleGroupInfo.roadPermitNo"></fmt:message>:</td>
				<td align="left"><s:textfield
						key="vehicleGroupInfo.roadPermitNo" maxLength="12" />
				</td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.businessScope"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.businessScope"
						maxLength="200" />
				</td>
				<td><fmt:message key="vehicleGroupInfo.regionId"></fmt:message>:</td>
				<td align="left"><s:textfield id="regionId"
						key="vehicleGroupInfo.regionId" maxLength="6" size="20"
						cssClass="easyui-combotree"
						url="${ctx}/goss_data/regionJson.action" cssStyle="width:160px;"></s:textfield>
				</td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.assoMan"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.assoMan"
						maxLength="16" />
				</td>
				<td><fmt:message key="vehicleGroupInfo.assoTel"></fmt:message>:</td>
				<td align="left"><s:textfield key="vehicleGroupInfo.assoTel"
						maxLength="16" />
				</td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.parent"></fmt:message>:</td>
				<td align="left" colspan="3"><div id="parentGroupSelectLayer"
						class="easyui-tree"
						style="height: 150px; overflow: auto; background-color: rgb(240, 240, 240);">
					</div>
				</td>
			</tr>
			<tr>
				<td><fmt:message key="vehicleGroupInfo.remark"></fmt:message>:</td>
				<td align="left" colspan="3"><s:textarea
						key="vehicleGroupInfo.remark" rows="5" cols="80"></s:textarea>
				</td>
			</tr>
		</table>

		<div align="center">
			<s:submit value="%{getText('button.cancel')}" method="cancel"
				cssClass="bar-button"></s:submit>
			<s:submit value="%{getText('button.save')}" cssClass="bar-button"></s:submit>
		</div>
	</div>


</s:form>

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
