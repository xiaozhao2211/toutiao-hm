<template>
<!-- 外层容器 -->
<el-container>
    <!-- 左侧边栏导航 -->
    <el-aside style="height: 100vh;width: 230px;background-color: #323745;">
        <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <layout-header></layout-header>
        </el-header>
        <el-main>body</el-main>
    </el-container>
</el-container>

</template>

<script>
import layoutAside from '../../components/layout-aside'
import layoutHeader from '../../components/layout-header'

export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style lang='less' scoped>
</style>
