<template>
    <div class="login">
        <div class="inner">
            <div class="el-icon-s-shop"></div>
            <el-form :model="form" ref="Form" label-width="100px">
                <!--手机号-->
                <el-form-item
                    label="手机号"
                    prop="mobile"
                >
                <el-input type="text" v-model.number="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item
                    label="密码" 
                    prop="password"
                >
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                <el-button type="primary" @click="loginHandle">登录</el-button>
                <el-button @click="resetForm('Form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                mobile:'',
                password:''
            }
        }
    },
    methods:{
       loginHandle(){
            this.Axios({
                method:'POST',
                url:'/api/user/login',
                data:{
                    mobile:this.form.mobile,
                    password:this.form.password
                }
            }).then(data => {
                console.log(data)
                if(data.data.flag) this.$router.push('/chooseGoods')
                else this.$message.error(`${data.data.msg}`)
                
            }).catch(err => {
                this.$message.error('登陆失败请稍后再试')
            })
        },
        resetForm(formName) {//重置按钮
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin flx($dec:culomn){
    display: flex;
    flex-direction: $dec;
}
.login {
  height: 100%;
  justify-content: center;
  align-items: center;
  @include flx;
  background: #cccccc;
  .inner{
      width: 50%;
      height: 90%;
      .el-icon-s-shop{
          height: 20%;
          min-height:150px;
          line-height: 150px;
          font-size: 80px;
          color: coral;
      }
      .el-form{
          margin-top: 20px auto 0;
          width: 620px;
      }
    }
    .wth408{
        width: 408px;
}
}
</style>