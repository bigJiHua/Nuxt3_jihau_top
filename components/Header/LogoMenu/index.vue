<script setup lang="ts">
/* 
* 这是一个关键性的组件 
* 用于判断用户登录状态
* 用户信息的请求获取
*/
import { useUserDataStore } from "@/stores/useUserData"
import GetUserDataApi from '@/api/User'
import { useRouter } from 'vue-router'
// import { Menu } from '@element-plus/icons-vue'
const store = useUserDataStore()
const router = useRouter()
const isLogin = ref(false)
const userData: any = reactive(store.Userdata.Users)
const LoginOut = () => {
  if (process.client) {
    localStorage.removeItem('token')
    localStorage.removeItem('Username')
    localStorage.removeItem('Useridentity')
    localStorage.removeItem('UserData')
    store.setUserData([])
    location.reload()
  }
}
const getUserData = async () => {
  if (localStorage.getItem('Username') !== null) {
    const { data: res } = await GetUserDataApi.GetUserData()
    store.setUserData(res.data)
  }
}

onMounted(() => {
  if (process.client) {
    isLogin.value = localStorage.getItem('token') ? true : false;
  }
  if (!userData.username && !store.Userdata.Users.username) {
    getUserData()
  }
  setInterval(() => {
    if (router.currentRoute.value.path === '/Login' && store.Userdata.Users.username) {
      getUserData()
    }
  }, 1000)
})
</script>

<template>
  <client-only v-if="isLogin">
    <el-dropdown trigger="click">
      <img :src="store.Userdata.Users.user_pic" alt="Logo" class="userLogo">
      <template #dropdown>
        <el-dropdown-menu>
          <nuxt-link to="/Users">
            <el-dropdown-item>我的</el-dropdown-item>
          </nuxt-link>
          <nuxt-link to="/editor">
            <el-dropdown-item>发布文章</el-dropdown-item>
          </nuxt-link>
          <nuxt-link :to="'/space/' + store.Userdata.Users.username">
            <el-dropdown-item>空间</el-dropdown-item>
          </nuxt-link>
          <el-dropdown-item>
            <el-button type="primary" plain v-if="isLogin" @click="LoginOut">注销</el-button>
            <nuxt-link to="/Login" v-else><el-button type="primary" plain>登录</el-button></nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </client-only>
</template>

<style lang="less" scoped>
.userLogo {
  width: 30px;
  height: 30px;
}
</style>
