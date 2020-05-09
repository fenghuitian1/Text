<template>
  <div class="register">
    <div class="inner">
      <div class="el-icon-s-shop"></div>
      <el-form :model="form" ref="Form" label-width="100px">
        <!--手机号-->
        <el-form-item
            size="medium"
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
            size="medium" 
            label="验证码" 
            prop="testCode"
        >
          <el-input type="text" v-model.trim="form.testCode" autocomplete="off" class="wth408"></el-input>
          <el-button @click="getTestCode">获取验证码</el-button>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="registerHandle('Form')">提交</el-button>
          <el-button @click="resetForm('Form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //注册表单
      form: {
        mobeli: "", //手机号
        testCode: "" //验证码
      }
    };
  },
  methods: {
    //获取验证码
    getTestCode() {},
    //提交注册表单方法
    registerHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flx($dec:culomn){
    display: flex;
    flex-direction: $dec;
}
.register {
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