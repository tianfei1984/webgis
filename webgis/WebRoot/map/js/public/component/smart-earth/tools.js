function AbstractControl(id){
	this._id = id;
	this._flag = false;
	this._bindhandler = null;
}

LTHand.prototype = {
	btnClick : function(){
		if (!this._flag){
			this._flag = true;
		}else{
			this._flag = false;
		}
	}
}

function LTHand(id){
	this._id = id;
	this._flag = false;
}

LTHand.prototype = {
	btnClick : function(){
		if (!this._flag){
			this._flag = true;
		}else{
			this._flag = false;
		}
	}
}

function LTMarkControl(id, handler){
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._clickHandler = null;
	this._dragHandler = null;
	this._currentMarker = null;
	this._overlays = {};
	this._window = null;
	this._extObj = null;
	if (typeof(SE) != "undefined"){
		this._extObj = new SE.MarkTool(this._handler._oMap);
	}
}

LTMarkControl.prototype = {
	btnClick : function(){
		if (!this._flag){
			if (this._extObj){
				var handler = this._handler;
				this._flag = true;
				this._clickHandler = handler.eventBindObject(this._extObj, "mouseup", this._handler._oMap, function(point){
					if (handler._drawPointEnd) handler._drawPointEnd(handler.pointToString([point]), point);
				});
				this._extObj.open();
			}
		}else{
			this._flag = false;
			this._handler.removeListener(this._clickHandler);
			this._extObj.close();
		}
	}
}


function LTMarkerExtControl(id, handler){
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._clickHandler = null;
	this._dragHandler = null;
	this._currentMarker = null;
	this._overlays = {};
	this._window = null;
	this._defaultTitle = Map.locale.tool.markerExt.createNew;
	this._defaultCookieName = this._id + "LTMarkerExtControl"; 
	this._defaultDataItemsSeperator = Map.locale.tool.markerExt.defaultDataItemsSeperator;
	this._defaultDataSeperator = Map.locale.tool.markerExt.defaultDataSeperator;
	this._dragFlag = false;
	this._extObj = null;
	if (typeof(SE) != "undefined"){
		this._extObj = new SE.MarkTool(this._handler._oMap);
	}
}

LTMarkerExtControl.prototype = {
	initialize : function(){
		var ltMarkerExtControl = this;
		ltMarkerExtControl._cookieDataToOverlays();
	},
		
	btnClick : function(){
		if (!this._flag){
			this.createMarker();
			this._flag = true;
		}else{
			this.endCreateMarker();
			this._flag = false;
		}
	},
	
	createMarker : function(){
		var ltMarkerExtControl = this;
		
		try{
			this._handler._oMap.setMapCursor("Crosshair", "pointer");
			this._clickHandler = this._handler.eventBind(this._handler._oMap, "mouseup", function(point){
				if (!ltMarkerExtControl._dragFlag){
					if (ltMarkerExtControl._window) ltMarkerExtControl._handler.removeOverlay(ltMarkerExtControl._window);
					var latLng = ltMarkerExtControl._handler.getLatLngArrayFromPointObject(ltMarkerExtControl._handler.pointToObject(point));
					
					ltMarkerExtControl._window = ltMarkerExtControl._handler.createInfoWindowObj(
						latLng[0], 
						latLng[1], 
						ltMarkerExtControl._defaultTitle, 
						ltMarkerExtControl.createMarkerHTML(latLng)
					)
					ltMarkerExtControl._handler.addOverlay(ltMarkerExtControl._window);
				}else{
					ltMarkerExtControl._dragFlag = false;
				}
			});
			
			this._dragHandler = this._handler.eventBind(this._handler._oMap, "moveend" ,function(point, button){
				ltMarkerExtControl._dragFlag = true;
			});
			
		}catch(e){
		}
	},
	
	createMarkerHTML : function(latLng){
		var ltMarkerExtControl = this;
		var divMain = document.createElement("div");
		// table
		var tableDiv = document.createElement("div");
		var table = document.createElement("table");
		table.border = 0;
		table.style.width = "300px";
		table.style.fontSize = "13px";
		
		var tr3 = document.createElement("tr");
		var td31 = document.createElement("td");
		var td32 = document.createElement("td");
		td31.innerHTML = Map.locale.tool.markerExt.lnglat;
		td31.style.textAlign = "right";
		td32.innerHTML = latLng.join(",");
		tr3.appendChild(td31);
		tr3.appendChild(td32);
		
		var tr1 = document.createElement("tr");
		var td11 = document.createElement("td");
		var td12 = document.createElement("td");
		td11.innerHTML = Map.locale.tool.markerExt.poiname;
		td11.style.textAlign = "right";
		td11.style.width = "80px";
		var nameInput = document.createElement("input");
		nameInput.type = "text";
		td12.appendChild(nameInput);
		tr1.appendChild(td11);
		tr1.appendChild(td12);
		
		var tr2 = document.createElement("tr");
		var td21 = document.createElement("td");
		var td22 = document.createElement("td");
		td21.vAlign = "top"
		td21.innerHTML = Map.locale.tool.markerExt.remark;
		td21.style.textAlign = "right";
		var textarea = document.createElement("textarea");
		textarea.rows = 4;
		td22.appendChild(textarea);
		tr2.appendChild(td21);
		tr2.appendChild(td22);
		if (document.all){
			var tbody = document.createElement("tbody");
			tbody.appendChild(tr3);
			tbody.appendChild(tr1);
			tbody.appendChild(tr2);
			table.appendChild(tbody);
		}else{
			table.appendChild(tr3);
			table.appendChild(tr1);
			table.appendChild(tr2);
		}
		tableDiv.appendChild(table);
		// button 
		var buttonDiv = document.createElement("div");
		var saveBtn = document.createElement("input");
		var cancelBtn = document.createElement("input");
		saveBtn.type = "button";
		saveBtn.size = 5;
		saveBtn.value = Map.locale.tool.markerExt.save;
		saveBtn.onclick = function(){
			if (nameInput.value != ""){
				if (confirm(Map.locale.tool.markerExt.isSave)){
					ltMarkerExtControl.saveMarker(latLng, nameInput.value, textarea.value);
				}
			}else{
				alert(Map.locale.tool.markerExt.enterName);
			}
		}
		cancelBtn.type = "button";
		cancelBtn.value = Map.locale.tool.markerExt.cancel;
		cancelBtn.onclick = function(){
			if (ltMarkerExtControl._window) ltMarkerExtControl._window.closeInfoWindow();
		}
		buttonDiv.appendChild(saveBtn);
		buttonDiv.appendChild(cancelBtn);
		
		
		divMain.appendChild(tableDiv);
		divMain.appendChild(buttonDiv);
		return divMain;
	},
	
	saveMarker : function(latLng, title, describtion){
		try{
			var ltMarkerExtControl = this;
			var id = new Date().getTime();
			if (!this._overlays[id]){
				ltMarkerExtControl._createOverlay(id, latLng[0], latLng[1], title, describtion);
				ltMarkerExtControl.saveCookie(id, latLng, title, describtion);
			}
		}catch(e){
		}
	},
	
	createOverlaysData : function(id, latLng, title, describtion, marker, label){
		return {
			id          : id,
			latLng      : latLng,
			describtion : describtion,
			title       : title,
			marker      : marker,
			label       : label
		}
	},
	
	deleteMarker : function(id){
		var ltMarkerExtControl = this;
		var overlay = ltMarkerExtControl._overlays[id];
		ltMarkerExtControl._handler.closeInfoWindow(overlay.marker);
		ltMarkerExtControl._handler.removeOverlay(overlay.marker);
		ltMarkerExtControl._handler.removeOverlay(overlay.label);
		ltMarkerExtControl.deleteMarkerFromCookie(overlay);
		delete ltMarkerExtControl._overlays[id];
	},
	
	saveCookie : function(id, latLng, title, describtion){
		var ltMarkerExtControl = this;
		var cookieValue = ltMarkerExtControl._createCookieData(id, latLng[0], latLng[1], title, describtion);
		var value = ltMarkerExtControl.getCookieValue();
		if (value){
			cookieValue = value + ltMarkerExtControl._defaultDataSeperator + cookieValue;
		}
		ltMarkerExtControl.setCookieValue(cookieValue);
	},
	
	deleteMarkerFromCookie : function(overlay){
		var ltMarkerExtControl = this;
		var cookieValue = ltMarkerExtControl.getCookieValue();
		if (cookieValue){
			var markerCookie = this._createCookieData(overlay.id, overlay.latLng[0], overlay.latLng[1], overlay.title, overlay.describtion);
			if (cookieValue.indexOf(markerCookie) != -1){
				if (cookieValue.indexOf(this._defaultDataSeperator + markerCookie) != -1){
					cookieValue = cookieValue.replace(new RegExp(this._defaultDataSeperator + markerCookie), "");
				}else if (cookieValue.indexOf(markerCookie + this._defaultDataSeperator) != -1){
					cookieValue = cookieValue.replace(new RegExp(markerCookie + this._defaultDataSeperator), "");
				}else{
					cookieValue = cookieValue.replace(new RegExp(markerCookie), "");
				}
				ltMarkerExtControl.setCookieValue(cookieValue);
			}
		}
	},
	
	_createCookieData : function(id, lat, Lng, title, describtion){
		return [id, lat, Lng, title || "", describtion || ""].join(this._defaultDataItemsSeperator);
	}, 
	
	_cookieDataToOverlays : function(cookieValue){
		try{
			var ltMarkerExtControl = this;
			var cookieValue = ltMarkerExtControl.getCookieValue();
			if (cookieValue){
				var data = cookieValue.split(ltMarkerExtControl._defaultDataSeperator);
				for (var i=0;i<data.length;i++){
					var dataItem = data[i].split(ltMarkerExtControl._defaultDataItemsSeperator);
					var id = dataItem[0];
					var lat = dataItem[1];
					var Lng = dataItem[2];
					var title = dataItem[3];
					var describtion = dataItem[4];
					ltMarkerExtControl._createOverlay(id, lat, Lng, title, describtion);
				}
			}
		}catch(e){
		}
	},
	
	_createOverlay : function(id, lat, lng, title, describtion){
		var ltMarkerExtControl = this;
		var marker = ltMarkerExtControl._createMarkerOverlay(id, lat, lng, title, describtion);
		ltMarkerExtControl._handler.addOverlay(marker);
		var label = ltMarkerExtControl._createLabelOverlay(id, lat, lng, title);
		ltMarkerExtControl._handler.addOverlay(label);
		
		ltMarkerExtControl._overlays[id] = ltMarkerExtControl.createOverlaysData(id, [lat, lng], title, describtion, marker, label);
	},
	
	_createMarkerOverlay : function(id, lat, lng, title, describtion){
		var ltMarkerExtControl = this;
		var marker = ltMarkerExtControl._handler.createMarker(ltMarkerExtControl._handler.createPoint(lat, lng));
		var div = document.createElement("div");
		div.style.width = "100%";
		var divDescribtion = document.createElement("div");
		divDescribtion.style.width = "100%";
		divDescribtion.innerHTML = describtion || "";
		divDescribtion.style.margin = "2px";
		divDescribtion.style.textAlign = "left";
		
		var deleteDiv = document.createElement("div");
		deleteDiv.style.width = "100%";
		deleteDiv.style.margin = "2px";
		deleteDiv.style.textAlign = "right";
		// deleteDiv.style.border = "red 1px solid"
		var a = document.createElement("a");
		a.innerHTML = Map.locale.tool.markerExt.del;
		a.href = "javascript://";
		
		a.onclick = function(id){
			return function(){
				if (confirm(Map.locale.tool.markerExt.isDel)){
					ltMarkerExtControl.deleteMarker(id);
				}
			}
		}(id)
		
		deleteDiv.appendChild(a);
		div.appendChild(divDescribtion);
		div.appendChild(deleteDiv);
		ltMarkerExtControl._handler.removeOverlay(ltMarkerExtControl._window);
		ltMarkerExtControl._handler.bindClickEvent(marker, div, function(div){return div;}, false);
		return marker;
	},
	
	_createLabelOverlay : function(id, lat, lng, title){
		return this._handler.createLabel(id, lat, lng, title, 18, -10, 100);
	},
	
	endCreateMarker : function(){
		if (this._clickHandler){
			this._handler.removeListener(this._clickHandler);
		}
		
		if (this._dragHandler){
			this._handler.removeListener(this._dragHandler);
		}
		
		if (this._window){
			this._handler.removeOverlay(this._window);
		}
		this._handler._oMap.setMapCursor("default","move");
	},
	
	setCookieValue : function(cookieValue){
		var ltMarkerExtControl = this;
		setCookie(ltMarkerExtControl._defaultCookieName, cookieValue);
	},
	
	getCookieValue : function(){
		var ltMarkerExtControl = this;
		return getCookie(ltMarkerExtControl._defaultCookieName);
	}
}


function LTFullSreen(id){
	this._id = id;
	this._flag = false;
}

LTFullSreen.prototype = {
	btnClick : function(){
		if (!this._flag){
			this._flag = true;
			this.full();
		}else{
			this._flag = false;
			this.full();
		}
	}, 
	
	full : function(){
		var frame;
		var mainframe = window.parent.window.top;
		// Left frame colsable
		
		if (typeof(mainframe.frames["topFrame"].expandOnclick) != "undefined"){
			mainframe.frames["topFrame"].expandOnclick();
		}
		
		if (typeof(mainframe.frames["midFrame"].expandOnclick) != "undefined"){
			mainframe.frames["midFrame"].expandOnclick(this._flag);
		}
		/**
		var iFrame = window.parent.document.getElementById("googleMapIframe");
		// alert(typeof(iFrame));
		var body = iFrame.parentNode.parentNode;
		if (iFrame){
			iFrame.parentNode.removeChild(iFrame);
			
			iFrame.style.position = "absolute";
			// iFrame.style.marginRight = "3px";
			iFrame.style.left = "4px";
			iFrame.style.top = "5px";
			iFrame.style.zIndex = 100000;
			iFrame.style.width = (parseInt(body.style.width) - 5) + "px";
			iFrame.style.height = "100%";
			body.appendChild(iFrame);
			
		}**/
	},
	
	reduce : function(){
		
	}
}


function LTPrint(id, handler, closeHandler){
	this._id = id;
	this._handler = handler;
	this._print = false;
	this._closeHandler = closeHandler;
	this._svgContaierObjectId = "lt_overlaysDiv";
}

LTPrint.prototype = {
	btnClick : function(map){
		if (!this._print){
			this.print();
			this._print = true;
		}else{
			this._print = false;
		}
	},
	
	setCloseHandler : function(closeHandler){
		this._closeHandler = closeHandler;
	},
	
	
	
	print : function(){
		try{
			var print = this;
			var html = "";
			html += (document.all) ? "<html xmlns:v=\"urn:schemeas-microsoft-com:vml\">" : "<html>";
			html += "\n<head>\n\n<title>Print Maps<\/title>\n";
			html += "<style type=\"text\/css\">\nbody {margin: 0px;}\n";
			html += (document.all)?"v\\:*{ Behavior:url(#default#VML);}":"";

			html += "\n</style>\n";
			html += "<\/head>\n";
			html += "<body>\n";
			
			if (document.all){
				html += print._handler._oMap.getMapContent(0);
			}
			
			html += "\n<\/body>\n<\/html>";
			var win = window.open(
					"about:blank",
					"win",
					"menubar=1,width="+(this._handler._oMap.container.offsetWidth)+",height="+(this._handler._oMap.container.offsetHeight));
			
		}catch(e){
		}
		
		setTimeout(function(){
			win.document.writeln(html);

			if (window.parent){
				var titleArea = window.parent.document.getElementById("title-area");
				if (titleArea){
					var tempTitleArea = titleArea.cloneNode(true);
					if (document.all){
						var divHTML = "<div align='center' style='background-color:white; border:3px solid rgb(180, 201, 198); position:absolute; left:80px; top:21px; height:20px; z-index:1000; padding:5 10 5 10; font-size:15px; font-weight:bold;'>" + 
						tempTitleArea.innerHTML + 
						"</div>";
						win.document.body.innerHTML += divHTML;
					}else{
						win.document.body.appendChild(tempTitleArea);
					} 
				}
			}
			
			if (!document.all){
				var div = document.createElement("div");
				div.innerHTML = print._handler._oMap.getMapContent(0);
				var cloneDiv = document.createElement("div");
				cloneDiv = div.cloneNode(true);
				win.document.body.appendChild(cloneDiv);
				
				var svgs = win.document.getElementsByTagName("svg");
				for (var i=0;i<svgs.length;i++){
					var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
					var path = document.createElementNS("http://www.w3.org/2000/svg","path");
					path.setAttribute("d",svgs[i].firstChild.getAttribute("d"));
					path.setAttribute("fill-opacity",svgs[i].firstChild.getAttribute("fill-opacity"));
					path.setAttribute("stroke-opacity",svgs[i].firstChild.getAttribute("stroke-opacity"));
					path.setAttribute("stroke-dasharray",svgs[i].firstChild.getAttribute("stroke-dasharray"));
					path.setAttribute("stroke-linejoin",svgs[i].firstChild.getAttribute("stroke-linejoin"));
					path.setAttribute("stroke-linecap",svgs[i].firstChild.getAttribute("stroke-linecap"));
					path.setAttribute("stroke-width",svgs[i].firstChild.getAttribute("stroke-width"));
					path.setAttribute("fill",svgs[i].firstChild.getAttribute("fill"));
					path.setAttribute("stroke",svgs[i].firstChild.getAttribute("stroke"));
					svg.appendChild(path);
					
					var parentNode = svgs[i].parentNode;
					parentNode.innerHTML = "";
					parentNode.appendChild(svg);
				}
			}
			if (document.all){
				win.onbeforeunload = function(){
					if (print._closeHandler) print._closeHandler(print);
				}
			}else{
				win.onunload = function(){
					if (print._closeHandler) print._closeHandler(print);
				}
			}
			win.moveTo(0,0);
			win.print();
			win.document.close();	
			win.close();
		},1000)
		
		// win.document.writeln(html);
		// win.moveTo(0,0);
		// win.print();
		// win.document.close();	
		// win.close();
	}
}



function LTCityLocation(id, handler){
	this._flag = false;
	this._dom = document.createElement("iframe");
	this._dom.style.zIndex = 65537;
	this._dom.style.position = "absolute";
	this._dom.style.width = "320px";
	this._dom.style.height = "350px";
	this._dom.style.border = "2px red solid";
	this._dom.style.display = "none";
	// document.body.appendChild(this._dom);
	this._handler = handler;
	var cityLocation = new CityLocation(id, window.placeData, handler);
	cityLocation.setSearchHandler(handler.createSearchControl(cityLocation));
	cityLocation.initExt();
	this._extObj = cityLocation;
}

LTCityLocation.prototype = {
	btnClick : function(element, top, right){
		if (!this._showFlag){
			this.show(top, right);
		}else{
			this.hide();
			this._extObj.btnClick();
		}
	}, 
	
	show : function(top, right){
		this._flag = true;
		if (typeof(getOffsetXY) != "undefined"){
			this.setTop(top);
			this.setRight(right);
			this._extObj.btnClick(document.body, top, right);
		}
	},
	
	hide : function(){
		this._flag = false;
		this._dom.style.display = "none";
	},
	
	setTop : function(top){
		this._dom.style.top = top + "px";
	},
	
	setRight : function(right){
		this._dom.style.right = right + "px";
	}
}

function LTPolyLineControl(id, handler, type){
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._type = type || "polyline";
	this._extObj = null;
	this._bindHandler = null;
	this._prePolyline = null;
	if (typeof(SE) != "undefined"){
		var args = null;
		if (this._type == "polyline") args = {showLabel : false};
		this._extObj = new SE.PolyLineTool(this._handler._oMap, args);
	}
}

LTPolyLineControl.prototype = {
	btnClick : function() {
		try{
			var co = this;
			var handler = this._handler;
			if (!this._flag) {
				this._flag = true;
				if (this._extObj){
					switch(this._type){
					case "polyline":
						this._bindHandler = handler.eventBindObject(this._extObj, "draw", handler._oMap, function(points, length, polyline){
							if (handler._drawPolylineEnd){
								co._prePolyline = polyline;
								handler._drawPolylineEnd(
									handler.pointToString(points), handler.formatPointsToArray(points), length, polyline, co);
								co.clearShutButton();
							}
						});
						break;
					}
					this._extObj.open();
				}
			} else {
				handler.removeListener(this._bindHandler);
				
				if (this._extObj){
					this._extObj.close();
				}
				this._flag = false;
			}
		}catch(e){
		}
	},
	
	clearPrevious : function(){
		var co = this;
		if (co._prePolyline != null){
			co._handler.removeOverlay(co._prePolyline);
		}
		co.clearShutButton();
		
	},
	
	clearShutButton : function(){
		var imgs = document.getElementsByTagName("img");
		for (var i=0;i<imgs.length;i++){
			if (imgs[i].src.indexOf("ctrls.gif") != -1){
				var topNode = imgs[i].parentNode.parentNode.parentNode;
				topNode.removeChild(imgs[i].parentNode.parentNode);
			}
		}
	}
}

function LTRectControl(id, handler, type) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._overlayIds = new Array();
	this._type = type || "rect";
	this._preOverlayId = null;
	this._extObj = null;
	this._bindHandler = null;
	if (typeof(SE) != "undefined"){
		var map = this._handler._oMap;
		switch(this._type){
		case "rect":
			this._extObj = new SE.RectTool(map);break;
		case "zoomIn":
			this._extObj = new SE.ZoomInTool(map);break;
		case "zoomOut":	
			this._extObj = new SE.ZoomInTool(map, {zoomAdd:-1});break;
		}
	}
}

LTRectControl.prototype = {
	btnClick : function() {
		try{
			var ltRectControl = this;
			var handler = ltRectControl._handler;
			if (!this._flag) {
				this._flag = true;
				if (this._extObj){
					switch(this._type){
					case "rect":
						this._bindHandler = handler.eventBindObject(this._extObj, "draw", handler._oMap, function(bounds, rect){
							var xy = handler.getBoundsMiniMax(bounds);
							var Xmin = xy.xMin;
							var Ymin = xy.yMin;
							var Xmax = xy.xMax;
							var Ymax = xy.yMax;
							var points = [
								handler.createPoint(parseFloat(Ymax / handler._defaultLatLngDiff), parseFloat(Xmin / handler._defaultLatLngDiff)), 
								handler.createPoint(parseFloat(Ymax / handler._defaultLatLngDiff), parseFloat(Xmax / handler._defaultLatLngDiff)), 
								handler.createPoint(parseFloat(Ymin / handler._defaultLatLngDiff), parseFloat(Xmax / handler._defaultLatLngDiff)), 
								handler.createPoint(parseFloat(Ymin / handler._defaultLatLngDiff), parseFloat(Xmin / handler._defaultLatLngDiff))
							]
							var str = handler.pointToString(points, true);
							
							if (handler._drawRectEnd) {
								handler._drawRectEnd(str, bounds, rect, points, 2);
								ltRectControl.clearShutButton();
							}
						});
						break;
					}
					this._extObj.open();
				}
			} else {
				if (this._extObj){
					this._extObj.close();
				}
				this._flag = false;
				if (this._bindHandler) handler.removeListener(this._bindHandler);
			}
		}catch(e){
		}
		
	},
		
	clearShutButton : function(){
		var imgs = document.getElementsByTagName("img");
		for (var i=0;i<imgs.length;i++){
			if (imgs[i].src.indexOf("ctrls.gif") != -1){
				var topNode = imgs[i].parentNode.parentNode.parentNode;
				topNode.removeChild(imgs[i].parentNode.parentNode);
			}
		}
	}
}

function LTRectQueryControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._overlayIds = new Array();
	this._preOverlayId = null;
	this._extObj = null;
	this._bindHandler = null;
	if (typeof(SE) != "undefined"){
		var map = this._handler._oMap;
		this._extObj = new SE.RectTool(map);
	}
}

LTRectQueryControl.prototype = {
	btnClick : function() {
		try{
			var ltRectControl = this;
			var handler = ltRectControl._handler;
			if (!this._flag) {
				this._flag = true;
				if (this._extObj){
					
					this._bindHandler = handler.eventBindObject(this._extObj, "draw", handler._oMap, function(bounds, rect){
						var xy = handler.getBoundsMiniMax(bounds);
						var Xmin = xy.xMin;
						var Ymin = xy.yMin;
						var Xmax = xy.xMax;
						var Ymax = xy.yMax;
						var points = [
							handler.createPoint(parseFloat(Ymax / handler._defaultLatLngDiff), parseFloat(Xmin / handler._defaultLatLngDiff)), 
							handler.createPoint(parseFloat(Ymax / handler._defaultLatLngDiff), parseFloat(Xmax / handler._defaultLatLngDiff)), 
							handler.createPoint(parseFloat(Ymin / handler._defaultLatLngDiff), parseFloat(Xmax / handler._defaultLatLngDiff)), 
							handler.createPoint(parseFloat(Ymin / handler._defaultLatLngDiff), parseFloat(Xmin / handler._defaultLatLngDiff))
						]
						var str = handler.pointToString(points, true);
						
						if (window.parent.Srims) {
							window.parent.Srims.command.areaComponents.tool.rect.handler.areaQueryHandler(
								str, bounds, rect, points, 2, [
								{lat : parseFloat(Ymax / handler._defaultLatLngDiff), lon : parseFloat(Xmin / handler._defaultLatLngDiff)}, 
								{lat : parseFloat(Ymin / handler._defaultLatLngDiff), lon : parseFloat(Xmax / handler._defaultLatLngDiff)}]
							);
						}
						//调用画图的回调函数
						if (handler._drawRectQueryEnd){
						     handler._drawRectQueryEnd(str, bounds, rect, points, 2);
						}
						ltRectControl.clearShutButton();
					});
					this._extObj.open();
				}
			} else {
				handler.removeListener(this._bindHandler);
				
				if (this._extObj){
					this._extObj.close();
				}
				this._flag = false;
			}
		}catch(e){
		}
		
	},		
	
	clearShutButton : function(){
		var imgs = document.getElementsByTagName("img");
		for (var i=0;i<imgs.length;i++){
			if (imgs[i].src.indexOf("ctrls.gif") != -1){
				var topNode = imgs[i].parentNode.parentNode.parentNode;
				topNode.removeChild(imgs[i].parentNode.parentNode);
			}
		}
	}
}



function LTCircleControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._overlayIds = new Array();
	this._type = id;
	this._preOverlayId = null;
	this._extObj = null;
	this._bindHandler = null;
	if (typeof(SE) != "undefined"){
		this._extObj = new SE.CircleTool(this._handler._oMap);
	}
}

LTCircleControl.prototype = {
	btnClick : function() {
		try{
			var ltCircleControl = this;
			var handler = ltCircleControl._handler;
			if (!this._flag) {
				this._flag = true;
				if (this._extObj){
					
					this._bindHandler = handler.eventBindObject(this._extObj, "drawend", handler._oMap, function(c){
						var ccenter = c.getCenter();  
		                var radius = c.getRadius();
		                //var pt = handler.getPointLat(ccenter);
		                var points = handler.convertCirleToRect(
		                	handler.getPointLat(ccenter), handler.getPointLng(ccenter), radius);
		                
						if (handler._drawCircleEnd){
							handler._drawCircleEnd(
								handler.pointToString([ccenter]), radius, 
								c, 
								points, 
								1
							);
							
						}
					});
					this._extObj.open();
				}
			} else {
				handler.removeListener(this._bindHandler);
				
				if (this._extObj){
					this._extObj.close();
				}
				this._flag = false;
			}
		}catch(e){
		}
	},
		
	clearShutButton : function(){
		var imgs = document.getElementsByTagName("img");
		for (var i=0;i<imgs.length;i++){
			if (imgs[i].src.indexOf("ctrls.gif") != -1){
				var topNode = imgs[i].parentNode.parentNode.parentNode;
				topNode.removeChild(imgs[i].parentNode.parentNode);
			}
		}
	}
}

function LTPolygonControl(id, handler, type){
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._overlayIds = new Array();
	this._type = type || "polygon";
	this._preOverlayId = null;
	this._extObj = null;
	this._bindHandler = null;
	if (typeof(SE) != "undefined"){
		var args = null;
		if (this._type == "polygon") args = {showLabel : false};
		this._extObj = new SE.PolygonTool(this._handler._oMap, args);
	}
}

LTPolygonControl.prototype = {
	btnClick : function() {
		try{
			var co = this;
			var handler = this._handler;
			if (!this._flag) {
				this._flag = true;
				if (this._extObj){
					switch(this._type){
					case "polygon":
						this._bindHandler = handler.eventBindObject(this._extObj, "draw", handler._oMap, function(points, area, polygon){
							if (handler._drawPolygonEnd){
								handler._drawPolygonEnd(handler.pointToString(points, true), null, polygon, points, 3);
								co.clearShutButton();
							}
						});
						break;
					}
					this._extObj.open();
				}
			} else {
				handler.removeListener(this._bindHandler);
				
				if (this._extObj){
					this._extObj.close();
				}
				this._flag = false;
			}
		}catch(e){
		}
	},
		
	clearShutButton : function(){
		var imgs = document.getElementsByTagName("img");
		for (var i=0;i<imgs.length;i++){
			if (imgs[i].src.indexOf("ctrls.gif") != -1){
				var topNode = imgs[i].parentNode.parentNode.parentNode;
				topNode.removeChild(imgs[i].parentNode.parentNode);
			}
		}
	}
}

function LTConfigCenter(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
}

LTConfigCenter.prototype = {
	btnClick : function() {
		this._handler.configCenterPoint();
	}
}


function LTUseCenter(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
}

LTUseCenter.prototype = {
	btnClick : function() {
		this._handler.useCenterPointConfig();
	}
}


function LTKeyPointControl(id, handler){
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this._clickHandler = null;
	this._dragHandler = null;
	this._currentMarker = null;
	this._overlays = {};
	this._window = null;
	this._extObj = null;
	
	if (typeof(SE) != "undefined"){
		this._extObj = new SE.MarkTool(this._handler._oMap);
	}
}

LTKeyPointControl.prototype = {
	btnClick : function(){
		if (!this._flag){
			if (this._handler._oMap){
				var handler = this._handler;
				this._flag = true;
				var keyPoint = true;
				this._clickHandler = handler.eventBindObject(this._extObj, "mouseup", this._handler._oMap, function(point){
					if (handler._drawPointEnd) handler._drawPointEnd(handler.pointToString([point]), point, keyPoint);
				});
				this._extObj.open();
			}
		}else{
			this._flag = false;
			this._handler.removeListener(this._clickHandler);
			this._extObj.close();
		}
	}
}


function LTClearControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
}

LTClearControl.prototype = {
	btnClick : function() {
		if (OperatorObj){
			OperatorObj.clearStorage();
			OperatorObj.clearMarkerOverlay();
			try{
				var command = window.parent.Srims.command;
				if (command){
					if(command.areaComponents)command.areaComponents.tool.rect.handler.hideAllOverlay();
					if(command.lineComponents)command.lineComponents.handler.hideAllOverlay();
				}
			}catch(e){
				
			}
		}
	}
}

function LTTargetMapControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
}

LTTargetMapControl.prototype = {
	btnClick : function() {
		var srims = window.parent.Srims;
		if (window.parent.Srims){
			try{
				srims.createLoadMask(srims.LOCALE.TRACKING.COMMAND.RESULT["-1"]);
				srims.CommandService.sendCommand("fetchNewGpsDataExt",{carIds : srims.tree.getIds(), whitoutGrid : true});
			}catch(e){
				
			}
		}
	}
}
