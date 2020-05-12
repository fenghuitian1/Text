// 用户表
// username		用户名			String
// mobile		手机号			String	
// password		密码			String
// sex		    性别			Number
// createTime	注册时间	     Number    时间戳


const mongoose = require('mongoose')
const  Schema = mongoose.Schema

const user = new Schema({
    username:String,
    mobile:String,
    password:String,
    sex:Number,
    create:Number,
})


module.exports = mongoose.model('User',user)