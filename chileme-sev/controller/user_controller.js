const user = require('../model/user_schema')   //引入用户表
/**
 * async / await es7提供的方法
 * async 声明一个函数为异步函数
 * await 等待前一个异步函数操作完成后再去执行后续操作
 * 
 * async可以单独使用   
 * await必须和async搭配使用
 */

//验证码
const testCode = async ctx=>{
    //1.验证手机号是否合法    不合法则提示手机号输入有问题      (code:200,msg:'手机号不合法',flag:1)
    //2.去数据库中查找看该手机号是否被注册  若存在，提示用户该手机号已被注册(code:200,msg:'该手机号已注册',flag:2)
    //3.发送验证码  (code:200,msg:'验证码已发送',flag:3)

    //4.预注册  （后台操作）
}


//注册
const register = async ctx =>{
    //获取post请求数据
    let data = ctx.require.body
    //验证手机号和验证码是否匹配      不匹配提示验证码有误  {code:200,msg:'验证码错误',flag:1}
    //匹配则注册成功     (code:200,msg:'注册成功',flag:2)
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
    register,
    login
}

//module.exports = {
//     register:Register,
//     login:Login
// }