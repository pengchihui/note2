//加载http模块
var http=require("http");
var fs=require("fs");
var path=require("path");

//第三方模块，需要用过npm install xxx来安装（本地安装，会出现在安装目录并修改配置文件）
var mime=require("mime");

//mime模块来动态读取文件类型
console.log(mime.getType("1.jpg"))

http.createServer(function(req,res){
	
	var filename=path.join(__dirname,req.url);
	//C:\Users\Administrator\Desktop\test\img\123.jpg
	
	//读取资源文件(img, css, js)
	fs.readFile(filename,function(err,data){
		if(err){
			res.setHeader("Content-Type","text/plain;charset=utf-8")
			res.end("文件不存在")
		}else{
			//mime模块来动态读取文件类型
			var type=mime.getType(req.url)
			res.setHeader("Content-Type",type+";charset=utf-8")
			res.end(data)
		}
	})
	
	
	
	
	// if(req.url==="/"){
	// 	res.end();
	// }
	
	
	
	
}).listen(8090,function(){
	console.log("正在运行")
})