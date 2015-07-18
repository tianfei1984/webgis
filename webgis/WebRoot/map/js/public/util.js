function convertHTMLStringToDom(HTMLString){
	var container = document.createElement("div");
	container.innerHTML = HTMLString;
	return container;
}

function eventProxy(dom, event, callback){
	dom[event] = function(e){
		var target = e.srcElement || e.target;
		callback(target, e);
	}
}


function isIEBrowser(){
	return navigator.appName == "Microsoft Internet Explorer";
}


function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure){
	var sCookie = sName + "=" + encodeURIComponent(sValue);
	if (oExpires){
		sCookie += "; expires=" + oExpires.toGMTString();
	}
	
	if (oExpires){
		sCookie += "; path=" + sPath
	}
	
	if (oExpires){
		sCookie += "; domain=" + sDomain
	}
	
	if (oExpires){
		sCookie += "; secure=" + bSecure
	}
	document.cookie = sCookie;
}

function getCookie(sName){
	var sRE = "(?:;.)?" + sName + "=([^;]*);?";
	var oRE = new RegExp(sRE);
	if (oRE.test(document.cookie)){
		return decodeURIComponent(RegExp["$1"]);
	}else{
		return null;
	}
}


var COMMON_INFO = {
  // 方向
  "1"      : "北",
  "2"      : "东北",
  "3"      : "东",
  "4"      : "东南",
  "5"      : "南",
  "6"      : "西南",
  "7"      : "西",
  "8"      : "西北",
  "unknow" : "未知",
  "name"           : "名称", 
  "radius"         : "半径",  
  "remark"         : "备注",
  "availability"   : "有效",
  "unavailability" : "无效",
  "ignition"       : "点火",
  "flameout"       : "熄火",
  "target"         : "名称",
  "lat_lng"        : "经纬度",
  "speed"          : "速度",
  "gps_time"       : "GPS时间",
  "pos_time"       : "上传时间",
  "status"         : "状态",
  "validate"       : "有效性",
  "direction"      : "方向",
  "address"        : "地址",
  "get_address_ing": "正在获取地址,请稍候......",
  "get_address"    : "获取地址",
  "couldnt_get_address" : "无法获取地址信息",
  "get_address_failed"  : "获取地址失败",
  "rectify_error"       : "无法纠偏该经纬度",
  "play" : "播放",
  "pause" : "暂停",
  "go_on" : "继续"
};

var MaxLat  = 53.55;
var MiniLat = 3.86667;
var MaxLon  = 135.04167;
var MiniLon = 73.66667;

function judgeLatLon(lat,lon){
  return ((lat > MiniLat) && (lat < MaxLat)) && ((lon > MiniLon) && (lon < MaxLon));
}

function getOffsetXY(obj){
	var x = 0;
	var y = 0;
	var z = 0;
	var ele = obj
	while(ele != null){
		x += ele.offsetLeft;
		y += ele.offsetTop;
		ele = ele.offsetParent;
	}
	return [x,y,z];
}


function extend(subClass, superClass) {     
	var F = function() {};     
	F.prototype = superClass.prototype;     
	subClass.prototype = new F();     
	subClass.prototype.constructor = subClass;      
	subClass.superclass = superClass.prototype;     
	if(superClass.prototype.constructor == Object.prototype.constructor) {         
		superClass.prototype.constructor = superClass;     
	} 
} 


function trace(string){
	var debug = document.getElementById("debug");
	if (debug) debug.innerHTML += string + "<br />";
}


function timeStr(str){
	if (str.length == 1) return str;
	
	if (str.substr(0,1) == 0) return str.substr(1,1);
}

/**
 * 将时间字符串转换为Date对象
 * @param str
 * @returns
 */
function parseDate(str){ 
	var ymd = str.split(" ")[0].split("-");
	var hms = str.split(" ")[1].split(":");
	return new Date(
		  parseInt(ymd[0]),
		  parseInt(timeStr(ymd[1])) - 1,
		  parseInt(timeStr(ymd[2])),
		  parseInt(timeStr(hms[0])),
		  parseInt(timeStr(hms[1])),
		  parseInt(timeStr(hms[2]))
  	);    
  
} 


/*
 * Hash类型数据存储对象
 */
function Storage(){
  this.listHash = {};
  this._listCount = 0;
}

Storage.version = "1.0";

/*
 * 增加元素
 * @params (Array)  key  键
 * @params (object) opt  值
 */
Storage.prototype.addKey = function(key,opt){
  if (typeof(this.listHash[key]) == "undefined"){
    this.listHash[key] = opt;
    this._listCount++;
  }
}

/*
 * 删除元素
 * @params (Array)  key  键
 */
Storage.prototype.removeKey = function(key){
  if (typeof(this.listHash[key]) != 'undefined'){
    delete this.listHash[key];
    this._listCount--;
  }
}

/*
 * 清除所有元素
 * @params (Object)  obj  对象
 */
Storage.prototype.removeAllKey = function(){
  for(var key in this.listHash){
    delete this.listHash[key];
    if (this._listCount > 0) this._listCount--;
  }
}

/*
 * 获取指定键值元素
 * @params (Array)  key  键
 */
Storage.prototype.getListHashEle = function(key){
  return this.listHash[key];
}

/*
 * 获取所有元素
 */
Storage.prototype.getListHash = function(){
  return this.listHash;
}

/*
 * 获取元素数目
 */
Storage.prototype.getListCount = function(){
  return this._listCount;
}

/*
 * 是否存在指定键的元素
 * @params (Array)  key  键
 */
Storage.prototype.isExistKey = function(key){
  if (typeof(this.listHash[key]) == "undefined") return false;
  return this.listHash[key];
}


/**
 * 取得字符串的长度(包括空白字符)
 */
String.prototype.realLength = function(){
  return this.replace(/[^\x00-\xff]/g,"**").length;
}

/**
 * 地球半径
 */
var R = 6371012;

/*
 * 计算2个经纬度之间的距离
 * @params {float} lat1 第一点的纬度
 * @params {float} lng1 第一点的经度
 * @params {float} lat2 第二点的纬度
 * @params {float} lng2 第二点的经度
 * @return float
 */
function distanceGet(lat1,lng1,lat2,lng2){
  lat1 = parseFloat(lat1);
  lng1 = parseFloat(lng1);
  lat2 = parseFloat(lat2);
  lng2 = parseFloat(lng2);
  return R*Math.acos(Math.cos(lng1)*Math.cos(lng2)*Math.cos(lat1-lat2)+Math.sin(lng1)*Math.sin(lng2));
}

var EARTH_RADIUS = 6378.137;
function rad(d){
   return d * Math.PI / 180.0;
}

function GetDistance(lat1, lng1, lat2, lng2){
   var radLat1 = rad(lat1);
   var radLat2 = rad(lat2);
   var a = radLat1 - radLat2;
   var b = rad(lng1) - rad(lng2);
   s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
   s = s * EARTH_RADIUS;
   s = Math.round(s * 10000) / 10000;
   return s;
}


var DIFF = 15;
/*
 * 根据度数判断方位
 * @params {float} angle 度数
 */
function setAngle(angle){
  try{
    angle = parseFloat(angle);
    
    if (angle >= (360 - DIFF) || angle <= DIFF){
    	return COMMON_INFO["1"];
	}  
	  
	if (angle >= (90 - DIFF) && angle <= (90 + DIFF)){
		return COMMON_INFO["3"];
	}
	
	if (angle >= (180 - DIFF) && angle <= (180 + DIFF)){
		return COMMON_INFO["5"];
	} 
	
	if (angle >= (270 - DIFF) && angle <= (270 + DIFF)){
		return COMMON_INFO["7"];
	} 
	
	
	if (angle > DIFF && angle < (90 - DIFF)){
		return COMMON_INFO["2"];
	}
	
	if (angle > (90 + DIFF) && angle < (180 - DIFF)){
		return COMMON_INFO["4"];
	}
	
	if (angle > (180 + DIFF) && angle < (270 - DIFF)){
		return COMMON_INFO["6"];
	}
	
	if (angle > (270 + DIFF) && angle < (360 - DIFF)){
		return COMMON_INFO["8"];
	}
    
	return COMMON_INFO["unknow"];
  }catch(e){
    return COMMON_INFO["unknow"]
  }
}

/*
 * 根据度数判断当前图标
 * @params {float} angle 度数
 */

function setAngleImage(angle){
  // document.getElementById("debugger").innerHTML += angle;
  try{
	if (angle >= (360 - DIFF) || angle <= DIFF){
	    return "0.png";
	}  
	  
	if (angle >= (90 - DIFF) && angle <= (90 + DIFF)){
	    return "90.png";
	}
	
	if (angle >= (180 - DIFF) && angle <= (180 + DIFF)){
	    return "180.png";
	} 
	
	if (angle >= (270 - DIFF) && angle <= (270 + DIFF)){
	    return "270.png";
	} 
	
	
	if (angle > DIFF && angle < (90 - DIFF)){
		return "30.png";
	}
	
	if (angle > (90 + DIFF) && angle < (180 - DIFF)){
		return "120.png";
	}
	
	if (angle > (180 + DIFF) && angle < (270 - DIFF)){
		return "210.png";
	}
	
	if (angle > (270 + DIFF) && angle < (360 - DIFF)){
		return "300.png";
	}
  }catch(e){
      return COMMON_INFO["unknow"];
  }
}



function setLatLngFormat(latLng){
  return parseFloat(latLng).toFixed(5);
}

function setLatLngShow(lat,lng){
  return lng + '/' + lat;
}

function setSpeedFormat(speed){
  var tSpeed = parseFloat(speed);
  return tSpeed.toFixed(1);
}


var markerCenter = false

function availabilitySet(overlay,flag,zoom,getLatiLonCallback,exts){
  // showDebugger("availabilitySet");
  var opts = overlay.opts;
  var args = {};
  if (exts){
    args = {
      overlay  : overlay,
      flag     : flag,
      gridObj  : exts.gridObj,
      recordId : exts.recordId,
      rowHash  : exts.rowHash,
      type     : exts.type
    }
  }else{
    args = {
      overlay  : overlay,
      flag     : flag
    }
  }
  // showDebugger("getLatiLonCallback:" + typeof("getLatiLonCallback"));
  if (getLatiLonCallback){
    args.callback = getLatiLonCallback;
  }
  // showDebugger("opts._validate:" + opts._validate);
  if (opts._validate == COMMON_INFO["availability"]){
    // showDebugger("CONFIG.use_service:" + CONFIG.use_service);
    opts._mode = false;
    if (CONFIG.use_service){
      // showDebugger("!opts._rLat:" + !opts._rLat);
      if (!opts._rLat){
        // showDebugger("getRectifyLatLng");
        getRectifyLatLng(
          0,
          {
            _tLat : opts._tLat,
            _tLng : opts._tLng,
            _zoom : zoom
          },
          {
            /*
             * 调用至mapReceive.js文件,获取纠偏经纬度并且执行回调函数.
             */
            onComplete : getLatiLon
          },
          args
        );
      }else{
        // showDebugger("getLatiLon");
        getLatiLon(
          [opts._rLng,opts._rLat],
          args
        )
      }
    }else{
      getLatiLon(
        [opts._tLng,opts._tLat],
        args
        )
    }
  }else if(opts._validate == COMMON_INFO["unavailability"]){

    if (!opts._rLat){
      baseStationCall(
        overlay,
        setBaseTracking,
        zoom,
        getLatiLonCallback,
        args
        )
    }else{
      if (exts.rowHash){
        setBaseTracking("",
        {
          overlay  : overlay,
          callback : getLatiLonCallback,
          gridObj  : exts.gridObj,
          recordId : exts.recordId,
          rowHash  : exts.rowHash,
          type     : exts.type
        }
        );
      }else{
        setBaseTracking("",
        {
          overlay  : overlay,
          callback : getLatiLonCallback
        }
        );
      }
    }
  }
}

/*
 * 在定位信息返回非精确定位时,通过基站号以及区域号获取基站定位经纬度,
 * 比较2个经纬度的间距是否超出预定值,没有超出任然采用原经纬度,如
 * 果超出则采用基站定位获取的经纬度
 * @params  {string} responseText  根据ajax调用返回的经纬度
 * @params  {object} message       接收到得定位信息
 */
function setBaseTracking(responseText,args){
  try{
    if (args != "error"){
      var opts = args.overlay.opts;
      if (!opts._rLat){
        var lngLat = responseText.split("-");
        var mode = lngLat[0];
        var rLngLat = lngLat[1].split(",");
        var tLngLat = lngLat[2].split(",");
        opts._mode = mode;
        opts._rLng = rLngLat[0];
        opts._rLat = rLngLat[1];
        opts._tLng = tLngLat[0];
        opts._tLat = tLngLat[1];
      }
      if (args.rowHash){
        args.rowHash.rlat = opts._rLat;
        args.rowHash.rlng = opts._rLng;
        args.rowHash.mode = opts._mode;
        setGridrowBgcolor(args.gridObj,args.recordId,args.rowHash.mode);
      }


      drawMarker(args.overlay,true);
      if (args.callback){
        args.callback(args.overlay);
      }
    }
  }catch(e){
  //messageAlert(e,"mapPublic 223")
  }
}

function baseStationCall(overlay,callback,zoom,getLatiLonCallback,args){
  /*
   * 调用ajax通用处理函数ajaxCall,该函数定义在util.js中
   */
  var opts = overlay.opts;
  try{
    ajaxCall(
    {
      url    : "/tracking/trackingprocess/get_base_location",
      method : "post",
      params : {
        //cid  : hexToDecimal(opts._cid),
        //lac  : hexToDecimal(opts._lac),
        cid  : opts._cid,
        lac  : opts._lac,
        z    : zoom,
        lng  : opts._tLng,
        lat  : opts._tLat
      }
    },
    {
      errorFilter : ["runtime error","arg error"],
      errorAlert  : COMMON_INFO["uncatch_lati_longi"]
    },
    {
      onComplete     : callback,
      onRunTimeError : callback,
      onFailure      : callback,
      onException    : callback
    },
    {
      overlay  : overlay,
      callback : getLatiLonCallback,
      gridObj  : args.gridObj,
      recordId : args.recordId,
      rowHash  : args.rowHash,
      type     : args.type
    }
    )
  }catch(e){
  //messageAlert("mapPublic 278",e)
  }
}



/*
 * 在地图上绘制标记,如果存在回调函数则调用
 * @param  rectifyLatLng (object)  回调返回的纠偏经纬度.
 * @param  args          (object)  自传参数.
 */
function getLatiLon(rectifyLatLng,args){
  // showDebugger("getLatiLon in");
  var opts = args.overlay.opts;
  opts._rLat = parseFloat(rectifyLatLng[1]);
  opts._rLng = parseFloat(rectifyLatLng[0]);
  // 设置对应hash中的经纬度以便下一次点击的时候不再向服务器获取
  if (args.rowHash){
    args.rowHash.rlat = opts._rLat;
    args.rowHash.rlng = opts._rLng;
    args.rowHash.mode = false;
    setGridrowBgcolor(args.gridObj,args.recordId,args.rowHash.mode);
  }
  try{
    /*
     * 如果开启追踪功能，则在当前追踪面板或者追踪窗体上绘制轨迹
     */
    // showDebugger("args.callback");
    if (args.callback) args.callback(args.overlay);
    /*
     * 在主界面监控地图上绘制标记
     */
    drawMarker(args.overlay,args.flag);
  }catch(e){
  //Ext.MessageBox.alert("",e);
  }
}

function setGridrowBgcolor(grid,recordId,mode){
  var rowIndex = grid.getStore().indexOfId(recordId);
  var row = grid.getView().getRow(rowIndex);
  var element = Ext.get(row);
  if (eval(mode)){
    element.addClass("grid-unavailability");
  }else{
    element.addClass("grid-availability");
  }
}

function drawMarker(overlay,bCenter,openInfoWindow){
  if (operationObj){
    operationObj.createNoClearMarker(
      '/images/location/centerPoi.gif',
      overlay,
      bCenter,
      openInfoWindow,
      true,
      true,
      overlay.opts._mode
    );
  }
}

function setOptsByrowHash(opts,rowHash){
  opts._tLat = rowHash.lat;
  opts._tLng = rowHash.lng;
  opts._rLat = rowHash.rlat;
  opts._rLng = rowHash.rlng;
  opts._speed = rowHash.speed;
  opts._posTime = rowHash.recvdt;
  opts._angle = rowHash.direct;
  opts._gpsTime = rowHash.gpsdt;
  opts._validate = rowHash.validate;
  opts._status = rowHash.status;
  opts._lac = rowHash.lac;
  opts._cid = rowHash.cid;
}

/*
 * 设置status显示文字.
 * @params (string) status 状态位,8个字节
 * @return string 状态位显示的文字
 */
function setStatus(status){
  status = status.split("-");
  var statusStr = new Array();
  for (var i = 0;i<status.length;i++){
    var temp = setStatusEach(i,status[i]);
    if (temp != ""){
      statusStr.push(temp);
    }
  }
  if (statusStr.length == 1) return statusStr[0];
  if (statusStr.length == 0) return "";
  return statusStr.join(",");
}

/*
 * 设置status每个字节的显示文字
 * @params (int)    bytes  字节位
 * @params (string) status 字节位对应的状态位字符串
 * @return string 每个字节位显示的文字
 */
function setStatusEach(bytes,status){
  var strArr = new Array();
  switch(bytes){
    case 7:
      status = setStatusBitStr(status);
      if (status.substr(4,1) == "1"){
        strArr.push(COMMON_INFO["ignition"]);
      }else{
        strArr.push(COMMON_INFO["flameout"]);
      }
  }
  if (strArr.length == 1) return strArr[0];
  if (strArr.length == 0) return "";
  return strArr.join(",");
}

/*
 * 设置每个字节位的二进制字符串
 * @params (string) status 字节位对应的状态位字符串
 * @return string
 */
function setStatusBitStr(status){
  status = parseInt(status).toString(2);
  var length = 8 - status.length;
  for(var i=0;i<length;i++){
    status = "0" + status;
  }
  return status;
}

/*
 * 设置有效性显示字符串
 * @params (string) vflags
 * @return string
 */
function setVflags(vflags){
  //return COMMON_INFO['unavailability'];
  if(vflags){
    return COMMON_INFO["availability"];
  }else{
    return COMMON_INFO["unavailability"];
  }
}

/*
 * 判断给定变量的值是否为int类型
 * @params (string) oNum
 * @return boolean
 */
function isNumberExt(oNum){
  if(!oNum) return false;
  var strP = /^(0|-?[1-9]\d*(\.\d{1,4})?)$/;
  if(!strP.test(oNum)) return false;
  return true;
}

/**
 * Map Overlay Obj
 */
function MapOverlay(handler, id) {
	this._id = id;
	this._overlayCount = 0;
	this._overlays = {};
	this._handler = handler;
}

MapOverlay.prototype = {
	/*
	 * Set map.
	 * @param {object}     map.
	 */
	setHandler : function(handler) {
		this._handler = handler;
	},

	getHandler : function(handler) {
		return this._handler;
	},

	/*
	 * Return all overlays.
	 */
	getOverlays : function() {
		return this._overlays;
	},
	
	each : function(callback){
		if (callback){
			for (var key in this._overlays){
				callback(key, this._overlays[key], this._overlays[key].opts)
			}
		}
	},
	
	
	/*
	 * Return an overlay.
	 */
	isExistOverlay : function(id){
		if (this._overlays[id.toString()]) {
			return this._overlays[id.toString()];
		}
		return false;
	},

	/**
	 * Add overlay on the map.
	 * @param {int}     id overlay id.
	 * @param {object}  overlay object.
	 * @param {object}  overlayLab object.
	 * @param {hash}    opts overlay options.
	 * @param {boolean} draw draw overlay on the map if true.
	 */
	addOverlay : function(id, overlay, opts, draw, label, useLabel) {
		if (typeof (this._overlays[id]) == "undefined") {
			this._addOverlay(id, overlay, opts, draw, label, useLabel);
		}
		return this._overlays[id];
	},

	/**
	 * Add overlay on the map.
	 * @param {int}     id         overlay id.
	 * @param {object}  overlay    object.
	 * @param {object}  overlayLab overlayLabObj.
	 * @param {hash}    opts       overlay options.
	 * @param {boolean} draw       draw overlay on the map if true.
	 */
	_addOverlay : function(id, overlay, opts, draw, label, useLabel) {
		if (opts){
//			label = (label || ((typeof(opts.rLat) != "undefined" && opts.rLat != null) ? this._handler.createLabel(opts.id, 
//					opts.rLat, opts.rLng, opts.text, 12, 8, 100) : null));
			
			label = (label || ((typeof(opts.rLat) != "undefined" && opts.rLat != null) ? this._handler.createLabel(opts.id, 
					opts.rLat, opts.rLng, this.setText(opts), 12, 8, 100) : null));
			
			// targetInfo.text = targetInfo.text + this.setTargetText(targetInfo);
		}
		if (typeof(useLabel) == "boolean"){
			if (!useLabel){
				label = null
			}
		}else{
			useLabel = true;
		}
		this._overlays[id.toString()] = {
			overlay : overlay,
			overlayLab : label,
			circle : null,
			opts : opts,
			useLabel : useLabel,
			display : draw
		};
		if (draw && this._handler){
			this._handler.addOverlay(this._overlays[id.toString()].overlay);
			if (this._overlays[id.toString()].overlayLab){
				this._handler.addOverlay(this._overlays[id.toString()].overlayLab);
			}
		}
		this._overlayCount++;
		return this._overlays[id.toString()];
	},

	/**
	 * Get overlay.
	 * @param {int}     id overlay id.
	 */
	getOverlay : function(id) {
		return this._overlays[id.toString()];
	},
	
	/**
	 * Get overlay array data
	 */
	getOverlayArrayData : function(nameKey, callback){
		var array = [];
		var overlays = this._overlays;
		for (key in overlays){
			if (callback){
				if (callback(overlays[key].opts)){
					array.push([key, overlays[key].opts[nameKey]]);
				}
			}else{
				array.push([key, overlays[key].opts[nameKey]]);
			}
		}
		return array;
	},
	
	/**
	 * Get overlay count.
	 * @param {void}     
	 */
	getOverlayCount : function() {
		return this._overlayCount;
	},

	

	/**
	 * Remove overlay.
	 * @param {int}     id overlay id.
	 */
	removeOverlay : function(id) {
		if (typeof (this._overlays[id]) != "undefined") {
			if (this._handler){
				if (this._overlays[id].overlay)
					this._handler.removeOverlay(this._overlays[id].overlay);
				if (this._overlays[id].overlayLab) {
					this._handler.removeOverlay(this._overlays[id].overlayLab);
					if (this._overlays[id].overlayLab)
						this._overlays[id].overlayLab.remove();
				}
				if (this._overlays[id].circle)
					this._handler.removeOverlay(this._overlays[id].circle);
				if (this._handler.closeInfoWindow) this._handler.closeInfoWindow();
			}
			delete this._overlays[id];
			if (this._overlayCount > 0)
				this._overlayCount--;
		}
		
	},

	/**
	 * Remove overlays.
	 */
	removeOverlays : function() {
		for ( var id in this._overlays) {
			this.removeOverlay(id);
		}
		this._overlays = {};
		this._overlayCount = 0;
	},

	/*
	 * Show overlay.
	 * @param {int}     id overlay id.
	 */
	showOverlay : function(id) {
		if (typeof (this._overlays[id]) != "undefined") {
			if (!this._overlays[id].display) {
				this._handler.addOverlay(this._overlays[id].overlay);
				if (this._overlays[id].overlayLab){
					this._handler.addOverlay(this._overlays[id].overlayLab);
				}
				this._overlays[id].display = true;
			}
		}
	},

	/*
	 * Show all overlays.
	 */
	showAllOverlay : function() {
		for ( var id in this._overlays) {
			this.showOverlay(id);
		}
	},
	
	/**
	 * Hide overlay.
	 * @param {int}     id overlay id.
	 */
	hideOverlay : function(id) {
		var overlay = this._overlays[id];
		if (typeof (overlay) != "undefined") {
			if (overlay.overlay)
				this._handler.removeOverlay(overlay.overlay);
			if (overlay.overlayLab)
				this._handler.removeOverlay(overlay.overlayLab);
			if (overlay.circle)
				this._handler.removeOverlay(overlay.circle);
			overlay.display = false;
		}
		if (this._handler.closeInfoWindow) this._handler.closeInfoWindow();
	},

	/**
	 * Hide all overlays.
	 */
	hideAllOverlays : function() {
		for ( var id in this._overlays) {
			this.hideOverlay(id);
		}
	},
	
	
	setText : function(opts){
		if (opts.overlayType != "marker"){
			var txt = (opts.text || opts.name);
//			if(opts.online == true)
//			{
//				txt += "["+opts.depName+"],"+ opts.speed+"km/h";
//			}else
//				txt += "["+opts.depName+"],离线,离线时间:"+opts.sendTime;
			return txt;//(opts.text || opts.name) + this._handler.OperatorObj.setTargetText(opts);
		}else{
			return (opts.text || opts.name);
		}
		
	},
	
	/*
	 * Update overlay
	 */
	updateOverlay : function(id, opts) {
		var overlay = this._overlays[id];
		if (overlay) {
			overlay.opts = opts;
			this.updateOverlayLab(overlay);
			this.updateOverlayMarker(overlay);
		}
		if (this._handler.closeInfoWindow) this._handler.closeInfoWindow(overlay.overlay);
		return overlay;
	},

	/*
	 * Update overlayLab
	 */
	updateOverlayLab : function(overlay) {
		if (typeof (overlay) == "string") {
			overlay = this._overlays[overlay];
		}
		if (overlay) {
			if (overlay.overlayLab) {
				if (overlay.opts.rLat){
					this._handler.labelSetPosition(overlay.overlayLab, overlay.opts.rLat, overlay.opts.rLng)
					
				}
				this._handler.changeLabelText(overlay.overlayLab, this.setText(overlay.opts), overlay.overlay)
				
			} else {
				if (overlay.useLabel){
					if (overlay.opts.rLat){
						this._handler.createLabel(overlay.opts.id, overlay.opts.rLat, overlay.opts.rLng, this.setText(overlay.opts), 12, 8, 100);
						this._handler.addOverlay(overlay.overlayLab);
					}
					
				}
			}
		}
	},

	/*
	 * Update overlayLab
	 */
	updateOverlayMarker : function(overlay) {
		if (typeof (overlay) == "string") {
			overlay = this._overlays[overlay];
		}
		if (overlay) {
			if (overlay.opts.rLat){
				this._handler.markerSetPosition(overlay.overlay, overlay.opts.rLat, overlay.opts.rLng);
			}
		}
	}
};

/**
 * Converts 'thin', 'medium', and 'thick' to pixel widths
 * in an MSIE environment. Not called for other browsers
 * because getComputedStyle() returns pixel widths automatically.
 * @param {String} widthValue
 */


var toPixels = function(widthValue) {
	var px;
	switch (widthValue) {
	case "thin":
		px = "2px";
		break;
	case "medium":
		px = "4px";
		break;
	case "thick":
		px = "6px";
		break;
	default:
		px = widthValue;
	}
	return px;
};
/**
 * Get the widths of the borders of an HTML element.
 * @param {Object} h  HTML element
 * @return {Object} widths object (top, bottom left, right)
 */
var getBorderWidths = function(h) {
	var computedStyle;
	var bw = {};
	if (document.defaultView && document.defaultView.getComputedStyle) {
		computedStyle = h.ownerDocument.defaultView.getComputedStyle(h, "");
		if (computedStyle) {
			// The computed styles are always in pixel units (good!)
			bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
			bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
			bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
			bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
			return bw;
		}
	} else if (document.documentElement.currentStyle) { // MSIE
		if (h.currentStyle) {
			// The current styles may not be in pixel units so try to convert (bad!)
			bw.top = parseInt(toPixels(h.currentStyle.borderTopWidth), 10) || 0;
			bw.bottom = parseInt(toPixels(h.currentStyle.borderBottomWidth), 10) || 0;
			bw.left = parseInt(toPixels(h.currentStyle.borderLeftWidth), 10) || 0;
			bw.right = parseInt(toPixels(h.currentStyle.borderRightWidth), 10) || 0;
			return bw;
		}
	}
	// Shouldn't get this far for any modern browser
	bw.top = parseInt(h.style["border-top-width"], 10) || 0;
	bw.bottom = parseInt(h.style["border-bottom-width"], 10) || 0;
	bw.left = parseInt(h.style["border-left-width"], 10) || 0;
	bw.right = parseInt(h.style["border-right-width"], 10) || 0;
	return bw;
};

/**
 * Get the position of the mouse relative to the document.
 * @param {Object} e  Mouse event
 * @return {Object} left & top position
 */
var getMousePosition = function(e) {
	var posX = 0, posY = 0;
	e = e || window.event;
	if (typeof e.pageX !== "undefined") {
		posX = e.pageX;
		posY = e.pageY;
	} else if (typeof e.clientX !== "undefined") {
		posX = e.clientX
				+ (typeof document.documentElement.scrollLeft !== "undefined" ? document.documentElement.scrollLeft
						: document.body.scrollLeft);
		posY = e.clientY
				+ (typeof document.documentElement.scrollTop !== "undefined" ? document.documentElement.scrollTop
						: document.body.scrollTop);
	}
	return {
		left : posX,
		top : posY
	};
};

/**
 * Get the position of an HTML element relative to the document.
 * @param {Object} h  HTML element
 * @return {Object} left & top position
 */
var getElementPosition = function(h) {
	var posX = h.offsetLeft;
	var posY = h.offsetTop;
	var parent = h.offsetParent;
	// Add offsets for all ancestors in the hierarchy
	while (parent !== null) {
		// Adjust for scrolling elements which may affect the map position.
		//
		// See http://www.howtocreate.co.uk/tutorials/javascript/browserspecific
		//
		// "...make sure that every element [on a Web page] with an overflow
		// of anything other than visible also has a position style set to
		// something other than the default static..."
		if (parent !== document.body && parent !== document.documentElement) {
			posX -= parent.scrollLeft;
			posY -= parent.scrollTop;
		}
		posX += parent.offsetLeft;
		posY += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		left : posX,
		top : posY
	};
};
/**
 * Set the properties of an object to those from another object.
 * @param {Object} obj target object
 * @param {Object} vals source object
 */
var setVals = function(obj, vals) {
	if (obj && vals) {
		for ( var x in vals) {
			if (vals.hasOwnProperty(x)) {
				obj[x] = vals[x];
			}
		}
	}
	return obj;
};
/**
 * Set the opacity. If op is not passed in, this function just performs an MSIE fix.
 * @param {Node} div
 * @param {Number} op (0-1)
 */
var setOpacity = function(div, op) {
	if (typeof op !== "undefined") {
		div.style.opacity = op;
	}
	if (typeof div.style.opacity !== "undefined") {
		div.style.filter = "alpha(opacity=" + (div.style.opacity * 100) + ")";
	}
};

