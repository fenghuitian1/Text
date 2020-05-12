<template>
  <div class="home">
    <el-row>
      <el-col :span="1">
        <div class="grid-left grid-content bg-purple-dark">
          <div class="iconfont" @click="jumpTo('/chooseGoods')" >&#xe642;<i>点餐</i></div>
          <div class="iconfont">&#xe616;<i>会员</i></div>
          <div class="iconfont" @click="jumpTo('/stockManagement')">&#xe65f;<i>库存</i></div>
          <div class="iconfont">&#xe64c;<i>报表</i></div>
          <div class="iconfont">&#xe600;<i>辅助</i></div>
          <div class="iconfont">&#xe650;<i>退出</i></div>
        </div>
      </el-col>
      <el-col :span="23"><div class="grid-right grid-content bg-purple-dark"> <router-view/></div></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{

    }
  },
  methods:{
    jumpTo(name){
      this.$router.push(name)
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  .grid-left{
    display: flex;
    flex-direction: column;
    background: rgb(13, 127, 209);
    color: #ffffff;
    .iconfont{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 34px;
      i{
        font-size: 14px;
      }
      &:hover{
        background: #e04747;
        cursor: pointer;
      }
    }
  }
  .el-row,.el-col,.grid-left,.grid-right{
    height: 100%;
  }
}

</style>
