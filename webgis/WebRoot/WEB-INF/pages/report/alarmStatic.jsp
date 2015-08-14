<%@ page language="java" pageEncoding="UTF-8"%>

<%@ include file="/common/taglibs.jsp"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>

<style>
.innertable{
border-collapse: collapse;
border:0px;
font-size:12px;
}


 </style>
</head>

		<script type="text/javascript" charset="utf-8">

		    
			
			function getdynamicColumns()
			{
				 var initColumns = [
						{ "field": "plateNo", "title":"车牌号", "width": "60"},
						{ "field": "plateColor", "title":"车牌颜色", "width": "60"},
						{ "field": "depName", "title":"车组", "width": "100" }
				  ];
				jQuery(".alarmcheckbox:checked").each(function(){ //由于复选框一般选中的是多个,所以可以循环输出选中的值  
				   
					initColumns.push({"field":$(this).val(), "title":$(this).attr("id")});  
				}); 
				//initColumns.push({ "mData": "staticDate","sTitle":"统计日期" });
				return initColumns;
			}

			function createGrid(data)
			{
				var columns = getdynamicColumns();
				var grid=	$("#grid");	
				grid.datagrid({
							columns: [columns],
							//height: 165,
							//url: treeUrl,
							method: 'POST',
							fit:true,
							toolbar:"#toolbar",
							queryParams: { 'id': 2 },
							idField: 'plateNo',
							striped: true,
							fitColumns: true,
							singleSelect: true,
							rownumbers: true,
							pagination: true,
							nowrap: true,
							pageSize: 20,
							pageList: [20, 20, 50, 100, 150, 200],
							showFooter: true
						});
				
				grid.datagrid("loadData",data);
				return grid;
			}

			function excelExport()
			{
				//验证要统计的报警类型是否选择
				var checkedAlarms = $("input[name='alarmType']:checked");
							if(checkedAlarms.length == 0)
							{
								alert("请选择报警类型");
								return false;
							}
				Utility.excelExport('<%=ApplicationPath%>/data/alarmStaticExport.action');
			}

			function submitForm()
			{
				$("#queryForm").ajaxSubmit({
						beforeSubmit:function(){
							var checkedAlarms = $("input[name='alarmType']:checked");
							if(checkedAlarms.length == 0)
							{
								$.messager.alert("提示","请选择报警类型");
								return false;
							}
						},
						success:function(result)
						{
							if(result.success)
							{
								createGrid(result.data);
							}else
							{
								$.messager.alert("提示","统计发生错误:"+result.message);
							}
						}
					});
			}
			var first = true;
			$(document).ready(function() {
			      //对应数据库SQL查询的字段名
			    
                      $(".datepicker").today();//设置当前日期
				 
					  $("#intervalType").lookup({category:"ReportType"}); //统计类型下拉框
				 
			     //创建下拉部门树
				Utility.createDepTree("depId");

					Utility.ajaxSubmitForm("queryForm", {
						beforeSubmit:function(){
							var checkedAlarms = $("input[name='alarmType']:checked");
							if(checkedAlarms.length == 0)
							{
								$.messager.alert("提示","请选择报警类型");
								return false;
							}
						},
						success:function(result)
						{
							if(result.success)
							{
								createGrid(result.data);
							}else
							{
								$.messager.alert("提示","统计发生错误:"+result.message);
							}
						}
					});
				   //报警类型全选
				   $('#checkall').click(function(event) {  //on click 
						if(this.checked) { // check select status
							$('.alarmcheckbox').each(function() { 
								this.checked = true;               
							});
						}else{
							$('.alarmcheckbox').each(function() { 
								this.checked = false;              
							});         
						}
					});

					$('.alarmcheckbox').change(function() { 
						             var alarmTypeName = "";
									 var sep = "";
								      $("input[name='alarmType']:checked").each(function() { 
											alarmTypeName += $(this).attr("id") + sep;     
											sep = ",";
									        //alert(alarmTypeName);
									  });
									  $("#alarmTypeName").val(alarmTypeName);
							});
   

			} );
		</script>
<body>	
		<div id="toolbar">
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/alarmStatic.action" method=POST>
			   <input type="hidden" name="queryId" value="selectAlarmStatic" />	
			   <input type="hidden" id="alarmTypeName"  name="alarmTypeName" value="" />		   
			  <table width="100%"  class="TableBlock">
			   			   <tr>
			   <td> 车牌号码: </td>
			    <td>			    <input type="text" name="plateNo" size="15"  id="plateNo">   </td>
            <td>车辆组:</td>
			    <td>			
				<select id="depId" name="depId" style="width:200px;"></select>
				</td>
            </tr>

	<tr>
            <td>统计报警:</td>
	   <td colspan=3>
	   <table class="innertable">
	      <tr>
	     <%
		    int m = 1;
		 %>
		<s:iterator value="alarmTypeList" id="at" status="ls">  
	       <td><input type="checkbox" name="alarmType" value="${at.alarmType}" id="${at.name}" class="alarmcheckbox"/>${at.name}</td>
		   <%
		       if(m % 7 == 0){
				   m = 0;
			%>
			   </tr>
			   <tr>
			<%
			}
			   m++;
			%>
		</s:iterator>  
		<%		    
			int colspan = 8- m;
		%>
		<td style="color:blue;font-weight:bold;" colspan="<%=colspan%>"><input type="checkbox" id="checkall" name="checkall">全选</td>
		</tr>
		</table>
	   </td>

	</tr>
	 <tr>
			   <td> 统计日期 </td>
			    <td >			    
			    <input type="text" id="startDate" name="startDate" size="15"  class="datepicker">
              <!-- 至<input type="text" name="endDate" size="15"   class="datepicker"> -->   </td>
             
        <td  align="left" colspan=2>
	       <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="submitForm();">查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/alarmStaticExport.action');">导出</a><!--调用utility.js-->
        </td>
    </tr>
		</table>
		</form>	 
	</div>

			<div id="grid"></div>
</body>

