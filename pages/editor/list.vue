<script setup lang="ts">
import getArtDataApi from '@/api/CtrlMenu'
definePageMeta({
  layout: 'ctrl-view'
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
onMounted(() => {
  void getArticle(0)
})
</script>

<template>
  <div class="MyArticleList">
    <div class="ArticleListArea">
      <ArticleForMyCard v-for="(item, index) in MyArticleListData" :key="index" :data="item" />
    </div>
    <div class="pagBtnArea">
      <el-pagination background layout="prev, pager, next" :total="AllNum" @current-change="prevNum"
        @prev-click="pagerNum" @next-click="nextNum" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.MyArticleList {
  width: calc(100vw - 200px);
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
    height: 88vh;
  }
}

.MyArticleList::-webkit-scrollbar {
  display: none;
}
</style>
