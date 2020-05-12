<template>
  <div class="stockManagement">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stockForm">
          <el-form ref="form" :model="form" label-width="80px">
                <!-- 商品名称 -->
                <el-form-item label="商品名称">
                    <el-input v-model="form.goodname"></el-input>
                </el-form-item>
                <!-- 商品价格 -->
                <el-form-item label="商品价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <!-- 商品数量 -->
                <el-form-item label="商品数量">
                    <el-input v-model="form.num"></el-input>
                </el-form-item>
                <!-- 商品描述 -->
                <el-form-item label="商品描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <!-- 推荐指数 -->
                <el-form-item label="推荐指数">
                    <el-input v-model="form.rate"></el-input>
                </el-form-item>
                <!-- 商品大类 -->
                <el-form-item label="商品大类">
                    <el-radio v-model="form.type" label="food">食品</el-radio>
                    <el-radio v-model="form.type" label="drink">饮料</el-radio>
                    <el-radio v-model="form.type" label="sweet">甜品</el-radio>
                    <el-radio v-model="form.type" label="combo">套餐</el-radio>
                </el-form-item>
                <!-- 是否打折 -->
                <el-form-item label="是否打折">
                    <el-radio v-model="form.isOff" :label="true">是</el-radio>
                    <el-radio v-model="form.isOff" :label="false">否</el-radio>
                </el-form-item>
                <!-- 折扣幅度 -->
                <el-form-item label="折扣幅度">
                      <el-input v-model="form.percent"></el-input>
                </el-form-item>
                <!-- 商品小类 -->
                <el-form-item label="商品小类">
                    <el-radio v-model="form.itemType" label="special">特色菜</el-radio>
                    <el-radio v-model="form.itemType" label="cool">下酒菜</el-radio>
                    <el-radio v-model="form.itemType" label="soup">汤羹</el-radio>
                    <el-radio v-model="form.itemType" label="normal">主食</el-radio>
                    <el-radio v-model="form.itemType" label="fast">方便食品</el-radio>
                </el-form-item>
                <!-- 主要材料 -->
                <el-form-item label="主要材料">
                    <el-checkbox-group v-model="form.material">
                        <el-checkbox v-for="item in material" :key="item.id" :label="item.code">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- 口味 -->
                <el-form-item label="口味">
                    <el-radio v-model="form.tast" label="hot">辣</el-radio>
                    <el-radio v-model="form.tast" label="light">清淡</el-radio>
                    <el-radio v-model="form.tast" label="sweet">甜</el-radio>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitHandle">提交</el-button>
                    <el-button type="warning" @click="resetHandle('form')">重置</el-button>
                </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- 右侧订单内容 -->
      <el-col :span="18">
        <div class="stockTable">
            <el-table 
            :data="tableData"
            border
            style="width: 90%,margin:auto"
            >
                <el-table-column prop="goodname" label="商品名称"> </el-table-column>   
                <el-table-column prop="price" label="商品价格"> </el-table-column>    
                <el-table-column prop="num" label="商品数量"> </el-table-column>    
                <el-table-column prop="desc" label="商品描述"> </el-table-column>    
                <el-table-column prop="rate" label="推荐指数"> </el-table-column>    
                <el-table-column prop="type" label="商品大类"> </el-table-column>    
                <el-table-column prop="isOff" label="是否打折"> </el-table-column>    
                <el-table-column prop="percent" label="折扣幅度"> </el-table-column>    
                <el-table-column prop="itemType" label="食品小类"> </el-table-column>    
                <el-table-column prop="material" label="主要材料"> </el-table-column>    
                <el-table-column prop="tast" label="口味"> </el-table-column>    
            </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单
      form: {
        goodname: "",
        price: "",
        num: "",
        desc: "",
        rate: "", // 3-5
        type: "", //食品:food, 饮料:drink, 甜品:sweet, 套餐:combo
        isOff: "", // true/false
        percent: "", // 2.5 --- 9.1
        itemType: "", //特色菜:special、下酒菜:cool 汤羹:soup、主食:normal、 方便菜肴:fast)
        material: [],
        tast: "" //偏辣，清单，偏甜
      },
      //材料
      material:[
        {id:1,name:'西红柿',code:'tomoto'},
        {id:2,name:'牛肉',code:'beef'},
        {id:3,name:'鸡肉',code:'chicken'},
        {id:4,name:'猪肉',code:'pork'},
        {id:5,name:'白菜',code:'carbage'},
        {id:6,name:'土豆',code:'potato'}
      ],
      //table
      tableData: []
    };
  },
  method:{
    //提交数据
    submitHandle(){

    },
    //重置表单
    resetHandle(formName){
      
    },
    //更新table数据的方法
    getData(){
      
    }
  }
};
</script>

<style lang="scss" scoped>
$h: 100%;
.stockManagement {
  height: $h;
  .el-row,
  .el-col {
    height: $h;
  }
  .stockForm,
  .stockTable {
    height: $h;
    overflow-y: auto;
  }
  .stockForm {
    background: rgb(168, 206, 245);
  }
  .stockTable {
    background: rgb(167, 167, 248);
  }
}
</style>