<script setup lang="ts">
/* 
* 这是一个关键性的组件 
* 用于判断用户登录状态
* 用户信息的请求获取
*/
import { useUserDataStore } from "@/stores/useUserData"
import GetUserData from '@/api/User'
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
    const { data: res } = await GetUserData.GetUserData()
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
})
</script>

<template>
  <client-only>
    <el-dropdown trigger="click">
      <img :src="store.Userdata.Users.user_pic" alt="Logo" class="userLogo">
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <nuxt-link to="/CtrlView/Users">个人设置</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/CtrlView/Article">文章</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/CtrlView/Collection">我的</nuxt-link>
          </el-dropdown-item>
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
