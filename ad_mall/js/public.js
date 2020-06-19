function setCoord(index) {//焦点图片定位
    index = parseInt(index);
    ntv.navigation.coord =index+"";
    ntv.navigation.init();
}
//设置音量
var voiceTimer;     // 447    448
function TV_voice() {
    ntv.key.keypress_handle = function (event_code) {
        var volumeStep = 3;
        var volumeMax =100;
        var volumeMin =0;
        if (ntv.profile.browser === "iptv") {
            volumeStep = 3;
            volumeMax = 93;
            volumeMin = 3;
            if(event_code === 768) {
            }
        }
        if (event_code === ntv.key.keycode.KEY_VOLUME_UP || event_code === ntv.key.keycode.KEY_VOLUME_DOWN) {
            event.preventDefault();
            //var volume = parseInt(ntv.utils.env.getGlobalVar("htvVolume"));
            //if (volume < 0) { //为负则从系统中获取当前音量
             var volume = parseInt(ntv.stb.mediaplayer.get_volume());
            //}
            if (event_code === ntv.key.keycode.KEY_VOLUME_UP) { //音量+
                if (volume !== volumeMax) {
                    volume += volumeStep;
                    if (volume >= volumeMax)
                        volume = volumeMax;
                }
            }
            if (event_code === ntv.key.keycode.KEY_VOLUME_DOWN) { //音量-
                if (volume !== 0) {
                    volume = volume - volumeStep;
                    if (volume <= volumeMin)
                        volume = 0;
                }
            }
            clearTimeout(voiceTimer);
            volume=parseInt(volume);
            ntv.stb.mediaplayer.set_volume(volume);
            changeVoiceImg(volume / volumeStep);
            //ntv.utils.env.setGlobalVar("htvVolume", volume);
            $("#value").innerHTML=parseInt(volume);
            voiceTimer = setTimeout(function () {
                $("#voice").style.display = "none";
            }, 3000);
        }

        if (event_code === ntv.key.keycode.KEY_BACK) {
            event.preventDefault();
        }
    }
}
//改变音量图
function changeVoiceImg(voiceIndex) {
    $("#voice").style.display = "block";
    $("#voice_green").style.left = (voiceIndex - 33) * 17.69 + "px";
}
/*字符串截取*/
function cutstr(str, len) {
    /*var str = str.replace(/([，。？“”|“”])/ig, function (u, $1) {//中文标点替换成英文标点
        return $1 == "，" ? "," : $1 == "。"
            ? "." : $1 == "“"
            ? "'" : $1 == "”"
            ? "'" : $1 == "“”"
            ? "'" : $1 == "？"
            ? "?" : u;
    });*/
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}
var progressTimer = null;
function play_schedule(ele, lineLength, duration, currentTime,left) {//时长单位为s？
    clearInterval(progressTimer);
    var step = lineLength / duration;//每秒钟走的长度
    var startLeft = currentTime * step;
    var restTime = duration - currentTime;
    ele.style.left = (left + startLeft) + "px";
    progressTimer = setInterval(function () {
        startLeft += step;
        ele.style.left = left + startLeft + "px";
        restTime--;
        if(restTime<=1){
            clearInterval(progressTimer);
        }
    }, 1000);
}

//退出应用方法
function _exitApp(){
    if (ntv.profile.browser === "iptv"){
        Utility.setValueByName("exitIptvApp");//上海电信iptv退出应用的方式
    }else {
        //var isOuterJump=ntv.utils.env.getGlobalVar("PORTAL_ADDR");
        var historyLength=ntv.utils.env.getGlobalVar("historyLength");
        var l=history.length;
        var timer=setTimeout(function(){
            clearTimeout(timer);
            history.go(historyLength-l-1);
        },600)
    }
}
//点播页文字滚动
var fontScrollTimer2;
function fontScroll2(ele,fontMaxCount){
    clearInterval(fontScrollTimer2);
    //判断文字的个数
    var fontCount = ele.innerHTML.length;
    var width =parseInt(ele.offsetWidth);
    var fontMaxCount = parseInt(fontMaxCount);
    var newLeft = 0;
    if(fontCount>fontMaxCount){
        ele.style.width = "auto";
        ele.style.whiteSpace = "nowrap";
        var newWidth = parseInt(ele.offsetWidth);
        if(newWidth===0){newWidth=220}
        fontScrollTimer2 = setInterval(function(){
            if(Math.abs(newLeft)+width >= newWidth+200){
                newLeft=200;
                ele.style.left = newLeft+"px";
                //clearInterval(fontScrollTimer);
            }else{
                newLeft -=2;
                ele.style.left = newLeft+"px";
            }
        },35);
    }
}
/** 文字滚动 */
var _scrollTimeout1;
var _scrollTimeout2;
var _obj_textAlign;
var _obj_width;
function scrollText(scrollObj,_scrollWidth,_txtFontSize){
    clearInterval(_scrollTimeout2);
    clearTimeout(_scrollTimeout1);
    _scrollTimeout1 = null;
    _scrollTimeout2 = null;
    _obj_textAlign = scrollObj.style.textAlign;
    _obj_width =_scrollWidth;//scrollObj.offsetWidth;
    _scrollTimeout1 = setTimeout(function(){
        var text_width = scrollObj.innerHTML.length*_txtFontSize;
        var text_left = 0;
        var inc = -1;
        if(text_width > _scrollWidth){
            scrollObj.style.textAlign="left";
            scrollObj.style.left=text_left+"px";
            scrollObj.style.width = _scrollWidth*2+"px";
            _scrollTimeout2 = setInterval(function(){
                if(text_left+text_width==_scrollWidth){
                    inc = 1;
                }else if(text_left==10){
                    inc = -1;
                }
                text_left += inc;
                scrollObj.style.left = text_left+"px";
            },30);
        }
    },50);
}
function stopScroll(scrollObj,_align){
    clearInterval(_scrollTimeout2);
    clearTimeout(_scrollTimeout1);
    _scrollTimeout1 = null;
    _scrollTimeout2 = null;
    scrollObj.style.textAlign= (_align=="undefined") ? _obj_textAlign : _align;
    scrollObj.style.left=0;
    scrollObj.style.width = _obj_width+"px";
}
/**
*@param {String} currentTime 当前系统时间;
*@param {Array} timeArray 时间数组;
*return  系统时间在时间数组区间内则返回索引,否则返回在区间外字符串"backward" "forward";
* */
function compareTime(currentTime, timeArray) {
    var beginTime, endTime, beginTimes, endTimes, nowTimes, a, b;
    var rs;
    for (var i = 0; i < timeArray.length; i++) {
        beginTime = new Date(timeArray[i][0].replace(/-/g, "/"));
        endTime = new Date(timeArray[i][1].replace(/-/g, "/"));
        //var nowTime = new Date(currentTime.replace(/-/g, "/"));
        //转换成时间戳
        beginTimes = beginTime.valueOf();
        endTimes = endTime.valueOf();
        nowTimes =currentTime/* nowTime.valueOf()*/;
        a = (nowTimes - beginTimes) / 3600 / 1000;
        b = (nowTimes - endTimes) / 3600 / 1000;
        if (a >= 0 && b <= 0) {//节目单时间数组中
            rs =  i;
            break;
        } else if (a < 0 && i === 0) {//时间数组区间外(小于第一条开始时间)
            rs = "backward";
            break;
        } else if (b > 0 && i === timeArray.length - 1) {//时间数组区间外(大于最后一条结束时间)
            rs = "forward";
            break;
        }
    }
    return rs;
}

//获取playTime
function getPlayTime(currentTime,timeArray,liveIndex){
    var nowTime,beginTime,beginTimes,nowTimes,lessTime;
    //转换成时间戳
    beginTime=new Date(timeArray[liveIndex][0].replace(/-/g, "/"));
    //nowTime=new Date(currentTime.replace(/-/g, "/"));
    beginTimes = beginTime.valueOf();
    nowTimes =currentTime /*nowTime.valueOf()*/;
    lessTime=(nowTimes-beginTimes)/1000;
    if(lessTime>=0){
        return Math.ceil(lessTime);
    }else{
        return 0;
    }
}

function ele(_elementId) {
    var obj = document.getElementById(_elementId);
    if (typeof(obj) != "object") {
        obj = null;
    }
    return obj;
}
//现有接口
var btv = btv || {};
    btv.utils=function(){};
    btv.utils.interface = function(){};
    btv.utils.interface.getVodUrl=" /front/vod/url";//VOD播放地址请求接口";
    btv.utils.interface.dataStatics="/front/datastatistics/dataStatics";//行为数据
    btv.utils.interface.auth="/front/device/auth";//AAA鉴权
    btv.utils.interface.wxLogout="/front/device/wxLogout";//用户登出
    btv.utils.interface.wxuser="/front/device/wxuser";//查询登录状态
    btv.utils.interface.couponList="/front/coupon/list";//用户中心优惠券接口
    //发布相关接口
    btv.utils.interface.publishAll="/front/publish/all";//查询全部发布
    btv.utils.interface.publishByAlbumId="/front/publish/byAlbumId";//专题发布列表
    btv.utils.interface.publishByClassificationId="/front/publish/byClassificationId";//指定商品分类的发布列表
    btv.utils.interface.publishInfo="/front/publish/info";//单个发布信息
    btv.utils.interface.publishQrcode="/front/publish/qrcode";//首页商品订单弹出二维码接口
    //订单相关接口
    btv.utils.interface.orderList="/front/order/list";//用户中心订单页数据
    //分类先关接口
    btv.utils.interface.classificationInfo="/front/classification/info";//单个商品分类信息
    //发布专题相关接口
    btv.utils.interface.nextInfo="/front/publish/nextInfo";//下一个播放
    btv.utils.interface.publishAlbumInfo="/front/publishAlbum/info";//单个发布专题信息
    btv.utils.interface.temelateMenu="/front/template/menu";//单个发布专题信息以及商品分类 /front/publishAlbum/list发布专题列表，已废弃！请使用/front/template/menu
    //首屏相关接口
    btv.utils.interface.templateButton="/front/template/button";//顶部按钮的列表
    btv.utils.interface.templateHandpick="/front/template/handpick";//精选页
    btv.utils.interface.templateLauncher="/front/template/launcher";//首屏模板接口
    //直播相关接口
    btv.utils.interface.dvbInfo="/front/dvb/info";//直播频道信息
    btv.utils.interface.divList="/front/dvb/list";//直播频道列表
    btv.utils.interface.dvbPlaybill="/front/dvb/playbill";//直播节目单频道列表
    //用户中心观看历史相关接口
    btv.utils.interface.historyInfo="/front/history/info";
    //app相关接口
    btv.utils.interface.appConfig="/front/app/config";//配置信息
    //搜索接口
    btv.utils.interface.searchPublish="/front/search/publish";//搜索发布
    //全局消息处理接口
    btv.utils.interface.message="/font/goabal/message";//全局消息处理接口
    btv.utils.interface.globalScrolltips="/front/global/scrolltips";//首页滚动消息

    btv.utils.tools={
        lines:{},
        addClassName:function(elemDom,className){
            if(elemDom&&elemDom.className&&(elemDom.className.indexOf(className)==-1)){
                elemDom.className = elemDom.className +" "+className.replace(/(^\s*)|(\s*$)/g, "");
            }
        },
        removeClassName:function(elemDom,className){
            if(elemDom&&elemDom.className){
                var reg = new RegExp(className,"g");
                elemDom.className = elemDom.className.replace(reg,"").replace(/(^\s*)|(\s*$)/g, "");
            }
        },
        getParms:function (url,name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            if(url.indexOf("?")>-1){
                var r = url.split("?")[1].match(reg);
                if (r != null) return unescape(r[2]);
            }
            return null;
        },
        jsonObjTojsonObj:function (jsonStr){
        if(typeof(jsonStr)=="string"){
            //机顶盒不兼容new Function
            try{
                var obj = eval ("(" + jsonStr + ")");
                return obj
            }catch(err){
                return null;
            }
        }
        return null;
    },
        jsonStrTojsonStr:function (jsonObj){
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
    },
        postStr:function(url,from,callback,errorBack,accessToken,key,lineNum){
            var callback1 = callback;
            var errorBack=errorBack;
            if(typeof(lineNum)==="undefined"){
                var xmlhttp =  window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                var async = true;
                /*if(typeof(callback)==="undefined"){
                    async = false;
                }*/
                if(async){
                    xmlhttp.onreadystatechange = function(){
                        if(xmlhttp.readyState==4 && xmlhttp.status==200){
                            if(typeof(callback)==="function"){
                                callback1(xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,''),key);
                            }
                        }
                    }
                };
                xmlhttp.error=function(){
                    if(typeof (errorBack)=="function"){
                        errorBack();
                    }
                }
                xmlhttp.open("POST",url,async);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                if(accessToken){
                    xmlhttp.setRequestHeader('accessToken', accessToken);
                }
                xmlhttp.send(from);
                if(!async){
                    return xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,'');
                }
            }else{
                var lineItem = "L" + lineNum;
                if(this.lines[lineItem]){
                    this.lines[lineItem].abort();
                }
                this.lines[lineItem] = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                var async = true;
                this.lines[lineItem].onreadystatechange = function(){
                    if(btv.utils.tools.lines[lineItem].readyState==4 &&  btv.utils.tools.lines[lineItem].status==200){
                        callback1( btv.utils.tools.lines[lineItem].responseText.replace(/\r/g,'').replace(/\n/g,''),key);
                        btv.utils.tools.lines[lineItem] = null;
                    }
                }
                this.lines[lineItem].error=function(){
                    if(typeof(errorBack)=="function"){
                        errorBack();
                    }
                }
                this.lines[lineItem].open("POST",url,true);
                this.lines[lineItem].setRequestHeader("Content-type","application/x-www-form-urlencoded");
                if(accessToken){
                    this.lines[lineItem].setRequestHeader('accessToken', accessToken);
                }
                this.lines[lineItem].send(from);
            }
        },
        build:function(lineNum){
            var lineNumP = lineNum;
            var urlP = "";
            var callBackP = {type:0,callBackFun:function(jsonData){},obj:null};
            var errorBackP = {type:0,errorBackFun:function(){},obj:null};
            var timeOutP =1000;
            var setTimeClockP;
            return {
                url:function(url){
                    urlP = url;
                    return this;
                },
                callBack:function(fun,obj){
                    if(typeof(obj)==="object"&&typeof(fun)==="function"){
                        callBackP={type:1,callBackFun:function(jsonData){fun(jsonData,callBackP.obj)},obj:obj};
                    }else if(typeof(fun)==="function"){
                        callBackP={type:1,callBackFun:function(jsonData){fun(jsonData)}};
                    }
                    return this;
                },
                errorBack:function(fun,obj){
                    if(typeof(obj)==="object"&&typeof(fun)==="function"){
                        errorBackP={type:1,errorBackFun:function(){fun(callBackP.obj)},obj:obj};
                    }else if(typeof(fun)==="function"){
                        errorBackP={type:1,errorBackFun:function(){fun()}};
                    }
                    return this;
                },
                timeOut:function(time){
                    timeOutP = time;
                    return this;
                },
                getStr:function(){
                    if(errorBackP.type){
                        clearTimeout(setTimeClockP);
                        setTimeClockP = setTimeout(function(){errorBackP.errorBackFun()},timeOutP);
                    };
                    if(callBackP.type&&lineNumP){
                        if(btv.utils.tools.lines["L"+lineNumP]){
                            btv.utils.tools.lines["L"+lineNumP].abort();
                        }else{
                            btv.utils.tools.lines["L"+lineNumP] = new XMLHttpRequest();
                        }
                        btv.utils.tools.lines["L"+lineNumP].onreadystatechange = function(){
                            if(btv.utils.tools.lines["L"+lineNumP].readyState==4 && btv.utils.tools.lines["L"+lineNumP].status==200){
                                if(errorBackP.type){
                                    clearTimeout(setTimeClockP);
                                }
                                callBackP.callBackFun(btv.utils.tools.lines["L"+lineNumP].responseText.replace(/\r/g,'').replace(/\n/g,''));
                                btv.utils.tools.lines["L"+lineNumP] = null;
                            }
                        };
                        btv.utils.tools.lines["L"+lineNumP].open("GET",urlP,true);
                        btv.utils.tools.lines["L"+lineNumP].send();
                    }else if(!lineNumP){
                        var xmlhttp = new XMLHttpRequest();
                        var async = false;
                        if(callBackP.type){
                            async = true;
                        }
                        if(async){
                            xmlhttp.onreadystatechange = function(){
                                if(xmlhttp.readyState==4 && xmlhttp.status==200){
                                    if(errorBackP.type){
                                        clearTimeout(setTimeClockP);
                                    }
                                    callBackP.callBackFun(xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,''));
                                }
                            }
                        }
                        xmlhttp.open("GET",urlP,async);
                        xmlhttp.send();
                        if(!async){
                            return xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,'');
                        }
                    }
                },
                postStr:function(from,accessToken){
                    if(errorBackP.type){
                        clearTimeout(setTimeClockP);
                        setTimeClockP = setTimeout(function(){errorBackP.errorBackFun()},timeOutP);
                    };
                    if(callBackP.type&&lineNumP){
                        if(btv.utils.tools.lines["L"+lineNumP]){
                            btv.utils.tools.lines["L"+lineNumP].abort();
                        }else{
                            btv.utils.tools.lines["L"+lineNumP] = new XMLHttpRequest();
                        }
                        btv.utils.tools.lines["L"+lineNumP].onreadystatechange = function(){
                            if(btv.utils.tools.lines["L"+lineNumP].readyState==4 && btv.utils.tools.lines["L"+lineNumP].status==200){
                                if(errorBackP.type){
                                    clearTimeout(setTimeClockP);
                                }
                                callBackP.callBackFun(btv.utils.tools.lines["L"+lineNumP].responseText.replace(/\r/g,'').replace(/\n/g,''));
                                btv.utils.tools.lines["L"+lineNumP] = null;
                            }
                        }
                        btv.utils.tools.lines["L"+lineNumP].open("POST",urlP,true);
                        btv.utils.tools.lines["L"+lineNumP].setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        btv.utils.tools.lines["L"+lineNumP].setRequestHeader('accessToken', accessToken);
                        btv.utils.tools.lines["L"+lineNumP].send(from);
                    }else if(!lineNumP){
                        var xmlhttp = new XMLHttpRequest();
                        var async = false;
                        if(callBackP.type){
                            async = true;
                        }
                        if(async){
                            xmlhttp.onreadystatechange = function(){
                                if(xmlhttp.readyState==4 && xmlhttp.status==200){
                                    if(typeof(callback)==="function"){
                                        if(errorBackP.type){
                                            clearTimeout(setTimeClockP);
                                        }
                                        callBackP.callBackFun(xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,''));
                                    }
                                }
                            }
                        };
                        xmlhttp.open("POST",urlP,true);
                        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xmlhttp.send(from);
                        if(!async){
                            return xmlhttp.responseText.replace(/\r/g,'').replace(/\n/g,'');
                        }
                    }
                },
            }
        },
    };
var Tool={
    showTime:function (time, elem){
        var videoCountdown = elem;
        var videoCountInput = videoCountdown.getElementsByTagName("span");
        var countdown = parseInt(time);
        var min = String(parseInt((countdown % 3600) / 60));
        var sec = String(parseInt((countdown % 3600 % 60)));
        if (min == 0) {
            videoCountInput[0].innerHTML = '0';
            videoCountInput[1].innerHTML = '0';
        } else {
            if (min.length == 1) {
                videoCountInput[0].innerHTML = '0';
                videoCountInput[1].innerHTML = min.slice(0, 1);
            } else if (min.length == 2) {
                videoCountInput[0].innerHTML = min.slice(0, 1);
                videoCountInput[1].innerHTML = min.slice(1, 2);
            }
        }
        if (sec == 0) {
            videoCountInput[2].innerHTML = '0';
            videoCountInput[3].innerHTML = '0';
        } else {
            if (sec.length == 1) {
                videoCountInput[2].innerHTML = '0';
                videoCountInput[3].innerHTML = sec.slice(0, 1);
            } else if (sec.length == 2) {
                videoCountInput[2].innerHTML = sec.slice(0, 1);
                videoCountInput[3].innerHTML = sec.slice(1, 2);
            }
        }
    },
};
//媒体播放对象
var Player=function(){
    Vod.call(this);
    this.playTime=0,//当前播放时长
    this.showErrorMessage=false,//播放错误信息提示
    this.window=null,//{width:"460px",height:"817px",left:"",top:""};视频小窗口尺寸
    this.duration=0,//总时长
    //播放定时器
    this.getDurationTimer=null,
    this.coutDownTimer=null,
    this.updateCurrentTimer=null,

    this.itemIdx=1;//1表示在精选页
    this.videoStatus=0,//视频播放状态 0:未播放 1:播放成功 2:播放结束 3:播放失败
    this.isLive=0,//当前视频状态 0:回看视频 1:视频直播
    this.isEventTriger=false;//是否由系统时间触发
    this.showGress=false,//是否显示进度条
    this.isUpdateTime=false,//是否更新currentTime和进度条
    this.goodsVideo=null,//video对象
    this.init=function(){},
    this.updateCurrentTime=function(){
        var _this=this;
        this.updateCurrentTimer=setInterval(function(){
            _this.currentTime=Math.floor(ntv.stb.mediaplayer.get_current_playtime());
            _this.startTimerMediaCountdown(_this.duration-_this.currentTime);//更新剩余时长
        },1*1000);
    };//更新时间
    this.getVideoUrl=function (video){//获取播放地址
        var _this = this;
        if (video.vod){
            _this.getVodUrl(video.vod);
        } else if(ntv.profile.browser=="iPanel"){//轮播页数据titileAssetId没有放在vod对象里
            _this.getVodUrl(video);
        }else{//pc
            _this.playVideoUrl(video.hd?video.hd:video.url);
        }
    },
   /*this.getVodUrl=function (video) {//第三方vod媒体资源获取
        var _this = this;
    },*/
   this.playVideoUrl=function (url) {//普通播放方式
        var _this = this;
        var rs;
        ntv.stb.mediaplayer.stop();//停止视频播放 释放资源
       if(!_this.window){
           /*if(_this.playTime>0){//从指定时间点播放
               ntv.stb.mediaplayer.play_seek(time);
               _this.playTime= 0;
           }else{*/
               rs= ntv.stb.mediaplayer.play("VOD", url);//视频播放
           //}
       }else{
           //if(_this.playTime>0){
              // ntv.stb.mediaplayer.play_seek(time);
               //_this.playTime= 0;
           //}else{
               rs = ntv.stb.mediaplayer.playWindow("VOD", url,_this.window);//小窗口播放
          // }
       }
       if(!_this.isEventTriger||ntv.profile.browser=="PCBrowser"||ntv.profile.browser=="iptv"){//媒体播放不是由系统5205触发
           if (rs){
               _this.startGetDuration();
             }else{
               _this.videoStatus=3;
               _this.videoEnd();
           }
       };
    },
   this.playChannelId=function (url) {//播放直播串
        var _this = this;
       if(this.window){
           ntv.stb.mediaplayer.playWindow("VOD", url,_this.window);//小窗口播放
       }else{
           ntv.stb.mediaplayer.play("VOD", url);
       }
    },
   this.startGetDuration=function () {//5s获取不到视频总时间，自动播放下一个
        var _this = this;
       clearInterval(_this.getDurationTimer);
        var transitionTime =10;
        _this.getDurationTimer = setInterval(function (){
            if (transitionTime === 0){
                clearInterval(_this.getDurationTimer);
                _this.videoStatus=3;//失败
                _this.videoEnd();
            }
            _this.getVideoDuration();
            transitionTime--;
        }, 1000);
    },
   this.getVideoDuration=function (){
        var _this = this;
        clearInterval(_this.getDurationTimer);
        _this.duration = parseInt(ntv.stb.mediaplayer.get_meida_duration());
        if (_this.duration && _this.duration != -1) {//开始视频播放
            clearInterval(_this.getDurationTimer);
            _this.getDurationTimer=-1;
            _this.videoStart();
        }
    },
   this.videoStart=function (){
        var _this = this;
        if (_this.playTime>0&&ntv.profile.browser=="PCBrowser") {//从上次播放时间点播放视频
            var time =_this.playTime;//获取总时长误差10s
            ntv.stb.mediaplayer.play_seek(time);
            _this.playTime= 0;
        };
        _this.videoStatus=1;//成功
       _this.personality();
       _this.updateVideoStatus(true);
    },
    this.updateVideoStatus=function (status) {
        var _this = this;
        if (status) {//按倒计时播放下一个
            ntv.stb.mediaplayer.set_volume(ntv.stb.mediaplayer.get_volume());//设置音量
            var time = ntv.stb.mediaplayer.get_meida_duration() - ntv.stb.mediaplayer.get_current_playtime();
            _this.startTimerMediaCountdown(time);//倒计时播放下一个
            if(_this.isUpdateTime){
                _this.updateCurrentTime();
            }
        } else {
            _this.currentTime=0;
            clearInterval(_this.coutDownTimer);
            clearInterval(_this.updateCurrentTimer);
            ntv.stb.mediaplayer.stop();
        }
    },
    this.startTimerMediaCountdown=function (time){
        var _this = this;
        time = parseInt(time);
        var count1=0;
        clearInterval(_this.coutDownTimer);
        clearInterval(progressTimer);
        if (time>=0) {//开启倒计时定时器，播放下一个
            _this.coutDownTimer = setInterval(function () {
                //_this.currentTime++;
                _this.currentTime=parseInt(ntv.stb.mediaplayer.get_current_playtime())+1;
                if(_this.showGress&&!_this.isLive){//可否快进退 显示进度条
                    Tool.showTime(_this.currentTime,_this.progressObj.currentTimeElem);
                    play_schedule(_this.progressObj.bar, _this.progressObj.long, _this.duration, _this.currentTime,_this.progressObj.left);
                }else if(_this.showGress){
                    Tool.showTime(_this.currentTime,_this.progressObj.currentTimeElem);
                    play_schedule(_this.progressObj.bar, _this.progressObj.long, _this.duration, _this.currentTime,_this.progressObj.left);
                }
                //time--;
                if (_this.duration-_this.currentTime<= 3) {
                    count1++;
                    if (count1==10) {
                        clearInterval(_this.updateCurrentTimer);
                        clearInterval(_this.coutDownTimer);
                        time = 0;
                        count1=0;
                        _this.videoStatus = 2;
                        _this.videoEnd();
                    }
                }
                if (_this.duration-_this.currentTime<=0){
                    clearInterval(_this.coutDownTimer);
                    clearInterval(_this.updateCurrentTimer);
                    //time = 0;
                    count1=0;
                    _this.videoStatus=2;//结束
                    _this.videoEnd();
                }
            }, 1000);
        } else {
            _this.videoStatus=3;//失败
            _this.videoEnd();
        }
    },
    this.videoEnd=function(){
    },
    this.personality=function(){},//提供外部私用入口
    //快进退
    this.step=5,//步长
    this.addTime=0,//时间累加器
    this.currentTime=0,
    this.progressObj=null,//调整进度所需参数
    this.updateTimer=null,
    this.speed=false,
    //this.direcctionTimer=false,
    this.speedTimer=null,
    this.count=1;
    this.keyRight=function(){
        this.change("right");
    },
    this.keyLeft=function(){
        this.change("left");
    },
    this.change=function(direction){
        var _this=this;
        if(this.videoStatus!=1||this.isLive||!this.showGress){return}//（视频未播放 直播 不显示进度条）
        var _this=this;
        if(!this.speed){
            _this.count=1;
            _this.step=5;
            clearInterval(this.speedTimer);
            this.speed=true;
            this.addTime=this.currentTime;
            this.speedTimer=setInterval(function(){
                _this.count++;
                if(_this.count==4){
                    _this.count=0;
                }else if(_this.count!=0){
                    _this.step+=10;
                }
            },1000);
        }
        //ntv.stb.mediaplayer.pause();
        if(direction=="right"){
            this.addTime+=this.step;
            if(this.addTime>=this.duration){
                this.addTime=this.duration-5;
            };
        }else if(direction=="left"){
            this.addTime-=this.step;
            if(this.addTime<=0){
                this.addTime=0;
            };
        };
        Tool.showTime(_this.addTime,_this.progressObj.currentTimeElem);
        clearTimeout(this.updateTimer);
        clearInterval(this.coutDownTimer);
        this.update();//调整进度条进度和样式
        this.updateTimer=setTimeout(function(){
            btv.utils.tools.removeClassName(_this.progressObj.currentTimeElem, "countDownTime2");
            btv.utils.tools.removeClassName(_this.progressObj.durationTimeElem, "durationTime2");
            _this.currentTime=_this.addTime;
            _this.count=1;
            _this.step=5;
            _this.speed=false;
            clearInterval(_this.speedTimer);

            var rs=ntv.stb.mediaplayer.play_seek(_this.addTime);
            if(rs==0){
                //视频倒计时
                _this.startTimerMediaCountdown(_this.duration-_this.currentTime);
            }
        },1000);
    }
    this.update=function(){
        btv.utils.tools.addClassName(this.progressObj.currentTimeElem,'countDownTime2');
        btv.utils.tools.addClassName(this.progressObj.durationTimeElem,"durationTime2");
        play_schedule(this.progressObj.bar, this.progressObj.long, this.duration, this.addTime,this.progressObj.left);
    };
};
//第三方媒体资源获取重写
var Vod=function(){
    if(ntv.profile.browser=="PCBrowser"){//PC
        this.getVodUrl = getVodVideoUrl_pc;//设置区域码
    }else if(ntv.profile.browser=="iPanel"){//杭州wasu
        this.Third={
            stbId:ntv.utils.env.getGlobalVar("stbId"),
            userId:ntv.utils.env.getGlobalVar("userId"),
            regionId:ntv.utils.env.getGlobalVar("regionId"),
            regionId:ntv.utils.env.getGlobalVar("regionId")
        }
        ntv.key.systemevent_handle =systemEvent;
        this.getVodUrl=getVodVideoUrl_hzwasu;
    }
};
function systemEvent(event_code) {
    ntv.log.console("event_code:"+event_code);
    switch (event_code) {
        case 5202://准备播放媒体成功
            if (envParam.player.playTime>0){
               var rs= ntv.stb.mediaplayer.play_seek(envParam.player.playTime);
                envParam.player.playTime = 0;
            } else {
                ntv.stb.mediaplayer._media.av.play();
            }
            break;
        case 5205://媒体播放成功  "0716266f"该硬件型号的盒子open成功默认直接播放,不用调用play或者seekPlay,系统不会下发5202;若要seekTime,在5205下调用playseek;
            //if(envParam.player.getDurationTimer !== -1) return
            if ("play"==ntv.stb.ipanel.mediaplayer._media.av.status()) {
                ntv.stb.mediaplayer.set_volume(ntv.stb.mediaplayer.get_volume());//设置音量
                //播放成功，开始获取播放时间
                //播放是否暂停
                ntv.log.console("5205从Time:" + envParam.player.playTime);
                if (envParam.player.playTime > 0&&(/*ntv.stb.get_SN()=="1104002091800024C1263D15"&&*/ntv.stb.get_model()=="0716266f")){//杭摩HMC210E不报5102
                    var rs=ntv.stb.mediaplayer.play_seek(envParam.player.playTime);
                    envParam.player.playTime = 0;
                    if(rs==0){
                        if(envParam.player.itemIdx!=1){//如果在首页并且不在精选目录
                            clearTimeout(timer2);
                            var timer2=setTimeout(function(){
                                clearTimeout(timer2);
                                ntv.stb.mediaplayer.pause();
                            },1000);
                            //ntv.stb.mediaplayer.setVideoDisplayMode(255,{width:1,height:1,left:76,top:129});
                        }
                    }
                }else{
                    if(envParam.player.itemIdx!=1){//如果在首页并且不在精选目录
                        clearTimeout(timer);
                        var timer=setTimeout(function(){
                            clearTimeout(timer);
                            ntv.stb.mediaplayer.pause();
                        },1000);
                        //ntv.stb.mediaplayer.setVideoDisplayMode(255,{width:670,height:380,left:76,top:129});
                    }
                }
                ntv.log.console("envParam.player.getDurationTimer:"+envParam.player.getDurationTimer);
                if(envParam.player.getDurationTimer==-1){return}
                envParam.player.startGetDuration();
            }
            break;
        case 5206://媒体播放失败
            if(envParam.player.showErrorMessage){
                $("#playErrorInfo").innerHTML = "播放失败,请按返回键退出当前页面5206.";
                envParam.player.errorMessage();
                return;
            }
         break;
        default:
            break;
    }
}
//获取vod视频地址
function getVodVideoUrl_hzwasu(vod) {
    var _this=this;
    var postUrl = ntv.utils.env.ajaxUrlHead + "/front/vod/url_hzdtv";
    var postData = "contentId=" + vod.titleAssetId;
        postData += "&contentType=13";
        postData += "&stbId=" +(_this.Third.stbId?_this.Third.stbId:"11040210112052544C31CF2B");
        postData += "&userId=" + (_this.Third.userId?_this.Third.userId:"RDIPTV-HZHX-BACKUP-03140435453875967");
        postData += "&x-region=" +( _this.Third.regionId?_this.Third.regionId:"hzdq");
        postData += "&x-codec=H264";
        postData += "&x-hd-support=HD";
    btv.utils.tools.postStr(postUrl,postData, function (responseText) {//successBack
        var rs = ntv.utils.parseJSON(responseText);
        var vodUrl = rs.rtsp;
        //ntv.log.console("vod播放地址:"+vodUrl);
        if (vodUrl) {
            //vodUrl = vodUrl + "";
            vodUrl = vodUrl.replace("&duration=0_0", "");
            //ntv.log.console("执行播放!"+vodUrl);
            _this.playVideoUrl(vodUrl);
        }
    },function(){//errorBack
        if(_this.showErrorMessage){
            $("#playErrorInfo").innerHTML = "播放失败,请按返回键退出当前页面406。";
            _this.errorMessage();
            return;
        }
        return;
    },"","","/front/vod/url_hzdtv_"+Math.random());
}
//pc
function getVodVideoUrl_pc(video){
    var _this=this;
    var vodUrl=video.hd?video.hd:video.url;
    _this.playVideoUrl(vodUrl);
}