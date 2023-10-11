<script setup lang="ts">
import GetNotifyData from '@/api/Article'
import { useRoute } from 'vue-router'
const router = useRoute()

const NotifyData: any = reactive({
  title: '',
  username: '',
  pub_date: '',
  content: ''
})
const goodpage = ref(true)
const getNotify = async (id: string) => {
  const { data: res } = await GetNotifyData.getPageData(id)
  if (res.status !== 404) {
    goodpage.value = false
    NotifyData.title = res.data.title
    NotifyData.username = res.data.username
    NotifyData.pub_date = res.data.pub_date
    NotifyData.content = res.data.content
  } else {
    goodpage.value = true
  }
  useHead({
    title: NotifyData.title,
    meta: [
      {
        name: 'keywords',
        content: NotifyData.keyword
      },
      {
        name: 'description',
        content: NotifyData.lable
      },
      {
        name: 'robots',
        content: 'all'
      },
      {
        name: 'author',
        content: NotifyData.username
      }
    ]
  })
}
onMounted(() => {
  getNotify(router.params.id as string)
})
</script>

<template>
  <div id="" class="article">
    <div class="leftContent">
      <h1 v-show="goodpage" style="text-align: center">很抱歉，您没有查看的权限</h1>
      <div v-show="!goodpage">
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

.ContentMessage>span:first-child {
  margin-right: 10px;
}

.ContentMessage>span {
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
    width: 45vw;
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

.commentArea {
  padding: 10px 0 20px 0;
  border-radius: 5px;

  p {
    font-size: 1.5rem;
    font-weight: bolder;
    margin: 10px;
  }

  #comtext {
    border-radius: 8px;
    border: 2px rgba(243, 245, 248, 0.8) solid;
    padding: 5px;
    width: 100%;
    height: 80px;
    resize: none;
  }

  .comment {
    background-color: rgba(201, 227, 243, 0.4);
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 10px;

    p {
      margin: 0;
      color: rgba(6, 52, 122, 0.8);
    }

    .comment_user {
      font-size: 1.2rem;
    }

    .comment_text {
      font-size: 1.2rem;
      margin: 2px;
    }

    .comment_time {
      font-size: 0.8rem;
      text-align: right;
    }
  }
}

.textarea {
  >button {
    float: right;
  }
}
</style>
