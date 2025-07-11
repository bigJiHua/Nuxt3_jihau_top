<script setup lang="ts">
import { View, Star, Share } from '@element-plus/icons-vue'

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  articleList: {
    type: Array,
    default: () => [],
  },
})

// 分享
const { $copyUrl } = useNuxtApp()
const ShareBox = async (id: string) => {
  const copyw = `https://jihau.top/article/${id}`
  void $copyUrl(copyw)
}
</script>

<template>
  <div
    class="CardItem"
    v-for="(item, index) in articleList"
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
        v-if="item.cover_img !== '' && item.cover_img !== 'undefined'"
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
      <nuxt-link :to="'/article/' + item.article_id">
        <el-button type="primary" plain class="Gobutton">阅读</el-button>
      </nuxt-link>
      <el-button
        type="primary"
        plain
        class="Gobutton"
        @click="ShareBox(item.article_id)"
      >
        分享
      </el-button>
      <div class="UserDataNum">
        <p>
          <el-icon><View /></el-icon><span>{{ item.read_num }}</span>
        </p>
        <p>
          <van-icon name="like-o" /><span>{{ item.goodNum }}</span>
        </p>
        <p>
          <el-icon><Star /></el-icon><span>{{ item.collectNum }}</span>
        </p>
        <p>
          <el-icon><Share /></el-icon><span>{{ item.share_num }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.CardItem {
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0px 11px 0px rgb(15 77 153 / 20%);
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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
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

.UserDataNum {
  width: 60%;
  font-size: 0.9rem;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > p {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.ArticleContent {
  padding: 5px;
}

.ArticleContent {
  flex: 2;
}
</style>
