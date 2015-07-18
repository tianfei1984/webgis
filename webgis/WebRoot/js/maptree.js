

MapTree = {};

MapTree.deleteUrl = "";


MapTree.onClick = function(node)
{
     var vehicleId = node.id;
	 if(node.leaf )
	 {
		 var lat = node.attributes.lat;
		 var lng = node.attributes.lng;
		 MyMap.getMapHandler().setCenter(lat,lng);
	 }
}

MapTree.refresh = function()
{
	this.treeManager.tree('reload');
}

//创建地图区域树
MapTree.createTree = function()
{
	var me = this;
	 this.treeManager = $("#mapTree");
	$("#btnReloadMapTree").click(function()
	{
		me.refresh();
	});
	
	$("#btnDeleteArea").click(function()
	{
		var idArray = [];
		var nodes = me.treeManager.tree('getChecked');
        var s = '';
        for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var id = node.id;
			if(node.leaf)
			{
				//var id = strId.substring(1);
				idArray.push(id);
			   // s += strId.substring(1)+",";
			}
        }
		if(idArray.length > 0)
		{
			$.messager.confirm('确认','你确定要删除区域吗?',function(r){
				if (r){
					me.deleteAreas(idArray);
				}
			});
		}else
		{
			$.messager.alert('提示','请选择要删除的区域!');
		}

	});
	
	$("#btnBindArea").click(function()
	{
        var node = this.treeManager.tree('getSelected');
		var url =  globalConfig.webPath + "/map/enclosureBinding.action";
		InfoWindow.open(url, 860,600,"围栏绑定");
	});



	var treeUrl = globalConfig.webPath + "/map/getMapTree.action";
	this.treeManager.tree({checkbox:true,lines:true,url:treeUrl, 
						onCheck:function(node,checked)
						{
							//me.onCheck(node,checked);
						},
						onClick:function(node,checked)
						{
							me.onClick(node,checked);
						},
						onContextMenu: function(e,node){
							e.preventDefault();
							$(this).tree('select',node.target);
							//不是车辆节点，不弹出右键菜单
							if(node.id.indexOf("v") < 0)
								return;
							treeRightMenu.menu('show',{
								left: e.pageX,
								top: e.pageY
							});
					   }
					});

}

/**
  * 删除围栏
  * nodeIds 围栏ID的数组[1,45]的形式
  */
MapTree.deleteAreas = function(nodeIds)
{
	var selectIds=""; //要删除的id,以逗号隔开组成字符串，发送给后台
	$.each(nodeIds,function(m, nodeId)
	{
		selectIds += nodeId+",";
	});
	var url = globalConfig.webPath + "/map/deleteAreas.action";
	var params = {enclosureIds:selectIds};
	var me = this;
	 $.ajax({
            type: "POST",
            url: url,
			data:params,
			error:function(){
			   //alert("网络连接错误，无法读取数据!");
               //Utility.done();
			},
            success: function(result){		 
								if(result.success == false)
								{ 
										$.messager.alert('提示', '删除失败:'+result.message); 

								}else
								{
									//后台确认删除数据库记录后，删除地图上的图元
										$.each(nodeIds, function(m, nodeId)
										{
											 MyMap.getMapHandler().removeMapArea(nodeId);
										});
										
										me.refresh();	//刷新树

										//me.deleteAreas(idArray);//删除地图的围栏图元
										$.messager.alert('提示', '删除成功!'); 
								}
							}
	 }
	);

}


MapTree.checkAllChildNode = function(node, checked)
{
   // node.expand();  
    node.checked = checked;  
	 if(node.data.leaf)
		 return;
      node.eachChild(function (child) {  
        //child.set('checked', checked);  
		child.checked = checked;
        //child.fireEvent('checkchange', child, checked);   
	    if(child.data.leaf ==false)
		    checkAllChildNode(child, checked);
      });  
}
