
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
</head>

		<script type="text/javascript" charset="utf-8">
//查询命令执行结果
function onCommandSuccess(result)
{		
					 //停止所有的在$('body')上定时器  
					 $('body').stopTime ();  
					 $(".commandMsg").html("命令执行结果:"+result.message);
					 if(result.message && result.message == "命令执行成功")
					 {
						 //alert(result.message);
						 var vehicleId = "${vehicleId}";
						 parent.MyMap.showVehicleOnMap(vehicleId);
						 parent.closeCommandWindow();
					 }else
					 {
				        $("#btnReload").show(vehicleId);
					 }
					 /**
				}else {
					if(times == 1)
				   {
						// alert("命令执行超时，没有返回结果,请重新查询");
						 $(".commandMsg").html("命令执行超时，没有返回结果!");
					    $('body').stopTime ();  
						
				        $("#btnReload").show();
				   }else
					{
					     //最多执行5次
						 $('body').oneTime('500ms', timerName,function(){  
								 queryResult(commandId); //查询命令的返回结果
						});
					}
					
				}*/
}


			$(document).ready(function() {
	             Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
								if (result.success) {
									 //alert("命令已经下发,请等待处理!");
									 var commandId = result.data; //下发成功后，获取到命令Id
									 TerminalCommand.times=100;
									 TerminalCommand.startQueryResult(commandId,null,onCommandSuccess);//命令下发成功,根据命令id,开始尝试获取检索结果
								}
								else {
									$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
								 }
						 }
				 });
				 $("#entityForm").submit();
				 $("#btnReload").hide();
			} );
		</script>
<body>
		<div id="container" >		
			
		<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/callTerminal.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="6" style="font-weight: bold; background: #EFEFEF;" height="25">
						<span class="commandMsg">开始发送点名命令</span>
						<input type="button" value="重新执行" id="btnReload" onclick="window.location.reload();"/>
						</td>
					</tr>
				
				</tbody></table>
				</form>

		

</body>

