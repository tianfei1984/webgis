
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
   String ApplicationPath = request.getContextPath() ;
   String jsPath = ApplicationPath+"/js";
   String imgPath =  ApplicationPath+"/image";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>星通车辆卫星监控系统</title>
<link rel="Shortcut Icon" href="./logo.jpg" />
<link rel="icon" href="./logo.jpg" type="image/x-icon" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<style type="text/css">
   * {
	 margin: 0;
	 padding: 0;
   }
  .loginPageBody{ background: url(<%=ApplicationPath%>/image/loginimgbg.jpg); background-position: top;}
  .loginLogo {
		width: 266px;
		height: 45px;
		margin: 0 auto;
		background: url(<%=ApplicationPath%>/image/logo_login.png);
		_background: none;
	}
	.welcome {
		color: #2477b3;
		font-family: "微藕", Tahoma, sans-serif;
		font-size: 30px;
		font-weight: bold;
		padding: 6px 0;
		padding-top: 0px;
		padding-left: 20px;
		letter-spacing: 1px;
		text-align: center;
		margin-bottom:10px;
	}
	.welcome2 {
		color: #2477b3;
		font-family: "微藕", Tahoma, sans-serif;
		font-size: 18px;
		font-weight: bold;
		padding: 6px 0;
		padding-top: 10px;
		padding-left: 20px;
		letter-spacing: 1px;
		text-align: center;
	}
	.loginBar {
		width: 345px;
		padding-top: 80px;
		padding-left: 50px;
		font-size: 14px;
	}
	.lable {
		padding-top: 3px;
		width: 90px;
		float: left;
		color: #333333;
		font-size: 14px;
		text-align: right;
	}
	.inputWrap {
		background: url(<%=ApplicationPath%>/image/loginInputWrapbg.gif) no-repeat left top;
		height: 28px;
		line-height: 16px;
		border: none;
		width: 200px;
		float: left;
	}
	input.inputText {
		background: transparent none;
		border: none;
		margin-top: 3px;
		_margin-top: 1px;
	}
	
	.inputWrap .inputText {
		width: 192px;
		height: 20px;
		font-size: 14px;
		padding-left: 6px;
		margin-top: 0px;
		padding-top: 4px;
	}
	
	input.inputTextHover {
		background: transparent none;
		border: none;
	}
	
	input.inputTextFocus {
		background: transparent none;
	}
	
	input[type="text"], input[type="password"] {
		color: #336699;
	}
	input[type="text"]:hover,input[type="password"]:hover {
		background: transparent none;
	}
	input[type="text"]:focus,input[type="password"]:focus {
		background: transparent none;
	}
	.logintable tr{
		height:40px;
	}
	#loginBtnWrap {
		margin-left:180px;
		background:url(<%=ApplicationPath%>/image/loginbtn.gif); 
		height:34px;
		width:100px;
	}
	#loginBtn {
		color: #ffffff;
		font-size: 14px;
		line-height: 32px;
		text-align: center;
		word-spacing: 1px;
		letter-spacing: 6px;
		text-decoration: none;
		padding-left:30px;
	}

</style>
<script>

    function doValidate()
	{
            var userstr=document.getElementById("username").value;
            var psd=document.getElementById("password").value;
            var rd=document.getElementById("randomCode").value;
			var message = document.getElementById("message");
			var trmessage = document.getElementById("trmessage");
			if (!userstr.match(/^\S{2,20}$/)) { 
				trmessage.style.display="";
				message.innerHTML="请输入正确的用户名";
				return false;
			}
			if(psd.length <= 0)
			{
				trmessage.style.display="";
				message.innerHTML="密码不能为空";
				return false;				 
			}
			if(rd.length <= 0)
			{
				trmessage.style.display="";
				message.innerHTML="验证码不能为空";
				return false;				 
			}
			trmessage.style.display="none";
			$("#password").val(hex_md5(psd));
			return true;

	}
	
	function load()
	{
		var infoTip = "<%=request.getAttribute("message")%>";
		if(infoTip.length > 0 && infoTip != 'null')
		{
			var message = document.getElementById("message");
			var trmessage = document.getElementById("trmessage");
				trmessage.style.display="";
				message.innerHTML=infoTip;
		}
		window.setTimeout("changeValidateCode(document.getElementById('pic_random_code'));",100);
	}
       
</script>



</head>

<body class="loginPageBody" onload="load();">
	<div class="LoginWrapbg">
		    <div style="width: 442px; height: 640px; margin: 0 auto; margin-top:150px;">
			    <div class="loginLogo"></div>
			    <div class="welcome">沧州星通车辆卫星监控系统</div>
			    <div class="loginBar" id="loginBar">
					<form method="post" id="loginForm" name="loginForm"
						action="<%=ApplicationPath%>/data/login.action" onSubmit="return doValidate();">
						<table width="364" border="0" cellpadding="0" cellspacing="0" class="logintable">	
						    <tr  id="trmessage" style="display:none">
							    <td colspan=2 style="color:red;" id="message"></td>
							</tr>

							<tr>
								<td height="25" align="right">用户名:</td>
								<td><input type="text" name="username" id="username"
									tabindex="1" style="width: 160px;" />
								</td>
							</tr>
							<tr>
								<td height="25" align="right">密码:</td>
								<td><input type="password" name="password" id="password"
									tabindex="2" style="width: 160px;" /></td>
							</tr>
							<tr>
								<td height="25" align="right">验证码:</td>
								<td ><input type="text" name="randomCode" id="randomCode"
									tabindex="3" size="6" /> <span style="margin-top:5px;"><img id="pic_random_code" style="cursor:hand;"
									name="pic_random_code" onClick="changeValidateCode(this)"
									alt=""
									title="" />
									</td>
									</td>
							</tr>
							<tr>

								<td height="51" colspan="2" align="center"><input type="image"  
									src="<%=ApplicationPath%>/image/login.jpg"
									onClick="" style="cursor:hand;"/> 
									<a href="#"><img
										src="<%=ApplicationPath%>/image/cancel.jpg"
										width="65" height="26" style="cursor: hand; border: none;"
										onclick="cancel();" /> </a>
								</td>
							</tr>
							<tr>
								<td height="20">&nbsp;</td>
							</tr>
						</table>
					</form>
		 </div>			  
	       </div>
			<div class="welcome2" style="margin-top:-135px;">
				版本所有：<a href="http://www.gps808.com">沧州星通卫星定位有限公司</a>
			</div>
	</div>
	<script language="javascript">
		var randomPictureUrl = '<%=ApplicationPath%>/randomPicture.action';
	
function changeValidateCode(obj,url) {   

	var timenow = new Date().getTime();   
 	obj.src = randomPictureUrl+"?d="+timenow;   
}   
		
		function cancel()
		{
			window.close();
		}

	</script>
	
	<script type="text/javascript" src="<c:url value="/js/jquery/jquery1.8.min.js" />"></script>
	<script type="text/javascript" src="<c:url value="/js/md5.js" />"></script>
</body>
</html>
