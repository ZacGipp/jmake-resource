/*-- NTV
 ====================================================== --*/
/*kfp 1.不同设备绑定不同的按键监听事件，
        ntv.key.listener_keyevent(ntv.profile.platform=="STB iPanel Coship PC")
      2.由于不同中间件浏览器厂商对返回键的默认行为不一致，需要禁用返回键的默认行为，重新定义返回键的功能
        e.preventDefault();ntv.navigation.move_back();用该函数定义返回键的行为。
   ？？3.监听系统事件的函数，采用重定义透传参数；不太懂；
*/
var ntv = ntv || {};

/*--Key 页面键值控制
 ====================================================== */
ntv.key = function(){};

ntv.key.init = function(){
    this.listener_keyevent();//kfp按键监听事件，监听遥控器键值动作（物理触发）；
    this.listener_systemevent();//kfpntv.key.systemevent() 函数就是监听系统事件的函数。
    // 系统事件主要是媒体播放模块与应用层交互的消息定义，各厂商中间件的事件代码定义也不一致。
    // ntv.js框架已经对这些系统事件进行了处理，一般应用不需要开发者来处理这些系统事件。
    // 同样所有的系统事件都透传给了，ntv.key.systemevent_handle() 函数，在其他框架模块中也是通过重写；
    this.keycode_set();
};

//给不同的设备添加相应的按键监听事件==========================
ntv.key.listener_keyevent = function(){
    if(ntv.profile.platform == "STB") {
        document.onkeydown = this.keypress;
        if(ntv.profile.browser == "iPanel")
        {
            document.onkeypress = this.keypress;
            document.onirkeypress = this.keypress;
        }
        if(ntv.profile.browser == "Coship"){
            document.onkeypress = this.systemevent;
            //document.onirkeypress = this.systemevent;
        }
        /*适配吉视盒子按键监听*/
        if(ntv.profile.browser == "Coship_js"){
            document.onkeypress = this.keypress;
            document.onkeypress = this.systemevent;
            //document.onirkeypress = this.systemevent;
        }
        if(ntv.profile.browser == "iptv"){
            //document.addEventListener("keydown",this.keypress,false);
            document.onkeypress = this.keypress;
            //document.onkeypress = this.systemevent;
        }
    } else if(ntv.profile.platform == "PC") {
        document.addEventListener("keydown",this.keypress,false);
        //document.onkeydown = this.keypress;
    }
};

ntv.key.listener_systemevent = function(){
    if(ntv.profile.browser == "NGB-H"
        || ntv.profile.browser == "iPanel" || ntv.profile.browser == "Coship") {
        document.onsystemevent = this.systemevent;
    }
    else if(ntv.profile.browser == "SHDV")
    {
        jShow.signal.connect(ntv.key.systemevent);
    }
};

//获取用户按下键的值==============================
ntv.key.keypress = function(event){
    var key_event = event ? event : window.Event;
    var key_code = key_event.which ? key_event.which : key_event.keyCode;
    //ntv.log.console(key_code);
    ntv.navigation.move(key_code, event); // 用来处理 上/下/左/右/确定/刷新/返回 等常规键值
    ntv.key.keypress_handle(key_code); // 用来自定义处理键值的函数
};

/*
 * 用于手动控制返回页面路径的键值处理函数, 由于各浏览器厂商对返回事件处理不一致.
 * 说明: 通过禁止系统处理返回事件来达到手动控制返回操作. 代码经测试, 必须写在此处.
 * 使用：通过调用如下代码来手动控制返回操作
 *       ntv.stb.key.enable_manual_control_back_event();
 *       //kfp指定当前页面的返回地址；
 *       ntv.stb.key.move_back_url = "返回页面地址";
 */
ntv.key.keypress_for_manual_control_back_event = function(event){
    //alert("keypress_for_manual_control_back_event");
    var key_event = event ? event : window.Event;
    var key_code = key_event.which ? key_event.which : key_event.keyCode;
    ntv.log.console("ntv.key.keypress, keycode: " + key_code);

    // 禁用系统返回键动作,以下代码必须放置在此
    var browser = ntv.profile.browser;
    if(browser == "NGB-H" && key_code == ntv.key.keycode_stb_ngb_h.KEY_BACK)
    {
        ntv.navigation.move_back();
    }
    else if(browser == "Coship" && (key_code == ntv.key.keycode_stb_coship.KEY_BACK || key_code == ntv.key.keycode_stb_coship_n9101.KEY_BACK))
    {
        //event.preventDefault();
        ntv.navigation.move_back();
    }
    /*吉视盒子返回键处理*/
    else if(browser == "Coship_js" && (key_code == ntv.key.keycode_stb_coship_js.KEY_BACK ))
    {
        //event.preventDefault();
        ntv.navigation.move_back();
    }
    else if(browser == "iptv" && (key_code == ntv.key.keycode_stb_iptv.KEY_BACK ))
    {
        //event.preventDefault();
        ntv.navigation.move_back();
        return 0;
    }
    else if(browser == "iPanel" && key_code == ntv.key.keycode_stb_ipanel.KEY_BACK)
    {
        ntv.navigation.move_back();
        return 0;
    }
    else if(browser == "SHDV" && key_code == ntv.key.keycode_stb_shdv.KEY_BACK)
    {
        ntv.navigation.move_back();
    }
    else if(browser == "PCBrowser" && key_code == ntv.key.keycode_pc.KEY_BACK)
    {
        //event.preventDefault();
        ntv.navigation.move_back();
    }
    else
    {
        ntv.navigation.move(key_code, event); // 用来处理 上/下/左/右/确定/刷新/返回 等常规键值
        ntv.key.keypress_handle(key_code); // 用来自定义处理键值的函数
    }
};

// 具体使用时重写此函数
ntv.key.keypress_handle = function(event_code){
    ntv.log.console("ntv.key.keypress_handle(), event_code: " + event_code);
};

ntv.key.systemevent = function(event){
    // SHDV回传对象需重新构造
    if(ntv.profile.browser == "SHDV")
    {
        // 重构透传参数
        var shdv_system_event = {
            type: event.type,
            which: event.msg,
            modifiers: event.info
        };
        event = shdv_system_event;
    }
    var system_event = event ? event : window.Event;
    var event_code = system_event.which ? system_event.which : system_event.keyCode;
    //调试语句
    if(ntv.profile.browser == "Coship") {
        var dvbEvent = DVB.getEvent(event_code, system_event.userInt);
        if(dvbEvent)
            ntv.log.console("ntv.stb.systemevent():" + dvbEvent + ", event_code:" + event_code);
    } else if(ntv.profile.browser == "Coship_js") {
        var dvbEvent = DVB.getEvent(event_code, system_event.userInt);
        if(dvbEvent)
            ntv.log.console("ntv.stb.systemevent():" + dvbEvent + ", event_code:" + event_code);
    }
    //ntv.log.console("ntv.key.systemevent(), event_code: " + event_code);
    ntv.key.systemevent_handle(event_code);
};

// 具体使用时重写此函数
ntv.key.systemevent_handle = function(event_code){
    ntv.log.console("ntv.key.systemevent_handle(), event_code: " + event_code);
};

ntv.key.keycode_pc = {
    KEY_OK : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 116,
    KEY_BACK : 8, //用Backspace键表示返回8
    KEY_VOLUME_UP: 87, //用q键表示音量-
    KEY_VOLUME_DOWN: 81, //用w键表示音量+

    KEY_RED: 192 // ~键(tab上方)
};

/*ntv.key.keycode_stb_ipanel = {
    KEY_OK : 13,
    KEY_UP : 1,
    KEY_DOWN : 2,
    KEY_LEFT : 3,
    KEY_RIGHT : 4,
    KEY_REFRESH : 338,
    KEY_BACK : 340,

    KEY_RED: 832
};*/
ntv.key.keycode_stb_ipanel = {//Ipanel
    KEY_OK : 13,
    KEY_UP : 1,
    KEY_DOWN : 2,
    KEY_LEFT : 3,
    KEY_RIGHT : 4,
   /* KEY_REFRESH : 116,*/
    KEY_BACK : 340, //用z键表示返回8
    KEY_VOLUME_UP: 4, //用q键表示音量-
    KEY_VOLUME_DOWN:3, //用w键表示音量+
    KEY_GO_FORWORD:373,//快进
    KEY_GO_BACK:372,//快退
    /*KEY_RED: 192 // ~键(tab上方)*/
};
ntv.key.keycode_stb_shdv = {
    KEY_OK : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 338,
    KEY_BACK : 70,

    KEY_RED: 66
};

ntv.key.keycode_stb_ngb_h= {
    KEY_OK : 4097,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 4226,
    KEY_BACK : 4096,

    KEY_RED: 2305
};
/*吉视盒子键码*/
ntv.key.keycode_stb_coship_js= {
    KEY_HOME: 468, //菜单
    KEY_OK : 13,
    KEY_QUIT: 27, //退出
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 338,
    KEY_BACK : 640, //返回
    KEY_VOLUME_UP: 447,
    KEY_VOLUME_DOWN: 448,

    KEY_RED: 403,
    KEY_GREEN: 404,
    KEY_YELLOW: 405,
    KEY_BLUE: 406
};
//iptv键码
ntv.key.keycode_stb_iptv= {
    KEY_HOME: 468, //菜单
    KEY_OK : 13,
    KEY_QUIT: 27, //退出
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 338,
    KEY_BACK :8, //返回8
    KEY_VOLUME_UP: 259,
    KEY_VOLUME_DOWN: 260,

    KEY_RED: 403,
    KEY_GREEN: 404,
    KEY_YELLOW: 405,
    KEY_BLUE: 406
};
ntv.key.keycode_stb_coship= { //N9201
    KEY_HOME: 468, //菜单
    KEY_OK : 13,
    KEY_QUIT: 27, //退出
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    KEY_REFRESH : 338,
    KEY_BACK : 640, //返回
    KEY_VOLUME_UP: 447,
    KEY_VOLUME_DOWN: 448,

    KEY_RED: 403,
    KEY_GREEN: 404,
    KEY_YELLOW: 405,
    KEY_BLUE: 406
};


ntv.key.keycode_stb_coship_n9101= {
    KEY_OK: 10,
    KEY_UP: 87,
    KEY_DOWN: 83,
    KEY_LEFT: 65,
    KEY_RIGHT: 68,
    KEY_BACK: 69,
    KEY_VOLUME_UP: 61,
    KEY_VOLUME_DOWN: 45,

    KEY_PREV: 306,
    KEY_NEXT: 222,
    KEY_QUIT: 72,
    KEY_PLAY: 59,

    KEY_RED: 320,
    KEY_GREEN: 323,
    KEY_YELLOW: 321,
    KEY_BLUE: 322

};

//针对不同的浏览器赋不同的值===========================

ntv.key.keycode = ntv.key.keycode_pc;

ntv.key.keycode_set = function(){
    if(ntv.profile.browser == "Coship") {
        if(ntv.profile.type == "N9101")
            this.keycode = this.keycode_stb_coship_n9101;
        else
            this.keycode = this.keycode_stb_coship;
    }
    else if(ntv.profile.browser == "iPanel")
        this.keycode = this.keycode_stb_ipanel;
    else if(ntv.profile.browser == "SHDV")
        this.keycode = this.keycode_stb_shdv;
    else if(ntv.profile.browser == "NGB-H")
        this.keycode = this.keycode_stb_ngb_h;
    else if(ntv.profile.browser == "Coship_js")
        this.keycode = this.keycode_stb_coship_js;
    else if(ntv.profile.browser == "iptv"){
        this.keycode = this.keycode_stb_iptv;
    }
};

/*--Key对象初始化
 ====================================================== */
(function(){
    ntv.key.init();
})();