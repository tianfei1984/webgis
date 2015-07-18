function LTPolygonQueryControl(id, handler, type) {
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

LTPolygonQueryControl.prototype = {
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
							
							if (handler._drawRectEnd) handler._drawRectEnd(str, bounds, rect, points, "rect");
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
		
	}
}