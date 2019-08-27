//加载http模块
var http = require("http");
var fs = require("fs")
var path=require("path");

http.createServer(function(req, res) {
	//路由设置
	console.log(req.url); //请求文件的地址
	//首页设置
	if (req.url === "/" || req.url === "/index.html" || req.url === "html/index.html") {
		fs.readFile("html/index.html", "utf-8", function(err, data) {
			if (err) throw err
			res.end(data);
		})
	} else if (req.url === "/html/home.html") { //公司页设置
		res.setHeader("Content-Type", "text/html;charset=utf-8")
		res.end("公司页");
	} else if (req.url === "/img/123.jpg") { //图片资源设置
		fs.readFile("img/123.jpg", function(err, data) {
			if (err) throw err
			res.end(data);
		})
	}else if (req.url === "/css/css.css") { //css资源设置
		fs.readFile("css/css.css", function(err, data) {
			if (err) throw err
			res.end(data);
		})
	} else {
		res.end("404，这个页面还没弄好")
	}








}).listen(8090, function() {
	console.log("正在运行")
})
