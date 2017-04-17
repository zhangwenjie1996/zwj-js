var zhufengEvent = (function () {
    function on(curEle, type, fn) {
        if ("addEventListener" in curEle) {
            curEle.addEventListener(type, fn, false);
            return;
        }
        console.log("halou");
        if (!curEle["aEvent" + type]) {
            curEle["aEvent" + type] = [];
            curEle.attachEvent("on" + type, function () {
                fire.call(curEle);
            });
        }
        var a = curEle["aEvent" + type];
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == fn)return;
        }
        a.push(fn);
        console.dir(a);

    }

    function off(curEle, type, fn) {
        if ("removeEventListener" in curEle) {
            curEle.removeEventListener(type, fn, false);
            return;
        }
        var a = curEle["aEvent" + type];
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == fn) {
                a[i] = null;
                return;
            }
        }
    }

    function fire(e) {
        e = window.event;
        e.target = e.srcElement;
        e.pageX = e.clientX + document.documentElement.scrollLeft || document.body.scrollLeft;
        e.pageY = e.clientY + document.documentElement.scrollTop || document.body.scrollTop;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        var a = this["aEvent" + e.type];

        for (var i = 0, len = a.length; i < len; i++) {
            console.dir(a);
            if (typeof a[i] === "function") {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }

    }

    return {
        on: on,
        off: off
    }
})();