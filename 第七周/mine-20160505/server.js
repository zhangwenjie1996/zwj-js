var http = require("http");
var url = require("url");
var fs = require("fs");

var getInfo = require("./module/getInfo");
var addInfo=require("./module/addInfo");
//->使用NODE创建一个服务：当客户端发送一次请求的时候，就会把对应的回调函数执行，并且传递两个参数值REQUEST,RESPONSE
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname, query = urlObj.query;
    //前端路由判断：HTML,JS,CSS文件读取，并且返回给客户端进行解析
    var reg = /\.(html|css|js)/i;
    if (reg.test(pathName)) {
        var fileCon = fs.readFileSync("." + pathName, "utf8");
        var suffix = reg.exec(pathName)[1];
        var conType = suffix === "html" ? "text/html" : (suffix === "css" ? "text/css" : "text/javascript");
        res.writeHead(200, {'content-type': conType});
        res.end(fileCon);
        return;
    }

//    获取全部客户信息的接口
    if (pathName === "/getInfo") {
        getInfo.init(res);
        return;
    }

    if(pathName==="/addInfo"){
        addInfo.init(query,res);
    }


});

server.listen(6789, function () {
    console.log("NODE服务已经成功启动，正在监听'6789'这个端口！");
});