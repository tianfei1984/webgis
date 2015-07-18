var map = new Map();

$(function() {
	$("#listenCmdDialog").show();
	$('#listenCmdDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});
	$('#textInfoCmdDialog').show();
	$('#textInfoCmdDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});
	$('#takePictureDialog').show();
	$('#takePictureDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});

	$('#driverInfoDialog').show();
	$('#driverInfoDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});

	$('#ewayBillDialog').show();
	$('#ewayBillDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});

	$('#runningQueryDialog').show();
	$('#runningQueryDialog').dialog({
		closed : true,
		modal : true,
		width : 450
	});
	$('#emergencyMonitoringDialog').show();
	$('#emergencyMonitoringDialog').dialog({
		closed : true,
		modal : true,
		width : 300
	});
	
	$('#alarmTipDialog').show();
	$('#alarmTipDialog').dialog({
		closed : true,
		modal : true,
		width : 600
	});
	
	$('#alarmRedoDialog').show();
	$('#alarmRedoDialog').dialog({
		closed : true,
		modal : true,
		width : 600
	});
	
	window.setInterval("fetchCommandResult();", 10 * 1000);
});

function fetchCommandResult() {
	var callback = function(data) {
		var prompt = "";
		for ( var i = 0; i < data.length; i++) {
			prompt += data[i].carNo + "[" + data[i].colorText + "]"
					+ data[i].cmdText + ":" + data[i].ackContent + "\n";
			map.remove("1#" + data[i].carId + "#" + data[i].commandId);
		}
		if (prompt != "")
		{
			$.messager.show({
				title:TITLE_MESSAGE,
				msg:prompt,
				timeout:0,
				showType:'fade'
			});
		}
	}
	// alert("map.size="+map.size())
	if (map.size() > 0) {
		var arr = map.toArray();
		var index = "";
		for ( var i = 0; i < arr.length; i++) {
			index += arr[i] + "&";
		}
		// alert("index="+index);
		CommandService.findCommandResult(-1, index, callback);
	}
}

function openListenCmdDialog() {
	$('#listenCmdDialog').dialog('open');

}

function sendListenCmd() {
	var listenTel = $("#telephone").val();
	if (listenTel.trim() == "") {
		alert(PLEASE_INPUT_TELEPHONE);
		return;
	}
	// alert("userId=" + userId + ",selectCarId=" + selectCarId + ",listenTel="
	// + listenTel);
	CommandService.sendListenCmd(userId, selectCarId, listenTel.trim());
	map.put("1#" + selectCarId + "#38145", "1#" + selectCarId + "#38145");
	$('#listenCmdDialog').dialog('close');
}

function openTextInfoCmdDialog() {
	$('#textInfoCmdDialog').dialog('open');
}

function sendTextInfoCmd() {
	var textInfo = $("#textMsgInfo").val();
	if (textInfo.trim() == "") {
		alert(PLEASE_INPUT_TEXTINFO);
		return;
	}
	var priority = $("#textInfoPriority").val();
	// alert("userId="+userId+",selectCarId="+selectCarId+",listenTel="+listenTel);
	map.put("1#" + selectCarId + "#38147", "1#" + selectCarId + "#38147");
	CommandService.sendTextInfoCmd(userId, selectCarId, priority, textInfo
			.trim());
	$('#textInfoCmdDialog').dialog('close');
}

function openGetPictureCmdDialog() {
	$('#takePictureDialog').dialog('open');
}

function sendGetPictureCmd(userId, carId, lensId, size) {
	var lensId = $("#takePictureLensId").val();
	var size = $("#takePictureSize").val();
	CommandService.sendGetPictureCmd(userId, selectCarId, lensId, size);
	map.put("1#" + selectCarId + "#38146", "1#" + selectCarId + "#38146");
	$('#takePictureDialog').dialog('close');
}

function openDriverInfoDialog() {
	$('#driverInfoDialog').dialog('open');
}

function sendDriverQueryCmd() {
	CommandService.sendDriverQueryCmd(userId, selectCarId);
	map.put("1#" + selectCarId + "#37386", "1#" + selectCarId + "#37386");
	$('#driverInfoDialog').dialog('close');
}

function openRunningQueryDialog() {
	$('#runningQueryDialog').dialog('open');
}

function sendRunningQueryCmd() {
//	var startTime = $("#runningQueryStartTime").datetimebox("getValue");
//	if (startTime.trim() == "") {
//		alert(PLEASE_INPUT_STARTTIME);
//		return;
//	}
//	var endTime = $("#runningQueryEndTime").datetimebox("getValue");
//	if (endTime.trim() == "") {
//		alert(PLEASE_INPUT_ENDTIME);
//		return;
//	}
	
	var commandType = $("#runningQueryCommandType").val();
	map.put("1#" + selectCarId + "#38148","1#" + selectCarId + "#38148");
	CommandService.sendRunningQueryCmd(userId, selectCarId,commandType);
	$('#runningQueryDialog').dialog('close');
}

function openAlarmTipDialog()
{
	$('#alarmTipDialog').dialog('open');
}

function sendAlarmTipCmd() {
	var gpsInfoWarnType = $("#gpsInfoWarnType").val();
	var alarmTipTxt = $("#alarmTipTxt").val();
	CommandService.sendAlarmTipCmd(userId, selectCarId, gpsInfoWarnType, alarmTipTxt);
	//map.put("1#" + selectCarId + "#37387", "1#" + selectCarId + "#37387");
	$('#alarmTipDialog').dialog('close');
}

function openEwayBillDialog() {
	$('#ewayBillDialog').dialog('open');
}

function sendEwayBillQueryCmd() {
	CommandService.sendEwayBillQueryCmd(userId, selectCarId);
	map.put("1#" + selectCarId + "#37387", "1#" + selectCarId + "#37387");
	$('#ewayBillDialog').dialog('close');
}

function openEmergencyMonitoringDialog() {
	$('#emergencyMonitoringDialog').dialog('open');
}

function sendEmergencyMonitoringCmd() {
	var endTime = $("#emergencyMonitoringEndTime").datetimebox("getValue");
	if (endTime.trim() == "") {
		alert(PLEASE_INPUT_ENDTIME);
		return;
	}
	CommandService.sendEmergencyMonitoringCmd(userId, selectCarId, endTime
			.replace('[^\d]', ''));
	map.put("1#" + selectCarId + "#38149", "1#" + selectCarId + "#38149");
	$('#emergencyMonitoringDialog').dialog('close');
}

function sendAlarmRedoCmd()
{
	var superior = $("#alarmRedoSupervisor").val();
	var superiorTel = $("#alarmSupervisorTel").val();
	var superiorMail = $("#alarmRedoSupervisorMail").val();
	var row = $('#alarmTable').datagrid("getSelected");
	//alert(row);
	CommandService.sendWarnRedoMessage(userId, row.id, superior,superiorTel,superiorMail);
	$('#alarmRedoDialog').dialog('close');
}

function sendCommand(cmdId)
{
	//alert(cmdId);
	switch(parseInt(cmdId))
	{
	case 0:
		openListenCmdDialog();
		break;
	case 1:
		openTextInfoCmdDialog();
		break;
	case 2:
		openGetPictureCmdDialog();
		break;
	case 3:
		openEmergencyMonitoringDialog();
		break;
	case 4:
		openDriverInfoDialog();
		break;
	case 5:
		openEwayBillDialog();
		break;
	case 6:
		openRunningQueryDialog();
		break
	case 7:
		openAlarmTipDialog();
		break;
	case 8:
		openAlarmRedoDialog();
		break;
	}
}

function openAlarmRedoDialog()
{
	var row = $('#alarmTable').datagrid("getSelected");
	if(row)
	{
	    var obj = warnMsgMap.get(row.id);
	    if(obj.result==-1)
    	{
	    	$('#alarmRedoDialog').dialog('open');
    	}
	    else
	    {
	    	alert(Alarm_Select);
	    }
		
	}
	else
	{
		alert(Alarm_Select);
	}
}