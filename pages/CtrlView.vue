<script setup lang="ts">
definePageMeta({
  layout: 'ctrl-view'
})
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(()=>{
  router.push('/CtrlView/Users');
})
</script>

<template>
  <div class="CtrlViewArea">
    <NuxtPage />
  </div>
</template>

<style lang="less" scoped>
.CtrlViewArea {
  width: 100vw;
  height: calc(100vh - 60px);
}
</style>
