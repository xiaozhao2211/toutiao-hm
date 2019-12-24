<template>
  <el-card class='articles'>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">内容列表</template>
      </bread-crumb>
      <!-- 页面结构-搜索工具栏 -->
      <el-form style="padding-left:50px">
        <el-form-item label="文章状态:">
          <!-- 组件监听 -->
          <el-radio-group v-model="searchForm.status" @change="changeCondition">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select placeholder="请选择" v-model="searchForm.channel_id" @change="changeCondition">
            <el-option v-for="item in channels" :key="item.id"  :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
         <el-date-picker
         value-format="yyyy-MM-dd"
         @change="changeCondition"
          v-model="searchForm.dateRange"
          type="daterange"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 内容列表-页面主体结构 -->
      <el-card>
        <el-row class='total' type="flex" align="middle">
          <span>共找到n条符合条件的内容</span>
        </el-row>
        <div class="article-item" v-for="item in list" :key="item.id.toString()">
           <div class="left">
              <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
              <div class="info">
               <span>{{item.title}}</span>
               <span>
                 <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
               </span>
               <span class="date">{{item.pubdate}}</span>
              </div>
           </div>
           <div class="right">
              <span><i class="el-icon-edit"></i>修改</span>
              <span><i class="el-icon-delete"></i>删除</span>
           </div>
        </div>
      </el-card>
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
      channels: [], // 接收频道
      list: [], // 接收文章数据
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  filters: {
    filterStatus (value) {
      // 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'success'
        case 2:
          return ''
        case 3:
          return 'info'
        default:
          break
      }
    }
  },
  methods: {
    // 选择变化监听
    changeCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 状态为5就传，否则传当前状态值
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null// 截至时间
      }
      this.getArticles(params)
    },
    // 内容列表-请求数据 方法
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
      })
    },
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
    this.getArticles()// 拉取文章数据
  }
}
</script>

<style lang="less" scoped>
.articles {
  .total {
    height: 50px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 130px;
        border-radius: 5px;
      }
      .info {
        height: 130px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-left: 15px;
      }
      .tag {
        text-align: center;
        width: 60px;
      }
      .date {
        font-size: 12px;
        color: #ccc;
      }
    }
    .right {
      span {
        font-size:14px;
        margin-right: 8px;
        cursor: pointer;
        font-size: 12px
      }
    }
  }
}
</style>
