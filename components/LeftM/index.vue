<script setup lang="ts">
import ArticleAPI from '@/api/Article'
import { useArticleListStore } from '@/stores/useArticleData'
const store = useArticleListStore()
const ArticleListData: any = ref(toRaw(store.getArticleList))
const refreshing: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const finished: Ref<boolean> = ref(false)
const Num = ref(10)
const AUrl = `${reqConfig.baseUrl}/data/list`
useFetch(AUrl, {
  method: 'get',
  params: {
    page: 0,
  },
})
  .then((response) => {
    const res: any = response.data.value
    ArticleListData.value = res.data
    store.setArticleData(res.data)
  })
  .catch((error) => {
    console.error('Request failed:', error)
  })

// 获取新的文章列表
const getNewArticleList = async (): Promise<void> => {
  await ArticleAPI.getArticleList(Num.value)
    .then((response: any) => {
      Num.value += 10
      const { data: res } = response
      if (res.data.length === 0) {
        Num.value -= 10
        finished.value = true
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (refreshing.value) {
        store.setArticleData([...res.data, ...ArticleListData.value])
      } else {
        store.setArticleData([...ArticleListData.value, ...res.data])
      }
      ArticleListData.value = toRaw(store.getArticleList)
      loading.value = false
      refreshing.value = false
    })
    .catch(() => {
      finished.value = true
      loading.value = false
      refreshing.value = false
    })
}
</script>

<template>
  <div id="" class="left_box">
    <client-only><Lunbo></Lunbo></client-only>
    <div class="article_ListView">
      <p class="article_alltitle">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <van-pull-refresh
        v-model="refreshing"
        :head-height="60"
        @refresh="getNewArticleList"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getNewArticleList"
        >
          <ArticleList
            v-for="(item, index) in ArticleListData"
            :key="index"
            class="ArticleListItem"
            :data="item"
          ></ArticleList>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<style lang="less" scoped>
.left_box {
  .article_ListView {
    margin-top: 20px;
  }
}

.article_alltitle {
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.712);
  font-size: 1.6rem;
  margin: 10px 0;
  font-family: 'STSong';
}

.article_alltitle span:nth-child(2) {
  font-size: 1rem;
  margin-left: 10px;
}

@media only screen and (min-width: 755px) {
  .article_alltitle {
    width: 43vw;
    max-width: 700px;
  }
  .left_box {
    width: 100%;
  }
}

@media only screen and (max-width: 755px) {
}
</style>
