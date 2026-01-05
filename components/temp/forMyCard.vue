<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const lable = ref([])
const keyword = ref([])
onMounted(() => {
  lable.value = props.data.lable.split('、')
  keyword.value = props.data.keyword.split('、')
})
</script>

<template>
  <div class="articleCard">
    <div class="CardItem">
      <div class="Header">
        <nuxt-link :to="'/article/' + data.article_id" class="titleLink">
          <h3>
            {{ data.title }}
          </h3>
        </nuxt-link>
        <nuxt-link :to="'/editor/cag/' + data.article_id" class="action">
          <el-icon :size="25">
            <Edit />
          </el-icon>
        </nuxt-link>
      </div>
      <div class="contentArea">
        <div
          class="ArticleCoverImg"
          v-if="
            props.data.cover_img !== 'undefined' && props.data.cover_img !== ''
          "
        >
          <img :src="data.cover_img" alt="文章配图" class="ArticleImg" />
        </div>
        <div class="ArticleContent">
          {{ data.content }}
        </div>
      </div>
      <div class="ActionBtn">
        <div class="Usertag">
          <div class="lableItem">
            标签：
            <el-tag size="small" v-for="(item, index) in lable" :key="index">{{
              item
            }}</el-tag>
          </div>
          <div class="keywordItem">
            关键词：
            <el-tag
              size="small"
              v-for="(item, index) in keyword"
              :key="index"
              >{{ item }}</el-tag
            >
          </div>
        </div>
        <div class="UserDataNum">
          <span>阅读数：{{ data.read_num }}</span>
          <span>点赞数：{{ data.goodNum }}</span>
          <span>收藏数：{{ data.collectNum }}</span>
          <span>分享数：{{ data.collectNum }}</span>
        </div>
      </div>
      <div class="user">
        <span class="name">作者：{{ data.username }}</span>
        <span class="putTime">发布于：{{ data.pub_date }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.CardItem {
  width: 35vw;
  height: auto;
  background-color: #fff;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
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

.user {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding: 2.5px 5px;
  background-color: #0b56c6;
  color: white;
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
}

.lableItem,
.keywordItem {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  flex-wrap: wrap;
  margin: 2.5px 0;
}

.lableItem,
.keywordItem {
  > span {
    margin-right: 5px;
    font-size: 0.6rem;
  }
}

.ArticleCoverImg {
  width: 180px;
  height: 75px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
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

</style>
