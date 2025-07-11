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
const msg = ref('空空如也')
const getArticle = async (num: number): Promise<void> => {
  if (num === 0) num = 0
  await getArtDataApi
    .UsergetCollect(num, user.value)
    .then((res) => {
      MyArticleListData.value = []
      MyArticleListData.value = [...res.data.data]
      AllNum.value = res.data.Num
    })
    .catch((err) => {
      if (err.data.status === 403) {
        msg.value = '由于用户设置了隐私权限 您无权查看'
        MyArticleListData.value = []
      }
    })
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
    <template #description> {{ msg }} </template>
  </el-empty>
</template>

<style lang="less" scoped>
.pagBtnArea {
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>
