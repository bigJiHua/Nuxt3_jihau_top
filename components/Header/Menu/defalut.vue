<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const key: any = ref('')
const SearchFunc = () => {
  router.push('/Search/' + key.value)
  key.value = ''
}
const MenuItem = reactive([
  { path: '/Notify', text: '通知' },
  { path: '/DevProcess', text: '发展历程' },
  { path: '/SpsList', text: '友链' },
  { path: '/checkver', text: '激活账户' },
  { path: 'https://www.jihau.com', text: '主站博客页面' },
  { path: '/page/YSZC', text: '隐私政策' },
  { path: '/html/goods/10010.html', text: '物品寻求页面' },
  { path: '/error/type-phone', text: '错误页面测试-phone' },
  { path: '/error/type-window', text: '错误页面测试-Windows' },
])
const isLogin = ref(false)
onMounted(() => {
  if (process.client) {
    isLogin.value = localStorage.getItem('token') ? true : false;
  }
})
</script>

<template>
  <div class="Header">
    <client-only>
      <el-menu class="el-menu-demo menu-container" mode="horizontal">
        <el-menu-item class="HeaderLeft">
          <h1 class="HeaderTitle coker"><nuxt-link to="/">JiHua的web和js开发数据</nuxt-link></h1>
          <img src="https://jihau.top/img/logo.png" alt="Logo" class="logo">
        </el-menu-item>
        <el-menu-item v-for="(item, index) in MenuItem" :key="index">
          <NuxtLink :to="item.path" class="text-x2">{{ item.text }}</NuxtLink>
        </el-menu-item>
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
      <div class="User">
        <HeaderLogoMenu></HeaderLogoMenu>
        <div class="User" v-if="!isLogin">
          <nuxt-link to="/Login"><el-button type="primary" plain>登录</el-button></nuxt-link>
        </div>
      </div>
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

  .RightMenu {
    display: flex;
    align-items: center;
    margin: 5px;

    >button {
      margin: 0 10px 0 0;
    }
  }

}
</style>

