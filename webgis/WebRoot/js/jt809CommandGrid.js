//809政府平台数据监控表格
//不断获取上级平台下发的命令数据，显示在表格中
Jt809CommandGrid = {};
Jt809CommandGrid.create = function()
{
    this.jt809Grid=	$("#jt809Grid");	
    var url = globalConfig.webPath+'/command/queryJT809Command.action';
    this.jt809Grid.datagrid({
                columns: [[
                    { title: '命令类型', field: 'cmdType', width: 80,minWidth:50 },
                    { title: '类型描述', field: 'subDescr', width: 200,minWidth:80 },
                    { title: '车牌号', field: 'plateNo', width: 90,minWidth:40 },
                    { title: '颜色', field: 'plateColor', width: 60,minWidth:40 },
                    { title: '命令内容', field: 'cmdData', width: 320,minWidth:270 },
                    { title: '状态', field: 'status', width: 90,minWidth:80 },
                    { title: '下发时间', field: 'createDate', width: 120,minWidth:40 },
                    { title: '执行时间', field: 'updateDate', width: 120,minWidth:40 }
                    ]],
                //height: 165,
				url: url,
				fit:true,
				method: 'POST',
				striped: true,
				toolbar:'#jt809GridToolbar',
				fitColumns: true,
				singleSelect: true,
				rownumbers: true,
				pagination: true,
				onDblClickRow:this.onDblClickRow,
				nowrap: true,
				pageSize: 10,
				pageList: [10, 20, 50, 100, 150, 200],
				showFooter: true
            });
	 this.refreshInterval = 10;
	 this.timerName = "jt809CommandDataTimer";
	 var strInterval = this.refreshInterval + 's';
	 var me = this;
	 $('body').everyTime(strInterval, this.timerName,function(){
		//do something...
		//me.refresh();//更新模式
	 });
	 //连接主链路
	 $('#btnConnectMainLink').click(function()
		{
			me.sendRequest(0x1001);
		}
	 );
	 //请链路注销
	 $('#btnCloseMainLinkRequest').click(function()
		{
			me.sendRequest(0x1003);
		   
		}
	 );
	 //主链路断开通知消息
	 $('#btnCloseMainLinkNotify').click(function()
		{
			me.sendRequest(0x1007);
		}
	 );
	 //下级平台主动关闭主链路通知消息
	 $('#btnCloseLinkNotify').click(function()
		{
			me.sendRequest(0x1008);
		}
	 );
	 
	 $("#jt809Export").click(function(){
			var url = globalConfig.webPath+"/data/excelExport.action?queryId=selectJT809Command";
			//Excel下载地址
			$("#queryForm").attr("action",url); 
			$("#queryForm").attr("method","POST"); 
			$("#queryForm").attr("target","_blank"); //弹屏下载
			document.getElementById("queryForm").submit();
			$("#queryForm").attr("action",""); //恢复到原来的查询地址
			$("#queryForm").attr("target",""); 
		});
	 
	 return this.jt809Grid;
	
}


//双击表格，弹出报警处理窗口，提请用户处理报警
Jt809CommandGrid.onDblClickRow = function(rowIndex, rowData)
{
	var strType = rowData.subCmd;
	var cmdId = rowData.cmdId;
	if(strType == 0x9301) //查岗请求，弹出查岗的窗口
	{
		var url = globalConfig.webPath+"/command/postQuery.action?commandId="+cmdId;
		InfoWindow.open(url, 630,350,"上级平台查岗");
	}else if(strType == 0x9302) //查岗请求，弹出查岗的窗口
	{
		var url = globalConfig.webPath+"/command/postQuery.action?commandId="+cmdId;
		InfoWindow.open(url, 630,350,"平台间报文");
	}
}


Jt809CommandGrid.sendRequest = function(cmd)
{
	var params = {linkCmd:cmd};//链路命令
    var url = globalConfig.webPath+'/command/send809Request.action';
	$.getJSON(url, params, function(result)
	{
		if(result.success)
		{
			$.messager.alert("提示","对上级平台的请求已下发");
		}else
		{
			$.message.alert("提示","下发失败:"+result.message);
		}
	});
}



/**
* 定时发送ajax请求，更新表格,
* 如有表格中有对应的车辆就更新
* 如果没有该车辆，就增加一套
*/
Jt809CommandGrid.refresh = function()
{
	if(!this.update == false)
		return;
	var me = this;
    
	this.jt809Grid.datagrid("load");
}
