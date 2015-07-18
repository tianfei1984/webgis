


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
	var globalConfig = {webPath:"<%=ApplicationPath%>"}
</script>

<!--表单验证信息显示风格
    <link rel="stylesheet" type="text/css" media="screen" href="<%=ApplicationPath%>/css/screen.css" />
<link rel="stylesheet" type="text/css"  href="<%=ApplicationPath%>/css/TableList.css" />
 -->
<link href="<%=ApplicationPath%>/css/FormTable.css" rel="stylesheet" type="text/css" />
<!--按钮风格-->
<link href="<%=ApplicationPath%>/css/button.css" rel="stylesheet" type="text/css" />

	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=ApplicationPath%>/js/easyUI/themes/icon.css">

<script type="text/javascript" src="<%=jsPath%>/jquery/jquery1.8.min.js"></script>

<script type="text/javascript" src="<%=ApplicationPath%>/js/easyUI/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=jsPath%>/easyui-lang-zh_CN.js"></script>

<script src="<%=jsPath%>/InfoWindow.js" type="text/javascript" ></script>  
<script src="<%=jsPath%>/utility.js" type="text/javascript" ></script>  
<script src="<%=jsPath%>/jquery/jquery.form.js" type="text/javascript"></script> 
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.validate.js"></script><!--表单数据验证-->
<script type="text/javascript" src="<%=jsPath%>/jquery/jquery.metadata.js"  charset="UTF-8"></script><!--表单数据验证-->


<script>
   $(document).ready(function()
	 {   
		 
		$.ajaxSetup({ 
		cache: false 
		});
      //判断消息提示是否有内容，如果有内容就显示，否则就隐藏
	  var messageTip = $(".MessageFromServer");
	  if(messageTip)
		 {
			  var htmlContent = messageTip.html();
			  if(!htmlContent || htmlContent.length == 0)
				  $(".MessageFromServer").hide();
		 }
  });
 

</script>

<style>
     .MessageFromServer
	 {
          color:#330099;font-weight:bold;font-size:20px !important;
		  padding-left:20px;
		  background-image: url(<%=ApplicationPath%>/image/icon16_info.png);
          background-repeat: no-repeat;
		  margin-left:20px;
	 }

	td img{
       cursor:hand;
	}
</style>