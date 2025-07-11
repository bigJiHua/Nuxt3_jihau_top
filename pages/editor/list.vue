<script setup lang="ts">
import getArtDataApi from '@/api/CtrlMenu'
definePageMeta({
  layout: 'ctrl-view',
})
const MyArticleListData: Ref<any[]> = ref([])
const AllNum: Ref<number> = ref(0)
const getArticle = async (num: number): Promise<void> => {
  if (num === 0) num = 0
  const { data: res } = await getArtDataApi.UsergetArticle(num)
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
useHead({
  title: '我的文章',
  meta: [
    {
      name: 'keywords',
      content:
        'JiHua,jihua,JiHua的Web和JS开发数据,JiHua的Web和JS开发数据,个人网站,C语言程序,Web语言,个人网站搭建',
    },
    {
      name: 'description',
      content:
        'jihua的Web和js开发数据，一个神奇的个人网站，里面展现个人魅力，程序设计语言站点导航，以及软件使用方法和事件处理方法，包括但不限于C语言、C语言程序设计书籍、题型、作品等，网页逐渐搭建，不断更新中。一个神奇的个人网站！里面将有超多的内容知识。',
    },
  ],
})
onMounted(() => {
  void getArticle(0)
})
</script>

<template>
  <div class="MyArticleList" v-if="MyArticleListData.length > 0">
    <div class="ArticleListArea">
      <ArticleListCard
        v-for="(item, index) in MyArticleListData"
        :key="index"
        :data="item"
      />
    </div>
    <div class="pagBtnArea">
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
  <div class="MyArticleList" v-else><el-empty description="暂无文章" /></div>
</template>

<style lang="less" scoped>
.MyArticleList {
  height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

.pagBtnArea {
  display: flex;
  justify-content: center;
  padding: 5px;
}

.ArticleListArea {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: calc(100vh - 100px);
  justify-content: center;
  align-items: flex-start;
}

@media screen and (max-width: 755px) {
  .MyArticleList {
    width: 95vw;
    margin: 0 auto;
  }
  .ArticleListArea {
    height: 85vh;
  }
  .pagBtnArea {
    position: fixed;
    bottom: 20px;
    width: 100%;
    left: 0;
    background-color: #fff;
  }
}

.MyArticleList::-webkit-scrollbar {
  display: none;
}
</style>
