<%@ include file="/common/taglibs.jsp"%>

<%@ page language="java" pageEncoding="UTF-8"%>
<%
   String ApplicationPath = request.getContextPath() ;
   String jsPath = ApplicationPath+"/js";
   String mapIconPath =  ApplicationPath+"/map/images";
   String mapPath = ApplicationPath+"/map";
   String vehicleId = request.getParameter("vehicleId");
   if(vehicleId == null)
		 vehicleId= "";
%>
<script>

//全局的javascript配置
	var globalConfig = {webPath:"<%=ApplicationPath%>"}
</script>
<html>
<head>

<meta http-equiv="Expires" content="0" />  
<meta http-equiv="Cache-Control" content="no-cache, no-store" /> 
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<%=ApplicationPath%>/css/FormTable.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/icon.css">
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery1.8.min.js"></script>
<script type="text/javascript" src="<%=jsPath%>/InfoWindow.js"></script>
<script type="text/javascript" src="<%=jsPath%>/easyUI/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=ApplicationPath%>/map/BaiduMapHandler.js"></script>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
</style>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=GT3YSZNuqHkwbGyAY4maPaVw"></script>
<!--测距-->
<script type="text/javascript" src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
<!--拉框放大-->
<script type="text/javascript" src="http://api.map.baidu.com/library/RectangleZoom/1.2/src/RectangleZoom_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>


<title>百度地图</title>

<script type="text/javascript" src="js/public/util.js"></script>    
    <link rel="stylesheet" href="css/gh-buttons.css">

<style>

.datatable
{
	font-size:12px;
	display:hidden;
}

.button
{
	display:none;
}
</style>

</head>
<body>

<div style="position:absolute;right:1px;top:1px;z-index:1">
<ul class="button-group">
    <li><a href="#" class="button" id="routePlanTool" title="路线导航"><img src="images/toolbar/nav.png" /></a></li>
    <li><a href="#" class="button" id="panelTool" title="拖动地图"><img src="images/toolbar/hand.gif" /></a></li>
    <li><a href="#" class="button" id="rectZoomoutTool" title="矩形缩小"><img src="images/toolbar/zoomout.gif" /></a></li>
    <li><a href="#" class="button" id="rectZoominTool" title="矩形放大"><img src="images/toolbar/zoomin.gif" /></a></li>
    <li><a href="#" class="button" id="measureTool" title="测距"><img src="images/toolbar/measure.png" /></a></li>
    <li><a href="#" class="button" id="rectQueryTool" title="矩形查车"><img src="images/toolbar/rectQuery.png" /></a></li>
    <li><a href="#" class="button" id="markerTool" title="标注"><img src="images/toolbar/marker.png" /></a></li>
    <li><a href="#" class="button" id="rectTool" title="矩形区域"><img src="images/toolbar/rect.png" /></a></li>
    <li><a href="#" class="button" id="circleTool" title="圆形区域"><img src="images/toolbar/circle.png" /></a></li>
    <li><a href="#" class="button" id="polygonTool" title="多边形区域"><img src="images/toolbar/polygon.png" /></a></li>
    <li><a href="#" class="button" id="polylineTool" title="线路"><img src="images/toolbar/polyline.png" /></a></li>
    <li><a href="#" class="button" id="keyPointTool" title="关键点"><img src="images/toolbar/keypoint.png" /></a></li>
	<li>
	<a href="#" class="button" id="saveTool" title="保存中心兴趣点"><img src="images/toolbar/point.png" /></a></li>
	<li>
	<a href="#" class="button" id="showAllTool" title="显示所有车辆"><img src="images/toolbar/showAll.png" /></a></li>
</ul>
</div>


<table class="datatable" >
     <tr>
        <td>车牌号:</td><td><span id="plateNo" class="td_realdata"></span></td>
        <td>Sim卡号:</td><td><span id="simNo" class="td_realdata"></span></td>
        <td>车牌颜色:</td><td><span id="plateColor" class="td_realdata"></span></td>
        <td>GPS时间:</td><td><span id="sendTime" class="td_realdata"></span></td>
        <td>车速:</td><td><span id="velocity" class="td_realdata"></span>km/h</td>
       
	</tr>
	<tr>
        <td>里程:</td><td><span id="mileage" class="td_realdata"></span>km</td>
        <td>油量:</td><td><span id="gas" class="td_realdata"></span>升</td>
		 <td>方向:</td><td><span id="directionDescr" class="td_realdata"></span></td>
        <td>海拔:</td><td><span id="altitude" class="td_realdata"></span></td>
        <td>脉冲速度:</td><td><span id="recorderVelocity" class="td_realdata">km/h</span></td>
	 </tr><tr>
	    <td>状态:</td><td colspan="5"><span id="status" class="td_realdata"></span></td>
	    <td>报警:</td><td colspan="5"><span id="alarmStateDescr" class="td_realdata"></span></td>
		<!--
        <td>经度:</td><td><span id="latitude" class="td_realdata"></span></td>
        <td>纬度:</td><td><span id="longitude" class="td_realdata"></span></td>
		-->
	 </tr>

</table>

<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
var vehicleId = "<%=vehicleId%>";
	if(vehicleId.length > 0)
	{
		//window.parent.showGpsInfoWindow(true);
		$(".datatable").show();
	}else
	{
		//window.parent.showGpsInfoWindow(false);
		$(".datatable").hide();
	}//



var map = null;
var OperatorObj = null;
var mapTool = "queryRect"; //矩形工具，用来区分是矩形查询车辆，还是矩形区域画图 query和draw
$().ready(function() {

	/**
	 * mapTool工具栏
	 */
    var mapToolMenu = ${MapToolMenu}; //将session中的菜单数据的java集合对象转换成json菜单对象
    for(var m in mapToolMenu)
	{
	    var mapTool = mapToolMenu[m];
	    $("#"+mapTool.funcName).show(); //根据权限显示工具栏
	}

		// 百度地图API功能
		map = new BMap.Map("allmap");
		
       //当前登录用户信息
        var userInfo = ${onlineUserInfo};//用户设置的地图中心
		map.centerAndZoom(new BMap.Point(userInfo.mapCenterLng, userInfo.mapCenterLat), userInfo.mapLevel);

		OperatorObj = new BaiduMapHandler(map);

var sz  = new BMap.Size(0,30); //导航条向下偏移
        map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,offset:sz}));  //添加默认缩放平移控件
		map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2D图，卫星图

		map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT}));    //左上角，默认地图控件
		//map.setCurrentCity("北京");   

		map.addControl(new BMap.OverviewMapControl());              //添加默认缩略地图控件
		map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));                    // 左下
		map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

		var myDis = new BMapLib.DistanceTool(map);
		map.addEventListener("load",function(){
			myDis.open();  //开启鼠标测距
			//myDis.close();  //关闭鼠标测距大
		});

		map.addEventListener("dragend", function(){

		 });

		
		map.addEventListener("zoomend", function(){

		 });

		var myZoomInDrag = new BMapLib.RectangleZoom(map, {
			followText: "拖拽鼠标进行矩形放大操作",zoomType:0
		});
		var BMAP_ZOOM_OUT = 1;
		var myZoomoutDrag = new BMapLib.RectangleZoom(map, {
			followText: "拖拽鼠标进行矩形缩小操作",
			zoomType : BMAP_ZOOM_OUT
		});


		$("#measureTool").click(function(){
			reset();
			myDis.open();
		});


		$("#rectZoomoutTool").click(function(){
		myZoomInDrag.close();
		myZoomoutDrag.zoomType = 1;
		myZoomoutDrag.open();  //开启拉框放大
		});

		$("#rectZoominTool").click(function(){
		myZoomoutDrag.close();
		myZoomInDrag.zoomType =0;
		myZoomInDrag.open();  //开启拉框放大
		});

		function reset()
		{
		   myZoomoutDrag.close();
		   myZoomInDrag.close();
		}


		 var styleOptions = {
				strokeColor:"red",    //边线颜色。
				fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
				strokeWeight: 3,       //边线的宽度，以像素为单位。
				strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
				fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
				strokeStyle: 'solid' //边线的样式，solid或dashed。
			}
			//实例化鼠标绘制工具
			var drawingManager = new BMapLib.DrawingManager(map, {
				isOpen: false, //是否开启绘制模式
				enableDrawingTool: false, //是否显示工具栏
				drawingToolOptions: {
					anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
					offset: new BMap.Size(5, 5), //偏离值
					scale: 0.8 //工具栏缩放比例
				},
				circleOptions: styleOptions, //圆的样式
				polylineOptions: styleOptions, //线的样式
				polygonOptions: styleOptions, //多边形的样式
				rectangleOptions: styleOptions //矩形的样式
			});
			//回调获得覆盖物信息e.overlay, e.drawingMode
			var overlaycomplete = function(e){
				//overlays.push(e.overlay);
				drawingManager.close();
				var strPoints = "";
				if(e.overlay.getPath)
				{
					var pointArray = e.overlay.getPath();
					var sep = "";
					for(var  m in pointArray)
					{
						var pt = pointArray[m];
						 strPoints += sep + pt.lng +","+ pt.lat;
						sep = ";";
					}
				}
				var mapType = "baidu";//围栏的地图类型
				if (e.drawingMode == BMAP_DRAWING_MARKER) {
					//this.addMarker(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
					//map.removeOverlay(e.overlay);
					strPoints = e.overlay.getPosition().lng + ","+e.overlay.getPosition().lat;
					if(mapTool == "keyPointTool")
					{
						//标注关键点
						 var url = globalConfig.webPath + "/map/viewKeyPoint.action?enclosureType=circle&strRoutePoints="+ strPoints+"&radius="+100;			 
						 parent.openRouteWindow(url, 660,370,"关键点编辑", function()
						{
							   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
						});
					}else if(mapTool == "markerTool")
					{
						 //标注
						 var url = globalConfig.webPath + "/map/viewMarker.action?enclosureType=marker&strRoutePoints="+ strPoints+"&radius="+100;			 
						 parent.openRouteWindow(url, 670,290,"标注点编辑", function()
						{
							   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
						});
					}
				}
				else if (e.drawingMode == BMAP_DRAWING_CIRCLE) {
					//画圆形
					var radius =  e.overlay.getRadius();
					strPoints =  e.overlay.getCenter().lng + "," + e.overlay.getCenter().lat;
					 var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=circle&strRoutePoints="+ strPoints+"&radius="+radius+"&mapType="+mapType;		
					  parent.openRouteWindow(url, 720,390,"圆形区域编辑", function()
					{
						   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
					});
				}
				else if (e.drawingMode == BMAP_DRAWING_POLYLINE)
				{
					//线路
					var url = globalConfig.webPath + "/map/viewRoute.action?strRoutePoints="+ strPoints+"&mapType="+mapType;
					 parent.openRouteWindow(url, 720,490,"路线编辑" ,function()
					{
						   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
					});
				}else if(e.drawingMode == BMAP_DRAWING_POLYGON)
				{
					//多边形
					var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=polygon&strRoutePoints="+ strPoints+"&mapType="+mapType;				 
					 parent.openRouteWindow(url, 720,390,"多边形区域编辑", function()
					{
						 //关闭窗口时的回调函数
						 map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
					});
				}else if(e.drawingMode == BMAP_DRAWING_RECTANGLE) {
					if(mapTool == "rectQueryTool")
					{
						//矩形查询车辆
						 var url = globalConfig.webPath + "/vehicle/viewVehicleInArea.action?enclosureType=rect&strRoutePoints="+ strPoints;			 
						 parent.openRouteWindow(url, 720,420,"区域查车", function()
						{
							 //关闭窗口时的回调函数
							   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
						});
					}else
					{
						//画出矩形区域
						var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=rect&strRoutePoints="+ strPoints+"&mapType="+mapType;		 
						 parent.openRouteWindow(url, 720,390,"多边形区域编辑", function()
						{
							   //关闭窗口时的回调函数
							   map.removeOverlay(e.overlay); //关闭窗口时，擦掉画图的图元
						});
					}
				}
				//result += "</p>";
				//$("showOverlayInfo").style.display = "none";
				//$("panel").innerHTML += result; //将绘制的覆盖物信息结果输出到结果面板
			};
			
			//添加鼠标绘制工具监听事件，用于获取绘制结果
	    drawingManager.addEventListener('overlaycomplete', overlaycomplete);

		$("#rectTool").click(function(){
			reset();
			mapTool = this.id; //画矩形
			drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE) //画矩形
		    drawingManager.open();
		});

		$("#rectQueryTool").click(function(){
			reset();
			mapTool = this.id; ///矩形查询车辆
			drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE) //画矩形
		    drawingManager.open();
		});

		$("#polylineTool").click(function(){
			reset();
			mapTool = this.id; 
			drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE) //画线路
		    drawingManager.open();
		});

		$("#polygonTool").click(function(){
			reset();
			drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON) //画多边形
		    drawingManager.open();
		});

		$("#circleTool").click(function(){
			reset();
			drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE) //画圆形
		    drawingManager.open();
		});
		//地图标注
		$("#markerTool").click(function(){
			reset();
		    mapTool = this.id; 
			drawingManager.setDrawingMode(BMAP_DRAWING_MARKER) //标注
		    drawingManager.open();
		});
		//地图标注
		$("#keyPointTool").click(function(){
			reset();
		    mapTool = this.id; 
			drawingManager.setDrawingMode(BMAP_DRAWING_MARKER) //标注
		    drawingManager.open();
		});
		//拖动地图
		$("#panelTool").click(function(){
			reset();
		    mapTool = this.id; 
			drawingManager.setDrawingMode("handler");
			drawingManager.close(); //关闭画的模式
		});
		//拖动地图
		$("#routePlanTool").click(function(){
			//$('#routePlanWindow').window('open');
			window.parent.openRoutePlanWindow();
		});
		
		//保存地图兴趣点
		$("#saveTool").click(function(){
			reset();
		mapTool = this.id; 
			drawingManager.setDrawingMode("handler");
			drawingManager.close(); //关闭画的模式
			var centerPoint = map.getCenter();
			var zoom = map.getZoom();
			var postData = {lat:centerPoint.lat, lng:centerPoint.lng, zoom:zoom};
			var url =globalConfig.webPath +  "/user/setMapCenter.action";
			 $.getJSON(url, postData, function(result){
				 //$.messager.alert("提示",result.message);
				 alert(result.message);
			});
		});

		//拖动地图
		$("#showAllTool").click(function(){
			reset();
		    mapTool = this.id; 
			drawingManager.setDrawingMode("handler");
			drawingManager.close(); //关闭画的模式
			var params = {};
			 $.getJSON( "<%=ApplicationPath%>/vehicle/getAllRealData.action", params, 
						function(result){		
			                if(result.success)
							 {//逐一创建marker
								 OperatorObj.centerMarkerOverlays(result.data);
							 }else
				             {
								 alert("创建失败:"+result.message);
							 }

			           }
		   );
		});

		
       loadEnclosures();//加载电子围栏到地图上面
   	   if(vehicleId.length >0)
			{
				refreshRealData();//开始不断刷新指定车辆的GPS数据，在地图上显示
		         setInterval("refreshRealData()", 10000);
			}
	   //初始化地点搜索框的autocomplete
	   window.parent.MyMap.initAutoComplete();
});
var markerId = 1;
// var markerInfoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>哈哈，你看见我啦！我可不常出现哦！</p><p style='font-size:14px;'>赶快查看源代码，看看我是如何添加上来的！</p>");


    /**
	 * 根据数据库记录,创建关键点,绑定点击事件，点击时，打开窗口，显示关键点信息
	 */
	function createExtendKeyPoint(lat, lng, radius, id, keyPointName)
	{
	    OperatorObj.removeMapArea(id);
		var pt = new BMap.Point(lng, lat);
		var icon = "images/track/keyPoint48.png";
        var myIcon = new BMap.Icon(icon, new BMap.Size(48,48));
        var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中  
	   marker.addEventListener("click", function(){
		   //关键点点击事件
				 var url = globalConfig.webPath + "/map/viewKeyPoint.action?EntityID="+ id;
				 // InfoWindow.open(url, 680, 490);
				 parent.openRouteWindow(url, 660,370,"关键点区域设置");
	   });
	   
		var label = OperatorObj.createLabel(id, lat, lng, keyPointName);
		OperatorObj.cacheAreaOverlay(id, marker,label);
		return marker;

	}

	 /**
	 * 根据数据库记录,创建标注,绑定点击事件，点击时，打开窗口，显示信息
	 */
	function createExtendMarker(lat, lng, radius, id, markerName, iconName)
	{
	    OperatorObj.removeMapArea(id);
		var pt = new BMap.Point(lng, lat);
		var icon = "images/track/marker.png";
		if(iconName!= null && iconName.length > 0)
		icon = "MapIcon/"+iconName;
		
        var myIcon = new BMap.Icon(icon, new BMap.Size(48,48));
        var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中  
	    marker.addEventListener("click", function(){
		        //关键点点击事件
				 var url = globalConfig.webPath + "/map/viewMarker.action?EntityID="+ id;
				 parent.openRouteWindow(url, 660,290,"地标设置");
	    });
	   
		var label = OperatorObj.createLabel(id, lat, lng, markerName);
		OperatorObj.cacheAreaOverlay(id, marker,label);
		return marker;
	}

/**
 * 根据数据库的线路记录，创建线路，并绑定点击事件
 * strPoints是后台传递过来的坐标数据字符长
 * 格式101,34;102,35;103.36
 * id是多边形围栏的id
 */
function createExtendPolyline(strPoints, id,name, centerLat, centerLng)
{
	    OperatorObj.removeMapArea(id);
	    if(!strPoints)
		   return;
		var points = stringToPoint(strPoints);
		var polyline = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
        map.addOverlay(polyline);
		//var mapType ="baidu";
		//绑定点击事件
        polyline.addEventListener("click", function(){
               var url = globalConfig.webPath + "/map/viewRoute.action?EntityID="+ id+"&strRoutePoints="+strPoints;
			 //打开路线编辑窗口
			 parent.openRouteWindow(url, 720,490,"路线编辑");
        });
		var label = OperatorObj.createLabel(id, centerLat, centerLng, name);
		OperatorObj.cacheAreaOverlay(id, polyline,label);
		return polyline;
}

/**
  * 创建围栏，并绑定点击事件
  * @id 是数据库的围栏id
  * @enclosureType, 类型：circle, rect,polygon三种
  */
	function createExtendEnclosure(strPoints, radius, id, enclosureType,name, centerLat, centerLng)
	{
	    OperatorObj.removeMapArea(id);
	    if(!strPoints)
		   return;
		var style = {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5};
		var points = stringToPoint(strPoints);
		var overlay = null;
	    if(enclosureType == "circle")
		{
		      var center = points[0];
		      overlay = new BMap.Circle(center, radius, style);
              map.addOverlay(overlay);
		}else if(enclosureType == "rect")
	    {
		      overlay = new BMap.Polygon(points, style);
			  map.addOverlay(overlay);
	     }else 	if(enclosureType == "polygon")
		 {
		      overlay = new BMap.Polygon(points, style);
			  map.addOverlay(overlay);
		 }
		 if(overlay != null)
		 {
         	//绑定点击事件
			overlay.addEventListener("click", function(){
				  var url = globalConfig.webPath + "/map/viewArea.action?EntityID="+ id;
			      parent.openRouteWindow(url, 710,368,"区域设置");
			});
			
		   var label = OperatorObj.createLabel(id, centerLat, centerLng, name);
		   OperatorObj.cacheAreaOverlay(id, overlay,label);
		}
	}


/**
 * 将坐标字符串(格式:lng1,lat1;lng2;lat2....)，转换成百度坐标数组
 */
function stringToPoint(strPoints){
	var points = new Array();
	var splits = strPoints.split(";");
	for (var i=0;i<splits.length;i++){
		var lngLat = splits[i].split(",");
		if (lngLat != ""){
			var lng = parseFloat(lngLat[0]);
			var lat = parseFloat(lngLat[1]);
		    var bp = new BMap.Point(lng, lat);
			points.push(bp);
		}
	}
	return points;
}



    //加载用户的围栏
	function loadEnclosures()
	{
		var params = {};
		 $.getJSON( "<%=ApplicationPath%>/map/enclosureList.action", params, 
						function(result){		
			                if(result.success)
						 {
								//逐一创建围栏
								$.each(result.data, function(i, item){
									var overlay = null;
									var label = null;
									if(item.enclosureType == "route" )
									{									
										createExtendPolyline(item.points, item.entityId, item.name, item.centerLat, item.centerLng);
									}else if(item.enclosureType == "marker" )
									{									
										createExtendMarker(item.centerLat, item.centerLng, item.raidus,  item.entityId, item.name,item.icon);
									}
									else if(item.keyPoint == 1)
									{
										createExtendKeyPoint(item.centerLat, item.centerLng, item.raidus,  item.entityId, item.name);
									}else
									{
	                                    createExtendEnclosure(item.points, item.radius, item.entityId, item.enclosureType,item.name, item.centerLat, item.centerLng);
									}
										if(item.centerLat > 0 && item.centerLng >0)
									{
										//创建标签
										//OperatorObj.createLabel(item.entityId, item.centerLat, item.centerLng, item.name);
									}
								});

						 }
		               }
				);


	}

	var realDataMap = {};
	//获取实时数据
	function refreshRealData()
	{
	     $.ajax({
				 url: '<%=ApplicationPath%>/vehicle/refreshRealData.action',
					 type: 'POST',					
					 data: {vehicleId: vehicleId},
					 datatype: "json",
				 	 timeout: 45000,//超时时间45秒
					 success: function(msg){
						 if(msg.success)
						 {
							 var newRd = msg.data;
							 var realDataId = newRd.ID;
							 if(!realDataId)
								 realDataId = newRd.id;
							 var oldRd = realDataMap[realDataId];
							 refreshGrid(newRd); //填充表格数据
							 if(oldRd )
							 {
								 if((oldRd.latitude == newRd.latitude
								   && oldRd.longitude == newRd.longitude) || oldRd.sendTime == newRd.sendTime)
								 {
							      realDataMap[realDataId] = newRd;
								 return;
								 }
							 }							 
							 realDataMap[realDataId] = newRd;
							 var gpsData = convertRecord(msg.data);
							 OperatorObj.drawRoute(gpsData);
						 }
					 },
				 	error: function()
				 	{
				 		//alert("网络错误!");
				 	}
		});

	}

	function refreshGrid(rd)
	{
		$(".td_realdata").each(function()
		{
			  var id = $(this).attr("id");
			  var data = rd[id];
			  $(this).html(data);
		});

	}

	function convertRecord(rd)
	 {
		  var vehicleInfo = {id:rd.ID, text:rd.plateNo, vehicleId:rd.ID, rLat:rd.latitude,rLng:rd.longitude, tLat:rd.latitude, tLng:rd.longitude,status:rd.status,color:rd.plateColor,validate:rd.valid,direction:rd.direction,gpsTime:('2014-'+rd.sendTime),
								  angleInt:rd.direction, statusInt:0, speed:rd.velocity, warnTypeId:0, online:rd.online};
		  
	 rd.orgLatitude = parseFloat(rd.orgLatitude).toFixed(6);
	 rd.orgLongitude = parseFloat(rd.orgLongitude).toFixed(6);
	 rd.gas = parseFloat(rd.gas).toFixed(1);
	 rd.mileage = parseFloat(rd.mileage).toFixed(1);
	 rd.velocity = parseFloat(rd.velocity).toFixed(1);
	 rd.recordVelocity = parseFloat(rd.recordVelocity).toFixed(1);
		  vehicleInfo = $.extend(rd, vehicleInfo);
		  return vehicleInfo;

	 }

</script>
