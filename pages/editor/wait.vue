<script setup lang="ts">
import getArtDataApi from "@/api/CtrlMenu";
definePageMeta({
  layout: "ctrl-view",
});
const MyArticleListData: Ref<any[]> = ref([]);
const AllNum: Ref<number> = ref(0);
const NullData: Ref<boolean> = ref(false);
const getArticle = async (num: number): Promise<void> => {
  if (num === 0) num = 0;
  MyArticleListData.value = [];
  const { data: res } = await getArtDataApi.UsergetArticle(num, 2);
  MyArticleListData.value = [...res.data];
  AllNum.value = res.Num;
  if (res.data.length === 0) {
    NullData.value = true;
  }
};

// 上一页
const prevNum = (num: number): void => {
  void getArticle((num - 1) * 10);
};
// 数字
const pagerNum = (num: number): void => {
  void getArticle((num - 1) * 10);
};
// 下一页
const nextNum = (num: number): void => {
  void getArticle((num - 1) * 10);
};
useHead({
  title: "我的待发布文章",
});
onMounted(() => {
  void getArticle(0);
});
</script>

<template>
  <div class="MyArticleList" v-if="MyArticleListData.length > 0">
    <div class="NullData" v-if="!MyArticleListData">
      <el-empty description="暂无草稿数据">
        <nuxt-link to="/editor">发布文章</nuxt-link>
      </el-empty>
    </div>
    <div class="ArticleListArea" v-else>
      <ArticleListCard
        v-for="(item, index) in MyArticleListData"
        :key="index"
        :data="item"
        :title="item.state === 1 ? '被驳回' : item.state === 2 ? '待发布' : '已发布'"
        :type="item.state === 1 ? 'EColor' : 'WColor'"
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
  <div class="MyArticleList" v-else>
    <el-empty description="暂无文章" />
  </div>
</template>

<style lang="less" scoped>
.MyArticleList {
  width: calc(100vw - 60px);
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
