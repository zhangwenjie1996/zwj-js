var http = require("http");
//->http.createServer:创建一个服务

var url = require("url");
//url.parse:把一个url地址进行解析的
//Url {
//    protocol: null,
//        slashes: null,
//        auth: null,
//        host: null,
//        port: null,
//        hostname: null,
//        hash: null,
//        search: '?age=18&name=pipi',
//        query: { age: '18', name: 'pipi' },
//    pathname: '/index.html/',
//        path: '/index.html/?age=18&name=pipi',
//        href: '/index.html/?age=18&name=pipi' }
var fs = require("fs");
//->fs.readFileSync:([请求文件的地址]，[编码格式]):同步读取文件中的内容，并且获取到的内容都是一个字符串


//我们的匿名回调函数中包含两个形参：
//request：操作的是客户端给服务器端发送的请求信息
//response：操作的是服务器端返回给客户端的信息

var server = http.createServer(function (request, response) {
    //[REQUEST]
    //request.url->获取到的是客户端请求的url地址(包含问号后面传递进来的参数值)

    var urlObj = url.parse(request.url, true);
    console.log(urlObj);
    var pathname = urlObj["pathname"], query = urlObj["query"];
    //前端路由器判断
    if (pathname === "/index.html") {

//    说明客户请求的地址是http://localhost/index.html,我们需要把index.html页面中的内容获取到并且返回给客户端进行渲染
        var con = fs.readFileSync("."+pathname, "utf8");
        //console.log(con, typeof con);
        //把获取到的内容返回给客户端
        //1）编写响应头信息
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(con);
        return;
    }
    if (pathname === "/css/common.css") {
        var conStyle = fs.readFileSync("."+pathname, "utf8");
        response.writeHead(200, {'content-type': 'text/css'});
        response.end(conStyle);
    }
    if (pathname === "/js/index.js") {
        var jsStyle = fs.readFileSync("."+pathname, "utf8");
        response.writeHead(200, {'content-type': 'text/javascript'});
        response.end(jsStyle);
    }

});
server.listen(80);

//->前端路由：服务器端接收到客户端的请求内容，根据请求的不一样，我们返回给客户端不同的内容->这个就是服务器的主要职责之一