var http = require("http");
var url = require("url");
var fs = require("fs");


//使用node创建一个服务器环境:协议->HTTP 域名->localhost 端口号->
var server = http.createServer(function () {
    console.log("ok");
});

//设置一个监听的端口号：设置成功后执行后面的回调函数
server.listen(1234, function () {
    console.log("正在监听1234这个端口号")
});
//server.listen(80, function () {
//    console.log("正在监听80")
//});