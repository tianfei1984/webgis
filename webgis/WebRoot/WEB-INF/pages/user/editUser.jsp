
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<!--下拉树的配置-->

<script>


var treeManager = null;
$().ready(function() {
		 $("#entityForm").validate({
		 	submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
		 		if($.trim($("#password").val()) != ''){
		 		$("#confirmPassword").val(hex_md5($("#confirmPassword").val()))
		 		$("#password").val(hex_md5($("#password").val()))
		 		}
            	form.submit();   //提交表单   
         	}
		 }); //初始化验证信息
		 treeManager = $("#depTree");
	     var treeUrl = globalConfig.webPath + "/vehicle/depMenu.action?userId=${entity.entityId}";
	     treeManager.tree({checkbox:true,lines:true,url:treeUrl,onCheck:onCheck,treeHeight:150});

		 
         //创建默认部门下拉菜单, 参数是下拉框id和 默认的部门id
	     Utility.createDepTree("regionId", ${entity.regionId});

	     treeManager.tree('collapseAll');

		 var defaultRoleId = "${roleId}";//${roleId}; //取出当前车辆的车牌颜色，默认选中
		//ajax填充下拉框数据 角色下拉框
		 $("#roleId").lookup({queryID:"selectRoleList", selectedValue:defaultRoleId});
		 //用户状态下拉框
		 $("#userState").lookup({category:"UserState", selectedValue:"${entity.userState}"});
		 //创建下拉树菜单, 参数是 输入选择框，菜单, 和ajax 数据URL
		 //createCheckTree($("#strDepId"), $("#treeMenu"), "<%=ApplicationPath%>/data/depMenu.action?userId=${entity.entityId}");
		 var mesasge = "${message}";
		if(mesasge.length > 0)
		{
			//保存成功后，刷新主窗口数据
			 window.parent.refreshDataWindow();
		}
		$("#filterDepId").change(function()
		{
			doFilterDep();
		});
});


function onCheck(node,checked)
{
	 var treeManager = $("#depTree");
	var nodes = treeManager.tree('getChecked');
    var s = '';
	//alert(nodes.length);
    for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		//if(node.leaf)
		//{
        s += node.id+",";
		//}
		//if(node.id == "117440526")
			//alert(1)
    }
	if(nodes.length == 0)
	{
		s = 'clear';
	}
	$("#strDepId").val(s);
}



function findDepByName()
{
	var depName = $("#filterDepName").val();
    $("#filterDepId").lookup({queryID:"selectDepList", depName:depName,callback:onFindDepCallBack});
}

function onFindDepCallBack(result)
{
	if(result && result.length > 0)
	{
		var data = result[0];
		//下拉框的第一项目默认选中
		$("#filterDepId option").eq(1).attr('selected', 'selected');
		doFilterDepByDepId(data.code);
	}
}


function doFilterDepByDepId(depid)
{
	var depNode = treeManager.tree("find",depid);
	if(depNode != null)
	{
		treeManager.tree("select", depNode.target);

		expandParent(depNode);
	}
	
	var rootNode = treeManager.tree("find",0);
	if(rootNode != null)
	{
		treeManager.tree("expand", rootNode.target);
	}
}

function doFilterDep()
{
	treeManager.tree("collapseAll");
	//treeManager.tree("expandAll");
	var depid = $("#filterDepId").val();
	doFilterDepByDepId(depid);
	
}

function expandParent(node)
{
	if(node.pid != null && node.pid.length > 0)
	{
	    var depNode = treeManager.tree("find", node.pid);
		if(depNode != null)
		{
		    treeManager.tree("expand", depNode.target);
		    expandParent(depNode);
		}
	}
}

//选择用户所属部门
function doSelectDep()
{
	InfoWindow.selectDep();
}
//当选择用户事件发生时
function onDepSelected(depId,depName)
{
	$("#regionId").combotree("setValue", depId);
}

</script>
<BODY>
	<form id="entityForm" name="entityForm"
		action='<%=ApplicationPath%>/user/saveUser.action' method="POST">
		<input type="hidden" name="entityID" value="${entity.entityId}" /> <input
			type="hidden" name="strDepId" id="strDepId" value="${strDepId}" />
		<table width="100%" class="TableBlock">
			<tbody>
				<tr>
					<td colspan="4" style="font-weight: bold; background: #EFEFEF;"
						height="25">用户信息 <span class="MessageFromServer">${message}</span>
					</td>
				</tr>
				<tr>
					<td align="right">用户名称:</td>
					<td align="left"><input id="name" value="${entity.name}"
						name="name" class="required" maxlength="15" size="20"></td>
					<td align="right">角色 :</td>
					<td><select id="roleId" style="width: 150px;" name="roleId"
						class="required">
					</select></td>
				</tr>
				<tr>
					<td align="right">登录名:</td>
					<td align="left"><input id="loginName" name="loginName"
						class="required" value="${entity.loginName}" maxlength="16"
						size="20"></td>

					<td align="right">状态:</td>
					<td align="left"><select id="userState" style="width: 150px;"
						name="userState">
					</select></td>

				</tr>

				<tr>
					<c:choose>
						<c:when test="${entity.entityId == 0}">
							<td align="right">密码:</td>
							<td align="left"><input type="password" id="password"
								name="password" value="${entity.password}" minlength="6"
								maxlength="32" size="32" class="required"></td>
		
							<td align="right">确认密码:</td>
							<td align="left"><input type="password" id="confirmPassword"
								name="confirmPassword" value="${entity.password}" maxlength="32"
								size="32" class="{equalTo:'#password'}"></td>
						</c:when>
						<c:otherwise>
							<td align="right">密码:</td>
							<td align="left"><input type="password" id="password"
								name="password"  minlength="6" maxlength="32" size="32" ></td>
							<td align="right">确认密码:</td>
							<td align="left"><input type="password" id="confirmPassword"
								name="confirmPassword" maxlength="32" size="32" class="{equalTo:'#password'}"></td>
						</c:otherwise>
					</c:choose>
				</tr>
				<tr>
					<td align="right">所属部门:</td>
					<td align="left"><select id="regionId" style="width: 150px;"
						name="regionId" value=""></select> <a id="btnSelectVehicle"
						href="#" class="easyui-linkbutton"
						data-options="iconCls:'icon-search'" onclick="doSelectDep();"></a>
					</td>

					<td align="right">联系电话:</td>
					<td><input id="phoneNo" value="${entity.phoneNo}"
						name="phoneNo" maxlength="19" size="20" class="digits"></td>
				</tr>

				<tr>
					<td align="right">绑定车辆组:</td>
					<td align="left" colspan=3>
						<div id="" style="background-color:#99CCFF">
							<input type="text" name="filterDepName" id="filterDepName"
								value="" /> <select id="filterDepId" name="filterDepId"
								style="width:120px" /> <input type="button" value="部门名称模糊查询"
								onclick="findDepByName();" />

						</div>
						<div style="height:180px;overflow:auto;">
							<ul id="depTree"></ul>
						</div></td>
				</tr>
				<tr>
					<td colspan=4 align=center>
						<button type="submit" class="sendjson">保存</button></td>
				</tr>
			</tbody>
		</table>
</BODY>
<script type="text/javascript" src="<c:url value="/js/md5.js" />"></script>
</HTML>
