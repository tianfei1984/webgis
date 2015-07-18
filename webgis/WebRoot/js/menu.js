/**
 *菜单类
 *创建主菜单、右键菜单和命令工具栏
 */
MyMenu = {};
/**
 * 创建主菜单
 */
MyMenu.createMainMenu = function(mainMenuData)
{
	$.each(mainMenuData, function (i, sm) {
			    if(sm.items)
			    {
					var childmenu = "<div id='mc" + i + "' style='width: 160px;' data-options='onClick:MyMenu.onMainMenuClick'>";
					$.each(sm.items, function (j, o) {
						childmenu += "<div id='mcm" + i + j + "' iconCls='"+o.icon+"' data-options=\"name:'" + o.url + "',iconCls:'"+o.icon+"'\" >" + o.text
						+ "</div> ";
					});
					childmenu += "</div>";
					menulist = "<a href=\"#\" id='mb" + i + "' class=\"easyui-menubutton\" data-options=\"menu:'#mc" + i + "',iconCls:'"+sm.icon+"'\">" + sm.text + "</a>";
					//创建一级菜单
					$("#menuList").append($(childmenu));
					$("#topMenu").append($(menulist));
					var ddlMenu = $('#mb' + i).menubutton();
				}
		     }
		);
		var targetObj = $("#topMenu");
		$.parser.parse(targetObj);

}
	
	/**
	 * 创建快捷菜单
	 */
MyMenu.createShortCutMenu = function(shortCutMenu)
	{
		$.each(shortCutMenu, function (i, sm) {
					var linkbutton =  "<a onclick=\"addTab('"+sm.text +"','"+ sm.url+"','"+sm.icon+"')\" class='easyui-linkbutton'  href='#' data-options=\"iconCls:'"+sm.icon+"',plain:true\">"+sm.text+"</a>";
					$("#toolbar").append($(linkbutton));
		     }
		);
		var targetObj = $("#toolbar");
		 $.parser.parse(targetObj);
	}


	//车辆树的右键菜单数据
MyMenu.createCommandToolBar = function(cmdMenu)
	{
		$.each(cmdMenu, function (i, sm) {
			var menuName = sm.text;
			var menuCode = sm.funcName;
			var linkbutton =  "<a onclick=\"MyMenu.onCommandToolbarClick('"+menuCode +"','"+ menuName+"')\" class='easyui-linkbutton'  href='#' data-options=\"iconCls:'"+sm.icon+"',plain:false\">"+sm.text+"</a>";
			$("#commandToolbar").append($(linkbutton));
			$("#commandToolbar").append($("<span style='width:10px;'></span>"));
			
        });
		
		 $.parser.parse($("#commandToolbar"));		
		return $("#commandToolbar");
	}

	//车辆树的右键菜单数据
MyMenu.createRightMenu = function(rightMenuData)
	{

		if(rightMenuData.length == 0)
			return;
		var me = this;
		$.each(rightMenuData, function (i, sm) {
			var menuName = sm.text;
			var menuCode = sm.funcName;			
			var icon = sm.icon;
			$('#rightMenu').menu('appendItem', {
					text: sm.text,
					iconCls: sm.icon,
					onclick: function(){
						me.onRightMenuClick(menuCode,menuName,icon);//菜单点击事件
					}
				});
        });
		return $("#rightMenu");
	}

//主菜单点击事件
MyMenu.onMainMenuClick = function(item)
	{
		//item 的相关属性参见API中的menu
		var url = item.name;
		
	    //var menuCode = item.funcName;	
		if(item.text == "百度地图")
		{
			var mapType = "baidu";
			MyMenu.setMapPath(mapType);
		}else if(item.text == "四维地图")
		{
			var mapType = "smart";
			MyMenu.setMapPath(mapType);
		}else
		{
		   addTab(item.text, url, item.iconCls);
		}
	}
 //加载百度地图页面
MyMenu.setMapPath = function(mapType) {
		if(mapType == globalConfig.mapType)
			return;
		var mapPath = globalConfig.webPath+"/map/"+mapType+".jsp";
		globalConfig.mapPath = mapPath;
	    globalConfig.mapType = mapType;

		var url = globalConfig.webPath+"/user/setMapType.action";
		var params = {mapType:mapType};
		$.getJSON(url, params,function()
		{
            $("#mapFrame").attr("src", mapPath);		
	        $("#routeMapFrame").attr("src", mapPath);
		});
    }

    //右键菜单点击事件
MyMenu.onRightMenuClick = function(menuCode, menuName,icon)
	{
		var node = VehicleTree.getSelected();
		var vehicleId = node.id.substring(1);
		var title = menuName + "["+node.text + "]";
		InfoWindow.openCommandWindow(menuCode,vehicleId,title,icon);
	}
	//命令工具栏点击事件
MyMenu.onCommandToolbarClick = function(menuCode, menuName)
	{
		//var node = VehicleTree.getSelected();
		var vehicleId = RealDataGrid.selectedVehicleId;
		if(vehicleId == 0)
		{
			$.messager.alert('提示', '车牌号不能为空!');
			return;
		}
		var title = menuName + "["+ RealDataGrid.selectedPlateNo + "]";
		InfoWindow.openCommandWindow(menuCode,vehicleId,title);
	}



	
