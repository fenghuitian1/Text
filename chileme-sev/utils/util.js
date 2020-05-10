// 1.时间戳 转换成 yyyy-mm-dd  hh:mm:ss
const transTime = num =>{

}

// 2.生成随机颜色的方法
const randomColor = ()=>{

}
// 3.将状态码转换成汉字的方法
const transCode = num=>{


}
//4.正则

const regMobile = /^1[3456789]\d{9}$/   //验证手机号的正则
const regPassword = /^[a-zA-Z0-9]{6-12}$/  //验证密码  大小写字母或者数字 组成的长度在6-12之间
const regUsername = /^[a-zA-z0-9\u4e00-\u9fa5]{1,20}$/   //验证用户名的正则

//5.随机生成六位验证码
const testCode = ()=>{
    var arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
			0,1,2,3,4,5,6,7,8,9];
				let  rand1 = Math.floor((Math.random()*62));
				let  rand2 = Math.floor((Math.random()*62));
				let  rand3 = Math.floor((Math.random()*62));
				let  rand4 = Math.floor((Math.random()*62));
				let  rand5 = Math.floor((Math.random()*62));
				let  rand6 = Math.floor((Math.random()*62));
                // alert("验证码为: " + " " + arr[rand1] + " " + arr[rand2] + " " +  arr[rand3] + " "  + arr[rand4] + " "  + arr[rand5] + " "  + arr[rand6])  ;
                return `${rand1}${rand2}${rand3}${rand4}${rand5}${rand6}`
}


module.exports={
    transTime,
    randomColor,
    transCode,
    testCode,
    regMobile,
    regPassword,
    regUsername
}