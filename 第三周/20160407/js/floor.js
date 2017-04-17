var utils = (function () {
    var flag = "getComputedStyle" in window;

    function offset(curEle) {
        var disTop = curEle.offsetTop, disLeft = curEle.offsetLeft, par = curEle.offsetParent;
        while (par) {
            if (flag) {
                disTop += curEle.clientTop;
                disLeft += curEle.clientLeft;
            }
            disTop += par.offsetTop;
            disLeft += par.offsetLeft;
            par = par.offsetParent;
        }

        return {
            top: disTop,
            left: disLeft
        }

    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    return {
        offset: offset,
        win: win
    }

})()