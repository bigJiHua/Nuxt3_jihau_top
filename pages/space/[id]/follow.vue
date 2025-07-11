<script setup lang="ts">
import GetUData from '@/api/User'
import { useRouter } from 'vue-router'
const router = useRouter()
definePageMeta({
  layout: 'space-view',
})
const user: any = ref(router.currentRoute.value.params.id)
const FllowLIst: Ref<any> = ref([]) as Ref<any>
const haveData: Ref<boolean> = ref(true)
const msg = ref(' 空空如也 没有关注')
// 获取粉丝列表
const getRelation = async (Num: string): Promise<void> => {
  await GetUData.getUserRelationData(user.value, 'conlist', Num)
    .then((res: any) => {
      FllowLIst.value = res.data.data.conlist
      haveData.value = FllowLIst.value.length !== 0
    })
    .catch((err: any) => {
      if (err.data.status === 403) {
        msg.value = '由于用户设置了隐私权限 您无权查看'
        haveData.value = false
      }
    })
}
onMounted(() => {
  void getRelation('0')
})
</script>

<template>
  <div class="flowListBox" v-if="haveData">
    <h3>他的关注</h3>
    <div v-for="(item, index) in FllowLIst" :key="index">
      <ArticlePageCard :item="item"></ArticlePageCard>
    </div>
  </div>
  <el-empty v-else>
    <template #description>{{ msg }}</template>
  </el-empty>
</template>

<style lang="less" scoped>
.flowListBox {
  overflow: hidden;
}
</style>
