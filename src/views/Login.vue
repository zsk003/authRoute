<template>
  <div id="login">
    <h1>登录</h1>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: "Login",
  methods: {
    login() {
      // 调接口，返回用户路由权限
      window.sessionStorage.setItem('token', '123')
      window.sessionStorage.setItem('authRoutes', '[1, 10,11, 12,121,122, 3,31, 32]')
      // window.sessionStorage.setItem('authRoutes', '[1, 10,11, 12,122,3,31]')

      store.dispatch('auth/addAuthRoutes').then(nextRouter => {
        if (!nextRouter) return this.$message.warning('暂无权限进入')
        console.log(nextRouter);
        this.$router.push(nextRouter)
      })
    }
  }
}
</script>

<style scoped>
#login {
  background-color: #fff;
}
</style>
