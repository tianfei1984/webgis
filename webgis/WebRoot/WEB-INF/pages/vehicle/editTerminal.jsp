
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

	<!--下拉树的配置-->
	
	<link rel="stylesheet" href="<%=ApplicationPath%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/ztreeutil.js"></script><!--关于ztree操作的公用函数-->

<script>
$().ready(function() {
		 $("#entityForm").validate(); //初始化验证信息

		//ajax填充下拉框数据
		 $("#termType").lookup({category:"TerminalType", selectedValue:"${entity.termType}"});//终端类型
		 $("#state").lookup({category:"TerminalState", selectedValue:"${entity.state}"}); //终端状态
		 Utility.initDatepicker();//初始化日期选择框
		 var mesasge = "${message}";
			if(mesasge.length > 0)
			{
				//保存成功后，刷新主窗口数据
				 window.parent.refreshDataWindow();
			}
});
</script>
 <BODY>


	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/vehicle/saveTerminal.action' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
  <tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">终端信息管理
						<span class="MessageFromServer">${message}</span>
						</td>
					</tr>
			<tr>				
				<td align="right">唯一终端ID号
					:</td>
				<td align="left"><input type="text" 
					id="termNo" value="${entity.termNo}"
					name="termNo" maxLength="7"
					size="20" class="{required:true,maxlength:7}"  /> <span class="star">*</span>
				</td>
				<td align="right">终端类型
					:</td>
				<td>
				<select name="termType" id="termType" style="width:150px" class="required">  
				</select>
					</td>
			</tr>
			<tr>
			<td align="right">设备当前状态:</td>
				<td align="left"><select name="state" id="state" style="width:150px;" class="required">
</select>
				</td>
				<td align="right">手机号码:</td>
				<td align="left">
				<input id="simNo" value="${entity.simNo}" name="simNo" class="{required:true,maxlength:11}" maxLength="11" size="20" /><span class="star">*</span> 
				</td>
				
				<tr>
				<td align="right">Sim卡流水号:</td>
				<td align="left"><input 	id="seqNo" value="${entity.seqNo}" name="seqNo"
					maxLength="11" size="20" /> 
				</td>
				<td align="right">安装时间:</td>
				<td align="left">
							  <input type="text" name="installTime"  class="datepicker" value='<s:date name="entity.installTime" format="yyyy-MM-dd"/>'></input>
				</td>
			</tr>
			<tr>
				<td align="right">软件版本号:</td>
				<td align="left">
					<input type="text" name="verSoftware" value="${entity.verSoftware}" id="verSoftware"  size="20" >
				</td>
				<td align="right">硬件版本号 :</td>
				<td>
					<input type="text" name="verHardware" value="${entity.verHardware}" id="verHardware"  size="20"  />
				</td>
			</tr>
			<!--
			<tr>
				<td>协议版本号:</td>
				<td align="left"><input type="text" name="verProtocol" value="${entity.verProtocol}" id="verProtocol" class="required" style="width:150px;" />
				</td>
				<td align="right">制造厂家 :</td>
				<td><input type="text" name="makeFactory"
					id="makeFactory" style="width: 150px;" maxLength="7"
					value="${entity.makeFactory}"></input>
				</td>
			</tr>
			<tr>
				<td>生产时间:</td>
				<td align="left">
				<input type="text" class="datepicker" name="makeTime" value='<s:date name="entity.makeTime" format="yyyy-MM-dd"/>'></input>
							
				</td>
				<td align="right">生产批次
					:</td>
				<td><input type="text" name="makeNo" size="20" maxlength="12" value="${entity.makeNo}" id="makeNo"/></td>
			</tr>

			-->
			<tr>				
				<td align="right">出厂号:</td>
				<td><input class="" id="devNo"
					value="${entity.devNo}" name="devNo"
					 size="20" /> 
				</td>
				<td align="right">安装工
					:</td>
				<td><input type="text" name="waitor" size="20" maxlength="10" value="${entity.waitor}" id="waitor"/></td>
			</tr>
			<!--
			<tr>

				<td>安装地址:</td>
				<td align="left" colspan="3"><input type="text" name="installAddress" size="90" maxlength="60" value="${entity.installAddress}" id="installAddress"/>
					
				</td>

			</tr>-->
			
		
			<tr>
				<td align="right">备注:</td>
				<td align="left" colspan="3"><input type="text" name="remark" size="79" maxlength="64" value="${entity.remark}" id="remark"/>
				</td>

			</tr>
		
			<tr>
				<td colspan="4">
					<div align="center">
						<input type="submit" class="button gray medium" value="保存">
							

					</div></td>
			</tr>
		</table>
 </BODY>
</HTML>
