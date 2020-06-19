/*-- NTV
 ====================================================== --*/
var ntv = ntv || {};
ntv.stb = ntv.stb || function(){};


/*--PCBrowser
 ====================================================== */
ntv.stb.pcbrowser = function(){};

/*--Tools
 ====================================================== */
ntv.stb.pcbrowser.get_version = function(){
	return "12";
};

ntv.stb.pcbrowser.get_MAC = function(){
	return "12:34:56:12:34:56";
};

ntv.stb.pcbrowser.get_SN = function() { //获取机顶盒序号
	return "012345678912345";
};

ntv.stb.pcbrowser.get_CA = function() { //获取智能卡号
	return "fe805436259c63a8";
};

ntv.stb.pcbrowser.get_Provider = function() { //获取机顶盒厂商
	return "INTEL";
};

ntv.stb.pcbrowser.get_Type = function() { //获取机顶盒类型
	return "PC";
};

ntv.stb.pcbrowser.get_brand = function() { //获取机顶盒品牌名称
	return "INTEL";
};

ntv.stb.pcbrowser.get_model = function() { //获取机顶盒型号
	return "AMD64";
};

ntv.stb.pcbrowser.get_env = function(name) { //获取机顶盒全局参数
	return "pc";
};

/*--Key
 ====================================================== */
ntv.stb.pcbrowser.key = function(){};
ntv.stb.pcbrowser.key.move_back = function(){
	ntv.log.console("ntv.stb.pcbrowser.key.move_back()");
	if(ntv.stb.key.move_back_url)
	{
		ntv.page.openurl(ntv.stb.key.move_back_url);
	}
};

/*--MediaPlayer
 ====================================================== */

ntv.stb.pcbrowser.mediaplayer = function(){};
ntv.stb.pcbrowser.mediaplayer.mp = undefined;
ntv.stb.pcbrowser.mediaplayer.msg = {}; // 由msg.js 重写


ntv.stb.pcbrowser.mediaplayer.setMode = function(videoDisplayMode) {
	ntv.log.console("videoDisplayMode"+videoDisplayMode);
	if(videoDisplayMode === 0){

	}else if(videoDisplayMode === 255){

	}
};

var video5 = document.createElement("video");
ntv.stb.pcbrowser.mediaplayer.play = function(type, url){
	ntv.log.console("pc"+url);
	//console.log("url:"+url);
	var rs = false;
	var log = "ntv.stb.pcbrowser.mediaplayer.play()";
	log += ", param : type = " + type + ", url = " + url + ". ";
	if(!this.mp) {
		videoBox.innerHTML="";
		video5.innerHTML = "该浏览器不支持Video标签！";

		if(type === "VOD") {
			ntv.log.console("playWindow type:"+type + " url:" + url);
		}
		else {
			url = "http://eshare.ljsy.otvcloud.com/otv/yfy/3/85/6E/00000129069/129069_2300k_1920x1080.mp4";
			ntv.log.console("playWindow type:"+type + " url:" + url);
		}
        video5.id = "video5";
        video5.src = url;
		/*if(envParam.statistic.page === "shouping"){
			video5.setAttribute("controls", "controls");
			video5.setAttribute("height","277px");
			video5.setAttribute("width", "500px");
		}else{
			video5.setAttribute("controls", "controls");
			video5.setAttribute("height","720px");
			video5.setAttribute("width", "1280px");
		}*/
		video5.setAttribute("controls", "controls");
		video5.setAttribute("height","720px");
		video5.setAttribute("width", "1280px");

		video5.setAttribute("autoplay","autoplay");
		//video5.setAttribute("loop","loop");
		/*var getDuration=function (){
			var currentTime1 = video5.currentTime;//获取当前播放时间
		};
			video5.addEventListener("timeupdate", getDuration);
		video5.addEventListener("loadedmetadata", function(){
			var duration = video5.duration;//获取总时长
			ntv.stb.pcbrowser.mediaplayer.get_meida_duration(duration);
		});*/

		videoBox.appendChild(video5);
		log += this.msg.play + ntv.msg.common.success;
		this.mp = 1;
		rs = true;
	}
	else {
		log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
		rs = false;
	}
	ntv.log.console(log);
	return rs;
};

ntv.stb.pcbrowser.mediaplayer.getVideoDisplayMode = function(){
    return 0;
};

ntv.stb.pcbrowser.mediaplayer.setVideoDisplayMode=function(videoDisplayMode){

};

ntv.stb.pcbrowser.mediaplayer.playWindow = function(type, url,window) {
	console.log(url);
    var rs = false;
	var window=window;
    var log = "ntv.stb.pcbrowser.mediaplayer.play()";
    log += ", param : type = " + type + ", url = " + url + ". ";
    if(!this.mp) {
        videoBox.innerHTML="";
        video5.innerHTML = "该浏览器不支持Video标签！";

        if(type === "VOD") {
            ntv.log.console("playWindow type:"+type + " url:" + url);
        }
        else {
            url = "http://eshare.ljsy.otvcloud.com/otv/yfy/3/85/6E/00000129069/129069_2300k_1920x1080.mp4";
            ntv.log.console("playWindow type:"+type + " url:" + url);
        }
        video5.id = "video5";
        video5.src = url;

		video5.setAttribute("controls", "controls");
		video5.setAttribute("height",window.height+"px");
		video5.setAttribute("width", window.width+"px");
        video5.setAttribute("autoplay","autoplay");
        video5.setAttribute("loop","loop");
        videoBox.appendChild(video5);
        log += this.msg.play + ntv.msg.common.success;
        this.mp = 1;
        rs = true;
    }
    else {
        log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
        rs = false;
    }
    ntv.log.console(log);
    return rs;
};

ntv.stb.pcbrowser.mediaplayer.play_seek = function(time){
	var log = "ntv.stb.pcbrowser.mediaplayer.play()";
	//log += ", param : type = " + type + ", url = " + url + ". ";
	//console.log("pcPlayByTime:"+time);
	video5.currentTime=time;
	video5.play();
	return 0;
	if(!this.mp)
	{
		log += this.msg.play + ntv.msg.common.success;
		this.mp = 1;
	}
	else
		log += this.msg.currentMediaPlayer + ntv.msg.common.exist;

	ntv.log.console(log);
};
ntv.stb.pcbrowser.mediaplayer.pause = function(){
	var log = "ntv.stb.pcbrowser.mediaplayer.pause(), ";
	video5.pause();
	if(this.mp)
		log += this.msg.pause + ntv.msg.common.success;
	else
		log += this.msg.currentMediaPlayer + ntv.msg.common.isnull;

	ntv.log.console(log);
};

ntv.stb.pcbrowser.mediaplayer.resume = function(){
	var log = "ntv.stb.pcbrowser.mediaplayer.resume(), ";
	video5.play();
	if(this.mp)
		log += this.msg.resume + ntv.msg.common.success;
	else
		log += this.msg.currentMediaPlayer + ntv.msg.common.isnull;

	ntv.log.console(log);
};

ntv.stb.pcbrowser.mediaplayer.stop = function(){
	var log = "ntv.stb.pcbrowser.mediaplayer.stop(), ";
	video5.src="";
	if(this.mp)
	{
		log += this.msg.stop + ntv.msg.common.success;
		this.mp = undefined;
	}
	else
		log += this.msg.currentMediaPlayer + ntv.msg.common.isnull;

	ntv.log.console(log);
};

ntv.stb.pcbrowser.mediaplayer.get_meida_duration = function(){ //获取播放媒体时长
	var log = "ntv.stb.pcbrowser.mediaplayer.get_meida_duration(), ";
	//console.log("getDuration="+duration);
	var duration =video5.duration;
	if(this.mp) {
		log += this.msg.getMediaDuration + ntv.msg.common.success + ":" + duration + "s";
	}
	else
		log += this.msg.getMediaDuration + ntv.msg.common.isnull;
	ntv.log.console(log);
	return duration;
};

ntv.stb.pcbrowser.mediaplayer.get_current_playtime = function(){ //获取当前播放媒体时间
	var log = "ntv.stb.pcbrowser.mediaplayer.get_current_playtime(), ";
	var current =video5.currentTime;
	if(this.mp) {
		log += this.msg.getCurrentPlayTime + ntv.msg.common.success + ":" + current + "s";
	}
	else
		log += this.msg.getCurrentPlayTime + ntv.msg.common.isnull;
	ntv.log.console(log);
	return current;
};

ntv.stb.pcbrowser.mediaplayer.set_volume = function(volume){ //设置音量
	var log = "ntv.stb.pcbrowser.mediaplayer.set_volume(), ";

	if(this.mp) {
		var rs = 0;
		if(rs === 0)
			log += this.msg.setVolume + ntv.msg.common.success + ":" + volume + "s";
		else
			log += this.msg.setVolume + ntv.msg.common.failure;
	}
	else
		log += this.msg.setVolume + ntv.msg.common.isnull;
	ntv.log.console(log);
};

ntv.stb.pcbrowser.mediaplayer.get_volume = function(){ //获取音量
	var log = "ntv.stb.pcbrowser.mediaplayer.get_volume(), ";

	var volume = 8;
	log += this.msg.getVolume + ntv.msg.common.success + ":" + volume + "s";
	ntv.log.console(log);
	return volume;
};