/*-- NTV
 ====================================================== --*/
/*kfp
* 1.封装获取页面的结点的方式 Id 和元素；
* 2.ajx异步请求的封装；
*
* */
/*--Common 公共类函数
 ====================================================== */
var $ = function(selector){
	if(selector.indexOf("#") > -1)
		return document.getElementById(selector.replace("#", ""));
	else
		return document.getElementsByTagName(selector);
};
/*
 * Ajax请求
 * @param o.url (String)        : 发送请求的地址。
 * @param o.type (String)       : 请求方式 ("POST" 或 "GET")，默认为"GET"。
 * @param o.async (Boolean)     : 此参数实际无效，默认为true。
 * @param o.data (Object,String): 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param o.success (Function)  : 请求成功后回调函数。参数：服务器返回数据，数据格式。
 * @param o.error (Function)    : (默认: 自动判断 (xml 或 html)) 请求失败时调用时间。参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
 */
$.ajax = function(o) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if(xhr)
	{
		if(o.url)
		{
			// 参数处理
			o.type = o.type ? o.type : "GET";
			o.async  = o.async ? o.async : true;

			if(o.type == "GET" && o.data) // 如果为"GET"方式，并且使用data方式传参
			{
				if(typeof o.data == "object")
				{
					var tmp = [];
					for ( var i in o.data)
						tmp.push(i + "=" + o.data[i]);
					o.data = tmp.join("&");
				}
				o.url = o.url + (/\?/.test(o.url) ? '&' : '?') + o.data;
			}
			// 发送AJAX请求
			xhr.open(o.type, o.url, o.async);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if(o.beforeSend){
                o.beforeSend(xhr);
            }
			xhr.onreadystatechange = function() {
				//ntv.log.console("state:"+xhr.readyState);
				/**
				 * AJAX运行步骤与状态值(xhr.readyState)说明
				 * 在AJAX实际运行当中，对于访问XMLHttpRequest（XHR）时并不是一次完成的，而是分别经历了多种状态后取得的结果，对于这种状态在AJAX中共有5种，分别是。
				 * 0 - (未初始化)还没有调用send()方法
				 * 1 - (载入)已调用send()方法，正在发送请求
				 * 2 - (载入完成)send()方法执行完成，
				 * 3 - (交互)正在解析响应内容
				 * 4 - (完成)响应内容解析完成，可以在客户端调用了
				 * 对于上面的状态，其中“0”状态是在定义后自动具有的状态值，而对于成功访问的状态（得到信息）我们大多数采用“4”进行判断。
				 */
				if(xhr.readyState==4) {
					// AJAX状态码(xhr.status)参考网络资料
					if(xhr.status == 200 || xhr.status == 304) {
						if(o.success){
							o.success.apply(xhr, [ xhr.responseText ]);
						}
					}else{
						if(o.error){
							o.error.apply(xhr);
							xhr.abort();//请求失败或者网络中断
						}
					}
				}
			};
			xhr.onerror=function(){//Network error 时候触发
				//alert("网络出错了，请稍后再试！");
				//o.netError.apply(xhr);
			}
			// 如果为"POST"方式，发送数据
			if(o.type == "POST"){
					xhr.send(o.data);
			}
			else if(o.type == "GET"){
				xhr.send(null);
			}
		}else{
			o.error.apply({status: 400, statusText: "The request url is empty!"});
		}
	}else
		o.error.apply({status: 400, statusText: "The current browser does support ajax or request url is empty!"});
};
