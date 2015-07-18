// jiami
function jiami(e53, B92_) {
	if (B92_ > 180) {
		B92_ += 360;
	}
	var WVd94 = parseInt(parseFloat(e53) * 100000);
	var j7_2 = parseInt(parseFloat(B92_) * 100000);
	var rpB = (j7_2 - WVd94 + parseInt(strLicenseKey)).toString(16);
	var ie9 = (j7_2 + WVd94).toString(16);
	var H1433 = "";
	if (parseFloat(B92_) < 0) {
		H1433 = "X";
	}
	if (parseFloat(e53) < 0) {
		H1433 = "Y";
	}
	for (var i = 0; i < rpB.length; i++) {
		var k6A36 = parseInt(rpB.charAt(i), 16);
		H1433 += (((k6A36 >= 10) ? (k6A36 + 7) : k6A36) + 10).toString(36);
	}
	H1433 += "z";
	for (var i = 0; i < ie9.length; i++) {
		var k6A36 = parseInt(ie9.charAt(i), 16);
		H1433 += (((k6A36 >= 10) ? (k6A36 + 7) : k6A36) + 10).toString(36);
	}
	H1433 += "U";
	return H1433.toUpperCase();
}

// jiemi
function jiemi(xT) {
	var pk = -1;
	var fE = 0;
	var ub = "";
	var fH = "";
	if (xT != null && parseInt(xT.charAt(0), 36) >= 33) {
		fH = xT.charAt(0);
		xT = xT.substring(1);
	}
	for (var i = 0; i < (xT.length - 1); i++) {
		var n8 = parseInt(xT.charAt(i), 36) - 10;
		if (n8 >= 17) {
			n8 = n8 - 7;
		}
		ub += (n8).toString(36);
		if (n8 > fE) {
			pk = i;
			fE = n8;
		}
	}
	var n9 = parseInt(ub.substring(0, pk), 16);
	var n0 = parseInt(ub.substring(pk + 1), 16);
	if ("X" == fH) {
		n9 = -n9;
	}
	if ("Y" == fH) {
		n0 = -n0;
	}
	v6 = new Array();
	v6[0] = (n9 + n0 - parseInt(strLicenseKey)) / 2;
	v6[1] = (n0 - v6[0]) / 100000;
	v6[0] /= 100000;
	if (v6[0] > 180) {
		v6[0] -= 360;
	}
	return v6[1] + "," + v6[0];
}
function getText(el, tag) {
	var text = "";
	try {
		text = (tag) ? el.getElementsByTagName(tag)[0].firstChild.nodeValue : el.firstChild.nodeValue;
	}
	catch (E) {
	}
	return text;
}
function getAttribute(el, tag, attr) {
	var text = "";
	try {
		text = (tag) ? el.getElementsByTagName(tag)[0].getAttribute(attr) : el.getAttribute(attr);
	}
	catch (E) {
	}
	return text;
}
String.prototype.Trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.LTrim = function () {
	return this.replace(/(^\s*)/g, "");
};
String.prototype.RTrim = function () {
	return this.replace(/(\s*$)/g, "");
};
function HiddenDIV(obj) {
	obj.style.visibility = "hidden";
	obj.style.display = "none";
}
function DisplayDIV(obj) {
	obj.style.visibility = "";
	obj.style.display = "";
}
function Map() {
	var struct = function (key, value) {
		this.key = key;
		this.value = value;
	};
	var put = function (key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	};
	var get = function (key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	};
	var remove = function (key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	};
	var size = function () {
		return this.arr.length;
	};
	var isEmpty = function () {
		return this.arr.length <= 0;
	};
	var clear = function () {
		for(var i=0;i<this.arr.length;i++)
		{
			this.arr[i] = null;
		}
		this.arr.length = 0;
	};
	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.clear = clear;
	this.toArray = function()
	{	
		var array = new Array();
		for (var i = 0; i < this.arr.length; i++) {
			array[i] = this.arr[i].value;
		}
		return array;
	};
}
function List() {
	var struct = function (value) {
		this.value = value;
	};
	var add = function (value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].value === value) {
				return;
			}
		}
		this.arr[this.arr.length] = new struct(value);
	};
	var get = function (i) {
		if (i < this.arr.length && i >= 0) {
			return this.arr[i].value;
		}
		return null;
	};
	var size = function () {
		return this.arr.length;
	};
	var isEmpty = function () {
		return this.arr.length <= 0;
	};
	var clear = function () {
		for(var i=0;i<this.arr.length;i++)
		{
			this.arr[i] = null;
		}
		this.arr.length = 0;
	};
	this.arr = new Array();
	this.get = get;
	this.add = add;
	this.size = size;
	this.isEmpty = isEmpty;
	this.clear = clear;
}

function isNumber(e) {   
    if (document.all) {   
        if ( ((event.keyCode > 47) && (event.keyCode < 58)) ||   
              (event.keyCode == 8) ) {   
            return true;   
        } else {   
            return false;   
        }   
    } else {   
        if ( ((e.which > 47) && (e.which < 58)) ||   
              (e.which == 8) ) {   
            return true;   
        } else {   
            return false;   
        }   
    }   
} 


function objectEval(text) {
	// eval() breaks when we use it to get an object using the { a:42, b:'x' }
	// syntax because it thinks that { and } surround a block and not an object
	// So we wrap it in an array and extract the first element to get around
	// this.
	// The regex = [start of line][whitespace]{[stuff]}[whitespace][end of line]
	text = text.replace(/\n/g, " ");
	text = text.replace(/\r/g, " ");
	if (text.match(/^\s*\{.*\}\s*$/)) {
		text = "[" + text + "][0]";
	}
	return eval(text);
}

function getThirdClients(obj) {
	var retInt;
	if (window != parent && location.search.substring(1).indexOf("ThirdClient=") != -1) {
		var clients = location.search.substring(1).substring(location.search.substring(1).indexOf("ThirdClient=") + 12).split("@");
		if (obj) {
			retInt = parseInt(clients[1]);
		} else {
			retInt = parseInt(clients[0]);
		}
	} else {
		if (obj) {
			retInt = document.body.clientHeight;
		} else {
			retInt = document.body.clientWidth;
		}
	}
	return retInt;
}

function courseToText(course)
{
	var ddd = parseInt(course)%360;
	var dPrompt;
	if(ddd==0)
	{
		dPrompt = "正北";
	}
	else if(ddd<45)
	{
		dPrompt = "北偏东";
	}else if(ddd==45)
	{
		dPrompt = "东北";
	}else if(ddd<90)
	{
		dPrompt = "东偏北";
	}else if(ddd==90)
	{
		dPrompt = "正东";
	} else if(ddd<135)
	{
		dPrompt = "东偏南";
	} else if(ddd==135)
	{
		dPrompt = "东南";
	} else if(ddd<180)
	{
		dPrompt = "南偏东";
	} else if(ddd==180)
	{
		dPrompt = "正南";
	} else if(ddd<225)
	{
		dPrompt = "南偏西";
	} else if(ddd==225)
	{
		dPrompt = "西南";
	} else if(ddd<270)
	{
		dPrompt = "西偏南";
	}else if(ddd==270)
	{
		dPrompt = "正西";
	} 
	else if(ddd<315)
	{
		dPrompt = "西偏北";
	}
	else if(ddd==315)
	{
		dPrompt = "西北";
	}
	else
	{
		dPrompt = "西偏北";
	}
	return dPrompt;
}
	
function alalyseAlarm(record)
{
	var aaa = parseInt(record.alarmType);
	var result = ""
	var temp = aaa>>13;
	if(temp==2)
	{
		result += "开车门报警";
	} 
	else if(temp==1)
	{
		result += "振动报警";	
	}
	
	temp = (aaa&8191)>>10;

	if(temp == 1)
	{
		result += " 越界行驶";	
	}
	else if(temp == 2)
	{
		result += " 越速";	
	}
	else if(temp == 2)
	{
		result += " 停留时间过长";	
	}
	else if(temp == 3)
	{
		result += " 规定时间段外行驶";	
	}
	
	temp = (aaa&1023)>>9;
	if(temp == 1)
	{
		result += " 欠压";	
	}

	temp = (aaa&63)>>5;
	if(temp == 1)
	{
		result += " 抢劫";	
	}

	temp = (aaa&3)>>1;
	if(temp == 1)
	{
		result += " 测试报警";	
	}

	if(result == "")
	{
		result = "无";
	}
	else
	{
		//result += " <a onclick='doAlarm('"+record.deviceId+"');'>处警</a>"
	}
	//alert(result);
	return result;
}

function trackInfo(device,obj)
{
	var content = "<table>";
	content += "<tr><td>车牌号码:"+device.deviceName+"</td></tr>";
	content += "<tr><td>SIM卡号:1"+device.deviceId+"</td></tr>";
	content += "<tr><td>定位时间:"+new DateUtil().Format("yyyy-MM-dd HH:mm:ss",obj.dateTime)+"</td></tr>";
	if(obj.dataVailid==1)
	{
		content += "<tr><td>有效定位:是</td></tr>";
	}
	else
	{
		content += "<tr><td>有效定位:否</td></tr>";
	}
	//setDataValidPrompt(device,obj);
	content += "<tr><td>经纬信息:"+obj.latitude+","+obj.longitude+"</td></tr>";
	content += "<tr><td>速　　度:"+obj.speed+"公里/小时</td></tr>";
	content += "<tr><td>方　　向:"+courseToText(obj.course)+" 方向</td></tr>";
	content += "<tr><td>报　　警:"+alalyseAlarm(obj)+"</td></tr>";
//	content += "<tr><td>司　　机:"+(obj.driver==null?"":obj.driver)+"</td></tr>";
//	content += "<tr><td>证件号码:"+(obj.driverNo==null?"":obj.driverNo)+"</td></tr>";
//	content += "<tr><td>用　　户:"+(device.carOwner==null?"":device.carOwner)+"</td></tr>";
//	content += "<tr><td>当前油量:"+(obj.currentOil==null?"":obj.currentOil)+"</td></tr>";
//	content += "<tr><td>车厢温度:</td></tr>";
//	var opr = ""
//		if(alalyseAlarm(obj)!='无')
//		{
//			opr = " <a href='#' onclick = 'doAlarm(\""+obj.deviceId+"\");'>处警</a>"
//		}
//	opr += " <a href='#' onclick = 'openGoogleMap("+obj.latitude+","+obj.longitude+");'>卫星图</a>"
//	opr += " <a href='#'>点名</a>"
//	opr += " <a href='#' onclick='openDeviceOprLayer("+obj.deviceId+")'>设置</a>"
//	content += "<tr><td>操　　作:"+opr+"</td></tr>";
	content += "</table>";
	return content;
}

function openDeviceOprLayer(deviceId)
{
	
	$('#deviceOperationDailogLayer').dialog('open');
}

function computeAngle(angle)
{
	var value = parseInt(angle)%360;
	var ret = 0;
	if(value>345||value<15)
	{
		ret = 0;
	} 
	else if(value<45)
	{
		ret = 1;
	}else if(value<75)
	{
		ret = 2;
	}else if(value<105)
	{
		ret = 3;
	}
	else if(value<135)
	{
		ret = 4;
	}
	else if(value<165)
	{
		ret = 5;
	}
	else if(value<195)
	{
		ret = 6;
	}
	else if(value<225)
	{
		ret = 7;
	}
	else if(value<255)
	{
		ret = 8;
	}
	else if(value<285)
	{
		ret = 9;
	}
	else if(value<315)
	{
		ret = 10;
	}
	else if(value<345)
	{
		ret = 11;
	}
	
	return ret;
}

function computeScale(lat1, lng1, lat2, lng2)
{
	var mapDistance = GetDistance(lat1, lng1, lat2, lng2)/10;
	var deflevel = 13;
	if(mapDistance>0 && mapDistance<=0.1)
	{
		deflevel = 13;
	}
	else if(mapDistance>0.1 && mapDistance<=0.2)
	{
		deflevel = 12;
	}
	else if(mapDistance>0.2 && mapDistance<=0.4)
	{
		deflevel = 11;
	}
	else if(mapDistance>0.4 && mapDistance<=1)
	{
		deflevel = 10;
	}
	else if(mapDistance>1 && mapDistance<=2)
	{
		deflevel = 9;
	}
	else if(mapDistance>2 && mapDistance<=4)
	{
		deflevel = 8;
	}
	else if(mapDistance>4 && mapDistance<=10)
	{
		deflevel = 7;
	}
	else if(mapDistance>10 && mapDistance<=20)
	{
		deflevel = 6;
	}
	else if(mapDistance>20 && mapDistance<=40)
	{
		deflevel = 5;
	}
	else if(mapDistance>40 && mapDistance<=100)
	{
		deflevel = 4;
	}
	else if(mapDistance>100 && mapDistance<=180)
	{
		deflevel = 3;
	}
	else if(mapDistance>180 && mapDistance<=400)
	{
		deflevel = 2;
	}
	else if(mapDistance>400 && mapDistance<=800)
	{
		deflevel = 1;
	}
	else if(mapDistance>800)
	{
		deflevel = 0;
	}
	return deflevel;
}


function GetDistance(lat1, lng1, lat2, lng2)
{
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
}

function openGoogleMap(lat,lon)
{
	var googleUrl = "http://maps.google.com/maps?f=q&q="+lat+"+"+lon+"&ie=UTF8&om=1";
	window.open(googleUrl,"google_opener","Resizable=no,Toolbar=no,Location=no,Width=1240,Height=650");
}


//写cookies函数 作者：翟振凯
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 15; //此 cookie 将被保存 14 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
