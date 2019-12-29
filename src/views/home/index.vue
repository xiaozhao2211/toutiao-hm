<template>
<!-- 外层容器 -->
<el-container>
    <!-- 左侧边栏导航 -->
    <el-aside style=" transition:all 0.5s; min-height: 100vh;background-color: #323745;" :style="{width: collapse ? '60px' : '230px'}">
        <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false// 默认展开侧边栏
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang='less' scoped>
</style>
