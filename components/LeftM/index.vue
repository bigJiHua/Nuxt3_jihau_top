<script setup lang="ts">
import ArticleAPI from '@/api/Article'
import { useArticleListStore } from "@/stores/useArticleData"
const store = useArticleListStore()
const ArticleListData: any = ref(toRaw(store.getArticleList))
let Num = 5
const AUrl = `${reqConfig.baseUrl}/data/list`
useFetch(AUrl, {
  method: 'get',
  params: {
    page: 0
  }
})
  .then(response => {
    const res: any = response.data.value
    ArticleListData.value = res.data
  })
  .catch(error => {
    console.error('Request failed:', error);
  });

// 获取新的文章列表
const getNewArticleList = async () => {
  const { data: res } = await ArticleAPI.getArticleList(Num)
  store.setArticleData([...ArticleListData.value, ...res.data])
  ArticleListData.value = toRaw(store.getArticleList)
  Num += 5
}
// 如果触底获取文章方法
let throttleTimer: any = null;
const isBottomGetArticle = () => {
  if (throttleTimer) return; // 如果已经有定时器在等待执行，则直接返回
  throttleTimer = setTimeout(() => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    // windows桌面计算
    if (window.innerWidth > 755 && scrollTop + clientHeight >= scrollHeight - 1) {
      getNewArticleList();
    } else if (window.innerWidth < 755 && scrollTop + clientHeight >= scrollHeight / 1.2) {
      // 如果是手机的话
      getNewArticleList();
    }
    throttleTimer = null; // 重置定时器
  }, 800); // 设置节流时间间隔，这里设置为500毫秒
};

onMounted(() => {
  setTimeout(() => {
    if (ArticleListData.value.length !== 0) {
      store.setArticleData([...ArticleListData.value])
    }
  }, 800);
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('scroll', isBottomGetArticle)
  }
})
</script>

<template>
  <div id="" class="left_box">
    <Lunbo></Lunbo>
    <div class="article_ListView">
      <p class="article_alltitle st">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <!-- 文章列表 -->
      <div v-for="item in ArticleListData" :key="item" class="ArticleListItem">
        <ArticleList :data="item"></ArticleList>
      </div>
      <div v-loading="true">
        加载中...
      </div>
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
