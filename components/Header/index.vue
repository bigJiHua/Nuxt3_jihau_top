<script setup lang="ts">
import { Menu } from '@element-plus/icons-vue'
const isLogin = ref(false)
const drawer = ref(false)
onMounted(() => {
  if (process.client) {
    isLogin.value = localStorage.getItem('token') ? true : false;
  }
})
</script>

<template>
  <el-affix :offset="0">
    <div class="phone-none Header flex content mx-auto my-auto flex items-center overflow-hidden bg-gray-200">
      <client-only>
        <el-menu class="el-menu-demo mx-auto bg-gray-200 menu-container" mode="horizontal">
          <el-menu-item>
            <div class="HeaderLeft flex items-center">
              <h1 class="HeaderTitle coker">JiHua的web和js开发数据</h1>
              <img src="https://jihau.top/img/logo.png" alt="Logo" class="h-9 w-12">
            </div>
          </el-menu-item>
          <el-menu-item>
            <el-menu-item>
              <router-link to="/Notify">通知</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/DevProcess">发展历程</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/SpsList">友链</router-link>
            </el-menu-item>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>更多</template>
            <el-menu-item>
              <router-link to="/checkver">激活账户</router-link>
            </el-menu-item>
            <el-menu-item><a href="https://www.jihau.com">主站博客页面</a></el-menu-item>
            <el-menu-item>
              <router-link to="/page/YSZC">隐私政策</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/html/goods/10010.html">物品寻求页面</router-link>
            </el-menu-item>
            <el-menu-item><a href="https://jihau.com/POP/">测试</a></el-menu-item>
          </el-sub-menu>
        </el-menu>
      </client-only>
      <div class="float-right">
        <el-button type="primary" plain v-if="isLogin">注销</el-button>
        <el-button type="primary" plain v-else>登录</el-button>
      </div>
    </div>
    <div class="window-none Header flex content mx-auto my-auto flex items-center overflow-hidden bg-gray-200">
      <div class="flex justify-between items-center w-96">
        <div class="HeaderLeft flex items-center">
          <h1 class="HeaderTitle coker">JiHua的web和js开发数据</h1>
          <img src="https://jihau.top/img/logo.png" alt="Logo" class="h-8 w-10">
        </div>
        <el-button :icon="Menu" style="margin-left: 16px" @click="drawer = true"></el-button>
      </div>
      <client-only>
        <el-drawer v-model="drawer" :with-header="false" size="70vw" style="padding: 0;">
          <template #default>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/Notify" class="text-x2">通知</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/DevProcess" class="text-x2">发展历程</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/SpsList" class="text-x2">友链</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/checkver" class="text-x2 ">激活账户</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <a href="https://www.jihau.com" class="text-x2 ">主站博客页面</a>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/page/YSZC" class="text-x2 ">隐私政策</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <router-link to="/html/goods/10010.html" class="text-x2">物品寻求页面</router-link>
            </div>
            <div class="items-center bg-slate-100 p-2">
              <a href="https://jihau.com/POP/" class="text-x2">测试</a>
            </div>
            <div class="bg-slate-100 p-2">
              <el-button type="primary" plain v-if="isLogin">注销</el-button>
              <el-button type="primary" plain v-else>登录</el-button>
            </div>
          </template>
        </el-drawer>
      </client-only>
    </div>
  </el-affix>
</template>

<style lang="less" scoped>
.Header {
  height: 50px;
  width: 95vw;
  border-radius: 5px;
  padding: 5px;
}

.HeaderTitle {
  font-size: 2rem;
  font-weight: 100;
  color: rgb(84, 80, 80);
}

.menu-container {
  width: 95vw !important;
  height: 100%;
  align-items: center;
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

@media screen and (max-width: 768px) {
  .HeaderTitle {
    font-size: 1.5rem;
    font-weight: 400;
  }
}
</style>
