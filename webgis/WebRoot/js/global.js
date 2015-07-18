if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{
	Range.prototype.createContextualFragment = function(html)
	{
		var frag = document.createDocumentFragment(), 
		div = document.createElement("div");
		frag.appendChild(div);
		div.outerHTML = html;
		return frag;
	};
}

function IframeLoadData(array, checkTimeout){
	this._framesPropertys = array;
	this._checkHandler = null;
	this._checkTimeout = checkTimeout || 50;
}

IframeLoadData.prototype = {
	initialize : function(callback){
		this.callback = callback;
		var array = this._framesPropertys;
		(function(d) {
			for (var key in array){
				var iframe = d.getElementById("iframe-template-" + key);
				if (!iframe){
					iframe = d.body.appendChild(d.createElement('iframe'));
					iframe.id = "iframe-template-" + key;
					iframe.name = "iframe-template-" + key;
				    iframe.style.cssText = "position:absolute;width:200px;height:100px;left:0px;";
				    iframe.style.display = "none";
				}
			    doc = iframe.contentWindow.document;
			    doc.open().write('<body onload="' + 
						'var d = document;' + 
						// 'd.getElementsByTagName(\'head\')[0].innerHTML+=\'<meta http-equiv=Content-Type content=text/html; charset=utf-8>\';' + 
						// 'd.getElementsByTagName(\'head\')[0].appendChild(m);' + 
						// 'd.getElementsByTagName(\'head\')[0].appendChild(d.createElement(\'meta\')).content=\'text/html; charset=utf-8\';' + 
						'var s = d.createElement(\'script\');s.charset=\'UTF-8\';' + 
						'd.getElementsByTagName(\'head\')[0].' + 
						'appendChild(s).src' + 
						'=\'' + array[key].url + "?t=" + (new Date().getTime()) + '\'">');
			    doc.close();
			}
		})(document);
		this.startCheck(new Date().getTime());
	},
	
	startCheck : function(startTime){
		var il = this;
		var array = il._framesPropertys;
		il._checkHandler = window.setInterval(function(){
			var flag = true;
			for (var key in array){
				var tempFlag = false;
				// console.info("DataTemplate:" + document.getElementById(key).contentWindow.DataTemplate);
				if (document.getElementById("iframe-template-" + key).contentWindow.DataTemplate){
					array[key].isEnd = true;
					tempFlag = array[key].isEnd;
				}
				flag = (flag && tempFlag);
			}
			if (flag){
				window.clearInterval(il._checkHandler);
				if (il.callback){
					il.callback(il);
				} 
			}
		}, il._checkTimeout);
	},
	
	getFrameData : function(key){
		var frame = (document.getElementById("iframe-template-" + key).contentWindow.DataTemplate);
		if (frame){
			return frame.data;
		}
		return null;
	},
	
	
	getFrameItemData : function(key, itemKey){
		return null;
	}
}

/* This function is used to change the style class of an element */
// format output date object
function formatDate(data){
	var d = new Date();    
	var year = d.getFullYear();    
	var month = d.getMonth()+1;    
	var ddate = d.getDate();    
	var dday = d.getDay();    
	var hours = d.getHours();    
	var minutes = d.getMinutes();    
	var seconds = d.getSeconds(); 
	return year + "-" + formatNumber(month) + "-" + 
		formatNumber(ddate) + " " + 
		formatNumber(hours) + ":" + 
		formatNumber(minutes) + ":" + 
		formatNumber(seconds);
}

function formatNumber(number){
	return number < 9 ? "0" + number : number
}

function swapClass(obj, newStyle) {
    obj.className = newStyle;
}

function isUndefined(value) {   
    var undef;   
    return value == undef; 
}

function checkAll(theForm) { 
	// check all the checkboxes in the list
  for (var i=0;i<theForm.elements.length;i++) {
    var e = theForm.elements[i];
        var eName = e.name;
        if (eName != 'allbox' && 
            (e.type.indexOf("checkbox") == 0)) {
            e.checked = theForm.allbox.checked;        
        }
    } 
}

function getOffsetXY(obj){
    var x = 0;
    var y = 0;
    var ele = obj;
    while(ele != null){
        x += ele.offsetLeft;
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return [x,y];
}


var alertFlag = 0;
/* This function is used to get http service data */
function getServiceData(url,  successCallback, args, badStatusCallback, errorCallback, method, data) {
	var cacheVal = false;
	if(args&&args.cache)
	{
		cacheVal = args.cache;
	}
	$.ajax({
		type : method || "get",
		url : url,
		data : data || {},
		cache : cacheVal,
		dataType : "json",
		success : function(responseData){
			if (responseData.status == "200") {
				successCallback(responseData, args);
			} else {
				//if (typeof (badStatusCallback) != "undefined")
				//	badStatusCallback(responseData, args);
				//else
				{
					if (responseData.status == "501" &&alertFlag == 0) 
					{
						alert(responseData.msg);
						document.location.href = ctx + "/login.jsp";
						alertFlag = 1;
						
					}
				}
			}
		},
		error : function(responseData) {
			if (typeof (errorCallback) != "undefined")
				errorCallback(responseData, args);
		}
	})
}

function postServiceData(url, data, successCallback,args,badStatusCallback, errorCallback)
{
	$.ajax({
		type : "post",
		url : url,
		contentType:"application/x-www-form-urlencoded",
		data: data,
		cache : false,
		dataType : "json",
		success : function(responseData){
			if (responseData.status == "200") {
				successCallback(responseData, args);
			} else {
				if (typeof (badStatusCallback) != "undefined")
					badStatusCallback(responseData);
			}
		},
		error : function() {
			if (typeof (errorCallback) != "undefined")
				errorCallback();
		}
	})
}
/* This function is used to validate form data */
function validateForm(form, render){
//	postServiceData(
//		form.action,"username=" + (form.username.value) + "&password=" + form.password.value+ "&randomCode=" + form.randomCode.value+ "&userType=" + form.usertype.value,
//		function(responseData){
//			if (responseData.status == 200){
//				top.location = render;
//			}else{
//				
//			}
//		},
//		"",
//		function(responseData)
//		{
//			alert(responseData.msg);
//			changeValidateCode(document.getElementById("pic_random_code"));
//		}
//	)
	
	form.password.value = hex_md5(form.password.value);
//	// alert(form.password.value);
	return true;
}

/* Function to clear a form of all it's values */
function clearForm(frmObj) {
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if(element.type.indexOf("text") == 0 || 
                element.type.indexOf("password") == 0) {
                    element.value="";
        } else if (element.type.indexOf("radio") == 0) {
            element.checked=false;
        } else if (element.type.indexOf("checkbox") == 0) {
            element.checked = false;
        } else if (element.type.indexOf("select") == 0) {
            for(var j = 0; j < element.length ; j++) {
                element.options[j].selected=false;
            }
            element.options[0].selected=true;
        }
    } 
}

/* Function to get a form's values in a string */
function getFormAsString(frmObj) {
    var query = "";
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if (element.type.indexOf("checkbox") == 0 || 
            element.type.indexOf("radio") == 0) { 
            if (element.checked) {
                query += element.name + '=' + escape(element.value) + "&";
            }
        } else if (element.type.indexOf("select") == 0) {
            for (var j = 0; j < element.length ; j++) {
                if (element.options[j].selected) {
                    query += element.name + '=' + escape(element.value) + "&";
                }
            }
        } else {
            query += element.name + '=' 
                  + escape(element.value) + "&"; 
        }
    } 
    return query;
}

/*
 * Function to hide form elements that show through the search form when it is
 * visible
 */
function toggleForm(frmObj, iState) // 1 visible, 0 hidden
{
    for(var i = 0; i < frmObj.length; i++) {
        if (frmObj.elements[i].type.indexOf("select") == 0 || frmObj.elements[i].type.indexOf("checkbox") == 0) {
            frmObj.elements[i].style.visibility = iState ? "visible" : "hidden";
        }
    } 
}

/* Helper function for re-ordering options in a select */
function opt(txt,val,sel) {
    this.txt=txt;
    this.val=val;
    this.sel=sel;
}

/* Function for re-ordering <option>'s in a <select> */
function move(list,to) {     
    var total=list.options.length;
    index = list.selectedIndex;
    if (index == -1) return false;
    if (to == +1 && index == total-1) return false;
    if (to == -1 && index == 0) return false;
    to = index+to;
    var opts = new Array();
    for (i=0; i<total; i++) {
        opts[i]=new opt(list.options[i].text,list.options[i].value,list.options[i].selected);
    }
    tempOpt = opts[to];
    opts[to] = opts[index];
    opts[index] = tempOpt
    list.options.length=0; // clear
    
    for (i=0;i<opts.length;i++) {
        list.options[i] = new Option(opts[i].txt,opts[i].val);
        list.options[i].selected = opts[i].sel;
    }
    
    list.focus();
} 

/* This function is to select all options in a multi-valued <select> */
function selectAll(elementId) {
    var element = document.getElementById(elementId);
    len = element.length;
    if (len != 0) {
        for (i = 0; i < len; i++) {
            element.options[i].selected = true;
        }
    }
}

/*
 * This function is used to select a checkbox by passing in the checkbox id
 */
function toggleChoice(elementId) {
    var element = document.getElementById(elementId);
    if (element.checked) {
        element.checked = false;
    } else {
        element.checked = true;
    }
}

/*
 * This function is used to select a radio button by passing in the radio button
 * id and index you want to select
 */
function toggleRadio(elementId, index) {
    var element = document.getElementsByName(elementId)[index];
    element.checked = true;
}

/* This function is used to open a pop-up window */
function openWindow(url, winTitle, winParams) {
    winName = window.open(url, winTitle, winParams);
    winName.focus();
}


/* This function is to open search results in a pop-up window */
function openSearch(url, winTitle) {
    var screenWidth = parseInt(screen.availWidth);
    var screenHeight = parseInt(screen.availHeight);

    var winParams = "width=" + screenWidth + ",height=" + screenHeight;
        winParams += ",left=0,top=0,toolbar,scrollbars,resizable,status=yes";

    openWindow(url, winTitle, winParams);
}

/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
    var prefix = name + "=" 
    var start = document.cookie.indexOf(prefix) 

    if (start==-1) {
        return null;
    }
    
    var end = document.cookie.indexOf(";", start+prefix.length) 
    if (end==-1) {
        end=document.cookie.length;
    }

    var value=document.cookie.substring(start+prefix.length, end) 
    return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// This function is for stripping leading and trailing spaces
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

// This function is used by the login screen to validate user/pass
// are entered.
function validateRequired(form) {                                    
    var bValid = true;
    var focusField = null;
    var i = 0;                                                                                          
    var fields = new Array();                                                                           
    oRequired = new required();                                                                         
                                                                                                        
    for (x in oRequired) {                                                                              
        if ((form[oRequired[x][0]].type == 'text' || form[oRequired[x][0]].type == 'textarea' || form[oRequired[x][0]].type == 'select-one' || form[oRequired[x][0]].type == 'radio' || form[oRequired[x][0]].type == 'password') && form[oRequired[x][0]].value == '') {
           if (i == 0)
              focusField = form[oRequired[x][0]]; 
              
           fields[i++] = oRequired[x][1];
            
           bValid = false;                                                                             
        }                                                                                               
    }                                                                                                   
                                                                                                       
    if (fields.length > 0) {
       focusField.focus();
       // alert(fields.join('\n'));                                                                      
    }                                                                                                   
                                                                                                       
    return bValid;                                                                                      
}

// This function is a generic function to create form elements
function createFormElement(element, type, name, id, value, parent) {
    var e = document.createElement(element);
    e.setAttribute("name", name);
    e.setAttribute("type", type);
    e.setAttribute("id", id);
    e.setAttribute("value", value);
    parent.appendChild(e);
}

function confirmDelete(obj) {   
    var msg = "Are you sure you want to delete this " + obj + "?";
    ans = confirm(msg);
    if (ans) {
        return true;
    } else {
        return false;
    }
}

function highlightTableRows(tableId) {
    var previousClass = null;
    var table = document.getElementById(tableId); 
    var startRow = 0;
    // workaround for Tapestry not using thead
    if (!table.getElementsByTagName("thead")[0]) {
	    startRow = 1;
    }
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    // add event handlers so rows light up and are clickable
    for (i=startRow; i < rows.length; i++) {
        rows[i].onmouseover = function() { previousClass=this.className;this.className+=' over' };
        rows[i].onmouseout = function() { this.className=previousClass };
        rows[i].onclick = function() {
            var cell = this.getElementsByTagName("td")[0];
            var link = cell.getElementsByTagName("a")[0];
            if (link.onclick) {
                call = link.getAttribute("onclick");
                if (call.indexOf("return ") == 0) {
                    call = call.substring(7);
                } 
                // this will not work for links with onclick handlers that
				// return false
                eval(call);
            } else {
                location.href = link.getAttribute("href");
            }
            this.style.cursor="wait";
            return false;
        }
    }
}

function highlightFormElements() {
    // add input box highlighting
    addFocusHandlers(document.getElementsByTagName("input"));
    addFocusHandlers(document.getElementsByTagName("textarea"));
}

function addFocusHandlers(elements) {
    for (i=0; i < elements.length; i++) {
        if (elements[i].type != "button" && elements[i].type != "submit" &&
            elements[i].type != "reset" && elements[i].type != "checkbox" && elements[i].type != "radio") {
            if (!elements[i].getAttribute('readonly') && !elements[i].getAttribute('disabled')) {
                elements[i].onfocus=function() {this.style.backgroundColor='#ffd';this.select()};
                elements[i].onmouseover=function() {this.style.backgroundColor='#ffd'};
                elements[i].onblur=function() {this.style.backgroundColor='';}
                elements[i].onmouseout=function() {this.style.backgroundColor='';}
            }
        }
    }
}

function radio(clicked){
    var form = clicked.form;
    var checkboxes = form.elements[clicked.name];
    if (!clicked.checked || !checkboxes.length) {
        clicked.parentNode.parentNode.className="";
        return false;
    }

    for (i=0; i<checkboxes.length; i++) {
        if (checkboxes[i] != clicked) {
            checkboxes[i].checked=false;
            checkboxes[i].parentNode.parentNode.className="";
        }
    }

    // highlight the row
    clicked.parentNode.parentNode.className="over";
}


function numericLimitedKeypress(evt, input){
	try{
		var theEvent = evt || window.event;   
		var key = theEvent.keyCode || theEvent.which;   
		if (key != 8){
			key = String.fromCharCode( key );
			// if (input.value == "" && key == "A"){
			// numericLimitedReturn(theEvent);
			// }
			var regex = /[0-9]/; 
			if(!regex.test(key)){     
				numericLimitedReturn(theEvent);
			} 
		}
	}catch(e){
		
	}
}

function certicodeLimitedKeypress(evt, input){
	try{
		var theEvent = evt || window.event;   
		var key = theEvent.keyCode || theEvent.which;   
		if (key != 8){
			key = String.fromCharCode( key );
			// if (input.value == ""){
			// numericLimitedReturn(theEvent);
			// }
			var regex = /[0-9]|[A-Z]|\-/; 
			if( !regex.test(key) ) {     
				numericLimitedReturn(theEvent);
			} 
		}
	}catch(e){
		// alert(e);
	}
}

function idCardLimitedKeypress(evt, input){
	try{
		var theEvent = evt || window.event;   
		var key = theEvent.keyCode || theEvent.which;   
		if (key != 8){
			key = String.fromCharCode( key );
			// if (input.value == ""){
			// numericLimitedReturn(theEvent);
			// }
			var regex = /[0-9]|X/; 
			if( !regex.test(key) ) {     
				numericLimitedReturn(theEvent);
			} 
		}
	}catch(e){
		// alert(e);
	}
}


function numericLimitedKeypressBit(evt, input){
	try{
		var theEvent = evt || window.event;
		var key = theEvent.keyCode || theEvent.which;   
		if (key != 8){
			key = String.fromCharCode( key );
			var regex = /[0-1]/; 
			if( !regex.test(key) ){     
				numericLimitedReturn(theEvent);
			} 
		}
	}catch(e){
		// alert(e);
	}
}

function numericLimitedReturn(evt){
	evt.returnValue = false; 
	if (typeof(evt.preventDefault) != "undefined"){
		evt.preventDefault(); 
	}
}

function changeValidateCode(obj,url) {   

	var timenow = new Date().getTime();   
 	obj.src = randomPictureUrl+"?d="+timenow;   
}   

function checkImageBig(clickElement){
	// var div = document.createElement("div");
	// div
}


// 
// <c:url value="/image.action" />
function checkImage(picId, picDate, title, url){
	try{
		if (picId != ""){
			var imageCheck = document.getElementById("imageCheck");
			if (!imageCheck){
				imageCheck = document.createElement("div");
				imageCheck.id = "imageCheck";
				imageCheck.title = title + picDate;
				imageCheck.style.textAlign = "center";
				document.body.appendChild(imageCheck);
			}
			
			$( "#imageCheck" ).dialog({modal: true, width:470, height:350, resizable: true});
			
			imageCheck.innerHTML = "";
			var img = document.createElement("img");
			img.style.width = "90%";
			img.style.height = "90%";
			img.src = url + "?id=" + picId;
			imageCheck.style.textAlign = "center";
			imageCheck.appendChild(img);
		}else{
			
		}
	}catch(e){
		// alert(e);
	}
}

function isIE6(){
	if(navigator.appName == "Microsoft Internet Explorer"){
	 	if(navigator.appVersion.match(/6./i)=='6.'){
	 		return true;
	    }
	}
	return false;
}

function debuggerArea(){
	var divDebugger = document.createElement("div");
	divDebugger.id = "divDebugger";
	if (document.all){
	    divDebugger.filters.alpha.opacity = 80;
	}else{
	    divDebugger.style.opacity = 0.8;
	}
	divDebugger.style.position = "absolute";
	divDebugger.style.height = "200px";
	divDebugger.style.width = "80%";
	divDebugger.style.right = "0px";
	divDebugger.style.bottom = "0px";
	divDebugger.style.backgroundColor = "yellow";
	divDebugger.style.overflowY = "auto";
	divDebugger.style.zIndex = 2000000;
	var divBar = document.createElement("div");
	divBar.innerHTML = "<div align='right'><button onclick='this.parentNode.parentNode.parentNode.childNodes[1].innerHTML=\"\";'>���</button></div>"
	divBar.style.height = "30px";
	var divMain = document.createElement("div");
	divMain.style.overflowY = "auto";
	divMain.style.height = "170px";
	divDebugger.appendChild(divBar);
	divDebugger.appendChild(divMain);
    document.body.appendChild(divDebugger);
}

/**
 * ��ӡ���ִ����־������̨
 */
function showDebugger(str){
	var debug = document.getElementById("divDebugger");
	if (debug) debug.childNodes[1].innerHTML += str + "<br />"
}

function mousewheelDisabled(){
	function mousewheel(event) {
		event = event || window.event;
		var flag1 = (event.ctrlKey || event.CONTROL_MASK);
		var flag2 = (event.wheelDelta || event.detail);
		if (typeof (flag1) != "undefined" && flag1 != null && typeof (flag2) != "undefined" && flag2 != null){
			flag = flag1 && flag2;
			if (typeof (flag) != "undefined" && flag != null) {
				if (document.all) {
					event.returnValue = false;
				} else {
					event.preventDefault();
				}
			}
		}
			
	}
	
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll', mousewheel, false);
	}
	
	document.onmousewheel = mousewheel;
}
	


/*
 * window.onload = function() { highlightFormElements(); if
 * ($('successMessages')) { new Effect.Highlight('successMessages'); // causes
 * webtest exception on OS X :
 * http://lists.canoo.com/pipermail/webtest/2006q1/005214.html //
 * window.setTimeout("Effect.DropOut('successMessages')", 3000); } if
 * ($('errorMessages')) { new Effect.Highlight('errorMessages'); } // Initialize
 * menus for IE if ($("primary-nav")) { var navItems =
 * $("primary-nav").getElementsByTagName("li");
 * 
 * for (var i=0; i<navItems.length; i++) { if (navItems[i].className ==
 * "menubar") { navItems[i].onmouseover=function() { this.className += " over"; }
 * navItems[i].onmouseout=function() { this.className = "menubar"; } } } } }
 */

// Show the document's title on the status bar
// window.defaultStatus=document.title;


function addEvent(element, type, handler) {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
    //为元素的事件类型创建一个哈希表
    if (!element.events) element.events = {};
    //为每一个"元素/事件"对创建一个事件处理程序的哈希表
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
        //存储存在的事件处理函数(如果有)
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
    //将事件处理函数存入哈希表
    handlers[handler.$$guid] = handler;
    //指派一个全局的事件处理函数来做所有的工作
    element["on" + type] = handleEvent;
};
//用来创建唯一的ID的计数器
addEvent.guid = 1;

function removeEvent(element, type, handler) {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
};
function handleEvent(event) {
    var returnValue = true;
    //抓获事件对象(IE使用全局事件对象)
    event = event || fixEvent(window.event);
    //取得事件处理函数的哈希表的引用
    var handlers = this.events[event.type];
    //执行每一个处理函数
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
};

//为IE的事件对象添加一些“缺失的”函数
function fixEvent(event) {
    //添加标准的W3C方法
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
};
