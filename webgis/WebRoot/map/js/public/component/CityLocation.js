function CityLocation(id, data, handler, locale) {
	// window.placeData
	this._clickMarker = null;
	this._id = id || null;
	this._handler = handler;
	this._cityZoomLevel = 10;
	this._provinceZoomLevel = 6;
	this._locale = this.setLocale(locale);
	this._showFlag = false;
	this._data = data;
	this._preSelectProvinceIndex = null;
	this._preSelectCityIndex = null;
	this._searchHandler = null;
	this._city = null;
	this._searchDiv = document.createElement("div");
	this._cityDiv = document.createElement("div");
	if (this._handler){
		this._city = this._handler.getCurrentCity();
	}
	this._defaultCss = {
		border      : 1,
		borderColor : "#2C59AA",
		fontWeight  : "bold",
		startColor  : "#FFFFFF",
		endColor    : "#C3DAF5"
	};
	this._searchMarkers = [];
}

CityLocation.prototype = {
	
	setSearchHandler : function(searchHandler){
		this._searchHandler = searchHandler;
	},
	
	
	_defaultDivCss : function(){
		this._div.style.zIndex = 65537;
		this._div.style.position = "absolute";
		// this._div.style.width = "210px";
		this._div.style.width = "310px";
		// this._div.style.height = "240px";
		this._div.style.padding = "3px";
		
		this._div.style.backgroundColor = "#C3DAF5";
		this._div.style.border = "#000000 solid 1px";
		if (document.all){
			this._div.style.filter = 
				"progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=#C3DAF5)"; 
		}else{
			this._div.style.backgroundImage = "-moz-linear-gradient(top, #FFFFFF, #C3DAF5)";
		}
		/*
		this._iframe = document.createElement("iframe");
		
		this._iframe.style.position = "absolute";
		this._iframe.style.zIndex = 65535;
		this._iframe.style.width = "210px";
		this._iframe.style.height = "300px";*/
	},
	
	_defaultListDivCss : function(obj){
		obj.style.width = "100px";
		obj.style.height = "200px";
		obj.style.overflow = "auto";
		obj.style.border = "#000000 solid 1px";
		obj.style.backgroundColor = "#FFFFFF";
	},
	
	_provinceListDivCss : function(){
		this._defaultListDivCss(this._provinceCombo);
		this._provinceCombo.style.cssFloat = "left";
	},
	
	_cityListDivCss : function(){
		this._defaultListDivCss(this._cityCombo);
		this._cityCombo.style.cssFloat = "right";
	},
	
	
	
	setTop : function(top){
		this._div.style.top = top + "px";
	},
	
	setRight : function(right){
		this._div.style.right = right + "px";
	},
	
	
	
	setLocale : function(locale) {
		return {
			cityAndProvince : "请选择省/直辖市",
			city : "请选择城市"
		}
	},

	setCityZoomLevel : function(zoomLevel) {
		this._cityZoomLevel = zoomLevel;
	},

	setProvinceZoomLevel : function(zoomLevel) {
		this._provinceZoomLevel = zoomLevel;
	},
	
	initExt : function(){
		this._div = document.createElement("div");
		this._defaultDivCss();
		this._createSearchBar();
	},
	
	
	
	init : function(){
		this._div = document.createElement("div");
		this._defaultDivCss();
		this._provinceCombo = document.createElement("div");
		this._cityCombo = document.createElement("div");
		this._provinceListDivCss();
		this._cityListDivCss();
		this._initProvinceCombo();
		this._createSearchBar();
	},
	
	btnClick : function(element, top, right){
		
		if (!this._showFlag){
			this.show(element, top, right);
		}else{
			this.hide();
			this.clearSearch();
		}
	},
	
	show : function(element, top, right){
		this._showFlag = true;
		if (typeof(getOffsetXY) != "undefined"){
			this._div.style.display = "block";
			this.setTop(top);
			this.setRight(right);
			element.appendChild(this._div);
		}
	},
	
	hide : function(){
		this._showFlag = false;
		this._div.style.display = "none";
	},
	
	_initProvinceCombo : function() {
		
		var ltCityLocation = this;
		// initialize ComboBox data
		this._reformatData(this._data);
		/* bind change event
		this._provinceCombo.onchange = function(evt){
			var value = this.value.split("_")
			var index = parseInt(value[0]);
			var lngLatArr = value[1];
			if (typeof (ltCityLocation._data[index].c) == "undefined") {
				if (ltCityLocation._cityCombo.style.display == "block") {
					ltCityLocation._cityCombo.style.display = "none";
				}
				ltCityLocation._setMapCenter(lngLatArr);
				// 存在城市列表
			} else {
				ltCityLocation._reformdata(ltCityLocation._cityCombo, ltCityLocation._data[index].c);
				ltCityLocation._cityCombo.comboxObj.show();
				ltCityLocation._setMapCenter(lngLatArr);
			}
		} */
		var div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "202px";
		// div.style.border = "#000000 solid 1px";
		div.appendChild(this._provinceCombo);
		div.appendChild(this._cityCombo);
		this._div.appendChild(div);
		
		
			
		/*
		var a = document.createElement("a");
		a.href = "#";
		a.innerHTML = "北京";
		a.onclick = function (){
			ltCityLocation._setMapCenter("11640969,3989945");
		}
		this._div.appendChild(a);*/
	},
	
	_listTdCss : function(td){
		td.style.width = "55px";
		td.style.valign = "right";
		td.style.textAlign = "right";
		td.style.marginRight = "2px";
		td.vAlign = "top";
		td.style.fontWeight = "bold";
		td.style.color = "#666666";
	},
	
	_backgroundCssSet : function(dom, opts){
		if (!opts) opts = {}
		if (document.all){
			dom.style.filter = 
				"progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=" + 
				(opts.startColor || this._defaultCss.startColor)
				+ ", EndColorStr=" + (opts.endColor || this._defaultCss.endColor) + ")"; 
		}else{
			dom.style.backgroundImage = "-moz-linear-gradient(top, " + 
				(opts.startColor || this._defaultCss.startColor) + ", " + 
				(opts.endColor || this._defaultCss.endColor) + ")";
		}
	},
	
	
	_cityListDiv : function(){
		var ltCityLocation = this;
		try{
			this._cityDiv.appendChild(
				this._createHeadDiv("城市列表", "关闭", function(){
					ltCityLocation._cityDiv.style.display = "none";
					ltCityLocation._searchDiv.style.display = "block";
				})
			);
			// list div
			var trArray = new Array();
			var sArray = new Array();
			var listDiv = document.createElement("div");
			var table = document.createElement("table");
			var firstTr = document.createElement("tr");
			var firstTd1 = document.createElement("td");
			this._listTdCss(firstTd1);
			firstTd1.innerHTML = "直辖市:";
			var firstTd2 = document.createElement("td");
			firstTr.appendChild(firstTd1);
			firstTr.appendChild(firstTd2);
			table.appendChild(firstTr);
			var lastTr = document.createElement("tr");
			var lastTd1 = document.createElement("td");
			this._listTdCss(lastTd1);
			lastTd1.innerHTML = "特区:";
			var lastTd2 = document.createElement("td");
			lastTr.appendChild(lastTd1);
			lastTr.appendChild(lastTd2);
			for (var i=0, len=this._data.length;i<len;i++){
				var name = this._valueFilter(this._data[i].a.n);
				if (typeof(this._data[i].c) != "undefined"){
					var tr = document.createElement("tr");
					var td1 = document.createElement("td");
					this._listTdCss(td1);
					td1.innerHTML = name + ":";
					var td2 = document.createElement("td");
					var items = this._data[i].c;
					for (var j=0;j<items.length;j++){
						td2.appendChild(this._createCityItemHTML(items[j]));
					}
					tr.appendChild(td1);
					tr.appendChild(td2);
					table.appendChild(tr);
				}else{
					if (name == "北京" || name == "天津" || name == "上海" || name == "重庆"){
						firstTd2.appendChild(this._createCityItemHTML(this._data[i]));
					}else{
						lastTd2.appendChild(this._createCityItemHTML(this._data[i]));
					}
				}
			}
			// alert(3);
			table.appendChild(lastTr);
			table.style.fontSize = "12px"; 
			table.border = 0;
			this._listCss(listDiv);
			listDiv.appendChild(table);
			this._cityDiv.appendChild(listDiv);
			this._cityDiv.style.display = "none";
		}catch(e){
			// alert(e);
		}
		// headDiv.innerHTML = "<span></span><span style='margin-left:5px;'><a href='#' onclick=''></a></span>";
	},
	
	setCity : function(city){
		this._city = city;
		if (this._handler) this._handler.setCurrentCity(city);
		if (this._div.firstChild){
			this._div.firstChild.firstChild.innerHTML = "当前城市:" + this._city;
		}
	},
	
	_createCityItemHTML : function(item){
		var ltCityLocation = this;
		var itemName = this._valueFilter(item.a.n);
		var span = document.createElement("span");
		span.style.marginLeft = "4px";
		var a = document.createElement("a");
		a.innerHTML = itemName;
		a.style.cursor = "pointer";
		a.style.color = "#0781D3";
		a.href = "javascript://;";
		a.onclick = function(item){
			var h = this;
			return function(){
				ltCityLocation.setCity(ltCityLocation._valueFilter(item.a.n));
				ltCityLocation._setMapCenter(item.a.l, 6)
			}
		}(item);
		span.appendChild(a);
		return span;
	},
	
	_listCss : function(dom){
		dom.style.overflow = "auto";
		dom.style.height = "255px";
	},
	
	_createHeadDiv : function(title, closeTitle, handler){
		var headDiv = document.createElement("div");
		headDiv.style.padding = "2 4 2 5";
		headDiv.style.fontSize = "12px";
		this._backgroundCssSet(headDiv);
		headDiv.style.border = "#2C59AA solid 1px";
		headDiv.style.marginBottom = "2px";
		var titleDiv = document.createElement("div");
		titleSpan = document.createElement("span");
		titleSpan.innerHTML = title;
		var closeSpan = document.createElement("span");
		closeA = document.createElement("a");
		closeSpan.style.cssFloat = "right";
		closeA.innerHTML = closeTitle;
		closeA.href = "#";
		closeA.onclick = handler;
		closeSpan.appendChild(closeA);
		titleDiv.appendChild(titleSpan);
		titleDiv.appendChild(closeSpan);
		headDiv.appendChild(titleDiv);
		return headDiv;
	},
	
	_createSearchResultListElementDivCss : function(){
		var div = document.createElement("div");
		div.style.fontSize = "12px";
		div.style.textAlign = "left";
		div.style.padding = "2 0 2 4";
		return div;
	},
	
	setSearchMarkers : function(searchMarkers){
		this._searchMarkers = searchMarkers;
	},
	
	
	clearSearch : function(){
		if (this._clickMarker != null){
			this._clickMarker.closeInfoWindow();
		}
		
		for (var i=0, len=this._searchMarkers.length;i<len;i++){
			this._handler.removeOverlay(this._searchMarkers[i]);
		}
		this._searchMarkers = new Array();
		var list = this._searchDiv.childNodes[1];
		list.innerHTML = "";
		this._clickMarker = null;
	},
	
	showCityList : function(){
		this._cityDiv.style.display = "block";
		this._searchDiv.style.display = "none";
	},
	
	showSearchList : function(){
		this._searchDiv.style.display = "block";
		this._cityDiv.style.display = "none";
	},
	
	addItemToSearchList : function(element){
		var list = this._searchDiv.childNodes[1];
		list.appendChild(element);
	},
	
	_createSearchBar : function(){
		
			var ltCityLocation = this;
			
			/** 搜索结果列表 **/
			var listDiv = document.createElement("div");
			this._listCss(listDiv);
			var searchHeadDiv = this._createHeadDiv("搜索结果列表", "清除", function(){
				ltCityLocation.clearSearch();
			})
			this._searchDiv.appendChild(searchHeadDiv);
			this._searchDiv.appendChild(listDiv);
			
			
			/** 城市列表 **/
			this._cityListDiv();
			
			// create head bar
			var headDiv = document.createElement("div");
			headDiv.style.fontSize = "12px";
			headDiv.style.paddingLeft = "3px";
			
			var citySpan = document.createElement("span");
			citySpan.innerHTML = "当前城市:" + this._city;
			headDiv.appendChild(citySpan);
			
			var switchSpan = document.createElement("span"); 
			switchSpan.style.marginLeft = "5px";
			var switchA = document.createElement("a");
			switchA.href = "javascript://;";
			switchA.innerHTML = "[切换城市]"
			switchA.style.color = "#0099CC";
			switchA.onclick = function(){
				// alert(ltCityLocation._cityDiv.innerHTML);
				ltCityLocation.showCityList();
			}
			switchSpan.appendChild(switchA);
			headDiv.appendChild(switchSpan);
			
			this._div.appendChild(headDiv);
			// create search bar
			var bDiv = document.createElement("div");
			bDiv.style.marginTop = "2px";
			bDiv.style.backgroundColor = "#FFFFFF";
			bDiv.style.padding = "3px";
			
			var inputText = document.createElement("input");
			inputText.type = "text";
			var inputBtn = document.createElement("input");
			inputBtn.type = "button";
			
			this._searchKeywords = inputText;
			
			inputBtn.value = "搜索";
			inputBtn.onclick = function(){
				if (ltCityLocation._city != null){
					if (inputText.value != ""){
						ltCityLocation.showSearchList();
						ltCityLocation.clearSearch();
						var div = ltCityLocation._createSearchResultListElementDivCss();
						div.innerHTML = "正在搜索\"" + inputText.value + "\", 请稍后......";
						ltCityLocation.addItemToSearchList(div);
						if (ltCityLocation.setSearchCallback){
							ltCityLocation.setSearchCallback(ltCityLocation._city, inputText.value)
						}
						// ltCityLocation._searchHandler.setCity(ltCityLocation._city);
						// ltCityLocation._searchHandler.search(inputText.value);
					}else{
						alert("请输入搜索内容");
					}
				}else{
					alert("请选择指定城市");
				}
			}
			// 封装搜索按钮和搜索框
			var containDiv = document.createElement("div");
			containDiv.style.marginBottom = "3px";
			containDiv.appendChild(inputText);
			containDiv.appendChild(inputBtn);
			
			var resultDiv = document.createElement("div");
			resultDiv.style.height = "276px";
			resultDiv.appendChild(this._searchDiv);
			resultDiv.appendChild(this._cityDiv);
			
			bDiv.appendChild(containDiv);
			bDiv.appendChild(resultDiv);
			this._div.appendChild(bDiv);
	},
	
	/**
	 * setSearchCallback(city, value)
	 */
	setSearchCallback : function(setSearchCallback){
		this.setSearchCallback = setSearchCallback;
	},
	
	
	_listItemCss : function(item, flag){
		item.style.fontSize = "13px";
		item.style.padding = "2px";
		item.style.cursor = "point";
		item.style.textAlign = "center";
	},
	
	_setListFocus : function(item, flag){
		if (!flag){
			item.style.backgroundColor = "#FFFFFF";
		}else{
			item.style.backgroundColor = "#FF9900";
		}
	},
	
	_loadCityData : function(index){
		var ltCityLocation = this;
		ltCityLocation._cityCombo.innerHTML = "";
		var data = ltCityLocation._data[index].c;
		if (typeof (data) != "undefined") {
			if (ltCityLocation._handler){
				ltCityLocation._handler.setCurrentCity(ltCityLocation._valueFilter(data[0].a.n));
			}
			ltCityLocation._city = ltCityLocation._valueFilter(data[0].a.n);
			for ( var i = 0; i < data.length; i++) {
				var div = document.createElement("div");
				div.id = "city_" + i;
				div.innerHTML = "<a href = '#' style='font-weight:bold;'>" + ltCityLocation._valueFilter(data[i].a.n) + "</a>";
				ltCityLocation._listItemCss(div);
				div.onclick = function(lngLatArr, i){
					return function(){
						if (ltCityLocation._preSelectCityIndex != null){
							var pre = document.getElementById("city_" + ltCityLocation._preSelectCityIndex);
							if (pre) ltCityLocation._setListFocus(pre, false);
						}
						ltCityLocation._setListFocus(this, true);
						ltCityLocation._preSelectCityIndex = i;
						ltCityLocation._setMapCenter(lngLatArr, 6);
						ltCityLocation._city = this.firstChild.innerHTML;
						if (ltCityLocation._handler)ltCityLocation._handler.setCurrentCity(this.innerHTML);
					}
				}(data[i].a.l, i)
				ltCityLocation._cityCombo.appendChild(div);
			}
		}else{
			ltCityLocation._city = ltCityLocation._handler.getCurrentProvince();
			if (ltCityLocation._handler)ltCityLocation._handler.setCurrentCity(ltCityLocation._handler.getCurrentProvince());
		}
	},
	
	_reformatData : function(data) {
		try{
			var ltCityLocation = this;
			for ( var i = 0; i < data.length; i++) {
				// var option = document.createElement("option");
				// option.value = i + "_" + data[i].a.l;
				// option.innerHTML = this._valueFilter(data[i].a.n);
				// ComboBox.appendChild(option);
				var div = document.createElement("div");
				div.id = "province_" + i;
				div.innerHTML = "<a href = '#' style='font-weight:bold;'>" + this._valueFilter(data[i].a.n) + "</a>";
				ltCityLocation._listItemCss(div);
				div.onclick = function(lngLatArr, i){
					return function(){
						if (ltCityLocation._preSelectProvinceIndex != null){
							var pre = document.getElementById("province_" + ltCityLocation._preSelectProvinceIndex);
							if (pre) ltCityLocation._setListFocus(pre, false);
						}
						ltCityLocation._setListFocus(this, true);
						ltCityLocation._preSelectProvinceIndex = i;
						ltCityLocation._setMapCenter(lngLatArr, 10);
						if (ltCityLocation._handler) ltCityLocation._handler.setCurrentProvince(this.firstChild.innerHTML);
						ltCityLocation._loadCityData(i);
					}
				}(data[i].a.l, i)
				ltCityLocation._provinceCombo.appendChild(div);
			}
		}catch(e){
			
		}
	},

	_setMapCenter : function(latLngStr, zoomLevel) {
		var lngLatArr = latLngStr.split(",");
		if (typeof (this._handler) != "undefined") {
			this._handler.setCenter(
				this._handler.createPoint(
					parseFloat((lngLatArr[1])),
				    parseFloat((lngLatArr[0]))
				), zoomLevel || this._handler.getZoom()
			);
		} 
	},
	
	
	_valueFilter : function(value) {
		var eq = 0, rq = 0;
		var tq = value.length;
		var yq = new String();
		var uq = -1;
		var iq = 0;
		for ( var oq = 0; oq < tq; oq++) {
			var pq = value.charCodeAt(oq);
			pq = (pq == 95) ? 63 : ((pq == 44) ? 62 : ((pq >= 97) ? (pq - 61)
					: ((pq >= 65) ? (pq - 55) : (pq - 48))));
			rq = (rq << 6) + pq;
			eq += 6;
			while (eq >= 8) {
				var aq = rq >> (eq - 8);
				if (iq > 0) {
					uq = (uq << 6) + (aq & (0x3f));
					iq--;
					if (iq == 0) {
						yq += String.fromCharCode(uq);
					}
				} else {
					if (aq >= 224) {
						uq = aq & (0xf);
						iq = 2;
					} else if (aq >= 128) {
						uq = aq & (0x1f);
						iq = 1;
					} else {
						yq += String.fromCharCode(aq);
					}
				}
				rq = rq - (aq << (eq - 8));
				eq -= 8;
			}
		}
		return yq;
	}
	

	
}