
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<script>
	$().ready(function() {
		$("#entityForm").validate({
			submitHandler:function(form){
				$("#oldPsd").val(hex_md5($("#oldPsd").val()));
				$("#newPsd").val(hex_md5($("#newPsd").val()));
				$("#confirmPsd").val(hex_md5($("#confirmPsd").val()));
				form.submit();
			}
		}); //初始化验证信息
		var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
		//ajax填充下拉框数据 填充监听类型 选项
		$("#listenType").lookup({
			category : "ListenTerminal",
			selectedValue : defaultRoleId
		});
	});
</script>
<BODY>
	<form id="entityForm" name="entityForm"
		action='<%=ApplicationPath%>/user/updatePassword.action' method="POST" >

		<table width="100%" class="TableBlock">
			<tbody>
				<tr>
					<td colspan="2" style="font-weight: bold; background: #EFEFEF;"
						height="25">修改用户密码 <span style="color:red;background:blue;">${message}</span>
					</td>
				</tr>
				<tr>
					<td align="right">旧密码:</td>
					<td><input type="password" id="oldPsd" name="oldPsd"
						class="required" value="" maxlength="32" size="32" minlength="6">
					</td>
				</tr>
				<tr>
					<td align="right">输入新密码:</td>
					<td><input type="password" id="newPsd" name="newPsd"
						class="required" value="" maxlength="32" size="32" minlength="6">
					</td>
				</tr>
				<tr>
					<td align="right">重复新密码:</td>
					<td><input type="password" id="confirmPsd" name="confirmPsd"
						value="" maxlength="32" size="32"
						class="required {equalTo:'#newPsd'}" minlength="6">
					</td>
				</tr>
				<tr>
					<td colspan=2 align="center"><button type="submit"
							class="sendjson">更新密码</button>
					</td>
				</tr>
			</tbody>
		</table>
</BODY>
<script type="text/javascript" src="<c:url value="/js/md5.js" />"></script>
</HTML>
