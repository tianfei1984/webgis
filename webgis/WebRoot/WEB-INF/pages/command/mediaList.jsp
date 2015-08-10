
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/common.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
  
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.timers.js"></script><!--定时器-->
<script type="text/javascript" src="<%=jsPath%>/terminalCommand.js"></script><!--终端命令结果查询-->
</head>

		<script type="text/javascript" charset="utf-8">
		 
var mediaId = -1;
//当检索命令执行成功时
function onSearchSuccess(result)
{
	
	var queryGrid = $("#queryGrid");
	var ack = result.data;
	if(ack.data)
	{
		mediaId = -1;
		$(".commandMsg").html(ack.status);
		 queryGrid.datagrid("loadData",{rows:ack.data});
	}
}

//当上传多媒体终端命令执行成功时
function onUploadCommandSuccess(result){		
				  var data = result.data;
					 //停止所有的在$('body')上定时器  
					 $('body').stopTime ();  
					$(".sendjson").val("发送命令");
					$('.sendjson').attr("disabled",false);
					 $(".commandMsg").html(data.status);
					 if(data.fileName )
					 {
				          var picturePath = "<%=ApplicationPath%>/vehiclePicture/"; 
						  picturePath += data.fileName;
						 //$("#imgPic").attr("src", picturePath);
						 var html = "<a href='"+ picturePath + "' style='font-weight:bold'>上传成功,右键另存文件:"+data.fileName+"</a>";
						 $(".commandMsg").html(html);
					 }
		  }


function uploadSingle()
{
	if(mediaId < 0)
	{
		$.messager.alert("提示","请选择多媒体记录");
		return;
	}
	var params = {mediaId:mediaId,saveType:0,vehicleId:'${vehicleId}'};
	var url = "<%=ApplicationPath%>/command/mediaSingleUpload.action";
	$.getJSON(url, params, function(result)
	{
		if (result.success) {
			var commandId = result.data; //下发成功后，获取到命令Id
			TerminalCommand.commandButton = $("#btnUploadSingle");
			var url = "<%=ApplicationPath%>/command/getPictureResult.action";
			TerminalCommand.times=100;
			TerminalCommand.startQueryResult(commandId,url,onUploadCommandSuccess);//命令下发成功,根据命令id,开始尝试获取检索结果

			//TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
		}else {
			$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
			//停止所有的在$('body')上定时器  
			$('body').stopTime ();  
	    }

	});
}

function deleteSingle()
{
	if(mediaId < 0)
	{
		$.messager.alert("提示","请选择多媒体记录");
		return;
	}
	var params = {mediaId:mediaId,saveType:1,vehicleId:'${vehicleId}'};
	var url = "<%=ApplicationPath%>/command/mediaSingleUpload.action";
	$.getJSON(url, params, function(result)
	{
		if (result.success) {
			var commandId = result.data; //下发成功后，获取到命令Id
			TerminalCommand.commandButton = $("#btnDeleteSingle");
			TerminalCommand.startQueryResult(commandId);//命令下发成功,根据命令id,开始尝试获取检索结果
		}else {
			$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
			//停止所有的在$('body')上定时器  
			$('body').stopTime ();  
	    }

	});
}

function selectMedia(_mediaId)
{
	mediaId = _mediaId;
}

//编辑列
			function getRadioColumn(value, rowData, rowIndex)
			{
				var mediaId = rowData.mediaDataId;
				var html =   '<input type="radio" name="selectRadio" onclick="selectMedia(' + mediaId + ');"    value="' + mediaId + '" />';
				return html;

			}
			
			function getCodeFormatColumn(value, rowData, rowIndex)
			{
				if(value == 0)
					return '图像';
				else if(value == 1)
					return '音频';
				else 
					return '视频';
			}
			
			function getCodeTypeColumn(value, rowData, rowIndex)
			{
				if(value == 0)
					return "平台下发指令";
				else if(value == 1)
					return "定时动作";
				else if(value == 2)
					return "抢劫报警";
				else if(value == 3)
					return "碰撞侧翻报警";
				else 
					return "其他";
			}

			$(document).ready(function() {
				 $("#entityForm").validate(); //初始化验证信息

				 var defaultRoleId = "";//${roleId}; //取出当前车辆的车牌颜色，默认选中
				//ajax填充下拉框数据 填充监听类型 选项
				 $("#eventType").lookup({category:"MediaEvent", selectedValue:1});
				 $("#mediaType").lookup({category:"MediaType", selectedValue:1});

				 var now = Utility.today(1);
				 var strDate = now + " 23:59:00";
				  $("#endDate").datetimebox('setValue', strDate);	
				  var now = Utility.today();
				 strDate = (now + " 00:00:00");
				  $("#startDate").datetimebox('setValue', strDate);	

	             Utility.ajaxSubmitForm("entityForm", {
						 success:function(responseText)
						 {
							   var result = responseText;
								if (result.success) {
									 //alert("命令已经下发,请等待处理!");
									 var commandId = result.data; //下发成功后，获取到命令Id
			                         TerminalCommand.commandButton = $("#btnSearch");									 
                                     var url = "<%=ApplicationPath%>/command/queryMediaInfo.action";
									 TerminalCommand.startQueryResult(commandId,url,onSearchSuccess);//命令下发成功,根据命令id,开始尝试获取检索结果
								}
								else {
									$(".commandMsg").html("提交失败! 错误原因：" + (result.message ? result.message : result.Data));
									//停止所有的在$('body')上定时器  
									$('body').stopTime ();  
								  }
						 }
				 });
			} );
		</script>
<body>
		<div id="toolbar" >		
			
		<form id="entityForm" name="entityForm" 
			action='<%=ApplicationPath%>/command/mediaSearch.action' method="POST">
				
        <input type="hidden"  name="vehicleId"  id="vehicleId" value="${vehicleId}"/>
  <table width="100%"  class="TableBlock">
					<tbody><tr>
						<td colspan="6" style="font-weight: bold; background: #EFEFEF;" height="25">多媒体文件检索
						<span style="color:red;background:blue;">${message}</span>
						</td>
					</tr>
					<tr>
						<td align="right">多媒体类型
							:</td>
						<td><select id="mediaType"  style="width: 150px;" name="mediaType">
						   </select></td>
						<td align="right">通道
							:</td>
						<td>
						 <select id="channel" name="channel">
						    <option value="1">通道1</option>
						    <option value="2">通道2</option>
						    <option value="3">通道3</option>
						    <option value="4">通道4</option>
							</select>
							</td>
					
						<td align="right">事件类型
							:</td>
						<td><select id="eventType"  style="width: 150px;" name="eventType">
						   </select></td>
					</tr>
					<tr>
						<td align="right">开始日期:</td>
						<td >
						 <input class="easyui-datetimebox" name="startDate" id="startDate" required style="width:160px" value=""></input>
							
						</td>
						<td align="right">结束日期:</td>
					    <td>
						 <input class="easyui-datetimebox" name="endDate" id="endDate" required style="width:160px" value=""></input>
						</td>
						<td colspan=2></td>
					

						
					</tr>
					<tr>
					  <td colspan=6>
					      <input type="submit" class="sendjson" id="btnSearch" value="检索">
					      <input type="button"  id="btnUploadSingle" value="上传所选多媒体" onclick="uploadSingle();">
					      <input type="button" id="btnDeleteSingle"  value="删除所选多媒体" onclick="deleteSingle();">
						  <span class="commandMsg"></span> 
					  </td>

				</tbody></table>
				</form>
			</div>	
				<table id="queryGrid" class="easyui-datagrid" 
						data-options="singleSelect:true,rownumbers:true,striped:true,fitColumns: true,fit:true,toolbar:'#toolbar',
						url:'',method:'post'">
					<thead>
						<tr>
							<th data-options="field:'1',formatter:getRadioColumn" width="7%">选择</th>
							<th data-options="field:'mediaDataId'" width="10%">多媒体ID</th>
							<th data-options="field:'sendTime'" width="20%">时间</th>
							<th data-options="field:'eventCode',formatter:getCodeTypeColumn" width="15%">事件类型</th>
							<th data-options="field:'channelId'" width="15%">通道号</th>
							<th data-options="field:'codeFormat',formatter:getCodeFormatColumn" width="20%">多媒体类型</th>							
						</tr>
					</thead>
					<tbody>
						
					</tbody>					
				</table>
</body>

