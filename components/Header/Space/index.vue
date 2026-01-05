<script setup lang="ts">
import { Search, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const props = defineProps({
  user: {
    type: String,
    default: () => "",
  },
  istop: {
    type: Boolean,
    default: () => false,
  },
  isSelf: {
    type: Boolean,
    default: () => false,
  },
});
const router = useRouter();
const key: any = ref("");
const isLogin = ref(false);
const isHerePath: Ref<number> = ref(0);
const UserTab = ref([
  // { path: `/space/${props.user}/index`, name: '动态', id : 0 },
  { path: `/space/${props.user}/article`, name: "文章", id: 1 },
  { path: `/space/${props.user}/like`, name: "喜欢", id: 2 },
  { path: `/space/${props.user}/collect`, name: "收藏", id: 3 },
  { path: `/space/${props.user}/follow`, name: "关注", id: 4 },
  { path: `/space/${props.user}/fans`, name: "粉丝", id: 5 },
]);
const appConfig = useAppConfig();
const MenuItem = appConfig.site.menu;
const sitename = appConfig.site.sitename;

// 手动跳转
const toTap = (path: string, index: number): void => {
  const routerPath = path.match(/\/([^/]+)$/);
  if (routerPath[1] === "index") {
    path = path.replace(/\/index$/, "");
  }
  isHerePath.value = index;
  void router.replace(path);
  setTimeout(() => {
    window.moveTo(0, 300);
  }, 200);
};
const SearchFunc = (): void => {
  void router.push("/Search/" + key.value);
  key.value = "";
};
onMounted(() => {
  if (process.client ?? false) {
    isLogin.value = localStorage.getItem("token") !== null;
  }
  watch(
    () => router.currentRoute.value.path,
    (newPath) => {
      const path = newPath.match(/\/([^/]+)$/);
      switch (path?.[1]) {
        case "index":
          isHerePath.value = 0;
          break;
        case "article":
          isHerePath.value = 1;
          break;
        case "like":
          isHerePath.value = 2;
          break;
        case "collect":
          isHerePath.value = 3;
          break;
        case "follow":
          isHerePath.value = 4;
          break;
        case "fans":
          isHerePath.value = 5;
          break;
        default:
          isHerePath.value = 0;
      }
    },
    { immediate: true },
  );
});
</script>

<template>
  <div id="SpaceHeader">
    <div class="Header">
      <div class="trsBox">
        <!-- 正常菜单 -->
        <div :class="[{ isRotX: !istop, noRotX: istop }, 'Headermenu']">
          <!-- <img
        :src="icon.LogoPic"
        alt="Logo"
        class="logo"
        style="width: 35px; height: 25px"
      /> -->
          <h1 class="HeaderTitle">
            <a href="/">{{ sitename }}</a>
          </h1>
          <div class="items">
            <span v-for="(item, index) in MenuItem" :key="index" class="MenuItem">
              <NuxtLink :to="item.path" class="text-x2">{{ item.text }}</NuxtLink>
            </span>
          </div>
        </div>
        <!-- 翻转菜单 -->
        <div :class="[{ isRotX: istop, noRotX: !istop }, 'HeaderTab']">
          <div class="tabLIst">
            <div
              :class="[{ selectItem: isHerePath === item.id }, 'menuItem']"
              v-for="(item, index) in UserTab"
              :key="index"
              @click="toTap(item.path, index)"
            >
              <span class="TabPath">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
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
  font-size: 1.2rem;
  font-weight: 400;
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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
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
  padding: 10px;
  width: 50px;
  text-align: center;
}
.menuItem:hover {
  background-color: #f5f5f5;
  cursor: pointer;
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
.Headermenu {
  height: 100%;
  display: flex;
  align-items: center;
}
.items {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.MenuItem {
  font-size: 0.8rem;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.MenuItem:hover {
  border-bottom: 2px solid rgb(116, 181, 255);
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
