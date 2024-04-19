<script setup lang="ts">
import GetNotifyData from '@/api/Article'
import { useRoute } from 'vue-router'
import { useAuthorDataStore } from '@/stores/useUserData'
const router = useRoute()
const store = useAuthorDataStore()
const NotifyData: any = reactive({
  title: '',
  username: '',
  pub_date: '',
  content: '',
  keyword: '',
  describ: '',
})
const isBad = ref(false)
const goodpage = ref(true)
// router.params.id
const NUrl = `${reqConfig.baseUrl}/data/page/`
const SystemNReq = async (): Promise<void> => {
  useFetch(NUrl, {
    method: 'get',
    params: {
      id: router.params.id,
    },
  })
    .then((response) => {
      const res: any = response.data.value
      NotifyData.title = res.data.title
      NotifyData.username = res.data.username
      NotifyData.pub_date = res.data.pub_date
      NotifyData.content = res.data.content
      NotifyData.keyword = res.data.keyword
      NotifyData.describes = res.data.describes
      goodpage.value = false
    })
    .catch((error) => {
      goodpage.value = true
      NotifyData.title = 404
      NotifyData.username = 404
      NotifyData.pub_date = 404
      NotifyData.content = 404
      console.error('Request failed:', error)
    })
}
await SystemNReq()
// 获取通知数据
// const getNotify = async (id: string): Promise<void> => {
//   const { data: res } = await GetNotifyData.getPageData(id)
//   if (res.status !== 404) {
//     goodpage.value = false
//     NotifyData.title = res.data.title
//     NotifyData.username = res.data.username
//     NotifyData.pub_date = res.data.pub_date
//     NotifyData.content = res.data.content
//     store.setArticleAuthor(res.data.username)
//   } else {
//     goodpage.value = true
//   }
// }
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
    <div class="leftContent">
      <div v-if="goodpage" style="text-align: center">
        <h1>404 NOT FOUNT/无权查看</h1>
        <nuxt-link to="/">返回主页</nuxt-link>
      </div>
      <div v-else>
        <div class="content st">
          <header class="headerText">
            <h1>{{ NotifyData.title }}</h1>
            <p class="ContentMessage">
              <span>管理员：{{ NotifyData.username }}</span>
              <span>时间：{{ NotifyData.pub_date }}</span>
            </p>
          </header>
          <p v-html="NotifyData.content"></p>
        </div>
      </div>
    </div>
    <div class="ArticleRightPanel">
      <RightMArticle></RightMArticle>
    </div>
  </div>
</template>

<style lang="less" scoped>
.article {
  word-wrap: break-word;
  position: relative;
}

.leftContent {
  overflow: hidden;
  background-color: #fff;
}

.ContentMessage > span:first-child {
  margin-right: 10px;
}

.ContentMessage > span {
  font-size: 10px;
}

.headerText {
  text-align: center;
  margin-bottom: 10px;
}

@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    margin: 0 auto;
    max-width: 1200px;
    min-height: 100vh;
  }

  .leftContent {
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }

  .ArticleRightPanel {
    width: 25vw;
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

  .leftContent {
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 30px;
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

.goodnum,
.collect {
  letter-spacing: 5px;
}

.selc,
.selg {
  color: red;
}
</style>
