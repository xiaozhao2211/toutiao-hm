<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
      </bread-crumb>
       <el-table :data="list">
           <el-table-column label="标题" width="580" prop="title"></el-table-column>
           <el-table-column label="评论状态" prop="comment_status" :formatter="formatterBoolean"></el-table-column>
           <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
           <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
           <el-table-column label="操作">
               <template slot-scope="obj">
                  <el-button type="text" size="small">修改</el-button>
                  <el-button type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
               </template>
           </el-table-column>
       </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
