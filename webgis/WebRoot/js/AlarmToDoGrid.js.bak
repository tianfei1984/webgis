
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
                    { title: '车组', field: 'depName', width: 100,minWidth:40 },
                    { title: '报警来源', field: 'warnSrc', width: 100,minWidth:100 },
                    { title: '报警类型', field: 'warnType', width: 100,minWidth:100 },
                    { title: '报警时间', field: 'warnTime', width: 120,minWidth:120 },
                    { title: '处理', field: 'status', width: 90,minWidth:80 },
                    { title: '督办截至时间', field: 'supervisionEndTime', width: 120,minWidth:40 },
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
