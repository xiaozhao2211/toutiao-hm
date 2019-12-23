<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">素材管理</template>
      </bread-crumb>
        <el-tabs v-model="activeName" @tab-click="changeTag">
          <el-tab-pane label="全部图片" name="all">
            <div class="img-list">
              <el-card v-for="item in list"  :key="item.id" class="img-card">
                <img :src="item.url" alt="">
                <el-row type="flex" justify="space-around" align="middle" class="operate">
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-delete-solid"></i>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
            <div class="img-list">
              <el-card v-for="item in list"  :key="item.id" class="img-card">
                <img :src="item.url" alt="">
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-row type="flex" justify="center" align="middle" style="height:60px">
         <el-pagination background layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage">
         </el-pagination>
       </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTag () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取素材方法
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
      width: 200px;
      height: 250px;
      margin: 20px 30px;
      position: relative;
    img {
      width: 100%
    }
    .operate {
      height: 36px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #f4f5f6;
      font-size: 20px;
    }
  }
}
</style>
