<template>
  <div class="cover-image" >
      <div class='cover-image-item' @click="openDialog(index)" v-for="(item,index) in list" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/collect_select.png'),
      dialogVisible: false, // 用来控制弹层的开关
      selectIndex: -1 // 用来存储点击的哪个图片的下标
    }
  },
  methods: {
    // 接收select-image组件传递值
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.closeDialog() // 关闭弹层
    },
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 记录当前点击的是哪个图片
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin: 20px 100px;
    .cover-image-item {
        width: 250px;
        height: 250px;
        border: 1px solid #ccc;
        padding: 20px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
