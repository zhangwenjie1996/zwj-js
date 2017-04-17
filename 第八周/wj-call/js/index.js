function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle('#main');
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 1008;

if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
function fnLoad() {
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    var loading = getEle('#loading');
    var process = getEle('.process');
    var n = 0;
    arr.forEach(function () {
        var oImg = new Image();
        oImg.src = 'images/' + arguments[0];
        oImg.onload = function () {
            n++;
            process.style.width = n / arr.length * 100 + "%";
            if (loading && n == arr.length) {
                window.setTimeout(function () {
                    main.removeChild(loading);
                    phoneFn.init();
                }, 1500);

            }
        }

    })
}
fnLoad();
var phone = getEle('#phone');
var speak = getEle('.speak');


var phoneFn = {
    init: function () {
        phone.addEventListener("click", this.touch, false);
    },
    touch: function (ev) {
        target = ev.target;
        if (target.className == "listenTouch") {
            target.parentNode.style.display = 'none';
            speak.style.webkitTransform = "translate(0,0)";
        } else if (target.className == "refuse") {
            phone.style.webkitTransform = 'translate(0,' + desH + 'px)';
            window.setTimeout(function () {
                main.removeChild(phone);
                messageFn();
            }, 1000)


        }
    }

};
function messageFn() {
    var message = getEle('#message');
    var oLis = document.querySelectorAll('#message>ul>li');
    var oUl = getEle('#message>ul');
    var n = 0;
    var h = 0;
    var timer = window.setInterval(function () {
        oLis[n].style.opacity = 1;
        oLis[n].style.webkitTransform = 'translate(0,0)';
        oLis[n].style.webkitTransition = '1s';
        h += oLis[n].offsetHeight;
        n++;
        if (n > 3) {
            oUl.style.webkitTransform = 'translate(0,' + (-h ) + 'px)';
            oUl.style.webkitTransition = '1s';
        }
        if (n == oLis.length) {
            window.clearTimeout(timer);
            window.setTimeout(function () {
                main.removeChild(message);
                getCube();
            }, 1000)
        }
    }, 1000)
}

function getCube() {
    var cubeBox = getEle('#cubeBox');
    cubeBox.style.webkitTransform = 'scale(0.75) rotateX(-135deg) rotateY(-165deg)';
    var startX = -135, startY = -165;
    var x = null, y = null;
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', move, false);
    document.addEventListener('touchend', end, false);
    function touch(e) {
        this.startTouch = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };

    }

    function move(e) {
        this.flag = true;
        e.preventDefault();
        var moveTouch = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        x = moveTouch.x - this.startTouch.x;
        y = moveTouch.y - this.startTouch.y;
        cubeBox.style.webkitTransform = "scale(0.75) rotateX(" + (-startY - y) + "deg) rotateY(" + (-startX - x) + "deg)";
    }

    function end(e) {
        if(this.flag){
            startX += x;
            startY += y;
            this.flag=false;
        }
    }
}
document.addEventListener("touchmove", function () {
}, false);
