<script setup lang="ts">
import { Menu, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const key: any = ref('')
const drawer = ref(false)
const innerDrawer = ref(false)
const isLogin = ref(false)

const CtrlMenuItem = reactive([
  { path: '/Users', text: '个人设置' },
  { path: '/editor/list', text: '我的文章' },
  { path: '/editor', text: '发布文章' },
  { path: '/editor/wait', text: '草稿箱' },
  { path: '/editor/gallery', text: '图片资源' },
  { path: '/Users/msg', text: '我的消息' },
  { path: '/editor/cag', text: '修改文章' },
  // { path: '/Users/Setting', text: '个性设置' },
])
const SearchFunc = (): void => {
  void router.push('/Search/' + key.value)
  key.value = ''
  drawer.value = false
}
onMounted(() => {
  if (process.client ?? false) {
    isLogin.value = localStorage.getItem('token') !== null
  }
})
</script>

<template>
  <div class="Header">
    <div class="HeaderLeft">
      <div>
        <h1 class="HeaderTitle">
          <a href="/">JiHua的web和js开发数据</a>
        </h1>
      </div>
      <div class="RightMenu">
        <el-button :icon="Menu" @click="drawer = true"></el-button>
        <HeaderLogoMenu></HeaderLogoMenu>
      </div>
    </div>
    <client-only>
      <el-drawer
        v-model="drawer"
        :with-header="false"
        :append-to-body="true"
        size="70vw"
        style="padding: 0"
      >
        <div class="defalutMenu">
          <div
            class="MenuItem"
            v-for="(item, index) in reqConfig.MenuItem"
            :key="index"
            @click="drawer = false"
          >
            <NuxtLink :to="item.path" class="text-x2">{{ item.text }}</NuxtLink>
          </div>
          <div class="MenuItem">
            <div class="SearchBox">
              <el-input
                v-model="key"
                placeholder="搜搜搜~"
                class="input-with-select"
              >
                <template #append>
                  <el-button :icon="Search" @click="SearchFunc" />
                </template>
              </el-input>
            </div>
          </div>
          <div class="LoginBtn" v-if="!isLogin">
            <nuxt-link to="/Login"
              ><el-button type="primary" plain @click="drawer = false"
                >登录</el-button
              ></nuxt-link
            >
          </div>
          <div class="MenuItem" v-if="isLogin">
            <el-button type="primary" plain @click="innerDrawer = true"
              >后台菜单</el-button
            >
          </div>
        </div>
        <div v-if="isLogin">
          <client-only>
            <el-drawer
              v-model="innerDrawer"
              :with-header="false"
              :append-to-body="true"
              size="50vw"
              style="padding: 0"
            >
              <div
                class="MenuItem"
                v-for="(item, index) in CtrlMenuItem"
                :key="index"
                @click=";(innerDrawer = false), (drawer = false)"
              >
                <NuxtLink :to="item.path" class="text-x2">{{
                  item.text
                }}</NuxtLink>
              </div>
            </el-drawer>
          </client-only>
        </div>
      </el-drawer>
    </client-only>
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
  width: 95vw;
  padding: 5px;
  display: flex;
  margin: 0 auto;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 5px 5px;
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
.LoginBtn {
  margin-top: 20px;
  width: 100%;
}

.RightMenu {
  display: flex;
  align-items: center;
  margin: 5px;

  > button {
    margin: 0 10px 0 0;
  }
}
</style>
