<script setup lang="ts">
import getArticleApi from "@/api/Article";
import UserAction from "@/api/Article/Action";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { useAuthorDataStore } from "@/stores/useUserData";
import { Share, View, Calendar, ArrowDown, Promotion } from "@element-plus/icons-vue";
const store = useAuthorDataStore();
const route = useRoute();
const router = useRouter();
const isMd = ref(false);
const htmlContentRef = ref(null);
const btntype = ref({
  goodnum: "",
  collect: "",
});
const ArticleData: any = reactive({
  article: {
    title: "",
    author: "",
    date: "",
    tags: "",
    readnum: "",
    content: "",
    lable: "",
    username: "",
    pub_date: "",
    read_num: "",
  },
  goodnum: 0,
  collect: 0,
  accollect: false,
  acgoodnum: false,
});
interface Permission {
  allow_comment: number;
  allow_comhis: number;
  allow_like: number;
  allow_share: number;
  comment_review: number;
  is_clean_page: number;
  lastcag_at: string;
}
// 权限数据
const permission: Ref<Permission> = ref({
  allow_comment: 1,
  allow_comhis: 1,
  allow_like: 1,
  allow_share: 1,
  comment_review: 0,
  is_clean_page: 0,
  lastcag_at: "",
});

/* ============ SSR 预前准备 ============ */
const appConfig = useAppConfig()
const baseUrl = appConfig.site.baseUrl

const Aurl = `${baseUrl}/data/article/`;
const key = "article-" + route.params.id;
const { data } = await useAsyncData(
  key,
  async () =>
    await $fetch(Aurl, {
      method: "get",
      params: {
        id: route.params.id,
      },
    }),
);
if (/\bmd[A-Z0-9]+\b/g.test(route.params.id as string)) isMd.value = true;
const res: any = data.value;

ArticleData.article = res?.data?.article;
permission.value = res?.data?.power;
// ArticleData.article.lable = res.data.article.lable.split('、')
// 划分标签
const tagcmp = (item: any): string[] => {
  if (typeof item !== "string") {
    return item;
  } else {
    return item.split(/[、,，]/);
  }
};
/* ============ END ============ */

// 获取评论等等...
const getArchives = async (): Promise<void> => {
  const { data: res } = await getArticleApi.getArchives(route.params.id as string);
  ArticleData.goodnum = res.data.goodnum;
  ArticleData.collect = res.data.collect;
  ArticleData.accollect = res.data.accollect;
  ArticleData.acgoodnum = res.data.acgoodnum;
  // 判断本人是否点赞
  btntype.value.goodnum = res.data.acgoodnum ? "success" : "";
  btntype.value.collect = res.data.accollect ? "success" : "";
};

// 点赞
const goodnum = async (): Promise<any> => {
  if (localStorage.getItem("Username") === null) {
    if (await WarningTips("登录后才能操作哦！是否跳转登录？")) {
      return await router.push("/Login/art");
    } else return;
  } else {
    const data = {
      articleid: route.params.id as string,
      type: "goodnum",
    };
    await UserAction.UserActive(data).then(() => {
      ArticleData.acgoodnum = !ArticleData.acgoodnum;
    });
    if (!ArticleData.acgoodnum) {
      ArticleData.goodnum -= 1;
      btntype.value.goodnum = "";
    } else {
      ArticleData.goodnum += 1;
      btntype.value.goodnum = "success";
    }
  }
};
// 收藏
const collect = async (): Promise<void> => {
  if (localStorage.getItem("Username") === null) {
    if (await WarningTips("登录后才能操作哦！是否跳转登录？")) {
      return await router.push("/Login/art");
    } else return;
  } else {
    const data = {
      username: localStorage.getItem("Username"),
      articleid: route.params.id as string,
      type: "collect",
    };
    await UserAction.UserActive(data).then(() => {
      ArticleData.accollect = !ArticleData.accollect;
    });
    if (!ArticleData.accollect) {
      ArticleData.collect -= 1;
      btntype.value.collect = "";
    } else {
      ArticleData.collect += 1;
      btntype.value.collect = "success";
    }
  }
};
const ArtUrl = appConfig.site.baseUrl
// 分享
const { $copyUrl } = useNuxtApp()
const ShareBox = async (id: string) => {
  const copyw = `${ArtUrl + id}`
  void $copyUrl(copyw)
}
// TODO 分享到动态
const shareSay = async (): Promise<void> => {
  ElMessage({
    message: "敬请期待！",
    type: "warning",
  });
};
// v-html图片点击放大
const handleImageClick = async (e: MouseEvent): Promise<void> => {
  const target = e.target as HTMLElement;
  if (target.tagName === "IMG") {
    const src = (target as HTMLImageElement).src;
    try {
      await ElMessageBox({
        message: h("img", {
          src,
          style: "max-width: 100%; height: 100%;display: block; margin: 0 auto; ",
        }),
        showConfirmButton: false,
        showCancelButton: false,
        closeOnClickModal: true,
      });
    } catch (error) {
      // 忽略用户取消的错误（特定错误信息为"cancel"）
      if (error !== "cancel") {
        console.error("Unhandled error in ElMessageBox:", error);
      }
    }
  }
};

const isMobile = ref(false);

onMounted(() => {
  void getArchives();
  const check = () => {
    isMobile.value = window.matchMedia("(max-width: 768px)").matches;
  };
  check();
  window.addEventListener("resize", check);
  setTimeout(() => {
    store.setArticleAuthor(toRaw(ArticleData.article.username));
  }, 800);
  // 5秒后请求增加阅读数
  setTimeout(() => {
    if (route.params.id !== undefined) {
      void getArticleApi.UpdatedReadNum(route.params.id as string);
    }
  }, 5000);
});
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
    <div
      class="leftContent"
      :id="permission.is_clean_page === 1 ? 'article-clean' : 'article-normal'"
    >
      <div class="tabmenu">
        <h1>{{ ArticleData.article.title }}</h1>
        <div class="tabArea">
          <nuxt-link :to="'/space/' + ArticleData.article.username" target="_blank">{{
            ArticleData.article.username
          }}</nuxt-link>
          <div class="tabItem">
            <el-icon style="width: 1rem; height: 1rem;">
              <Calendar />
            </el-icon>
            {{ ArticleData.article.pub_date }}
          </div>
          <div class="tabItem">
            <el-icon style="width: 1rem; height: 1rem;">
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
        <CekditorViewsMd :content="ArticleData.article.content"></CekditorViewsMd>
      </div>
      <!-- 操作区域 -->
      <div class="btn_active" v-if="permission.is_clean_page !== 1">
        <el-button
          plain
          class="acbtn"
          @click="goodnum"
          :type="btntype.goodnum"
          v-if="permission.allow_like === 1"
        >
          <van-icon name="good-job-o" />
          &nbsp;
          {{ ArticleData.goodnum }}
        </el-button>
        <el-button
          class="acbtn"
          plain
          @click="collect"
          :type="btntype.collect"
          v-if="permission.allow_like === 1"
        >
          <van-icon name="star-o" />
          &nbsp;{{ ArticleData.collect }}
        </el-button>
        <!-- 分享 -->
        <el-dropdown trigger="click" v-if="permission.allow_share === 1">
          <el-button plain class="acbtn"
            ><arrow-down />
            <el-icon class="no-inherit">
              <Share />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span type="primary" plain class="collect" @click="ShareBox"
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
      <div class="tabLable" v-if="permission.lastcag_at !== 'null'">
        最后更新于：{{ dayjs(Number(permission.lastcag_at)).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <!-- 评论 -->
      <div v-if="permission.is_clean_page !== 1 || permission.allow_comhis === 1">
        <el-affix position="top" :offset="60" v-if="!isMobile">
          <ArticleComment :article_id="ArticleData.article.article_id"></ArticleComment>
        </el-affix>
        <ArticleComment v-else :article_id="ArticleData.article.article_id"></ArticleComment>
      </div>
    </div>
    <div class="ArticleRightPanel" v-if="permission.is_clean_page === 0">
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
#article-normal {
  max-width: 700px;
}
.content > p > p > img {
  max-width: 350px;
}
// 电脑窗口
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
    width: 50vw;
  }

  .ArticleRightPanel {
    width: calc(30vw - 55px);
    max-width: 480px;
  }
  #article-clean {
    width: 100% !important;
  }
}
// 移动窗口
@media only screen and (max-width: 755px) {
  .article {
    width: 95vw;
    margin: 0 auto;
    min-height: 85vh;
  }
  #article-clean {
    width: 95% !important;
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
    font-size: 0.8rem;
  }
}

.tabLable {
  margin: 15px 0;
}
.lable-tag {
  margin: 5px;
}
.btn_active {
  width: 100%;
  display: flex;
}
.acbtn {
  margin: 10px 20px;
}
</style>
