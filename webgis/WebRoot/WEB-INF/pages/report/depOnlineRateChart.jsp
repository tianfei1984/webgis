<%@ page language="java" pageEncoding="UTF-8"%>
<!--分页查询共用的页面-->
<%@ include file="/common/paginateUtil.jsp"%>
<!--日期控件-->
<%@ include file="/common/dateUtil.jsp"%>

</head>

   <script src="<%=jsPath%>/jquery/jquery.form.js" type="text/javascript"></script> 
<script src="<%=jsPath%>/highcharts.js"></script>
<script src="<%=jsPath%>/highcharts_exporting.js"></script>
		<script type="text/javascript" charset="utf-8">
			
function createChart(depName,xSet, ySet)
{
	$('#chartContainer').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: depName+'企业上线率'
        },
        xAxis: {
            categories: xSet,
            title: {
                text: "小时"
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '上线率',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '上线率',
            data: ySet,
			dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });
}
			

			$(document).ready(function() {
				 
					  $("#intervalType").lookup({category:"ReportType"}); //统计类型下拉框
				 
				$("#btnQuery").click(function(){
				        Utility.loadGridWithParams();
				});
				//创建下拉部门树
				Utility.createDepTree("depId");
				  $("#chartDate").today();
				  $("#intervalType").change(function()
				{
				       var txt = $("#intervalType").find("option:selected").text(); 
					   $("#intervalTypeName").val(txt);
				});
				$('#queryForm').form({
					onSubmit: function(){
						var depId = $(':input[name="depId"]').val();
						
						if(!depId|| depId == 0)
						{
							$.messager.alert("提示","请选择车组");
							return false;
						}
						//return $(this).form('validate');
					},
					success:function(rs){
						var result = eval('(' + rs + ')'); 
						var xSet = [];//X轴数据集  
						var ySet = [];//Y轴数据集 
						if(result.success)
						{
							var depName="";
							$.each(result.data,function(i,rowData)
							{
								var hour = rowData.stHour;
								var onlineRate = rowData.onlineRate;
								var depName = rowData.depName;
								xSet.push(hour);
								ySet.push(onlineRate);
							});
							xSet.reverse();
							ySet.reverse();
							createChart(depName,xSet,ySet);//创建图表
						}
					}
			   });
			   
				$("#btnQuery").click(function(){
					$('#queryForm').form('submit');
				});

			} );
		</script>
<body>
		<div id="toolbar">		
			
			<form id="queryForm" action="<%=ApplicationPath%>/report/depOnlineRateChart.action">
			   <input type="hidden" name="queryId" value="selectDepartmentOnlineRate" />	   
			   <input type="hidden" name="fileName" value="企业上线率统计" />	     	 
			   <input type="hidden" name="intervalTypeName" id="intervalTypeName" value="所有" />	       
			  <table width="100%"  class="TableBlock">
			   			   <tr>
            <td>车辆组:</td>
			    <td>			
				<select id="depId" name="depId" style="width:200px;" required="true" class="required"></select>
				</td>
            <td>统计类型</td>
			    <td>	<select id="intervalType"  name="intervalType"></select>   </td>
            </tr>
 <tr>
			   <td> 统计日期 </td>
			    <td >			    <input type="text" name="chartDate" id="chartDate" size="15"  class="datepicker">   </td>
             
        <td  align="left" colspan=2>
	      <a id="btnQuery" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>&nbsp;
		   <a id="btnReset" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" >重置</a>&nbsp;
		   <a id="btnExport" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" onclick="Utility.excelExport('<%=ApplicationPath%>/data/excelExport.action');">导出</a><!--调用utility.js-->
        </td>
    </tr>
		</table>
		</form>	 
		
  </div>
  
<div id="chartContainer" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</body>

