var utils = (function () {
    var flag = "getComputedStyle" in window;

    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry);
        }
        var ary = [];
        for (var i = 0, len = likeAry.length; i < len; i++) {
            ary[ary.length] = ary;
        }
        return ary;
    }

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (flag) {
                disLeft += curEle.clientLeft;
                disTop += curEle.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {
            left: disLeft,
            top: disTop
        }
    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    function getCss(curEle, attr) {
        var val = null, reg = null;

        if (flag) {
            val = window.getComputedStyle(curEle, box)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle[attr];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    return {
        listToArray: listToArray,
        formatJSON: formatJSON,
        offset: offset,
        win: win,
        getCss: getCss
    }
})()