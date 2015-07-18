
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>

<%@ page language="java" pageEncoding="UTF-8"%>

<script>

$().ready(function() {

});
</script>
 <BODY>
	
  <table width="100%"  class="TableBlock">
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					驾驶员基本信息<span class="MessageFromServer">${message}</span></td>
			</tr>
			
			
				<td align=right width="20%">编号:</td>
				<td align="left" width="30%">${driverInfo.driverCode}</td>
				<td align=right width="20%">姓名:</td>
				<td align="left" width="30%">${driverInfo.driverName}</td>
			</tr>
			<tr>
				<td align="right">驾驶车辆
					:</td>
				<td colspan=3>
					${driverInfo.plateNo}
				</td>
			</tr>
			
			<tr>
				
				<td  align=right>性别:</td>
				<td align="left">${driverInfo.sex}
               </select>
               </td>
			   <td  align=right>地址:</td>
				<td align="left">${driverInfo.address}</td>
			</tr>
			<tr>
				<td  align=right>身份证号:</td>
				<td align="left">${driverInfo.identityCard}</td>
				<td  align=right>出生日期:</td>
				<td><s:date name="driverInfo.birthday" format="yyyy-MM-dd"/></td>
			</tr>
			<tr>
				<td  align=right>联系电话:</td>
				<td align="left">${driverInfo.telephone}</td>
				<td  align=right>移动电话:</td>
				<td align="left">${driverInfo.mobilePhone}</td>
			</tr>
		
			<tr>
				<td  align=right>准驾车型:</td>
				<td align="left">${driverInfo.drivingType}
				</td>
				<td  align=right>年审日期:</td>
				<td align="left"><s:date name="driverInfo.examineYear" format="yyyy-MM-dd"/></td>
			</tr>
			<tr>
				<td colspan="4" style="font-weight: bold; background: #EFEFEF;">
					从业资格证信息</td>
			</tr>
			<tr>
				<td  align=right>丛业资格证:</td>
				<td align="left">${driverInfo.driverLicence}</td>
				<td  align=right>发证机构:</td>
				<td align="left">${driverInfo.licenseAgency}
				</td>								
			</tr>
			<tr>				
				<td  align=right>发证时间:</td>
				<td align="left"><s:date name="driverInfo.certificationDate" format="yyyy-MM-dd"/></td>
			
				<td  align=right>过期时间 :</td>
				<td align="left"><s:date name="driverInfo.invalidDate" format="yyyy-MM-dd"/></td>
			</tr>
			<tr>
				<td  align=right>监管机构:</td>
				<td align="left">${driverInfo.monitorOrg}</td>
				<td  align=right>监督电话:</td>
				<td align="left">${driverInfo.monitorPhone}</td>
			</tr>
			<!-- 
					<tr>
						<td colspan="4" align="center">
							<div align="center">
								<input type="button" class="close_button"  value="关闭" onclick="window.parent.closeIFrameWindow();""> 
							</div></td>
					</tr> -->
		
		</table>
 </BODY>
</HTML>
