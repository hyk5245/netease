<template>
  <div class="header-container">
    <div class="head-left">
      <svg class="icon netease-icon" aria-hidden="true">
        <use xlink:href="#icon-netease-cloud-music-fill"></use>
      </svg>
      网易云音乐
    </div>
    <div class="head-center">
      <div class="arrow-box">
        <svg @click="back" class="icon arrow" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="arrow-box arrow-margin">
        <svg @click="forward" class="icon arrow" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <el-input
        class="head-center-input"
        size="small"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="keyword">
      </el-input>
    </div>
    <div class="head-right">
      <div class="image-box">
        <img src="https://p4.music.126.net/Mz06wJWw0NIYrrnSyV6FCg==/109951164417440524.jpg">
      </div>
      <span @click="dialogFormVisible = true">未登录</span>
      <div class="login-logout-box">
        <span>注销</span>
      </div>
    </div>

    <el-dialog width="6rem" :modal="false" title="手机号登录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="手机号">
          <el-input v-model="form.username" placeholder="请输入手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width: 100%" type="danger" @click="userLogin">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '',

      dialogFormVisible: false,
      form: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward()
    },
    userLogin() {
      let {username, password} = this.form
      console.log(username);
      console.log(password);
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ec4141;
  color: white;
  height: 1rem;
  padding: 0 .3rem;
}
.netease-icon {
  height: 25px;
  width: 25px;
  vertical-align: middle;
}
.head-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-box {
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
}
.arrow-margin {
  margin: 0 .2rem;
}
.arrow {
  width: 100%;
  height: 100%;
  background-color: #d83b3b;
  border-radius: 50%;
}
.head-center-input >>> input {
  border-radius: .4rem !important;
  height: .6rem;
}
.head-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.image-box {
  width: .6rem;
  height: .6rem;
  border-radius: .3rem;
  overflow: hidden;
}
.image-box img {
  width: 100%;
}
.login-logout-box {
  margin-left: .2rem;
}
/* 修改element UI 样式 */
.el-input >>> .el-input__inner {
  text-align: left
}
.el-dialog__wrapper >>> .el-dialog .el-dialog__body {
  padding: 0 .4rem !important;
}
</style>