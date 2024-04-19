<script setup lang="ts">
import { useRouter } from 'vue-router'
definePageMeta({
  layout: 'ctrl-view'
})
const router = useRouter()
onMounted(() => {
  void router.push('/Users')
})
</script>

<template>
  <div></div>
  <!-- <h1>系统设置</h1> -->
  <!-- 暂未开发 -->
</template>

<style lang="less" scoped></style>
