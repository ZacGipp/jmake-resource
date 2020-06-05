/*! All rights reserved, Pirates must investigate! 2019-04-11 */
function popUP(t) {
    this.left = parseInt(t.left) || 0, this.top = parseInt(t.top) || 0, this.width = parseInt(t.width) || 1280, this.height = parseInt(t.height) || 720, this.id = t.id || "__ifr", this.url = t.url || "", this.callBack = t.callBack || function () {
    }, this.div = null, this.showFLag = !1, this.create = function () {
        this.createDiv()
    }, this.show = function (t) {
        this.getIframeObj().frameBorder = 0, this.div.style.visibility = "visible", this.showFLag = !0
    }, this.minimize = function () {
        this.div.style.visibility = "hidden", this.showFLag = !1, document.body.removeChild(this.div)
    }, this.createDiv = function () {
        this.div = document.createElement("div"), this.div.style.position = "absolute", this.div.style.left = this.left + "px", this.div.style.top = this.top + "px", this.div.style.width = this.width + "px", this.div.style.height = this.height + "px", this.div.style.visibility = "hidden", this.div.style.zIndex = "10001", document.body.appendChild(this.div), this.createIframe()
    }, this.createIframe = function () {
        var t = document.createElement("iframe");
        t.style.left = "0px", t.style.top = "0px", t.style.border = "none", t.width = "100%", t.height = "100%", t.frameborder = "0", t.scrolling = "no", t.id = this.id, t.name = this.id, t.src = this.url, this.div.appendChild(t), t.addEventListener ? t.addEventListener("load", this.callBack, !1) : t.attachEvent ? t.attachEvent("onload", this.callBack) : t.onload = this.callBack
    }, this.iframeLocation = function (t) {
        var i = t.left || this.left, e = t.top || this.top, h = t.width || this.width, s = t.height || this.height;
        this.div.style.left = i + "px", this.div.style.top = e + "px", this.div.style.width = h + "px", this.div.style.height = s + "px";
        var d = this.getIframeObj();
        d.window.location.href = t.url, d.addEventListener ? d.addEventListener("load", this.callBack, !1) : d.attachEvent ? d.attachEvent("onload", this.callBack) : d.onload = this.callBack
    }, this.getIframeObj = function () {
        return window.frames[this.id]
    }, this.getContainer = function () {
        return this.div
    }
}
