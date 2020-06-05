/*! All rights reserved, Pirates must investigate! 2019-04-11 */
var codeVersion = "v2.0.20190410";
"undefined" != typeof Utility ? (Utility.println("----------TJ " + codeVersion + "----------"), Utility.setDrawFocusRing(0)) : (console.log("----------TJ " + codeVersion + "(PC)----------"), CA = {serialNumber: "8120010187712846"});
var GlobalKeyFlag = 0;

function grabEvent(e) {
    var t = 0, n = window.event.keyCode || e.which, o = e ? e.modifiers : "";
    if (iDebug("++++++++keycode=" + n), n < 58 && 47 < n) t = numeric(n - 48); else switch (n) {
        case 1:
        case 38:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("up", o), e.stopPropagation(), e.preventDefault();
            break;
        case 2:
        case 40:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("down", o), e.stopPropagation(), e.preventDefault();
            break;
        case 3:
        case 37:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("left", o), e.stopPropagation(), e.preventDefault();
            break;
        case 4:
        case 39:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("right", o), e.stopPropagation(), e.preventDefault();
            break;
        case 13:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("enter", o);
            break;
        case 340:
        case 27:
        case 8:
        case 640:
            if (1 == GlobalKeyFlag) return 0;
            t = doBasicKey("back", o), e.stopPropagation(), e.preventDefault();
            break;
        case 513:
        case 17:
        case 36:
            t = doBasicKey("menu");
            break;
        case 512:
        case 306:
        case 36:
            t = doBasicKey("portal");
            break;
        case 595:
            t = doBasicKey("volUp");
            break;
        case 596:
            t = doBasicKey("volDown");
            break;
        default:
            t = doOtherKey(n, o)
    }
    return t
}

function $(e) {
    return extend(e = document.getElementById(e), domMethod)
}

document.onkeydown = grabEvent;
var domMethod = {
    css: function (e) {
        if ("string" == typeof e) return this.style[e];
        extend(this.style, e)
    }, bg: function (e) {
        /^#.+/.test(e) ? this.style.backgroundColor = e : this.style.backgroundImage = "url(" + e + ")"
    }
};

function extend(e, t) {
    for (var n in e = e || {}, t) e[n] = t[n];
    return e
}

var _cookie = {
    getCookie: function (t) {
        iDebug("getCookie:name=" + t);
        var n = "";
        if ("token-id" == t) n = function (e) {
            iDebug("document.getCookie:name=" + e);
            var t = e + "=";
            iDebug("document.cookieGet=" + document.cookie);
            for (var n = document.cookie.split(";"), o = 0; o < n.length; o++) {
                for (var i = n[o]; " " == i.charAt(0);) i = i.substring(1, i.length);
                if (0 == i.indexOf(t)) return unescape(i.substring(t.length, i.length))
            }
            return ""
        }(t); else try {
            n = Utility.getEnv(t)
        } catch (e) {
            n = sessionStorage.getItem(t)
        }
        return null != n && "null" != n && " " != n && void 0 !== n || (n = ""), n
    }, setCookie: function (t, n, r) {
        if (iDebug("setCookie:name=" + t + ",value=" + n), "token-id" != t) try {
            Utility.setEnv(t, n)
        } catch (e) {
            sessionStorage.setItem(t, n)
        } else !function (e, t, n) {
            iDebug("document.setCookie:_name=" + e + ",_value=" + t), n = n || 0;
            var o = "";
            if (0 != r) {
                var i = new Date;
                i.setTime(i.getTime() + 1e3 * n), o = "; expires=" + i.toGMTString()
            }
            document.cookie = e + "=" + escape(t) + o + "; path=/", iDebug("document.cookieSet=" + document.cookie)
        }(t, n, r)
    }, clearCookie: function (e) {
        setCookie(e, "", -1)
    }
}, _time = {
    t1: -1, week: ["鏄熸湡鏃�", "鏄熸湡涓€", "鏄熸湡浜�", "鏄熸湡涓�", "鏄熸湡鍥�", "鏄熸湡浜�", "鏄熸湡鍏�"], getTime: function (e) {
        var t = new Date, n = t.getHours(), o = t.getMinutes();
        n = n < 10 ? "0" + n : n, o = o < 10 ? "0" + o : o;
        var i = this;
        clearTimeout(this.t1), this.t1 = setTimeout(function () {
            i.getTime()
        }, 6e4), $(e).innerText = n + ":" + o
    }, getDay: function (e) {
        var t = new Date, n = t.getMonth() + 1, o = t.getDate();
        n = n < 10 ? "0" + n : n, o = o < 10 ? "0" + o : o, $(e).innerText = n + "-" + o
    }, getWeek: function (e) {
        var t = (new Date).getDay();
        $(e).innerText = this.week[t]
    }
}, _json = {
    toStr: function (e) {
        var t = "{ ";
        for (var n in e) t += "'" + n + "':'" + e[n] + "',";
        return t += " }"
    }, toJson: function (str) {
        return eval("(" + str + ")")
    }
};

function showMsg(e) {
    iDebug("showMsg:" + e), $("js-msgTip").innerHTML = e, $("js-msgTip").style.display = "block", setTimeout(function () {
        hideMsg()
    }, 2e3)
}

function hideMsg() {
    $("js-msgTip").innerHTML = "", $("js-msgTip").style.display = "none"
}

function showLogin() {
    var e = new popUP({
        url: "login.htm", left: 0, top: 0, width: 1280, height: 720, callBack: function () {
            e.show()
        }
    });
    return e.create(), e
}

function hideLogin(e) {
    e.minimize()
}

function iDebug(e) {
    "undefined" != typeof Utility ? Utility.println(e) : console.log(e)
}

function getUrlString(e, t) {
    var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        o = void 0 === t ? window.location.search.substr(1).match(n) : t.substr(1).match(n);
    return null != o ? unescape(o[2]) : null
}

String.prototype.sub = function (e) {
    var t = /[^\x00-\xff]/g;
    if (this.replace(t, "mm").length <= e) return this;
    for (var n = Math.floor(e / 2); n < this.length; n++) if (this.substr(0, n).replace(t, "mm").length >= e) return this.substr(0, n) + "...";
    return this
}, String.prototype.replaceAll = function (e, t, n) {
    return RegExp.prototype.isPrototypeOf(e) ? this.replace(e, t) : this.replace(new RegExp(e, n ? "gi" : "g"), t)
}, String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "rr").length
};
