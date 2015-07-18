function Map(id, user) {
	this._user = user || "";
	this._id = id;
	this._oMap = null;
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
		polygon    : true,
		print      : false,
		fullScreen : false,
		marker     : false,
		markerExt  : true,
		standMap   : true,
		overviewMap: false,
		scale      : true,
		switchMap  : true,
		boon       : true,
		MouseScroll: true,
		handleKeyboard:true,
		configCenter : true,
		useCenter  : false,
		clear      : false,
		targetMap  : true,
		circle     : true
		
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
		if ((typeof (SE) != "undefined") && divObj != null) {
			this._divObj = document.getElementById(divObj);
			
			this._divObj.style.display = "block";
			this._oMap = new SE.Map(divObj);
			if ((lat == 0 || typeof(lat) != "number")&& (lng == 0 || typeof(lng) != "number")){
				lat = 38.29348;
				lng = 109.29054;
			}
			
			this._oMap.centerAndZoom(this.createPoint(lat, lng), zoomLevel);
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
			this._oMap.enableHandleMouseScroll();
			// this.tools.measure = true;
			this.tools.zoomOut = true;
			this.tools.zoomIn  = true;
			// this.tools.search  = true;
			this.tools.clear  = true;
			// this.tools.circle  = true;
			// this.tools.targetMap  = true;
			// this.tools.polygon  = true;
			this._currentCity = defaultCity || Map.locale.defaultCity;
			
			this.initStandardControls(this.tools);
			this.initToolbarControls(this.tools);
			this._divObj.onclick = function(){
			}
			return 1;
		} else {
			return 0;
		}
	} catch (e) {
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
		var map = this._oMap;
		
		if (opts.boon){
			map.addControl(new SE.MapControl());
		}
		
		if (opts.switchMap){
			var switchControl = new SE.MapTypeControl();
			map.addControl(switchControl);
			// map.removeMapType(SE.Traffic_MAP);
			switchControl.setRight(5);
		}
		
		if (opts.scale){
			var scale = new SE.ScaleControl();
			scale.setLeft(20);
			scale.setBottom(30);
			map.addControl(scale);
		}
		
		if (opts.mouseScroll){
			map.handleMouseScroll(true);
		}
		
		if (opts.handleKeyboard){
			map.handleKeyboard();
		}
		
	}catch(e){
	}
}

Map.prototype.initToolbarControls = function(opts){
	try{
		var operatorObj = this;
		//alert(this);
		
		var x = 2;
		var y = 0;
		if (this.tools.switchMap){
			y = 0;
		}
		
		this._toolbar = new LTControlsToolbar("ltmap-toolbar", operatorObj, x, y);
		if (!opts) opts = this._defaultConfig;
		
		if (opts.hand){
			this._toolbar.appendControl(new LTControlsToolbarItems(this._id, 
					new LTHand("hand"), "", "hand.gif", this._toolbar._toolbarControls.length, Map.locale.tool.hand));
		}
		
		
		
		if (opts.measure){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolyLineControl("measure", this, "measure"), 
					"", 
					"measure.png", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.measure
				)
			);
		}
		
		if (opts.zoomOut){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTRectControl("zoomout", this, "zoomOut"), 
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
					new LTRectControl("zoomin", this, "zoomIn"), 
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
					"rect.png", 
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
					"circle.png", 
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
					"polyline.png", 
					this._toolbar._toolbarControls.length, 
					Map.locale.tool.polyline
				)
			);		
			
		}
		this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTKeyPointControl("keyPoint", this), 
					"", 
					"keypoint.png",
					this._toolbar._toolbarControls.length,"关键点监控"
				)
			);
		
		if (opts.polygon){
			this._toolbar.appendControl(
				new LTControlsToolbarItems(
					this._id, 
					new LTPolygonControl("polygon", this), 
					"", 
					"polygon.png",
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
				//alert("clear");
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
		//$("#mapToolbar").append(this._toolbar._obj);
		
		document.body.appendChild(this._toolbar._obj);
		
	}catch(e){
		// alert(e);
	}
}

Map.prototype.createScaleControl = function(){
	var scaleControl = new LTScaleControl();
	scaleControl.units = [[1000,"km"],[1,"m"]];
	scaleControl.setColor("green");
	return scaleControl;
}

Map.prototype.createPoint = function(lat, lng) {
	return new SE.LngLat(this.latLngFormat(lng), this.latLngFormat(lat));
	// return new LTPoint(113.04095, 22.56515);
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
	return marker.getLngLat();
};

Map.prototype.getZoom = function() {
	return this._oMap.getCurrentZoom();
};

Map.prototype.createPolyline = function(points, color, weight, opacity) {
	// return new GPolyline(points, color, weight, opacity);
	return new SE.PolyLine(points, color || this._color, weight || this._weight, opacity || this._opacity);
};

Map.prototype.setPolylineColor = function(polyline, color) {
	polyline.setLineColor(color);
};

Map.prototype.setPolylineStroke = function(polyline, stroke) {
	polyline.setLineStroke(stroke);
};


Map.prototype.addOverlay = function(overlay) {
	this._oMap.addOverLay(overlay);
};

Map.prototype.removeOverlay = function(overlay, flag) {
	this._oMap.removeOverLay(overlay, flag);
};

Map.prototype.createPolygon = function(points, color, bgcolor, weight, opacity) {
	return new SE.Polygon(points,
			color || this._color ,bgcolor || this._bgcolor ,weight || this._weight ,opacity || this._opacity);
};


Map.prototype.createRect = function(bounds,color,bgcolor,weight,opacity){
	return new SE.Rect(bounds, color || this._color ,bgcolor || this._bgcolor ,weight || this._weight ,opacity || this._opacity);
}

Map.prototype.createCircle = function(lat, lng, radius, opts){
	return new SE.Circle(this.createPoint(lat, lng), radius, opts || {});
}


Map.prototype.createLabel = function(id, lat, Lng, title, x, y, opacity) {
	var mapText = new SE.PointOverlay(this.createPoint(lat, Lng), [x || 0, y || 0]);
	mapText.setLabel(title || "");
	mapText.setOpacity(opacity || 100);
	return mapText;
};

Map.prototype.changeLabelText = function(label, text) {
	label.setLabel(text);
};

Map.prototype.drawCircle = function(lat, lng, radius) {
	
};

Map.prototype.setCenter = function(point, zoomLevel) {
	try {
		this._oMap.setCenterAtLngLat(point, zoomLevel || this.getZoom());
	}catch(e){
	}
	
	// moveToCenter setCenterAtLatLng
};

Map.prototype.markerSetImage = function(marker, imageUrl, width, height, anchorWidth, anchorHeight) {
	if (typeof(anchorWidth) != "undefined"){
		marker.setIconImage(imageUrl, new SE.Size(width, height), new SE.Point(anchorWidth, anchorHeight));
		return;
	}
	
	
	if (typeof(width) != "undefined"){
		marker.setIconImage(imageUrl, new SE.Size(width, height));
		return;
	}
	
	
	
	marker.setIconImage(imageUrl);
};

Map.prototype.markerSetPosition = function(marker, lat, lng) {
	marker.setLngLat(this.createPoint(lat, lng));
};

Map.prototype.createIcon = function(width, height, anchorWidth, anchorHeight, imagePath) {
	return new SE.Icon(imagePath, new SE.Size(width, height), new SE.Point(anchorWidth, anchorHeight));
};

Map.prototype.createMarker = function(point, icon, title) {
	// trace("createMarker");
	var marker =  new SE.Marker(
		point
	);
	marker.setIconImage(icon);  
	return marker;
};

Map.prototype.createCurrentMarker = function(point) {
	// trace("createMarker");
	return new SE.Marker(
		point, 
		this.createIcon(12, 12, 8, 8, "images/track/currentPoi.png")
	);
};

Map.prototype.eventBind = function(obj, eventName, handle, flag) {
	return SE.Event.addListener(obj, eventName, handle);
};

Map.prototype.configCenterPointCallback = function(callback) {
	this._configCenterPointCallback = callback;
}



Map.prototype.useCenterPointConfig = function() {
	try{
		this.setCenter(this.createPoint(this._centerLat, this._centerLng), this._centerZoomLevel);
	}catch(e){
		
	}
};

Map.prototype.configCenterPoint = function() {
	var center = this.getCenter();
	this._centerLat = center.lat;
	this._centerLng = center.lng;
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
	return SE.Event.bind(obj, eventName, targetObj, handle);
};

Map.prototype.removeListener = function(handler) {
	return SE.Event.removeListener(handler);
};



Map.prototype.openInfoWindowHtml = function(marker, html, handle, width, height) {
	if (!handle) handle = function(){};
	if (marker.setInfoWinWidth){
		marker.setInfoWinWidth(width || 300);
		marker.setInfoWinHeight(height || 150);
		var openInfoWinHtml = marker.openInfoWinHtml("");
		openInfoWinHtml.setLabel(html);
	}else{
		if (marker.suit){
			if (this.publicInfoWindow){
				this.removeOverlay(this.publicInfoWindow);
				this.publicInfoWindow = null;
			}
			
			if (!this.publicInfoWindow){
				this.publicInfoWindow = this.createInfoWindowObj(
					this.getPointLat(marker.suit), 
					this.getPointLng(marker.suit), 
					"", 
					html
				)
				this.addOverlay(this.publicInfoWindow);
			}
		}
	}
	handle();
};

Map.prototype.getRectCenterPointLatLng = function(rect){
	return rect.getBounds().getCenter();
}

Map.prototype.createInfoWindowObj = function(lat, lng, title, html){
	var infoWindow = new SE.InfoWindow(this.createPoint(lat, lng))
	infoWindow.setTitle(title || "");
	infoWindow.setLabel(html || "");
	return infoWindow;
}

Map.prototype.getAddress = function(id, lat, lng) {
	var handler = this;
    var request={location:this.createPoint(lat, lng)};  
    var gc = new SE.ServiceGC();
    var address = document.getElementById("address_" + id);
	if (address){
		address.innerHTML = this.defaultText.getAddreeDefaultText;
	}
	
    gc.rgcEncoding(request,function(data){
    	if(data.status != 'error'){
    		if (address){
    			// alert(handler.addressFormat(data.result));
    			address.innerHTML = handler.addressFormat(data.result);
    		}
    	}
    });
};

Map.prototype.addressFormat = function(result) {
	
	if (!result.district_text) return this.defaultText.getAddreeErrorText;
	
	return result.district_text + 
		(result.point ? result.point.name : "") + (result.address ? result.address : "")
}

Map.prototype.getAddressCallback = function(lat, lng, callback) {
	var handler = this;
	var request = {location:this.createPoint(lat, lng)};  
    var gc = new SE.ServiceGC();
	
    gc.rgcEncoding(request,function(data){
    	if(data.status != 'error'){
    		if (callback){
    			callback(handler.addressFormat(data.result));
    		}
    	}
    });
};


/**
 * open 直接打开信息窗口
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
	// this.setCenter(currentCenter, currentLevel);
	return ret;
}

Map.prototype.beyondTheMark = function(lat, lng) {
	if(lat < 100000)
	{
	lat = lat * 100000;
	lng = lng *100000 ;
	}
	var mapBounds = this._oMap.getLngLatBounds();
	var northEast = mapBounds.getNorthEast();
	var southWest = mapBounds.getSouthWest();
	if ((lng > southWest.getLng() && lng < northEast.getLng()) && 
			(lat > southWest.getLat() && lat < northEast.getLat())) {
		return true;
	}
	return false;
};


Map.prototype.getBoundsMiniMax = function(mapBounds) {
	var northEast = mapBounds.getNorthEast();
	var southWest = mapBounds.getSouthWest();
	
	return {
		xMin : this.latLngChange(southWest.getLng()),
		yMin : this.latLngChange(southWest.getLat()),
		xMax : this.latLngChange(northEast.getLng()),
		yMax : this.latLngChange(northEast.getLat())
	}
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
	//alert("clear overlays");
	this._oMap.clearOverLays();
}

Map.prototype.getBestMap = function(points, flag){
	this._oMap.getBestMap(points);
	if (flag){
		this._oMap.getBestMap(points);
	}
	
	var zoomLevel = this.getZoom();
	if (zoomLevel - 1 > 0){
		this.setZoom(zoomLevel - 1);
	}else{
		this.setZoom(zoomLevel);
	}
	
	
}

Map.prototype.setZoom = function(zoomLevel){
	this._oMap.setZoom(zoomLevel);
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
	label.setPoint(this.createPoint(lat, lng));
};

Map.prototype.getPointLat = function(point) {
	return this.latLngChange(point.getLat());
};

Map.prototype.getPointLng = function(point) {
	return this.latLngChange(point.getLng());
};

Map.prototype.fromContainerPixelToLngLat = function(pixel){
	return this._oMap.fromContainerPixelToLngLat(pixel);
}

Map.prototype.fromLngLatToContainerPixel = function(latLng){
	return this._oMap.fromLngLatToContainerPixel(latLng);
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
			(this.latLngChange(points[i].getLng()) / this._defaultLatLngDiff) + 
			"," + 
			(this.latLngChange(points[i].getLat()) / this._defaultLatLngDiff)
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
	var polyline =  this.createPolyline(this.stringToPoint(string));
	 SE.Event.bind(polyline,"mouseover",polyline,  function()
	{
		 this.setLineColor("red");  
	});  
            SE.Event.bind(polyline,"mouseout",polyline,  function()
	{this.setLineColor("blue");
	});  
		SE.Event.addListener(polyline,"click", function()
		{
			// alert("fuck you");
		});  
    this._oMap.addOverLay(polyline);

	return polyline;
}


Map.prototype.createPolylineById = function(string, id, clickCallback){
	var polyline =  this.createPolyline(this.stringToPoint(string));
	 SE.Event.bind(polyline,"mouseover",polyline,  function()
	{
		 this.setLineColor("red");  
	});  
            SE.Event.bind(polyline,"mouseout",polyline,  function()
	{this.setLineColor("blue");
	});  
		SE.Event.addListener(polyline,"click", function()
		{
			if(clickCallback)
				clickCallback(id);
			// alert("fuck you");
		});  
    this._oMap.addOverLay(polyline);

	return polyline;
}



Map.prototype.createEnclosureById = function(stringPoints, radius, id, enclosureType, clickCallback){
	var mapArea = null;
		var pt = this.stringToPoint(stringPoints);
	//alert(enclosureType);
	if(enclosureType == "circle")
	{
		pt = pt[0];
	    mapArea =  this.createCircle(pt.getLat(), pt.getLng(), radius);
	}
	else 	if(enclosureType == "rect")
	{
		var bounds=new SE.LngLatBounds([pt[3],pt[1]]);  
	    mapArea =  this.createRect(bounds);
	}
	else 	if(enclosureType == "polygon")
	{
		var pt1 = pt[0];
		var pt2 = pt[pt.length - 1];
		if(pt1.getLat() != pt2.getLat() && pt1.getLng() != pt2.getLng())
		{
		   pt.push(pt1);//首尾相接
		}
	    mapArea =  this.createPolygon(pt);
	}else
		return;

	 SE.Event.bind(mapArea,"mouseover",mapArea,  function()
	{
		 this.setLineColor("red");  
	});  
     SE.Event.bind(mapArea,"mouseout",mapArea,  function()
	{this.setLineColor("blue");
	});  
		SE.Event.addListener(mapArea,"click", function()
		{
			if(clickCallback)
				clickCallback(id);
			// alert("fuck you");
		});  
    this._oMap.addOverLay(mapArea);

	return mapArea;
}

Map.prototype.getScale = function()
{
	return this._oMap.getScale();
}

Map.prototype.createPolygonByString = function(string, color, bgcolor, weight, opacity){
	return this.createPolygon(this.stringToPoint(string), color, bgcolor, weight, opacity);
}

Map.prototype.createLineBufferByStringPoints = 	function (stringPoints, nWidth)
{
	return this.createLineBuffer(this.stringToPoint(stringPoints), nWidth);
}
/**
 * 创建缓冲区, ptArray 坐标点数组 nWdith缓冲区宽度
 */
Map.prototype.createLineBuffer = 	function (ptArray, nWidth)
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
				  var pixelWidth = nWidth / map.getScale(); //缓冲区的宽度转换成 前端地图像素的宽度 
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
				
				var pl = map.createPolygonByString(strPolyPoints);
				map.addOverlay(pl);
				 // if(console)
					 // console.log(pixel.x + ","+ pixel.y); //像素坐标
				  //strPixel += pixel.x + ","+ pixel.y + ";";
			}	

			return bufferPoints;		
	}



Map.prototype.getCenter = function(){
	return this._oMap.getCenterPoint();
}

Map.prototype.getCenterPointLatLng = function(){
	var point = this.getCenter();
	return [this.latLngFormatReserve(this.latLngChange(point.getLat())), 
	        this.latLngFormatReserve(this.latLngChange(point.getLng()))];
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


Map.prototype.getLatLngArrayFromPointObject = function(pointObject){
	return [
	    this.latLngChange(pointObject.getLat()) / this._defaultLatLngDiff, 
	    this.latLngChange(pointObject.getLng()) / this._defaultLatLngDiff
	]
}

Map.prototype.pointToObject = function(point){
	
	return this._oMap.fromContainerPixelToLngLat(point);
}


Map.prototype.closeInfoWindow = function(marker){
	if (marker){
		if(marker.closeInfoWin)
		     marker.closeInfoWin();
	}else{
		if (this.publicInfoWindow){
			this.removeOverlay(this.publicInfoWindow);
			this.publicInfoWindow = null;
		}
		
		var infowindow = this._oMap.getInfoWindow();
		if (infowindow){
			infowindow.closeInfoWindow();
		}
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



