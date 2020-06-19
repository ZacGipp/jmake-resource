/*-- NTV
 ====================================================== --*/

var ntv = ntv || {};

/*--依赖 ngb_h.js, ipanel.js, shdv.js, pc.js 之后引用
 ====================================================== */

/*--STB
 ====================================================== */
ntv.stb = ntv.stb || function(){};

ntv.stb.init = function(){
	ntv.stb.load.init();
	ntv.stb.key.init();
	ntv.stb.mediaplayer.init();
	ntv.stb.systemevent.init();
	ntv.stb.unload.init();
};

/*--Load
 ====================================================== */
ntv.stb.load = function(){};
ntv.stb.load.init = function(){
	var browser = ntv.profile.browser;

	if(browser === "NGB-H")
		ntv.stb.ngb_h.init();
	else if(browser === "iPanel")
		ntv.stb.ipanel.init();
	else if(browser === "SHDV")
		ntv.stb.shdv.init();
	else if(browser === "Coship")
		ntv.stb.coship.init();
	else if(browser === "Coship_js"){
		ntv.stb.coship_js.init();
	}
	else if(browser === "iptv"){
		ntv.stb.iptv_js.init();
	}
};

/*--Tools
 ====================================================== */
ntv.stb.get_version = function(){
	var version = "未获取到浏览器版本!";
	var browser = ntv.profile.browser;
	if(browser === "iPanel")
		version = ntv.stb.ipanel.get_version()[0];
	else if(browser === "SHDV")
		version = ntv.stb.shdv.get_version();
	else if(browser === "NGB-H")
		version = ntv.stb.ngb_h.get_version();
	else if(browser === "PCBrowser")
		version = ntv.stb.pcbrowser.get_version();
	else if(browser === "Coship")
		version = ntv.stb.coship.get_version();
	else if(browser === "Coship_js")
		version = ntv.stb.coship_js.get_version();
	else if(browser === "iptv")
		version = ntv.stb.iptv_js.get_version();

	return version;
};

ntv.stb.get_MAC = function(){
	var mac = "未获取到机顶盒MAC地址!";
	var browser = ntv.profile.browser;
	if(browser === "iPanel")
		mac = ntv.stb.ipanel.get_MAC();
	else if(browser === "SHDV")
		mac = ntv.stb.shdv.get_MAC();
	else if(browser === "NGB-H")
		mac = ntv.stb.ngb_h.get_MAC();
	else if(browser === "PCBrowser")
		mac = ntv.stb.pcbrowser.get_MAC();
	else if(browser === "Coship")
		mac = ntv.stb.coship.get_MAC();
	else if(browser === "Coship_js")
		mac = ntv.stb.coship_js.get_MAC();
	else if(browser === "iptv")
		mac = ntv.stb.iptv_js.get_MAC();
	return mac;
};

ntv.stb.get_SN = function() {
	var sn = "未获取到机顶盒序列号!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		sn = ntv.stb.pcbrowser.get_SN();
	else if(browser === "Coship")
		sn = ntv.stb.coship.get_SN();
	else if(browser === "Coship_js")
		sn = ntv.stb.coship_js.get_SN();
	else if(browser === "iptv")
		sn = ntv.stb.iptv_js.get_SN();
	else if(browser === "iPanel")
		sn = ntv.stb.ipanel.get_SN();
	return sn;
};

ntv.stb.get_CA = function() {
	var CA = "未获取到智能卡号!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		CA = ntv.stb.pcbrowser.get_CA();
	else if(browser === "Coship")
		CA = ntv.stb.coship.get_CA();
	else if(browser === "Coship_js")
		CA = ntv.stb.coship_js.get_CA();
	else if(browser === "iptv")
		CA = ntv.stb.iptv_js.get_CA();
	else if (browser==="iPanel")
		CA=ntv.stb.ipanel.get_CA();
	return CA;
};

ntv.stb.get_Provider = function() {
	var provider = "未获取到机顶盒厂商!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		provider = ntv.stb.pcbrowser.get_Provider();
	else if(browser === "Coship")
		provider = ntv.stb.coship.get_Provider();
	else if(browser === "Coship_js")
		provider = ntv.stb.coship_js.get_Provider();
	else if(browser === "iptv")
		provider = ntv.stb.iptv_js.get_Provider();
	else if(browser === "iPanel")
		provider = ntv.stb.ipanel.get_Provider();
	return provider;
};

ntv.stb.get_Type = function() {
	var type = "未获取到机顶盒类型!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		type = ntv.stb.pcbrowser.get_Type();
	else if(browser === "Coship")
		type = ntv.stb.coship.get_Type();
	else if(browser === "Coship_js")
		type = ntv.stb.coship_js.get_Type();
	else if(browser === "iptv")
		type = ntv.stb.iptv_js.get_Type();
	else if(browser === "iPanel")
		type = ntv.stb.ipanel.get_Type();
	return type;
};

ntv.stb.get_brand = function() {
	var brand = "未获取到机顶盒品牌!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		brand = ntv.stb.pcbrowser.get_brand();
	else if(browser === "Coship")
		brand = ntv.stb.coship.get_brand();
	else if(browser === "Coship_js")
		brand = ntv.stb.coship_js.get_brand();
	else if(browser === "iptv")
		brand = ntv.stb.iptv_js.get_brand();
	else if(browser === "iPanel")
		brand = ntv.stb.ipanel.get_brand();
	return brand;
};

ntv.stb.get_model = function() {
	var model = "未获取到机顶盒型号!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		model = ntv.stb.pcbrowser.get_model();
	else if(browser === "Coship")
		model = ntv.stb.coship.get_model();
	else if(browser === "Coship_js")
		model = ntv.stb.coship_js.get_model();
	else if(browser === "iptv")
		model = ntv.stb.iptv_js.get_model();
	else if(browser === "iPanel")
		model = ntv.stb.ipanel.get_model();
	return model;
};

ntv.stb.get_env = function(name) {
	var rs = "未获取到"+name+"!";
	var browser = ntv.profile.browser;
	if(browser === "PCBrowser")
		rs = ntv.stb.pcbrowser.get_env(name);
	else if(browser === "Coship")
		rs = ntv.stb.coship.get_env(name);
	else if(browser === "Coship_js")
		rs = ntv.stb.coship_js.get_env(name);
	else if(browser === "iptv")
		rs = ntv.stb.iptv_js.get_env(name);
	else if(browser === "iPanel")
		rs = ntv.stb.ipanel.get_env(name);
	return rs;
};
ntv.stb.get_stbIp=function(){
	var rs="未获取到机顶盒IP!";
	var browser=ntv.profile.browser;
	if(browser === "iPanel"){
		rs = ntv.stb.ipanel.get_stbIp();
	}
	return rs;
}
ntv.stb.get_stbServiceGroupID=function(){
	var rs="未获取到机顶盒区域码!";
	var browser=ntv.profile.browser;;
	if(browser === "iPanel"){
		rs = ntv.stb.ipanel.get_stbServiceGroupID();
	}
	return rs;
}
/*--Key
 ====================================================== */
ntv.stb.key = function(){};
ntv.stb.key.move_back_url = "";
ntv.stb.key.init = function(){
	var browser = ntv.profile.browser;

	if(browser === "NGB-H")
		ntv.navigation.move_back = ntv.stb.ngb_h.key.move_back;
	else if(browser === "iPanel")
		ntv.navigation.move_back = ntv.stb.ipanel.key.move_back;
	else if(browser === "SHDV")
		ntv.navigation.move_back = ntv.stb.shdv.key.move_back;
	else if(browser === "PCBrowser")
		ntv.navigation.move_back = ntv.stb.pcbrowser.key.move_back;
	else if(browser === "Coship")
		ntv.navigation.move_back = ntv.stb.coship.key.move_back;
	else if(browser === "Coship_js")
		ntv.navigation.move_back = ntv.stb.coship_js.key.move_back;
	else if(browser === "iptv")
		ntv.navigation.move_back = ntv.stb.iptv_js.key.move_back;
};

ntv.stb.key.enable_manual_control_back_event = function(){
	if(ntv.profile.platform === "PC") {
		document.removeEventListener("keydown", ntv.key.keypress, false);
		document.addEventListener("keydown", ntv.key.keypress_for_manual_control_back_event, false);
	} else
		ntv.key.keypress = ntv.key.keypress_for_manual_control_back_event;
};

/*--MediaPlayer
 ====================================================== */
ntv.stb.mediaplayer = function(){};
ntv.stb.mediaplayer.init = function(){
	var browser = ntv.profile.browser;
	if(browser === "NGB-H")
		ntv.stb.mediaplayer = ntv.stb.ngb_h.mediaplayer;
	else if(browser === "iPanel") {
		ntv.stb.mediaplayer = ntv.stb.ipanel.mediaplayer;
	}
	else if(browser === "SHDV")
		ntv.stb.mediaplayer = ntv.stb.shdv.mediaplayer;
	else if(browser === "PCBrowser")
		ntv.stb.mediaplayer = ntv.stb.pcbrowser.mediaplayer;
	else if(browser === "Coship"){
		ntv.stb.mediaplayer = ntv.stb.coship.mediaplayer;}
	else if(browser === "Coship_js"){
		ntv.stb.mediaplayer = ntv.stb.coship_js.mediaplayer;
	}else if(browser === "iptv"){
		ntv.stb.mediaplayer = ntv.stb.iptv_js.mediaplayer;
	}
};

/*--SystemEvent
 ====================================================== */
ntv.stb.systemevent = function(){};
ntv.stb.systemevent.init = function(){
	var browser = ntv.profile.browser;

	if(browser === "NGB-H")
		ntv.key.systemevent_handle = ntv.stb.ngb_h.systemevent;
	else if(browser === "iPanel"){
		//ntv.key.systemevent_handle = ntv.stb.ipanel.systemevent;
	}
	else if(browser === "SHDV")
		ntv.key.systemevent_handle = ntv.stb.shdv.systemevent;
	else if(browser === "Coship")
		ntv.key.systemevent_handle = ntv.stb.coship.systemevent;
	else if(browser === "Coship_js")
		ntv.key.systemevent_handle = ntv.stb.coship_js.systemevent;
	else if(browser === "iptv")
		ntv.key.systemevent_handle = ntv.stb.iptv_js.systemevent;
	else if(browser === "PCBrowser"){
		ntv.key.systemevent_handle = ntv.stb.pcbrowser.systemevent;
	}
};

/*--unload
 ====================================================== */
ntv.stb.unload = function(){};
ntv.stb.unload.init = function(){
	var browser = ntv.profile.browser;

	if(browser === "NGB-H") // NGB-H在离开页面时会自动释放媒体资源
		ntv.page.onbeforeunload_stb = ntv.stb.ngb_h.onpageunload;
	else if(browser === "iPanel")
		ntv.page.onbeforeunload_stb =ntv.stb.ipanel.onpageunload;
	else if(browser === "SHDV")
		ntv.page.onbeforeunload_stb =ntv.stb.shdv.onpageunload;
	else if(browser === "Coship")
		ntv.page.onbeforeunload_stb =ntv.stb.coship.onpageunload;
	else if(browser === "Coship_js")
		ntv.page.onbeforeunload_stb =ntv.stb.coship_js.onpageunload;
	else if(browser === "iptv"){
		ntv.page.onbeforeunload_stb =ntv.stb.iptv_js.onpageunload;
	}
};

/*--stb对象初始化
 ====================================================== */
(function(){
	ntv.stb.init();
})();
