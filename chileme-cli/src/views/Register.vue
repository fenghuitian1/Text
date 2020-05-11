<template>
  <div class="register">
    <div class="inner">
      <div class="el-icon-s-shop"></div>
      <el-form :model="form" ref="Form" label-width="100px">
        <!--手机号-->
        <el-form-item
          size="medium"
          label="手机号"
          prop="mobile"
          :rules="[
                    { required: true, message: '手机号不能为空'},
                    { type: 'number', message: '手机号必须为数字值'}
                ]"
        >
          <el-input
            type="text"
            v-model.number="form.mobile"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item size="medium" label="验证码" prop="testCode">
          <el-input
            type="text"
            v-model.trim="form.testCode"
            autocomplete="off"
            class="wth408"
            placeholder="请输入获取的验证码"
          ></el-input>
          <el-button @click="getTestCode('Form')">获取验证码</el-button>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="registerHandle('Form')">提交</el-button>
          <el-button @click="resetForm('Form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="完善信息" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form :model="userform" label-width="100px">
        <el-form-item
          label="用户名"
          ref="Userform"
          prop="username"
          :rules="[
                    { required: true, message: '用户名不能为空'},
                ]"
        >
          <el-input v-model="userform.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          :rules="[
                    { required: true, message: '性别不能为空'},
                ]"
        >
          <el-radio v-model="userform.sex" label="1">男</el-radio>
          <el-radio v-model="userform.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
                    { required: true, message: '密码不能为空'},
                ]"
        >
          <el-input
            type="password"
            v-model="userform.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserDate('Userform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //注册表单
      form: {
        mobile: "", //手机号
        testCode: "" //验证码
      },
      userform: {
        //用户信息表单
        username: "", //用户名
        sex: "", //性别
        password: "" //密码
      },
      //弹窗的显隐
      dialogFormVisible: false
    };
  },
  methods: {
    //获取验证码
    getTestCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Axios({
            method: "post",
            url: "/api/user/getTestCode",
            data: {
              mobile: this.form.mobile
            }
          })
            .then(data => {
              console.log(data);
              this.form.testCode = data.data.data.testCode
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交注册表单方法
    registerHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.form.testCode) {
            this.$notify({
              title: "tip",
              message: "请输入验证码"
            });
            return false;
          }
          if (valid) {
            this.Axios({
              method: "post",
              url: "/api/user/register",
              data: {
                mobile: this.form.mobile,
                testCode: this.form.testCode
              }
            })
              .then(data => {
                console.log(data);
                this.dialogFormVisible = true;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        }
      });
    },
    //提交用户信息
    submitUserDate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.Axios({
              method: "post",
              url: "/api/user/collectInfo",
              data: {
                mobile:this.form.mobile,
                username:this.userform.username,
                sex:this.userform.sex,
                password:this.userform.password
              }
            })
            .then(data => {
              console.log(data);
              //注册成功  跳转登录
              this.$router.push('/login')
            })
            .catch(err => {
              console.log(err);
            });
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
@mixin flx($dec: culomn) {
  display: flex;
  flex-direction: $dec;
}
.register {
  height: 100%;
  justify-content: center;
  align-items: center;
  @include flx;
  background: #cccccc;
  .inner {
    width: 50%;
    height: 90%;
    .el-icon-s-shop {
      height: 20%;
      min-height: 150px;
      line-height: 150px;
      font-size: 80px;
      color: coral;
    }
    .el-form {
      margin-top: 20px auto 0;
      width: 620px;
    }
  }
  .el-dialog__wrapper {
    text-align: left;
    .el-input {
      width: 300px;
    }
  }

  .wth408 {
    width: 408px;
  }
}
</style>