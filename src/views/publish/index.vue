<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form style="padding-left:50px" label-width="100px" :model="formData" :rules="publishRules" ref="publishForm">
        <el-form-item label="标题" prop="title">
           <el-input placeholder="文章名称" style="width:400px" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:120px">
          <el-radio-group v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select placeholder="请选择" v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishAticle(false)">发表</el-button>
          <el-button @click="publishAticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 表单数据
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null
      },
      // 校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5, max: 30, message: '文章标题字数在5~30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      },
      watch: {
        $route: function (to, from) {
          if (to.params.articleId) {
            // 表示修改文章
          } else {
            // 表示发布文章
            this.formData = {
              title: '',
              content: '',
              cover: {
                type: 0, // -1:自动，0-无图，1-1张，3-3张
                images: []
              },
              channel_id: null
            }
          }
        }
      }
    }
  },
  methods: {
    // 获取对应Id的文章
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    },
    // 发布文章
    publishAticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // console.log('ok')
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '成功存入'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取所有频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()// 拉取所有频道数据
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
