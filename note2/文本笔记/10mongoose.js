//npm install mongoose
var mongoose=require("mongoose")

//声明数据结构
var Schema=mongoose.Schema;

mongoose.connect("mongodb://localhost/user")//数据库不存在则创建


//设置字段(保证数据完整性)
var people=new Schema({
	name:{
		type:String,//设置数据类型
		required:true//设置必填选项
	},
	age:Number,
	birthday:Date,
	img:String,
	friend:[{
		name:String,
		},{
		name:String,
		}],
	alive:Boolean	
})

//应用发布到固定集合
var Man=mongoose.model("user",people)



// for(var i=0;i<30;i++){
// 	
// //创建数据：	
// var zs=new Man({
// 	name:"张三"+i,
// 	age:18+i,
// 	alive:true
// })
// 
// //保存数据
// zs.save();
// 	
// }

//查找指定数据(查找年龄小于等于30的数据)
// Man.find({age:{$lte:30}}).then(function(val){
// 	console.log(val);
// })

//查找一条数据
// Man.findOne({age:{$lte:30}}).then(function(val){
// 	console.log(val);
// })

//删除多条数据 
// Man.deleteMany({age:{$lte:30}}).then(function(){
// 	console.log("删除成功")
// })

//删除一条数据
// Man.deleteOne({name:"张三29"}).then(function(){
// 	console.log("删除成功")
// })


//修改一条数据(更改一整条)
// Man.updateOne({name:"张三25"},{name:"李四",age:0},function(){
// 	console.log("修改成功")
// })

//修改一条数据(只能更改对应项目)
// Man.findOneAndUpdate({name:"张三26"},{$set:{name:"王五"}},function(){
// 	console.log("修改成功")
// })

//修改多条数据
// Man.updateMany({age:{$lte:38}},{name:"赵六",age:0},function(){
// 	console.log("修改成功")
// })












