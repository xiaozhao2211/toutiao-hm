<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img//logo_index.png" alt="">
          </div>
          <el-form ref="myForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="mobile">
                  <el-input  v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input  v-model="loginForm.code" placeholder="请输入验证码" style="width:65%;"></el-input>
                  <el-button style="float:right;">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="loginBtn" style="width:100%;margin-top:20px;">点击登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '格式不正确' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('不同意不行'))
          }
        } }]
      }
    }
  },
  methods: {
    loginBtn () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // console.log('初步成功')
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            console.log(result)
            this.$router.push('/home')
          }).catch(result => {
            // console.log(result)
            this.$message(
              {
                message: '您的手机号或验证码输入有误',
                type: 'warning'
              }
            )
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    background-image: url('../../assets/img/back.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 450px;
        height: 350px;
        .title {
            text-align: center;
            margin-bottom: 10px;
            img {
                height: 35px;
            }
        }
    }
}
</style>
