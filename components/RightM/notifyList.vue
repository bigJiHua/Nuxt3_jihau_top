<script setup lang="ts">
import getNotifyAPI from '@/api/Article'
import { useNotifyListStore } from '@/stores/useArticleData'
const store = useNotifyListStore()

const notifyList: any = ref(toRaw(store.getNotify))
const getNotifyData = async (): Promise<void> => {
  const { data: res } = await getNotifyAPI.getNotifyList(0)
  notifyList.value = res.data
  store.setNotify(res.data)
}
onMounted(() => {
  if (notifyList.value.length <= 1) void getNotifyData()
})
</script>

<template>
  <div class="ararc">
    <client-only>
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
    </client-only>
  </div>
</template>

<style lang="less" scoped>
.ararc {
  margin: 10px 0;
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
