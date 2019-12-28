<template>
<el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="80px" style="margin-left:50px;">
        <el-form-item label="用户名">
            <el-input style="width:40%" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input style="width:40%" v-model="formData.intro"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input style="width:40%" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input style="width:40%" v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <el-upload class="upload-head">
        <img :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-upload>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      defaultImg: require('../../assets/img/home_img.jpg')
    }
  },
  methods: {
    // 获取用户信息方法
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()// 拉取用户信息数据
  }
}
</script>

<style lang='less' scoped>
.upload-head {
    position: absolute;
    right: 180px;
    top:160px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
