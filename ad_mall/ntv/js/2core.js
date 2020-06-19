/*-- NTV
 ====================================================== --*/

var ntv = ntv || {};
/*kfp
  1.var ntv=ntv||{};
*   每个ntv模块文件头都采用此方式来扩展对象。此方式表示如果上下文已存在ntv对象就返回已存在的ntv对象，
*   如果不存在就创建一个空对象。这样的方式也不依赖于将一个对象写入多个文件在页面引用的前后顺序。
* */

/*--Log 页面调试输出
 ====================================================== */
ntv.log = function(){};
//打开调试模式
ntv.log.debug =false;
//显示调试的信息==========
ntv.log.console = function(str){
    str=String(str);
    if(ntv.log.debug && this.filter(str)){
       /* var html = '<div style="display: block; background-color: #336699;'
            + ' opacity: 0.7; position: absolute; top: 40px; left: 40px;'
            + ' text-align: left; font-size: 18px; color:red;"'
            + ' id="console"><!-- #$#: --></div>';*/

       var html = '<div class="console" id="console" style="z-index:1000"><!-- #$#: --></div>';
        var console_div = $("#console");
        if(console_div === null){
            window.document.body.innerHTML=html;
        } else{
            console_div.innerHTML += "<p>#$#: " + str + "</p>";
        }
    }
};
/*kfp过滤掉框架内置的日志信息，不能以ntv.开头的字符串输出格式*/
ntv.log.filter = function(str){
    var print = true;
    if(str.indexOf("$PAGE") > -1)
        print = false;
    else if(str.indexOf("ntv.key") > -1)
        print = false;
    else if(str.indexOf("ntv.navigation") > -1)
        print = false;
    else if(str.indexOf("ntv.page") > -1)
        print = false;
    else if(str.indexOf("ntv.stb") > -1)
        print = false;
    else if(str.indexOf("ntv.effect") > -1)
        print = false;
    else if(str.indexOf("ntv.media") > -1)
        print = false;
    return print;
};

/*--Profile
 ====================================================== */
ntv.profile = function(){};

ntv.profile.platform = "PC or STB";
ntv.profile.browser = "NGB-H or iPanel or SHDV"; // 国标NGB-H or iPanel or SHDV
ntv.profile.type = ""; //贵网同洲机顶盒有两个类型n9201和n9101

ntv.profile.info = function(){
    var info = "browser info"
        + ", platform: " + navigator.platform
        + ", appName: " + navigator.appName
        + ", appCodeName: " + navigator.appCodeName
        + ", appVersion: " + navigator.appVersion;
    var platform = "当前网页运行平台检测结果为(PC or STB): "
        + this.platform;

    var browser = "当前网页运行浏览器检测结果为(NGB-H or iPanel or SHDV): "
        + this.browser;

    if(typeof(software)!= "undefined") {
        info = info + ",software: " + software.middleware.name;
    }

    if(typeof(hardware)!= "undefined") {
        if(typeof(SysSetting) != "undefined")
            info = info + ",type: " + "N9101";
        else
            info = info + ",type: " + hardware.STB.type;
    }
            info=info+browser+platform;
    //ntv.log.console(info);
};

ntv.profile.init = function(){
    //ntv.log.console("ntv.profile.init");
    this.platform = this._get_platform();
    this.browser = this._get_browser();
    this.type = this._get_type();
};

//检测当前的平台是PC还是STB----------------
ntv.profile._get_platform = function(){
    var platform = navigator.platform;
    var appVersion = navigator.appVersion;
    if(platform) {
        if(platform.indexOf("Win32") === -1
            && platform.indexOf("Linux x86") === -1)
            platform = "STB";
        else {
            if(appVersion.indexOf("Coship") > -1)
                platform = "STB";
            else
                platform = "PC";
        }
    } else {
        if(appVersion.indexOf("iPanel") > -1)
            platform = "STB";
        else
            platform = "PC";
    }
 // platform = "STB";
    return platform;
};

//检测当前的设备浏览器是什么浏览器------------
ntv.profile._get_browser = function(){
    var browser = "PCBrowser";
    //var appVersion = navigator.appVersion;
    if(typeof(software)!= "undefined") {
        if(software.middleware.name.indexOf("Coship") > -1) {
            browser = "Coship";
        } else {
            browser = "iPanel"; //适配吉视传媒iPanel盒子
        }
    }else if(typeof(iPanel) != "undefined"){
        browser = "iPanel";
    }else if(typeof(Authentication) != "undefined"){
        browser = "iptv";
    }else if(typeof(jShow) != "undefined"){// 全景中间件
        browser = "SHDV";
    }else if(typeof(MediaPlayer) != "undefined"){ // NGB-H国标(iPanel也有MediaPlayer对象,但NGB-H绝对没有iPanel对象)
        browser = "NGB-H";
    }
        //browser = "iptv";
    return browser;
};

ntv.profile._get_type = function() {
    var type = "";
    if(ntv.profile.browser === "Coship") {
        if(typeof(hardware)!= "undefined") {
            /*if(typeof(SysSetting) != "undefined")
                type = "N9101";
            else*/
                type = hardware.STB.type;
        }
    }
    if(ntv.profile.browser === "iPanel"){

    }
    else if(ntv.profile.browser === "SHDV"){

    }
    else if(ntv.profile.browser === "NGB-H"){

    }
    else if(ntv.profile.browser === "Coship_js"){
        if(typeof(hardware)!= "undefined") {
            /*if(typeof(SysSetting) != "undefined")
             type = "N9101";
             else*/
            type = hardware.STB.type;
        }
    }
    else if(ntv.profile.browser === "iptv") {

    }
    return type;
};

/*--NTV对象初始化
 ====================================================== */
(function(){
    ntv.profile.init();
    ntv.profile.info();
})();