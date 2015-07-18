<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/common.jsp"%>
  
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--命令结果查询-->
<style>
  input
  {
	  height:20px !important;
  }
</style>

 <script>
        $(window).ready(function () {
        	 $("#entityForm").validate(); //初始化验证信息
			 createEditGrid();
					   
		});

		
		function doSubmit()
		{
			$(".commandMsg").html("");
			//var configType = $("#configType").val();
			var vehicleId = "${vehicleId}";
			endEdit();
	        var $dg = $("#dg");
			var checkedOptions=$("input[type='checkbox']:checked");//.val([]);// 此处就获得了选中的项
			var opts = "";
			sep = "";
			checkedOptions.each(function()
			{
				//opts.push($(this).val());
				opts += sep + $(this).val();
				sep = ",";
			});
			var question = $("#question").val();
			var data= $dg.datagrid("getData").rows;
			var errorMsg = "";
			if(question.length == 0)
				errorMsg += "请填写提问问题,";
			if(checkedOptions.length == 0)
				errorMsg += "请选择下发类型,";
			if(data.length == 0)
				errorMsg += "请添加问题答案,";
			if(errorMsg.length > 0)
			{
				$(".commandMsg").html(errorMsg);
				return;
			}

            //if ($dg.datagrid('getChanges').length) 
			//{
                        //var inserted = $dg.datagrid('getChanges', "inserted");
                        //var deleted = $dg.datagrid('getChanges', "deleted");
                        //var updated = $dg.datagrid('getChanges', "updated");

                        
                        var effectRow = {displayOptions:opts, vehicleId:vehicleId,question:question};
                        if (data.length) {
                            effectRow["inserted"] = JSON.stringify(data);
                        }

	                    var url = "<%=ApplicationPath%>/command/sendQuestion.action";
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
                title : '数字ID',
                width : 100,
                editor : "validatebox"
            }, {
                field : 'content',
                title : '答案内容',
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
 <form id="entityForm" method="post" action="<%=ApplicationPath%>/data/sendQuestion.action">
        <input type="hidden"  name="answerList"  id="anwserList" />
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
		<div>
		  <table class="tableblock" width="100%">
		  <tr>
			   <td style="margin-bottom:20px;">提问下发类型:</td>
			   <td>
				 <input type="checkbox" id="" name="displayOption" value="0" />紧急
								<input type="checkbox" id="" name="displayOption" value="3" />终端TTS播读
								<input type="checkbox" id="" name="displayOption" value="4" />广告屏显示 &nbsp;&nbsp;
						</td>
			</tr>
			<tr>
					<td > 问题内容:</td>
					<td>
							<input id="question" name="question" class="required"  value="" maxlength="16" size="20" >
							 <input type="button" class="sendjson" value="发送" onclick="doSubmit();">
							 <br/>
						   <span class="commandMsg"></span></td>
					</td>
			</tr>
			<tr>
			
					
		   </tr>	
		</table>
		
    <table id="dg" title="问题答案选项"></table>
		
		
</form>
  
 </BODY>
</HTML>
