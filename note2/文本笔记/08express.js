//命令符安装 @后面的是版本
//npm install express@3
var express=require("express");
var path=require("path");

var app=express();



//设置路由
app.get("/",function(req,res){	
	res.send("get打开，路径必须全等于")//结束响应支持更多的数据类型，不乱码
})

app.post("/index.html",function(req,res){
	res.send("post提交打开，路径必须全等于")
})

app.use("/asd",function(req,res){
	res.send("不限定get/post，路径不必全等于，只要开头符合就行")
})

app.all("/qwe",function(req,res){
	res.send("不限定get/post，路径必须全等于")
})

app.get(/^\/zxc(\/.+)*$/i,function(req,res){//用正则来限定路劲开头匹配
	res.send("限定get，路径不必全等于，只要开头符合就行")
})



//静态资源加载
app.use("/img",express.static(path.join(__dirname,"img")));
app.use("/html",express.static(path.join(__dirname,"html")));













app.listen(8090,function(){
	console.log("正在运行")
})




