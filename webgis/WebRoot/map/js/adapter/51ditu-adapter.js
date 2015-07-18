

/**
 * 51ditu 操作封装
 * 支持对电子围栏设置、行驶区域设置和行驶路线设置功能。
 */
function Map(id, user) {
	this._user = user || "";
	this._id = id;
	this._oMap = null;
	this._defaultLatLngDiff = 100000;
	this._divObj = null;
	this._toolbar = null;
	this._currentProvince = null;
	this._currentCity = null;
	this._color = "blue";
	this._bgcolor = "yellow";
	this._weight = 3;
	this._opacity = 0.5;
	this._defaultConfig = {
		hand       : true, 
		measure    : true,
		zoomOut    : true,
		zoomIn     : true,
		search     : true,
		polyline   : false,
		rect       : false,
		polygon    : false,
		print      : true,
		fullScreen : true,
		marker     : false,
		markerExt  : true,
		standMap   : true,
		overviewMap: true,
		scale      : true
	}
	this.defaultText = {
		getAddreeDefaultText : "正在获取地址信息, 请稍候......"
	}
}

Map.prototype.setCurrentProvince = function(currentProvince){
	this._currentProvince = currentProvince;
}

Map.prototype.getCurrentProvince = function(){
	return this._currentProvince;
}


Map.prototype.setCurrentCity = function(currentCity){
	this._currentCity = currentCity;
}

Map.prototype.getCurrentCity = function(){
	return this._currentCity;
}
/**
 * 地图初始化
 * 
 * @param   divObj div元素
 * @param   lat 地图初始纬度
 * @param   lng 地图初始经度
 * @param   zoomLevel 地图初始缩放等级
 * @returns {Number}
 */
Map.prototype.mapInit = function(divObj, lat, lng, zoomLevel, defaultCity, tools) {
	try {
		
		// var LTMaps;
		if ((typeof (LTMaps) != "undefined") && divObj != null) {
			this._oMap = new LTMaps(divObj);
			this._divObj = document.getElementById(divObj);
			this._divObj.style.display = "block";
			// 地图中心店的设置必须在控件设置之前, 否则报错
			this._oMap.centerAndZoom(this.createPoint(lat, lng), zoomLevel);
			this._initLat = lat;
			this._initLng = lng;
			this._initZoomLevel = zoomLevel;
			this._initCenterPoint = this.getCenterPoint();
			
			this._centerLat = lat;
			this._centerLng = lng;
			this._centerZoomLevel = zoomLevel;
			// this.setCenter(this.createPoint(lat, lng), zoomLevel);
			// alert(this._initCenterPoint);
			this.initStandardControls(tools);
			this.initToolbarControls(tools);
			this._currentCity = defaultCity || Map.locale.defaultCity;
			this.bindZoomInHandler();
			this._oMap.handleMouseScroll();
			return 1;
		} else {
			return 0;
		}
	} catch (e) {
		alert(e);
		return -1;
	}
};

Map.prototype.clearZoomInHandler = function(){
	if (this.zoomInHandler){
		this.removeListener(this.zoomInHandler);
		this.zoomInHandler = null;
	}
}

Map.prototype.bindZoomInHandler = function(){
	if (!this.zoomInHandler){
		this.zoomInHandler = this.eventBindObject(this._oMap, "dblclick", this._oMap, function(){this.zoomIn()})
	}
}



Map.prototype.mapStatusSwitch = function(status){
	var point = this.getCenterPoint();
	
	// alert(point.getLatitude() + "," + point.getLongitude());
	
	switch(status){
	case 0:
		this.setCenter(this.createPoint(34.75846,113.62466) ,this._initZoomLevel);
		break;
	case 1:
		this.setCenter(this.createPoint(38.29348,109.29054) ,13);
		break;
	}
}

/**
 * 标准控件:放大缩小, 鹰眼, 比例尺
 */
Map.prototype.initStandardControls = function(opts){
	try{
		if (!opts) {opts = this._defaultConfig;}
		// 标准控件, 放大缩小, 鹰眼
		this._oMap.addControl(new LTStandMapControl());
		this._oMap.addControl(this.createScaleControl());
		if (opts.overviewMap)this._oMap.addControl(new LTOverviewMapControl());
		// 比例尺
		
	}catch(e){
		// alert(e);
	}
}

/**
 * 测距, 拉框放大, 拉框缩小, 城市跳转, 打印, 地理信息查询
 */
Map.prototype.initToolbarControls = function(opts){
	try{
		var operatorObj = this;
		
		this._toolbar = new LTControlsToolbar("ltmap-toolbar", operatorObj, 65);
		if (!opts) opts = this._defaultConfig;
		
		// 拖动工具
		if (opts.hand){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTHand("hand"), 
					"",
					"hand.gif", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.hand
				)
			);
		}
		
		// 测距
		if (opts.measure){
			
	        this._toolbar.appendControl(
	        	new LTControlsToolbarItems(
					this._id, 
					new LTPolyLineControl("measure", this, "measure"), 
					"", 
					"measurement.gif", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.measure
				)
	        );
		}
		
		// 拉框放大
		if (opts.zoomOut){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("zoomOut", this, "zoomOut"), 
					"", 
					"zoomout.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.zoomOut
				)
			);
			
			
		}
		
		// 拉框缩小
		if (opts.zoomIn){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("zoomIn", this, "zoomIn"), 
					"", 
					"zoomin.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.zoomIn
				)
			);
		}
		

		// 矩形区域
		if (opts.rect){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("rect", this), 
					"", 
					"rect.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.rect
				)
			);
		}
		
		
		// 绘制折线
		if (opts.polyline){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolyLineControl("polyline", this),
					"", 
					"polyline.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.polyline
				)
			);
		}
		
		
		// 绘制多边形区域
		opts.polygon = false;
		if (opts.polygon){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolygonControl("polygon", this), 
					"",
					"polygon.gif", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.polygon
				)
			);
		}
		
		
		
		
		// 城市搜索
		if (opts.search){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(this._id, 
					new LTCityLocation("city-location", this), 
					"", 
					"search.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.search.name
				)
			);
		}
		
		// 绘制标记 官方
		if (opts.marker){
			var ltMarkControl = new LTMarkControl();
			ltMarkControl.setVisible(false); 
			
			
			this.eventBind(ltMarkControl, "mouseup" ,function(point){
				operatorObj._toolbar.controlDomClick(conMarker);
				if (operatorObj._drawPointEnd) operatorObj._drawPointEnd(
						operatorObj.pointToString([point]), 
						point
					);
			});
			this._oMap.addControl(ltMarkControl);
			var conMarker = this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					ltMarkControl, 
					"", 
					"poi.gif", 
					this._toolbar._toolbarControls.length
				)
			);
		}
		
		// 绘制标记 扩展
		if (opts.markerExt){
			var ltMarkerExtControl = new LTMarkerExtControl(this._user, this);
			ltMarkerExtControl.initialize();
			var conMarkerExt = 
				this._toolbar.appendControl(new LTControlsToolbarItems(this._id, ltMarkerExtControl, "", "poi.gif", this._toolbar._toolbarControls.length));
			
		}
		
		if (opts.configCenter){
			// 全屏
			var configCenterControl = new LTControlsToolbarItems(
					this._id, new LTConfigCenter("configCenter", this), 
					"", "save.gif", 0, Map.locale.tool.configCenter, true);
			configCenterControl.dom.onclick = function(){
				configCenterControl._handler.btnClick();
			}
			this._toolbar.appendDependentControl(configCenterControl);
		}
		
		if (opts.useCenter){
			// 全屏
			var useCenterControl = new LTControlsToolbarItems(this._id, 
					new LTUseCenter("useCenter", this), "", "home.gif", 0, Map.locale.tool.useCenter, true);
			useCenterControl.dom.onclick = function(){
				useCenterControl._handler.btnClick();
			}
			this._toolbar.appendDependentControl(useCenterControl);
		}
		
		opts.clear = true;
		if (opts.clear){
			var clearControl = new LTControlsToolbarItems(
				this._id, new LTClearControl("clear", this), "", "clear.gif", 0, Map.locale.tool.clear, true);
			clearControl.dom.onclick = function(){
				clearControl._handler.btnClick();
			}
			this._toolbar.appendDependentControl(clearControl);
		}
		
		
		if (opts.print){
			this._toolbar.appendDependentControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPrint("map-print", this), 
					"", 
					"print.gif", 
					0, 
					Map.locale.tool.print, true
				)
			);
		}
		
		if (opts.fullScreen){
			
		}
		this._toolbar.createHTML();
		document.body.appendChild(this._toolbar._obj);
	}catch(e){
		alert(e);
	}
}

/**
 * 创建比例尺控件
 */
Map.prototype.createScaleControl = function(){
	var scaleControl = new LTScaleControl();
	scaleControl.units = [[1000,"km"],[1,"m"]];//设置比例尺控件的单位，默认为[[1000,"公里"],[1,"米"]]
	scaleControl.setColor("green");//设置比例尺控件的颜色
	return scaleControl;
}

/**
 * 创建经纬度对象
 * 
 * @param lat 纬度
 * @param lng 经度
 * @returns {GLatLng}
 */
Map.prototype.createPoint = function(lat, lng) {
	return new LTPoint(this.latLngFormat(lng), this.latLngFormat(lat));
	// return new LTPoint(113.04095, 22.56515);
};

Map.prototype.createPointByString = function(string) {
	var points = this.stringToPoint(string);
	return this.createMarker(points[0]);
}


/**
 * 经纬度正向转换
 */
Map.prototype.latLngFormat = function(latLng) {
	return latLng * this._defaultLatLngDiff;
}

/**
 * 经纬度反向转换
 */
Map.prototype.latLngFormatReserve = function(latLng) {
	return parseFloat(latLng / this._defaultLatLngDiff);
}

/**
 * 获取经纬度对象
 * 
 * @param marker 标记对象
 * @returns {GLatLng}
 */
Map.prototype.getPoint = function(marker) {	
	return marker.getPoint();
};

/**
 * 获取当前地图的缩放等级
 * 
 * @returns {int}
 */
Map.prototype.getZoom = function() {
	return this._oMap.getCurrentZoom();
};

/**
 * 画线对象
 * 
 * @param points 标记点数组
 * @param color  线颜色
 * @param weight 线粗细度
 * @param opacity 线透明度
 * @returns {GPolyline}
 */
Map.prototype.createPolyline = function(points, color, weight, opacity) {
	// return new GPolyline(points, color, weight, opacity);
	return new LTPolyLine(points, color || this._color, weight || this._weight, opacity || this._opacity);
};

/**
 * 在地图上增加叠加层
 * 
 * @param overlay 需要添加在地图上的叠加层
 */
Map.prototype.addOverlay = function(overlay) {
	this._oMap.addOverLay(overlay);
};

/**
 * 在地图上删除叠加层
 * 
 * @param overlay 需要在地图上删除的叠加层
 * @param flag 可选参数
 */
Map.prototype.removeOverlay = function(overlay, flag) {
	this._oMap.removeOverLay(overlay, flag);
};

/**
 * 在地图上创建多边形
 * 
 * @param points 多边形点数组
 * @param color  多边形边线颜色
 * @param bgcolor 多边形填充色
 * @param weight 多边形边线粗细
 * @param opacity 多边形透明度
 * @returns {GPolygon}
 */
Map.prototype.createPolygon = function(points, color, bgcolor, weight, opacity) {
	return new LTPolygon(points,
			color || this._color ,bgcolor || this._bgcolor ,weight || this._weight ,opacity || this._opacity);
};


Map.prototype.createRect = function(bounds,color,bgcolor,weight,opacity){
	return new LTRect(bounds,color || this._color ,bgcolor || this._bgcolor ,weight || this._weight ,opacity || this._opacity);
}

Map.Label = {};
Map.Label.ANCHORX = 12;
Map.Label.ANCHORY = -26;
Map.Label.OPACITY = 1;

/**
 * 创建标记的标签文字信息
 * id, latLng, title, "labelstyle", new GSize(x, y), opacity
 * @param id
 * @param latLng
 * @param title
 * @param x
 * @param y
 * @param opacity
 */
Map.prototype.createLabel = function(id, lat, Lng, title, x, y, opacity) {
	var mapText = new LTMapText(this.createPoint(lat, Lng), [x || 0, y || 0]);
	mapText.setLabel(title || "");
	mapText.setOpacity(opacity || 100);
	return mapText;
};

Map.prototype.setLabelState = function(label, flag) {
	label.setVisible(flag);
};


/**
 * 更换标签文字信息
 * @param label
 * @param text
 */
Map.prototype.changeLabelText = function(label, text) {
	label.setLabel(text);
};

/**
 * 画圆
 * 
 * @param lat 圆心经度
 * @param lng 圆心纬度
 * @param radius 圆半径
 * @returns
 */
Map.prototype.drawCircle = function(lat, lng, radius) {
	
};

/**
 * 地图居中
 * 
 * @param points 中心点经纬度
 * @param zoomLevel 缩放等级
 */
Map.prototype.setCenter = function(point, zoomLevel) {
	try {
		this._oMap.moveToCenter(point, zoomLevel || this.getZoom());
	}catch(e){
		// alert(e);
	}
	
	// moveToCenter setCenterAtLatLng
};

/**
 * 设置标记图片地址
 * 
 * @param marker 标记对象
 * @param imageUrl 图片路径
 */
Map.prototype.markerSetImage = function(marker, imageUrl) {
	marker.setIconImage(imageUrl);
};

/**
 * 设置标记经纬度
 * 
 * @param marker 标记对象
 * @param lat 设置标记点的经度
 * @param lng 设置标记点的纬度
 */
Map.prototype.markerSetPosition = function(marker, lat, lng) {
	
	marker.setPoint(this.createPoint(lat, lng));
};

Map.prototype.labelSetPosition = function(label, lat, lng) {
	label.setPoint(this.createPoint(lat, lng));
};


/**
 * 事件绑定
 * @param obj 绑定对象
 * @param eventName 事件名称
 * @param handle 回调函数
 * @param flag 可选参数
 */
Map.prototype.eventBind = function(obj, eventName, handle, flag) {
	return LTEvent.addListener(obj, eventName, handle);
};

/**
 * 指定对象绑定特定对象事件
 */
Map.prototype.eventBindObject = function(obj, eventName, targetObj, handle) {
	return LTEvent.bind(obj, eventName, targetObj, handle);
};


Map.prototype.removeListener = function(handler) {
	return LTEvent.removeListener(handler);
};


/**
 * 创建标记对象的图片对象
 * 
 * @param width
 * @param height
 * @param anchorWidth
 * @param anchorHeight
 * @param imagePath
 * @returns {___icon1}
 */
Map.prototype.createIcon = function(width, height, anchorWidth, anchorHeight, imagePath) {
	return new LTIcon(imagePath, [width, height], [anchorWidth, anchorHeight]);
};

/**
 * 创建标记
 * 
 * @param GLatLng
 * @param icon
 * @param title
 * @returns {GMarker}
 */
Map.prototype.createMarker = function(point, icon, title) {
	// trace("createMarker");
	return new LTMarker(
		point, 
		icon
	);
};

Map.prototype.createCurrentMarker = function(point) {
	// trace("createMarker");
	return new LTMarker(
		point, 
		this.createIcon(12, 12, 6, 6, "images/track/currentPoi.png")
	);
};


/**
 * 标记点击事件绑定, 信息窗口显示
 * 
 * @param marker
 * @param opts
 * @param open
 */
Map.prototype.bindClickEvent = function(marker, opts, htmlfn, handle, open, width, height) {
	var operatorObj = this;
	var handler = this.eventBind(marker, "click", function() {
		if (typeof(opts) == "object"){
			operatorObj.openInfoWindowHtml(marker, htmlfn(opts), handle, width, height);
		}else{
			operatorObj.openInfoWindowHtml(marker, opts, handle, width, height);
		}
	});
	
	if (open) {
		if (typeof(opts) == "object"){
			operatorObj.openInfoWindowHtml(marker, htmlfn(opts), handle, width, height);
		}else{
			operatorObj.openInfoWindowHtml(marker, html, handle, width, height);
		}
	}
	return handler;
};

/**
 * 标记信息窗口
 * courseLngcourseLng
 * @param marker 标记
 * @param opts 属性值
 * @param open 是够打开
 */
Map.prototype.openInfoWindowHtml = function(marker, html, handle, width, height) {
	if (!handle) handle = function(){};
	var openInfoWinHtml = marker.openInfoWinHtml(html);
	openInfoWinHtml.setWidth(width || 300);
	openInfoWinHtml.setHeight(height || 180);
	handle();
};

/**
 * 获取并设置地理信息
 * 
 * @param {string} id
 * @param {string} latLng return void
 */
Map.prototype.getAddress = function(id, lat, Lng) {
	var reg = new LTRegoLoader();
	var address = document.getElementById("address_" + id);
	if (address){
		// address.innerHTML = this.defaultText.getAddreeDefaultText;
	}
	LTEvent.bind(reg,"loaded",reg,function(obj){
		if (address) address.innerHTML = obj.describe;
	});
	reg.loadDescribe(this.createPoint(lat, Lng));
};

Map.prototype.getAddressCallback = function(lat, lng, callback) {
	var reg = new LTRegoLoader();
	LTEvent.bind(reg,"loaded",reg,function(obj){
		var address = obj.describe;
		if (callback){
			callback(address);
		}
	});
	reg.loadDescribe(this.createPoint(lat, Lng));
};

/**
 * 地图边界判断
 * @param lat
 * @param lng
 * @returns {Boolean}
 */
Map.prototype.beyondTheMark = function(lat, lng) {
	lat = lat * this._defaultLatLngDiff;
	lng = lng * this._defaultLatLngDiff;
	var mapBounds = this._oMap.getBoundsLatLng();
	if ((lng > mapBounds.getXmin() && lng < mapBounds.getXmax()) && 
			(lat > mapBounds.getYmin() && lat < mapBounds.getYmax())) {
		return true;
	}
	return false;
};

/**
 * 创建搜索控件
 */
Map.prototype.createSearchControl = function(handler) {
	return new LTLocalSearch(handler);
};

/**
 * 绘制线路
 */
Map.prototype.setDrawPolylineEndCallback = function(callback) {
	this._drawPolylineEnd = callback;
};

/**
 * 创建矩形区域
 */
Map.prototype.setDrawRectEndCallback = function(callback) {
	this._drawRectEnd = callback;
};

/**
 * 创建多边形区域
 */
Map.prototype.setDrawPolygonEndCallback = function(callback) {
	this._drawPolygonEnd = callback;
};

/**
 * 创建多边形区域
 */
Map.prototype.setDrawPointEndCallback = function(callback) {
	this._drawPointEnd = callback;
};


/**
 * 将矩形区域, 折线, 多边形区域的点信息转换为制定字符串信息
 */
Map.prototype.pointToString = function(points, flag){
	var str = [];
	for (var i=0;i<points.length;i++){
		str.push(
			(points[i].getLongitude() / this._defaultLatLngDiff) + 
			"," + 
			(points[i].getLatitude() / this._defaultLatLngDiff)
		);
	}
	if (flag){
		str.push(str[0]);
	}
	return str.join("#");
};

/**
 * 将矩形区域, 折线, 多边形区域的定字符串信息转换为点信息
 */
Map.prototype.stringToPoint = function(string){
	var points = new Array();
	var splits = string.split("#");
	for (var i=0;i<splits.length;i++){
		var lngLat = splits[i].split(",");
		// alert(lngLat);
		if (lngLat != ""){
			points.push(this.createPoint(parseFloat(lngLat[1]), parseFloat(lngLat[0])));
		}
	}
	return points;
}

Map.prototype.createPolylineByString = function(string){
	return this.createPolyline(this.stringToPoint(string));
}

Map.prototype.createRectByString = function(string){
	var points = this.stringToPoint(string);
	return this.createRect(
		new LTBounds(
			points[0].getLongitude(),
			points[0].getLatitude(),
			points[2].getLongitude(),
			points[2].getLatitude()
		)
	);
}

Map.prototype.createPolygonByString = function(string, color, bgcolor, weight, opacity){
	var points = this.stringToPoint(string);
	return this.createPolygon(this.stringToPoint(string), color, bgcolor, weight, opacity);
}

Map.prototype.clearOverlays = function(){
	this._oMap.clearOverLays();
}

/**
 * 获取多边形区域, 矩形区域的最佳显示中心点
 */
Map.prototype.getBestMap = function(points){
	this._oMap.getBestMap(points);
}

/**
 * 获取中心点坐标点
 */
Map.prototype.getCenterPoint = function(){
	return this._oMap.getCenterPoint();
}

/**
 * 获取中心点经纬度
 */
Map.prototype.getCenterPointLatLng = function(){
	var point = this._oMap.getCenterPoint();
	return [this.latLngFormatReserve(point.getLatitude()), this.latLngFormatReserve(point.getLongitude())];
}

/**
 * 获取矩形中心点经纬度
 */
Map.prototype.getRectCenterPointLatLng = function(rect){
	return rect.getBounds().getCenterPoint();
}

Map.prototype.createInfoWindowObj = function(lat, lng, title, html){
	var infoWindow = new LTInfoWindow(this.createPoint(lat, lng))
	infoWindow.setTitle(title || "");
	infoWindow.setLabel(html || "");
	return infoWindow;
}


Map.prototype.computeScale = function(lat1, lng1, lat2, lng2){
	var mapDistance = GetDistance(lat1, lng1, lat2, lng2)/10;
	var deflevel = 2;
	if(mapDistance>0 && mapDistance<=0.1)
	{
		deflevel = 2;
	}
	else if(mapDistance>0.1 && mapDistance<=0.2)
	{
		deflevel = 3;
	}
	else if(mapDistance>0.2 && mapDistance<=0.4)
	{
		deflevel = 4;
	}
	else if(mapDistance>0.4 && mapDistance<=1)
	{
		deflevel = 5;
	}
	else if(mapDistance>1 && mapDistance<=2)
	{
		deflevel = 6;
	}
	else if(mapDistance>2 && mapDistance<=4)
	{
		deflevel = 7;
	}
	else if(mapDistance>4 && mapDistance<=10)
	{
		deflevel = 8;
	}
	else if(mapDistance>10 && mapDistance<=20)
	{
		deflevel = 9;
	}
	else if(mapDistance>20 && mapDistance<=40)
	{
		deflevel = 10;
	}
	else if(mapDistance>40 && mapDistance<=100)
	{
		deflevel = 11;
	}
	else if(mapDistance>100 && mapDistance<=180)
	{
		deflevel = 12;
	}
	else if(mapDistance>180 && mapDistance<=400)
	{
		deflevel = 13;
	}
	else if(mapDistance>400 && mapDistance<=800)
	{
		deflevel = 13;
	}
	else if(mapDistance>800)
	{
		deflevel = 13;
	}
	return deflevel;
}

/**
 * 将经纬度对象转换为数组经纬度, 纬度在前
 */
Map.prototype.getLatLngArrayFromPointObject = function(pointObject){
	return [
	    pointObject.getLatitude() / this._defaultLatLngDiff, 
	    pointObject.getLongitude() / this._defaultLatLngDiff
	]
}

/**
 * 关闭标签信息窗口
 */
Map.prototype.closeInfoWindow = function(marker){
	if (marker) marker.closeInfoWin();
}


Map.prototype.unLoad = function() {
	
};

/**
 * 
 */
Map.prototype.setMarkerVisible = function(marker, flag){
	marker.setVisible(flag);
}

/**
 * 获取中心点坐标点
 */
Map.prototype.setMarkerLabelVisible = function(markerLabel, flag){
	markerLabel.setVisible(flag);
}

Map.prototype.setPolygonBackgroundColor = function(polygon, color){
	polygon.setFillColor(color);
}

Map.prototype.setPolygonShow = function(polygon){
	polygon.div.style.display = "block";
}

Map.prototype.setPolygonHide = function(polygon){
	polygon.div.style.display = "none";
}

Map.prototype.setUrlHead = function(url){
	this.urlHead = url;
}

Map.prototype.getPolygonPoints = function(polygon){
	return polygon.getPoints();
}

Map.prototype.formatPointsToArray = function(points, flag){
	var array = [];
	for (var i=0;i<points.length;i++){
		if (flag){
			array.push([this.getPointLat(points[i]), this.getPointLng(points[i])])
		}else{
			array.push([this.getPointLng(points[i]), this.getPointLat(points[i])])
		}
		
	}
	return array;
}

Map.prototype.getPointLat = function(point) {
	return this.latLngFormatReserve(point.getLatitude());
};

Map.prototype.getPointLng = function(point) {
	return this.latLngFormatReserve(point.getLongitude());
};

Map.prototype.setDrawCircleEndCallback = function(callback) {
	this._drawCircleEnd = callback;
};

Map.prototype.setCenterPoint = function(lat, lng, zoomLevel) {
	this._centerLat = lat;
	this._centerLng = lng;
	this._centerZoomLevel = zoomLevel;
}

Map.prototype.useCenterPointConfig = function() {
	try{
		this.setCenter(this.createPoint(this._centerLat, this._centerLng), this._centerZoomLevel);
	}catch(e){
		
	}
};

Map.prototype.configCenterPointCallback = function(callback) {
	this._configCenterPointCallback = callback;
}

Map.prototype.configCenterPoint = function() {
	var center = this.getCenter();
	this._centerLat = center.lat;
	this._centerLng = center.lng;
	this._centerZoomLevel = this.getZoom();
	if (this._configCenterPointCallback){
		this._configCenterPointCallback(this._centerLat, this._centerLng, this._centerZoomLevel);
	}
};

Map.prototype.getCenter = function() {
	var center = this._oMap.getCenterPoint();
	return {
		lat : this.getPointLat(center),
		lng : this.getPointLng(center)
	}
};

Map.prototype.getCenterOfPolygon = function(polygon){
	var PI = 22/7, Lon, Hyp, Lat;
	var X = 0;
	var Y = 0;
	var Z = 0;
//	polygon.getPath().forEach(function (vertex, inex) {
//		lat1=vertex.lat();
//		lon1=vertex.lng();
//		lat1 = lat1 * PI/180
//		lon1 = lon1 * PI/180
//		X += Math.cos(lat1) * Math.cos(lon1)
//		Y += Math.cos(lat1) * Math.sin(lon1)
//		Z += Math.sin(lat1)
//	})
//	
	
	var points = polygon.points;
	
	for (var i=0;i<points.length;i++){
		var lat1 = this.getPointLat(points[i]);
		var lon1 = this.getPointLng(points[i]);
		lat1 = lat1 * PI/180
		lon1 = lon1 * PI/180
		X += Math.cos(lat1) * Math.cos(lon1)
		Y += Math.cos(lat1) * Math.sin(lon1)
		Z += Math.sin(lat1)
	}
	
	
	Lon = Math.atan2(Y, X)
	Hyp = Math.sqrt(X * X + Y * Y)
	Lat = Math.atan2(Z, Hyp)
	Lat = Lat * 180/PI;
	Lon = Lon * 180/PI;
	
	return this.createPoint(Lat,Lon);
}

Map.prototype.getPolygonBigAndSmall = function(points) {
	var array1 = [];
	var array2 = [];
	for (var i=0;i<points.length;i++){
		array1.push(this.getPointLat(points[i]));
		array2.push(this.getPointLng(points[i]));
		// this.addOverlay(this.createMarker(points[i]));
	}
	array1.sort();
	array2.sort();
	
//	console.info(array1);
//	console.info(array2);
//	console.info(array1[array1.length - 1] + "," + array2[array2.length - 1]);
//	console.info(array1[0] + "," + array2[0]);
	return {
		big   : this.createPoint(array1[array1.length - 1], array2[array2.length - 1]),
		small : this.createPoint(array1[0], array2[0])
	}
}

Map.prototype.getBigAndSmallCenter = function(opts) {
	return this.createPoint(
		(this.getPointLat(opts.small) + (this.getPointLat(opts.big) - this.getPointLat(opts.small))/2), 
		(this.getPointLng(opts.small) + (this.getPointLng(opts.big) - this.getPointLng(opts.small))/2)
	);
}

Map.prototype.getBestZoomLevelAndCenter = function(polygon) {
	var currentCenter = this.getCenter();
	var currentLevel = this.getZoom();
	if (polygon.getBounds){
		var bounds = polygon.getBounds();
		var ret = {
			zoomLevel : this._oMap.getBestZoom(bounds),
			center    : this.getBigAndSmallCenter(polygon.points[1], polygon.points[3])
		}
	}else{
		this._oMap.getBestMap(polygon.getPoints());
		var ret = {
			zoomLevel : this.getZoom(),
			center    : this.getBigAndSmallCenter(this.getPolygonBigAndSmall(polygon.getPoints()))
		}
	}
	return ret;
}