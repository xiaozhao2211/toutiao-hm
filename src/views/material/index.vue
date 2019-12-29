<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传图片 -->
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </el-row>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTag">
      <!-- 标签 -->
      <el-tab-pane label="全部图片" name="all">
        <!-- 生成页面结构  v-for 循环-->
        <div class="img-list">
          <el-card v-for="(item,index) in list" :key="item.id" class="img-card">
            <img :src="item.url" alt @click="openDialog(index)" />
            <el-row type="flex" justify="space-around" align="middle" class="operate">
              <i
                class="el-icon-star-on"
                @click="collectOrNo(item)"
                :style="{ color: item.is_collected ? 'red' : '#000' }"
              ></i>
              <i class="el-icon-delete-solid" @click="delImg(item.id)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 公共分页组件 -->
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
    <el-dialog :visible="dialogVisible" @close="dialogVisible = false" @opened="openEnd" >
      <el-carousel :interval="2000" type="card" height="400px" ref="myCarosel" >
        <el-carousel-item v-for="item in list" :key="item">
          <img :src="item.url" alt="" style="width:100%;height:100%">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材数据
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      },
      loading: false,
      dialogVisible: false,
      clickIndex: -1 // 点击的index
    }
  },
  methods: {
    // 顶级预览当前图片
    openEnd () {
      // 此时已经可以获取走马灯实例了 ref
      this.$refs.myCarosel.setActiveItem(this.clickIndex)
    },
    // 预览素材图片方法 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.clickIndex = index
    },
    // 删除图片
    async delImg (id) {
      await this.$confirm('你确定要删除么？')
      await this.$axios({
        url: `/user/images/${id}`,
        method: 'delete'
      })
      this.getMaterial()
    },
    // 图片收藏
    async collectOrNo (item) {
      await this.$axios({
        url: `user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      this.getMaterial()
    },
    // 上传图片方法
    async uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
      this.loading = false
      this.getMaterial()
    },
    // 改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签方法
    changeTag () {
      this.page.currentPage = 1 // 重置回第一页
      this.getMaterial()
    },
    // 获取素材方法
    async getMaterial () {
      let result = await this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 传false是获取所有的数据 传true是获取收藏数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 总条数
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
    height: 220px;
    margin: 20px 30px;
    position: relative;
    img {
      width: 100%;
    }
    .operate {
      height: 36px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #f4f5f6;
      font-size: 20px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
