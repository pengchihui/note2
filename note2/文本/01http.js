//加载http模块
var http=require("http");

http.createServer(function(req,res){
	//设置头部信息（不能放在结束响应后面）
	res.setHeader("Content-Type","text/html;charset=utf-8")
	//设置响应内容
	res.write("中文<b>123</b>乱码")
	//结束响应（一定要有，可以带输出效果的）
	res.end("666");
}).listen(8090,function(){
	console.log("正在运行")
})