<%@ include file="/common/taglibs.jsp"%>

<%@ page language="java" pageEncoding="UTF-8"%>
<%
   String ApplicationPath = request.getContextPath() ;
   String jsPath = ApplicationPath+"/js";
   String imgPath =  ApplicationPath+"/image";
   String mapPath = ApplicationPath+"/map";
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
<link rel="stylesheet" href="toolkit.css" type="text/css" />
<link rel="stylesheet" href="<%=ApplicationPath%>/css/FormTable.css" type="text/css" />
<script type="text/javascript" src="js/public/util.js"></script>    
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery1.8.min.js"></script>
<script type="text/javascript" src="<%=jsPath%>/InfoWindow.js"></script>
<!--<script type="text/javascript" src="<%=jsPath%>/linebuffer.js"></script>-->
<script type="text/javascript" src="<%=mapPath%>/js/public/placeList.js"></script>
<script type="text/javascript" src="<%=mapPath%>/js/public/component/CityLocation.js"></script>
<script type="text/javascript" src="<%=mapPath%>/js/public/component/toolbar.js"></script>
<%@ include file="/common/taglibs.jsp"%>
<script type="text/javascript" src="<%=mapPath%>/js/public/component/smart-earth/tools.js"></script>
<!-- <script type="text/javascript" src="http://engine.gis.cttic.cn/engine?v=2.0&ser=SE_JSAPI2&uid=jlsygj"></script> 
<script type="text/javascript" src="http://app.smartearth.cn/lib?service=true&ser=SE_JSAPI2&uid=jlsygj"></script>
-->
<script type="text/javascript" src="http://a.map.icttic.cn:81/SE_JSAPI?v=tr&uid=${systemConfig.smartKey}"></script>
<script type="text/javascript" src="http://a.map.icttic.cn:81/SE_JSLIB?service=true&uid=${systemConfig.smartKey}"></script> 
<script type="text/javascript" src="<%=mapPath%>/js/adapter/smart-earth-adapter.js"></script>


<%@ include file="/common/map-adapter-locale.jsp"%>
<script type="text/javascript" src="<%=mapPath%>/js/base.js"></script>
<script type="text/javascript" src="<%=ApplicationPath%>/js/InfoWindow.js"></script>
<title></title>
<style type="text/css"> 
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow: hidden;
}
-->

.datatable
{
	font-size:12px;
	display:hidden;
}

.td_realdata
{
	color:blue;
}

#mapDiv1 {
   padding:10px;
   padding-bottom:60px;   /* Height of the footer */
}

#footer1 {
   position:absolute;
   bottom:0;
   width:100%;
   height:60px;   /* Height of the footer */
   background:#6cf;
}
</style>
</head>
<body onload="init();">
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
<div id="mapDiv" style="width: 100%; height: 100%;"></div> 
<div  id="footer">

</div>
<%
	    String vehicleId = request.getParameter("vehicleId");
		String tracking = request.getParameter("tracking");
		if(vehicleId == null)
		    vehicleId= "";
	%>


	<script type="text/javascript">
	var vehicleId = "<%=vehicleId%>";
	if(vehicleId.length > 0)
	{
		$(".datatable").show();
	}else
		$(".datatable").hide();
	    
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
									if(item.enclosureType == "route" )
									{									

										createExtendPolyline(item.points, item.entityId, item.name, item.centerLat, item.centerLng);
									}
									else if(item.enclosureType == "marker")
									{
										createExtendMarker(item.centerLat, item.centerLng, item.raidus,  item.entityId, item.name,item.icon);
									}else if(item.keyPoint == 1)
									{
										createExtendKeyPoint(item.centerLat, item.centerLng, item.raidus,  item.entityId, item.name);
									}else
									{
	                                    createExtendEnclosure(item.points, item.radius, item.entityId, item.enclosureType, item.name, item.centerLat, item.centerLng);
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
	
	var OperatorObj,map;

	function urlArgsToJson(url) {
		var json = {};
		var args = url.split("?")[1];
		args = args.split("&");
		for ( var i = 0; i < args.length; i++) {
			var items = args[i].split("=");
			json[items[0]] = items[1];
		}
		return json;
	}

	function shotCut(iconCls, vehicleId, text){
		window.parent.Srims.runShotcunt(iconCls, vehicleId, text);
	}
	//地图工具回调方法
	function setCallback()
	{
		//画出线路后，弹出区域设置窗口
		map.setDrawPolylineEndCallback(function(strPoints, ptArray, length,polyline)
		{			
			//return;
			if(strPoints)
				strPoints = strPoints.replace(/#/g,";");  //替换字符串中的#为;，防止URL post参数被截断
			 var url = globalConfig.webPath + "/map/viewRoute.action?strRoutePoints="+ strPoints;
			 //创建缓冲区
			// var bufferPoints = createLineBuffer(ptArray);
			//if(bufferPoints)
				//bufferPoints = bufferPoints.replace(/#/g,";");  //替换字符串中的#为;，防止URL post参数被截断
			 //url += "&bufferPoints="+bufferPoints;
			 // InfoWindow.open(url, 680, 490);
			 parent.openRouteWindow(url, 720,490,"路线编辑" ,function()
			{
				   map.removeOverlay(polyline); //关闭窗口时，擦掉画图的图元
			});
		});



		/**
		  * 当标注工具或者关键点工具，点击地图时，启动此回调函数，弹出参数设置窗口
		  */
		map.setDrawPointEndCallback (function(strPoints, point, isKeyPoint) {
			//alert(strPoints);
			 var url = globalConfig.webPath + "/map/viewKeyPoint.action?enclosureType=circle&strRoutePoints="+ strPoints+"&radius="+100;			 
			 parent.openRouteWindow(url, 660,370,"关键点编辑", function()
			{
				   //map.removeOverlay(circleObj); //关闭窗口时，擦掉画图的图元
			});
		});


		
		map.setDrawCircleEndCallback (function(strPoints, radius, circleObj) {
			 //var strPoints = lng+","+lat;  //
			// if(console)
			//console.log(strPoints);
			 var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=circle&strRoutePoints="+ strPoints+"&radius="+radius;			 
			 parent.openRouteWindow(url, 720,390,"圆形区域编辑", function()
			{
				   map.removeOverlay(circleObj); //关闭窗口时，擦掉画图的图元
			});
		});

		//画出多边形后，弹出多边形设置对话框
		map.setDrawPolygonEndCallback (function(strPoints, param, polygonObj) {
			 
			if(strPoints)
				strPoints = strPoints.replace(/#/g,";");  //替换字符串中的#为;，防止URL post参数被截断
			//console.log(strPoints);
			 var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=polygon&strRoutePoints="+ strPoints;			 
			 parent.openRouteWindow(url, 720,390,"多边形区域编辑", function()
			{
				 //关闭窗口时的回调函数
				   map.removeOverlay(polygonObj); //关闭窗口时，擦掉画图的图元
			});
		});

		//矩形画图的回调函数，当画出矩形后，弹出围栏设置窗口
		map.setDrawRectEndCallback (function(strPoints, bounds, rectObj) {
			 
			if(strPoints)
				strPoints = strPoints.replace(/#/g,";");  //替换字符串中的#为;，防止URL post参数被截断
			console.log(strPoints);
			 var url = globalConfig.webPath + "/map/viewArea.action?enclosureType=rect&strRoutePoints="+ strPoints;			 
			 parent.openRouteWindow(url, 720,390,"多边形区域编辑", function()
			{
				 //关闭窗口时的回调函数
				   map.removeOverlay(rectObj); //关闭窗口时，擦掉画图的图元
			});
		});

		//画出矩形查询车辆，画图后，弹出查询结果窗口
		map.setDrawRectQueryEndCallback (function(strPoints, bounds, rectObj) {
			 
			if(strPoints)
				strPoints = strPoints.replace(/#/g,";");  //替换字符串中的#为;，防止URL post参数被截断
			//console.log(strPoints + ",bounds:"+ bounds);
			 var url = globalConfig.webPath + "/vehicle/viewVehicleInArea.action?enclosureType=rect&strRoutePoints="+ strPoints;			 
			 parent.openRouteWindow(url, 720,420,"区域查车", function()
			{
				 //关闭窗口时的回调函数
				   map.removeOverlay(rectObj); //关闭窗口时，擦掉画图的图元
			});
		});

        //设置地图中心
		var mapCenterLat;
		var mapCenterLng;
		var mapZoom;
		map.configCenterPointCallback(function(centerLat,  centerLng, zoom)
		{
			if(centerLat == mapCenterLat && centerLng == mapCenterLng && zoom == mapZoom)
			{
				return;//已经设置过了
			}
			mapCenterLat = centerLat;
			mapCenterLng = centerLng;
			mapZoom = zoom;

			centerLat = centerLat / 100000;
			centerLng = centerLng / 100000;
			var postData = {lat:centerLat, lng:centerLng, zoom:zoom};
			var url =globalConfig.webPath +  "/user/setMapCenter.action";
			 $.getJSON(url, postData, function(result){
				 alert(result.message);
			});
		});


	}

	/**
	 * 废弃不用
	 */
	function createLineBuffer(ptArray)
	{
		   var strPixel = "";
		   var bufferPoints = "";//[]; //缓冲区
		   var k = 0;
			for(var m in ptArray)
			{				
				  if(k == (ptArray.length - 1))
					  break;
				  var pt1 = ptArray[k];
				  var pt2 = ptArray[k+1];
				  k = k+1;
				  var lnglat1 = new SE.LngLat(pt1[0], pt1[1]);
			      var pt1= map.fromLngLatToContainerPixel(lnglat1);
			      var lnglat2 = new SE.LngLat(pt2[0], pt2[1]);
			      var pt2 = map.fromLngLatToContainerPixel(lnglat2);
				  var pixelWidth = 50 / map.getScale();
				  var polyNodes = LineToRgn(pt1.x, pt1.y, pt2.x,pt2.y, pixelWidth, 6, 0);

				 var strPolyPoints = "";
				//var tempStr = "";
				var firstPt = "";
				var tempStr = "";
				for(var i in polyNodes)
				{
					var pn = polyNodes[i];
					var x = Math.round(pn.lng);
					var y = Math.round(pn.lat);
					var pt = new  SE.Point(x, y);
					var lnglat = map.fromContainerPixelToLngLat(pt);

					if(i == 0)
						firstPt =  lnglat.getFLng() + ","+ lnglat.getFLat();

					  if(console)
						  console.log(lnglat.getFLng() + ","+ lnglat.getFLat()); //像素坐标
					  strPolyPoints += tempStr + lnglat.getFLng() + ","+ lnglat.getFLat() ;
					  tempStr =  "#";
				}
				//bufferPoints.push(strPolyPoints);
				bufferPoints += strPolyPoints + "|";
				
				//var pl = map.createPolygonByString(strPolyPoints);
				//map.addOverlay(pl);
				 // if(console)
					 // console.log(pixel.x + ","+ pixel.y); //像素坐标
				  //strPixel += pixel.x + ","+ pixel.y + ";";
			}	

			return bufferPoints;		
	}

	function testMap()
	{
		alert("test");
	}

	var enId = 0;
	function createExtendPolyline(strPoints, id,name, centerLat, centerLng)
	{
	    if(strPoints)
				strPoints = strPoints.replace(/;/g,"#");  //替换字符串中的;为#，转换为地图所需要的格式
		else
			return; //没有节点，直接返回，无法画线路
		var polyline = OperatorObj.createPolylineById(strPoints, id, function(id)
		{
			 var url = globalConfig.webPath + "/map/viewRoute.action?EntityID="+ id;
			 // InfoWindow.open(url, 680, 490);
			 parent.openRouteWindow(url, 720,490,"路线编辑");
		});
		
		var label = OperatorObj.createLabel(id, centerLat, centerLng, name);
		

	}

	/**
	 * 根据数据库记录,创建关键点,绑定点击事件，点击时，打开窗口，显示关键点信息
	 */
	function createExtendKeyPoint(lat, lng, radius, id, keyPointName)
	{
		var icon = "images/track/keyPoint48.png";
		var enclosure = OperatorObj.createKeyPointMarkerById(id,  lat, lng, keyPointName, icon, function(id)
		{
			//关键点点击事件
			 var url = globalConfig.webPath + "/map/viewKeyPoint.action?EntityID="+ id;
			 // InfoWindow.open(url, 680, 490);
			 parent.openRouteWindow(url, 560,370,"关键点区域设置");
		});
		var label = OperatorObj.createLabel(id, lat, lng, keyPointName);
		
	}
		/**
	 * 根据数据库记录,创建地图标注,绑定点击事件，点击时，打开窗口，显示标注点信息
	 */
	function createExtendMarker(lat, lng, radius, id, name,iconName)
	{
		var icon = "mapIcon/"+iconName;
		var enclosure = OperatorObj.createKeyPointMarkerById(id,  lat, lng, name, icon, function(id)
		{
			//点击地图标注后，弹出编辑窗口
			 var url = globalConfig.webPath + "/map/viewMarker.action?EntityID="+ id;
			parent.openRouteWindow(url, 660,290,"地标设置");
		});
		var label = OperatorObj.createLabel(id, lat, lng, name);
		
	}




	function createExtendEnclosure(strPoints, radius, id, enclosureType,name,centerLat, centerLng)
	{
		
			if(strPoints)
				strPoints = strPoints.replace(/;/g,"#");  //替换字符串中的;为#，转换为地图所需要的格式
			//alert(strPoints);
		var enclosure = OperatorObj.createEnclosureById(strPoints, radius, id,  enclosureType, function(id)
		{
			 var url = globalConfig.webPath + "/map/viewArea.action?EntityID="+ id;
			 // InfoWindow.open(url, 680, 490);
			 parent.openRouteWindow(url, 720,405,"区域设置");
		});	
		
		var label = OperatorObj.createLabel(id, centerLat, centerLng, name);

	}

	
	function init(){
		var args = {};//urlArgsToJson(window.location.toString());
		/**var tools = window.parent ? window.parent.tools : null;
		if (args.tools){
			tools = eval("({" + args.tools + "})");
		}*/

		var tools = null;// {hand:true, measure:true};

		map = new Map("map-div", "");
		
        var userInfo = ${onlineUserInfo};//用户设置的地图中心
		var ret = map.mapInit("mapDiv", userInfo.mapCenterLat, userInfo.mapCenterLng, userInfo.mapLevel, null, tools);
		setCallback();
		if (ret > 0){
	      	OperatorObj = new MapOperationHandler(map, "true");
	      	OperatorObj.mapOverlayInit();
		  	OperatorObj.setDefaultTrackNodeCount(100);
		  	OperatorObj._handler.OperatorObj = OperatorObj;
		  	if (typeof(Datas) != "undefined") OperatorObj.setLocationArray(Datas);
		  	
		  	if (document.addEventListener) {
				document.addEventListener('DOMMouseScroll', mousewheel, false);
			}

			document.onmousewheel = mousewheel;

			if (!args.callback){
				if (window.parent.initCallback){
					window.parent.initCallback(OperatorObj, window.location, window, document);
				}
				
				if (window.parent.initCallback1){
					window.parent.initCallback1(OperatorObj);
				}
			}else{

				if (window.parent[args.callback]){
					
					window.parent[args.callback](OperatorObj, window.location, window, document);
				}
			}
	    }else{
	    	var mapDiv = document.getElementById("mapDiv");
	    	if (mapDiv){
	    		mapDiv.innerHTML = "";
	    		mapDiv.style.textAlign = "center";
	    		mapDiv.style.color = "green";
	    		mapDiv.style.fontWeight = "bold";
	    		mapDiv.style.marginTop = "50px";
	    		mapDiv.style.paddingTop = "25px";
	    		mapDiv.innerHTML = "<fmt:message key='error.load.map'/>";
	    	}
	    	
	    	if (window.parent.initCallback){
				window.parent.initCallback(OperatorObj, window.location, window, document);
			}	
	    }

		//loadEnclosures(); //加载电子围栏到地图上
		//车辆定时刷新，10 秒
		if(vehicleId.length >0)
		{
			refreshRealData();//开始显示
	        setInterval("refreshRealData()", 10000);
		}
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
							 var oldRd = realDataMap[newRd.ID];
							 refreshGrid(newRd); //填充表格数据
							 if(oldRd )
							 {
								 if((oldRd.latitude == newRd.latitude
								   && oldRd.longitude == newRd.longitude) || oldRd.sendTime == newRd.sendTime)
								 return;
							 }
							 realDataMap[newRd.ID] = newRd;
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
		  vehicleInfo = $.extend(rd, vehicleInfo);
		  return vehicleInfo;

	 }
  	
  	function mousewheel(event) {
		event = event || window.event;
		var flag = ((event.ctrlKey || event.CONTROL_MASK) && (event.wheelDelta || event.detail))
		if (typeof (flag) != "undefined" && flag != null) {
			if (document.all) {
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		}
	}
  </script>

</body>
</html>