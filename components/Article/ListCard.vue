<script setup lang="ts">
import { View, Star, Share, Edit } from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: 'SColor'
  },
  title: {
    type: String,
    default: '已推送'
  }
})
</script>

<template>
  <div class="articleDetail">
    <h3 class="title">
      <nuxt-link :to="'/article/' + data.article_id">{{ data.title }}</nuxt-link>
    </h3>
    <p class="Tip">
      <NodeItemCard :title="title" :type="type" />
      <span class="Pillar">|</span>
      <span>发布于{{ data.pub_date }}</span>
    </p>
    <p class="articleCount">
      <span
        ><el-icon class="icon"><View /></el-icon>{{ data.read_num }}</span
      >
      <span><van-icon class="icon" name="like-o" />{{ data.goodNum }}</span>
      <span
        ><el-icon class="icon"><Star /></el-icon>{{ data.collectNum }}</span
      >
      <span
        ><el-icon class="icon"><Share /></el-icon>{{ data.share_num }}</span
      >
    </p>
    <div class="lableItem">
      标签：
      <el-tag
        size="small"
        v-for="(item, index) in props.data.lable.split('、')"
        :key="index"
        >{{ item }}</el-tag
      >
    </div>
    <div class="keywordItem">
      关键词：
      <el-tag
        size="small"
        v-for="(item, index) in props.data.keyword.split('、')"
        :key="index"
        >{{ item }}</el-tag
      >
    </div>
    <div class="content">
      文章描述: <span> {{ data.content }}</span>...
    </div>
    <nuxt-link :to="'/editor/cag/' + data.article_id" class="action">
      <el-icon :size="15">
        <Edit />
      </el-icon>
    </nuxt-link>
  </div>
</template>

<style lang="less" scoped>
@media screen and (min-width: 755px) { 
  .articleDetail {
    width: 300px;
  }
}
@media screen and (max-width: 755px) { 
  .articleDetail {
    width: 100%;
  }
}
.articleDetail {
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
  background-color: #ffffffc5;
  font-size: 0.8rem;
  box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  .title {
    padding: 5px 0;
    a {
      color: rgba(0, 0, 0, 0.68);
    }
  }
  .Tip {
    display: flex;
    align-items: center;
    .Pillar {
      display: inline-block;
      margin: 0 5px;
    }
    span {
      font-size: 0.7rem;
    }
  }
  .articleCount,
  .lableItem,
  .keywordItem {
    margin: 3px 0;
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
  }
  .articleCount {
    span {
      display: inline-block;
      margin-right: 15px;
    }
    .icon {
      margin-right: 3px;
    }
  }
  .lableItem,
  .keywordItem {
    span {
      letter-spacing: 1px;
      font-size: 10px;
      margin: 0 3px;
      padding: 0 2px;
    }
  }
  .content {
    span {
      font-size: 0.6rem;
    }
  }
}
.action {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
