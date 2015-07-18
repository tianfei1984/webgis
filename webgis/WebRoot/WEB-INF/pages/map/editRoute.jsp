
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>


<script>
    //删除线路
	function doRemove()
			{
				var enclosureId = "${entity.entityId}";
				if(enclosureId != "0")
				{
					var enclosureIds = [enclosureId]; //数组格式，函数支持删除多个
					parent.MapTree.deleteEnclosures(enclosureIds);//调用删除接口
				}
				parent.closeEnclosureWindow();//删除后关闭本窗口
			}

$().ready(function() {
	 $("#entityForm").validate(); //初始化验证信息
	//ajax填充下拉框数据
	 //$("#plateColor").lookup({category:"plateColor"});
	 //$("#routeType").lookup({category:"routeType", selectedValue:"${entity.name}"});

	 //alert(${entity.byTime});
	 $("#byTime").attr("checked", ${entity.byTime});
	 $("#limitSpeed").attr("checked", ${entity.limitSpeed});

	 var strAlarmType = "${entity.alarmType}";
	  if(strAlarmType == "")
	{
		 $("#alarmType2").attr("checked", true);
		 $("#alarmType4").attr("checked", true);
	}
	  $(':input[name="alarmTypes"]').each(function()
	{
		  var obj = $(this).val();
		   if(strAlarmType.indexOf(obj) >= 0)
		   {
		       //alert(obj);
			   $(this).attr("checked", true);
		   }
	});

	var strPoints = "${strRoutePoints}"; //坐标点的的连接字符串
    //strPoints = strPoints.replace(/;/g,"#");
	//alert(strPoints);
	Utility.ajaxForm("entityForm", {

         success: function(responseText){
		       var result = responseText;
			   if (result.success) {
		             alert("保存成功!");
					 parent.createPolyline(result.data, strPoints);
			   }else				   
			 {
				   alert("保存失败，错误:"+ result.message);
			 }
		 }

	});

/**
	$(".chbox").click(function()
	{
		    var checkValue  = $(this).attr("checked") == "checked" ? "Y" : "N";
			alert(checkValue);
			$(this).val(checkValue);
			alert($(this).val());
	});*/
	
});
</script>
<title>线路编辑</title>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/map/saveRoute.action' method="POST">
				<input type="hidden" name="entityID" 			value="${entity.entityId}"/>
					<input type="hidden" name="points" 		value="${entity.points}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">路线信息
						<span class="message">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">线路名称:</td>
						<td align="left"><input  id="name" value="${entity.name}"
						name="name" class="required" maxlength="10" maxlength="11" size="20"> 
						</td>
						
					</tr>
					<tr>
					  <td align="right">线路宽度(米)
							:</td>
						<td>
						  <input type="input" name="lineWidth"   value="${entity.lineWidth}" class="required number"/>
						   </td>
					     <td align="right">偏离延时报警(秒)
							:</td>
						<td>
						  <input type="input" name="offsetDelay" value="${entity.offsetDelay}" class="required digits" />
						   </td>

					</tr>
					
					<tr>
						<td align="right">进入区域报警:</td>
						<td align="left" colspan=3><input  type="checkbox" id="alarmType1" name="alarmTypes" class=""  value="进区域报警给驾驶员" maxlength="16" size="20" >进区域报警给驾驶员    &nbsp;&nbsp;&nbsp;
						<input  type="checkbox" id="alarmType2" name="alarmTypes" class=""  value="进区域报警给平台" maxlength="16" size="20" >进区域报警给平台 
						
                        </td>
						
					</tr>

	              <tr>
						<td align="right">离开区域报警:</td>
						<td align="left" colspan=3><input  type="checkbox" id="alarmType3" name="alarmTypes" class=""  value="出区域报警给驾驶员" maxlength="16" size="20" >出区域报警给驾驶员   &nbsp;&nbsp;&nbsp;
						<input  type="checkbox" id="alarmType4" name="alarmTypes" class=""  value="出区域报警给平台" maxlength="16" size="20" >出区域报警给平台 
						
                        </td>
						
					</tr>
					<tr>
						<td align="right">时间设置:</td>
						<td align="left"><input type="checkbox" id="byTime" name="byTime" value="Y"
						maxlength="16" size="20" class="chbox">根据时间
						</td>
						
						<td align="right">限速设置:</td>
						<td align="left"><input type="checkbox" id="limitSpeed" name="limitSpeed" value="Y"  class="chbox">限速
						</td>
					</tr>
					
					<tr>
						<td align="right">开始时间:</td>
						<td align="left" >
						  <input type="text" name="startDate" value='<s:date name="entity.startDate" format="yyyy-MM-dd HH:mm:ss"/>'  class="datetimepicker" ></input>
					</td>
					
						<td align="right">结束时间:</td>
					<td>
						  <input type="text" name="endDate" class="datetimepicker"  value='<s:date name="entity.endDate" format="yyyy-MM-dd HH:mm:ss"/>'></input>
					</td>
					</tr>
					<tr>
						<td align="right">限速(km/h):</td>
						<td align="left"><input  id="maxSpeed" value="${entity.maxSpeed}"
						name="maxSpeed" class="required digits" maxlength="10" maxlength="11" size="20"> 
						</td>
						<td align="right">限速延时报警(秒)
							:</td>
						<td>
						<input  id="delay" value="${entity.delay}"
						name="delay" maxlength="10" maxlength="11" size="20" class="required digits"> 
						   </td>
					</tr>
					
					
					<tr>
						<td colspan=4 align=center>
						
						   <button type="submit" class="button gray medium" >保存</button> 
						&nbsp;&nbsp;&nbsp;&nbsp;
						    <button type="button" class="button gray medium" onclick="doRemove();" >删除</button>
						</td>
					</tr>
				</tbody></table>

				<div id="dynamic">
				<table class="TableBlock" id="dataTable" width="100%">
					<thead>
							<tr>
								<td width="5%">路段ID</td>
								<td width="5%">名称</td>
								<td width="5%">起点经度</td>
								<td width="5%">起点纬度</td>
								<td width="5%">终点经度</td>
								<td width="5%">终点纬度</td>
							<th width="5%">编辑</th>
						</tr>
					</thead>
					<tbody>
					 <s:iterator value="#session.lineSegments" id="seg" status="status">  
					<tr>
					    <td align="center">
						    ${seg.pointId}
						</td>
						<td align="right">
						  ${seg.name}
						</td>
					   
						<td >
						  ${seg.longitude1}
						</td>
						 <td >
						    ${seg.latitude1}
						</td>
						<td >
						  ${seg.longitude2}
						</td>
						<td >
						    ${seg.latitude2}
						</td>
						<td>
						  <image src="<%=ApplicationPath%>/image/edit.png" style="cursor:hand" 
						  onclick="InfoWindow.viewSegment('${seg.pointId}&pointId=${seg.pointId}');"></image>
						</td>
						
					</tr>
					</s:iterator>  
						
					</tbody>					
				</table>
			</div>
 </BODY>
</HTML>
