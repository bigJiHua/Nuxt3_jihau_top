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
    <!-- 头部：标题 + 发布时间 -->
    <div class="Header">
      <nuxt-link :to="'/article/' + item.article_id" class="titleLink">
        <h3 class="article-title">{{ item.title }}</h3>
      </nuxt-link>
      <span class="putTime">{{ item.pub_date }}</span>
    </div>

    <!-- 内容区：封面图 + 文章摘要 -->
    <div class="contentArea">
      <div
        class="ArticleCoverImg"
        v-if="item.cover_img && item.cover_img !== 'undefined'"
      >
        <nuxt-link :to="'/article/' + item.article_id">
          <img :src="item.cover_img" alt="文章配图" class="ArticleImg" />
        </nuxt-link>
      </div>
      <div class="ArticleContent">
        <nuxt-link :to="'/article/' + item.article_id" class="content-link">
          <p class="content-text">{{ item.content }}</p>
        </nuxt-link>
      </div>
    </div>

    <!-- 操作区：按钮 + 数据统计 -->
    <div class="ActionBtn">
      <div class="btn-group">
        <nuxt-link :to="'/article/' + item.article_id">
          <el-button type="primary" plain class="operate-btn">阅读</el-button>
        </nuxt-link>
        <el-button
          type="primary"
          plain
          class="operate-btn"
          @click="ShareBox(item.article_id)"
        >
          分享
        </el-button>
      </div>
      <div class="UserDataNum">
        <p class="data-item">
          <el-icon size="14"><View /></el-icon>
          <span>{{ item.read_num }}</span>
        </p>
        <p class="data-item">
          <van-icon name="like-o" size="14" />
          <span>{{ item.goodNum }}</span>
        </p>
        <p class="data-item">
          <el-icon size="14"><Star /></el-icon>
          <span>{{ item.collectNum }}</span>
        </p>
        <p class="data-item">
          <el-icon size="14"><Share /></el-icon>
          <span>{{ item.share_num }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 卡片容器 - 基础样式 */
.CardItem {
  background-color: #fff;
  padding: 16px;
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(15, 77, 153, 0.15);
  transition: all 0.3s ease;
}

/* 卡片悬浮效果 */
.CardItem:hover {
  box-shadow: 0 4px 16px rgba(15, 77, 153, 0.2);
  transform: translateY(-2px);
}

/* 头部区域 */
.Header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 改为flex-start，避免标题和时间基线不对齐 */
  border-bottom: 1px solid #f5f7fa;
  margin-bottom: 12px;
}

.article-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.titleLink {
  color: #333;
  text-decoration: none;
}

.titleLink:hover {
  color: #286dd4;
}

.putTime {
  color: #999;
  font-size: 12px;
  white-space: nowrap; /* 防止时间换行 */
}

/* 内容区域 */
.contentArea {
  display: flex;
  align-items: center;
  gap: 12px; /* 用gap替代margin，间距更均匀 */
  margin-bottom: 16px;
  flex-wrap: wrap; /* 移动端自动换行 */
}

.ArticleCoverImg {
  width: 120px; /* 调整封面图尺寸，更协调 */
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0; /* 防止图片被挤压 */
}

.ArticleImg {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例，避免拉伸 */
  transition: transform 0.3s ease;
}

.ArticleCoverImg:hover .ArticleImg {
  transform: scale(1.05); /* 图片悬浮放大效果 */
}

.ArticleContent {
  flex: 1; /* 占满剩余空间 */
  min-width: 0; /* 防止内容溢出 */
}

.content-link {
  color: #666;
  text-decoration: none;
}

.content-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 最多显示2行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all; /* 自动换行 */
}

/* 操作按钮区域 */
.ActionBtn {
  display: flex;
  justify-content: space-between; /* 按钮和数据左右分布 */
  align-items: center;
  border-top: 1px solid #f5f7fa;
  flex-wrap: wrap; /* 移动端自动换行 */
  gap: 12px;
}

.btn-group {
  display: flex;
  gap: 8px; /* 按钮之间的间距 */
}

.operate-btn {
  padding: 4px 12px;
  font-size: 12px;
  height: 32px;
  border-radius: 4px;
}

.UserDataNum {
  display: flex;
  align-items: center;
  gap: 16px; /* 数据项之间的间距 */
  font-size: 12px;
  color: #666;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
}

/* 响应式适配 - 移动端 */
@media screen and (max-width: 768px) {
  .CardItem {
    padding: 12px;
    margin: 8px 0;
  }

  .article-title {
    font-size: 14px;
    max-width: 70%;
  }

  .contentArea {
    flex-direction: column; /* 移动端封面图在上，内容在下 */
    align-items: flex-start;
  }

  .ArticleCoverImg {
    width: 100%;
    height: 120px;
  }

  .ActionBtn {
    flex-direction: column; /* 移动端按钮在上，数据在下 */
    align-items: flex-start;
  }

  .UserDataNum {
    width: 100%;
    justify-content: space-around; /* 数据项均匀分布 */
  }
}
</style>