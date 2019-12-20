<template>
<!-- 外层容器 -->
<el-container>
    <!-- 左侧边栏导航 -->
    <el-aside style="min-height: 100vh;width: 230px;background-color: #323745;">
        <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <layout-header></layout-header>
        </el-header>
        <el-main style="padding:0">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>

</template>

<script>

export default {

}
</script>

<style lang='less' scoped>
</style>
