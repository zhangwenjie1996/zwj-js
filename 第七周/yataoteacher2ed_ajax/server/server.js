/**
 * Created by zhufengpeixun on 2016/5/7.
 */
// ����http������
var http = require('http');
// ����request��url��
var url = require('url');
// �����ļ���д��
var fs = require('fs');

var server = http.createServer(function (request, response) {
    // �������url����Ϊһ������
    var queryString = url.parse(request.url, true);
    // ����Ӧ������д����
    response.write('hello world');
    response.end();



});
server.listen(8080, function () {
    console.log('server start at port:8080');
});
