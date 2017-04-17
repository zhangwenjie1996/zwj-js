/*--下载区域的展示和隐藏--*/
$(function () {
    var $downLoad = $(".downLoad"), $downLoadBg = $downLoad.children(".downLoadBg"), $downLoadImg = $downLoad.children(".downLoadImg"), $downLoadLink = $downLoad.children("a");
    $downLoad.on("mouseenter", function () {
        $downLoadBg.stop().slideDown(300);
        $downLoadImg.stop().slideDown(300);
        $downLoadLink.css("borderTopColor", "#1c90f2");
    }).on("mouseleave", function () {
        $downLoadBg.stop().slideUp(300);
        $downLoadImg.stop().slideUp(300);
        $downLoadLink.css("borderTopColor", "transparent");
    });
});

/*--计算中间区域的高度--*/
$(function () {
    auto();
    $(window).on("resize", auto);
    function auto() {
        //->计算整个中间的区域
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var curH = winH - 76 - 40;
        $("#sectionContent").css("height", curH).attr("curH", curH);

        //->左侧的区域需要在整个区域高度的基础上-2px(上下边框),设置完成后需要把局部滚动的设置刷新一下才可以有效果
        $(".conLeft").css("height", curH - 2);


        //->右侧比赛列表区域的高度也需要设置
        $(".matchList").css("height", curH - 82);

    }
});

/*--让左侧区域实现局部滚动--*/
$(function () {
    var $scrollLeft = new IScroll("#conLeft", {
        mouseWheel: true,
        scrollbars: true,
        bounce: false
        //mouseWheel: true,//->是否支持鼠标滚轮滚动
        //scrollbars: true//->是否显示滚动条
        //useTransform: true,
        //useTransition: false,//->设置使用css3动画来实现滚动
        //momentum: false,//->在用户快速触摸屏幕时,你可以开/关势能动画,关闭此功能将大幅度提升性能
        //tap: false,//->是否允许用户在点击里面的内容
        //bounce: false
        //bounceEasing: 'elastic',
        //bounceTime: 1200//->到边界后是否有缓冲的动画
    });
});

/*--让右侧区域实现局部滚动--*/
$(function () {
    var $scrollRight = new IScroll("#matchList", {
        mouseWheel: true,
        scrollbars: true,
        bounce: false
    });
});
//日期
//http://matchweb.sports.qq.com/kbs/calendar?callback=calendar&columnId=100000&_=1463624755291
$(function () {
    function callBack(data) {

    }

    //JSONP请求我们一般都使用异步请求
    var columnId = getMatchNum();
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=" + columnId + "&_=" + Math.random(),
        type: "get",
        dataType: "jsonp",
        success: callBack
    })
});

function getMatchNum() {
    return 100000;
}


//根据起始日期和结束的日期，获取到比赛数据，进行数据绑定

function bindData(strDate,endDate

){

}









//滚动到当前日期的位置











