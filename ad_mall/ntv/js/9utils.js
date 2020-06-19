/*-- NTV
 ====================================================== --*/
var ntv = ntv || {};

/*-- Utils 工具类
 ====================================================== */
ntv.utils = function(){};
/*-- 全局变量
 ====================================================== */
ntv.utils.env = function(){};
ntv.utils.env.ajaxUrlHead ="";
//ntv.utils.env.ajaxUrlHead = "http://182.138.26.61:7080"; //http://localhost:8080  v2:http://120.27.193.49:8081  http://172.18.129.38:8080  http://10.0.2.102:8080
ntv.utils.env.opratorId = "310051"; //310051  110001:北方广电渠道号 410001湖南电信
ntv.utils.env.appVersion = "3.2";//带launcher，带直播
ntv.utils.env.jumpDelay = 5000; //跳转延迟，等待统计事件发出

ntv.utils.sleep = function (milliSeconds,component){
	if(new Date()){
		var startTime = new Date().getTime(); // get the current time
		while (new Date().getTime() < startTime + milliSeconds){}
	}else{
		for (var i = 0; i < milliSeconds; i++){
			component.style.display = "block";
		}
	}
};

/**
* @description 写cookie，设置全局参数
* @param {string} _sName 全局参数名称
* @param {string} _sValue 全局参数名称对应的值
*/
ntv.utils.env.setGlobalVar = function(_sName, _sValue){
	/*try {
		_sValue = _sValue + "";
		if(Utility.setEnv) {
			Utility.setEnv(_sName, encodeURIComponent(_sValue));
		} else {
			SysSetting.setEnv(_sName, "" + encodeURIComponent(_sValue));//9101
		}
	} catch(e) {*/
		var date = new Date();
		date.setTime(date.getTime() + (7*24*60*60*1000));
		document.cookie = escape(_sName) + "=" + escape (_sValue) + "; expires=" + date.toGMTString()+";path=/;";
		//document.cookie = escape(_sName) + "=" + escape(_sValue) + "; path=/";
	//};
};

/**
 * @description 读cookie，获取全局参数
 * @param {string} _sName 全局参数名称（对应setGlobalVar方法中的_sName）
 * @return {string} result 返回值（对应setGlobalVar方法中的_sValue）
 */
ntv.utils.env.getGlobalVar = function(_sName) {
	var result = "";
	/*try {
		if(Utility.getEnv) {
			result = decodeURIComponent(Utility.getEnv(_sName));
		} else {
			result = decodeURIComponent(SysSetting.getEnv(_sName));//9101
		}
		if(result === "undefined") {
			result = "";
		}
	} catch (e) {*/
		var aCookie = document.cookie.split("; ");
		for(var i = 0; i < aCookie.length; i++) {
			var aCrumb = aCookie[i].split("=");
			if(escape(_sName) === aCrumb[0]) {
				result = unescape(aCrumb[1]);
				break;
			}
		}
	//}
	return result;
};

/*-- 字符串相关
 ====================================================== */
ntv.utils.string = function(){};
ntv.utils.string.substring = function(str,len){
	var r = /[^\x00-\xff]/g; // 支持中英文数字混合模式
	// if(str.replace(r,"mm").length <= len)
	return str;
//kfp 后面的代码是不会被执行。没有意义。
	var m = Math.floor(len / 2);
	for(var i = m; i < str.length ; i++){
		if(str.substr(0, i).replace(r,"mm").length >= len){
			return str.substr(0, i) + "...";
		}
	}
	return str;
};
ntv.utils.string.prefix = function(size, num){
	//判断num是否足位size,若不足则补0
	var sLen = ('' + num).length;
	if (sLen >= size) {
		return '' + num;
	}
	var preZero = (new Array(size)).join('0');

	return this.substring(preZero, size - sLen) + num;
};

//将json字符串解析为json对象
ntv.utils.parseJSON = function(_data) {
    /*if(ntv.profile.browser === "iPanel") {
	 //华数数源科技盒子有出现此函数失败，故而直接使用
	 return eval("(" + _data + ")");
	 }
	 if( typeof _data !== "string" || !_data) {
	 return null;
	 }*/
	//data = trim( data );
	// if(_data.indexOf("a_") >= 0) {//此句的作用在于showMsg中的弹出提示框不是json格式
	// 	return _data;
	// }
	if(window.JSON && window.JSON.parse) {
		return window.JSON.parse(_data);
	} else {
		return eval("(" + _data + ")");
	}
};
//将json对象序列化为字符串
ntv.utils.stringifyJSON=function (jsonObj){
	var jsonStr="";
	if(jsonObj!==null && typeof(jsonObj)==="object"){
		var beginStr = "{";
		var endStr = "}";
		if(jsonObj&&jsonObj.constructor == Array){
			beginStr = "[";
			endStr = "]";
		}
		for(var attr in jsonObj){
			if(!(attr>=0)){
				jsonStr += "'"+ attr + "':";
			}
			var type=typeof(jsonObj[attr]);
			if(type=="number"){
				jsonStr += jsonObj[attr];
			}else if(type=="object"){
				if(jsonObj[attr]==null){
					jsonStr +=String(jsonObj[attr]);
				}else{
					jsonStr += this.jsonObjTojsonStr(jsonObj[attr]);
				}
			}else{
				jsonStr +="'"+jsonObj[attr]+"'";
			}
			jsonStr +=",";
		}
		jsonStr = jsonStr.substr(0,jsonStr.length-1);
		jsonStr = beginStr+jsonStr+endStr;
	}
	return jsonStr;
};
//url处理
ntv.utils.url = function(){};
//获取url中param参数的值  例子：var serviceCode = ntv.utils.getQueryStr(location.href, "serviceCode");
ntv.utils.url.getQueryStr = function (_url, _param) {
	var rs = new RegExp("(^|)" + _param + "=([^\&]*)(\&|$)", "g").exec(_url), tmp;
	if( tmp = rs) {
		return tmp[2];
	}
	return "";
};

/*替换字符串中参数的值searchStr：查找的字符串，replaceVal：替换的变量值
 var backUrl=backUrl.replaceQueryStr(breakpointTime,"vod_ctrl_breakpoint");

String.prototype.replaceQueryStr = function(_replaceVal, _searchStr) {
	var restr = _searchStr + "=" + _replaceVal;
	var rs = new RegExp("(^|)" + _searchStr + "=([^\&]*)(\&|$)", "g").exec(this), tmp;
	var val = null;
	if( tmp = rs) {
		val = tmp[2];
	}
	if(val == null) {
		if(this.lastIndexOf("&") == this.length - 1) {
			return this + restr;
		} else if(this.lastIndexOf("?") >= 0) {
			return this + "&" + restr;
		}
		return this + "?" + restr;
	}
	var shs = _searchStr + "=" + val;
	if(this.lastIndexOf("?" + shs) >= 0) {
		return this.replace("?" + shs, "?" + restr);
	}
	return this.replace("&" + shs, "&" + restr);
};
 */

/*-- 机顶盒相关
 ====================================================== */
ntv.utils.stb = function(){};
ntv.utils.stb.clear_html = function(str){
	return this.clear_a_mailto(str);
};

/* 解决HTML<a href="mailto:li.wen@shanghaiik.com"></a>
 * 含带href="mailto:**"导致机顶盒的浏览器无法解析。*/
ntv.utils.stb.clear_a_mailto = function(str){
	return str.replace(/href="mailto:/g, " style='color:#000;' href='#mailto:'");
};
