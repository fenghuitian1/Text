//订单表
// orderNO		订单编号			String
// state		订单状态			Number	（后续需要额外定义方法将数字转换为汉字显示）
// price		订单价格			Number	
// createTime	创建时间			Number
// detail		菜品详情			Array
// way		    支付方式			String
// createPerson	订单创建人	（名字） String
// personid		订单创建人	（id）	 Number

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const order = new Schema({
    orderNo:String,
    state:Number,
    price:Number,
    createTime:Number,
    detail:Array,
    way:String,
    createPerson:String,
    personid:Number
})

module.exports = mongoose.model('Order',order)