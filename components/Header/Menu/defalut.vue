<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const key: any = ref("");
const SearchFunc = (): void => {
  void router.push("/Search/" + key.value);
  key.value = "";
};
const appConfig = useAppConfig();
const MenuItem = appConfig.site.menu;
const sitename = appConfig.site.sitename;
</script>

<template>
  <div class="Header">
    <div class="HeaderLeft">
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
    <div class="LoginBtn">
      <div class="SearchBox">
        <el-input v-model="key" placeholder="搜搜搜~" class="input-with-select">
          <template #append>
            <el-button :icon="Search" @click="SearchFunc" />
          </template>
        </el-input>
      </div>
      <div class="User">
        <client-only>
          <HeaderLogoMenu></HeaderLogoMenu>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: gray;
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
  font-weight: 500;
  color: rgb(141, 141, 141);
}

.HeaderLeft {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
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
@media screen and (min-width: 755px) and (max-width: 1000px) {
  .MenuItem {
    display: none;
  }
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
</style>
