<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  user: {
    type: String,
    default: () => ''
  },
  istop: {
    type: Boolean,
    default: () => false
  },
  isSelf: {
    type: Boolean,
    default: () => false
  },
})
const router = useRouter()
const key: any = ref('')
const isLogin = ref(false)
const isHerePath: Ref<number> = ref(0)
const MenuItem = reactive([
  { path: '/Notify', text: '通知' },
  { path: '/DevProcess', text: '发展历程' },
  { path: '/SpsList', text: '友链' },
  { path: '/checkver', text: '激活账户' },
  { path: 'https://www.jihau.com', text: '主站博客页面' },
  { path: '/notify/YSZC', text: '隐私政策' },
  { path: '/html/goods/10010.html', text: '物品寻求页面' },
  { path: '/error/type-phone', text: '错误页面测试-phone' },
  { path: '/error/type-window', text: '错误页面测试-Windows' },
])
const UserTab = ref([
  // { path: `/space/${props.user}/index`, name: '动态' },
  { path: `/space/${props.user}/article`, name: '文章' },
  { path: `/space/${props.user}/like`, name: '喜欢' },
  { path: `/space/${props.user}/collect`, name: '收藏' },
  { path: `/space/${props.user}/follow`, name: '关注' },
  { path: `/space/${props.user}/fans`, name: '粉丝' },
])
// 手动跳转
const toTap = (path: string, index: number): void => {
  const routerPath = path.match(/\/([^/]+)$/)
  if (routerPath[1] === 'index') {
    path = path.replace(/\/index$/, '')
  }
  isHerePath.value = index
  void router.replace(path)
  setTimeout(() => {
    window.moveTo(0, 300)
  }, 200)
}
const SearchFunc = (): void => {
  void router.push('/Search/' + key.value)
  key.value = ''
}
onMounted(() => {
  if (process.client ?? false) {
    isLogin.value = localStorage.getItem('token') !== null
  }
  setInterval(() => {
    const path: any = router.currentRoute.value.path.match(/\/([^/]+)$/)
    switch (path[1]) {
      case 'index':
        isHerePath.value = 0
        break
      case 'article':
        isHerePath.value = 1
        break
      case 'like':
        isHerePath.value = 2
        break
      case 'collect':
        isHerePath.value = 3
        break
      case 'follow':
        isHerePath.value = 4
        break
      case 'fans':
        isHerePath.value = 5
        break
      default:
        isHerePath.value = 0
    }
  }, 500)
})
</script>

<template>
  <div id="SpaceHeader">
    <div class="Header">
      <div class="trsBox">
        <div :class="[{ isRotX: !istop, noRotX: istop }, 'Headermenu']">
          <client-only>
            <el-menu class="el-menu-demo menu-container" mode="horizontal">
              <el-menu-item class="HeaderLeft">
                <h1 class="HeaderTitle coker">
                  <nuxt-link to="/">JiHua的web和js开发数据</nuxt-link>
                </h1>
                <img
                  src="https://jihau.top/img/logo.png"
                  alt="Logo"
                  class="logo"
                />
              </el-menu-item>
              <el-menu-item v-for="(item, index) in MenuItem" :key="index">
                <NuxtLink :to="item.path" class="text-x2">{{
                  item.text
                }}</NuxtLink>
              </el-menu-item>
            </el-menu>
          </client-only>
        </div>
        <div :class="[{ isRotX: istop, noRotX: !istop }, 'HeaderTab']">
          <div class="tabLIst">
            <img src="https://jihau.top/img/logo.png" alt="Logo" class="logo" />
            <div
              :class="[{ selectItem: isHerePath === index + 1 }, 'menuItem']"
              v-for="(item, index) in UserTab"
              :key="index"
              @click="toTap(item.path, index)"
            >
              <span class="TabPath">{{ item.name }}</span>
            </div>
          </div>
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
          <el-button
            class="followBtn"
            v-if="istop && !isSelf"
            type="primary"
            plain
            :bg="false"
          >
            <el-icon>
              <Plus />
            </el-icon>
            &nbsp;关注ta
          </el-button>
          <nuxt-link class="EditUserData" to="/Users" v-if="istop && isSelf">
            <el-button class="followBtn" type="primary" plain
              >编辑个人资料
            </el-button></nuxt-link
          >
        </div>
      </div>
      <div class="LoginBtn">
        <div class="SearchBox" v-if="!istop">
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
        <div class="User">
          <HeaderLogoMenu></HeaderLogoMenu>
          <div class="User" v-if="!isLogin">
            <nuxt-link to="/Login"
              ><el-button type="primary" plain>登录</el-button></nuxt-link
            >
          </div>
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
@media only screen and (max-width: 755px) {
  #SpaceHeader {
    display: none;
  }
}
#SpaceHeader {
  width: 100vw;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 999;
}
.logo {
  width: 45px;
  height: 35px;
}
.logo:nth-child(1) {
  margin: 0 30px 0 0;
}
.Header {
  height: 40px;
  width: 85vw;
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
.tabLIst {
  display: flex;
}
.HeaderTab {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  width: 100%;
}
.menuItem {
  margin: 10px;
}
.selectItem {
  padding-bottom: 5px;
  border-bottom: 2.5px #6ba2f4 solid;
}
.TabPath {
  font-size: 1rem;
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
.trsBox {
  height: 50px;
  width: 85%;
  margin: 0;
  padding: 0;
  position: relative;
  perspective: 1000px; /* 视距，影响翻转效果的视觉效果 */
}

.Headermenu,
.HeaderTab {
  position: absolute;
  transition: transform 0.2s; /* 添加过渡效果 */
}

.HeaderTab {
  transform: rotateX(180deg); /* 初始时反转180度，使其在背面 */
}

.isRotX {
  transform: rotateX(0deg); /* 鼠标悬停时翻转回来 */
}

.noRotX {
  transform: rotateX(90deg); /* 鼠标悬停时翻转回来 */
}
</style>
