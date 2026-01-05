<script setup lang="ts">
import { useUserDataStore } from "@/stores/useUserData";
const store = useUserDataStore();
const isLogin = ref(false);
const username = ref("");

const getTimePeriod = (): string => {
  const now = new Date();
  const hour = now.getHours(); // 0-23
  if (hour >= 6 && hour < 12) {
    return "早上好"; // 6:00 - 11:59
  } else if (hour >= 12 && hour < 13) {
    return "中午好"; // 12:00 - 17:59
  } else if (hour >= 14 && hour < 18) {
    return "下午好"; // 14:00 - 17:59
  } else if (hour >= 18 && hour < 22) {
    return "晚上好"; // 18:00 - 21:59
  } else {
    return "深夜好"; // 22:00 - 5:59
  }
};

const StoreisLogin = computed(() => store.isLogin);
watch(StoreisLogin, (newVal) => {
  if (newVal) {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
const appConfig = useAppConfig()
const sitename = appConfig.site.sitename

onMounted(() => {
  if (localStorage.getItem("token") !== null) {
    // 如果登录了切换卡片
    isLogin.value = true;
    username.value = localStorage.getItem("Username") as string;
  }
});
</script>

<template>
  <div class="toolBox">
    <div class="defaultBox" v-if="!isLogin">
      <h1 class="headerText">{{sitename}}</h1>
      <p class="text">
        属于你的专属社区，在这里你可以找到志同道合的朋友，分享你的生活，交流你的心得，共同成长。
      </p>
      <div class="btnArea">
        <nuxt-link to="/Login">
          <el-button type="primary" class="divbtn btn-register" plain
            >立即登录</el-button
          ></nuxt-link
        >
        <nuxt-link to="/register">
          <el-button type="primary" class="divbtn btn-register" plain
            >立即注册</el-button
          ></nuxt-link
        >
      </div>
    </div>
    <div class="trueLoginBox" v-else>
      <h2>
        {{ getTimePeriod() }} <nuxt-link :to="`/space/${username}`" class="UN">{{ username }}</nuxt-link> ，
      </h2>
      <h2>欢迎回来！</h2>
      <div class="btnArea">
        <nuxt-link to="/editor">
          <el-button type="primary" class="divbtn btn-register" plain
            >撰写文章</el-button
          ></nuxt-link
        >
        <nuxt-link to="/Users">
          <el-button type="primary" class="divbtn btn-register" plain
            >个人信息</el-button
          ></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toolBox {
  min-height: 120px;
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  background: linear-gradient(135deg, #2375be 0%, #4c93ff 100%);
  color: white;
  border-radius: 5px;
  padding: 10px;
  max-height: 250px;
}
.headerText {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 10px 0;
}
.text {
  font-size: 1rem;
  font-weight: 600;
  margin: 20px 0;
  color: rgb(255 255 255 / 88%);
}
.btnArea {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px 0;
}
.UN {
  color: #FC80A3;
}
// DIV BTN
.divbtn {
  width: 90px;
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #5291d1;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
}
.btn-register {
  background: linear-gradient(135deg, #9dcdf7 0%, #4c93ff 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(67, 97, 238, 0.4);
}

.btn-register:active {
  transform: translateY(0);
}

.btn-register.loading {
  position: relative;
  color: transparent;
}

.btn-register.loading::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
h2 {
  font-size: 2rem;
}
</style>
