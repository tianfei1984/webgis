
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<script>

function queryVehicle()
{
	//var depId = $("#depId").val();
	var fieldName = $("#queryFieldName").val();
	var fieldValue = $("#queryFieldValue").val();
	if(fieldValue.length == 0)
	{
		alert("请输入模糊查询条件!");
		return;
	}
	var params = {queryID:"selectVehicleList"};
	params[fieldName] = fieldValue;

     $("#vehicleId").lookup(params);

}
$().ready(function() {
		 $("#EntityForm").validate();

		 var defaultDrivingType = "${entity.drivingType}"; //取出当前车辆的车牌颜色，默认选中
		 var mainDriver = "${entity.mainDriver}";
		 if(mainDriver == "true")
		{
			 $("#mainDriver").attr("checked",true);
		}
		//ajax填充下拉框数据
		 $("#drivingType").lookup({category:"drivingType", selectedValue:defaultDrivingType});
		 $("#depId").lookup({queryID:"selectDepList"});
		 
		 $("#depId").change(function()
				{
			             var depId = $("#depId").val();
                        if(depId.length == 0 )
						{
							return;
						}
						var params = {queryID:"selectVehicleList", depId:depId};
						 $("#vehicleId").lookup(params);
				});
		 $("#vehicleId").lookup({queryID:"selectVehicleList", vehicleId:${entity.vehicleId},selectedValue:${entity.vehicleId}});
		 //selectVehicleList
		 $("#sex").lookup({category:"Sex", selectedValue:"${entity.sex}"});

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
			action='<c:url value="/vehicle/saveDriver.action" />' method="POST">
				<input type="hidden" name="entityID"
					value="${entity.entityId}"/>
  <table width="100%"  class="TableBlock">
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					基本信息<span class="MessageFromServer">${message}</span></td>
			</tr>
			
			
				<td align=right>编号:</td>
				<td align="left"><input type="text" name="driverCode" size="20" maxlength="10" value="${entity.driverCode}" id="riverCode" class="digits"  /></td>
				<td align=right>姓名:</td>
				<td align="left"><input type="text" name="driverName" size="20" maxlength="10"   value="${entity.driverName}"/><span
					class="required"></td>
			</tr>
			<tr>
				<td align="right">驾驶车辆
					:</td>
				<td colspan=3>
					<select type="text" id="vehicleId" name="vehicleId" class="required" style="width:90px;">  
					</select>
					<select type="text" id="depId" name="depId" >  
					</select>
					<select type="text" id="queryFieldName" name="queryFieldName" >  
					    <option value="plateNo">车牌号</option>
					    <option value="simNo">sim卡号</option>
					</select>
					<input type="text" name="queryFieldValue" id="queryFieldValue" />
					<input type="button" id="btnQueryVehicle" value="模糊查询"  onclick="queryVehicle();"/>
				</td>
			</tr>
			
			<tr>
				
				<td  align=right>性别:</td>
				<td align="left"><select name="sex" id="sex" >
               </select>
               </td>
			   <td  align=right>地址:</td>
				<td align="left"><input type="text" name="address" size="20" maxlength="30" value="${entity.address}" id="address" /></td>
			</tr>
			<tr>
				<td  align=right>身份证号:</td>
				<td align="left"><input type="text" name="identityCard" size="20" maxlength="18" value="${entity.identityCard}" id="dentityCard" /></td>
				<td  align=right>出生日期:</td>
				<td><input type="text" name="birthday" size="20" maxlength="11" value='<s:date name="entity.birthday" format="yyyy-MM-dd"/>' readonly="readonly" id="birthday"   class="datepicker"/></td>
			</tr>
			<tr>
				<td  align=right>联系电话:</td>
				<td align="left"><input type="text" name="telephone" size="20" maxlength="12" value="${entity.telephone}" id="telephone" class="required digist" > </td>
				<td  align=right>主驾驶:</td>
				<td align="left"><input type="checkbox" name="mainDriver" value="true" id="mainDriver"  />(一个车只能有一个主驾驶)</td>
			</tr>
		
			<tr>
				<td  align=right>准驾车型:</td>
				<td align="left"><select name="drivingType" id="drivingType" >
   
</select>

				</td>
				<td  align=right>年审日期:</td>
				<td align="left"><input type="text" name="examineYear" size="20" maxlength="11" value='<s:date name="entity.examineYear" format="yyyy-MM-dd"/>'  id="examineYear"  class="datepicker"/></td>
			</tr>
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					从业资格证信息</td>
			</tr>
			<tr>
				<td  align=right>丛业资格证:</td>
				<td align="left"><input type="text" name="driverLicence" size="20" maxlength="19" value="${entity.driverLicence}" id="riverLicence"  class="required"/></td>
				<td  align=right>发证机构:</td>
				<td align="left"><input type="text" name="licenseAgency" size="20" maxlength="30" value="${entity.licenseAgency}" id="licenseAgency" class="required"/>
				</td>								
			</tr>
			<tr>				
				<td  align=right>发证时间:</td>
				<td align="left"><input type="text" name="certificationDate" size="20" maxlength="11" value='<s:date name="entity.certificationDate" format="yyyy-MM-dd"/>'  id="certificationDate"  class="datepicker"/></td>
			
				<td  align=right>过期时间 :</td>
				<td align="left"><input type="text" name="invalidDate" size="20" maxlength="11" value='<s:date name="entity.invalidDate" format="yyyy-MM-dd"/>' id="nvalidDate"  class="datepicker" /></td>
			</tr>
			<tr>
				<td  align=right>监管机构:</td>
				<td align="left">
						<input type="text" name="monitorOrg" size="20" maxlength="19" value="${entity.monitorOrg}" id="monitorOrg" /></td>
				<td  align=right>监督电话:</td>
				<td align="left"><input type="text" name="monitorPhone" size="20" maxlength="12" value="${entity.monitorPhone}" id="monitorPhone" class="numeric-only"  onkeypress="numericLimitedKeypress(event, this)"/></td>
			</tr>
			<!--
			<tr>				
				<td >上传相片:</td>
				<td align="left" colspan="3"><input type="file" name="image" size="30" value="" id="image" maxlength="12"/>
			</tr>
			<tr>
				<td>相片:</td>
				<td colspan="3"><img id="showImage" name="showImage"  width="100" height="100"/></td>												
			</tr>-->
			<tr>
						<td colspan="4" align="center">
							<div align="center">
								<input type="submit" class="bar-button" value="保存">
							</div></td>
					</tr>
			
		
		</table>
 </BODY>
</HTML>
