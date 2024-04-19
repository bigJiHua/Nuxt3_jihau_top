<script setup lang="ts">
import GetUData from '@/api/User'
import { useRouter } from 'vue-router'
const router = useRouter()
definePageMeta({
  layout: 'space-view',
})
const user: Ref<string> = ref(
  router.currentRoute.value.params.id
) as Ref<string>
const FllowLIst: Ref<any> = ref([]) as Ref<any>
const haveData: Ref<boolean> = ref(true)
// 获取粉丝列表
const getRelation = async (Num: string): Promise<void> => {
  const { data: res } = await GetUData.getUserRelationData(
    user.value,
    'conlist',
    Num
  )
  FllowLIst.value = res.data.conlist
  haveData.value = FllowLIst.value.length !== 0
}
onMounted(() => {
  void getRelation('0')
})
</script>

<template>
  <h3>他的关注</h3>
  <div class="flowListBox" v-if="haveData">
    <div v-for="(item, index) in FllowLIst" :key="index">
      <ArticlePageCard :item="item"></ArticlePageCard>
    </div>
  </div>
  <el-empty v-else>
    <template #description> 空空如也 没有关注</template>
  </el-empty>
</template>

<style lang="less" scoped>
.flowListBox {
  overflow: hidden;
}
</style>
