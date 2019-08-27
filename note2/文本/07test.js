//加载http模块
var http=require("http");
var fs=require("fs");
var path=require("path");
var template=require("art-template");
var url=require("url");
var querystring=require("querystring");



http.createServer(function(req,res){
	//首页路径设置
	if(req.url==="/"&&req.method==="GET"){
		//读取数据文件
		fs.readFile(path.join(__dirname,"message/data.json"),"utf-8",function(err,data){
			if(err)throw err
			var html_data=JSON.parse(data);//把数据文件的内容转成对象
			//读取信息显示页面
			fs.readFile(path.join(__dirname,"message/index.html"),"utf-8",function(err,data){
				if(err)throw err
				//通过模板引擎把数据渲染到页面中
				var model=template.render(data,html_data)
				res.end(model);//输出页面
			})			
		})		
	}else if(req.url==="/submit.html"&&req.method==="GET"){//信息提交页面的路径配置
		fs.readFile(path.join(__dirname,"message/submit.html"),"utf-8",function(err,data){
			if(err)throw err
			res.end(data)
		})		
	}else if(req.url.startsWith("/add")&&req.method==="GET"){//get点击提交时的路径判断
		//先读取文件数据
		fs.readFile(path.join(__dirname,"message/data.json"),"utf-8",function(err,data){
			if(err)throw err
			//把字符串数据转成对象
			var html_data=JSON.parse(data);
			//通过url模块，把地址栏后面的参数转换成了一个对象
			var obj=url.parse(req.url,true).query
			//把提交的数据添加到总的数据里面
			html_data.list.unshift(obj)
			//把整合后的数据转成字符串
			var str=JSON.stringify(html_data);
			console.log(str)
			//写入文件
			fs.writeFile(path.join(__dirname,"message/data.json"),str,function(err){
				if(err) throw err
				console.log("写入成功")
				//重定向，重新跳回首页
				res.writeHead(302,'Found',{"Location":"/"})		
				res.end("6666")	
			})			
		})			
	}else if(req.url==="/add"&&req.method==="POST"){//post点击提交时的路径判断
		
		//先读取文件数据
		fs.readFile(path.join(__dirname,"message/data.json"),"utf-8",function(err,data){
			if(err)throw err
			//把字符串数据转成对象
			var html_data=JSON.parse(data);
			
			
			//post提交数据时，会分多次提交，所以要时时监听data和end事件
			var arr=[];//汇总post提交的数据
			req.on('data',function(data){
				arr.push(data);
			})
			
			//当post提交完数据后触发
			req.on('end',function(){
				//转换字符格式
				var obj=Buffer.concat(arr).toString("utf8");
				//把字符串“tit=xxxx&meg=xxx”变成对象（通过querystring模块来实现）
				obj=querystring.parse(obj);
				console.log(obj)
				//把提交的数据添加到总的数据里面
				html_data.list.unshift(obj)
				//把整合后的数据转成字符串
				var str=JSON.stringify(html_data);
				console.log(str)
				//写入文件
				fs.writeFile(path.join(__dirname,"message/data.json"),str,function(err){
					if(err) throw err
					console.log("写入成功")
					//重定向，重新跳回首页
					res.writeHead(302,'Found',{"Location":"/"})		
					res.end("6666")	
				})					
			})		
		})			
	}else{
		res.end("404")
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}).listen(8090,function(){
	console.log("正在运行")
})