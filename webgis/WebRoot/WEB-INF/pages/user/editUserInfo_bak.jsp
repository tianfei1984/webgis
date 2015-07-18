<%@page import="com.ltmonitor.entity.Role"%>
<%@page import="java.util.List"%>
<%@ include file="/common/taglibs.jsp"%>

<head>
<meta name="heading" content="<fmt:message key='user.info.manager'/>" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/styles/calendar-aqua/theme.css" />
<script src="${ctx}/myscripts/calendar/calendar.js"></script>
<script src="${ctx}/myscripts/calendar/lang/cn_utf8.js"></script>
<script src="${ctx}/myscripts/calendar/calendar-setup.js"></script>
<script src="${ctx}/scripts/corp.js"></script>

<script type="text/javascript">
	var vechileGroupTreeUrl = '<c:url value="/goss_data/userBindVehicleGroupsTreeJson.action"></c:url>';
	var funcTreeUrl = '<c:url value="/goss_data/userSelectFuncTreeJson.action"></c:url>';

	$(function() {
		$('#userVechileLayer').tree({
			checkbox : true,
			cascadeCheck : true,
			url : vechileGroupTreeUrl,
			onClick : function(node) {
				$(this).tree('toggle', node.target);
			},
			onContextMenu : function(e, node) {
				e.preventDefault();
				//$('#parentGroupSelectLayer').tree('select', node.target);
			}
		});
		
		window.setTimeout("settingSysfuncs()", 3000);
		window.setTimeout("settingVechileGroup()", 3000);
	});
</script>
</head>
<s:form action="saveUserInfo" method="post" validate="false"
	onsubmit="return checkForm()">
	<s:hidden key="parentVehicleGroupInfoId" id="parentGroupId"></s:hidden>
	<div>
		<table width="100%" class="table">
			<tr>
				<td><fmt:message key="userInfo.role"></fmt:message>:</td>
				<td align="left"><c:if test="${userInfo.id==null}">
						<s:select name="roleId" id="roleId" list="roles"
							listKey="id" listValue="description" onchange="roleChange()"
							cssStyle="width:200px;"></s:select>
					</c:if> <c:if test="${userInfo.id!=null}">
						<s:select value="%{roleId}" id="roleId" list="roles"
							listKey="id" listValue="description" disabled="true"
							cssStyle="width:200px;"></s:select>
						<s:hidden key="roleId"></s:hidden>
					</c:if></td>
				<td align="right">&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td><fmt:message key="userInfo.name"></fmt:message>:</td>
				<td align="left"><s:if test="%{userInfo.id!=null}">
						<s:textfield key="userInfo.name" maxLength="10" readonly="true"
							cssStyle="width:200px;"></s:textfield>
						<s:hidden key="userInfo.id"></s:hidden>
						<s:hidden key="userId"></s:hidden>
						<s:hidden key="userInfo.creator"></s:hidden>
					</s:if> <s:else>
						<s:textfield key="userInfo.name" maxLength="10"
							cssStyle="width:200px;"></s:textfield><span class="required">*</span>
					</s:else>
				</td>
				<td align="right"><fmt:message key="userInfo.useState"></fmt:message>
					:</td>
				<td><s:select key="userInfo.useState" list="%{useStateMap}"
						listKey="key" listValue="value" theme="simple" required="true"
						cssStyle="width:200px;">
					</s:select>
				</td>
			</tr>
			<tr>
				<td><fmt:message key="userInfo.password"></fmt:message>:</td>
				<td align="left"><s:password key="userInfo.password"
						maxLength="16" showPassword="true" cssStyle="width:200px;" /></td>
				<td><fmt:message key="userInfo.password1"></fmt:message>:</td>
				<td align="left"><s:password key="password1" maxLength="16"
						showPassword="true" cssStyle="width:200px;" /></td>
			</tr>

			<tr>
				<td><fmt:message key="userInfo.sysFunc"></fmt:message>:</td>
				<td align="left">
				<%
					List<Role> roles = (List<Role>)request.getAttribute("roles");
							int i = 0;
							for(;i<roles.size();i++)
							{
								Role role = roles.get(i);
				%>
					<div id="sysFuncLayer<%=role.getEntityId()%>"
						class="easyui-tree"
						style="height: 200px; overflow: auto; background-color: rgb(240, 240, 240);">
					</div>
				<%
					}
				%>
				<span class="required">*</span>
				</td>
				<td><fmt:message key="userInfo.userVechileGroup"></fmt:message>:</td>
				<td align="left"><div id="userVechileLayer" class="easyui-tree"
						style="height: 200px; overflow: auto; background-color: rgb(240, 240, 240);">
					</div>
					<span class="required">*</span>
				</td>
			</tr>

			<tr>
				<td><fmt:message key="userInfo.remark"></fmt:message>:</td>
				<td align="left" colspan="3"><s:textarea key="userInfo.remark"
						rows="5" cols="80"></s:textarea></td>
			</tr>

		</table>
		<s:hidden key="checkSysfuncsStr" id="checkSysfuncsStr"></s:hidden>
		<s:hidden key="userVechileGroupStr" id="userVechileGroupStr"></s:hidden>
		<div align="center">
			<input type="button"
				onclick="document.location.href='${ctx}/goss_user/userInfoList.action'"
				class="bar-button"
				value="<fmt:message key="button.cancel"></fmt:message>" />
			<s:submit value="%{getText('button.save')}" cssClass="bar-button"></s:submit>
		</div>
	</div>
</s:form>

<script type="text/javascript">
$(function() {	
	//alert("roleId="+roleId);
	
	<%List<Role> roles = (List<Role>)request.getAttribute("roles");
		int i = 0;
		Role role1 = roles.get(0);%>
		var	roleId_1 = '${roleId}';
	<%for(i=0;i<roles.size();i++)
		{
			Role role = roles.get(i);%>
	$('#sysFuncLayer<%=role.getEntityId()%>').tree({
		checkbox : true,
		url : funcTreeUrl + "?roleId=<%=role.getEntityId()%>",
		onClick : function(node) {
			$(this).tree('toggle', node.target);
		},
		onContextMenu : function(e, node) {
			e.preventDefault();
		}
	});
	$('#sysFuncLayer'+<%=role.getEntityId()%>).tree("collapseAll");
	
	if(roleId_1==<%=role.getEntityId()%>)
	{
		$('#sysFuncLayer'+<%=role.getEntityId()%>).show();
	}
	else
	{
		$('#sysFuncLayer'+<%=role.getEntityId()%>).hide();
	}
	<%}%>
});

	function checkForm() {
		var objs = $('#sysFuncLayer'+$("#roleId").val()).tree("getChecked");
		var checkSysfuncsStr = "";
		for ( var i = 0; i < objs.length; i++) {
			checkSysfuncsStr += objs[i].id + ",";
		}
		//alert(checkSysfuncsStr);
		$("#checkSysfuncsStr").val(checkSysfuncsStr);

		var objs = $('#userVechileLayer').tree("getChecked");
		var userVechileGroupStr = "";
		for ( var i = 0; i < objs.length; i++) {
			userVechileGroupStr += objs[i].id + ",";
		}
		//alert(userVechileGroupStr);

		$("#userVechileGroupStr").val(userVechileGroupStr);

		return true;
	}

	function settingVechileGroup() {
		var userFuncs = $("#userVechileGroupStr").val();
		var funcs = userFuncs.split(',');
		var map = new Map();
		$.each(funcs, function(i, funcsId) {
			//$('#sysFuncLayer').tree("check", true);
			map.put(funcsId, funcsId);
		});

		var roots = $("#userVechileLayer").tree("getRoots");

		for ( var i = 0; i < roots.length; i++) {
			var root = roots[i];
			if (map.get(root.id) != null) {
				$("#userVechileLayer").tree("check", root.target);
			} else {
				var childs = $("#userVechileLayer").tree("getChildren",
						root.target);
				for ( var j = 0; j < childs.length; j++) {
					var child = childs[j];
					if (map.get(child.id) != null) {
						$("#userVechileLayer").tree("check", child.target);
					}
				}
			}
		}
	}
	function settingSysfuncs() {
		//alert("ttt="+$("#checkSysfuncsStr").val())
		var userFuncs = $("#checkSysfuncsStr").val();
		//alert("userFuncs="+userFuncs);
		var funcs = userFuncs.split(',');
		var map = new Map();
		$.each(funcs, function(i, funcsId) {
			//$('#sysFuncLayer').tree("check", true);
			map.put(funcsId, funcsId);
		});
		//alert("#sysFuncLayer${roleId}");
		var roots = $("#sysFuncLayer${roleId}").tree("getRoots");
		for ( var i = 0; i < roots.length; i++) {
			var root = roots[i];
			if (map.get(root.id) != null) {
				$("#sysFuncLayer${roleId}").tree("check", root.target);
			} else {
				var childs = $("#sysFuncLayer")
						.tree("getChildren", root.target);
				for ( var j = 0; j < childs.length; j++) {
					var child = childs[j];
					if (map.get(child.id) != null) {
						$("#sysFuncLayer${roleId}").tree("check", child.target);
					}
				}
			}
		}

	}

	function roleChange()
	{
		var id = $("#roleId").val();
		<%for(i=0;i<roles.size();i++)
		{
			
			Role role = roles.get(i);%>
			if(id == <%=role.getEntityId()%>)
			{
				$('#sysFuncLayer'+<%=role.getEntityId()%>).show();
			}
			else
			{
				$('#sysFuncLayer'+<%=role.getEntityId()%>).hide();
			}
		<%
		}
		%>
	}
</script>
