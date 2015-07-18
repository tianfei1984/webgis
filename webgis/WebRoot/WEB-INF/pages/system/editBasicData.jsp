
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
	<!--下拉树的配置-->
	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

<script>
$().ready(function() {
    $("#entityForm").validate(); //初始化验证信息
 
	 $("#parent").lookup({category:"Root", selectedValue:"${entity.parent}"});
 
});
</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/system/saveBasicData.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">基础信息
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right" width="40%">类型:</td>
						<td align="left"><select  id="parent" value="${entity.parent}"
						name="parent"  > 
						</select>
						</td>
					</tr>
					<tr>
						<td align="right">名称:</td>
						<td align="left"><input  id="name" value="${entity.name}"
						name="name" class="required"  size="20"> 
						</td>
					</tr>
						<td align="right">编码:</td>
						<td align="left"><input id="code" name="code" value="${entity.code}" size="20" class="required" >
						</td>
					</tr>
	
					<tr>
						<td colspan=4 align=center>						
						   <button type="submit" class="button gray medium" >保存</button> 
						</td>
					</tr>
				</tbody></table>
 </BODY>
</HTML>
