<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="material-list">
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img :src="item.url" alt @click="clickImg(item.url)" />
        </el-card>
      </div>
      <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="upload-img" action="" :show-file-list="false" :http-request="uploadImg">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [], // 接收所有图片数据
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    // 上传图片方法
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // 点击图片时触发 =>子传父
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    // 页码改变方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImages()
    },
    // 获取所有图片方法
    getAllImages () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImages() // 拉取图片数据
  }
}
</script>

<style lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    height: 200px;
    width: 200px;
    border-radius: 4px;
    border: 1px dashed #ccc;
    font-size: 50px;
    text-align: center;
    line-height: 200px
  }
}
</style>
