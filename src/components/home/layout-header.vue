<template>
  <div>
    <el-row class="layout-header" type="flex" align="middle">
        <el-col :span="12" class="left">
          <i class="el-icon-s-unfold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12" class="right">
          <el-row type="flex" justify="end" align="middle">
            <div class="demo-input-suffix" style="margin-right:20px">
                <el-input placeholder="请输入搜索的文章内容" prefix-icon="el-icon-search"></el-input>
            </div>
            <span>消息</span>
            <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
            <!-- <img :src="!userInfo.photo?userInfo.photo:defaultImg" alt=""> -->
            <el-dropdown  @command="headerCommand">
               <span >{{userInfo.name}}</span><i class="el-icon-caret-bottom"></i>
               <!-- <span>沙雕吕坤在看你</span><i class="el-icon-caret-bottom"></i> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="gitAddress">git地址</el-dropdown-item>
                <el-dropdown-item command="lgout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  methods: {
    headerCommand (command) {
      if (command === 'info') {

      } else if (command === 'gitAddress') {
        window.location.href = 'https://github.com/shuiruohanyu/90heimatoutiao'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: { Authorization: `Bearer ${token}` }
    }).then(result => {
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
    height: 50px;
    color: #2c3e50;
    .left {
      span {
        padding: 0 10px;
    }
    }
    .right {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }

}
</style>
