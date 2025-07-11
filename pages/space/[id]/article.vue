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
  const { data: res } = await getArtDataApi.UsergetArticle(num, user.value)
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
    <h3>他的文章</h3>
    <SpaceItemCard :articleList="MyArticleListData"></SpaceItemCard>
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
.pagBtnArea {
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>
