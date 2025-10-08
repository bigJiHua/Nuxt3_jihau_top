<script setup lang="ts">
import { useRouter } from 'vue-router'
definePageMeta({
  layout: 'space-view',
})
const router = useRouter()
const id = ref(router.currentRoute.value.params.id as string)
onMounted((): any => {
  if (!id.value) return router.push('/space')
  void router.push(`/space/${id.value}/article`)
})
</script>
<template>
  <div>Welcome to /space</div>
</template>

<style lang="less" scoped></style>
