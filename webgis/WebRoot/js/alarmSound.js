/**
 *报警声音，调用media目录中的mp3
 *框架API:http://code.ciaoca.com/javascript/dewplayer/demo/jsapi.html
 */
AlarmSound = {
	soundList : {},
	
	playAllow : true,

	enable:function(_allow)
	{
		  this.playAllow = _allow;
		  this.control();
	},	
	control : function(){
		if (AlarmSound.playAllow){
			AlarmSound.stop();
		}else{
			AlarmSound.play();
			AlarmSound.play();
		}
	},
	
	createComponent : function(id, src) {
		// AlarmSound.soundList[id] = div;
	},
	
	play : function() {
		if(AlarmSound.playAllow == false)
			return;
		try{
			var tag = document.getElementById("dewplayerjs");
			if (tag) {
				if (!AlarmSound.playAllow){
					tag.dewstop();
					return;
				}
				tag.dewplay();
				tag.dewplay();//播放两次
			}
		}catch(e){
			
		}
	},

	stop : function() {
		try{
			var tag = document.getElementById("dewplayerjs");
			if (tag) {
				tag.dewstop();
			}
		}catch(e){
			
		}
	}
}