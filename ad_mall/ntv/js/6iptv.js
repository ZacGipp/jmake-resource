/*-- NTV
 ====================================================== --*/

var ntv = ntv || {};
ntv.stb = ntv.stb || function(){};

/**
 * iptv_js中间件问题汇总
 * 1.播放VOD无法正常返回systemevent中开始播放和停止播放的消息通知，改用侦测视频时长来判断
 */


/*--STB iptv_js
 ====================================================== */
ntv.stb.iptv_js = function(){};

ntv.stb.iptv_js.init = function(){
};

/*--Tools
 ====================================================== */
ntv.stb.iptv_js.get_version = function(){ //中间件版本，通过userAgent获取
	var stbVersion = "";
	if(typeof(Authentication) !== 'undefined') {
		stbVersion = Authentication.CTCGetConfig('STBVersion');
	}
	/*var ver_str = navigator.userAgent;
	var strArray = ver_str.split("|");
	 stbVersion = strArray[3]*/
	return stbVersion;
};

ntv.stb.iptv_js.get_MAC = function(){ //获取网卡物理地址MAC
	var stbMAC = "12:34:56:12:34:56";
	if(typeof(Authentication) !== "undefined"){
		var mac = Authentication.CTCGetConfig("mac");
		if(mac) stbMAC = mac;
	}
	return stbMAC;
};

ntv.stb.iptv_js.get_SN = function() { //获取机顶盒序号STBID
	//由于不知道机顶盒串号的field,故使用机顶盒版本号代替机顶盒串号
	var stbSN = "012345678912345";
	if(typeof(Authentication) !== "undefined") {
		var version =  Authentication.CTCGetConfig('STBVersion');
        if(version) stbSN = version;
	}
	return stbSN;
};

ntv.stb.iptv_js.get_CA = function() { //获取智能卡号USERID
	return "";
};

ntv.stb.iptv_js.get_Provider = function() { //获取机顶盒厂商 无
	return "SHANGHAI_TELECOM";
};

ntv.stb.iptv_js.get_Type = function() { //获取机顶盒类型,贵网的为N9201
	var stbType = "";
	if(typeof(Authentication) !== 'undefined') {
		stbType = Authentication.CTCGetConfig("STBType");
	}
	return stbType;
};

ntv.stb.iptv_js.get_brand = function() { //获取机顶盒品牌名称
	return "";
};

ntv.stb.iptv_js.get_model = function() { //获取机顶盒型号
	var stbType = "";
	if(typeof(Authentication) !== 'undefined') {
		stbType = Authentication.CTCGetConfig("STBType");
	}
	return stbType;
};

ntv.stb.iptv_js.get_env = function(name) { //获取机顶盒全局参数
	var rs;
	if(name === "ARC") { //区域码
		rs = Utility.getSystemInfo("ARC");
	} else {

	}
	return rs;
};

/*--Key
 ====================================================== */
ntv.stb.iptv_js.key = function(){};
ntv.stb.iptv_js.key.move_back = function(){ //重写返回
	ntv.log.console("ntv.stb.iptv_js.key.move_back()");
	if(ntv.stb.key.move_back_url)
	{
		ntv.page.openurl(ntv.stb.key.move_back_url);
		ntv.stb.iptv_js.onpageunload();
	}
};

/*--MediaPlayer
kfp 播放vod格式
 ====================================================== */
ntv.stb.iptv_js.mediaplayer = function(){};
ntv.stb.iptv_js.mediaplayer.mp = undefined;
//ntv.stb.iptv_js.mediaplayer.playstate = -1;//-1，停止；0,暂停；1正在播放
ntv.stb.iptv_js.mediaplayer.msg = {}; // 由msg.js 重写
/**
 * 媒体统一播放函数
 * param type String "AUDIO", "VOD", "DVB"
 * param url  String "http://mp3", "rtsp://ts", "dvb:xxx"
 */
ntv.stb.iptv_js.mediaplayer.play = function(type, url){
	ntv.log.console("iptv_js:type:"+type+",url:"+url);
url="http://182.138.48.165:6610/ZTE_EPG/20000000000000000000000000032106.mp4?version=v1.0&IASHttpSessionId=SLB84620171110030048003237&Authinfo=sxTlBG87sJbjr3OZIeWgY%2BpwRiU3%2FxGIShNZAjbGMZ%2BuZt%2F6ApTfUbp9jBa2L1WqGjpr5co2proDoRMixHNYyA%3D%3D&mtype=mp4&BreakPoint=0&cpcode=20000017&ismp4=1";
	var rs = false;
	var log = "ntv.media.iptv_js.mediaplayer.play(), ";
   /* var get_instance_id = ntv.utils.env.getGlobalVar("playerId");
    ntv.log.console("get_instance_id:" + get_instance_id);*/
    if(!this.mp) {//get_instance_id === "-1"
        ntv.log.console("播放器实例不存在");
		//kfp  创建播放对象mp=new MediaPlayer()，并且将播放实例和播放对象绑定。
		this._set_mp_instance();

		if(type === "AUDIO"){
			this._set_audio_mode(this.mp);
		}else if(type === "VOD") {
			//var videowindow_status = Utility.getEnv("VideoWindow");
			//if( videowindow_status != "success") {
				this._set_vod_mode(this.mp);
			//}
		}else if(type === "DVB")
			this._set_dvb_mode(this.mp);

		//for(var i=Date.now();Date.now()-i>3000;);
		//kfp  设置播放的Url,iptv下url为一个json对象字符串
		if(type === "VOD"){
			/*url = '{mediaURL:"'+url+'",mediaCode:"code1",mediaType:2,audioType:4,videoType:3,streamType:3,' +
			 'drmType:1,fingerPrint:1,copyProtection:0,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}';*/
            url = '{mediaUrl:"'+url+'",mediaCode:"vod1",mediaType:2,audioType:1,videoType:3,streamType:2,' +
                'drmType:1,fingerPrint:1,copyProtection:0,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}';
			ntv.log.console(url);
			/*json = '[{mediaUrl:"' + url + '",';
			json += 'mediaCode: "jsoncode1",';
			json += 'mediaType:2,';
			json += 'audioType:1,';
			json += 'videoType:1,';
			json += 'streamType:1,';
			json += 'drmType:1,';
			json += 'fingerPrint:0,';
			json += 'copyProtection:1,';
			json += 'allowTrickmode:1,';
			json += 'startTime:0,';
			json += 'endTime:10000.3,';
			json += 'entryID:"jsonentry1"}]';*/
			var a=this.mp.setSingleMedia(url);
			ntv.log.console(a);
			this.mp.playFromStart(); //无返回值
		}else if(type==="DVB"){
			ntv.log.console("channelId:" + url);
			this.mp.joinChannel(url);
		}
	}else{
        ntv.log.console("播放器已存在");
        var mp = new MediaPlayer();
        var bind_instance_rs = mp.bindNativePlayerInstance(get_instance_id); //0成功，-1失败
		ntv.log.console("bind_rs:" + bind_instance_rs);
		this.mp = mp;
		this.stop();
		this.setVideoDisplayMode(1);

        /*url = '{mediaURL:"'+url+'",mediaCode:"code1",mediaType:2,audioType:4,videoType:3,streamType:3,' +
            'drmType:1,fingerPrint:1,copyProtection:0,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}';*/
        url = '{mediaUrl:"'+url+'",mediaCode:"vod1",mediaType:2,audioType:1,videoType:3,streamType:2,' +
			'drmType:1,fingerPrint:1,copyProtection:0,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}';
        this.mp.setSingleMedia(url);
        this.mp.playFromStart();
        log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
	}
	/*var playMode = this.mp.getPlaybackMode();
	var playModeObj = eval("(" + playMode + ")");
	ntv.log.console("getPlaybackMode:" + playModeObj.PlayMode);*/
	//if(playModeObj.PlayMode === "Normal Play") {
		rs = true;
		//this.playstate = 1;
		log += this.msg.playFromStart + ntv.msg.common.success;
	/*}
	else
		log += this.msg.playFromStart + ntv.msg.common.failure;*/

	ntv.log.console(log);
	return rs;
};

ntv.stb.iptv_js.mediaplayer.getVideoDisplayMode = function(){
	var mode = 1;
	if(this.mp){
		mode = this.mp.getVideoDisplayMode();
	}
	return mode;
};

ntv.stb.iptv_js.mediaplayer.setVideoDisplayMode = function(videoDisplayMode,window){
	if(this.mp) {
        if (videoDisplayMode === 0) {
            //var winX = 103, winY = 167, winWidth = 500, winHeight = 304;
            this.mp.setVideoDisplayArea(window.left,window.top,window.width,window.height);
        }else if(videoDisplayMode === 255){
			this.mp.setVideoDisplayArea(window.left,window.top,window.width,window.height);
		}
        ntv.log.console(videoDisplayMode);
        this.mp.setVideoDisplayMode(videoDisplayMode);//0小窗口
		this.mp.refreshVideoDisplay();//无返回
	}
};

/*ntv.stb.iptv_js.mediaplayer.setMode = function(dividx){
	if (dividx>=1) {
		//if(this.getVideoDisplayMode() === 0){
			this.setVideoDisplayMode(255);
		//}
	} else {
		//if(this.getVideoDisplayMode()=== 255){
			this.setVideoDisplayMode(0);
		//}
	}
};*/

ntv.stb.iptv_js.mediaplayer.playWindow = function(type, url,window){
	url="http://182.138.48.165:6610/ZTE_EPG/20000000000000000000000000032106.mp4?version=v1.0&IASHttpSessionId=SLB84620171110030048003237&Authinfo=sxTlBG87sJbjr3OZIeWgY%2BpwRiU3%2FxGIShNZAjbGMZ%2BuZt%2F6ApTfUbp9jBa2L1WqGjpr5co2proDoRMixHNYyA%3D%3D&mtype=mp4&BreakPoint=0&cpcode=20000017&ismp4=1";
	//var dividx= parseInt(ntv.utils.env.getGlobalVar("dividx"));//获取当前焦点块组件索引，值0表示首屏中的第一屏；
	//console.log(dividx);
	//ntv.log.console("iptv_js:type:"+type+",url:"+url);
    var log = "ntv.media.coship.mediaplayer.playWindow(), ";
	var rs = false;
    //var get_instance_id = ntv.utils.env.getGlobalVar("playerId");
    //ntv.log.console("get_instance_id:" + get_instance_id);
	if(!this.mp) //get_instance_id === "-1"
    {
        ntv.log.console("播放器实例不存在");
        //创建播放对象mp=new MediaPlayer()，并且将播放实例和播放对象绑定,将播放器实例ID存coockie
        this._set_mp_instance();
    } /*else {
        ntv.log.console("播放器已存在");
		var mp = new MediaPlayer();
		var bind_instance_rs = mp.bindNativePlayerInstance(get_instance_id); //0成功，-1失败；
		ntv.log.console("bind_rs:" + bind_instance_rs);
		this.mp = mp;

        this.mp.stop();
        this.mp.leaveChannel();

		this.setVideoDisplayMode(0);

		log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
	}*/
    //设置视频播放的显示模式: 0小窗口 1全屏 255隐藏窗口；窗口宽高
    if(type === "AUDIO"){
        this._set_audio_mode(this.mp);
    }
    else if(type === "VOD" || type === "DVB") {
        this._set_window_mode(this.mp,window);
    }
	//根据url播放
    if(type === "VOD" || type === "AUDIO") {//点播
        //kfp  设置播放的Url
        url = '{mediaUrl:"' + url + '",mediaCode:"code1",mediaType:2,audioType:4,videoType:3,streamType:3,' +
			'drmType:1,fingerPrint:1,copyProtection:0,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}';
        ntv.log.console(url);
        var a=this.mp.setSingleMedia(url);
		ntv.log.console("A:"+a);
        this.mp.playFromStart();
        /*var playMode = this.mp.getPlaybackMode();
        var playModeObj = eval("(" + playMode + ")");
        ntv.log.console("getPlaybackMode:"+playModeObj.PlayMode);
        if(playModeObj.PlayMode === "Normal Play") {*/
            rs = true;
            //this.playstate = 1;
            log += this.msg.playFromStart + ntv.msg.common.success;
       /* }
        else
            log += this.msg.playFromStart + ntv.msg.common.failure;*/
    } else if(type === "DVB") {//直播
		ntv.log.console("channelId:" + url);
        this.mp.joinChannel(url);
    }

	ntv.log.console(log);
	return rs;
};

ntv.stb.iptv_js.mediaplayer.play_seek = function(time){
	var play_rs = this.mp.playByTime(1, time+"", 0);
	//华为悦盒子,返回undefined
	if(play_rs==undefined){
		play_rs=0;
	}
	ntv.log.console("play_rs:"+play_rs);
	return play_rs;
	if(play_rs === 0) {
		log += this.msg.seek + ntv.msg.common.success;
	}
	else
		log += this.msg.seek + ntv.msg.common.failure;

	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer.pause = function(){
	this.mp.pause();
};

ntv.stb.iptv_js.mediaplayer.resume = function(){
	this.mp.resume();
};

ntv.stb.iptv_js.mediaplayer.stop = function(){
	var log = "ntv.media.iptv_js.mediaplayer.stop(), ";
	if(this.mp)
	{
        this.mp.stop();
        this.mp.joinChannel(0);
       /* var channelId = this.mp.getChannelNum();
        ntv.log.console("channelId:" + channelId);
        if(channelId !== -1) {*/
            var rs = this.mp.leaveChannel();
            ntv.log.console("leaveChannel:" + rs);
        //}

		/*var playMode = this.mp.getPlaybackMode();
		var playModeObj = eval("(" + playMode + ")");
		ntv.log.console("getPlaybackMode:"+playModeObj.PlayMode);*/
		var unbind_instance_rs = this.mp.releaseMediaPlayer(this.mp.getPlayerInstanceID()); //0表示释放成功，-1表示释放失败
		ntv.log.console("releaseMediaPlayer:" + unbind_instance_rs);
		if(unbind_instance_rs === 0)
		{
			this.mp = undefined;
			ntv.utils.env.setGlobalVar("playerId", "-1");
			/*var get_instance_id = ntv.utils.env.getGlobalVar("playerId");
			ntv.log.console("get_instance_id:" + get_instance_id);*/
			log += this.msg.stop + ntv.msg.common.success;
		}
		else
			log += this.msg.releaseMediaPlayer + ntv.msg.common.failure;
	} else
		log += this.msg.stop + ntv.msg.common.isnull;

	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer.get_meida_duration = function(){ //获取播放媒体时长
	var log = "ntv.stb.iptv_js.mediaplayer.duration(), ";

	var duration = 0;
	if(this.mp) {
		duration = this.mp.getMediaDuration();
		log += this.msg.getMediaDuration + ntv.msg.common.success + ":" + duration + "s";
	}
	else
		log += this.msg.getMediaDuration + ntv.msg.common.isnull;
	ntv.log.console(log);
	return duration;
};

ntv.stb.iptv_js.mediaplayer.get_current_playtime = function(){ //获取当前播放媒体时间
	var log = "ntv.stb.iptv_js.mediaplayer.get_current_playtime(), ";

	var current = 0;
	if(this.mp) {
		current = this.mp.getCurrentPlayTime();
		log += this.msg.getCurrentPlayTime + ntv.msg.common.success + ":" + current + "s";
	}
	else
		log += this.msg.getCurrentPlayTime + ntv.msg.common.isnull;
	ntv.log.console(log);
	return current;
};

ntv.stb.iptv_js.mediaplayer.set_volume = function(volume){ //设置音量
	var log = "ntv.media.iptv_js.mediaplayer.set_volume(), ";
	if(this.mp) {
		this.mp.setVolume(volume);//0静音，100最大音量
		if(parseInt(this.mp.getVolume()) === volume)
			log += this.msg.setVolume + ntv.msg.common.success + ":" + volume;
		else
			log += this.msg.setVolume + ntv.msg.common.failure;
	}
	else
		log += this.msg.setVolume + ntv.msg.common.isnull;
	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer.get_volume = function(){ //获取音量
	var log = "ntv.media.iptv_js.mediaplayer.get_volume(), ";

	var volume = 0;
	if(this.mp) {
		volume = this.mp.getVolume();
		log += this.msg.getVolume + ntv.msg.common.success + ":" + volume;
	}
	else
		log += this.msg.getVolume + ntv.msg.common.isnull;
	ntv.log.console(log);
	return volume;
};

/*--MediaPlayer Private Function
 ====================================================== */
ntv.stb.iptv_js.mediaplayer._set_mp_instance = function() {
	var log = "ntv.media.iptv_js.mediaplayer._set_mp_instance(), ";
	var mp = new MediaPlayer();
	var get_instance_id = mp.getNativePlayerInstanceID();
    ntv.log.console("getNativePlayerInstanceID:" + get_instance_id);
    if (get_instance_id !== -1) {
		var bind_instance_rs = mp.bindNativePlayerInstance(get_instance_id); //0成功，-1失败
		ntv.log.console("bindNativePlayerInstance:"+bind_instance_rs);
        if (bind_instance_rs !== -1) {
            ntv.utils.env.setGlobalVar("playerId", get_instance_id);
            mp.setSingleOrPlaylistMode(0); //0单媒体的播放模式,1播放列表的播放模式
            mp.setNativeUIFlag(0); //0不使用 Player 的本地 UI 显示功能,1使用 Player 的本地 UI 显示功能
            mp.setSubtitileFlag(0);//0不显示字幕,1显示字幕
            mp.setCycleFlag(1); //0设置为循环播放,1设置为单次播放
			this.mp = mp;
			log += this.msg.bindNativePlayerInstance + ntv.msg.common.success + get_instance_id;
        } else
			log += this.msg.bindNativePlayerInstance + ntv.msg.common.failure;
	}
	else
		log += this.msg.getNativePlayerInstanceId + ntv.msg.common.failure;

	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer._set_window_mode = function(mp,window){
	var log = "ntv.media.iptv_js.mediaplayer._set_window_mode(), ";
	//mp.setStopMode(0); //设置视频播放停止模式
	//mp.setVideoFormat(18);
	//mp.setAspectRatio(2);
	//mp.setVideoAlpha(100); //0不透明，100完全透明 四川电信盒子画面黑,有声音
	//mp.setAudioOutputDataFormat(16,0);
	/*var instanceId = mp.getNativePlayerInstanceID();
	var playListFlag = 0;
	var videoDisplayMode = 0;
	var height = 308;
	var width = 501;
	var left = 103;
	var top = 167;
	var muteFlag = 0;
	var subtitleFlag = 0;
	var videoAlpha = 0;
	var cycleFlag = 0;
	var randomFlag = 0;
	var autoDelFlag = 0;
	var useNativeUIFlag = 0;
	//初始话mediaplayer对象
	mp.initMediaPlayer(instanceId,playListFlag,videoDisplayMode,height,width,left,top,muteFlag,useNativeUIFlag,subtitleFlag,videoAlpha,cycleFlag,randomFlag,autoDelFlag);
	*/
	//if(this.getVideoDisplayMode() !== 255) {
        this.setVideoDisplayMode(0,window);
    //}
	if(mp.getVideoDisplayHeight() === 304) {
		log += this.msg.setVideoDisplayArea + ntv.msg.common.success + " : " + mp.getVideoDisplayHeight();
		//log += this.msg.refreshVideoDisplay + ntv.msg.common.failure;
	}else
		log += this.msg.setVideoDisplayArea + ntv.msg.common.failure;
	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer._set_audio_mode = function(mp){
	var log = "ntv.stb.iptv_js.mediaplayer._set_audio_mode(), ";

	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer._set_vod_mode = function(mp){
	var log = "ntv.media.iptv_js.mediaplayer._set_vod_mode(), ";
	//mp.setStopMode(0); //设置视频播放停止模式
	//mp.setVideoFormat(18);
	//mp.setAspectRatio(2);
	//mp.setVideoAlpha(100);//电信一款盒子画面黑
	//mp.setAudioOutputDataFormat(16,0);
	mp.setVideoDisplayMode(1);
	/*if(envParam.ajaxType=="shouping"||envParam.ajaxType=="allback"){
		var set_display_area_rs = mp.setVideoDisplayArea(0,0,1280,720);
	}else {
		var set_display_area_rs = mp.setVideoDisplayArea(0,0,1280,720);
	}*/
	/*if(set_display_area_rs == 0)
	{*/
		//mp.setMuteFlag(0);
	mp.refreshVideoDisplay();//iptv盒子返回为undefined
	//Utility.setEnv("VideoWindow", "success");
	log += this.msg.setVideoDisplayArea + ntv.msg.common.success + mp.getVideoDisplayHeight();
	//log += this.msg.refreshVideoDisplay + ntv.msg.common.failure;
	/*}else
		log += this.msg.setVideoDisplayArea + ntv.msg.common.failure;*/
	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer._set_dvb_mode = function(mp){
	mp.setVideoAlpha(100);
	mp.setVideoDisplayMode(1);
	mp.refreshVideoDisplay();//iptv盒子返回为undefined
};

ntv.stb.iptv_js.mediaplayer._set_volume = function(mp, volume){
	var log = "ntv.media.iptv_js.mediaplayer._set_volume(), ";
	mp.setVolume(volume);
	ntv.log.console(log);
};

ntv.stb.iptv_js.mediaplayer._get_volume = function(mp){
	var log = "ntv.media.iptv_js.mediaplayer._get_volume(), ";

	ntv.log.console(log);
	return mp.getVolume();
};

/*--System Event
 ====================================================== */
ntv.stb.iptv_js.systemevent = function(event_code){
	switch(event_code) {
		case DVB.EVT_MEDIA_END: //40200
			ntv.stb.iptv_js.systemevent.overPlay();
			ntv.log.console("ntv.stb.iptv_js.systemevent()：媒体播放到末端, event_code:" + event_code);
			break;
		case DVB.EVT_MEDIA_BEGINING://40201
			ntv.stb.iptv_js.systemevent.startPlay();
			ntv.log.console("ntv.stb.iptv_js.systemevent()：媒体播放到起始端, event_code:" + event_code);
			break;
		case DVB.EVT_MEDIA_ERROR: //40202
			ntv.log.console("ntv.stb.iptv_js.systemevent()：媒体播放异常, event_code:" + event_code);
			break;
		case DVB.EVT_PLAYMODE_CHANGE: //40203
			ntv.log.console("ntv.stb.iptv_js.systemevent()：媒体播放模式改变, event_code:" + event_code);
			break;
	}
};

/*--Destory onunload
 ====================================================== */
ntv.stb.iptv_js.onpageunload = function(){
	ntv.log.console("ntv.stb.iptv_js.onpageunload()");
	// MediaPlayer如果正在播放则停止
	if(ntv.stb.iptv_js.mediaplayer.mp) {
		ntv.stb.iptv_js.mediaplayer.stop();
	}
};
