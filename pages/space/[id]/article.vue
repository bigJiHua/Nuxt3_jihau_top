<script setup lang="ts">
import getArtDataApi from '@/api/Space'
import { useRouter } from 'vue-router'
import { View, Star, Share } from '@element-plus/icons-vue'
import { useUserDataStore } from '@/stores/useUserData'
definePageMeta({
  layout: 'space-view',
})
const router = useRouter()
const user: Ref<string> = ref(
  router.currentRoute.value.params.id
) as Ref<string>
const MyArticleListData: Ref<any[]> = ref([])
const AllNum: Ref<number> = ref(0)
const loading = ref(false)
const isend = ref(false)
// 每次获取10条文章
const getArticle = async (num: number): Promise<void> => {
  const { data: res } = await getArtDataApi.UsergetArticle(num, user.value)
  if (res.data.length === 0) {
    isend.value = true
    loading.value = false
    return
  }
  if (num !== 0) {
    setTimeout(() => {
      AllNum.value = res.Num
      loading.value = false
      MyArticleListData.value = [...MyArticleListData.value, ...res.data]
    }, 800)
  } else {
    AllNum.value = res.Num
    MyArticleListData.value = [...MyArticleListData.value, ...res.data]
  }
}
// 下一页
const pageNum: Ref<number> = ref(1)
const store = useUserDataStore()
// 监听登录
const isLogin = ref(false)
const StoreisLogin = computed(() => store.isLogin)
watch(
  StoreisLogin,
  (newVal) => {
    if (newVal) {
      isLogin.value = true
    } else {
      isLogin.value = false
    }
  },
  { immediate: true }
)
const nextNum = (): void => {
  if (isend.value) return
  pageNum.value++
  loading.value = true
  if (pageNum.value > 3 && !isLogin.value) {
    loading.value = false
    ElMessage.warning('欲知更多，请先登录!')
    return
  }
  void getArticle((pageNum.value - 1) * 10)
}

onMounted(() => {
  void getArticle(0)
})
</script>

<template>
  <div class="SpaceArticleList" v-if="AllNum !== 0">
    <h3>他的文章</h3>
    <SpaceItemArticleCard :articleList="MyArticleListData"></SpaceItemArticleCard>
    <div class="pagBtnArea" v-if="!(AllNum <= 10)">
      <div @click="nextNum" class="btn" v-loading="loading">
        {{ isend ? '没有更多了' : '加载更多...' }}
      </div>
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
.btn {
  padding: 10px;
  text-align: center;
  cursor: pointer; /* 小手样式 */
  text-decoration: none;
}
</style>
