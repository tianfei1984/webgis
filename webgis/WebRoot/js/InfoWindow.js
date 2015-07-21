
InfoWindow = {};

//查看车辆信息
InfoWindow.viewVehicle = function(entityId){
    InfoWindow.open(globalConfig.webPath + "/vehicle/viewVehicle.action?EntityID=" + entityId, 750, 520,"车辆信息");
}

//查看终端信息
InfoWindow.viewTerminal = function(entityId){
    //InfoWindow.openChildWindow(globalConfig.webPath + "/vehicle/viewTerminal.action?EntityID=" + entityId, 700, 370,"终端信息");
    InfoWindow.open(globalConfig.webPath + "/vehicle/viewTerminal.action?EntityID=" + entityId, 700, 370,"终端信息");
}


//查看角色
InfoWindow.viewRole = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/system/viewRole.action?EntityID=" + EntityId, 590, 580);
}

//查看部门信息
InfoWindow.viewDep = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/vehicle/viewDep.action?EntityID=" + EntityId, 650, 400);
}

//用户信息
InfoWindow.viewUser = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/user/viewUser.action?EntityID=" + EntityId, 690, 520);
}


//编辑路线窗口
InfoWindow.viewRoute = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/map/viewRoute.action?EntityID=" + EntityId, 620, 370);
}

//查看线段拐点编辑窗口
InfoWindow.viewSegment = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/map/saveLineSegment.action?input=true&EntityID=" + EntityId, 720, 420);
}

//编辑权限信息
InfoWindow.editFuncInfo = function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/system/viewFunc.action?EntityID=" + EntityId, 650, 310,"权限信息");
}


//编辑驾驶员信息
InfoWindow.editDriverInfo = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/vehicle/editDriverInfo.action?EntityID=" + EntityId, 720, 520,"驾驶员信息");
}

//查看驾驶员信息
InfoWindow.viewDriverInfo = 	function(driverId){
    InfoWindow.open(globalConfig.webPath + "/vehicle/viewDriverInfo.action?driverId=" + driverId, 720, 520);
}

//查看报警信息
InfoWindow.viewAlarm = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/data/viewAlarm.action?alarmId=" + EntityId, 400, 340);
}

//查看围栏信息
InfoWindow.viewEnclosure = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/data/viewArea.action?EntityID=" + EntityId, 720,370);
}

//查看未绑定车辆信息
InfoWindow.viewUnbindVehicle = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/data/getUnbindVehicle.action?enclosureId=" + EntityId, 850,390);
}


//查看业户信息
InfoWindow.viewMember = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/vehicle/viewMember.action?EntityID=" + EntityId, 700,390);
}

//查看基础数据编辑信息
InfoWindow.viewBasicData = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/system/viewBasicData.action?EntityID=" + EntityId, 500,260);
}
//查看信息点播菜单编辑信息
InfoWindow.viewInfoMenu = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/system/viewInfoMenu.action?EntityID=" + EntityId, 500,220);
}

//查看给终端发布的信息
InfoWindow.viewInformation = function (EntityId){
    InfoWindow.open(globalConfig.webPath + "/system/viewInformation.action?EntityID=" + EntityId, 500,220);
}


InfoWindow.newBasicData= function (parentCode){
    InfoWindow.open(globalConfig.webPath + "/system/viewBasicData.action?parent=" + parentCode, 500,260);
}
/**
 * 打开选择车辆的窗口
 */
InfoWindow.selectVehicle = function()
{
	var url = globalConfig.webPath+"/vehicle/selectVehicle!view.action";
	InfoWindow.openChildWindow(url, 765,350,"选择车辆");
}

InfoWindow.selectDep = function()
{
	var url = globalConfig.webPath+"/vehicle/selectDep!view.action";
	InfoWindow.openChildWindow(url, 565,350,"选择部门");
}


//当点击命令按钮或菜单时，弹出命令发送窗口
InfoWindow.openCommandWindow = function(command, vehicleId,title,icon)
{
	var commandPath = globalConfig.webPath;
	//var title = "终端命令";
	//alert(command+","+ vehicleId);
     if(command=="CALL_NOW")
	{
		 //点名
		var url = commandPath + "/command/callTerminal.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 320, 115, title);
	}else if(command == "TERMINAL_MENU")
	{
		//信息点播菜单设置
		var url = commandPath + "/user/viewTerminalMenu.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 400, title);
	}else if(command == "TERMINAL_CONFIG")
	{
		//终端参数配置和查询
		var url = commandPath + "/command/terminalParamTemplate.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 720, 500, title);
	}else if(command == "TERMINAL_TEXT")
	{
		//文本信息下发 
		var url = commandPath + "/command/sendText.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 620, 300, title);
	}else if(command == "LISTEN_TERMINAL")
	{
		//发送监听命令
		var url = commandPath + "/command/listenTerminal.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 480, 220, title);
	}else if(command == "TERMINAL_EVENT")
	{
		//终端事件
		var url = commandPath + "/command/eventConfig.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 400, title);
	}else if(command == "OVER_SPEED_CONFIG")
	{
		//终端超速设置
		var url = commandPath + "/command/overSpeedConfig.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 240, title);
	}else if(command == "TIRED_CONFIG")
	{
		//终端疲劳驾驶设置
		var url = commandPath + "/command/tiredConfig.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 260, title);
	}else if(command == "SEND_INFORMATION")
	{
		//信息服务下发
		var url = commandPath + "/command/sendInformation.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 350, title);
	}else if(command == "MEDIA_UPLOAD")
	{
		//多媒体上传
		var url = commandPath + "/command/mediaUpload.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 400, title);
	}else if(command == "MEDIA_SEARCH")
	{
		//多媒体检索
		var url = commandPath + "/command/mediaSearch.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 500, title);
	}else if(command == "AUDIO_RECORDER")
	{
		//录音
		var url = commandPath + "/command/audioRecorder.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 320, title);
	}else if(command == "PHONE_BOOK")
	{
		//设置电话本
		var url = commandPath + "/command/phoneBook.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 400, title);
	}else if(command == "TAKE_PICTURE")
	{
		// 视频/拍照
		var url = commandPath + "/command/takePicture.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 600, 520, title);
	}else if(command == "SEND_QUESTION")
	{
		//提问下发
		var url = commandPath + "/command/sendQuestion.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 400, title);
	}else if(command == "TEMP_TRACK")
	{
		//临时位置跟踪
		var url = commandPath + "/command/tempTrack.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 250, title);
	}else if(command == "TERMINAL_ENCLOSURE")
	{
		//配置终端区域
		var url = commandPath + "/command/sendEnclosure.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 550, title);
	}else if(command == "TERMINAL_ROUTE")
	{
		//配置线路
		var url = commandPath + "/command/sendRoute.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 550, title);
	}
	else if(command == "VEHICLE_RECORDER")
	{
		//行驶记录仪下发窗口
		var url = commandPath + "/command/vehicleRecorder.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 580, title);
	}else if(command == "VEHICLE_RECORDER_2012")
	{
		//行驶记录仪下发窗口
		var url = commandPath + "/command/vehicleRecorder.action?ver=2012";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 820, 580, title);
	}else if(command == "PLATFORM_COMMAND")
	{
		//809平台命令下发窗口
		var url = commandPath + "/command/sendPlatformCmd.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 370, title);
	}else if(command == "WIRELESS_UPDATE")
	{
		//无线升级窗口
		var url = commandPath + "/command/wirelessUpdate.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 570, title);
	}else if(command == "CONTROL_TERMINAL")
	{
		//终端控制窗口
		var url = commandPath + "/command/controlTerminal.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 320, 190, title);
	}else if(command == "TRANSPARENT_SEND")
	{
		//透明传输命令下发窗口
		var url = commandPath + "/command/transparentSend.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 350, title);
	}else if(command == "DOOR_CONTROL")
	{
		//车辆控制 门控制
		var url = commandPath + "/command/doorControl.action";
        url += "?input=true&vehicleId="+vehicleId;
		InfoWindow.open(url, 520, 180, title);
	}
	else if(command == "REAL_MONITOR")
	{
		//单独监控
		 var url = commandPath + "/"+ mapPath;
		 if(mapPath.indexOf("?") >= 0)
			 url += "&vehicleId=" + vehicleId;
		 else
		     url+= "?vehicleId=" + vehicleId;
	     addTab(title,url,icon);
	}else if(command == "VEHICLE_INFO")
	{		
		//车辆信息
		var url = commandPath + "/vehicle/viewVehicleInfo.action";
        url += "?input=true&vehicleId="+vehicleId;
		  InfoWindow.open(url, 720, 450, title);
	}else if(command == "HISTORY_ROUTE")
	{ 
		title = '历史轨迹';
		addTab(title,url,icon);
		//HistoryRoutePanel.setPlateNo(plateNo);
	}else if(command == "BIND_VEHICLE")
	{
		  var url = commandPath + "/command/getBindEnclosure.action";
        url += "?input=true&vehicleId="+vehicleId;
		  InfoWindow.open(url, 820, 550, title);
	}
}

/**
 * 在弹出窗口的基础上继续弹出子窗口
 */
InfoWindow.openChildWindow = function(url, width, height, title, option){
	/**
	if(window.parent && window.parent.openIFrameChildWindow)
	{
		if(!title)
			title = "编辑窗口";
		window.parent.openIFrameChildWindow(url, width, height,  title);
		return;
	}*/
	
    newoption = "width = "+width+",height="+height+",left="+(window.screen.width-width)/2+",scrollbars=yes,location=no,top="+(window.screen.height-height)/2 ;
	if (option!=null || option != "")
	{
		newoption += ","+option;                                                                     
	}               
	window.open(url, "", newoption);

}

InfoWindow.open = function(url, width, height, title, option){
	
	if(window.parent && window.parent.openIFrameWindow)
	{
		if(!title)
			title = "编辑窗口";
		window.parent.openIFrameWindow(url, width, height,  title);
		return;
	}

    newoption = "width = "+width+",height="+height+",left="+(window.screen.width-width)/2+",scrollbars=yes,location=no,top="+(window.screen.height-height)/2 ;
	if (option!=null || option != "")
	{
		newoption += ","+option;                                                                     
	}               
	window.open(url, "", newoption);

}

