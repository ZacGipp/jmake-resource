var rollingDiv=$("#rollingDiv");
function showGraphic(imgCount){
    //加载图文
    var div = document.createElement('div');
    // div.style.marginTop = 27 + 'px';
    for(var j = 1; j <= imgCount; j++){
        var detailImg=document.createElement("img");
        detailImg.src="./images/ad/"+ j +".png";
        div.appendChild(detailImg);
    }
    rollingDiv.appendChild(div);
    var imgs = div.childNodes;
    // var detailHeight = 0;
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onload = function() {
          ntv.effect.scroll.init("#scroll-line", "#scroll-bar", "#scroll-bar-focus", "#rollingDiv", 150, div.clientHeight);
        };
    }
}
window.onload = function(){
    ntv.log.console("history.length:" + history.length);
    ntv.log.console("url" + window.location.href);
    ntv.navigation.coord = 22;
    ntv.navigation.focus(22);
    //btv.utils.tools.postStr(ntv.utils.env.ajaxUrlHead + btv.utils.interface.publishInfo, "publishId="+publishId, showGraphic,"", envParam.accessToken);
    showGraphic(12);
};