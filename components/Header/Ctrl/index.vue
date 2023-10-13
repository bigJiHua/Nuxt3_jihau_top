<script setup lang="ts">
import { Menu } from '@element-plus/icons-vue'
import { useUserDataStore } from "@/stores/useUserData"
import { useRouter } from '#vue-router';
const router = useRouter()
const drawer = ref(false)
const store = useUserDataStore()
const isSHow = ref(false)
onMounted(() => {
  if (process.client) {
    if (window.innerWidth > 756) {
      isSHow.value = true
    }
    window.onresize = () => {
      if (window.innerWidth > 756) {
        isSHow.value = true
      }
    }
  }
})
</script>

<template>
  <div id="HeaderBox">
    <div class="Header" v-if="isSHow">
      <client-only>
        <el-menu class="el-menu-demo menu-container" mode="horizontal">
          <el-menu-item class="HeaderLeft">
            <h1 class="HeaderTitle coker">作者管理面板</h1>
          </el-menu-item>
        </el-menu>
      </client-only>
    </div>
    <div class="Header " v-else>
      <div class="HeaderLeft">
        <div style="display: flex;">
          <h1 class="HeaderTitle coker"><nuxt-link to="/">作者管理面板</nuxt-link></h1>
          <img src="https://jihau.top/img/logo.png" alt="Logo" class="logo">
        </div>
        <el-button :icon="Menu" style="margin-left: 16px" @click="drawer = true"></el-button>
      </div>
      <!-- 抽屉面板 -->
      <client-only>
        <el-drawer v-model="drawer" :with-header="false" :append-to-body="true" size="70vw" style="padding: 0;">
          <template #default>
            <div class="MenuItem">
              <NuxtLink to="/CtrlView/users" class="text-x2">个人信息</NuxtLink>
            </div>
            <div class="MenuItem">
              <NuxtLink to="/CtrlView/ArticleIndex" class="text-x2">文章管理</NuxtLink>
            </div>
            <div class="MenuItem">
              <NuxtLink to="/CtrlView/Collection" class="text-x2">我的消息</NuxtLink>
            </div>
            <div class="MenuItem">
              <NuxtLink to="/CtrlView/Setting" class="text-x2 ">系统设置</NuxtLink>
            </div>
            <div class="MenuItem">
              <NuxtLink to="/" class="text-x2 ">主页</NuxtLink>
            </div>
            <div class="LoginBtn">
              <el-button type="primary" plain v-if="isLogin" @click="LoginOut">注销</el-button>
              <nuxt-link to="/Login" v-else><el-button type="primary" plain>登录</el-button></nuxt-link>
            </div>
          </template>
        </el-drawer>
      </client-only>
    </div>
  </div>
</template>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: gray;
}

.logo {
  width: 45px;
  height: 35px;
}

.Header {
  padding: 5px 20px;
  display: flex;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
    padding: 0;
  }

}
</style>
