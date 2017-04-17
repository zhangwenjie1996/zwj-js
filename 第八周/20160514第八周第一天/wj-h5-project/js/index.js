var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#main>ul>li");
function me(){

    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    //var desW = 640;
    //var desH = 960;
    //if (winW / winH <= desW / desH) {
    //    main.style.webkitTransform = "scale(" + winH / desH + ")";
    //} else {
    //    main.style.webkitTransform = "scale(" + winW / desW + ")";
    //}

    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });
    function start(e) {
        this.startY = e.changedTouches[0].pageY;

    }
    function move(e) {
        this.flag = true;
        e.preventDefault();
        var moveY = e.changedTouches[0].pageY;
        var movePos = moveY - this.startY;
        var index = this.index;
        [].forEach.call(oLis, function () {
            if (arguments[1] != index) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            //arguments[0].firstElementChild.id = "";//滑动时把li下的第一个子元素的id名清空
        });
        if (movePos > 0) {
            this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            var duration = -winH + movePos;
        } else if (movePos < 0) {
            this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            duration = winH + movePos;
        }
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].className = "zIndex";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
        oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / winH * 1 / 2) + ") translate(0," + movePos + "px)";

    }
    function end(e) {
        if (this.flag) {
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevsIndex].style.webkitTransition = "0.7s";
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";//相当于清除动画的积累
                //this.firstElementChild.id = "a" + this.index;
            });
            var index = this.index;
            oLis[index].style.display='none';
            this.flag = false;

        }
    }
}
me();
window.onresize= function () {
me();
};

//$(window).resize(function(){
//    $('span').text(x+=1);
//});

var guide = document.getElementsByClassName('guide')[0], resume = document.getElementById('resume');
resume.addEventListener('touchstart', start2, false);
resume.addEventListener('touchend', end2, false);
function start2(e) {
    guide.className += " animated fadeOut";
}
function end2(e) {
    oLis[0].style.display = 'block';
    main.removeChild(guide);
}









