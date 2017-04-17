var http = require('http');
var url = require('url');
var data = require('./data');
var fs = require('fs');
//var tiny=fs.readFileSync('./image/opacity.png');//同步
fs.readFile('./image/opacity.png', function (err, data) {
    if (!err) {
        tiny = data;
    }
});
var referObj = {};
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var _refer = request.headers['referer'];
    //console.log(request.headers);
    if (_refer) {
        //console.log(_refer);//http://localhost:63342/teacher/%E7%AC%AC%E4%B8%83%E5%91%A8/jsonp/tongji.html
        var o = url.parse(_refer);//
        //console.log(o);
        _refer = o.protocol + "//" + o.hostname + ":" + o.port;
        console.log(_refer);
    }
    if (urlObj.pathname == '/interface') {
        response.writeHead(200, {'content-type': 'application/json'});
        //response.end('var '+urlObj.query.valName+'=' + JSON.stringify(data))
        response.end(urlObj.query.valName+'('+JSON.stringify(data)+')')
    } else if (urlObj.pathname == '/count') {
        if (referObj.hasOwnProperty(_refer)) {
            referObj[_refer]++;
        } else {
            referObj[_refer] = 1;
        }
        console.log("实现网站的统计次数:" + referObj[_refer]);
        response.writeHead(200, {'content-type': 'image/png'});
        response.end(tiny);
    }
    else {
        response.writeHead(404);
        response.end('hello world');
    }
});
server.listen(80, function () {
    console.log('服务器启动成功');
});