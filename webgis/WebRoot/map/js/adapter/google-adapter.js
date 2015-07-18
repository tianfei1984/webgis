/**
 * Google map 操作封装
 */
function Map(id) {
	this._id = id;
	this._oMap = null;
	this._defaultLatLngDiff = 1;
	this._defaultConfig = {
			hand       : true, 
			measure    : true,
			zoomOut    : true,
			zoomIn     : true,
			search     : false,
			polyline   : true,
			rect       : true,
			polygon    : false,
			print      : true,
			fullScreen : false,
			marker     : false,
			markerExt  : false,
			standMap   : false,
			overviewMap: false,
			scale      : false,
			configCenter : true,
			useCenter  : true,
			clear      : true
		}
	
	this.zoomConfig = {
		0 : {
			region  : true,
			regionA : [0, 5],
			split   : false,
			splitA  : []
		},
		1 : {
			region  : true,
			regionA : [6, 11],
			split   : false,
			splitA  : []
		},
		2 : {
			region  : true,
			regionA : [12, 14],
			split   : false,
			splitA  : []
		},
		3 : {
			region  : true,
			regionA : [15],
			split   : false,
			splitA  : []
		}
	}
}

Map.prototype.getMapLevel = function(n){
	var hash = {}, t = [], z;
	for (key in this.zoomConfig){
		z = this.zoomConfig[key];
		
		if (z.split){
			if (z.splitA.length > 0){
				for (var i=0;i<z.splitA.length;i++){
					if (z.splitA[i] == n){
						hash[key] = true;
						t.push(key);
						break;
					}
				}
			}
		}
		
		if (z.region){
			if (z.regionA.length > 0){
				if (z.regionA.length == 1){
					if (n > z.regionA[0] || n == z.regionA[0]){
						hash[key] = true;
						t.push(key);
						break;
					}
				}else{
					if ((n > z.regionA[0] || n == z.regionA[0]) && (n < z.regionA[1] || n == z.regionA[1])){
						hash[key] = true;
						t.push(key);
						break;
					}
				}
			}
		}
	}
	return {
		array : t,
		hash  : hash
	};
}



Map.prototype.getMap = function(){
	return this._oMap;
}

Map.prototype.mapInit = function(divObj, lat, lng, zoomLevel, defaultCity,
		tools) {

	try {
		var co = this;
		divObj = document.getElementById(divObj);
		if ((typeof (GBrowserIsCompatible) != "undefined") && divObj != null) {
			tools = tools || this._defaultConfig;
			tools.clear = true;
			tools.print = true;
			divObj.style.display = "block";
			this._divObj = divObj;
			this._oMap = new GMap2(divObj);
			this._oMap.addControl(new GMapTypeControl());
			this._oMap.setMapType(G_NORMAL_MAP);
			this._oMap.addControl(new GLargeMapControl());
			
			this._oMap.addControl(new GScaleControl());
			
			//鹰眼控件
			this._oMap.addControl(new GOverviewMapControl());
			
			this._oMap.enableGoogleBar();
			//搜索控件
			
			var type = this._oMap.getCurrentMapType();
			// type.tileSize = 300;
			this._initLat = lat;
			this._initLng = lng;
			this._initZoomLevel = zoomLevel;
			this._centerLat = lat;
			this._centerLng = lng;
			this._centerZoomLevel = zoomLevel;
			this.setCenter(this.createPoint(lat, lng), zoomLevel);
			this._currentCity = defaultCity || Map.locale.defaultCity;
			this.initToolbarControls(tools);
			
//			this.eventBind(this._oMap, "zoomend", function(oldLevel, newLevel){
//				console.info(oldLevel + "-" + newLevel);
//			});
			
			this.moveendHandler = this.eventBind(this._oMap, "moveend", function(){
				if (co.markerMoveEndCallback){
					co.markerMoveEndCallback(co.getMapLevel(co.getZoom()));
				}
			});
			
			
//			this.eventBind(this._oMap, "dragend", function(){
//				if (co.dragEndCallback){
//					co.dragEndCallback();
//				}
//			});
			
			return 1;
		} else {
			return 0;
		}
	}catch(e){
		return -1;
	}
};

Map.prototype.setMarkerMoveEndCallback = function(markerMoveEndCallback){
	this.markerMoveEndCallback = markerMoveEndCallback;
}

Map.prototype.setDragEndCallback = function(dragEndCallback){
	this.dragEndCallback = dragEndCallback;
}

Map.prototype.DRAW_RECT_EVENT_NAME = "dragend";

Map.prototype.initToolbarControls = function(opts) {
	try{
		var operatorObj = this;
		this._toolbar = new LTControlsToolbar("ltmap-toolbar", operatorObj, 5, 30);
		if (!opts) opts = this._defaultConfig;
		
		// 拖动工具
		if (opts.hand){
			this._toolbar.appendControl(new LTControlsToolbarItems(this._id, new LTHand("hand", this), "", "hand.gif", this._toolbar._toolbarControls.length, Map.locale.tool.hand));
		}
		
		// 测距
		if (opts.measure){
			this._toolbar.appendControl(new LTControlsToolbarItems(
				this._id, 
				new LTPolyLineControl("measure", this, "measure"), 
				"", "measurement.gif", this._toolbar._toolbarControls.length, Map.locale.tool.measure));
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
		
		// 绘制多边形区域
		opts.polygon = false;
		if (opts.polygon){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolygonControl("polygon", this), 
					"",
					"polygon.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.polygon
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
			this._toolbar.appendControl(
				new LTControlsToolbarItems(this._id, 
					new LTMarkerControl("poi", this), 
					"", 
					"poi.gif",
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.marker
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
		
		
		
		
		if (opts.fullScreen){
			// 全屏
			var div = document.createElement("div");
			div.style.textAlign = "right";
			div.style.padding = "3px";
			div.style.zIndex = 65536;
			div.style.position = "absolute";
			div.style.right = (5) + "px";
			div.style.top = (5) + "px";
			div.style.backgroundColor = "#EEEEEE";
			
			var screenControl = new LTControlsToolbarItems(this._id, new LTFullSreen("fullsreen"), "全屏", "print.gif", 0);
			screenControl.dom.onclick = function(){
				screenControl._handler.btnClick();
			}
			div.appendChild(screenControl.dom);
			
			document.body.appendChild(div);
		}
		
		if (opts.configCenter){
			//设置地图中心
			var configCenterControl = new LTControlsToolbarItems(
				this._id, new LTConfigCenter("configCenter", this), "", 
				"save.gif", 0, Map.locale.tool.configCenter, true);
			this._toolbar.appendDependentControl(configCenterControl);
			
		}
		
		if (opts.useCenter){
			// 返回地图中心
			var useCenterControl = new LTControlsToolbarItems(this._id, new LTUseCenter("useCenter", this), "", "home.gif", 0, Map.locale.tool.useCenter, true);
			
			this._toolbar.appendDependentControl(useCenterControl);
		}
		
		if (opts.clear){
			var clearControl = new LTControlsToolbarItems(
				this._id, new LTClearControl("clear", this), "", "clear.gif", 0, Map.locale.tool.clear, true);
			
			this._toolbar.appendDependentControl(clearControl);
		}
		
		this._toolbar.appendDependentControl(
			new LTControlsToolbarItems(
				this._id, 
				new LTOverlayControl("overlay-manager", this), 
				"", 
				"overlay.gif",
				0, 
				Map.locale.tool.overlay, 
				true
			)
		);

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
		
		this._toolbar.createHTML();
		document.body.appendChild(this._toolbar._obj);
	}catch(e){
		//alert(e);
	}
};

Map.prototype.configCenterPointCallback = function(callback) {
	this._configCenterPointCallback = callback;
}

Map.prototype.setCenterPoint = function(lat, lng, zoomLevel) {
	this._centerLat = lat;
	this._centerLng = lng;
	this._centerZoomLevel = zoomLevel;
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

Map.prototype.useCenterPointConfig = function() {
	try{
		this.setCenter(this.createPoint(this._centerLat, this._centerLng), this._centerZoomLevel);
	}catch(e){
		
	}
};

/**
 * 创建经纬度对象
 * 
 * @param lat 纬度
 * @param lng 经度
 * @returns {GLatLng}
 */
Map.prototype.createPoint = function(lat, lng) {
	return new GLatLng(lat, lng);
};

/**
 * 获取经纬度对象
 * @param marker 标记对象
 * @returns {GLatLng}
 */
Map.prototype.getPoint = function(marker) {
	return marker.getLatLng();
};

/**
 * 获取当前地图的缩放等级
 * 
 * @returns {int}
 */
Map.prototype.getZoom = function() {
	return this._oMap.getZoom();
};

/**
 * 获取当前地图的缩放等级
 * 
 * @returns {obj}
 */
Map.prototype.getCenter = function() {
	var center = this._oMap.getCenter();
	return {
		lat : center.lat(),
		lng : center.lng()
	}
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
	return new GPolyline(points, color, weight, opacity);
};

Map.prototype.getBestZoomlevel = function(gLatLngBounds) {
	return this._oMap.getBoundsZoomLevel(gLatLngBounds);
};

Map.prototype.getBestMap = function(points) {
	if (points.length == 1){
		this.setCenter(points[0]);
	}else if (points.length == 2){
		var bounds = new GLatLngBounds(points[0], points[1]);
		this.setCenter(bounds.getCenter(), this.getBestZoomlevel(bounds));
	}else{
		var polygon = this.createPolygon(points);
		var bounds = polygon.getBounds();
		this.setCenter(bounds.getCenter(), this.getBestZoomlevel(bounds));
	}
};


Map.prototype.getBestZoomLevelAndCenter = function(polygon) {
	var currentCenter = this.getCenter();
	var currentLevel = this.getZoom();
	if (polygon.getBounds){
		var bounds = polygon.getBounds();
		var ret = {
			zoomLevel : this._oMap.getBoundsZoomLevel(bounds),
			center    : bounds.getCenter()
		}
	}else{
		if (polygon.getLngLats){
			this._oMap.getBestMap(polygon.getLngLats());
		}
		
		if (polygon.getRadius){
			this._oMap.getBestMap(polygon.points);
		}
		
		var ret = {
			zoomLevel : this.getZoom(),
			center    : this.getCenter()
		}
	}
	return ret;
}



/**
 * 在地图上增加叠加层
 * 
 * @param overlay 需要添加在地图上的叠加层
 */
Map.prototype.addOverlay = function(overlay) {
	this._oMap.addOverlay(overlay);
};

/**
 * 在地图上删除叠加层
 * 
 * @param overlay 需要在地图上删除的叠加层
 * @param flag 可选参数
 */
Map.prototype.removeOverlay = function(overlay, flag) {
	this._oMap.removeOverlay(overlay, flag);
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
	
	// latlngs:GLatLng[], strokeColor?:String, strokeWeight?:Number, strokeOpacity?:Number, fillColor?:Number, fillOpacity?:Number, opts?:GPolygonOptions
	
	return new GPolygon(points, color, 2, opacity, bgcolor);
};

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
	return new ELabel(id, this.createPoint(lat, Lng), title, "labelstyle", new GSize(x, y), opacity);
};

/**
 * 更换标签文字信息
 * @param label
 * @param text
 */
Map.prototype.changeLabelText = function(label, text) {
	label.setContents(text);
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
	var circlePoints = Array();
	with (Math) {
		var bounds = new GLatLngBounds();
		radius = radius / 6378800; // radians
		var lat1 = (PI / 180) * lat; // radians
		var lng1 = (PI / 180) * lng; // radians
		for ( var a = 0; a < 361; a++) {
			var tc = (PI / 180) * a;
			var y = asin(sin(lat1) * cos(radius) + cos(lat1) * sin(radius)
					* cos(tc));
			var dlng = atan2(sin(tc) * sin(radius) * cos(lat1), cos(radius)
					- sin(lat1) * sin(y));
			var x = ((lng1 - dlng + PI) % (2 * PI)) - PI; // MOD function
			var point = this.createPoint(parseFloat(y * (180 / PI)),
					parseFloat(x * (180 / PI)));
			circlePoints.push(point);
			bounds.extend(point);
		}
		if (radius < 1.5678565720686044) {
			circle = this.createPolygon(circlePoints, '#8888FF', 2, 1,
					'#8888FF', 0.25);
		} else {
			circle = this.createPolygon(circlePoints, '#8888FF', 2, 1);
		}
		return circle;
	}
};

/**
 * 地图居中
 * 
 * @param points 中心点经纬度
 * @param zoomLevel 缩放等级
 */
Map.prototype.setCenter = function(points, zoomLevel) {
	this._oMap.setCenter(points, zoomLevel);
};

/**
 * 设置标记图片地址
 * 
 * @param marker 标记对象
 * @param imageUrl 图片路径
 */
Map.prototype.markerSetImage = function(marker, imageUrl) {
	marker.setImage(imageUrl);
};

/**
 * 设置标记经纬度
 * 
 * @param marker 标记对象
 * @param lat 设置标记点的经度
 * @param lng 设置标记点的纬度
 */
Map.prototype.markerSetPosition = function(marker, lat, lng) {
	marker.setLatLng(this.createPoint(lat, lng));
};

/**
 * 事件绑定
 * 
 * @param obj 绑定对象
 * @param eventName 事件名称
 * @param handle 回调函数
 * @param flag 可选参数
 */
Map.prototype.eventBind = function(obj, eventName, handle, flag) {
	return GEvent.addListener(obj, eventName, handle);
};

Map.prototype.eventBindObject = function(object, eventName, bindObj, callback){
	GEvent.bindDom(
		object,
		eventName,
		bindObj,
	    callback
	)
}


/**
 * 创建基本标记对象
 * 
 * @param width
 * @param height
 * @param anchorWidth
 * @param anchorHeight
 * @returns {___baseIcon0}
 */
Map.prototype._createIcon = function(width, height, anchorWidth, anchorHeight) {
	var baseIcon = new GIcon();
	if (width != null) {
		baseIcon.iconSize = new GSize(width, height);
	} else {
		baseIcon.iconSize = new GSize(24, 24);
	}
	baseIcon.shadowSize = new GSize(37, 34);
	baseIcon.iconAnchor = new GPoint(anchorWidth, anchorHeight);
	baseIcon.infoWindowAnchor = new GPoint(9, 2);
	baseIcon.infoShadowAnchor = new GPoint(18, 25);
	return baseIcon;
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
Map.prototype.createIcon = function(width, height, anchorWidth, anchorHeight,
		imagePath) {
	var icon = new GIcon(this._createIcon(width, height, anchorWidth,
			anchorHeight));
	icon.image = this._defaultCenterPoint;
	if (imagePath)
		icon.image = imagePath;
	return icon;
};

/**
 * 创建标记
 * 
 * @param GLatLng
 * @param icon
 * @param title
 * @returns {GMarker}
 */
Map.prototype.createMarker = function(GLatLng, icon, title) {
	return new GMarker(GLatLng, {
		title : title,
		clickable : true,
		icon : icon
	});
};

Map.prototype.createCurrentMarker = function(point) {
	// trace("createMarker");
	return new GMarker(
		point, 
		this.createIcon(12, 12, 6, 6, "images/track/currentPoi.png")
	);
};

Map.prototype.fromContainerPixelToLngLat = function(pixel){
	return this._oMap.fromContainerPixelToLatLng(pixel);
}

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
			operatorObj.openInfoWindowHtml(marker, opts, handle, width, height);
		}
	}
	return handler;
};

Map.prototype.closeInfoWindow = function(marker, html, handle) {
	this._oMap.closeInfoWindow();
}

/**
 * 设置标记图片地址
 * 
 * @param marker 标记对象
 * @param imageUrl 图片路径
 */
Map.prototype.markerSetImage = function(marker, imageUrl) {
	marker.setImage(imageUrl);
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

Map.prototype.removeListener = function(handler) {
	return GEvent.removeListener(handler);
};


Map.prototype.changeLabelText = function(label, text) {
	label.setContents(text);
};


/**
 * 标记信息窗口
 * 
 * @param marker 标记
 * @param opts 属性值
 * @param open 是够打开
 */
Map.prototype.openInfoWindowHtml = function(marker, html, handle) {
	if (!handle)
		handle = function() {
		};
	if (marker.openInfoWindowHtml){
		marker.openInfoWindowHtml(html, {
			onOpenFn : handle
		});
	}else{
		if (marker.suit){
			this._oMap.openInfoWindowHtml(marker.suit, html, {
				onOpenFn : handle
			});
		}
		
	}
};




/**
 * 获取并设置地理信息
 * 
 * @param {string} id
 * @param {string} latLng return void
 */
Map.prototype.getAddress = function(id, lat, lng) {

	new GClientGeocoder()
			.getLocations(
					lat + "," + lng,
					function(response) {
						var address = document.getElementById("address_" + id);
						if (address) {
							if (!response || response.Status.code == 200) {
								window.setTimeout(function(){
									if (document.getElementById("address_" + id)) document.getElementById("address_" + id).innerHTML = response.Placemark[0].address;
								}, 500);
							} else {
								window.setTimeout(function(){
									if (document.getElementById("address_" + id)) document.getElementById("address_" + id).innerHTML = COMMON_INFO["couldnt_get_address"];
								}, 500);
							}
						}
					});
};

/**
 * 获取并设置地理信息
 * 
 * @param {string} id
 * @param {string} latLng return void
 */
Map.prototype.getAddressCallback = function(lat, lng, callback) {

	new GClientGeocoder()
			.getLocations(
					lat + "," + lng,
					function(response) {
						var address = "";
						if (!response || response.Status.code == 200) {
							address = response.Placemark[0].address;
						} else {
							address = COMMON_INFO["couldnt_get_address"];
						}
						
						if (callback){
							callback(address);
						}
						
					});
};


/**
 * 地图边界判断
 * @param lat
 * @param lng
 * @returns {Boolean}
 */
Map.prototype.beyondTheMark = function(lat, lng) {
	var mapBounds = this._oMap.getBounds();// GLatLngBounds
	var mapSouthWest = mapBounds.getSouthWest();
	var mapNorthEast = mapBounds.getNorthEast();
	var southWestLng = mapSouthWest.lng();
	var southWestLat = mapSouthWest.lat();
	var northEastlng = mapNorthEast.lng();
	var northEastlat = mapNorthEast.lat();
	if ((lng > southWestLng && lng < northEastlng)
			&& (lat > southWestLat && lat < northEastlat)) {
		return true;
	}
	return false;
};

Map.prototype.unLoad = function() {
	GUnload();
};

/**
 * Google map文字显示标签
 * @param id
 * @param point
 * @param html
 * @param classname
 * @param pixelOffset
 * @param percentOpacity
 * @param overlap
 * @returns {ELabel}
 */
function ELabel(id, point, html, classname, pixelOffset, percentOpacity,
		overlap) {
	try{
		// Mandatory parameters
		this.point = point;
		this.html = html;
		this.id = id;
		// Optional parameters
		this.classname = classname || "";
		this.pixelOffset = pixelOffset || new GSize(0, 0);
		if (percentOpacity) {
			if (percentOpacity < 0) {
				percentOpacity = 0;
			}
			if (percentOpacity > 100) {
				percentOpacity = 100;
			}
		}
		this.percentOpacity = percentOpacity;
		this.overlap = overlap || false;
	}catch(e){
		// alert("new:" + e);
	}
}

ELabel.prototype = new GOverlay();
ELabel.prototype.initialize = function(map){
	try{
		this.map_ = map;
		this.div_ = document.createElement("div");
		this.div_.innerHTML = this.setHTML(this.html);
		if (typeof (this.html) == "undefined")
			this.html = "";
		// this.div_.className = "labelstyle-out";
		this.div_.style.borderColor = "#000000";
		this.div_.style.position = "absolute";
		this.div_.id = "Glabel_" + this.id;
		this.div_.style.fontSize = "13px";
		this.div_.style.whiteSpace = "nowrap";
		
		if (document.all)
		{
			var ua = navigator.userAgent.toLowerCase(); 
			var s = ua.match(/msie ([\d.]+)/);
			if (s.toString().indexOf("10.0") == -1){
				this.div_.style.width = "99%";
			}else{
				this.div_.style.width = "100%";
			}
		}
		this.setHTMLLength();
		map.getPane(G_MAP_FLOAT_SHADOW_PANE).appendChild(this.div_);
		if (this.percentOpacity) {
			if (typeof (this.div_.style.filter) == "string") {
				this.div_.style.filter = "alpha(opacity:" + this.percentOpacity
						+ ")";
			}
			if (typeof (this.div_.style.KHTMLOpacity) == "string") {
				this.div_.style.KHTMLOpacity = this.percentOpacity / 100;
			}
			if (typeof (this.div_.style.MozOpacity) == "string") {
				this.div_.style.MozOpacity = this.percentOpacity / 100;
			}
			if (typeof (this.div_.style.opacity) == "string") {
				this.div_.style.opacity = this.percentOpacity / 100;
			}
		}
		if (this.overlap) {
			var z = GOverlay.getZIndex(this.point.lat());
			this.div_.style.zIndex = z;
		}
	}catch(e){
		// alert("initialize:" + e);
	}
	
};

/**
 * 设置叠加层在显示不同文字时的长度
 */
ELabel.prototype.setHTMLLength = function() {
	// showDebugger("this.html:" + this.html);
	/**
	if (typeof (this.html) == "undefined")
		this.html = "";
	var rLength = this.html.realLength();
	// showDebugger("this.html-rLength:" + rLength);
	var length = this.html.length;
	if (length != 0) {
		var value = 0;
		if ((rLength > length && rLength < (length * 2)) || rLength == length) {
			value = (length * parseInt(this.div_.style.fontSize));
		} else if (rLength == (length * 2)) {
			value = (length * parseInt(this.div_.style.fontSize));
		}
		this.div_.style.width = value + 5 + "px";
	} else {
		this.div_.style.display = "none";
	}**/
};

ELabel.prototype.remove = function() {
	if (this.div_.parentNode)
		this.div_.parentNode.removeChild(this.div_);
};

ELabel.prototype.copy = function() {
	return new ELabel(this.point, this.html, this.classname, this.pixelOffset,
			this.percentOpacity, this.overlap);
};

ELabel.prototype.redraw = function(force) {
	var p = this.map_.fromLatLngToDivPixel(this.point);
	var h = parseInt(this.div_.clientHeight);
	this.div_.style.left = (p.x + this.pixelOffset.width) + "px";
	this.div_.style.top = (p.y + this.pixelOffset.height - h) + "px";
};

ELabel.prototype.show = function() {
	this.div_.style.display = "";
};

ELabel.prototype.hide = function() {
	this.div_.style.display = "none";
};

ELabel.prototype.setHTML = function(html) {
	return '<div align="center" class="' + this.classname + '"><nobr>'
		+ html + '</nobr></div>';
};

ELabel.prototype.setContents = function(html) {
	this.html = html;
	this.setHTMLLength();
	if (this.div_) this.div_.innerHTML = this.setHTML(this.html);
	if (this.map_) this.redraw(true);
};

ELabel.prototype.setPoint = function(point) {
	this.point = point;
	if (this.map_){
		if (this.overlap) {
			var z = GOverlay.getZIndex(this.point.lat());
			this.div_.style.zIndex = z;
		}
		this.redraw(true);
	}
};

ELabel.prototype.setOpacity = function(percentOpacity) {
	if (percentOpacity) {
		if (percentOpacity < 0) {
			percentOpacity = 0;
		}
		if (percentOpacity > 100) {
			percentOpacity = 100;
		} 
	}
	this.percentOpacity = percentOpacity;
	if (this.percentOpacity) {
		if (typeof (this.div_.style.filter) == "string") {
			this.div_.style.filter = "alpha(opacity:" + this.percentOpacity
					+ ")";
		}
		if (typeof (this.div_.style.KHTMLOpacity) == 'string') {
			this.div_.style.KHTMLOpacity = this.percentOpacity / 100;
		}
		if (typeof (this.div_.style.MozOpacity) == 'string') {
			this.div_.style.MozOpacity = this.percentOpacity / 100;
		}
		if (typeof (this.div_.style.opacity) == 'string') {
			this.div_.style.opacity = this.percentOpacity / 100;
		}
	}
};

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

//str, bounds, rect, points(northWest, northEast, southEast, southWest)
Map.prototype.setDrawRectEndCallback = function(callback) {
	this._drawRectEnd = callback;
};

Map.prototype.setDrawCircleEndCallback = function(callback) {
	this._drawCircleEnd = callback;
};

//str, points, length, polyline, extObj
Map.prototype.setDrawPolylineEndCallback = function(callback) {
	this._drawPolylineEnd = callback;
};

Map.prototype.setDrawPolygonEndCallback = function(callback) {
	this._drawPolygonEnd = callback;
};

Map.prototype.getPointLat = function(point) {
	return point.lat();
};

Map.prototype.getPointLng = function(point) {
	return point.lng();
};

Map.prototype.latLngChange = function(value) {
	return value > 1000 ? (value / 100000) : value;
}

Map.prototype.pointToString = function(points, flag){
	var str = [];
	for (var i=0;i<points.length;i++){
		str.push(
			(this.latLngChange(points[i].lng()) / this._defaultLatLngDiff) + 
			"," + 
			(this.latLngChange(points[i].lat()) / this._defaultLatLngDiff)
		);
	}
	if (flag){
		str.push(str[0]);
	}
	return str.join("#");
};

Map.prototype.distanceFrom = function(lngLat1 ,lngLat2)  {
	var latRadians1= lngLat1.latY * (Math.PI / 180);
	var latRadians2 = (lngLat2.latY) * (Math.PI / 180);
	var latRadians = latRadians1 - latRadians2;
	var lngRadians= (lngLat1.lngX) * (Math.PI / 180)- (lngLat2.lngX) * (Math.PI / 180);
	var f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latRadians / 2), 2) + Math.cos(latRadians1) * Math.cos(latRadians2) * Math.pow(Math.sin(lngRadians / 2), 2)));
	return f * 6378137;
}

Map.prototype.createPolygonByString = function(string, color, bgcolor, weight, opacity){
	return this.createPolygon(this.stringToPoint(string), color, bgcolor, weight, opacity);
}

Map.prototype.stringToPoint = function(string){
	var points = new Array();
	var splits = string.split("#");
	for (var i=0;i<splits.length;i++){
		var lngLat = splits[i].split(",");
		if (lngLat != ""){
			points.push(this.createPoint(parseFloat(lngLat[1]), parseFloat(lngLat[0])));
		}
	}
	return points;
}

