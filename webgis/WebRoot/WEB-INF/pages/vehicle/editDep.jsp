
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script>
$().ready(function() {
 $("#entityForm").validate(); //初始化验证信息

 var defaultType="${entity.type}";// ; //取出当前车辆的车牌颜色，默认选中
//ajax填充下拉框数据
 $("#type").lookup({category:"groupType", selectedValue:defaultType});
 Utility.initDatepicker();//初始化日期选择框
 
 //创建下拉部门树
 Utility.createDepTree("parentId", ${entity.parentId});
 

	 var mesasge = "${message}";
			if(mesasge.length > 0)
			{
				//保存成功后，刷新主窗口数据
				 window.parent.refreshDataWindow();
			}
});

//选择用户所属部门
function doSelectDep()
{
	InfoWindow.selectDep();
}
//当选择用户事件发生时
function onDepSelected(depId,depName)
{
	$("#parentId").combotree("setValue", depId);
}


</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/vehicle/saveDep.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">车组信息
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">车组名称:</td>
						<td align="left"><input  id="name" value="${entity.name}"
						name="name" class="required" maxlength="50"  size="20"> 
						</td>
						<td align="right">上级部门:</td>
						<td align="left">
				<select id="parentId" name="parentId" style="width:150px;" value="${entity.parentId}"></select>
				<a id="btnSelectVehicle" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="doSelectDep();"></a>

</td>
					</tr>
					<tr>
						<td align="right">所属业户:</td>
						<td align="left"><input id="memNo" name="memNo" class=""  value="${entity.memNo}" maxlength="16" size="20" >
						</td>
					<td align="right">车组类型:
							:</td>
						<td><select id="type"  style="width: 150px;" name="type" >
						   </select>
						
					</tr>

					<tr>
						<td align="right">经营许可证字:</td>
						<td align="left"><input id="roadPermitWord" name="roadPermitWord" value="${entity.roadPermitWord}" maxlength="16" size="20">
						</td>
						
						<td align="right">经营许可证号:</td>
						<td align="left"><input id="roadPermitNo" name="roadPermitNo" value="${entity.roadPermitNo}" maxlength="16" size="20">
						</td>
					</tr>
					<tr>
						<td align="right">经营范围:</td>
						<td align="left"><input id="businessScope" name="businessScope" value="${entity.businessScope}" maxlength="16" size="20">
						</td>
						
						<td align="right">所属地区:</td>
						<td align="left"><input id="region" name="region" value="${entity.region}" maxlength="16" size="20">
						</td>
					</tr>
					<tr>
						<td align="right">联系人:</td>
						<td align="left"><input id="assoMan" name="assoMan" value="${entity.assoMan}" maxlength="16" size="20">
						</td>
						
						<td align="right">联系电话:</td>
						<td align="left"><input id="assoTel" name="assoTel" value="${entity.assoTel}" maxlength="16" size="20">
						</td>
					</tr>		
					<tr>
					
						<td align="right">备注:</td>
						<td align="left" colspan=3>
						   <textarea rows=2 cols=53 name="remark">${entity.remark}</textarea>
						</td>
					</tr>
					<tr>
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="button gray medium" >保存</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
