<%@ include file="/common/taglibs.jsp" %>
<script type="text/javascript" src="${ctx}/media/swfobject.js"></script>
<div>
	<object type="application/x-shockwave-flash" data="${ctx}/media/dewplayer.swf" 
		width="200" height="20" id="dewplayerjs">
		<param name="wmode" value="transparent" />
		<param name="movie" value="${ctx}/media/dewplayer.swf" />
		<param name="flashvars" value="mp3=${ctx}/media/AlarmSound.wma&amp;autostart=1&javascript=on&autoreplay=1" />
	</object>
</div>