//var undefined=1;
//(function (global, a) {
//    var b;
//    console.log(b === a);
//})(this);

//var undefined=1;
//(function (global) {
//    var b;
//    console.log(b === void 0);
//})(this);


/**
 * 防止undefined在低版本ie中被重写
 */
(function (global, undefined) {
    //防止重复加载
    // 如果该表达式成立，当前类库之前被加载过
    if (global.x) {
        return;
    }
    var x = global.x = {};

    var ajax = function (options) {
        if (!tools.getType(options, 'Object')) {
            throw  new TypeError("参数类型错误")
        }
        var xhr = tools.getXHR();
        xhr.open()
    };

    var tools = {
        /**
         * 获取ajax对象
         */
        getXHR: (function () {
            var xhrList = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML2.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML3.XMLHTTP');
            }];

            var xhr = null;
            while (xhr = xhrList.shift()) {
                try {
                    xhr();
                    break;
                } catch (e) {
                    xhr = null;
                    continue;
                }
            }
            if (xhr === null) {
                console.log("不支持ajax")
            }
            return xhr;


        })(),
        getType: function (data, type) {
            Object.prototype.toString.call(data) == '[object ' + type + ']';
        },
        forIn: function (data,callback) {
            if(this.getType((data,'Object'))){
                for(var n in data){
                    if(!data.hasOwnProperty(n)){
                        continue;


                    }
                }

            }
        },
        encodeDataToURI: function (data) {
            if(this.getType((data,'string'))){
                return data;
            }

        }
    }


})(this);