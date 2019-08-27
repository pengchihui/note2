//文件上传用multer
//npm install multer

var express=require("express")
var fs=require("fs")
var multer=require("multer")
//存放路径（不存在则自动创建）
//var upload =  multer({dest:"asd"})

//自定义存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')//文件目录不会自动创建
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
})

var upload = multer({ storage: storage })


var app=express();

app.get("/",function(req,res){
	var model=fs.readFileSync("files/add.html",{encoding:"utf8"})
	res.send(model)
})



app.post("/add",upload.array('pic',2),function(req,res){
	console.log(req.files)
})


app.listen(8090,function(){
	console.log("正在运行")
})


