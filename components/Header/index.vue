<script setup lang="ts">
import { Menu } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import GetUserData from '@/api/User'
import { useUserDataStore } from "@/stores/useUserData"
import { Search } from '@element-plus/icons-vue'
const isLogin = ref(false)
const drawer = ref(false)
const store = useUserDataStore()
const isSHow = ref(false)
const userData: any = reactive(store.Userdata.Users)
const key: any = ref('')
const router = useRouter()
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
const SearchFunc = () => {
  router.push('/Search/' + key.value)
  if (isSHow) {
    drawer.value = false
  }
  key.value = ''
}
onMounted(() => {
  if (process.client) {
    isLogin.value = localStorage.getItem('token') ? true : false;
    if (window.innerWidth > 756) {
      isSHow.value = true
    }
    window.onresize = () => {
      if (window.innerWidth > 756) {
        isSHow.value = true
        // 暂时取消
        // location.reload()
      }
    }
  }
  if (!userData.username && !store.Userdata.Users.username) {
    getUserData()
  }
})
</script>

<template>
  <div id="HeaderBox">
    <div class="Header" v-if="isSHow">
      <client-only>
        <el-menu class="el-menu-demo menu-container" mode="horizontal">
          <el-menu-item class="HeaderLeft">
            <h1 class="HeaderTitle coker"><nuxt-link to="/">JiHua的web和js开发数据</nuxt-link></h1>
            <img src="https://jihau.top/img/logo.png" alt="Logo" class="logo">
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="/Notify">通知</NuxtLink>
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="/DevProcess">发展历程</NuxtLink>
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="/SpsList">友链</NuxtLink>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>更多</template>
            <el-menu-item>
              <NuxtLink to="/checkver">激活账户</NuxtLink>
            </el-menu-item>
            <el-menu-item><a href="https://www.jihau.com">主站博客页面</a></el-menu-item>
            <el-menu-item>
              <NuxtLink to="/page/YSZC">隐私政策</NuxtLink>
            </el-menu-item>
            <el-menu-item>
              <NuxtLink to="/html/goods/10010.html">物品寻求页面</NuxtLink>
            </el-menu-item>
            <el-menu-item>
              <NuxtLink to="/error/type-phone">错误页面测试-phone</NuxtLink>
            </el-menu-item>
            <el-menu-item>
              <NuxtLink to="/error/type-window">错误页面测试-Windows</NuxtLink>
            </el-menu-item>
            <el-menu-item><a href="https://jihau.com/POP/">测试</a></el-menu-item>
          </el-sub-menu>
        </el-menu>
      </client-only>
      <div class="LoginBtn">
        <div class="SearchBox">
          <el-input v-model="key" placeholder="搜搜搜~" class="input-with-select">
            <template #append>
              <el-button :icon="Search" @click="SearchFunc" />
            </template>
          </el-input>
        </div>
        <div class="User" v-if="store.Userdata.Users.user_pic != ''">
          <NuxtLink to="/CtrlView"><img :src="store.Userdata.Users.user_pic" alt="Logo" class="userLogo"></NuxtLink>
          <NuxtLink to="/CtrlView"><span class="Username">{{ store.Userdata.Users.username }}</span></NuxtLink>
        </div>
        <div class="Loginbox">
          <el-button type="primary" plain v-if="isLogin" @click="LoginOut">注销</el-button>
          <nuxt-link to="/Login" v-else><el-button type="primary" plain>登录</el-button></nuxt-link>
        </div>
      </div>
    </div>
    <div class="Header " v-else>
      <div class="HeaderLeft">
        <div style="display: flex;">
          <h1 class="HeaderTitle coker"><nuxt-link to="/">JiHua的web和js开发数据</nuxt-link></h1>
          <img src="https://jihau.top/img/logo.png" alt="Logo" class="logo">
        </div>
        <el-button :icon="Menu" style="margin-left: 16px" @click="drawer = true"></el-button>
      </div>
      <!-- 抽屉面板 -->
      <client-only>
        <el-drawer v-model="drawer" :with-header="false" :append-to-body="true" size="70vw" style="padding: 0;">
          <template #default>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/Notify" class="text-x2">通知</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/DevProcess" class="text-x2">发展历程</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/SpsList" class="text-x2">友链</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/checkver" class="text-x2 ">激活账户</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <a href="https://www.jihau.com" class="text-x2 ">主站博客页面</a>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/page/YSZC" class="text-x2 ">隐私政策</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/html/goods/10010.html" class="text-x2">物品寻求页面</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/error/type-phone">错误页面测试-phone</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <NuxtLink to="/error/type-window">错误页面测试-Windows</NuxtLink>
            </div>
            <div class="MenuItem" @click="drawer = false">
              <a href="https://jihau.com/POP/" class="text-x2">测试</a>
            </div>
            <div class="MenuItem">
              <div class="SearchBox">
                <el-input v-model="key" placeholder="搜搜搜~" class="input-with-select">
                  <template #append>
                    <el-button :icon="Search" @click="SearchFunc" />
                  </template>
                </el-input>
              </div>
            </div>
            <div class="LoginBtn">
              <div class="User" v-if="store.Userdata.Users.username != ''">
                <NuxtLink to="/CtrlView"><img :src="store.Userdata.Users.user_pic" alt="Logo" class="userLogo"></NuxtLink>
                <NuxtLink to="/CtrlView"><span class="Username">{{ store.Userdata.Users.username }}</span></NuxtLink>
              </div>
              <div class="Loginbox">
                <el-button type="primary" plain v-if="isLogin" @click="LoginOut">注销</el-button>
                <nuxt-link to="/Login" v-else><el-button type="primary" plain>登录</el-button></nuxt-link>
              </div>
            </div>
          </template>
        </el-drawer>
      </client-only>
    </div>
  </div>
</template>

<style lang="less" scoped>
#HeaderBox {
  width: 100vw;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 999;
}

a {
  text-decoration: none;
  color: gray;
}

.logo {
  width: 45px;
  height: 35px;
}

.Header {
  height: 40px;
  width: 85vw;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  margin: 0 auto;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 5px 5px;
}

.HeaderTitle {
  font-size: 2rem;
  font-weight: 100;
  color: rgb(141, 141, 141);
}

.HeaderLeft {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.menu-container {
  height: 50px;
  width: 60vw;
  align-items: center;
  --tw-bg-opacity: 1;
  // background-color: rgb(229 231 235 / var(--tw-bg-opacity));
  background-color: rgba(244, 244, 244, 0);
  border: 0;
}

.MenuItem {
  padding: 5px;
  border-radius: 5px;
  background-color: #f9fafb;
  margin: 5px;
}

.MenuItem:hover {
  background-color: #f9fafbe5;
}

.LoginBtn {
  float: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.SearchBox {
  margin-right: 10px;
}

.User {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  >a>.userLogo {
    width: 30px;
    height: 30px;
  }
}

@media screen and (max-width: 768px) {
  .HeaderTitle {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .HeaderLeft {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .Header {
    width: 95vw;
  }

  .LoginBtn {
    margin-top: 20px;
    width: 100%;
  }

}
</style>
