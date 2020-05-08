<template>
  <div class="home">
    <el-row>
      <el-col :span="2"><div class="grid-left grid-content bg-purple-dark"></div></el-col>
      <el-col :span="22"><div class="grid-right grid-content bg-purple-dark"> <router-view/></div></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
@mixin init{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home{
  @include init;
  .grid-left{
    background: rgb(53, 57, 235);
  }
  .el-row,.el-col,.grid-left,grid-right{
    height: 100%;
  }
}

</style>
