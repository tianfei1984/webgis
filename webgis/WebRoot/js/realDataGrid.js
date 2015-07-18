RealDataGrid = {};
RealDataGrid.selectVehicleIds="";//需要刷新的车辆id
//表格当前选中的实时数据的车辆Id及车牌号
RealDataGrid.selectedVehicleId = 0;
RealDataGrid.selectedPlateNo = '';
RealDataGrid.realDataList = [];//实时数据加载到内存中，进行内存分页
RealDataGrid.rowIndexMap = {};//根据实时数据ID,找到内存数组realDataList的索引
RealDataGrid.update = false;

//点击数据表格的行时，显示地图车辆
RealDataGrid.onClickRow = function(rowIndex, rowData)
{
	var plateNo = rowData.plateNo;
	var vehicleId = rowData.vehicleId;
	MyMap.showVehicleOnMap(vehicleId);
	RealDataGrid.selectedVehicleId = vehicleId;
	RealDataGrid.selectedPlateNo = plateNo;
	$("#realDataPlateNo").val(plateNo);
}
/**
 * 当用户点击车辆树的时候，设置车牌号和Id
 */
RealDataGrid.setPlateNo = function(plateNo, vehicleId)
{
	$("#realDataPlateNo").val(plateNo);
	this.selectedPlateNo = plateNo;
	this.selectedVehicleId = vehicleId;
}

/**
* 定时发送ajax请求，更新表格,
* 如有表格中有对应的车辆就更新
* 如果没有该车辆，就增加一套
*/
RealDataGrid.refresh = function(update)
{
	if(!this.selectVehicleIds || this.selectVehicleIds.length == 0)
		return;
	var me = this;
	var url = globalConfig.webPath+"/vehicle/refreshRealData.action";
	var params = {update:update};	 
     $.ajax({
            type: "POST",
            url: url,
			data:params,
			error:function(){
			   //alert("网络连接错误，无法读取数据!");
               //Utility.done();
			},
            success: function(data){
				//var gridData = {Rows:data};
				var records = data.rows;
				if(records == null)
					return;
	            var start = new Date();
				if(update == false)
				{
					MyMap.clearAllVehicle();
					me.rowIndexMap = {};
					//第一次全部加载
					me.realDataList = records;//保存在内存中，进行分页
					
					for(var m = 0; m < records.length; m++)
					{
						var record = records[m];
						me.rowIndexMap[record.vehicleId] = m;
					}
					
				}else
				{
					//没有要更新的实时数据
					if(records.length == 0)
						return;
					//第一次全部加载后，转入更新模式，即只从后台查询到有更新的实时数据，减少流量
					for(var m = 0; m < records.length; m++)
					{
						var record = records[m];
						var index = me.rowIndexMap[record.vehicleId];
						if(index != null)
						{
						   me.realDataList[index] = record;//更新内存记录
						}
						/**
					    var plateNo = record.plateNo;
						var index = me.realDataGrid.datagrid('getRowIndex',plateNo);
						me.realDataGrid.datagrid('updateRow',{
							index: index,
							row: record
						});*/
					}					
				}
				var selectedRow = me.realDataGrid.datagrid("getSelected");
				if(selectedRow!=null && update )
				{
				   var plateNo = selectedRow.plateNo;
				   var index = me.realDataGrid.datagrid('getRowIndex',plateNo);
				   me.realDataGrid.datagrid('selectRow',index);
				}

				me.realDataGrid.datagrid("loadData",me.realDataList);
				
				$.each(records, function(i,record)
				{
					if(record.latitude > 0 && record.longitude > 0)
					{
						MyMap.createMarkerByGpsData(record);
					}
				});

				/**
				if(data.success == false && data.message){
					alert("操作发生错误! 错误原因:"  + data.Message);

				}*/
                var end = new Date();
	            var interval = 0.001 * (end - start) ;

	            //if(console)
	              //  console.log("载入"+records.length+"条数,耗时:"+ interval+"秒");
                
            }
        });


}

function formatOnlineState(val,row){
	        
			if (val){
				var onlineImage = globalConfig.webPath+"/image/power_on.png";
				return '<img src="'+onlineImage + '" />';
			} else {
				var offlineImage = globalConfig.webPath+"/image/power_off.gif";
				return '<img src="'+offlineImage + '" />';
			}
		}

/**
 * 内存分页的过滤器函数。
 * 指定easyui的pagerFilter为此函数，达到内存分页的目的
 */
		function pagerFilter(data){
			if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
				data = {
					total: data.length,
					rows: data
				}
			}
			var dg = $(this);
			var opts = dg.datagrid('options');
			var pager = dg.datagrid('getPager');
			pager.pagination({
				onSelectPage:function(pageNum, pageSize){
					opts.pageNumber = pageNum;
					opts.pageSize = pageSize;
					pager.pagination('refresh',{
						pageNumber:pageNum,
						pageSize:pageSize
					});
					dg.datagrid('loadData',data);
				}
			});
			if (!data.originalRows){
				data.originalRows = (data.rows);
			}
			var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
			var end = start + parseInt(opts.pageSize);
			data.rows = (data.originalRows.slice(start, end));
			return data;
		}



RealDataGrid.create = function()
{
	this.update = false;
	var treeUrl = globalConfig.webPath+"/vehicle/refreshRealData.action";
//绑定数据列表 //align: 'left' 控制对齐方式
	 this.realDataGrid=	$("#realDataGrid");	
    this.realDataGrid.datagrid({
                columns: [[
                    { title: '车牌号', field: 'plateNo', width: 80,minWidth:80 },
                    { title: '所属车组', field: 'depName', width: 120,minWidth:80 },
                    { title: 'Sim卡号', field: 'simNo', width: 120,minWidth:80 },
                    { title: '颜色', field: 'plateColor', width: 40,minWidth:40 },
                    { title: '在线', field: 'online', width: 40,minWidth:40,formatter:formatOnlineState },
                    { title: '时间', field: 'sendTime', width: 120,minWidth:120 },
                    { title: '位置', field: 'location', width: 240,minWidth:240 },
                    { title: '状态', field: 'status', width: 80,minWidth:80 },
                    { title: '速度', field: 'velocity', width: 40,minWidth:40 },
                    { title: '脉冲速度', field: 'recordVelocity', width: 40,minWidth:40 },
                    { title: '方向', field: 'directionDescr', width: 80,minWidth:80 },
                    { title: '里程', field: 'mileage', width: 60,minWidth:60 },
                    { title: '油量', field: 'gas', width: 60,minWidth:60 },
                    { title: '有效性', field: 'valid', width: 40,minWidth:40 },
                    { title: '海拔', field: 'altitude', width: 40,minWidth:40 },
                    { title: '经度', field: 'longitude', width: 90, isSort: false,minWidth:80 },
                    { title: '纬度', field: 'latitude', width: 90, isSort: false,minWidth:80 },
                    { title: 'ID', field: 'vehicleId', width: 0, isSort: false,minWidth:0 }
                    ]],
				fit:true,
			    toolbar:"#commandToolbar",
				//url: treeUrl,
				method: 'POST',
				queryParams: { 'id': 2 },
				idField: 'plateNo',
				striped: true,
				fitColumns: false,
				singleSelect: true,
				rownumbers: true,
				pagination: true,
				loadFilter:pagerFilter, //内存分页，必须要指定过滤器
				nowrap: true,
				pageSize: 50,
				pageList: [10, 20, 50, 100, 150, 200],
				showFooter: true,
				onClickRow:function(rowIndex, rowData)
		        {
					me.onClickRow(rowIndex, rowData);
				}
            });
	 this.refreshInterval = 10;
	 this.timerName = "realdataTimer";
	 var strInterval = this.refreshInterval + 's';
	 var me = this;
	 $('body').everyTime(strInterval, this.timerName,function(){
		//do something...
		me.refresh(true);//更新模式
	 });
	 
return this.realDataGrid;

}

