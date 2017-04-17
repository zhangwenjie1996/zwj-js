(function () {
    var banner = document.getElementById('banner'),
        bannerInner = utils.firstChild(banner),
        bannerTip = utils.children(banner, "ul")[0],
        imgList = bannerInner.getElementsByTagName('img'),
        oLis = bannerTip.getElementsByTagName('li'),
        bannerLeft = utils.children(banner, "a")[0],
        bannerRight = utils.children(banner, "a")[1];

    var jsonData = null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            }
        };
        xhr.send(null)
    }();

    var str = "", str2 = "";
    var count = null;
    ~function () {
        for (var i = 0, len = jsonData.length; i < len; i++) {
            var curData = jsonData[i];
            str += "<div><img src='' trueImg='" + curData["img"] + "'> </div>";
            i === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>";
        }
        str += "<div><img src='' trueImg='" + jsonData[0]["img"] + "'> </div>";
        bannerInner.innerHTML += str;
        count = jsonData.length + 1;
        utils.css(bannerInner, "width", count * 1000);
        bannerTip.innerHTML += str2;
    }();

    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('trueImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null;
                    zhufengAnimate(curImg, {opacity: 1}, 300);
                }
            }(i)
        }
    }

    var step = 0, interval = 1000, autoTimer = null;
    autoTimer = window.setInterval(autoMove, 1000);
    function autoMove() {

        if (step >= count - 1) {
            step = 0;
            bannerInner.style.left = 0;
        }
        step++;
        zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
        changeTip();
    }

    function changeTip() {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            var tempStep = step >= oLis.length ? 0 : step;
            tempStep === i ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
        }
    }

    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            ~function (i) {
                curLi.onclick = function () {
                    step = i;
                    changeTip();
                    zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
                }
            }(i);

        }
    }();


    banner.onmouseover = function () {
        bannerLeft.style.display = bannerRight.style.display = 'block';
        window.clearInterval(autoTimer);
    };
    banner.onmouseout = function () {
        bannerLeft.style.display = bannerRight.style.display = 'none';
        autoTimer = window.setInterval(autoMove, 1000);
    };

    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
            step = count - 1;
            utils.css(bannerInner, "left", -step * 1000);
        }
        step--;
        zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
        changeTip();
    }
})();