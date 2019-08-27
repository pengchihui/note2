//加载文件模块（异步操作）
var fs=require("fs")

//文件读取 fs.readFile("文件","编码",function(err,data){})
fs.readFile("package.json","utf-8",function(err,data){
	if(err)throw err
	console.log(data)
})
//文件写入 fs.writeFile("要写入的文件","要写入的内容",function(err){})
//如果没有这文件，会自动创建
fs.writeFile("笔记.txt","node",function(err){
	if(err)throw err
	console.log("写入成功")
})

//文件目录读取  fs.readdir("要读取的目录",function(err,data){})
fs.readdir(".",function(err,data){
	if(err)throw err
	console.log(data)	
})