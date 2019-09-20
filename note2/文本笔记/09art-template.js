var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var app=express();


//express提供一个专门为它服务的模板引擎
//express-art-template
//安装express-art-template之前要先安装art-template
//npm install art-template
//npm install express-art-template
//app.engine(模板文件的后缀名，加载模块)
//模板文件默认是放置在views文件中的
app.engine("html",require("express-art-template"))


//利用第三方模块body-parser读取post提交的数据
//npm install body-parser
//让req多上一个body对象，这个对象里面就有post参数
app.use(bodyParser.urlencoded({
	extended:false
}))


var html_data={people:["张三","李四"]}

app.get("/",function(req,res){
	app.set("views",path.join(__dirname,"views"))
	res.render("model.html",html_data)//渲染模板输出
})


app.get("/submit.html",function(req,res){	
	app.set("views",path.join(__dirname,"message"))
	//因为模板默认是放在views文件夹中的，
	//你去打开其他目录下的文件就需要修改路径的指向（通过上面代码实现）
	res.render("submit.html")
})




app.post("/add",function(req,res){
	html_data.people.unshift(req.body.tit)
	console.log(req.body)
	//重定向
	res.redirect("/")
})


app.listen(8090,function(){
	console.log("正在运行")
})
