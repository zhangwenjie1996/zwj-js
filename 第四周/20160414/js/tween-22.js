(function () {
    function linear(t, b, c, d) {
        return c * t / d + b;
    }

    function move(curEle, target, duration, callBack) {
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = null;
        window.clearInterval(curEle.zhufengTimer);
        curEle.zhufengTimer = window.setInterval(function () {
            if (time >= duration) {
                utils.css(curEle, key, target[key]);
                window.clearInterval(curEle.zhufengTimer);
                callBack && callBack.call(curEle);
                return;
            }
            time += 10;
            var curPos = linear(time, begin[key], change[key], duration);
            utils.css(curEle, key, curPos)
        }, 10)

    }

    window.zhufengAnimate = move;


})();