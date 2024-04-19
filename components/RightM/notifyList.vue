<script setup lang="ts">
import getNotifyAPI from '@/api/Article'
const notifyList: any = ref([])
const getNotifyData = async (): Promise<void> => {
  const { data: res } = await getNotifyAPI.getNotifyList(10)
  notifyList.value = res.data
}
onMounted(() => {
  if (notifyList.value.length === 0) void getNotifyData()
})
</script>

<template>
  <div class="ararc">
    <p class="ararc_title Cookie">
      <nuxt-link to="/Notify">通知</nuxt-link>
    </p>
    <ClientOnly>
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(data, index) in notifyList" :key="index">
            <nuxt-link :to="'/Notify/' + data.notify_id">{{
              data.title
            }}</nuxt-link>
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
.ararc {
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
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

  > a {
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
</style>
