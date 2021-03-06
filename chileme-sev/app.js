const Koa = require('koa')
const App = new Koa()
const cfg = require('./config')//引入配置文件
const mongoose = require('mongoose')//引入mongoose
const router = require('./router/router')
const koaBody = require('koa-body') // 引入koa-body插件解析 post请求
const koaCars = require('koa-cors') //引入koa-cors插件



//创建服务器连接
mongoose.connect(cfg.path,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
mongoose.connection.on('error',()=>{
    console.log('服务器连接错误')
})

mongoose.connection.once('open',()=>{   //once只触发一次
    console.log('服务器已连接')
})
//async  声明函数是一个异步函数
App.use(koaBody())  //配置 koa-body
App.use(koaCars({
    origin:'http://localhost:8080', //允许那个地址来访问我们的服务
    credentials:true    //请求是否携带证书  cookie
}))  //配置 koa-cars

App.use(router.routes()).use(router.allowedMethods())// 启动路由


//启动服务器
App.listen(cfg.port)
console.log(`server is running at http://localhost:${cfg.port}`)