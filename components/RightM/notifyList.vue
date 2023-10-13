<script setup lang="ts">
import getNotifyAPI from '@/api/Article'
import { Notification } from '@element-plus/icons-vue'
const notifyList: any = ref([])
const getNotifyData = async () => {
  const { data: res } = await getNotifyAPI.getNotifyList()
  notifyList.value = res.data
}
onMounted(() => {
  if (notifyList.value.length === 0) getNotifyData()
})
</script>

<template>
  <div class="ararc">
    <p class="ararc_title Cookie">
      <nuxt-link to="/Notify">通知</nuxt-link>
    </p>
    <div class="notifyArea">
      <el-icon class="NotifyIcon">
        <Notification />
      </el-icon>
      <el-carousel height="25px" pause-on-hover class="Noticelist" :interval="5000" direction="vertical" hide-scrollbar>
        <el-carousel-item v-for="(data, index) in notifyList" :key="index">
          <nuxt-link :to="'/Notify/' + data.notify_id">{{ data.title }}</nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ararc {
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  border-radius: 5px;
  padding: 10px;
  overflow: scroll;
}

.ararc_title {
  text-align: center;
  font-size: 2rem;
  font-weight: bolder;
  font-family: 'songti';

  >a {
    color: black;
  }
}

.ararc_list {
  margin-top: 10px;
  background-color: rgb(231 243 255 / 60%);
  border-radius: 11px;
  padding: 0 10px;
  overflow: scroll;
}

.ararc_list::-webkit-scrollbar {
  display: none;
}

.ararc::-webkit-scrollbar {
  display: none;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.Noticelist {
  width: 100%;
}

.NotifyIcon {
  font-size: 1.5rem;
  margin-right: 5px;
}

.notifyArea {
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  padding: 5px;
  justify-content: center;
  background-color: #FFFBE8;
}</style>
