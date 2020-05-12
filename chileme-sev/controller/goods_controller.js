const Goods = require('../model/goods_schema')      //引入商品表

//添加商品
const addGoods = async ctx =>{
    const data = ctx.request.body
    let goods = new Goods({
        goodId    : new Date().getTime(),
        goodname  : data.goodname,
        price     : Number(data.price),
        num       : Number(data.num),
        desc      : data.desc,
        rate      : data.rate,
        type      : data.type,
        isOff     : data.isOff,
        percent   : data.percent,
        itemType  : data.itemType,
        material  : data.material,
        tast      : data.tast,

    })
    await goods.save().then(data => {
        ctx.body = {
            code:200,
            flag:true,
            type:'success',
            msg:'操作成功'
        }
    }).catch(err => {
        ctx.body = {
            code:200,
            flag:false,
            type:'error',
            msg:'操作失败'
        }
    })
}

//查询商品列表
const findGoodsList = async ctx =>{
    await Goods.find().then(data =>{
        ctx.body = {
            code:200,
            flag:true,
            type:'success',
            msg:'查询成功',
            data:data
            
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code:200,
            flag:false,
            type:'error',
            msg:'查询失败',
            data:[]
            
        }
    })
}


module.exports = {
    addGoods,
    findGoodsList
}