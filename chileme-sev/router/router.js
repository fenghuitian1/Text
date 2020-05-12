const router = require('koa-router')()//引入路由模块
const User = require('../controller/user_controller')  //引入用户controller
const Goods = require('../controller/goods_controller') //引入商品中间件
//写接口
//test  get
router.get('/test',async ctx =>{
    ctx.body = 'test'
})
router.get('/hello',async ctx =>{
    ctx.body = 'hello'
})


//用户接口
router.post('/api/user/getTestCode', User.getTestCode)    //获取验证码接口

router.post('/api/user/register', User.register)    //注册接口

router.post('/api/user/collectInfo', User.collectInfo)    //完善用户信息接口

router.post('/api/user/login', User.login)       //登录接口


//商品接口
router.post('/api/user/addGoods',Goods.addGoods)    //添加商品接口
router.get('/api/user/findGoodsList',Goods.findGoodsList)   //查询商品接口



//订单接口



//暴露接口模块

module.exports = router