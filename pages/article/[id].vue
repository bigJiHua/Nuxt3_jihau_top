<script setup lang="ts">
import getArticleApi from '@/api/Article'
import UserAction from '@/api/Article/Action'
import { useRoute } from 'vue-router'
import { useAuthorDataStore } from '@/stores/useUserData'
import { Star, Share, View, Calendar } from '@element-plus/icons-vue'
const store = useAuthorDataStore()
const router = useRoute()
const Active: any = reactive({
  goodnum: false,
  collect: false,
  comTXT: ''
})
const isLogin = ref(false)
const ArticleData: any = reactive({
  article: {
    title: '',
    author: '',
    date: '',
    tags: '',
    readnum: '',
    content: '',
    lable: '',
    username: '',
    pub_date: '',
    read_num: ''
  },
  goodnum: '',
  collect: '',
  commont: []
})
const goodpage = ref(true)
const page = router.params.id
const Move = reactive({
  goodnum: false,
  collect: false
})
const showLogin = ref(false)
const loading = ref(true)

const getArticle = async (id: string) => {
  const { data: res } = await getArticleApi.getArchives(id)
  ArticleData.article = res.data.article
  ArticleData.goodnum = res.data.goodnum
  ArticleData.collect = res.data.collect
  ArticleData.commont = res.data.comment
  Move.goodnum = res.data.acgoodnum
  Move.collect = res.data.accollect
  store.setArticleAuthor(ArticleData.article.username)
  ArticleData.article.lable = ArticleData.article.lable.split('、')
  // 5秒后请求增加阅读数
  setTimeout(async () => {
    await getArticleApi.UpdatedReadNum(id)
  }, 5000)
  if (res.data.article !== '{}') {
    goodpage.value = false
    loading.value = false
  }
  useHead({
    title: ArticleData.article.title,
    meta: [
      {
        name: 'keywords',
        content: ArticleData.article.keyword
      },
      {
        name: 'description',
        content: ArticleData.article.keyword
      },
      {
        name: 'robots',
        content: 'all'
      },
      {
        name: 'author',
        content: ArticleData.article.username
      }
    ]
  })
}
const goodnum = async (artid: string) => {
  if (localStorage.getItem('Username') === null) {
    ElMessage({
      message: '登录才能点赞哦！',
      type: 'warning',
    })
    showLogin.value = true
    localStorage.setItem('met', 'goodnum')
  } else {
    if (artid === undefined) {
      ElMessage({
        message: 'ArticleID 不能为undefined!',
        type: 'warning',
      })
    } else {
      const data = {
        username: localStorage.getItem('Username'),
        articleid: artid,
        type: 'goodnum'
      }
      const { data: res } = await UserAction.UserActive(data)
      if (res.status === 200) {
        if (Move.goodnum === false) {
          ArticleData.goodnum += 1
          Move.goodnum = !Move.goodnum
        } else if (Move.goodnum === true) {
          ArticleData.goodnum -= 1
          Move.goodnum = !Move.goodnum
        }
      }
    }
  }
}
const collect = async (artid: string) => {
  if (localStorage.getItem('Username') === null) {
    ElMessage({
      message: '登录才能点赞收藏哦！',
      type: 'warning',
    })
    showLogin.value = true
    localStorage.setItem('met', 'collect')
  } else {
    if (artid === undefined) {

      ElMessage({
        message: 'ArticleID是必须的',
        type: 'warning',
      })
    } else {
      const data = {
        username: localStorage.getItem('Username'),
        articleid: artid,
        type: 'collect'
      }
      const { data: res } = await UserAction.UserActive(data)
      if (res.status === 200) {
        if (Move.collect === false) {
          ArticleData.collect += 1
          Move.collect = !Move.collect
        } else if (Move.collect === true) {
          ArticleData.collect -= 1
          Move.collect = !Move.collect
        }
      }
    }
  }
}
const commont = async (artid: string) => {
  if (localStorage.getItem('Username') === null) {
    ElMessage({
      message: '登录才能评论哦！',
      type: 'warning',
    })
    showLogin.value = true
    if (Active.comTXT !== '') {
      localStorage.setItem('commont', Active.comTXT)
    }
  } else {
    if (artid === undefined) {
      ElMessage({
        message: '获取文章id错误，请刷新当前页面',
        type: 'warning',
      })
    } else {
      if (Active.comTXT === '') {

        ElMessage({
          message: '留言输入内容不能为空哦!',
          type: 'warning',
        })
      } else {
        const comtxt = Active.comTXT.match(/((\p{sc=Han})|([a-zA-Z0-9])|([\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]))/gu)
          .join('')
        const data = {
          username: localStorage.getItem('Username'),
          articleid: artid,
          type: 'comment',
          comment: comtxt
        }
        const { data: res } = await UserAction.UserActive(data)
        if (res.status === 200) {
          Active.collect = !Active.collect
          getArticle(router.params.id as string)
          Active.comTXT = ''
        }
      }
    }
  }
}
const closePanel = () => {
  showLogin.value = false
}
const share = () => {
  const copyw = `https://jihau.top/article/${ArticleData.article.article_id}`
  navigator.clipboard.writeText(copyw).then(
    () => {
      ElMessage({
        message: '复制成功,赶快去分享吧!',
        type: 'success'
      })
    },
    () => {
      ElMessage({
        message: '复制失败,请刷新页面后重试吧',
        type: 'warning'
      })
    }
  )
}
onMounted(() => {
  getArticle(router.params.id as string)
})
</script>
<template>
  <div id="" class="article">
    <div class="leftContent">
      <div v-if="goodpage" style="text-align: center">
        <el-empty description="加载中" v-if="loading" />
        <div v-else>
          <h1>404 NOT FOUNT</h1>
          <nuxt-link to="/">返回主页</nuxt-link>
        </div>
      </div>
      <div v-else>
        <div class="tabmenu">
          <h1>{{ ArticleData.article.title }}</h1>
          <div class="tabArea">
            {{ ArticleData.article.username }}
            <div class="tabItem">
              <el-icon>
                <Calendar />
              </el-icon>
              {{ ArticleData.article.pub_date }}
            </div>
            <div class="tabItem">
              <el-icon>
                <View />
              </el-icon>
              {{ ArticleData.article.read_num }}
            </div>
          </div>
          <div class="tabLable">
            <el-tag v-for="(item, index) in ArticleData.article.lable" class="lable-tag">{{ item }}</el-tag>
          </div>
        </div>
        <div class="content">
          <p v-html="ArticleData.article.content" v-highlight></p>
        </div>
        <div class="btn_active">
          <el-button type="success" plain class="goodnum" @click="goodnum(ArticleData.article.article_id)">
            <span>点赞</span>
            <span :class="{ selg: Move.goodnum }">
              ❤
            </span>
            <span>{{ ArticleData.goodnum }}</span>
          </el-button>
          <el-button type="success" plain class="collect" @click="collect(ArticleData.article.article_id)">
            <span>收藏</span>
            <span :class="{ selc: Move.collect }">
              <el-icon>
                <Star />
              </el-icon>
            </span>
            <span>{{ ArticleData.collect }}</span>
          </el-button>
          <el-button type="primary" plain class="collect" @click="share">分享
            <el-icon color="#409EFC" class="no-inherit">
              <Share />
            </el-icon>
          </el-button>
        </div>
        <div class="commentArea">
          <p>全部评论</p>
          <div class="comment" v-for="(item, index) in ArticleData.commont" :key="index">
            <p class="comment_user">
              <router-link :to="'/space/' + item.username">{{ item.username }}：</router-link>{{ item.comment }}
            </p>
            <p class="comment_time">时间:{{ item.pub_date }}</p>
          </div>
          <div class="textarea">
            <textarea name="" id="comtext" placeholder="友善发言，留下美好瞬间   (最多输入150个字符)" maxlength="150"
              @keyup.enter="commont(ArticleData.article.article_id)" v-model="Active.comTXT"></textarea>
            <el-button type="primary" plain :disabled="isLogin"
              @click="commont(ArticleData.article.article_id)">留言</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="ArticleRightPanel">
      <RightMArticle></RightMArticle>
    </div>
    <ArticleLoginBox @closePanel="closePanel" v-if="showLogin"></ArticleLoginBox>
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

.content>p>p>img {
  max-width: 350px;
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

  .tabLable {
    overflow: scroll;
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

