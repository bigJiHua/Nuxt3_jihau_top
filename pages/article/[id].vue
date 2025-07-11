<script setup lang="ts">
import getArticleApi from '@/api/Article'
import UserAction from '@/api/Article/Action'
import { useRoute, useRouter } from 'vue-router'
import { useAuthorDataStore } from '@/stores/useUserData'
import {
  Share,
  View,
  Calendar,
  ArrowDown,
  Promotion,
} from '@element-plus/icons-vue'
const store = useAuthorDataStore()
const route = useRoute()
const router = useRouter()
const isLogin = ref(false)
const isMd = ref(false)
const htmlContentRef = ref(null)
const btntype = ref({
  goodnum: '',
  collect: '',
})
const Active: any = reactive({
  goodnum: false,
  collect: false,
  comTXT: '',
})
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
    read_num: '',
  },
  goodnum: 0,
  collect: 0,
  commont: [],
  accollect: false,
  acgoodnum: false,
})
const Aurl = `${reqConfig.baseUrl}/data/article/`
const { data } = await uFetch.useCustomFetch(Aurl, {
  method: 'get',
  params: {
    id: route.params.id,
  },
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  key: `post-${route.params.id}`,
})
if (/\bmd[A-Z0-9]+\b/g.test(route.params.id as string)) isMd.value = true
const res: any = data.value
ArticleData.article = res.data.article
// ArticleData.article.lable = res.data.article.lable.split('、')
const tagcmp = (item: any): string[] => {
  if (typeof item !== 'string') {
    return item
  } else {
    return item.split(/[、,，]/)
  }
}

// 获取评论等等...
const getArchives = async (): Promise<void> => {
  const { data: res } = await getArticleApi.getArchives(
    route.params.id as string
  )
  ArticleData.goodnum = res.data.goodnum
  ArticleData.collect = res.data.collect
  ArticleData.commont = res.data.comment
  ArticleData.accollect = res.data.accollect
  ArticleData.acgoodnum = res.data.acgoodnum
  // 判断本人是否点赞
  btntype.value.goodnum = res.data.acgoodnum ? 'success' : ''
  btntype.value.collect = res.data.accollect ? 'success' : ''
}

// 点赞
const goodnum = async (): Promise<any> => {
  if (localStorage.getItem('Username') === null) {
    if (await WarningTips('登录后才能操作哦！是否跳转登录？')) {
      return await router.push('/Login/art')
    } else return
  } else {
    const data = {
      articleid: route.params.id as string,
      type: 'goodnum',
    }
    await UserAction.UserActive(data).then(() => {
      ArticleData.acgoodnum = !ArticleData.acgoodnum
    })
    if (!ArticleData.acgoodnum) {
      ArticleData.goodnum -= 1
      btntype.value.goodnum = ''
    } else {
      ArticleData.goodnum += 1
      btntype.value.goodnum = 'success'
    }
  }
}
// 收藏
const collect = async (): Promise<void> => {
  if (localStorage.getItem('Username') === null) {
    if (await WarningTips('登录后才能操作哦！是否跳转登录？')) {
      return await router.push('/Login/art')
    } else return
  } else {
    const data = {
      username: localStorage.getItem('Username'),
      articleid: route.params.id as string,
      type: 'collect',
    }
    await UserAction.UserActive(data).then(() => {
      ArticleData.accollect = !ArticleData.accollect
    })
    if (!ArticleData.accollect) {
      ArticleData.collect -= 1
      btntype.value.collect = ''
    } else {
      ArticleData.collect += 1
      btntype.value.collect = 'success'
    }
  }
}
// 评论
const commont = async (artid: string): Promise<void> => {
  if (localStorage.getItem('Username') === null) {
    if (await WarningTips('登录后才能操作哦！是否跳转登录？')) {
      return router.push('/Login/art')
    } else return
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
        const comtxt = Active.comTXT
          .match(
            /((\p{sc=Han})|([a-zA-Z0-9])|([\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]))/gu
          )
          .join('')
        const data = {
          username: localStorage.getItem('Username'),
          articleid: artid,
          type: 'comment',
          comment: comtxt,
        }
        const { data: res } = await UserAction.UserActive(data)
        if (res.status === 200) {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          Active.collect = !Active.collect
          await getArchives()
          Active.comTXT = ''
        }
      }
    }
  }
}
const { $copyUrl } = useNuxtApp()
// 分享 TODO分享统计事件
const share = (): void => {
  const copyw = `https://jihau.top/article/${ArticleData.article.article_id}`
  $copyUrl(copyw)
}
// TODO 分享到动态
const shareSay = async (): Promise<void> => {
  ElMessage({
    message: '敬请期待！',
    type: 'warning',
  })
}
// v-html图片点击放大
const handleImageClick = async (e: MouseEvent): any => {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    const src = (target as HTMLImageElement).src
    try {
      await ElMessageBox({
        message: h('img', {
          src,
          style:
            'max-width: 350px; height: 250px;display: block; margin: 0 auto; ',
        }),
        showConfirmButton: false,
        showCancelButton: false,
        closeOnClickModal: true,
      })
    } catch (error) {
      // 忽略用户取消的错误（特定错误信息为"cancel"）
      if (error !== 'cancel') {
        console.error('Unhandled error in ElMessageBox:', error)
      }
    }
  }
}

onMounted(() => {
  void getArchives()
  setTimeout(() => {
    store.setArticleAuthor(toRaw(ArticleData.article.username))
  }, 800)
  // 5秒后请求增加阅读数
  setTimeout(() => {
    if (route.params.id !== undefined) {
      void getArticleApi.UpdatedReadNum(route.params.id as string)
    }
  }, 5000)
})
</script>
<template>
  <div id="" class="article">
    <Head>
      <Title>{{ ArticleData.article.title }}</Title>
      <Meta name="keywords" :content="ArticleData.article.keyword" />
      <Meta name="description" :content="ArticleData.article.describes" />
      <Meta name="author" :content="ArticleData.article.username" />
      <Meta name="copyright" :content="ArticleData.article.username" />
      <Meta name="robots" content="all" />
      <Meta name="ogImage" :content="ArticleData.article.cover_img" />
    </Head>
    <div class="leftContent">
      <div class="tabmenu">
        <h1>{{ ArticleData.article.title }}</h1>
        <div class="tabArea">
          <nuxt-link
            :to="'/space/' + ArticleData.article.username"
            target="_blank"
            >{{ ArticleData.article.username }}</nuxt-link
          >
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
      </div>
      <!-- html文章 -->
      <div class="content" ref="htmlContentRef" v-if="!isMd">
        <div
          v-html="ArticleData.article.content"
          v-highlight
          class="html-content"
          @click="handleImageClick"
        ></div>
      </div>
      <!-- md文章 -->
      <div class="content" v-else>
        <CekditorViewsMd
          :content="ArticleData.article.content"
        ></CekditorViewsMd>
      </div>
      <!-- 操作区域 -->
      <div class="btn_active">
        <el-button plain class="acbtn" @click="goodnum" :type="btntype.goodnum">
          <van-icon name="good-job-o" />
          &nbsp;
          {{ ArticleData.goodnum }}
        </el-button>
        <el-button class="acbtn" plain @click="collect" :type="btntype.collect">
          <van-icon name="star-o" />
          &nbsp;{{ ArticleData.collect }}
        </el-button>
        <!-- 分享 -->
        <el-dropdown trigger="click">
          <el-button plain class="acbtn"
            ><arrow-down />
            <el-icon class="no-inherit">
              <Share />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span type="primary" plain class="collect" @click="share"
                  >分享
                  <el-icon color="#409EFC" class="no-inherit">
                    <Share />
                  </el-icon> </span
              ></el-dropdown-item>
              <el-dropdown-item
                ><span type="primary" plain class="collect" @click="shareSay"
                  >转发
                  <el-icon color="#409EFC" class="no-inherit">
                    <Promotion />
                  </el-icon> </span
              ></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 标签 -->
      <div class="tabLable">
        <span style="font-size: 0.7rem">标签：</span>
        <el-tag
          v-for="tag in tagcmp(ArticleData.article.lable)"
          :key="tag"
          class="tag"
          style="margin-right: 10px"
          ><nuxt-link :to="'/search/' + tag">{{ tag }}</nuxt-link></el-tag
        >
      </div>
      <!-- 评论 -->
      <client-only>
        <div class="commentArea">
          <p>全部评论</p>
          <div
            class="comment"
            v-for="(item, index) in ArticleData.commont"
            :key="index"
          >
            <p class="comment_user">
              <router-link :to="'/space/' + item.username"
                >{{ item.username }}：</router-link
              >{{ item.comment }}
            </p>
            <p class="comment_time">时间:{{ item.pub_date }}</p>
          </div>
          <div class="textarea">
            <textarea
              name=""
              id="comtext"
              placeholder="友善发言，留下美好瞬间   (最多输入150个字符)"
              maxlength="150"
              @keyup.enter="commont(ArticleData.article.article_id)"
              v-model="Active.comTXT"
            ></textarea>
            <el-button
              type="primary"
              plain
              :disabled="isLogin"
              @click="commont(ArticleData.article.article_id)"
              >留言</el-button
            >
          </div>
        </div>
      </client-only>
    </div>
    <div class="ArticleRightPanel">
      <RightMArticle></RightMArticle>
    </div>
  </div>
</template>

<style src="@/assets/css/article.css"></style>
<style lang="less" scoped>
.article {
  word-wrap: break-word;
  position: relative;
}

.leftContent {
  overflow: hidden;
  background-color: #fff;
}

.content > p > p > img {
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
  h1 {
    font-size: 1.5rem;
    color: black;
  }
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
    height: 80px;
    resize: none;
    width: 95%;
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
  > button {
    float: right;
  }
}

.btn_active {
  width: 100%;
  display: flex;
}
.acbtn {
  margin: 10px 20px;
}
</style>
