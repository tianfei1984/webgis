<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
  
<!--easyui的主题css-->


<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--命令结果查询-->
<!--[if lt IE 9]>
    <script src="<%=jsPath%>/json2.js"></script>
<![endif]-->


<style>
  input
  {
	  height:20px !important;
  }
</style>

 <script>
        $(window).ready(function () {
        	
	       $("#entityForm").validate(); //初始化验证信息
        	
		
			$(".sendjson").click(function()
			 {
				   //var gridData = eTable.getJsonData();
				   //alert(gridData);
				   //$("#eventList").val(gridData);
				  
				 
			 });

			 createEditGrid();
			// var defaultConfigType = ${configType}; //默认的菜单设置类型
			//ajax填充下拉框数据
			 $("#configType").lookup({category:"TerminalEvent", selectedValue:2});
					   
		});

		function doSubmit()
		{
			var configType = $("#configType").val();
			var vehicleId = "${vehicleId}";
			endEdit();
	        var $dg = $("#dg");
            //var inserted = $dg.datagrid('getChanges', "inserted");
			var data= $dg.datagrid("getData").rows;
			if(data.length ==0)
			{
				$(".commandMsg").html("请录入事件项");
				return;
			}
                        //var deleted = $dg.datagrid('getChanges', "deleted");
                        //var updated = $dg.datagrid('getChanges', "updated");

                        
                        var effectRow = {configType:configType, vehicleId:vehicleId};
                        if (data.length) {
                            effectRow["inserted"] = JSON.stringify(data);
                        }

	                    var url = "<%=ApplicationPath%>/command/eventConfig.action";
                        $.get(url, effectRow, function(result) {
                            if(result.success){
                                var commandId = result.data; //下发成功后，获取到命令Id
								TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
                                $dg.datagrid('acceptChanges');
                            }else
							{
								$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
							}
                        }, "JSON").error(function() {
                            
									//$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
                        });
            //}
		}
</script>
<script>
   function  createEditGrid()
   {
	    var $dg = $("#dg");
        $dg.datagrid({
            url : "servlet/list",
			fitColumns: true,
			rownumbers:true,
            columns : [ [ {
                field : 'ID',
                title : '事件ID',
                width : 100,
                editor : "validatebox"
            }, {
                field : 'content',
                title : '事件内容',
                width : 200,
                editor : "validatebox"
            } ] ],
            toolbar : [ {
                text : "添加",
                iconCls : "icon-add",
                handler : function() {
                    $dg.datagrid('appendRow', {});
                    var rows = $dg.datagrid('getRows');
                    $dg.datagrid('beginEdit', rows.length - 1);
                }
            }, {
                text : "编辑",
                iconCls : "icon-edit",
                handler : function() {
                    var row = $dg.datagrid('getSelected');
                    if (row) {
                        var rowIndex = $dg.datagrid('getRowIndex', row);
                        $dg.datagrid('beginEdit', rowIndex);
                    }
                }
            }, {
                text : "删除",
                iconCls : "icon-remove",
                handler : function() {
                    var row = $dg.datagrid('getSelected');
                    if (row) {
                        var rowIndex = $dg.datagrid('getRowIndex', row);
                        $dg.datagrid('deleteRow', rowIndex);
                    }
                }
            }]
        });
   }
   
        function endEdit(){
	        var $dg = $("#dg");
            var rows = $dg.datagrid('getRows');
            for ( var i = 0; i < rows.length; i++) {
                $dg.datagrid('endEdit', i);
            }
        }

</script>
 <BODY>
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
		事件设置类型:&nbsp;&nbsp;<select id="configType" name="configType"  style="width: 150px;"></select>&nbsp;&nbsp;
		
						   <input type="button" class="sendjson" value="发送" onclick="doSubmit();">
						   <span class="commandMsg"></span></td>
		
    <table id="dg" title="事件类型"></table>
		
		
  
 </BODY>
</HTML>
