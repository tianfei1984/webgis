
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

	

<script>
$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息

	 var defaultRoleId = "${roleId}";//${roleId}; //取出当前车辆的车牌颜色，默认选中
	//ajax填充下拉框数据
	 //$("#plateColor").lookup({category:"plateColor"});
	 $("#roleId").lookup({queryID:"selectRoleList", selectedValue:defaultRoleId});

	 $("#byTime").attr("checked", ${lineSegment.byTime});
	 $("#limitSpeed").attr("checked", ${lineSegment.limitSpeed});
	 $("#station").attr("checked", ${lineSegment.station});


	
});
</script>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/map/saveLineSegment.action' method="POST">
				<input type="hidden" name="entityID"
					value="${lineSegment.entityId}"/>
			  <input type="hidden" name="routeId" id="routeId" 
					value="${routeId}" />
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">用户信息
						<span class="message">${message}</span>
						</td>
					</tr>
					<tr>
						<td>线段名称:</td>
						<td align="left" colspan=3><input  id="name" value="${lineSegment.name}"
						name="name" class="required" maxlength="10" maxlength="11" size="20"> 
						</td>
					</tr>
					<tr>
						<td>拐点ID:</td>
						<td align="left"><input  id="pointId" value="${lineSegment.pointId}"
						name="pointId" class="required" maxlength="10" maxlength="11" size="20" readonly> 
						</td>
						<td align="right">线段ID:
							:</td>
						<td>
						   <input  id="enclosureId" value="${lineSegment.enclosureId}"
						name="enclosureId" class="required" maxlength="10" maxlength="11" size="20" readonly> 
						   </td>
					</tr>
					<tr>
						<td>拐点经度:</td>
						<td align="left">
						   <input  id="longitude1" value="${lineSegment.longitude1}"
						name="longitude1" class="required" maxlength="10" maxlength="11" size="20"> 
						</td>
						<td align="right">线段纬度:
							:</td>
						<td><input  id="latitude1" value="${lineSegment.latitude1}"
						name="latitude1" class="required" maxlength="10" maxlength="11" size="20"> 
						   </td>
					</tr>
					<tr>
						<td>路段宽度(米):</td>
						<td align="left"><input  id="lineWidth" value="${lineSegment.lineWidth}"
						name="lineWidth" class="required digits" maxlength="10" maxlength="11" size="20"> 
						</td>
						<td align="right">是否包站点:
							:</td>
						<td>
						   <input type="checkbox"  id="station" value="Y"
						name="station"  maxlength="10" > 
						   </td>
					</tr>

					<tr>
						<td>行驶时间限制:</td>
						<td align="left"><input type="checkbox" id="byTime" name="byTime" value="Y" >根据时间
						</td>
						
						<td>限速设置:</td>
						<td align="left"><input type="checkbox" id="limitSpeed" name="limitSpeed" value="Y">限速
						</td>
					</tr>
					
					<tr>
						<td>路段行驶过长阈值:</td>
						<td align="left"><input  id="maxTimeLimit" value="${lineSegment.maxTimeLimit}"
						name="maxTimeLimit" class="required digits" maxlength="10" maxlength="11" size="20"> 
						</td>
						<td align="right">路段行驶不足阈值:
							:</td>
						<td>
						   <input  id="minTimeLimit" value="${lineSegment.minTimeLimit}"
						name="minTimeLimit" class="required digits" maxlength="10" maxlength="11" size="20"> 
						   </td>
					</tr>
					
					<tr>
						<td>路段最高速度(km/h):</td>
						<td align="left"><input  id="maxSpeed" value="${lineSegment.maxSpeed}"
						name="maxSpeed" class="required digits" maxlength="10" maxlength="11" size="20"> 
						</td>
						<td align="right">延时报警(秒)
							:</td>
						<td>
						<input  id="overSpeedTime" value="${lineSegment.overSpeedTime}"
						name="overSpeedTime" maxlength="10" maxlength="11" size="20" class="required digits" > 
						   </td>
					</tr>
					
					<tr>
						<td colspan=4 align=center>
						
						   <button type="submit" class="button gray medium" >保存</button> 
						</td>
					</tr>
				</tbody></table>

				
			</div>
 </BODY>
</HTML>
