AlarmGrid = {};

AlarmGrid.sound=true;//报警声音默认打开
AlarmGrid.popup = true;//弹窗默认打开
AlarmGrid.refreshInterval = 5;
AlarmGrid.displayTime = null;
AlarmGrid.autoRefresh = false;
AlarmGrid.popNum = 0;
AlarmGrid.showVehicleOnMap = false;
AlarmGrid.maxPopupNum = 20;//最多弹窗的报警条数，超过后，前面的要清除避免占用内存

AlarmGrid.create = function()
{
    $('#alarmWindow').window('close');//初始化时，隐藏报警弹屏窗口
	this.alarmDataGrid=	$("#alarmDataGrid");	
	var url = globalConfig.webPath+"/report/processedAlarmList.action";
    this.alarmDataGrid.datagrid({
                columns: [[
                    { title: '车牌号', field: 'plateNo', width: 80,minWidth:80 },
                    { title: '所属车组', field: 'depName', width: 120,minWidth:80 },
                    { title: '颜色', field: 'plateColor', width: 60,minWidth:60 },
                    { title: '报警类型', field: 'alarmType', width: 100 },
                    { title: '报警来源', field: 'alarmSource', width: 70,minWidth:80 },
                    { title: '报警时间', field: 'startTime', width: 120,minWidth:100 },
                    { title: '报警地点', field: 'location', width: 300,minWidth:300 },
                    { title: 'Sim卡号', field: 'simNo', width: 110,minWidth:120 },
                    { title: '处理状态', field: 'processed', width: 80,minWidth:80 },
                    { title: 'id', field: 'id', width: 60,minWidth:60 }
                    ]],
                //height: 165,
				url: url,
				method: 'POST',
				fit:true,
			    toolbar:"#alarmGridToolbar",
				queryParams: { 'queryId': 'selectProcessedAlarms' },
				idField: 'id',
				striped: true,
				loadMsg:'',
				fitColumns: true,
				singleSelect: true,
				rownumbers: true,
				pagination: true,
				nowrap: true,
				pageSize: 10,
				onDblClickRow:this.onDblClickRow,
				pageList: [10, 20, 50, 100, 150, 200],
				showFooter: true
            });
	 //this.refreshInterval = 10;
	 this.timerName = "alarmTimer";
	 var strInterval = this.refreshInterval + 's';
	 this.params = {queryId:"selectProcessedAlarms"};
	 var me = this;
	 //定时刷新报警消息
	 $('body').everyTime(strInterval, this.timerName,function(){
		//do something...
		
		me.refreshNewAlarm();//更新模式
	 });

	// var basicDataUrl = globalConfig.webPath + "/data/basicData.action";
	var comboboxId = "alarmType";
	 Utility.easyCombobox(comboboxId,{category:"AlarmType"});
	 comboboxId = "alarmSrc";
	 Utility.easyCombobox(comboboxId,{category:"AlarmSource"});

	 $("#muteAlarmSound").click(function()
		{
		     var checked = $(this).attr("checked")=="checked";
			 AlarmGrid.sound = checked != true;
			 AlarmSound.enable(AlarmGrid.sound);
		});
	 $("#disableAlarmWindow").click(function()
		{
		     var checked = $(this).attr("checked")=="checked";
			 AlarmGrid.popup = checked != true;
		});
	 $("#autoRefreshAlarmGrid").click(function()
		{
		     var checked = $(this).attr("checked")=="checked";
			 me.autoRefresh = checked;
			 if(checked)
			{
				 me.alarmDataGrid.datagrid('load',me.params);
			}
		});

	

	$("#btnQueryAlarmData").click(function()
		{
		    var plateNo = $("#alarmPlateNo").val();
		    var alarmType = $('#alarmType').combobox('getValue');
		    var alarmSrc = $("#alarmSrc").combobox('getValue');
			me.params = {plateNo:plateNo, alarmType:alarmType,alarmSource:alarmSrc,queryId:"selectProcessedAlarms"};
			
		    me.alarmDataGrid.datagrid('load',me.params);
		});

	$("#btnResetAlarm").click(function()
		{
		    $("#alarmPlateNo").val('');
		    $('#alarmType').combobox('setValue','');
		    $("#alarmSrc").combobox('setValue','');
			me.params = {queryId:"selectProcessedAlarms"};
			
		    me.alarmDataGrid.datagrid('load',me.params);
		});


		return alarmDataGrid;
}
//双击表格，弹出报警处理窗口，提请用户处理报警
AlarmGrid.onDblClickRow = function(rowIndex, rowData)
{
	var alarmId = rowData.id;
	var url =globalConfig.webPath  + "/data/viewAlarm.action?alarmId="+ alarmId;
	InfoWindow.open(url, 400, 340, "报警处理");
}


//添加报警数据
AlarmGrid.addNewAlarm = function(alarmData){
		//此处需要判断表格的行数，如果超过100行，要全部情况
		if(alarmData.platformState)
		{
			//更新809政府平台的主连接和从连接的状态
			var ps = alarmData.platformState;
			var src = globalConfig.webPath + "/image/no.png";
			if(ps.mainLinkState == "已建立连接" || ps.mainLinkState == "连接成功")
			{
				src =  globalConfig.webPath + "/image/ok.png";
			} else{
				src =  globalConfig.webPath + "/image/no.png";
			}
			$("#mainLinkState").attr("src",src);
            src = globalConfig.webPath + "/image/no.png";
			if(ps.subLinkState == "已建立连接" || ps.subLinkState == "连接成功")
			{
				src =  globalConfig.webPath + "/image/ok.png";
			} else {
				src =  globalConfig.webPath + "/image/no.png";
			}
			$("#subLinkState").attr("src",src);
			//Ext.getCmp("lbl_mainLinkState").setText(ps.mainLinkState);
			//Ext.getCmp("lbl_subLinkState").setText( ps.subLinkState);
		}
		//最新的报警数据列表，数组
		var me = this;
		var soundEnabled = false;
		var needPopup = false;
		if(alarmData.alarm && alarmData.alarm.length > 0)
		{			
			if(me.autoRefresh)
			   me.alarmDataGrid.datagrid('load',me.params);
		    //var alarmStore = Ext.data.StoreManager.lookup('s_alarmStore');
			var alarmArray = alarmData.alarm;
			$.each(alarmArray, function (i, alarm) {
					var rowCount = me.alarmDataGrid.datagrid("getRows").length;
					if(alarm.popupEnabled)
				    {
					   me.updateNotify(alarm); //弹出报警窗口
					   needPopup=true;
					}
					//是否弹出报警声音,后台报警设置菜单中配置某一报警类型是否有声音
				    if(alarm.soundEnabled)
					  soundEnabled = true;
			}); 
			
			var lastAlarm = alarmArray[alarmArray.length - 1];
			if(me.showVehicleOnMap)
			{
			    MyMap.showVehicleOnMap(lastAlarm.vehicleId); //调用main.jsp的jS方法,显示车辆在地图中心
			}
			if(soundEnabled)
		        AlarmSound.play();//报警声音打开
		}
		//上级平台的下发的命令消息
		if(alarmData.jt809Notify && alarmData.jt809Notify.length > 0)
		{
			var alarmArray = alarmData.jt809Notify; //数据结构参见: AlarmAction类的查询输出
			 //单纯的遍历数组 				
			$.each(alarmArray, function (i, alarm) {
				//809通知下发,不进行声音报警
				var notify = {startTime:alarm.createDate,plateNo : alarm.subDescr, alarmType:alarm.subType, alarmTypeDescr:alarm.cmdData};				
				me.updateNotify(notify); //弹出报警窗口					
			    needPopup=true;

				var strType = ""+alarm.subType;
				if(strType == "0x9301") //查岗请求，弹出查岗的窗口
				{
					var url = globalConfig.webPath+"/command/postQuery.action?commandId="+alarm.cmdId;
					InfoWindow.open(url, 630,350,"上级平台查岗");
				}else if(strType == "0x9302") //平台间报文请求，弹出查岗的窗口
				{
					var url = globalConfig.webPath+"/command/postQuery.action?commandId="+alarm.cmdId;
					InfoWindow.open(url, 630,350,"平台间报文");
				}
			});
		}

		//终端消息
		if(alarmData.jt808Notify && alarmData.jt808Notify.length > 0)
		{
			var alarmArray = alarmData.jt808Notify; //数据结构参见: AlarmAction类的查询输出
			
			$.each(alarmArray, function (i, alarm) {//单纯的遍历数组    
				//808通知下发,不进行声音报警
				MyMap.showVehicleOnMap(alarm.vehicleId); 
				var notify = {startTime:alarm.createDate,plateNo : alarm.subDescr, alarmType:alarm.cmdType, alarmTypeDescr:alarm.cmdData};				
				me.updateNotify(notify); //弹出报警窗口				
			    needPopup=true;
			});
		}

		//报警督办请求
		if(alarmData.warnMsgTodoReq && alarmData.warnMsgTodoReq.length > 0)
		{
			var alarmArray = alarmData.warnMsgTodoReq; //数据结构参见: AlarmAction类的查询输出
			
			$.each(alarmArray, function (i, alarm) { //单纯的遍历数组    
				//809通知下发,不进行声音报警
				var notify = {startTime:alarm.warnTime,plateNo : (alarm.plateNo+"报警督办"), alarmType:alarm.warnType, alarmTypeDescr:alarm.warnType};				
				me.updateNotify(notify); //弹出报警窗口				
			    needPopup=true;

				var url = globalConfig.webPath+"/command/warnMsgTodo.action?msgId="+alarm.id;
				InfoWindow.open(url, 500,540,"上级平台报警督办消息");
			});
		}
		//弹出报警提示框口
		if(needPopup)
		   me.popNotifyWindow();//弹出窗口
}

		
AlarmGrid.refreshNewAlarm = function()
{
	var url = globalConfig.webPath+"/data/alarm.action";
	var me = this;
	var params = {};
	 $.ajax({
            type: "POST",
            url: url,
			data:params,
			error:function(){
			   
			},
            success: function(data){
			   var result =  data;
			   if(result.success)
			   {
				   		
					if(me.popNum > me.maxPopupNum)
					{
						me.closeWindow();//累计条数超过限制，清空避免占用内存
					}

				   me.addNewAlarm(result.data);
				   //延时关闭窗口
				   if(me.displayTime)
				   {
						var now = new Date();
						var interval = now - me.displayTime;
						interval = 0.001 * interval;
						if(interval > 10)
					   {
							me.closeWindow();
					   }
				   }

			   }else
			   {
				   window.location = globalConfig.webPath+"/data/logout.action";
			   }
            }
        });
}

/**
var tpl = new Ext.Template(//定义模板  
    '<table  border=0 cellpadding=10 cellspacing = 10>',  
    '<tr><td>车牌号:</td><td>{plateNo}</td><td >报警类型:</td><td style="color:red;">{alarmType}</td></tr>',  
    '<tr><td>行驶速度:</td><td>{velocity}Km/h</td><td>报警时间:</td><td>{startTime}</td></tr>',  
    //'<tr><td></td><td>{2}</td></tr>',  
    '</table>'  
) ; */
//var tpl = new Ext.Template( '[{startTime}]:[{plateNo}]   <span class="alarm_{alarmType}"> {alarmTypeDescr}</span>') ;

var notifyWindow;
AlarmGrid.updateNotify = function(alarm)
{
	this.popNum += 1;
	 var alarmContent = alarm.startTime+':  ['+alarm.plateNo +']<span class="'+alarm.alarmType+'" style=\'color:blue\'>'+alarm.alarmTypeDescr + '</span>';
	 alarmContent += "<br/>";
	 $("#alarmBox").prepend(alarmContent);
}
AlarmGrid.closeWindow = function()
{
	this.popNum = 0;
    $('#alarmWindow').window('close');
	this.clearWindow();
}


AlarmGrid.popNotifyWindow = function(alarm)
{
	//如果禁止弹窗，则直接返回，不再打开窗口
	if(AlarmGrid.popup == false) 
		return;
	if(notifyWindow == null)
	{
		notifyWindow = $('#alarmWindow').window({
			title: '车辆报警消息',
			width: 320,
			height: 200,
			top: ($(window).height() - 200),
			left: ($(window).width() - 320),
			shadow: false,
			modal: false,
			iconCls: 'icon-alarm',
			closed: true,
			minimizable: false,
			maximizable: false,
			collapsible: true
		});
	}

    $('#alarmWindow').window('open');
	this.displayTime = new Date();//更新窗口的显示时间，便于延迟加载
	//var alarmContent = alarm.alarmTypeDescr;//tpl.applyTemplate(alarm);
//notifyWindow.update(alarmContent); //根据数据，填充模板，再更新到窗口上
    //console.log(alarmContent);
    //notifyWindow.show();
	if(alarm)
	  this.updateNotify(alarm);

}

//清除报警窗口中的内容
AlarmGrid.clearWindow = function()
{
	$("#alarmBox").empty();
	this.popNum = 0;
}

	

