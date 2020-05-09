<template>
    <div class="login">
        <div class="inner">
      <div class="el-icon-s-shop"></div>
      <el-form :model="form" ref="Form" label-width="100px">
        <!--手机号-->
        <el-form-item
            label="手机号"
            prop="mobeli"
            :rules="[
                    { required: true, message: '手机号不能为空'},
                    { type: 'number', message: '手机号必须为数字值'}
                ]"
        >
          <el-input type="text" v-model.number="form.mobeli" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item
            label="密码" 
            prop="password"
        >
          <el-input type="text" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="LoginHandle">登录</el-button>
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
                mobeli:'',
                password:''
            }
        }
    },
    methods:{
        loginHandle(){

        },
        //重置按钮
        resetForm(formName) {
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