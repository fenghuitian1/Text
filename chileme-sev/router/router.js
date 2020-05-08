const router = require('koa-router')()//引入路由模块
//写接口
//test  get
router.get('/test',async ctx =>{
    ctx.body = 'test'
})
router.get('/hello',async ctx =>{
    ctx.body = 'hello'
})


//用户接口



//商品接口



//订单接口



//暴露接口模块

module.exports = router