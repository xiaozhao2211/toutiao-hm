<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">内容列表</template>
      </bread-crumb>
      <!-- 页面结构-搜索工具栏 -->
      <el-form style="padding-left:50px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="searchForm.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select placeholder="请选择" v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key="item.id"  :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
         <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选全部
        channel_id: null, // 默认不选类别
        dateRange: [] // 日期范围
      },
      channels: []// 接收频道
    }
  },
  methods: {
    // 获取文章所有频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()// 拉取频道数据
  }
}
</script>

<style>

</style>
