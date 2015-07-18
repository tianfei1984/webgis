
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script>

$().ready(function() {
		 $("#EntityForm").validate();
		 
		//ajax填充下拉框数据
		 $("#funcType").lookup({category:"FunctionType", selectedValue:"${entity.funcType}"});//终端类型
         $("#parentId").lookup({queryID:"selectRootMenus", selectedValue:"${entity.parentId}"});


		 var mesasge = "${message}";
			if(mesasge.length > 0)
			{
				//保存成功后，刷新主窗口数据
				 window.parent.refreshDataWindow();
			}
});
</script>
 <BODY>
	<form id="EntityForm" name="EntityForm" 
			action='<c:url value="/system/saveFunc.action" />' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					基本信息<span class="MessageFromServer">${message}</span></td>
			</tr>
			
			
				<td align=right>权限名称:</td>
				<td align="left"><input type="text" name="descr" size="20" maxlength="10" value="${entity.descr}" id="name" class="required"  /></td>
				<td align=right>权限类型:</td>
				<td align="left">
				   <select name="funcType" id="funcType" style="width:150px" class="required">  
				   </select>
				</td>
			</tr>
			
			<tr>
				<td  align=right>上级分类:</td>
				<td align="left">				
				   <select name="parentId" id="parentId" style="width:150px" >  
				   </select>
               </td>
			   <td  align=right>排序值:</td>
				<td align="left">
				<input type="text" name="menuSort" size="20" maxlength="10"   value="${entity.menuSort}" class="required digits"/>
				</td>
			</tr>
			<tr>
				<td  align=right>URL地址:</td>
				<td align="left"><input type="text" name="url" size="20" maxlength="150" value="${entity.url}" id="url" /></td>
				<td  align=right>权限编码:</td>
				<td>
				<input type="text" name="funcName" size="20" maxlength="30" value="${entity.funcName}" id="name" />(慎重修改)
				</td>
			</tr>
			<tr>
				<td  align=right>菜单图标CSS:</td>
				<td colspan=3>
				<input type="text" name="icon" size="20" maxlength="30" value="${entity.icon}" id="icon" />(引用icon.css文件中的css 风格)
				</td>
			</tr>

			
			<tr>
						<td colspan="4" align="center">
							<div align="center">
								<input type="submit" class="bar-button" value="保存">
							</div></td>
					</tr>
			
		
		</table>
 </BODY>
</HTML>
