/*-- NTV
 ====================================================== --*/

var ntv = ntv || {};
ntv.stb = ntv.stb || function () {
    };

/**
 * iPanel中间件问题汇总
 * 1. 在页面使用<video />标签,不能启用调试模式. 因为不断的修改HTML会造成无法播放视频, 尤其是使用窗口视频.
 */


/*--STB iPanel
 ====================================================== */
ntv.stb.ipanel = function () {
};

ntv.stb.ipanel.init = function () {

};

/*--Tools
 ====================================================== */
ntv.stb.ipanel.get_version = function () {
    var ver_str = iPanel.System.revision;
    var ver_array = ver_str.split(".");
    var ver_int = parseInt(ver_array[ver_array.length - 1]);
    return [ver_str, ver_int];
};

ntv.stb.ipanel.get_MAC = function () { //获取网卡物理地址MAC
    return network.ethernets[0].MACAddress;
};

ntv.stb.ipanel.get_SN = function () {
    return hardware.STB.serial;
};

ntv.stb.ipanel.get_CA = function() { //获取智能卡号
    return hardware.smartCard.serialNumber;
};

ntv.stb.ipanel.get_Provider = function () { //获取机顶盒厂商
    return hardware.STB.provider;
};

ntv.stb.ipanel.get_Type = function() { //获取机顶盒类型,贵网的为N9201
    return hardware.STB.type;
};

ntv.stb.ipanel.get_brand = function() { //获取机顶盒品牌名称
    return hardware.STB.brand;
};

ntv.stb.ipanel.get_model = function () { //获取机顶盒型号
    return hardware.STB.hVersion;
    //hardware.STB.sVersion
};

//返回键==================================
/*--Key
 ====================================================== */
ntv.stb.ipanel.key = function () {};
ntv.stb.ipanel.key.move_back = function () {
    ntv.log.console("ntv.stb.ipanel.key.move_back()");
    if (ntv.stb.key.move_back_url) {
        ntv.page.openurl(ntv.stb.key.move_back_url);
        ntv.stb.ipanel.onpageunload();
    }
};

//视频播放器======================================
/*--MediaPlayer
 ====================================================== */
ntv.stb.ipanel.mediaplayer = function () {};
ntv.stb.ipanel.mediaplayer.mp = undefined;
ntv.stb.ipanel.mediaplayer.video_mode = 1; //0,小窗口；1，全屏，255，隐藏
ntv.stb.ipanel.mediaplayer.msg = {}; // 由msg.js 重写

ntv.stb.ipanel.mediaplayer.getVideoDisplayMode = function(){
    return ntv.stb.ipanel.mediaplayer.video_mode;
};

ntv.stb.ipanel.mediaplayer.setVideoDisplayMode = function(videoDisplayMode,window){
    if(this.mp) {
        this._media.av.set_window_mode(videoDisplayMode,window);
    }
};

ntv.stb.ipanel.mediaplayer.play = function (type, url) {
    var log = "ntv.stb.ipanel.mediaplayer.play()";
    log += ", param: type　= " + type + ", url　= " + url + ".";
    if (!this.mp) {
        if (type === "AUDIO") {
            this._play_audio(url);
        } else if (type === "HTTP") {
            //media.AV.close();
            this._media.av.open(url, "HTTP");
            // 稍后由系统事件5202触发media.AV.play()事件
            this.mp = "media.AV";
        } else if (type === "VOD") {
            this._media.av.open(url, "VOD");
            this._media.av.set_window_mode(1);//设置窗口模式
            // 稍后由系统事件5202触发media.AV.play()事件
            this.mp = "media.AV";
        }
    } else
        log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
    ntv.log.console(log);
    return true;
};

ntv.stb.ipanel.mediaplayer.playWindow = function (type, url,window) {
    var log = "ntv.stb.ipanel.mediaplayer.playWindow()";
    log += ", param: type　= " + type + ", url　= " + url + ".";
    if (!this.mp) {
        if (type === "AUDIO") {
            this._play_audio(url);
        } else if (type === "HTTP") {
            this._media.av.open(url, "HTTP");
            // 稍后由系统事件5202触发media.AV.play()事件
            this.mp = "media.AV";
        } else if (type === "VOD") {
            //media.AV.close();
            //ntv.log.console("type: "+type);
            this._media.av.open(url, "VOD");
            if(ntv.stb.ipanel.mediaplayer.video_mode !== 255)
                this._media.av.set_window_mode(0,window);
            //media.AV.play();
            // 稍后由系统事件5202触发media.AV.play()事件
            this.mp = "media.AV";
        }
    } else
        log += this.msg.currentMediaPlayer + ntv.msg.common.exist;
    ntv.log.console(log);
    return true;
};

ntv.stb.ipanel.mediaplayer._play_audio = function (url) {
    // 低版本使用MP3接口兼容
    var version = ntv.stb.ipanel.get_version();
    if (version[0].indexOf("10673.") !== -1
        || version[0].indexOf("41358.") !== -1
        || (version[0].indexOf("41227.") !== -1 && version[1] <= 10402)) {
        this._mp3.play(url);

        this.mp = "MP3";
    } else // media接口
    {
        this._media.av.open(url, "HTTP");
        // 稍后由系统事件5202触发media.AV.play()事件
        this.mp = "media.AV";
    }

    ntv.log.console("ntv.stb.ipanel.mediaplayer._play_audio(), mp = " + this.mp);
};

ntv.stb.ipanel.mediaplayer.pause = function () {
    var log = "ntv.stb.ipanel.mediaplayer.pause()";

    if (this.mp) {
        if (this.mp === "media.AV")
            this._media.av.pause();
        else if (this.mp === "MP3")
            this._mp3.pause();
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer.resume = function () {
    var log = "ntv.stb.ipanel.mediaplayer.resume()";

    if (this.mp) {
        if (this.mp === "MP3")
            this._mp3.resume();
        else if(this.mp=="media.AV")
            this._media.av.play();

    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer.play_seek = function (time) {
    var log = "ntv.stb.ipanel.mediaplayer.pause()";
    if (this.mp) {
        if (this.mp === "media.AV") {
            var rs=this._media.av.play_seek(time);
            return rs;
        }
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
};

//停止播放=========================
ntv.stb.ipanel.mediaplayer.stop = function () {
    var log = "ntv.media.ipanel.mediaplayer.stop()";

    if (this.mp) {
        if (this.mp === "media.AV") {
            this._media.av.stop();
            log += ",av.stop";
        }else if (this.mp === "MP3") {
            this._mp3.stop();
        }
        this.mp = undefined;//假意释放播放器对象实例
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer.get_meida_duration = function () {
    var log = "ntv.stb.ipanel.mediaplayer.get_meida_duration()";

    var duration = 0;
    if (this.mp) {
        if (this.mp === "media.AV") {
            duration = this._media.av.get_meida_duration();
        }
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
    return duration;
};

ntv.stb.ipanel.mediaplayer.get_current_playtime = function () {
    var log = "ntv.stb.ipanel.mediaplayer.get_current_playtime()";

    var current = 0;
    if (this.mp) {
        if (this.mp === "media.AV") {
            current = this._media.av.get_current_playtime();
        }
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
    return current;
};

ntv.stb.ipanel.mediaplayer.set_volume = function (value) {
    var log = "ntv.stb.ipanel.mediaplayer.set_volume()";

    if (this.mp) {
        if (this.mp === "media.AV") {
            media.sound.value = value;
        }
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer.get_volume = function () {
    var log = "ntv.stb.ipanel.mediaplayer.get_volume()";

    var volume = 0;
    if (this.mp) {
        if (this.mp === "media.AV") {
            volume =  media.sound.value;
        }
    } else
        log += ", " + this.msg.currentMediaPlayer + ntv.msg.common.isnull;

    ntv.log.console(log);
    return volume;
};

/**
 * 此方法就算页面没有创建媒体实例, 也会主动去调用媒体资源销毁.
 * 为防止在使用返回键或window.location.href离开页面时, 媒体无法停止释放资源
 * 所有需要手动调用释放资源的对象, 都应在此方法内调用一次
 */
ntv.stb.ipanel.mediaplayer._stop_every = function () {
    var log = "ntv.media.ipanel.mediaplayer._stop_every()";

    var videoAlpha = ntv.utils.env.getGlobalVar("videoAlpha");
    if(videoAlpha !== "")
        media.picture.alpha = parseInt(videoAlpha);

    // media.AV接口
    media.AV.stop();
    media.AV.close();

    // MP3接口
    if (typeof(MP3) !== "undefined") {
        MP3.stop();
        MP3.close();
    }

    ntv.log.console(log);
};

/*--MediaPlayer Private media.AV接口
 ====================================================== */
ntv.stb.ipanel.mediaplayer._media = function () {};
ntv.stb.ipanel.mediaplayer._media.av = function () {};
ntv.stb.ipanel.mediaplayer._media.av.msg = {}; // 由msg.js 重写

ntv.stb.ipanel.mediaplayer._media.av.open = function (url, type) {
    url = url.replace("&duration=0_0", "");
    //ntv.log.console("newurl:" + url);
    var log = "ntv.media.ipanel.mediaplayer._media.av.open()";
    ntv.log.console("open");
    media.AV.open(url, type);
    log += this.msg.media_AV_open + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._media.av.play = function () {
    var log = "ntv.stb.ipanel.mediaplayer._media.av.play()";
  ntv.log.console("调用play");
    media.AV.play();
    log += this.msg.media_AV_play + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._media.av.pause = function () {
    var log = "ntv.stb.ipanel.mediaplayer._media.av.pause()";

    media.AV.pause();
    log += this.msg.MP3_pause + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._media.av.stop = function () {
    var log = "ntv.media.ipanel.mediaplayer._media.av.stop()";
    //如果mediaType为VOD，则无stop功能
    media.AV.stop();
    media.AV.close();
    /*if (media.AV.stop() === 1) {
        log += this.msg.media_AV_stop + ntv.msg.common.success;

        media.AV.close();
        log += this.msg.media_AV_close + ntv.msg.common.success;
    } else
        log += this.msg.media_AV_stop + ntv.msg.common.failure;*/

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._media.av.status = function () {
    var log = "ntv.stb.ipanel.mediaplayer._media.av.status()";
    log += this.msg.media_AV_status + media.AV.status +  " " + ntv.msg.common.success;
    ntv.log.console(log);
    return media.AV.status;
};

ntv.stb.ipanel.mediaplayer._media.av.set_window_mode = function (bWin,window) { //bWin 0小窗口；1全屏；255隐藏
    //media.picture.alpha =50;
    if(bWin === 0) {
        ntv.log.console("设置小窗");
        //var winX = 103, winY = 167, winWidth = 500, winHeight = 304;
        media.video.setPosition(window.left, window.top,window.width,window.height);
        ntv.stb.ipanel.mediaplayer.video_mode = 0;
    } else if(bWin === 1) {
        ntv.log.console("设置全屏");
        media.video.fullScreen();
        ntv.stb.ipanel.mediaplayer.video_mode = 1;
    } else if(bWin === 255) {
        ntv.log.console("s设置隐藏");
        media.video.setPosition(window.left, window.top,window.width,window.height);
        ntv.stb.ipanel.mediaplayer.video_mode = 255;
    }
    media.picture.alpha =100;
    //var videoAlpha = ntv.utils.env.getGlobalVar("videoAlpha");
  /*  if(videoAlpha === "")
        ntv.utils.env.setGlobalVar("videoAlpha", media.picture.alpha);
    if(ntv.stb.ipanel.mediaplayer.video_mode === 1 && media.picture.alpha !== 100) {
        media.picture.alpha = 100;
    }
    if(ntv.stb.ipanel.mediaplayer.video_mode !== 1 &&
        media.picture.alpha === 100 && parseInt(ntv.utils.env.getGlobalVar("videoAlpha")) !== 100) {
        media.picture.alpha = parseInt(ntv.utils.env.getGlobalVar("videoAlpha"));
    }*/
};

ntv.stb.ipanel.mediaplayer._media.av.get_meida_duration = function () {
    return media.AV.duration;//获取媒体播放的总的持续时间，单位是秒
};

ntv.stb.ipanel.mediaplayer._media.av.get_current_playtime = function () {
    /*piece=current.split(":");
     current=parseInt(piece[0])*3600+parseInt(piece[1])*60+parseInt(piece[2]);//将标准时间格式HH:MM:SS转换为秒*/
    return media.AV.elapsed;
};

ntv.stb.ipanel.mediaplayer._media.av.play_seek = function (goto_time) {
    if(/*ntv.stb.get_SN()=="1104002091800024C1263D15"&&*/ntv.stb.get_model()=="0716266f"){//杭摩HMC210E
        var hours=Math.floor(goto_time/3600);
        var minute=Math.floor(goto_time%3600/60);
        var seconds=goto_time%3600%60;
        goto_time=hours+":"+minute+":"+seconds;//将秒转换为标准时间格式HH:MM:SS
    }
    ntv.log.console("goto_time:"+goto_time);
    media.AV.seek(goto_time); //VOD有消息返回
    return 0;
};

/*--MediaPlayer Private MP3接口
 MP3接口（已过时），为了兼容低版本。新版本请使用，media.AV接口
 兼容低版本："10673.", "41358.", ("41227." && version <= 10402)
 ====================================================== */
ntv.stb.ipanel.mediaplayer._mp3 = function () {};
ntv.stb.ipanel.mediaplayer._mp3.msg = {}; // 由msg.js 重写

ntv.stb.ipanel.mediaplayer._mp3.play = function (url) {
    var log = "ntv.stb.ipanel.mediaplayer._mp3.play()";
    log += ", param: url= " + url + ". ";

    MP3.setProperty("beginData", "1024");
    log += this.msg.MP3_setProperty + ntv.msg.common.success;

    MP3.open(url);
    log += this.msg.MP3_open + ntv.msg.common.success;

    MP3.play();
    log += this.msg.MP3_play + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._mp3.pause = function () {
    var log = "ntv.stb.ipanel.mediaplayer._mp3.pause()";

    MP3.pause();
    log += this.msg.MP3_pause + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._mp3.stop = function () {
    var log = "ntv.stb.ipanel.mediaplayer._mp3.stop()";

    MP3.stop();
    log += this.msg.MP3_stop + ntv.msg.common.success;

    MP3.close();
    log += this.msg.MP3_close + ntv.msg.common.success;

    ntv.log.console(log);
};

ntv.stb.ipanel.mediaplayer._mp3.resume = function () {
    var log = "ntv.stb.ipanel.mediaplayer._mp3.resume()";

    MP3.resume();
    log += this.msg.MP3_resume + ntv.msg.common.success;

    ntv.log.console(log);
};

/*--System Event
 *5974:  当前页面已经打开完成，发消息通知页面
 *13001: 媒体源路径有效
 *5202:  准备播放媒体成功
 * 5203：连接服务器失败
 * 5205: 播放媒体成功
 * 5206：播放媒体失败
 * 5209：播放到点播开始位置
 * 5210：播放到点播结束位置
 * 5222：缓冲数据，等待播放
 * 5223：缓冲结束，已开始播放
 ====================================================== */
/*ntv.stb.ipanel.systemevent = function (event_code) {
    var log = "ntv.test.ipanel.systemevent()";
    log += ", param: event_code = " + event_code;
    ntv.log.console(log);
    systemEvent(event_code);
};*/

/*
ntv.stb.ipanel.systemevent._event_5202 = function () {
    var log = "ntv.stb.ipanel.systemevent._event_5202()";

    if(ntv.stb.ipanel.mediaplayer.mp === "media.AV")
        ntv.stb.ipanel.mediaplayer._media.av.play();

    ntv.log.console(log);
};
*/

/*--Destory onunload
 ====================================================== */
ntv.stb.ipanel.onpageunload = function () {
    ntv.log.console("ntv.stb.ipanel.onpageunload()");

    // 由于页面每次加载时都调用, 故使用_stop_every函数
    ntv.stb.ipanel.mediaplayer._stop_every();
};
