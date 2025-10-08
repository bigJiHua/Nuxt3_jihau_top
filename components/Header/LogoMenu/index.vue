<script setup lang="ts">
import { useUserDataStore } from '@/stores/useUserData'
import GetUserDataApi from '@/api/User'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const store = useUserDataStore()
const router = useRouter()

// 响应式登录状态
const isLogin = computed(() => store.isLogin)
const userData = computed(() => store.Userdata.Users)

// 注销操作
const LoginOut = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('Username')
  localStorage.removeItem('Useridentity')
  localStorage.removeItem('UserData')
  store.setUserData([]) // 清空用户信息

  const routerPath = router.currentRoute.value.path
  if (/^\/(Users|my|editor)/.test(routerPath)) {
    void router.push('/')
  }
}

// 获取用户数据
const getUserData = async (): Promise<void> => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const { data: res } = await GetUserDataApi.GetUserData()
    localStorage.setItem('Username', res.data.Users.username)
    localStorage.setItem('Useridentity', res.data.Users.useridentity)
    store.setUserData(res.data)
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
}

// 组件挂载时请求用户数据
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) void getUserData()
})
</script>

<template>
  <client-only>
    <el-dropdown trigger="click" v-if="isLogin">
      <img
        alt="用户头像"
        :src="userData.user_pic || '/default-avatar.png'"
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
            <el-button type="primary" plain @click="LoginOut">注销</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <nuxt-link v-else to="/Login" class="phone-none">
      <el-button type="primary" plain>登录</el-button>
    </nuxt-link>
  </client-only>
</template>

<style lang="less" scoped>
.userLogo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
