<template>
  <div class="cover-image" >
      <div class='cover-image-item' @click="openDialog" v-for="(item,index) in list" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog title="提示" :visible="dialogVisible" @close="closeDialog">
          <!-- <el-button  @click="closeDialog" type="primary">关闭</el-button> -->
      </el-dialog>
  </div>
</template>
r
<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/home_img.jpg'),
      dialogVisible: false // 用来控制弹层的开关
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
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
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
