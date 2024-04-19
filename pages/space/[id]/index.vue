<script setup lang="ts">
import { useRouter } from 'vue-router'
definePageMeta({
  layout: 'space-view',
})
const router = useRouter()
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  void router.push(`/space/${router.currentRoute.value.params.id}/article`)
})
</script>
<template>
  <el-empty>
    <template #description> 空空如也 暂未开发</template>
  </el-empty>
</template>

<style lang="less" scoped></style>
