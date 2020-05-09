const mongoose = require('mongoose')    
const Schema = mongoose.Schema



const preRegist = new Schema({
    mobile:String,  //手机号
    testCode:String,    //验证码
    createDate:Number,  //发送验证码的时间
    deadDate:Number,    //验证码过期时间
})


module.exports = mongoose.model('PreRegist',preRegist)