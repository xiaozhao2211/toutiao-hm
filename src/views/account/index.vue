<template>
<el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="80px" style="margin-left:50px;">
        <el-form-item label="用户名">
            <el-input style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <el-upload class="upload-head">
        <img src="../../assets/img/home_img.jpg" alt="">
    </el-upload>
</el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.upload-head {
    position: absolute;
    right: 180px;
    top:160px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
