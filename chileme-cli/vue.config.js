module.exports ={
    devServer:{ //配置请求数据服务器的地址
        proxy:'http://127.0.0.1:3000'
    },

    productionSourceMap: false
}