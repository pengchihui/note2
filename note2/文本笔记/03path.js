//加载path路径模块
var path=require("path");

console.log(__dirname);//文件目录的地址
console.log(__filename);//文件的地址

//地址拼接
var page=path.join(__dirname,"html","index.html");
console.log(page)

