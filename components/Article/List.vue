<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const isdemo = ref(false)
const ifcov = computed(() => {
  if (props.data.cover_img.match(/^http/)) {
    return true
  }
  return false
})
// 分享
const ShareBox = async () => {
  const copyw = `https://jihau.top/article/${props.data.article_id}`
  if (process.env.NODE_ENV === 'development') {
    navigator.clipboard.writeText(copyw).then(
      () => {
        ElNotification({
          title: '成功',
          message: '已成功将链接复制到剪贴板！',
          type: 'success',
        })
      },
      () => {
        ElNotification({
          title: '失败',
          message: '分享失败，无法将文章链接复制到剪贴板',
          type: 'warning',
        })
      }
    )
  } else {
    ElNotification({
      title: '错误！',
      message: '分享失败，无法将文章链接复制到剪贴板',
      type: 'error',
    })
  }

}
onMounted(() => {
  setTimeout(() => {
    isdemo.value = true
  }, 200);
})
</script>

<template>
  <div :class="[{ article_demo: isdemo, article_demos: !isdemo }, 'article_item']">
    <p class="article_doc_title">
      <nuxt-link class="togolink" :to="{ path: '/article/' + data.article_id }">
        {{ data.title }}
      </nuxt-link>
    </p>
    <div class="article_area">
      <div class="article_img" v-if="ifcov">
        <img class="article_img_item" :src="data.cover_img" />
      </div>
      <div class="article_doc">
        <nuxt-link class="article_doc_txt togolink" :to="{ path: '/article/' + data.article_id }">
          {{ data.content }}
        </nuxt-link>
      </div>
    </div>
    <div class="artmethod">
      <!-- 分享面板 -->
      <div class="shareBox">
        <nuxt-link :to="'/article/' + data.article_id"><el-button type="primary" text
            class="Gobutton">阅读</el-button></nuxt-link>
        <el-button type="primary" text class="Gobutton" @click="ShareBox">分享</el-button>
      </div>
      <div class="article_span_time">
        <span>作者：<nuxt-link :to="{ path: '/space/' + data.username }">{{ data.username }}</nuxt-link></span>
        &nbsp;
        <span>时间：{{ data.pub_date }}</span>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.artmethod {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.article_item {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  max-height: 226px;
  padding: 8px;
  top: 10px;
}

.togolink {
  color: rgba(0, 0, 0, 0.692);
  text-decoration: none;
}

.article_area {
  margin: 10px;
}

.article_doc_title>a {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: '微软雅黑';
}

.article_doc {
  width: 100%;
  overflow: hidden;
}

.shareBox {
  background-color: rgb(230, 240, 253);
  border-radius: 5px;
  display: flex;
  align-content: center;
}

.article_span_time {
  bottom: 2px;
  right: 8px;
  color: rgb(40, 109, 212);
  font-style: italic;
  font-weight: bolder;
  font-size: 0.8rem;
}
.article_demos {
  opacity: 0;
}
.article_demo {
  animation: identifier-6f9b9245 0.8s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes identifier {
  0% {
    margin-top: 80px;
    opacity: 0;
  }

  100% {
    margin-top: 8px;
    opacity: 1;
  }
}



@media only screen and (min-width: 755px) {
  .article_area {
    display: flex;
    padding-left: 10px;
  }

  .article_img {
    width: 150px;
    height: 80px;
    overflow: hidden;
    border-radius: 5px;
  }

  .article_img_item {
    width: 100%;
    height: 100%;
  }

  .article_doc {
    flex: 1;
    padding: 0 10px;

    .article_doc_txt {
      text-indent: 3rem;
      font-size: 1rem;
      overflow: hidden;
    }

  }

  /* 文章动效 */
  .article_img_item:hover {
    transform: scale(1.35);
    transition: 1s;
  }

  .right_btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .artmethod {
    padding: 0 20px;
  }
}

@media only screen and (max-width: 755px) {

  /* 最新文章 */
  .article_box {
    position: relative;
  }

  .article_area {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .article_img {
    padding: 0 6px;
    height: 75px;
    width: 200px;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 10px;
  }

  .article_img_item {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .article_doc {
    max-height: 100px;
    min-width: 50%;
    overflow: hidden;
  }

  .article_doc_title>a {
    font-size: 1.5rem;
    font-weight: bolder;
    font-family: '微软雅黑';
  }

  .article_doc_txt {
    text-indent: 1rem;
    font-size: 1.2rem;
    overflow: hidden;
  }


  .article_span_time {
    font-size: 0.8rem;
  }

  /* 文章动效 */
  .article_img_item:hover {
    transform: scale(1.35);
    transition: 1s;
  }

  .article_item {
    padding: 8px;
  }
}
</style>

