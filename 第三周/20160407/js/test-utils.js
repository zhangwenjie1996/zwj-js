var utils = (function () {
    var flag = "getComputedStyle" in window;

    function listToArray(likeArray) {
        if (flag) {
            return Array.prototype.slice.call(likeArray);
        }
        var ary = [];
        for (var i = 0, len = likeArray.length; i < len; i++) {
            ary[ary.length] = likeArray[i];
        }
        return ary;

    }

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    function offset(curEle) {
        var left = curEle.offsetLeft, top = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (flag) {
                left += curEle.clientLeft;
                top += curEle.clientTop;
            }
            left += par.offsetLeft;
            top += par.offsetTop;
            par = par.offsetParent;
        }

        return {left: left, top: top}
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
            val = window.getComputedStyle(curEle, null)[attr]
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
            }else{
                val = curEle.currentStyle[attr];
            }

        }
        reg = /^(-?\d+(\.\d+)?)(px|em|pt|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }


    return {
        listToArray: listToArray,
        formatJSON: formatJSON,
        offset: offset,
        win: win,
        getCss: getCss
    }

})();