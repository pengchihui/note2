//简易后台和数据接口制作
var express = require("express");//网络服务模块
var fs = require("fs");//文件模块
//var url=require("url");//地址模块
var path=require("path");//路径模块
var multer = require("multer")//表单文件上传模块
var mongoose=require("mongoose")//数据库操作模块

var Schema=mongoose.Schema;//声明数据结构
mongoose.connect("mongodb://localhost/shopping")//连接数据库（数据库不存在则创建）

var shop=new Schema({//设置字段(保证数据完整性)
	name:String,
	newpay:Number,
	pay:Number,
	num:Number,
	img1:String,
	img2:String	
})
var Eat=mongoose.model("shop",shop);//应用字段



//用multer实现文件上传时自定义存储
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'shop') //存放目录（文件目录不会自动创建，需自建）
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + file.originalname)//保存时的文件名
	}
})
var upload = multer({//应用multer的自定义存储设置
	storage: storage
})


var app = express();//应用网络服务

//静态资源加载
app.use("/",express.static(path.join(__dirname)));

//打开首页时读取表单提交页进行渲染显示
app.get("/", function(req, res) {
	var model = fs.readFileSync("shop/submit.html", {encoding: "utf8"})
	res.send(model)
})

//表单post提交跳转/add时，读取数据，保存到数据库
app.post("/add", upload.array('pic', 2), function(req, res) {
	console.log(req.files)//读取表单上传的文件
	console.log(req.body)//读取表单上传的字段数据
	//设置数据
	var a1=new Eat({
		name:req.body.name,
		newpay:req.body.newpay,
		pay:req.body.pay,
		num:req.body.num,
		img1:req.files[0].path,
		img2:req.files[1].path
	})
	//保存数据
	a1.save();
	res.send("保存成功")//这里没有做错误信息处理
})

//当你打开 " localhost:8090/shop " 时读取数据库中所有产品数据，做接口使用
app.get("/shop",function(req,res){
	
	//允许跨域请求
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	
	Eat.find().then(function(val){
		res.send(val);
	})	
})

//当你打开 " localhost:8090/one?name=馒头 " 时读取数据库中对应的产品数据，做接口使用
app.get(/^\/one(\/.+)*$/i,function(req,res){
	//var obj=url.parse(req.url,true).query
	var obj=req.query
console.log(req.query)
	Eat.find(obj).then(function(val){
		res.send(val);
	})
})


//网络端口监听
app.listen(8090, function() {
	console.log("正在运行")
})
