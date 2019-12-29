<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
      label-width="80px"
      style="margin-left:50px;"
      :model="formData"
      :rules="infoRules"
      ref="myForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input style="width:40%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:40%" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:40%" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input style="width:40%" v-model="formData.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload class="upload-head" action :show-file-list="false" :http-request="uploadImg">
      <img :src="formData.photo?formData.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
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
      defaultImg: require('../../assets/img/home_img.jpg'),
      infoRules: {
        name: [{ required: true, message: '用户名不能为空' },
          { min: 3, max: 8, message: '用户名长度应为1~8个字' }],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    // 上传头像方法
    async uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.formData.photo = result.data.photo
      eventBus.$emit('updateUserInfo')
    },
    // 存储用户信息方法(手动校验)
    async saveUserInfo () {
      await this.$refs.myForm.validate()
      await this.$axios({
        url: '/user/profile',
        method: 'patch',
        data: this.formData
      })
      this.$message({
        type: 'success',
        message: '保存用户信息成功'
      })
      eventBus.$emit('updateUserInfo')
    },
    // 获取用户信息方法
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    }
  },
  created () {
    this.getUserInfo('updateUserInfo')// 拉取用户信息数据
  }
}
</script>

<style lang='less' scoped>
.upload-head {
  position: absolute;
  right: 180px;
  top: 160px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
