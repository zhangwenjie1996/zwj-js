$(function () {
    var $downLoad = $('.downLoad'), $downLoadBg = $downLoad.children('.downLoadBg'), $downLoadImg = $downLoad.children('.downLoadImg'), $downLink = $downLoad.children('a');
    $downLoad.on('mouseenter', function () {
        $downLoadBg.stop().slideDown(300);
        $downLoadImg.stop().slideDown(300);
        $downLink.css("borderTop", "3px solid #1c90f2");
    }).on('mouseleave', function () {
        $downLoadBg.stop().slideUp(300);
        $downLoadImg.stop().slideUp(300);
        $downLink.css("borderTop", "3px solid transparent");
    });

});
//计算中间区域的高度值
$(function () {
    auto();
    $(window).on('resize', auto);
    function auto() {
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var curH = winH - 76 - 40;
        $('#sectionContent').css("height", curH).attr('curH', curH);
        $('.conLeft').css('height', curH - 2);
        console.log("no");
        scrollLeft.refresh();//jquery是异步的，所以会先执行下面的scrollleft
        $('#matchList').css('height', curH - 80-2);
        scrollRight.refresh();
    }
});


var scrollLeft = new IScroll('#conLeft', {
    mouseWheel: true,
    scrollbars: true,
    //bounce: false
});
console.log("ok");

var scrollRight = new IScroll('#matchList', {
    mouseWheel: true,
    scrollbars: true,
    //bounce: false
});
