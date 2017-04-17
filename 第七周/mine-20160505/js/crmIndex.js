var boxList = document.getElementById('boxList'), oLis = boxList.getElementsByTagName('li');
~function () {
    for (var i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        oLis[i].className = i % 2 === 1 ? "bg" : null;
        curLi.oldClass = curLi.className;
        curLi.onmouseenter = function () {
            this.className = 'hov';
        };
        curLi.onmouseleave = function () {
            this.className = this.oldClass;
        }
    }
}();