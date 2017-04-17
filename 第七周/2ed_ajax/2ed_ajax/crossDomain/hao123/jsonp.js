/**
 * Created by zhufengpeixun on 2016/5/8.
 */
;
(function (undefined) {
    /**
     * @param {string} url 请求的jsonp接口
     * @param {string|object} data 发送的数据（请求的数据 eg:{wd: value}/{tel: val}）
     * @param {string} jsonpcallback 名称
     * @param {Function} callback 回调函数
     * @type {Function}
     */
    window.jsonp = function (url, data, jsonpcallback, callback) {
        // 生成jsonp的静态函数名
        //console.log(window.jsonp.counter);//1
        var count = 'test' + window.jsonp.counter++;//1 后加运算
        //console.log(window.jsonp.counter);//2
        // 生成jsonpcallabck后面的回调函数名
        var callbackName = 'window.jsonp.' + count;
        window.jsonp[count] = function (data) {//data 服务器返回给客户端的数据
            try {
                //console.log(data);
                //{
                //    mts:'1589394',
                //    province:'河南',
                //    catName:'中国移动',
                //    telString:'15893941537',
                //    areaVid:'30500',
                //    ispVid:'3236139',
                //    carrier:'河南移动'
                //}
                callback(data);
            } finally {
                delete window.jsonp[count];
                script.parentNode.removeChild(script);
            }
        };
        if (data) {
            console.log(data);//Object {tel: "15893941537"}
            data = tools.encodeToURIString(data);
            console.log(data);//tel=15893941537
            url = tools.hasSearch(url, data);
        }
        url = tools.hasSearch(url, jsonpcallback + '=' + callbackName);
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.async = 'async';
        script.src = url;
        console.log(url);//https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=15893941537&callback=window.jsonp.test1
        document.body.appendChild(script);
    };
    // 计数器
    window.jsonp.counter = 1;
    var tools = {
        encodeToURIString: function (data) {
            if (typeof data !== 'object') {
                return data;
            }
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));

            }
            return arr.join('&');
        },
        hasSearch: function (url, padString) {
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        }
    }
})();