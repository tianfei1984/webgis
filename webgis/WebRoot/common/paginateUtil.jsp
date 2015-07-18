


<head>
<meta http-equiv="Expires" content="0" />  
<meta http-equiv="Cache-Control" content="no-cache, no-store" /> 
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="X-UA-Compatible" content="IE=8" />

<%
   String ApplicationPath = request.getContextPath() ;
   String jsPath = ApplicationPath+"/js";
   String imgPath =  ApplicationPath+"/image";
%>
	<script>

//全局的javascript配置
	var globalConfig = {webPath:"<%=ApplicationPath%>"};
  </script>

<link href="<%=ApplicationPath%>/css/FormTable.css" rel="stylesheet" type="text/css" />

	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/icon.css">

    <script type="text/javascript" src="<%=jsPath%>/jquery/jquery1.8.min.js"></script>

<script type="text/javascript" src="<%=ApplicationPath%>/js/easyUI/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=jsPath%>/easyui-lang-zh_CN.js"></script>
    
   <script src="<%=jsPath%>/InfoWindow.js" type="text/javascript" ></script>  
   <script src="<%=jsPath%>/utility.js" type="text/javascript" ></script>  
   <script src="<%=jsPath%>/jquery/jquery.form.js" type="text/javascript"></script> 
<style>
           .btnExport
		   {
			   background: url(<%=ApplicationPath%>/image/paper.png) no-repeat; padding-left:18px;
		   }
		</style>

		<script>

//全局的javascript配置
   $(document).ready(function()
	 {   
		$.ajaxSetup({ 
		cache: false 
		});

		$("#btnReset").click(function()
		 {
			$("#queryForm")[0].reset();
			$(':input[name="depId"]').val("");//清空特殊的部门下拉框
		 });
	 });

	 //刷新数据表格
	function refreshTable()
	{
		$("#btnQuery").click();
	}

</script>