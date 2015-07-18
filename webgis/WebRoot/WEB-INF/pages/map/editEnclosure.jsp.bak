
<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>

<%@ include file="/common/dateUtil.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>


<script>


//删除围栏
			function doRemove()
			{
				var enclosureId = "${entity.entityId}";
				if(enclosureId != "0")
				{
					var enclosureIds = [enclosureId]; //数组格式，函数支持删除多个
					parent.MapTree.deleteAreas(enclosureIds);
				}
				parent.closeEnclosureWindow();
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

	var keyPoint = ${entity.keyPoint};
	if(keyPoint == 1)
	{
		 $("#keyPoint").attr("checked", true);
	}

	var strPoints = "${entity.points}"; //坐标点的的连接字符串
	var radius =  "${entity.radius}";
	var enclosureType = "${entity.enclosureType}"; //围栏类型，circle, rect, polygon
	var enclosureTypeDescr = "";
	if(enclosureType == "polygon")
		enclosureTypeDescr = "多边形电子围栏";
	if(enclosureType == "rect")
		enclosureTypeDescr = "矩形电子围栏";
	if(enclosureType == "circle")
		enclosureTypeDescr = "圆形电子围栏";
	$("#enclosureTypeDescr").val(enclosureTypeDescr);
	//alert(strPoints);
	Utility.ajaxForm("entityForm", {

         success: function(responseText){
		       var result = responseText;
			   if (result.success) {
		             $.messager.alert("保存成功!");
					 //保存围栏成功后，在地图上生成带有围栏ID的新围栏
					 var enclosure = result.data;//围栏对象
					 parent.createExtendEnclosure(enclosure, strPoints);
			   }else				   
			 {
				   $.messager.alert("保存失败，错误:"+ result.message);
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
<title>编辑区域</title>
 <BODY>
	<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/map/saveArea.action' method="POST">
				<input type="hidden" name="entityID" 		value="${entity.entityId}"/>
					<input type="hidden" name="radius" 		value="${entity.radius}"/>
					<input type="hidden" name="points"			value="${entity.points}"/>	
					<input type="hidden" name="mapType"			value="${entity.mapType}"/>	
					<input type="hidden" name="enclosureType" 	value="${entity.enclosureType}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="4" style="font-weight: bold; background: #EFEFEF;" height="25">区域信息
						<span class="message">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">区域名称:</td>
						<td align="left"><input  id="name" value="${entity.name}"
						name="name" class="required" maxlength="10" maxlength="11" size="20"> 
						</td>
						  <td align="right">围栏类型:
							:</td>
						<td>
						  <input type="input" name="enclosureTypeDescr"   id="enclosureTypeDescr"  value="" readonly/>
						   </td>
					</tr>
				
					
					<tr>
						<td align="right">进入区域报警:</td>
						<td align="left" colspan=3><input  type="checkbox" id="alarmTypes1" name="alarmTypes" class=""  value="进区域报警给驾驶员" maxlength="16" size="20" >进区域报警给驾驶员    &nbsp;&nbsp;&nbsp;
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
						<td align="right">限速(km/h):</td>
						<td align="left"><input  id="maxSpeed" value="${entity.maxSpeed}"
						name="maxSpeed" class="required number" maxlength="10"  size="20" value="80"> 
						</td>
						<td align="right">延时报警(秒)
							:</td>
						<td>
						<input  id="delay" value="${entity.delay}"
						name="delay" maxlength="10" maxlength="11" size="20" class="required digits"> 
						   </td>
					</tr>
					<tr>
						<td align="right">开始时间:</td>
						<td align="left" >
						  <input type="text" name="startDate" class="datetimepicker"   value='<s:date name="entity.startDate" format="yyyy-MM-dd HH:mm:ss"/>'></input>
						</div>
					</td>
					
						<td align="right">结束时间:</td>
					<td>
						  <input type="text" name="endDate" class="datetimepicker"  value='<s:date name="entity.endDate" format="yyyy-MM-dd HH:mm:ss"/>'></input>
						 
						</td>
					</tr>
					
					<tr>
						<td colspan=4 align=center>
						<%
					   String allowEdit = ""+request.getAttribute("allowEdit");
					   if(allowEdit.equals("yes"))
					   {
					%>
						   <button type="submit" class="button gray medium" >保存</button> 
						   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						   <button type="button" class="button gray medium" onclick="doRemove();" >删除</button>
						   
					<%}else{%>
					       <span style="color:red">只有创建者才有编辑和删除权限</span>
						 <%}%>
						</td>
					</tr>
				</tbody></table>

			</form>
 </BODY>
</HTML>
