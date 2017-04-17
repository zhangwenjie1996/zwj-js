//架设http服务器
var http = require("http");
//处理request中的url的
var url = require("url");
//处理文件读写的
var fs = require("fs");

var server = http.createServer(function (request, response) {
//    把请求的url解析为一个对象
    var queryString = url.parse(request.url, true);
    //往响应主体中写数据
    response.write('hello world');
    response.end();

});
server.listen(110, function () {
    console.log("server start at port:777");
});