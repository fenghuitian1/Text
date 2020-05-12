<template>
    <div class="chooseGoods">
        <el-row>
            <el-col :span="8"><div class="cartsAndOrder"></div></el-col>
            <el-col :span="16"><div class="menu"></div></el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
$h:100%;
.chooseGoods{
    height: $h;
    .el-row,.el-col{
        height: $h;
    }
    .cartsAndOrder,.menu{
        height: $h;
    }
    .cartsAndOrder{
        background: rgb(222, 223, 224);
    }
    .menu{
        background: rgb(244, 244, 245);
    }

}
</style>