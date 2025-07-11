<script setup lang="ts">
// import GetNotifyData from '@/api/Article'
import { useRoute } from 'vue-router'
import { useAuthorDataStore } from '@/stores/useUserData'
const router = useRoute()
const store = useAuthorDataStore()
const NotifyData: any = ref({
  title: '',
  username: '',
  pub_date: '',
  content: '',
  keyword: '',
  describes: '',
})
const NUrl = `${reqConfig.baseUrl}/data/page/`
const { data } = await uFetch.useCustomFetch(NUrl, {
  method: 'get',
  params: {
    id: router.params.id,
  },
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  key: `post-${router.params.id}`,
})
const res: any = data.value
NotifyData.value = res.data

onMounted(() => {
  setTimeout(() => {
    store.setArticleAuthor(toRaw(NotifyData.username))
  }, 800)
})
</script>

<template>
  <div id="" class="article">
    <Head>
      <Title>{{ NotifyData.title }}</Title>
      <Meta name="keywords" :content="NotifyData.keyword" />
      <Meta name="description" :content="NotifyData.describes" />
      <Meta name="author" :content="NotifyData.username" />
      <Meta name="copyright" :content="NotifyData.username" />
    </Head>
    <div class="content">
      <header class="headerText">
        <h1>{{ NotifyData.title }}</h1>
        <p class="ContentMessage">
          <span>管理员：{{ NotifyData.username }}</span>
          <span>时间：{{ NotifyData.pub_date }}</span>
        </p>
      </header>
      <div v-html="NotifyData.content" class="html-content"></div>
    </div>
    <RightMIcp />
  </div>
</template>
<style src="@/assets/css/article.css"></style>
<style lang="less" scoped>
* {
  font-size: 0.8rem;
}
.article {
  height: 100%;
}

.content {
  overflow: hidden;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  min-height: 60vh;
}

.ContentMessage > span:first-child {
  margin-right: 10px;
}

.ContentMessage > span {
  font-size: 0.7rem;
}

.headerText {
  text-align: center;
  margin-bottom: 10px;
  > h1 {
    font-size: 2rem;
  }
  color: rgba(0, 0, 0, 0.737);
}

@media only screen and (min-width: 755px) {
  .article {
    width: 80vw;
    margin: 0 auto;
    max-width: 1200px;
  }

  .leftContent {
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .article {
    width: 95vw;
    margin: 0 auto;
  }

  .content {
    letter-spacing: 1px;
    word-wrap: break-word;
    /* 兼容性较好的属性 */
    overflow-wrap: break-word;
    /* CSS3 标准属性 */
  }
}

.tabmenu {
  .tabArea {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: space-around;
    flex-wrap: nowrap;
    margin: 10px;
  }

  .tabItem,
  .tabLable {
    margin-left: 10px;
    font-size: 0.5rem;
  }
}

.lable-tag {
  margin: 5px;
}

.btn_active {
  button {
    margin: 10px;
  }
}
</style>
