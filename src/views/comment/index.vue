<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
      </bread-crumb>
       <el-table :data="list" v-loading="loading">
           <el-table-column label="标题" width="580" prop="title"></el-table-column>
           <el-table-column label="评论状态" prop="comment_status" :formatter="formatterBoolean"></el-table-column>
           <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
           <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
           <el-table-column label="操作">
               <template slot-scope="obj">
                  <el-button type="text" size="small">修改</el-button>
                  <el-button @click="openOrCloseState(obj.row)" type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
               </template>
           </el-table-column>
       </el-table>
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
      list: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论方法
    async getComment () {
      this.loading = true
      let result = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
      this.loading = false
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论方法
    async openOrCloseState (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您是否确定要${mess}评论吗`, '提示')
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        params: { article_id: row.id.toString() },
        data: { allow_comment: !row.comment_status }
      })
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
