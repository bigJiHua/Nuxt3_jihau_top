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
const loading = ref(false)
const isend = ref(false)

const getArticle = async (num: number): Promise<void> => {
  if (num === 0) num = 0
  await getArtDataApi
    .UsergetCollect(num, user.value)
    .then((res) => {
      if (res.data.data.length === 0) {
        isend.value = true
        loading.value = false
        return
      }
      if (num !== 0) {
        setTimeout(() => {
          AllNum.value = res.Num
          loading.value = false
          MyArticleListData.value = [
            ...MyArticleListData.value,
            ...res.data.data
          ]
        }, 800)
      } else {
        AllNum.value = res.Num
        MyArticleListData.value = [...MyArticleListData.value, ...res.data.data]
      }
    })
    .catch((err) => {
      if (err.data.status === 403) {
        msg.value = '由于用户设置了隐私权限 您无权查看'
        MyArticleListData.value = []
      }
    })
}

// 下一页
const pageNum: Ref<number> = ref(1)
const nextNum = (): void => {
  if (isend.value) return
  pageNum.value++
  loading.value = true
  void getArticle((pageNum.value - 1) * 10)
}

onMounted(() => {
  void getArticle(0)
})
</script>

<template>
  <div class="SpaceArticleList" v-if="AllNum !== 0">
    <h3>他的收藏</h3>
    <SpaceItemArticleCard :articleList="MyArticleListData"></SpaceItemArticleCard>
    <div class="pagBtnArea" v-if="!(AllNum <= 10)">
      <div @click="nextNum" class="btn" v-loading="loading">
        {{ isend ? '没有更多了' : '加载更多...' }}
      </div>
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
.btn {
  padding: 10px;
  text-align: center;
  cursor: pointer; /* 小手样式 */
  text-decoration: none;
}
</style>
