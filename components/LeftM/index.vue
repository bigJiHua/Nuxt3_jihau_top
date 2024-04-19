<script setup lang="ts">
import ArticleAPI from '@/api/Article'
import { useArticleListStore } from '@/stores/useArticleData'
const store = useArticleListStore()
const ArticleListData: any = ref(toRaw(store.getArticleList))
const refreshing: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const finished: Ref<boolean> = ref(false)
let Num = 5
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
  })
  .catch((error) => {
    console.error('Request failed:', error)
  })

// 获取新的文章列表
const getNewArticleList = async () => {
  const { data: res } = await ArticleAPI.getArticleList(Num)
  if (res.data.length === 0) finished.value = true
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (refreshing.value) {
    store.setArticleData([...res.data, ...ArticleListData.value])
  } else {
    store.setArticleData([...ArticleListData.value, ...res.data])
  }
  ArticleListData.value = toRaw(store.getArticleList)
  Num += 5
  loading.value = false
  refreshing.value = false
}
// 加载到本地时数据存入Store
onMounted(() => {
  setTimeout(() => {
    if (ArticleListData.value.length !== 0) {
      store.setArticleData([...ArticleListData.value])
    }
  }, 800)
})
</script>

<template>
  <div id="" class="left_box">
    <ClientOnly><Lunbo></Lunbo></ClientOnly>
    <div class="article_ListView">
      <p class="article_alltitle st">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <van-pull-refresh v-model="refreshing" @refresh="getNewArticleList">
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
  font-size: 2rem;
}

@media only screen and (min-width: 755px) {
  .left_box {
    width: 100%;
  }

  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}

@media only screen and (max-width: 755px) {
  .article_alltitle span:nth-child(2) {
    top: 18px;
    margin-left: 10px;
    font-size: 1.2rem;
  }
}
</style>
