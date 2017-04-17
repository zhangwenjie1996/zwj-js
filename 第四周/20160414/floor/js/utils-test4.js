var utils = (function () {
    var flag = "getComputedStyle" in window;

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        var ary = [];
        for (var i = 0, len = likeAry.length; i < len; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    function children(curEle, tagName) {
        var ary = [], nodeList = curEle.childNodes;
        if (!flag) {
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    ary[ary.length] = curNode;
                }
            }
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curName = ary[k];
                if (curName.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;

                }
            }
        }
        return ary;
    }

    function firstChild(curEle) {
        var fir = this.children(curEle);
        return fir.length > 0 ? fir[0] : null;
    }

    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    function addClass(curEle, className) {
        var ary = className.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    function removeClass(curEle, className) {
        var ary = className.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var ary = [];
        var strClassAry = strClass.replace(/^ +| +$/g, "").split(/ +/g);
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var isOk = true;
            var curNode = nodeList[i];
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary.push(curNode);
            }
        }

        return ary;
    }

    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }

        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;

    }

    function setCss(attr, value) {
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity='" + value * 100 + "')";
            return;
        }
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        var reg = /^(width|height|top|bottom|right|left|((margin|padding)(left|bottom|right|top)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        this["style"][attr] = value;
    }

    function setGroupCss(option) {
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                setCss.call(this, key, option[key]);
            }
        }
    }

    function css(curEle) {
        var argTwo = arguments[1], ary = this.listToArray(arguments).slice(1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary);
            }
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }

    return {
        formatJSON: formatJSON,
        listToArray: listToArray,
        children: children,
        firstChild: firstChild,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementByClass: getElementsByClass,
        css: css
    }

})();