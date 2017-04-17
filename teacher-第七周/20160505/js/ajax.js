//->使用惰性思想封装的一个获取AJAX对象的方法
var getXHR = function () {
    var list = [
        function () {
            return new XMLHttpRequest;//->IE7+、标准浏览器
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    ];
    var temp = null;
    for (var i = 0; i < list.length; i++) {
        var tempFn = list[i];
        try {
            temp = tempFn();
        } catch (e) {
            continue;
        }
        getXHR = tempFn;
        break;
    }
    if (!temp) {
        throw new Error("您的当前浏览器不支持AJAX!");
    }
    return temp;
};

//->apiurl:服务器端请求的接口地址
//->callback:请求成功后要处理的事情
function ajax(apiurl, type,isAsync,reqbody,callback){
    var xhr = getXHR();
    //->添加一个随机数清除缓存
    apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
    xhr.open(type, apiurl, isAsync);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var val = xhr.responseText;
            val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
            callback(val);
        }
    };
    xhr.send(reqbody);
}

//获取url
var data = require('./data');
var jsonData = null;
var a=function getURL(url) {
    // $.each(data.data, function (index, item) {
    //     if (item.serverAddress+"/"+item.apiAddress == url) {
    //         // $.ajax({ url: item.url, type: item.type, data: item.data })
    //         ajax(url, type,isAsync,reqbody,callback)
    //         // return url;
    //     }
    // });
    for (var key in data.data) {
        if (data.data.hasOwnProperty(key)) {
            if (item.serverAddress+"/"+item.apiAddress == url) {
                // $.ajax({ url: item.url, type: item.type, data: item.data })
                ajax(url, type,isAsync,reqbody,callback);
                break;
                // return url;
            }
        }
    }

};
