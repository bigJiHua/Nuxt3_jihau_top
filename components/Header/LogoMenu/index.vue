<script setup lang="ts">
/*
 * 这是一个关键性的组件
 * 用于判断用户登录状态
 * 用户信息的请求获取
 */
import { useUserDataStore } from '@/stores/useUserData'
import GetUserDataApi from '@/api/User'
import { useRouter } from 'vue-router'
// import { Menu } from '@element-plus/icons-vue'
const store = useUserDataStore()
const router = useRouter()
const isLogin = ref(false)
const userData: any = ref(store.Userdata.Users)
const LoginOut = (): void => {
  isLogin.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('Username')
  localStorage.removeItem('Useridentity')
  localStorage.removeItem('UserData')
  store.setUserData([])
  userData.value = []
  const routerPath = router.currentRoute.value.path
  if (
    routerPath.match(/^\/(Users|my|editor)\//) != null ||
    Boolean(routerPath.match(/^\/(Users|my|editor)/))
  ) {
    void router.push('/')
  }
}
// 获取用户数据
const getUserData = async (): Promise<void> => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    const { data: res } = await GetUserDataApi.GetUserData()
    localStorage.setItem('Username', res.data.Users.username)
    localStorage.setItem('Useridentity', res.data.Users.useridentity)
    store.setUserData(res.data)
  }
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (process.client) {
    isLogin.value =
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== 'undefined'
  }
  if (isLogin.value && userData !== undefined) {
    void getUserData()
  }
  // 忘记是干嘛的了 标记一下
  setInterval(() => {
    try {
      if (store.Userdata.Users.username !== '') {
        isLogin.value = true
      }
    } catch (error) {
      isLogin.value = false
    }
  }, 1000)
})
</script>

<template>
  <client-only>
    <el-dropdown trigger="click" v-if="isLogin">
      <img
        alt="用户头像"
        v-if="isLogin"
        :src="store.Userdata.Users.user_pic"
        class="userLogo"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <nuxt-link to="/editor/list">
            <el-dropdown-item>我的文章</el-dropdown-item>
          </nuxt-link>
          <nuxt-link to="/Users">
            <el-dropdown-item>个人设置</el-dropdown-item>
          </nuxt-link>
          <nuxt-link to="/editor">
            <el-dropdown-item>发布文章</el-dropdown-item>
          </nuxt-link>
          <el-dropdown-item>
            <el-button type="primary" plain v-show="isLogin" @click="LoginOut"
              >注销</el-button
            >
            <nuxt-link to="/Login" v-show="!isLogin"
              ><el-button type="primary" plain>登录</el-button></nuxt-link
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <nuxt-link to="/Login" v-else class="phone-none"
      ><el-button type="primary" plain>登录</el-button></nuxt-link
    >
  </client-only>
</template>

<style lang="less" scoped>
.userLogo {
  width: 30px;
  height: 30px;
}
</style>
