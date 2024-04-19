<script setup lang="ts">
import getArtDataApi from '@/api/Space'
import { useRouter } from 'vue-router'
import { View, Star, Share } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'space-view',
})
const router = useRouter()
const user: Ref<string> = ref(
  router.currentRoute.value.params.id
) as Ref<string>
const MyArticleListData: Ref<any[]> = ref([])
const AllNum: Ref<number> = ref(0)
const getArticle = async (num: number): Promise<void> => {
  if (num === 0) num = 0
  const { data: res } = await getArtDataApi.UsergetCollect(num, user.value)
  MyArticleListData.value = []
  MyArticleListData.value = [...res.data]
  AllNum.value = res.Num
}

// 上一页
const prevNum = (num: number) => {
  void getArticle((num - 1) * 10)
}
// 数字
const pagerNum = (num: number) => {
  void getArticle((num - 1) * 10)
}
// 下一页
const nextNum = (num: number) => {
  void getArticle((num - 1) * 10)
}
onMounted(() => {
  void getArticle(0)
})
</script>

<template>
  <div class="SpaceArticleList" v-if="AllNum !== 0">
    <h3>他的收藏</h3>
    <div
      class="CardItem"
      v-for="(item, index) in MyArticleListData"
      :key="index"
      :data="item"
    >
      <div class="Header">
        <nuxt-link :to="'/article/' + item.article_id" class="titleLink">
          <h3>
            {{ item.title }}
          </h3>
        </nuxt-link>
        <span class="putTime">{{ item.pub_date }}</span>
      </div>
      <div class="contentArea">
        <div
          class="ArticleCoverImg"
          v-if="item.cover_img != null && item.cover_img != ''"
        >
          <img :src="item.cover_img" alt="文章配图" class="ArticleImg" />
        </div>
        <div class="ArticleContent">
          <nuxt-link :to="'/article/' + item.article_id" class="titleLink">
            {{ item.content }}
          </nuxt-link>
        </div>
      </div>
      <div class="ActionBtn">
        <div class="UserDataNum">
          <span
            ><el-icon><View /></el-icon>{{ item.read_num }}</span
          >
        </div>
      </div>
    </div>
    <div class="pagBtnArea" v-if="!(AllNum <= 10)">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="AllNum"
        @current-change="prevNum"
        @prev-click="pagerNum"
        @next-click="nextNum"
      />
    </div>
  </div>
  <el-empty v-else>
    <template #description> 空空如也 </template>
  </el-empty>
</template>

<style lang="less" scoped>
.CardItem {
  height: 150px;
  background-color: #fff;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.pagBtnArea {
  display: flex;
  justify-content: center;
  padding: 5px;
}

@media screen and(max-width: 768px) {
  .CardItem {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin: 10px 0;
    border-radius: 5px;
    overflow: hidden;
  }
  .titleLink {
    font-size: 0.8rem;
  }
}

.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
}

.titleLink {
  color: black;
}

.titleLink:hover {
  color: #286dd4;
}
.putTime {
  color: gray;
}

.contentArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.ActionBtn {
  padding: 5px;
}

.UserDataNum {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  justify-content: space-between;
  > span > i {
    font-style: normal;
    margin-right: 5px;
  }
}

.ArticleCoverImg {
  width: 180px;
  height: 75px;
  border-radius: 5px;
  overflow: hidden;
  flex: 0.8;
  margin: 5px;

  .ArticleImg {
    width: 100%;
    height: 100%;
  }
}

.ArticleContent {
  padding: 5px;
}

.ArticleContent {
  flex: 2;
}

.action {
}
</style>
