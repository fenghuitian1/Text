<template>
    <div class="stockManagement">
        <el-row>
            <el-col :span="12"><div class="stockForm"></div></el-col>
            <el-col :span="12"><div class="stockTable"></div></el-col>
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
.stockManagement{
    height: $h;
    .el-row,.el-col{
        height: $h;
    }
    .stockForm,.stockTable{
        height: $h;
        overflow-y: auto;
    }
    .stockForm{
        background: rgb(168, 206, 245);
    }
    .stockTable{
        background: rgb(167, 167, 248);
    }

}
</style>