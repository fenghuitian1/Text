const User = require('../model/user_schema')   //引入用户表
const preRegist = require('../model/preRegist_schema')    //引入预注册表
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
    let data = ctx.require.body
    //1.验证手机号是否合法    不合法则提示手机号输入有问题    
    if(!Util.regMobile,test(ctx.mobile)){   //手机号不合法
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
    console.log(testCode)
    //>2是否首次获取验证码
    let testCodeRes = await preRegiste.findOne({mobile:data.mobile})
    if(!!testCodeRes){  //非首次获取验证码
        await preRegist.update({mobile:data.mobile},{$set:{
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
        let preRegist = new preRegist({
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
    let data = ctx.require.body
    //验证手机号和验证码是否匹配      不匹配提示验证码有误  {code:200,msg:'验证码错误',flag:1}
    //1.验证码和手机号是否为空
    //2.在预注册表中查手机号    是否查到手机号    查不到则提示先获取验证码
    //3.验证码是否过期
    //4.匹配则注册成功     (code:200,msg:'注册成功',flag:2)

    ctx.body = 'register'
}

//登录
const login = async ctx =>{
    //1.获取请求方提供的数据
    //2.去数据库中查找该用户   若用户不存在提示用户先去注册   {code:200,msg:'用户未注册，flag:1'}
    //3.校验手机号和密码是否匹配  不匹配提示错误    {code:200,msg:'密码错误',flag:2}
    //4.若两个值匹配的话   则返回登录成功 (code:200,msg:'登录成功',flag:3)
    ctx.body = 'login'
}


module.exports = {
    getTestCode,
    register,
    login
}

//module.exports = {
//     register:Register,
//     login:Login
// }