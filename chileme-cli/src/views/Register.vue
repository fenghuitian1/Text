<template>
  <div class="register">
    <div class="el-icon-s-shop"></div>
    <el-form
      :model="form"
      ref="Form"
      label-width="100px"
    >
      <el-form-item
        label="手机号"
        prop="mobeli"
        :rules="[
                    { required: true, message: '手机号不能为空'},
                    { type: 'number', message: '手机号必须为数字值'}
                ]"
      >
        <el-input type="mobeli" v-model.number="form.mobeli" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerHandle('Form')">提交</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //注册表单
      form: {
        mobeli:'',
      }
    };
  },
  methods: {
    //提交注册表单方法
     registerHandle(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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

</style>