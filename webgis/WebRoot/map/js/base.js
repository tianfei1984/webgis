var COMMON_INFO = {
	// 方向
	"1" : Map.locale["1"],
	"2" : Map.locale["2"],
	"3" : Map.locale["3"],
	"4" : Map.locale["4"],
	"5" : Map.locale["5"],
	"6" : Map.locale["6"],
	"7" : Map.locale["7"],
	"8" : Map.locale["8"]
};

/**
 * 地图操作对象
 * @param handler
 * @param locale
 * @returns {MapOperationHandler}
 */
function MapOperationHandler(handler, mode) {
	this.clickCount = 0;
	this._window = window;
	this._handler = handler;
	this._defaultTrackNodeCount = 500;
	this._defaultTrackModeDistant = 2000; // unit(m)
	this._enableFunc = null;
	this._isStop = false;
	// this._currentMapType = currentMapType;
	this.startMarker = null;
	this._startMarkerClickHandler = null;
	this.courseMarker = null;
	this._courseMarkerClickHandler = null;
	this.endMarker = null;
	this._endMarkerClickHandler = null;
	this._preCourseMarker = null;
	this._currentMarkerIndex = 0;
	this._isPlay = false;
	this._defaultStartImg = "";
	this._defaultEndImg = "";
	this._defaultPlayZoom = 13;
	this._defaultLocationColor = "#333399";
	this._defaultLocationWeight = 3;
	this._defaultLocationOpacity = 1;
	if (typeof (Storage) != "undefined")
		this._storage = new Storage();
	this._gridSelectionModel = null;
	this._nCount = 0; //每次播放的计数器
	this._defaultPageSize = 100; //默认缺省的分页数
	this._pageCount = null; //总页数
	this._nCurrentPage = null; //当前页的行数
	this._nStartPage = 0; //起始页
	this._oCallBack = null;
	this._timeId = null;
	this._autoChangePage = false;
	this._preLat = null;
	this._preLng = null;
	//回放轨迹时默认标记
	this._defaultLocationImgUrl = "/images/car_green.gif";
	//定位点名时默认标记
	this._defaultCenterPoint = "images/track/centerPoi.gif";
	this._preMarkerIcon = "/images/location/pre_car.gif";
	this._preTrackerIcon = "/images/location/pre_tracker.gif";
	this._isOver = true;
	this._placeAddress = "";
	this._currentDynamicMarker = null;
	this._preDynamicMarker = null;
	this._preMarkerType = null;
	if (typeof (LOCALE) != "undefined") {
		this._startIconImageUrl = "images/track/" + LOCALE + "/start.gif";
		this._endIconImageUrl = "images/track/" + LOCALE + "/end.gif";
	} else {
		this._startIconImageUrl = "images/track/zh_cn/start.gif";
		this._endIconImageUrl = "images/track/zh_cn/end.gif";
	}
	
	this._cousorImageUrl = "images/track/centerPoi.gif";
	
	this._eventImageUrl = "images/track/event.png";
	
	this._alarmImageUrl = "images/track/alarm.png";
	
	this._currentImageUrl = "images/track/point.png";
	this._preRecord = null;
	this._radius = 500; // (米)
	this.realDataMap = {};
}

MapOperationHandler.prototype.mapOverlayInit = function() {
	if (typeof (MapOverlay) != "undefined")
		this._overlays = new MapOverlay(this._handler, "vehicle");
};

MapOperationHandler.prototype.setDefaultTrackNodeCount = function(count) {
	this._defaultTrackNodeCount = count;
}



MapOperationHandler.prototype.getMap = function() {
	return this._handler._oMap;
}


MapOperationHandler.prototype.bindClickEventHTML = function(opts) {
	if(window.parent && window.parent.renderTemplate)
		return window.parent.renderTemplate(opts);
	return "";
	
}

MapOperationHandler.prototype.removeInfoWindow = function(nodeObj) {
	if (nodeObj._markClickHandler != null) {
		GEvent.removeListener(nodeObj._markClickHandler);
		nodeObj._markClickHandler = null;
	}
}


MapOperationHandler.prototype.drawLine = function(points) {
	var line = this._handler.createPolyline(points, this._defaultLocationColor,
			this._defaultLocationWeight, this._defaultLocationOpacity);
	this._handler.addOverlay(line);
	return line;
};

MapOperationHandler.prototype.createMarkerOverlayExt = function(id, text,
		validate, angle, tLat, tLng, gpsTime, speed) {
	// 114.045996,22.562374
	// rp=0&114.045996,22.562374
	// console.info("createMarkerOverlayExt")
	var data = {
		id : id,
		text : text,
		validate : validate,
		angle : angle,
		tLat : tLat,
		tLng : tLng,
		rLat : tLat,
		rLng : tLng,
		gpsTime : gpsTime,
		speed : speed,
		rectifyError : false
	}
	// console.info(data)
	var operatorObj = this;
	// console.info("http://220.231.155.212:8000/gpsTracking/decode/mapbar/encoding?customer=1&latlon=" + tLng + "," + tLat + "&mt=1&zm=14&rp=0")
	operatorObj.createMarkerOverlay(data, "track");
}


MapOperationHandler.prototype.setCenter = function(lat, lng)
{
		this._handler.setCenter(this._handler.createPoint(lat, lng), 10);
}

MapOperationHandler.prototype.centerLatLons = function(records) {
	var lat1, lon1, lat2, lon2;
	lat1 = null;
	lon1 = null;
	lat2 = null;
	lon2 = null;
	var latlon = "";
	for ( var i = 0; i < records.length; i++) {
		//找到精度和纬度
		if (parseFloat(records[i].tLat) > 0.1
				&& parseFloat(records[i].tLng) > 0.1) {

			latlon += records[i].tLat + "," + records[i].tLng + ";"
			if (lat1 == null) {
				lat1 = records[i].tLat;
				lat2 = records[i].tLat;
			} else {
				if (lat1 < records[i].tLat) {
					lat1 = records[i].tLat;
				}
				if (lat2 > records[i].tLat) {
					lat2 = records[i].tLat;
				}
			}
			if (lon1 == null) {
				lon1 = records[i].tLng;
				lon2 = records[i].tLng;
			} else {
				if (lon1 < records[i].tLng) {
					lon1 = records[i].tLng;
				}
				if (lon2 > records[i].tLng) {
					lon2 = records[i].tLng;
				}
			}
		}
	}
	if (lat1 != null) {
		
		var scale1 = this._handler.computeScale(lat1, lon1, lat2, lon2);
		var lat = (lat1 + lat2) / 2;
		var lon = (lon1 + lon2) / 2;
		if (scale1 > 11) {
			scale1 = 11;
		}
		scale1 += 2;
		lat = lat +0.02;
		//alert(lat);
		this._handler.setCenter(this._handler.createPoint(lat, lon), scale1);
	}
}

MapOperationHandler.prototype.createMarkerOverlays = function(records, flag, isOpenWindow) {
	for ( var i = 0; i < records.length; i++) {
		//this.createMarkerOverlay(records[i]);
		var currentLatLng = this._handler.createPoint(records[i].rLat,
				records[i].rLng);
		this.createMarkerOverlayPointMode(records[i], flag, isOpenWindow);
		//this.createMarkerOverlay(records[i]);
	}
}
MapOperationHandler.prototype.centerMarkerOverlays = function(records, isOpenWindow) {
	this.centerLatLons(records);
	
	this.createMarkerOverlays(records, null, isOpenWindow);

}
/**
 *将数据库记录，转换成地图所需要的数据格式
 */
MapOperationHandler.prototype.convertRecord = function(rd)
{
	  var vehicleInfo = {id:rd.ID, text:rd.plateNo, vehicleId:rd.ID, rLat:rd.latitude,rLng:rd.longitude,
		  tLat:rd.latitude, tLng:rd.longitude,status:rd.status,color:rd.plateColor,validate:rd.valid,
		  direction:rd.direction,gas:rd.gas,depName:rd.depName,industry:rd.industry,simNo:rd.simNo,
		  vehicleType:rd.vehicleType,
							  angleInt:rd.direction, statusInt:0, speed:rd.velocity, warnTypeId:0, online:rd.online};
	  return vehicleInfo;
}

MapOperationHandler.prototype.switchTrackModeLines = function(id, flag) {
	try {
		this.defaultTrackDraw = flag;
		var overlay = this._overlays.isExistOverlay(id);
		if (overlay) {
			if (overlay.opts) {
				overlay.opts.drawLocaotion = flag;
				if (overlay) {
					var lines = overlay.opts.lines;
					if (lines) {
						if (flag) {
							for ( var i = 0; i < lines.length; i++) {
								lines[i].show();
							}
						} else {
							for ( var i = 0; i < lines.length; i++) {
								lines[i].hide();
							}
						}
					}
				}
			}
		}
	} catch (e) {
		
	}
}


MapOperationHandler.prototype.removePointModeMarker = function(id){
	if (this._overlays.isExistOverlay(id)){
		this._overlays.removeOverlay(id);
	}
}

MapOperationHandler.prototype.clearMarkerOverlay = function(){
	this._overlays.hideAllOverlays();
}


MapOperationHandler.prototype.clearAllVehicle = function() {
	if (this._enableFunc != null) {
		this._enableFunc();
	}
	this.clearStorage();
	this.drawStop();
}

MapOperationHandler.prototype.showMarkers = function(records,isOpenWindow) {
	
	for ( var i = 0; i < records.length; i++) {
		this.createMarkerOverlayPointMode(records[i], isOpenWindow);
		//this.createMarkerOverlay(records[i]);
	}

}


MapOperationHandler.prototype.changeMarkerImage = function(id, flag){
	var overlay = this._overlays.isExistOverlay(id), imageUrl;
	if (overlay){
//		var imageUrl = "";
//		if (flag){
//			imageUrl = "images/direction/" + setAngleImage(overlay.opts.angleInt);
//		}else{
//			imageUrl = "images/direction/off/" + setAngleImage(overlay.opts.angleInt);
//		}
		
		imageUrl = this.getImageUrl(
			"",
			overlay.opts.angleInt, 
			overlay.opts.statusInt, 
			overlay.opts.speed, 
			overlay.opts.warnTypeId, 
			flag
		);
		
		this._handler.markerSetImage(overlay.overlay, imageUrl, 24, 24, 12, 12);
	}
}

/**
 * 根据GPS实时数据，动态生成车辆地标
 * angleInt GPS上传的方向,根据方向生成不同的车型
 * warnTypeId GPS上传的报警值
 * online  true false 是否上线
 */
MapOperationHandler.prototype.getImageUrl = function(header, angleInt, statusInt, speed, alarm, online){
	var img = header + setAngleImage(angleInt);
	if(online)
	{
		if (typeof(alarm) != "undefined" && parseInt(alarm) != 0){
			return "images/alarm/" + img;
	    }else if(speed <= 1)
		{
		    return "images/direction/parking/" + img;

		}else			
			return "images/direction/" + img;

	}else
	{
		return "images/direction/off/" + img;
	
    }
}


/**
 * 创建点的图标
 * tagetInfo  id 车辆ID .angleInt, targetInfo.statusInt, targetInfo.speed,
		targetInfo.warnTypeId, targetInfo.online
	isOpenWindow 是否直接打开信息窗口
 */
MapOperationHandler.prototype.createMarkerOverlayPointMode = function(targetInfo, callback, isOpenWindow) {
	var currentLatLng = this._handler.createPoint(targetInfo.rLat,
			targetInfo.rLng);
	var overlay, imageUrl;
	var operatorObj = this;
	targetInfo.type = "point";
	imageUrl = this.getImageUrl("", targetInfo.angleInt, targetInfo.statusInt, targetInfo.speed,
		targetInfo.alarmState, targetInfo.online);
	
	
	if (!this._overlays.isExistOverlay(targetInfo.id)){
		var tempMarker = this._handler.createMarker(
				currentLatLng, 
				this._handler.createIcon(32, 32, 16, 16, imageUrl), 
				targetInfo.text,
				"",
				{x:24,y:6}
			);
		overlay = this._overlays.addOverlay(
			targetInfo.id, 
			tempMarker, 
			targetInfo,
			true,
			null,
			true
		);
			
		tempMarker.setIconImage(imageUrl); 
	} else {
		overlay = this._overlays.updateOverlay(targetInfo.id, targetInfo);
		this._handler.markerSetImage(overlay.overlay, imageUrl, 24, 24, 12, 12);
	}
	if (!overlay.display){
		this._overlays.showOverlay(targetInfo.id);
	}
	if (overlay.handler){
		this._handler.removeListener(overlay.handler);
	}
	this.clickCount++;
	
	overlay.opts.clickIndex = this.clickCount;
	/**
	overlay.handler = this._handler.bindClickEvent(overlay.overlay, overlay.opts,
		this.bindClickEventHTML, function() {
			if (callback){
				callback(targetInfo.vehicleId, overlay.opts.clickIndex);
			}
			operatorObj._handler.getAddress(overlay.opts.id, overlay.opts.rLat, overlay.opts.rLng);
			
		}, false);
	**/
	isOpenWindow = isOpenWindow ? isOpenWindow : false;
	
	overlay.handler = this._handler.bindClickEvent(
		overlay.overlay, 
		overlay.opts,
		function(opts){
			return operatorObj.bindClickEventHTML(opts);
		}, 
		function() {
			if (callback){
				callback(targetInfo.vehicleId, overlay.opts.clickIndex);
			}
			//得到地址后，直接赋值给前面的HTML中的id
			operatorObj._handler.getAddress(overlay.opts.id, overlay.opts.rLat, overlay.opts.rLng);
		}, 
		isOpenWindow,200,150
	);
	
	
	
	
	/**
	this._handler.openInfoWindowHtml(
		overlay.overlay, 
		this.bindClickEventHTML(overlay.opts), 
		function(){
			operatorObj._handler.getAddress(overlay.opts.id, overlay.opts.rLat, overlay.opts.rLng);
		}, 300, 200
	);**/
	
	return currentLatLng;
};

MapOperationHandler.prototype.createPolylineById = function(string, id, clickCallback)
{
	var pid = this._handler.createPolylineById(string, id, clickCallback);
    if(pid)
		this._storage.addKey("ma_" + id, pid); //保存在内存中，提供再次访问
}

MapOperationHandler.prototype.createEnclosureById = function(stringPoints, radius, id, enclosureType, clickCallback){

    var mapArea = this._handler.createEnclosureById(stringPoints, radius, id, enclosureType, clickCallback);
	if(mapArea)
		this._storage.addKey("ma_" + id, mapArea); //保存在内存中，提供再次访问
}


MapOperationHandler.prototype.createKeyPointMarkerById = function(id, lat, lng, title,
		icon, clickCallback) {
	var point = this._handler.createPoint(lat, lng);
	//this._handler.setCenter(point, this._handler.getZoom());
	var keyMarker= this._handler.createMarker(point, icon, title);
	this._handler.addOverlay(keyMarker);
	this._handler.markerSetPosition(keyMarker, lat, lng);
	this._handler.eventBind(keyMarker, "click", function()
	{		
			if(clickCallback)
				clickCallback(id);
	}) ;
	
	if(keyMarker)
		this._storage.addKey("ma_" + id, keyMarker); //保存在内存中，提供再次访问
	return keyMarker;
};

MapOperationHandler.prototype.createMapArea = function(id, data, title) {
	var records = [];
	this.removeMapArea("ma_" + id);
	var latLons = [];
	for ( var i = 0; i < data.length; i++) {
		latLons.push(this._handler.createPoint(data[i].lat, data[i].lon));
		records.push({
			tLat : data[i].lat,
			tLng : data[i].lon
		});
	}
	this.centerLatLons(records);
	latLons.push(this._handler.createPoint(data[0].lat, data[0].lon))
	var polyOptions = {
		geodesic : false
	};
	var polyline = this._handler.createPolygon(latLons);
	this._handler.addOverlay(polyline);
	this._handler.getBestMap(latLons);
	var latLng = this._handler.getCenterPointLatLng();
	this._handler.addOverlay(this._handler.createLabel(id, latLng[0],
			latLng[1], title, 0, 0));
	this._storage.addKey("ma_" + id, polyline);
}




MapOperationHandler.prototype.createLabel = function(id, lat, Lng, title, x, y, opacity)
{
	var key = "areaLabel_" + id;
	var label = this._storage.isExistKey(key);
	if(label)
	{
		this._handler.changeLabelText(label, title);
	}else
	{
		x = 0 - title.length;
		label = this._handler.createLabel(id, lat, Lng, title, x, y, 0);
		this._handler.addOverlay(label);
		this._storage.addKey(key, label);
	}
	return label;
}

MapOperationHandler.prototype.removeMapArea = function(id) {
	//删除图元
	var mo = this._storage.isExistKey("ma_" + id);
	if (mo) {
		this._handler.removeOverlay(mo);
		this._storage.removeKey("ma_" + id);
	}
	//删除文字标注
	var mo = this._storage.isExistKey("areaLabel_" + id);
	if (mo) {
		this._handler.removeOverlay(mo);
		this._storage.removeKey("areaLabel_" + id);
	}

}

/**
 * 删除指定层
 * @param {string} id 指定层id
 */
MapOperationHandler.prototype.removeMarker = function(id) {
	var overlay = this._overlays.getOverlay(id);
	if (overlay) {
		if (overlay.opts.type == "track") {
			for ( var i = 0; i < overlay.opts.targetInfos.length; i++) {
				if (overlay.opts.targetInfos[i]) {
					var marker = overlay.opts.targetInfos[i].marker;
					if (marker)
						this._handler.removeOverlay(marker);
					var line = overlay.opts.lines[i];
					if (line)
						this._handler.removeOverlay(line);
				}
			}
		}
		this._overlays.removeOverlay(id);
	}
};

//
MapOperationHandler.prototype.clearCorfirmMarker = function(markerObj,
		labelObj, groDelete) {
	if (markerObj != null) {
		this._handler.removeOverlay(markerObj);
	}

	if (labelObj != null) {
		this._handler.removeOverlay(labelObj);
	}
};

MapOperationHandler.prototype.createStartMarker = function(lat, lng, title,
		icon) {
	var point = this._handler.createPoint(lat, lng);
	this._handler.setCenter(point, this._handler.getZoom());
	if (this.startMarker == null) {
		this.startMarker = this._handler.createMarker(point, icon, title);
		this._handler.addOverlay(this.startMarker);
	} else {
		this._handler.markerSetPosition(this.startMarker, lat, lng);
	}
	return this.startMarker;
};




MapOperationHandler.prototype.drawStop = function() {
	this._currentMarkerIndex = 0;
	//this.startMarker = null;
	//this.courseMarker = null;
	this.firstPlay = false;
	this._isPlay = false;
	this._nCount = 0;
	this._preLat = null;
	this._preLng = null;
	if (this._enableFunc != null) {
		this._enableFunc();
	}
	this._isOver = true;
	this._isStop = false
}

MapOperationHandler.prototype.clearAllElement = function() {
	//alert("clearAllElement");
	if (this._enableFunc != null) {
		this._enableFunc();
	}
	this.clearStorage();
	this.drawStop();
}

MapOperationHandler.prototype.clearStorage = function() {
	if (this.startMarker != null)
		this._handler.removeOverlay(this.startMarker);
	if (this.courseMarker != null){
		this._handler.removeOverlay(this.courseMarker);
		this.courseMarker = null;
	}
	if (this.endMarker != null) this._handler.removeOverlay(this.endMarker);
	var listHash = this._storage.listHash;
	for ( var key in listHash) {
		this._handler.removeOverlay(listHash[key]);
		this._storage.removeKey(key);
	}
}


MapOperationHandler.prototype._drawPlayWithGrigEnd = function(){
	var that = this;
	if (this.courseMarker == null){
		return ;
	}
	
	this.endMarker = this._handler.createMarker(this._handler
			.getPoint(this.courseMarker), this._handler
			.createIcon(39, 25, 17, 26, this._endIconImageUrl));
	
	this.endMarker.setIconImage(this._endIconImageUrl); 
	/**
	this._handler.bindClickEvent(this.endMarker, this
			.markerDataBind(this._preRecord),
			this.bindClickEventHTML, this.drawGridCallback(this._handler, this._preRecord.get("serial_number"),
				this._preRecord.get("vehicleId"),this._preRecord.get("rlat"), this._preRecord.get("rlng")), false, 300);
	**/
	this._handler.bindClickEvent(this.endMarker, this
			.markerDataBind(this._preRecord),
			function(opts){
				return that.bindClickEventHTML(opts);
			}, this.drawGridCallback(this._handler, this._preRecord.RowNum,
				this._preRecord.gpsId,this._preRecord.latitude, this._preRecord.longitude), false, 300);
	
	this._handler.removeOverlay(this.courseMarker);
	this._handler.addOverlay(this.endMarker);
	this._gridSelectionModel.clearSelections();
	this.drawStop();
}

MapOperationHandler.prototype.getImage = function(type, angleInt) {
	// "images/track/" + setAngleImage(record.get("angleInt"));
//	switch(type){
//	case 0:
//		return this._currentImageUrl;
//	case 1:
//		return this._alarmImageUrl;
//	case 2:
//		return this._eventImageUrl;
//	}
	switch(type){
	case 0:
		return "images/direction/arrow-" + setAngleImage(angleInt);
	case 1:
		return "images/alarm/arrow-" + setAngleImage(angleInt);
	case 2:
		return "images/alarm/arrow-" + setAngleImage(angleInt);
	}
}

MapOperationHandler.prototype.markerSourceDataBind = function(text, data) {
	return {
		id        : data[0],
		text      : text,
		name      : text,
		vehicleId : data[18],
		tLat      : data[5],
		tLng      : data[6],
		speed     : data[4],
		validate  : data[9],
		gpsTime   : data[3],
		posTime   : data[3],
		rLat      : data[7],
		rLng      : data[8],
		angleInt  : data[20],
		acc       : data[1],
		angle     : data[10],
		mileage   : data[11],
		oilinfo   : data[12],
		espeed    : COMMON_INFO["none"],
		height    : data[13],
		type      : data[2]
	}
}


MapOperationHandler.prototype.getRecordImageUrl = function(record) {
	var direction = record.direction;
	var alarm = record.alarmState;
	var online = record.online;
	if(!direction)
		direction = 0;
	var img = setAngleImage(direction);
	if (typeof(alarm) != "undefined" && parseInt(alarm) != 0){
			return "images/alarm/" + img;
	}else{
			if (online){
				return "images/direction/" + img;
			}else{
				return "images/direction/off/" + img;
			}
		
	}
}

//**************************************************************带数据表格的轨迹绘制
MapOperationHandler.prototype.drawRoute = function(record) {
	// 当前计数器是否和当前页数相等
	
			if (record) {
				var courseLat =parseFloat(record.latitude);
				var courseLng = parseFloat(record.longitude);

				if (this.startMarker == null) {
					var latLng = this._handler.createPoint(courseLat, courseLng);
					this._handler.setCenter(latLng, this._handler.getZoom());
					this.startMarker = this._handler.createMarker(latLng,
							this._handler.createIcon(39, 25, 17, 26, this._startIconImageUrl));
				    
				    this.startMarker.setIconImage(this._startIconImageUrl); 
					this._handler.addOverlay(this.startMarker);
					
						var me = this;
					this._handler.bindClickEvent(this.startMarker, record, function(opts){
								return me.bindClickEventHTML(opts);
							},null, false,300);
							//this.drawGridCallback(this._handler, record.RowNum,
									//record.gpsId, courseLat, courseLng), false, 300);
					
					this._preLat = courseLat;
					this._preLng = courseLng;
					this._preRecord = record;
					// showDebugger("m_" + record.get("time"));
					this._storage.addKey("m_" + record.sendTime,
							this.startMarker);
				} else {
					//如果当前标记点超过了范围，则将地图移至中心点
					try {
						if (!this._handler.beyondTheMark(courseLat, courseLng)) {
							this._handler.setCenter(this._handler.createPoint(
									courseLat, courseLng));
						}
					} catch (e) {

					}
					// 这一次循环的时间
					var time = record.sendTime;
					this.currentRecord = record;
					
					// var imageUrl = "images/direction/arrow-" + setAngleImage(record.get("angleInt"));
					
					var vehicleImageUrl = this.getRecordImageUrl(record);
					
					if (this.courseMarker == null) {
						this.courseMarker = this._handler
								.createMarker(this._handler.createPoint(
										courseLat, courseLng), this._handler
										.createIcon(16, 16, 8, 8,
												vehicleImageUrl))
				        this.courseMarker.setIconImage(vehicleImageUrl); 
						this._handler.addOverlay(this.courseMarker);
						var me = this;
						this._handler.bindClickEvent(this.courseMarker, record, function(data){
							    var opts = me.currentRecord;
								return me.bindClickEventHTML(opts);
							},null, false,300);

					} else {
						this._handler.markerSetPosition(this.courseMarker,
								courseLat, courseLng);
					}
						var txt = "["+record.plateNo+"],车速:"+record.velocity + "km/h,时间:"+record.sendTime;
						var label = this.createLabel(record.vehicleId,courseLat, courseLng, txt, 12, 8, 100);
						label.setPoint(this._handler.createPoint(courseLat, courseLng));

					// 绘制前一点的图标
					var currentMarker;
					if (this._nCount > 1) {
						// console.info(2.1);
//						currentMarker = this._handler.createMarker(
//							this._handler.createPoint(
//								this._preLat,
//								this._preLng
//							), 
//							this._handler.createIcon(
//								16, 16, 8, 8,
//								this.getImage(this._preRecord.get("typeValue"), this._preRecord.get("angleInt"))
//							)
//						)

						var tempImageUrl = "images/track/point.png";	
						if(this._preRecord.alarmState > 0)
						{
						   tempImageUrl = "images/track/alarm.png";	
						}

						//var tempImageUrl = this.getRecordImageUrl(this._preRecord);
						currentMarker = this._handler.createMarker(
							this._handler.createPoint(
								this._preLat,
								this._preLng
							), 
							this._handler.createIcon(
								16, 16, 8, 8, tempImageUrl
							)
						)
				        currentMarker.setIconImage(tempImageUrl); 
						
						
						
						/**
						this._handler
								.bindClickEvent(currentMarker, this.markerDataBind(this._preRecord),
										this.bindClickEventHTML, this.drawGridCallback(this._handler, this._preRecord.get("serial_number"),
												this._preRecord.get("vehicleId"), this._preLat, this._preLng),
										false, 300);
						**/
						var me = this;
						this._handler
								.bindClickEvent(currentMarker, this._preRecord,
										function(opts){
											return me.bindClickEventHTML(opts);
										}	, this.drawGridCallback(this._handler, this._preRecord.RowNum,
												this._preRecord.gpsId, this._preLat, this._preLng),
										false, 300);
						this._handler.addOverlay(currentMarker);
						this._storage.addKey("m_"
								+ this._preRecord.RowNum,
								currentMarker);
					}

					//画线
					var line = this.drawLine([
							this._handler.createPoint(this._preLat,
									this._preLng),
							this._handler.createPoint(courseLat, courseLng) ]);
					this._storage.addKey("l_"
							+ (this._storage.getListCount() + 1), line);
					this._preLat = courseLat;
					this._preLng = courseLng;
					this._preRecord = record;
					// console.info(4);
				}
			
		}
		this._nCount++;
	//} catch (e) {
	//	alert(e);
	//}
}

MapOperationHandler.prototype.drawGridCallback = function(handler, id, vehicleId, lat, lng){
	return function() {
	}
}


/**
 * opts = {
 * 	 id       唯一标识
 *   text     名称
 *   lngLats  字符串经纬度
 *   show     是否显示在地图上
 *   type     矩形区域
 * }
 */
MapOperationHandler.prototype.createPolyline = function(opts) {
	return this._handler.createPolylineByString(opts.lngLats);
}

MapOperationHandler.prototype.createPolygon = function(opts) {
	return this._handler.createPolygonByString(opts.lngLats);
}

MapOperationHandler.prototype.createRect = function(opts) {
	return this._handler.createRectByString(opts.lngLats);
}

MapOperationHandler.prototype.setDrawPolylineEndCallback = function(callback) {
	this._handler.setDrawPolylineEndCallback(callback);
}

MapOperationHandler.prototype.setDrawRectEndCallback = function(callback) {
	this._handler.setDrawRectEndCallback(callback);
}

MapOperationHandler.prototype.setDrawPolygonEndCallback = function(callback) {
	this._handler.setDrawPolygonEndCallback(callback);
}

MapOperationHandler.prototype.setDrawPointEndCallback = function(callback) {
	this._handler.setDrawPointEndCallback(callback);
}

MapOperationHandler.prototype.setMarkerMoveEndCallback = function(markerMoveEndCallback){
	this._handler.markerMoveEndCallback = markerMoveEndCallback;
}

MapOperationHandler.prototype.setDragEndCallback = function(dragEndCallback){
	this._handler.dragEndCallback = dragEndCallback;
}

MapOperationHandler.prototype.setConfigCenterPointCallback= function(callback){
	this._handler.configCenterPointCallback = callback;
}
