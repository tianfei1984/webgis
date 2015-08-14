
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	 var treeManager = $("#funcTree");
	 var treeUrl = globalConfig.webPath + "/system/getFuncMenu.action?roleId=${entity.entityId}";
	 treeManager.tree({checkbox:true,lines:true,url:treeUrl,onCheck:onCheck});
	 treeManager.tree('collapseAll');

	 var mesasge = "${message}";
	 if(mesasge.length > 0)
	 {
		 //保存成功后，刷新主窗口数据
		 window.parent.refreshDataWindow();
	 }
});

function onCheck(node,checked)
{
	//this.treeManager.tree("expand",node.target);
	//this.treeManager.tree("check",node.target);
	 var treeManager = $("#funcTree");
	var nodes = treeManager.tree('getChecked');
	alert
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.leaf && node.id != "0")
		{
            s += node.id+",";
		}
    }
	$("#strFuncMenu").val(s);
}

</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/system/saveRole.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
					<input type="hidden" name="strFuncMenu" id="strFuncMenu" 
					value=""/>
  <table width="100%"  class="TableBlock">
					<tbody>
					<tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">角色管理
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td width="120" align=right>角色名称:</td>
						<td align="left" ><input  id="name" value="${entity.name}"
						name="name" class="required" maxlength="10" maxlength="11" size="20"> 
						</td>
						
					</tr>
				
					<tr>
						<td align=right>功能:</td>
						<td align="left" >
						<div style="height:250px;overflow:auto;">
						   <ul id="funcTree"></ul>
						   </div>

						</td>
					</tr>
						<td align=right>备注:</td>
						<td align="left" >
						   <textarea name="remark" rows=2 cols=50>${entity.remark}</textarea>
						</td>
					</tr>
					<tr>
					<tr>
						<td colspan=4 align=center>						
		                  <!-- <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" >保存</a>&nbsp;-->
						   <button type="submit" class="button gray medium" >保存</button> 
						</td>
					</tr>

				</tbody></table>
 </BODY>
</HTML>
