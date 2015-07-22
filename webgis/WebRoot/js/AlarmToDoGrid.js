
//报警督办列表
AlarmToDoGrid = {}

AlarmToDoGrid.create = function()
{
    var url = globalConfig.webPath+'/data/msgTodoReqList.action';
	this.alarmToDoGrid=	$("#alarmToDoGrid");	
    this.alarmToDoGrid.datagrid({
                columns: [[
                    { title: '车牌号', field: 'plateNo', width: 80,minWidth:80 },
                    { title: '颜色', field: 'plateColor', width: 60,minWidth:60 },
                    //{ title: '车组', field: 'depName', width: 100,minWidth:40 },
                    { title: '报警来源', field: 'warnSrc', width: 100,minWidth:100 },
                    { title: '报警类型', field: 'warnType', width: 100,minWidth:100 },
                    { title: '报警时间', field: 'warnTime', width: 120,minWidth:120 },
                    { title: '处理', field: 'ackFlag', width: 90,minWidth:80 ,formatter:getTodoStatus},
                    { title: '督办截至时间', field: 'supervisionEndtime', width: 120,minWidth:40 },
                    { title: '督办级别', field: 'supervisionLevel', width: 60,minWidth:40 },
                    { title: '督办人', field: 'supervisor', width: 90,minWidth:40 },
                    { title: '电子邮件', field: 'supervisorEmail', width: 90,minWidth:40 },
                    { title: '联系电话', field: 'supervisorTel', width: 90,minWidth:40 }
                    ]],
                //height: 199,
				url: url,
				fit:true,
			    toolbar:"#alarmToDoGridToolbar",
				method: 'POST',
				queryParams: { 'id': 2 },
				onDblClickRow:this.onDblClickRow,
				idField: 'plateNo',
				striped: true,
				fitColumns: false,
				singleSelect: true,
				rownumbers: true,
				pagination: true,
				nowrap: true,
				pageSize: 10,
				pageList: [10, 20, 50, 100, 150, 200],
				showFooter: true
            });
	 this.refreshInterval = 10;
	 this.timerName = "AlarmToDoGridTimmer";
	 var me = this;
	//是否自动刷新，如果是就启动定时器
	 $('#autoRefresh809AlarmGrid').change(function() {
        var autoRefresh = $(this).is(":checked");
		me.refresh(autoRefresh);
    });
     return this.alarmToDoGrid;
	
}
//督办处理状态
function getTodoStatus(value, rowData, rowIndex)
{  
	var online = rowData.ackFlag;
	var html = online == "0" ? "<span style='color:red'>未处理</span>" : "<span style='color:green;font-weight:bold;'>已处理</span>";
    return html;
}

//双击表格，弹出报警处理窗口，提请用户处理报警
AlarmToDoGrid.onDblClickRow = function(rowIndex, rowData){
	if(rowData.ackFlag == '0'){
		var url = globalConfig.webPath+"/command/warnMsgTodo.action?msgId="+rowData.id;
		InfoWindow.open(url, 500,540,"上级平台报警督办消息");
	}
}

/**
* 定时发送ajax请求，更新表格,
* 如有表格中有对应的车辆就更新
* 如果没有该车辆，就增加一套
*/
AlarmToDoGrid.refresh = function(autoRefresh)
{
	var me = this;
	if(autoRefresh)
	{
		me.alarmToDoGrid.datagrid('load');
	    var strInterval = this.refreshInterval + 's';
		 $('body').everyTime(strInterval, this.timerName,function(){
			 me.alarmToDoGrid.datagrid('load');
		 });
	}else
		$('body').stopTime(this.timerName);
}
