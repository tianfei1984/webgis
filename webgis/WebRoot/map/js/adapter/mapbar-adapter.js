var maplet = null;
function Map(id, user) {
	this._user = user || "";
	this._id = id;
	this.maplet = maplet;
	this._defaultLatLngDiff = 1;
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
		polyline   : true,
		rect       : true,
		polygon    : false,
		print      : true,
		fullScreen : false,
		marker     : false,
		markerExt  : true,
		standMap   : true,
		overviewMap: true,
		scale      : true,
		switchMap  : true,
		boon       : true,
		MouseScroll: true,
		handleKeyboard:true,
		configCenter : true,
		useCenter  : true,
		clear      : true,
		targetMap  : true,
		circle     : false
		
	};
	this.tools = {};
	this.AddLabel = true;
	this.defaultText = {
		getAddreeDefaultText : Map.locale.getAddreeDefaultText,
		getAddreeErrorText   : Map.locale.getAddreeErrorText
	}
}

Map.prototype.DRAW_RECT_EVENT_NAME = "draw";


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

Map.prototype.mapInit = function(divObj, lat, lng, zoomLevel, defaultCity, tools) {
	try {
		
		// var LTMaps;
		if ((typeof (Maplet) != "undefined") && divObj != null) {
			this._divObj = document.getElementById(divObj);
			this._divObj.style.position = "absolute";
			this._divObj.style.left = "0px";
			this._divObj.style.top = "0px";
			this._divObj.style.height = document.body.clientHeight + "px";
			this._divObj.style.width = document.body.clientWidth + "px";
			// this._divObj.style.display = "block";
			this.maplet = new Maplet(divObj);
			maplet = this.maplet;
			if ((lat == 0 || typeof(lat) == "number")&& (lng == 0 || typeof(lng) == "number")){
				lat = 38.29348;
				lng = 109.29054;
			}
			this.maplet.centerAndZoom(this.createPoint(lat, lng), zoomLevel);
			this._centerLat = lat;
			this._centerLng = lng;
			this._centerZoomLevel = zoomLevel;
			this._initCenterPoint = this.getCenter();
			if (!tools) {
				for (var key in this._defaultConfig){
					this.tools[key] = this._defaultConfig[key];
				}
			}else{
				for (var key in tools){
					this.tools[key] = tools[key];
				}
			}
			// this.tools.measure = true;
			this.tools.zoomOut = true;
			this.tools.zoomIn  = true;
			// this.tools.search  = true;
			this.tools.clear  = true;
			this.tools.circle  = false;
			// this.tools.targetMap  = true;
			// this.tools.polygon  = true;
			this._currentCity = defaultCity || Map.locale.defaultCity;
			
			this.initStandardControls(this.tools);
			this.initToolbarControls(this.tools);
			this._divObj.onclick = function(){
			}
			var handler = this;
			$(window).resize(function() {
				handler._divObj.style.height = document.body.clientHeight + "px";
				handler._divObj.style.width = document.body.clientWidth + "px";
				maplet.resize(document.body.clientWidth, document.body.clientHeight);
			});
			var handler = this;
			MEvent.addListener(maplet, "zoom", function() {  
				handler.boundsCheck();
			}); 
			
			
			return 1;
		} else {
			return 0;
		}
	} catch (e) {
		//alert(12312312);
		return -1;
	}
};

Map.prototype.mapStatusSwitch = function(status){
	var point = this.getCenter();
	switch(status){
	case 0:
		this.setCenter(this.createPoint(this._centerLat, this._centerLng) ,this._centerZoomLevel);
		break;
	case 1:
		this.setCenter(this.createPoint(38.29348,109.29054) ,4);
		break;
	}
}

Map.prototype.initStandardControls = function(opts){
	try{
		var map = this.maplet;
		map.addControl(new MStandardControl());
		map.showScale(true);  
		map.showControl(true);   
		map.setOverviewLocation({type : Maplet.RIGHT_BOTTOM});   
	}catch(e){
	}
}

Map.prototype.initToolbarControls = function(opts){
	try{
		var operatorObj = this;
		
		var x = 2;
		var y = 5;
		if (this.tools.switchMap){
			y = 29;
		}
		
		this._toolbar = new LTControlsToolbar("ltmap-toolbar", operatorObj, x, y);
		if (!opts) opts = this._defaultConfig;
		
		if (opts.hand){
			this._toolbar.appendControl(new LTControlsToolbarItems(this._id, 
					new LTHand("hand", this), "", "hand.gif", this._toolbar._toolbarControls.length, Map.locale.tool.hand));
		}
		
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
		
		if (opts.zoomOut){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("zoomout", this, "zoomout"), 
					"", 
					"zoomout.gif", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.zoomOut
				)
			);
		}
		
		if (opts.zoomIn){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("zoomin", this, "zoomin"), 
					"", 
					"zoomin.gif",
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.zoomIn
				)
			);
		}
		
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
			
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectQueryControl("rectQuery", this), 
					"", 
					"rectQuery.gif", 
					this._toolbar._toolbarControls.length, Map.locale.tool.rectQuery
				)
			);
		}
		
		if (opts.circle){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTCircleControl("circle", this), 
					"", 
					"circle.gif", 
					this._toolbar._toolbarControls.length,Map.locale.tool.circle
				)
			);
		}
		
		if (opts.polyline){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolyLineControl("polyline", this), 
					"", 
					"polyline.gif", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.polyline
				)
			);
		}
		
		
		
		if (opts.polygon){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolygonControl("polygon", this), 
					"", 
					"polygon.gif",
					this._toolbar._toolbarControls.length,Map.locale.tool.polygon
				)
			);
		}
		
		if (opts.search){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(this._id, new LTCityLocation("city-location", this), "", "search.gif", this._toolbar._toolbarControls.length, Map.locale.tool.search.name));
		}
		
		if (opts.marker){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTMarkControl("marker", this), 
					"", 
					"poi.gif", 
					this._toolbar._toolbarControls.length,Map.locale.tool.marker
				)
			);
						
		}
		
		if (opts.markerExt){
			var ltMarkerExtControl = new LTMarkerExtControl(this._user, this)
			ltMarkerExtControl.initialize();
			this._toolbar.appendControl(
				new LTControlsToolbarItems(this._id, ltMarkerExtControl, 
					"", "poi.gif", this._toolbar._toolbarControls.length, Map.locale.tool.markerExt.name));
		}
		
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
			this._toolbar.appendDependentControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTFullSreen("full-sreen"), 
					"", 
					"full-sreen.gif", 
					1, 
					Map.locale.tool.fullScreen, true
				)
			);
		}
		
		if (opts.targetMap){
			var targetMapControl = new LTControlsToolbarItems(this._id, new LTTargetMapControl("target-map", this), "", "target-map.gif", 0, Map.locale.tool.targetMap, true);
			targetMapControl.dom.onclick = function(){
				targetMapControl._handler.btnClick();
			}
			this._toolbar.appendDependentControl(targetMapControl);
		}
		
		if (opts.configCenter){
			// ȫ��
			var configCenterControl = new LTControlsToolbarItems(this._id, new LTConfigCenter("configCenter", this), "", "save.gif", 0, Map.locale.tool.configCenter, true);
			configCenterControl.dom.onclick = function(){
				configCenterControl._handler.btnClick();
			}
			this._toolbar.appendDependentControl(configCenterControl);
			
		}
		
		if (opts.useCenter){
			// ȫ��
			var useCenterControl = new LTControlsToolbarItems(this._id, new LTUseCenter("useCenter", this), "", "home.gif", 0, Map.locale.tool.useCenter, true);
			useCenterControl.dom.onclick = function(){
				useCenterControl._handler.btnClick();
			}
			
			this._toolbar.appendDependentControl(useCenterControl);
			
		}
		
		this._toolbar.createHTML();
		// this._divObj.appendChild(this._toolbar._obj);
		
		document.body.appendChild(this._toolbar._obj);
		
	}catch(e){
		// alert(e);
	}
}

Map.prototype.needPoint = true;

Map.prototype.createPoint = function(lat, lng) {
	return new MPoint(lng, lat);
};

Map.prototype.createPointByString = function(string) {
	var points = this.stringToPoint(string);
	return this.createMarker(points[0]);
}

Map.prototype.latLngFormat = function(latLng) {
	return latLng * this._defaultLatLngDiff;
}

Map.prototype.latLngFormatReserve = function(latLng) {
	return parseFloat(latLng / this._defaultLatLngDiff);
}

Map.prototype.getPoint = function(marker) {	
	return marker.pt;
};

Map.prototype.getZoom = function() {
	return this.maplet.getZoomLevel();
};

Map.prototype.createPolyline = function(points, color, weight, opacity, html) {

	var brush = new MBrush(color || this._color);  
    brush.arrow = false;
    brush.stroke = weight || this._weight;  
    brush.fill = false;  
    
    var window = null;
    if (html){
    	window = this.createInfoWindowObj(null, null, "", html);
    }
    return new MPolyline(  
    	points,  
        brush
    );
};

Map.prototype.setPolylineColor = function(polyline, color) {
	polyline.setLineColor(color);
};

Map.prototype.setPolylineStroke = function(polyline, stroke) {
	polyline.setLineStroke(stroke);
};


Map.prototype.addOverlay = function(overlay) {
	this.maplet.addOverlay(overlay);
};

Map.prototype.removeOverlay = function(overlay, flag) {
	this.maplet.removeOverlay(overlay, flag);
};

Map.prototype.createPolygon = function(points, color, bgcolor, weight, opacity, html) {
	var brush = new MBrush(color || this._color);  
    brush.arrow = false;
    brush.stroke = weight || this._weight;  
    brush.fill = true;  
    brush.bgcolor = bgcolor || this._bgcolor;
    var window = null;
    if (html){
    	window = this.createInfoWindowObj(null, null, "", html);
    } 
    brush.bgtransparency = opacity || this._opacity;  
    return new MPolyline(  
    	points,  
        brush,  
        window
    );
};


Map.prototype.createRect = function(v, color, bgcolor, weight, opacity){
	var minpt = v.mmx;  
    var maxpt = v.mxm;  
    var brush = new MBrush();  
    brush.color = color || this._color;  
    brush.bgcolor = bgcolor || this._bgcolor;  
    brush.fill = true;  
    brush.transparency = 80;  
    brush.bgtransparency = 30;  
    return new MRoundRect(minpt, maxpt, 0, brush); 
	// return new SE.Rect(bounds, color || this._color ,bgcolor || this._bgcolor ,weight || this._weight ,opacity || this._opacity);
}

Map.prototype.createCircle = function(lat, lng, radius, opts){
	return new SE.Circle(this.createPoint(lat, lng), radius, opts || {});
}


Map.prototype.createLabel = function(id, lat, Lng, title, x, y, opacity) {
	return new MLabel(title || "", x || 0, y || 0, opacity || 100);
};

Map.prototype.changeLabelText = function(label, text, marker) {
	if (marker){
		var label = marker.label;
		marker.setLabel(this.createLabel(null, null, null, text, label.xoffset, label.yoffset, 100) , true);
	}
};

Map.prototype.drawCircle = function(lat, lng, radius) {
	
};

Map.prototype.setCenter = function(point, zoomLevel) {
	try {
		this.maplet.setCenter(point);
		// alert(123123123);
		this.maplet.setZoomLevel(zoomLevel || this.getZoom());
	}catch(e){
		alert(e);
	}
	
	// moveToCenter setCenterAtLatLng
};

Map.prototype.markerSetImage = function(marker, imageUrl, width, height, anchorWidth, anchorHeight) {
	var icon = marker.icon;
	icon = this.createIcon(icon.width, icon.height, icon.anchorX, icon.anchorY, imageUrl);
	marker.setIcon(icon, true);
};

Map.prototype.markerSetPosition = function(marker, lat, lng) {
	marker.setPoint(this.createPoint(lat, lng), true);
};

Map.prototype.createIcon = function(width, height, anchorWidth, anchorHeight, imagePath) {
	return new MIcon(imagePath, width, height, anchorWidth, anchorHeight);
};

Map.prototype.createMarker = function(point, icon, title, html, opts) {
	opts = opts || {};
	var label = null;
	var infoWindow = null;
	if (title){
		label = this.createLabel(null, null, null, title, opts.x || 0, opts.y || 0, 100);
	}
	
	if (html){
		infoWindow = this.createInfoWindowObj(null, null, title, html);
	}
	
	return new MMarker(  
		point,       // new MPoint(116.38672,39.90805),  
		icon,        // new MIcon("/apidoc/images/tb1.gif",32,32)  
		infoWindow,  
		label
    );
};

Map.prototype.createCurrentMarker = function(point) {
	return new MMarker(  
		point, // new MPoint(116.38672,39.90805),  
		this.createIcon(12, 12, 8, 8, "images/track/currentPoi.png")   // new MIcon("/apidoc/images/tb1.gif",32,32)  
    ); 
};

Map.prototype.configCenterPointCallback = function(callback) {
	this._configCenterPointCallback = callback;
}

Map.prototype.eventBind = function(obj, eventName, handle, flag) {
	return MEvent.addListener(obj, eventName, handle);
};

Map.prototype.useCenterPointConfig = function() {
	try{
		this.setCenter(this.createPoint(this._centerLat, this._centerLng), this._centerZoomLevel);
	}catch(e){
		
	}
};

Map.prototype.configCenterPoint = function() {
	var center = this.getCenter();
	this._centerLat = center.lat;
	this._centerLng = center.lon;
	this._centerZoomLevel = this.getZoom();
	
	if (this._configCenterPointCallback){
		this._configCenterPointCallback(this._centerLat, this._centerLng, this._centerZoomLevel);
	}
};

Map.prototype.setCenterPoint = function(lat, lng, zoomLevel) {
	this._centerLat = lat;
	this._centerLng = lng;
	this._centerZoomLevel = zoomLevel;
}


Map.prototype.eventBindObject = function(obj, eventName, targetObj, handle) {
	return MEvent.bind(obj, eventName, targetObj, handle);
};


Map.prototype.removeListener = function(handler) {
	return MEvent.removeListener(handler);
};

Map.prototype.openInfoWindowHtml = function(marker, html, handle, width, height) {
	if (!handle) handle = function(){};
	var window = this.createInfoWindowObj(null, null, "", html);
	// alert(window.getBodySize);
	window.getBodySize = function(){
		return {width : 700, height : 500};
	}
	marker.setInfoWindow(window);
	marker.openInfoWindow(true);
	marker.info.zoomTo("zoomin");
	handle();
};

Map.prototype.getRectCenterPointLatLng = function(rect){
	var xy = rect.getCenterXY();
	xy = this.maplet.toMapCoordinate(xy.x, xy.y).split(",");
	return this.createPoint(parseFloat(xy[1]), parseFloat(xy[0]));
}


Map.prototype.createInfoWindowObj = function(lat, lng, title, html){
	return new MInfoWindow(title, html);
}

Map.prototype.getAddress = function(id, lat, lng) {
	var handler = this;
    var request={location:this.createPoint(lat, lng)}; 
    var address = document.getElementById("address_" + id);
	if (address){
		address.innerHTML = this.defaultText.getAddreeErrorText;
	}
};

Map.prototype.addressFormat = function(result) {
	
	if (!result.district_text) return this.defaultText.getAddreeErrorText;
	
	return result.district_text + 
		(result.point ? result.point.name : "") + (result.address ? result.address : "")
};

Map.prototype.getAddressCallback = function(lat, lng, callback) {
	var handler = this;
	var request = {location:this.createPoint(lat, lng)};  
	callback(this.defaultText.getAddreeErrorText);
};



Map.prototype.bindClickEvent = function(marker, opts, htmlfn, handle, open, width, height) {
	var operatorObj = this;
	
//	var handler = this.eventBind(marker, "click", function() {
//		if (typeof(opts) == "object"){
//			operatorObj.openInfoWindowHtml(marker, htmlfn(opts), handle, width, height);
//		}else{
//			operatorObj.openInfoWindowHtml(marker, opts, handle, width, height);
//		}
//	});
//	if (open) {
//		if (typeof(opts) == "object"){
//			operatorObj.openInfoWindowHtml(marker, htmlfn(opts), handle, width, height);
//		}else{
//			operatorObj.openInfoWindowHtml(marker, opts, handle, width, height);
//		}
//	}
//	return handler;
	
	var handler;
	if (typeof(opts) == "object"){
		this.openInfoWindowHtml(marker, htmlfn(opts), handle, width, height);
	}else{
		this.openInfoWindowHtml(marker, opts, handle, width, height);
	}
	return handler;
};



Map.prototype.getBestZoomLevelAndCenter = function(polygon) {
	return this.getBestCenter(polygon.pts);
};

Map.prototype.getBestCenter = function(points) {
	var lats = [];
	var lngs = [];
	for (var i=0;i<points.length;i++){
		lats.push(points[i].lat);
		lngs.push(points[i].lon);
	}
	lats.sort();
	lngs.sort();
	
	var latMini = lats[0];
	var latMax = lats[lats.length - 1];
	var lngMini = lngs[0];
	var lngMax = lngs[lngs.length - 1];
	
	var level = this.computeScale(latMini, lngMini, latMax, lngMax);
	
	return {
		center 	   : this.createPoint((latMini + latMax)/2, (lngMini + lngMax)/2),
		zoomLevel  : level
	}
};


Map.prototype.beyondTheMark = function(lat, lng) {
	lat = lat * this._defaultLatLngDiff;
	lng = lng * this._defaultLatLngDiff;
	// LeftUp-���Ͻǣ���ǣ���LeftDown-���½ǣ����Ͻǣ���RightUp-���Ͻǣ������ǣ���RightDown-���½ǣ����Ͻǣ���
	var mapBounds = this.maplet.getViewBound();
	var northEast = mapBounds.RightUp.split(",");
	var southWest = mapBounds.LeftDown.split(",");
	if ((lng > parseFloat(southWest[0]) && lng < parseFloat(northEast[0])) && 
			(lat > parseFloat(southWest[1]) && lat < parseFloat(northEast[1]))) {
		return true;
	}
	return false;
};

Map.prototype.boundsCheck = function() {
	var mapBounds = this.maplet.getViewBound();
	var southWest = mapBounds.LeftDown;
	var northEast = mapBounds.RightUp;
	// console.info(this.getZoom() + "," + southWest);
}



Map.prototype.latLngChange = function(value) {
	return value > 1000 ? (value / 100000) : value;
}


Map.prototype.createRectByString = function(string){
	try{
		var points = this.stringToPoint(string);
		return this.createRect(
			new SE.LngLatBounds([points[3], points[1]])
		);
	}catch(e){
	}
		
}

Map.prototype.clearOverlays = function(){
	this.maplet.clearOverLays();
}

Map.prototype.getBestMap = function(points, flag){
	this.maplet.getBestMap(points);
	if (flag){
		this.maplet.getBestMap(points);
	}
	
	var zoomLevel = this.getZoom();
	if (zoomLevel - 1 > 0){
		this.setZoom(zoomLevel - 1);
	}else{
		this.setZoom(zoomLevel);
	}
	
	
}

Map.prototype.setZoom = function(zoomLevel){
	this.maplet.setZoom(zoomLevel);
}


Map.prototype.createSearchControl = function(cityLocation) {
	var handler = this;
	var search = new SE.ServiceLS();
	
	cityLocation.setSearchCallback(function(city, value){
		search.search(
			{  
	            city     : city,
	            keyword  : value,             
	            pageinfo : {page    : 1, number : 20},  
	            policy   : {matchType : 2, sortType : 0}                             
	        } ,
	        function(searchResult){
	        	var list = cityLocation._searchDiv.childNodes[1];
    			if(searchResult.status == "ok"){
    				var searchPoints = searchResult.result.points;
    				if(searchPoints.length > 0){
    					
    					list.innerHTML = "";
        				points=[];
        				var div = cityLocation._createSearchResultListElementDivCss();
        				div.innerHTML = Map.locale.tool.search.total + searchPoints.length + Map.locale.tool.search.message;
        				list.appendChild(div);
    					for(var i=0;i<searchPoints.length;i++)
	    				{	
	    					var poi = searchPoints[i];
	    					var point = handler.createPoint(
	    							(parseFloat(poi.lat) / handler._defaultLatLngDiff), 
	    							(parseFloat(poi.lng) / handler._defaultLatLngDiff));
	    					var marker = handler.createMarker(point);
	    					cityLocation._searchMarkers.push(marker);
	    					handler.addOverlay(marker);
	    					handler.eventBind(marker, "click", function(poi, marker){
	        					return function(){
	        						handler.openInfoWindowHtml(marker, poi.name + "<br />" + poi.address, null, 200, 40);
	        						cityLocation._clickMarker = marker;
	        					}
	        				}(poi, marker));
	    					points.push(point);
	    					var div = cityLocation._createSearchResultListElementDivCss();
	        				var a = document.createElement("a");
	        				a.innerHTML = poi.name + "(" + poi.address + ")";
	        				a.href = "javascript://;";
	        				a.poi = poi;
	        				a.marker = marker;
//	        				a.onclick = function(poi, marker){
//	        					return function(){
//	        						cityLocation._setMapCenter(poi.lng + "," + poi.lat, handler.getZoom());
//	        						handler.openInfoWindowHtml(marker, poi.name + "<br />" + poi.address, null, 200, 40);
//	        						cityLocation._clickMarker = marker;
//	        					}
//	        				}(poi, marker);
	    					div.appendChild(a);
	    					list.appendChild(div);
	    				}
    					
    					list.onclick = function(e){
    						e = e.srcElement || e.target;
    						switch (e.tagName) {
    						case "A":
    							var poi = e.poi;
    							var marker = e.marker;
    							cityLocation._setMapCenter(poi.lng + "," + poi.lat, handler.getZoom());
        						handler.openInfoWindowHtml(marker, poi.name + "<br />" + poi.address, null, 200, 40);
        						cityLocation._clickMarker = marker;
    						}
    					}
    					
	    				handler.getBestMap(points);
    				}else{
        				var div = cityLocation._createSearchResultListElementDivCss();
        				div.innerHTML = Map.locale.tool.search.fail;
        				list.appendChild(div);
        			}
    			}else{
    				var div = cityLocation._createSearchResultListElementDivCss();
    				div.innerHTML = Map.locale.tool.search.fail;
    				list.appendChild(div);
    			}
	        }
	    ); 
    });
	return search;
};

Map.prototype.labelSetPosition = function(label, lat, lng) {
	if (label.setPoint)label.setPoint(this.createPoint(lat, lng));
};

Map.prototype.getPointLat = function(point) {
	return this.latLngChange(point.lat);
};

Map.prototype.getPointLng = function(point) {
	return this.latLngChange(point.lon);
};

Map.prototype.fromContainerPixelToLngLat = function(pixel){
	return this.maplet.fromContainerPixelToLngLat(pixel);
}

//str, points, length, polyline, extObj
Map.prototype.setDrawPolylineEndCallback = function(callback) {
	this._drawPolylineEnd = callback;
};

// str, bounds, rect, points(northWest, northEast, southEast, southWest)
Map.prototype.setDrawRectEndCallback = function(callback) {
	this._drawRectEnd = callback;
};

Map.prototype.setDrawRectQueryEndCallback = function(callback) {
	this._drawRectQueryEnd = callback;
};



Map.prototype.setDrawCircleEndCallback = function(callback) {
	this._drawCircleEnd = callback;
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


Map.prototype.setDrawPolygonEndCallback = function(callback) {
	this._drawPolygonEnd = callback;
};

Map.prototype.setDrawPointEndCallback = function(callback) {
	this._drawPointEnd = callback;
};

Map.prototype.pointToString = function(points, flag){
	var str = [];
	for (var i=0;i<points.length;i++){
		str.push(
			(this.latLngChange(points[i].lon) / this._defaultLatLngDiff) + 
			"," + 
			(this.latLngChange(points[i].lat) / this._defaultLatLngDiff)
		);
	}
	if (flag){
		str.push(str[0]);
	}
	return str.join("#");
};

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

Map.prototype.createPolylineByString = function(string){
	return this.createPolyline(this.stringToPoint(string));
}

Map.prototype.createPolygonByString = function(string, color, bgcolor, weight, opacity){
	return this.createPolygon(this.stringToPoint(string), color, bgcolor, weight, opacity);
}

Map.prototype.getCenter = function(){
	return this.maplet.getCenter();
}

Map.prototype.getCenterPointLatLng = function(){
	var point = this.getCenter();
	return [this.latLngFormatReserve(this.latLngChange(point.lat)), 
	        this.latLngFormatReserve(this.latLngChange(point.lon))];
}



Map.prototype.computeScale = function(lat1, lng1, lat2, lng2){
	var mapDistance = this.maplet.measDistance([this.createPoint(lat1, lng1), this.createPoint(lat2, lng2)]) / 1000;
	var deflevel = 13;
	if(mapDistance > 0 && mapDistance <= 1)
	{
		deflevel = 13;
	}
	else if(mapDistance>1 && mapDistance<=2)
	{
		deflevel = 12;
	}
	else if(mapDistance>2 && mapDistance<=4)
	{
		deflevel = 11;
	}
	else if(mapDistance>4 && mapDistance<=10)
	{
		deflevel = 10;
	}
	else if(mapDistance>10 && mapDistance<=20)
	{
		deflevel = 9;
	}
	else if(mapDistance>20 && mapDistance<=40)
	{
		deflevel = 8;
	}
	else if(mapDistance>40 && mapDistance<=100)
	{
		deflevel = 7;
	}
	else if(mapDistance>100 && mapDistance<=200)
	{
		deflevel = 6;
	}
	else if(mapDistance>200 && mapDistance<=400)
	{
		deflevel = 5;
	}
	else if(mapDistance>400 && mapDistance<=1000)
	{
		deflevel = 4;
	}
	else if(mapDistance>1000 && mapDistance<=1800)
	{
		deflevel = 3;
	}
	else if(mapDistance>1800 && mapDistance<=4000)
	{
		deflevel = 2;
	}
	else if(mapDistance>4000 && mapDistance<=8000)
	{
		deflevel = 1;
	}
	else if(mapDistance>8000)
	{
		deflevel = 0;
	}
	return deflevel;
}


Map.prototype.getLatLngArrayFromPointObject = function(pointObject){
	return [
	    this.latLngChange(pointObject.lat) / this._defaultLatLngDiff, 
	    this.latLngChange(pointObject.lon) / this._defaultLatLngDiff
	]
}

Map.prototype.pointToObject = function(point){
	
	return this.maplet.fromContainerPixelToLngLat(point);
}


Map.prototype.closeInfoWindow = function(marker){
	if (marker){
		if (marker.closeInfoWindow) marker.closeInfoWindow();
	}else{
		
	}
}

Map.prototype.unLoad = function() {
	
};

/**
 * 
 */
Map.prototype.setMarkerVisible = function(marker, flag){
	marker.setVisible(flag);
}

Map.prototype.setMarkerLabelVisible = function(markerLabel, flag){
	markerLabel.setVisible(flag);
}


Map.prototype.setPolygonText = function(polygon, text, point) {
	
};

Map.prototype.setPolygonBackgroundColor = function(polygon, color){
	polygon.setFillColor(color);
}

Map.prototype.setPolygonShow = function(polygon){
	polygon.show();
}

Map.prototype.setPolygonHide = function(polygon){
	polygon.hide();
}

Map.prototype.setUrlHead = function(url){
	this.urlHead = url;
}

Map.prototype.getPolygonPoints = function(polygon){
	return polygon.getLngLats();
}

Map.prototype.setLabelState = function(label, flag) {
	if (flag){
		label.show();
	}else{
		label.hide();
	}
};

Map.prototype.convertCirleToRect = function(lat, lng, radius){
	var handler = this;
	if (lng < 100000){
		lng = lng * 100000;
	}
	
	if (lat < 100000){
		lat = lat * 100000;
	}
	
	var lngMini = lng - radius;
	var latMini = lat - radius;
	var lngMax = lng + radius;
	var latMax = lat + radius;
	
	return [
	    handler.createPoint(parseFloat(latMax / 100000), parseFloat(lngMini / 100000)), 
		handler.createPoint(parseFloat(latMax / 100000), parseFloat(lngMax / 100000)), 
		handler.createPoint(parseFloat(latMini / 100000), parseFloat(lngMax / 100000)), 
		handler.createPoint(parseFloat(latMini / 100000), parseFloat(lngMini / 100000))
	];
}

Map.prototype.convertRectToCirle = function(latMini, lngMini, latMax, lngMax){
	if (latMini < 100000){
		latMini = latMini * 100000;
	}
	
	if (lngMini < 100000){
		lngMini = lngMini * 100000;
	}
	
	if (latMax < 100000){
		latMax = latMax * 100000;
	}
	
	if (lngMax < 100000){
		lngMax = lngMax * 100000;
	}
	
	var lng = (lngMini+lngMax)/2;
	var lat = (latMini+latMax)/2;
	var temp = (lngMini-lngMax)*(lngMini-lngMax)+(latMini-latMax)*(latMini-latMax);
	var radius =  Math.pow(temp/8.0,0.5);
	return {
		lng    : parseFloat(lng / 100000),
		lat    : parseFloat(lat / 100000),
		radius : radius
	}
}

Map.prototype.clearShutButton = function(){
	var imgs = document.getElementsByTagName("img");
	for (var i=0;i<imgs.length;i++){
		if (imgs[i].src.indexOf("ctrls.gif") != -1){
			var topNode = imgs[i].parentNode.parentNode.parentNode;
			topNode.removeChild(imgs[i].parentNode.parentNode);
		}
	}
}

Map.prototype.distanceFrom = function(lngLat1 ,lngLat2)  {
	var latRadians1= lngLat1.latY * (Math.PI / 180);
	var latRadians2 = (lngLat2.latY) * (Math.PI / 180);
	var latRadians = latRadians1 - latRadians2;
	var lngRadians= (lngLat1.lngX) * (Math.PI / 180)- (lngLat2.lngX) * (Math.PI / 180);
	var f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latRadians / 2), 2) + Math.cos(latRadians1) * Math.cos(latRadians2) * Math.pow(Math.sin(lngRadians / 2), 2)));
	return f * 6378137;
}
