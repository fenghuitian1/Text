const User = require('../model/user_schema')   //引入用户表
const PreRegist = require('../model/preRegist_schema')    //引入预注册表
const Util = require('../utils/util')  //引入公共js方法
/**
 * async / await es7提供的方法
 * async 声明一个函数为异步函数
 * await 等待前一个异步函数操作完成后再去执行后续操作
 *
 * async可以单独使用   
 * await必须和async搭配使用
 */

//验证码
const getTestCode = async (ctx,next)=>{
    //获取请求信息
    let data = ctx.request.body
    //1.验证手机号是否合法    不合法则提示手机号输入有问题    
    if(!Util.regMobile,test(data.mobile)){   //手机号不合法
        ctx.body = {
            code:200,
            flag:false,
            type:'illegal',
            msg:'手机号格式错误'
        }
        return  //中断后续代码执行
    }
    //2.去数据库中查找看该手机号是否被注册  若存在，提示用户该手机号已被注册
    let res = await User.findOne({mobile:data.mobile})
    //findOne 只找出一条数据   找到数据 =>{}  未找到数据 => null
    if(!!res){  //说明手机号被注册过
        ctx.body = {
            code:200,
            flag:false,
            type:'exist',
            msg:'手机号已注册过'
        }
        return  //中断后续代码执行
    }

    //3.预注册  （后台操作）
    //>1生成验证码
    const testCode = Util.testCode()
    // console.log(testCode)
    //>2是否首次获取验证码
    let testCodeRes = await PreRegiste.findOne({mobile:data.mobile})
    if(!!testCodeRes){  //非首次获取验证码
        await PreRegist.update({mobile:data.mobile},{$set:{
            testCode:testCode,    //验证码
            createDate:new Date().getTime,  //发送验证码的时间
            deadDate:new Date().getTime + 1800000 ,    //验证码过期时间(30分钟时效)
        }}).then(data => {
            ctx.body = {
                code:200,
                flag:true,
                type:'success',
                data:{
                    msg:'获取成功',
                    testCode:testCode
                }
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {
                code:200,
                flag:false,
                type:'error',
                msg:'获取失败'
            }
        })

    }else{     //首次获取验证码
        let preRegist = new PreRegist({
            mobile:data.mobile,  //手机号
            testCode:testCode,    //验证码
            createDate:new Date().getTime,  //发送验证码的时间
            deadDate:new Date().getTime + 1800000 ,    //验证码过期时间(30分钟时效)
        })
        await preRegist.save().then(data=>{
            //4.发送验证码
            ctx.body = {
                code:200,
                flag:true,
                type:'success',
                data:{
                    msg:'获取成功',
                    testCode:testCode
                }
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {
                code:200,
                flag:false,
                type:'error',
                msg:'获取成功',
            }
        })
    }
}


//注册
const register = async ctx =>{
    //获取post请求数据
    let data = ctx.request.body
    //验证手机号是否合法    不合法则提示手机号输入有问题    
    if(!Util.regMobile,test(data.mobile)){   //手机号不合法
        ctx.body = {
            code:200,
            flag:false,
            type:'illegal',
            msg:'手机号格式错误'
        }
        return  //中断后续代码执行
    }
    //验证手机号和验证码是否匹配      不匹配提示验证码有误  {code:200,msg:'验证码错误',flag:1}
    //1.验证码和手机号是否为空
    let res = await PreRegist.findOne({mobile:data.mobile})
    //2.在预注册表中查手机号    是否查到手机号    查不到则提示先获取验证码
    if(!!res){
        //3.验证码是否过期
        if(new Date().getTime()>res.deadDate){  //验证码过期提示用户 重新获取
            ctx.body={
                code:200,
                flag:false,
                type:'timeout',
                msg:'验证码过期'
            }
        }else{
            //判断验证码是否跟手机号匹配    
            if(data.testCode == res.testCode){
                //4.匹配则注册成功     (code:200,msg:'注册成功',flag:2)
                let user = new User({
                    username:'',
                    mobile:data.mobile,
                    passwo:'',
                    sex:3,
                    create:new Date().getTime()
                })
                await user.save().then(data => {
                    //注册成功后删除预注册表的信息
                    // await PreRegist.deleteOne({mobile:data.mobile})
                    ctx.body={
                        code:200,
                        flag:true,
                        type:'success',
                        msg:'注册成功'
                    }
                }).catch(err => {
                    console.log(err)
                    ctx.body={
                        code:200,
                        flag:false,
                        type:'error',
                        msg:'注册失败'
                    }
                })
            }else{
                //不匹配
                ctx.body={
                    code:200,
                    flag:false,
                    type:'testCode error',
                    msg:'验证码错误'
                }
            }
        }
        
    }else{
        ctx.body={
            code:200,
            flag:false,
            type:'not exist',
            msg:'请先获取验证码'
        }
    }
    
    ctx.body = 'register'
}

//完善用户信息
const collectInfo = async ctx=>{
    const data = ctx.request.body

    //1.用户名是否合法
    if(!Util.regUsername.test(data.username)){
        ctx.body={
            code:200,
            flag:false,
            type:'illegal username',
            msg:'用户名不合法'
        }
        return
    }
    //2.性别是否合法
    if(data.sex !== 0 && data.sex !== 1){
        ctx.body={
            code:200,
            flag:false,
            type:'illegal sex',
            msg:'性别输入错误'
        }
        return
    }
    //3.判断密码是否合法
    if(!Util.regPassword.test(data.password)){
        ctx.body={
            code:200,
            flag:false,
            type:'illegal password',
            msg:'密码不合法'
        }
        return
    }
    //4.更新数据库中的数据
}

//登录
const login = async ctx =>{
    //1.获取请求方提供的数据
    const data = ctx.request.body
    //2.去数据库中查找该用户   若用户不存在提示用户先去注册   {code:200,msg:'用户未注册，flag:1'}
    //判断手机号是否合法
    if(!Util.regMobile,test(ctx.mobile)){   //手机号不合法
        ctx.body = {
            code:200,
            flag:false,
            type:'illegal',
            msg:'手机号格式错误'
        }
        return  //中断后续代码执行
    }
    let res = await User.findOne({mobile:data.mobile})
    if(!!res){  //在数据库中找到该用户的信息
        //3.校验手机号和密码是否匹配  不匹配提示错误    {code:200,msg:'密码错误',flag:2}
        if(data.password === res.password){ // 若两个值匹配  则返回登录成功
            ctx.body = {
                code:200,
                flag:true,
                type:'success',
                msg:'登录成功'
            }
        }else{ //若不匹配则提示错误
            ctx.body = {
                code:200,
                flag:false,
                type:'error',
                msg:'密码错误'
            }
        }
        
    }else{//在数据库中没有找到该用户的信息
        ctx.body = {
            code:200,
            flag:false,
            type:'not exist',
            msg:'该手机号未注册'
        }
    }
  
    ctx.body = 'login'
}



module.exports = {
    getTestCode,
    register,
    login,
    collectInfo
}

//module.exports = {
//     register:Register,
//     login:Login
// }