$(function () {
    var list = document.getElementById("list");
    var viewHeight = $(window).height();
    var viewWidth = $(window).width();
    var a = viewHeight/2;
    console.log(a);
    var $list = $("#list");
    var $oLis = $("#list>li");
    $list.css("height",viewHeight);
    $list.css("width",viewWidth);
    $($oLis[0]).css("top",-viewHeight);
    list.style.transformOrigin = ""+viewWidth/2+"px "+viewHeight/2+"px "+(-viewHeight/2)+"px";
    //$oLis[0].style.transform = "rotateX(90deg)";
    $oLis[0].style.transformOrigin = "bottom";

    $($oLis[1]).css("top",viewHeight);
    //$($oLis[0]).height(),$($oLis[1]).height(),$($oLis[2]).height(),$($oLis[3]).height();
    //$oLis[1].style.transform ="rotateX(-90deg)";
    //$oLis[1].style.transformOrigin = "top";

    $oLis[2].style.transform = "translateZ("+-viewHeight+"px)";

    $oLis[3].style.transform = "translateZ(0)"


});





















//function fnCube() {
//    var list = document.getElementById("list");
//    document.addEventListener("touchstart", start, false);
//    document.addEventListener("touchmove", move, false);
//    document.addEventListener("touchend", end, false);
//    function start(e) {
//        this.startTouch = {
//            x: e.changedTouches[0].pageX,
//            y: e.changedTouches[0].pageY
//        };
//        console.log(this.startTouch.x)
//    }
//    function move(e){
//        e.preventDefault();
//        var moveTouch = {
//            x: e.changedTouches[0].pageX,
//            y: e.changedTouches[0].pageY
//        }
//    }
//
//}fnCube();