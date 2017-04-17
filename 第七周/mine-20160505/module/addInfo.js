var fs = require("fs");
function init(query, res) {
    //获取客户端传递给我的信息
//query中存储了客户端传递给服务器端的内容内容{name:'',age:'',tel:''}
//console.log(query);


    //var obj = {
    //    id: 0,
    //    name: query.name,
    //    age: query.age,
    //    tel: query.tel,
    //    address: query.address
    //};

    var obj = {};
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            obj[key] = query[key];
        }
    }
    obj.id = 0;

    //    首先把之前的内容获取到
    var data = fs.readFileSync("./json/customerInfo.json", "utf8");
    data = JSON.parse(data);

    obj.id = parseInt(data[data.length - 1].id) + 1;

    data.push(obj);

//    把最新的data转换为一个字符串重新的添加到json文件中

    fs.writeFileSync("./json/customerInfo.json", JSON.stringify(data));

//    给客户端响应一条记录：告诉他我已经增加成功了

    res.writeHead(200, {'content-type': 'application/json:charset=UTF-8'});
    res.end(JSON.stringify({
        code: 0,
        desc: "添加成功",
        data: obj
    }));
//    把信息存放到对应的文件中
}
module.exports = {
    init: init
};