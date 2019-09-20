//加载模板引擎
//通过命令安装 npm install art-template
var template=require("art-template");
var fs=require("fs");
var path=require("path");
var http=require("http");

//将后面的对象数据，填充到前面的html代码中去
var model=template.render("html代码<b>{{name}}</b>",{name:"张三"})

console.log(model);



var html_data={
	meg:"你好",
	arr:["张三","李四","王五"],
	obj:{age:99},
	arr_obj:[
		{tit:"asdasd",time:"2019-06-21"},
		{tit:"qweqew",time:"2019-06-21"},
		{tit:"asdasd",time:"2019-06-21"},
		{tit:"zxczxc",time:"2019-06-21"}
	],
	num:6,
	bool:false,
	cls:"on"
}





http.createServer(function(req,res){

//读取template.html	
fs.readFile(path.join(__dirname,"html/template.html"),"utf-8",function(err,data){
	if(err) throw err
	//把html_data的数据内容扔到读取出来的data模板中去
	var new_html=template.render(data,html_data)
	res.end(new_html);//最后把结果响应出来
})

}).listen(8090,function(){
	console.log("正在运行")
})


//评论效果制作:



