/**
 * 获取url search的特定项的值
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return r[2];
	}
	return "";
}

function getHash() {
	return window.location.hash.replace(/#/g, "");
}

function setHash(hash) {
	window.location.hash = hash || "";
}

/**
 * element获取焦点
 * @param el
 */
function focusElement(el) {
	setTimeout(function () {
		el.focus();
	}, 50);
}

function hideElement(el) {
	el.classList.add("hide");
}

function showElement(el) {
	el.classList.remove("hide");
}

function setActivityStatus(bool) { // 设置活动状态
	if (bool) {
		hideElement(CONFIG.el_processing);
		showElement(CONFIG.el_ending);
	} else {
		hideElement(CONFIG.el_ending);
		showElement(CONFIG.el_processing);
	}
}

function ajax(options) {
	options = options || {};
	options.type = (options.type || "post").toUpperCase();
	options.dataType = options.dataType || "json";
	options.url = CONFIG.DOMAIN + options.url;
	var params = formatParams(options.data);
	//创建xhr对象 - 非IE6
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//GET POST 两种请求方式
	if (options.type === "GET") {
		xhr.open("GET", options.url, true);
		xhr.setRequestHeader("terminalType", "ottWeb");
		xhr.send(null);
	} else {
		xhr.open("POST", options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("terminalType", "ottWeb");
		xhr.send(params);
	}
	//接收
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				var response = {};
				try {
					response = JSON.parse(xhr.responseText);
				} catch (e) {
					response = {};
				}

				switch (response.status) {
					case 1:
						break;
					case 3014:
						CONFIG.ENDING = true;
						break;
					case 3107:
						MSG.noChance();
						break;
					case 3108:
						MSG.notWon();
						break;
					case 4001:
						MSG.showMsg({
							msgType: 1,
							detail: '登录之后才能抽奖哦!',
							btnLabel: '立即登录',
							btnClick: function () {
								goOTTPage({
									pageCode: "0009",
									pageName: "登录页面"
								})
							}
						});
						break;
					default:
						MSG.error(response.msg);
						break;
				}
				setActivityStatus(CONFIG.ENDING);
				options.success && options.success(response);
			} else {
				options.fail && options.fail(status);
			}
		}
	}
}

//格式化参数
function formatParams(data) {
	var arr = [];
	for (var name in data) {
		arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	}
	// arr.push(("v=" + Math.random()).replace(".", ""));
	return arr.join("&");
}

function goPayPage() {
	goOTTPage({
		pageCode: "0013",
		pageName: "支付页面"
	});
}

function goOTTPage(json) {
	// type, targetJson, pageName
	window.JSCampaign && window.JSCampaign.pageOpen && window.JSCampaign.pageOpen(
		"pageOpen",
		JSON.stringify(json),
		""
	);
}

function makeQrcodeCode(url) {

	if (!url) {
		return;
	}

	CONFIG.qrcode.makeCode(url);
}
