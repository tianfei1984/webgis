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

function LTClearControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
}

LTClearControl.prototype = {
	btnClick : function() {
		 alert("clear");
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

function LTOverlayControl(id, handler) {
	this._id = id;
	this._flag = false;
	this._handler = handler;
	this.div = document.createElement("div");
	this.div.style.zIndex = 65537;
	this.div.style.position = "absolute";
	this.div.style.width = "120px";
	this.div.style.padding = "3px";
	this.div.style.border = "1px #CCCCCC solid";
	this.div.style.backgroundColor = "#FFFFFF";
	this.div.style.display = "none";
	this.div.style.fontSize = "13px";
	// this.div.style.innerHTML = "<div></div>";
	
	var itemDiv = document.createElement("div");
	var checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.checked = window.parent.Srims.OverlayManager.marker.getShowFlag();
	checkBox.onclick = function(){
		var handler = window.parent.Srims.OverlayManager.marker;
		handler.setShowFlag(checkBox.checked);
		if (checkBox.checked){
			handler.initialize();
		}else{
			handler.clear();
		}
	}
	var span = document.createElement("span");
	span.innerHTML = Map.locale.tool.marker;
	span.style.position = "relative";
	span.style.top = "-2px";
	itemDiv.appendChild(checkBox);
	itemDiv.appendChild(span);
	this.div.appendChild(itemDiv);
	document.body.appendChild(this.div);
}

LTOverlayControl.prototype = {
	btnClick : function(obj, top, right) {
		if (this.div.style.display == "none"){
			this.div.style.display = "block";
			this.div.style.top = top + "px";
			this.div.style.right = right + "px";
		}else{
			this.div.style.display = "none";
		}
	}
}

function LTControlsToolbarItems(id, handler, name, img, index, tips, isDepend) {
	try {
		this._tips = tips;
		this._handler = handler;
		this._type = handler._id;
		this._name = name;
		this._img = img;
		this._index = index;
		this.dom = null;
		this._defaultImgPath = "images/toolbar/";
		
//		if (typeof(this.isDepend) == "undefined"){
//			this.isDepend = false;
//		}
		
		this.isDepend = isDepend;
		
		this._defaultControlCss = {
			border : 1,
			borderColor : "#2C59AA",
			fontWeight : "bold",
			startColor : "#FFFFFF",
			endColor : (!this.isDepend) ? "#CCCCCC" : "yellow"
		};
		
		this.dom = document.createElement("button");
		this.dom.title = this._createTips();
		this.dom.id = id + "-item-span-toolbar-items-" + index;
		this.switchCss();
		this.dom.innerHTML = this._createImg(this._img) + this._createText(this._name, this._index);
		this._handler._itemDom = this.dom;
		this.dom.control = this;
	} catch (e) {

	}
}

LTControlsToolbarItems.prototype = {
	setName : function(name) {
		this._name = name;
		this.dom.childNodes[1].innerHTML = this._name;
	},

	_publicCss : function() {
		this.dom.style.cursor = "hand";
		this.dom.style.fontSize = "12px";
		this.dom.style.color = "black";
		this.dom.style.paddingTop = "2px";
		this.dom.style.marginLeft = "1px";
		this.dom.style.paddingRight = "2px";
		this.dom.style.paddingLeft = "2px";
		this.dom.style.height = "26px";
	},
	
	switchCss : function(opts) {
			if (!opts)
				opts = {}
			this._publicCss();
			this.dom.style.border = (opts.borderColor || this._defaultControlCss.borderColor)
					+ " "
					+ (opts.border || this._defaultControlCss.border)
					+ "px solid";
	
			this.dom.style.fontWeight = opts.fontWeight
					|| this._defaultControlCss.fontWeight;
			if (document.all) {
				this.dom.style.filter = "progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr="
						+ (opts.startColor || this._defaultControlCss.startColor)
						+ ", EndColorStr="
						+ (opts.endColor || this._defaultControlCss.endColor) + ")";
			} else {
				this.dom.style.backgroundImage = "-moz-linear-gradient(top, "
						+ (opts.startColor || this._defaultControlCss.startColor)
						+ ", "
						+ (opts.endColor || this._defaultControlCss.endColor) + ")";
			}
	},

	_createImg : function(img) {
		return "<img src='"
				+ this._defaultImgPath
				+ img
				// + "' style='position:relative; top:2px; margin-right:3px;width:16px;height:16px;' />";
				+ "' style='position:relative; top:-2px; width:16px;height:16px;' />";
	},
	
	_createTips : function(){
		return (typeof(this._tips) == "undefined") ? "" : this._tips;
	},
	
	_createText : function(name, index) {
		return "<span style='position:relative;top:-2px;'>" + name + "</span>";
	},

	hide : function() {
		this.dom.style.visibility = "hidden";

	},

	show : function() {
		this.dom.style.visibility = "visible";
	}
}






/**
 * ��ͼtoolbar����ؼ�
 */
function LTControlsToolbar(id, handler, x, y) {
	this._handler = handler;
	this._id = id || "LTControlsToolbar";
	this._obj = document.createElement("div");
	this._obj.style.textAlign = "right";
	this._obj.style.padding = "3px";
	this._obj.style.zIndex = 65536;
	this._obj.style.position = "absolute";
	this._obj.style.right = (x || 5) + "px";
	this._obj.style.top = (y || 5) + "px";
	this._obj.style.height = "0px";
	this._obj.id = "toolBar[" + this._id + "]";
	this._toolbarControls = []; // LTControlsToolbarItems
	this._preActiveConIndex = null;
	this._preHandler = null;
	this._mapping = {};
	this._dependentControls = [];
}

LTControlsToolbar.prototype = {
	getTop : function(){
		return this._obj.style.top;
	},
	
	getRight : function(){
		return this._obj.style.right;
	},
		
	appendControl : function(ltControlsToolbarItems) {
		this._toolbarControls.push(ltControlsToolbarItems);
		var index = this._toolbarControls.length - 1;
		this._mapping[ltControlsToolbarItems._type] = index;
		return this._toolbarControls[index];
	},

	hide : function(){
		this._obj.style.display = "none";
	},

	show : function(){
		this._obj.style.display = "block";
	},


	getToolbarItem : function(key) {
		var index = this._mapping[key];
		if (typeof (index) == "undefined" || index == null) {
			return null;
		}
		return this._toolbarControls[index];
	},

	display : function(itemIndex, flag) {
		var item = this._toolbarControls[itemIndex];
		if (item) {
			if (flag) {
				item.show();
			} else {
				item.hidden();
			}
		}
	},


	clearControl : function(control) {
		//alert("clearControl");
		//this._clearControlPublic(control.polygons, 1);
		//this._clearControlPublic(control.mapTexts, 2);
		//this._clearControlPublic(control.zMarkers, 3);
		// var lt = document.getElementById("lt_overlaysDiv");
		// if (lt) lt.innerHTML = "";

	},

	_clearControlPublic : function(array, flag) {
		if (array) {
			if (array.length > 0) {
				if (flag != 2) {
					for ( var i = 0, len = array.length; i < len; i++) {
						try {
							this._handler.removeOverlay(array[i]);
						} catch (e) {

						}
					}
				} else {
					try {
						for ( var i = 0, len = array[0].length; i < len; i++) {
							this._handler.removeOverlay(array[0][i]);
						}
					} catch (e) {

					}
				}
			}
		}
	},

	clearToolItems : function(index) {

	},

	controlDomClick : function(control, flag) {
		
		var handler = this;
		var dom = control.dom;
		var xy = getOffsetXY(dom.parentNode);
		var preControl;
		if (handler._preActiveConIndex != control._index) {
			if (handler._preActiveConIndex != null) {
				preControl = handler._toolbarControls[handler._preActiveConIndex];
				if (preControl) {
					preControl.switchCss();
					if (preControl._handler && flag) {
						preControl._handler.btnClick(dom.parentNode.parentNode,
								xy[1] + 30,
								parseInt(dom.parentNode.style.right) + 3);
						//alert("controlDomClick2");
						handler.clearControl(preControl._handler);
					}
				}
			}
			if (control._handler && flag) {
				control._handler.btnClick(dom.parentNode.parentNode, xy[1] + 30, parseInt(dom.parentNode.style.right) + 3);
				handler.clearControl(control._handler);
			}
				
			if (!control.isDepend){
				control.switchCss({
					endColor : "#FF9900"
				})
			}
			
			handler._preActiveConIndex = control._index;
		} else {
			if (control._handler && flag) {
				control._handler.btnClick(dom.parentNode.parentNode,
						xy[1] + 30, parseInt(dom.parentNode.style.right) + 3);
				handler.clearControl(control._handler);
			}
			if (!control.isDepend){
				control.switchCss();
			}
			
			handler._preActiveConIndex = null;
		}
	},

	appendDependentControl : function(control){
		control.isDepend = true;
		this._dependentControls.push(control);
	},

	createHTML : function() {
		try {
			var handler = this;
			var e = window.event || e;
			if (this._toolbarControls.length > 0) {
				for ( var i = 0, len = this._toolbarControls.length; i < len; i++) {
					var control = this._toolbarControls[i];
//					control.dom.onclick = function(e, control) {
//						return function() {
//							handler.controlDomClick(control, true);
//						}
//					}(e, control);
					
					control.dom.onmouseover = function(e, control) {
						return function() {
							if (handler._preActiveConIndex != control._index) {
								control.switchCss({
									endColor : "#FF9900"
								})
							}
						}
					}(e, control)

					control.dom.onmouseout = function(e, control) {
						return function() {
							if (handler._preActiveConIndex != control._index) {
								control.switchCss();
							}
						}
					}(e, control)
					this._obj.appendChild(control.dom);
					
				}
			}

			if (this._dependentControls.length > 0){
				for ( var i = 0, len = this._dependentControls.length; i < len; i++) {
					var control = this._dependentControls[i];
					this._obj.appendChild(control.dom);
				}
			}
			this._obj.onclick = function(e){
				if (document.all){
					e = event || window.event; 
				}
				if (typeof(e.srcElement) == "undefined"){
					e = e.target
				}else{
					e = e.srcElement
				}

				if(e.tagName =="IMG")
					e = e.parentNode;
				//alert(e.tagName);
				switch (e.tagName) {
				case "BUTTON":
					//alert("button");
					handler.controlDomClick(e.control, true);
					break;
				}
			}
		} catch (e) {
		}

	},

	resetToolbar : function() {
		this._obj.innerHTML = "";
		this._toolbarControls = [];
		if (this._preHandler != null) {
			LTEvent.removeListener(this._preHandler);
		}
	}
}