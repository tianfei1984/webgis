
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<script>
	$()
			.ready(
					function() {
						//$("#driverForm").validate();

						//var defaultDrivingType = ""; //取出当前车辆的车牌颜色，默认选中
						//ajax填充下拉框数据
						//$("#drivingType").lookup({category:"drivingType", selectedValue:defaultDrivingType});
						//$("#sex").lookup({category:"Sex"});

						//var mapType = "";
						//地图类型下拉框选中
						$("#mapType option[value='${entity.mapType}']").attr(
								"selected", "selected");
						$(
								"#displayStateType option[value='${entity.displayStateType}']")
								.attr("selected", "selected");
					});
</script>
<BODY>


	<form id="saveGovCfg" name="saveConfig"
		action="<%=ApplicationPath%>/system/saveConfig.action" method="post">
		<input type="hidden" name="entityID" value="${entity.entityId}" />
		<div>

			<table width="100%" class="TableBlock"">
				<tbody>
					<tr>
						<td colspan="2" style="font-weight: bold; background: #EFEFEF;"
							height="25">配置信息: 
							<!-- <input type="submit" class="button gray medium" value="保存"> --> 
							<span
							style="color:red;background:blue;">${message}</span></td>
					</tr>
					<tr>
						<td width="200">软件标题:</td>
						<td align="left"><input type="text" name="systemTitle"
							value="${entity.systemTitle}" id="systemTitle" size=50 />
					</tr>
					<tr>
						<td>地图中心默认经度:</td>
						<td align="left"><input type="text" name="initLng"
							value="${entity.initLng}" id="initLng" />
						</td>
					</tr>
					<tr>
						<td>地图中心默认纬度:</td>
						<td align="left"><input type="text" name="initLat"
							value="${entity.initLat}" id="initLat" />
						</td>
					</tr>
					<tr>
						<td>地图默认缩放比例:</td>
						<td align="left"><input type="text" name="initZoomLevel"
							value="${entity.initZoomLevel}" id="initZoomLevel" />
						</td>
					</tr>

					<tr>
						<td>系统默认地图</td>
						<td><select name="mapType" id="mapType" style="width:150px;">
								<option value="baidu" selected>百度地图</option>
								<!-- <option value="google" >中文谷歌地图</option>-->
								<option value="smart">四维地图</option>


						</select></td>
					</tr>
					<tr>
						<td>smart earth四维地图密钥:</td>
						<td align="left"><input type="text" name="smartKey"
							value="${entity.smartKey}" id="smartKey" />
						</td>
					</tr>

					<tr>
						<td>实时状态显示类型</td>
						<td><select name="displayStateType" id="displayStateType"
							style="width:150px">
								<option value="door">显示Acc状态</option>
								<option value="braker" selected="selected">显示刹车转向状态</option>
						</select></td>
					</tr>


					<tr>
						<td colspan="2" align="center">
							<div align="center">
								<input type="submit" class="button gray medium" value="保存">
							</div>
						</td>
					</tr>
			</table>