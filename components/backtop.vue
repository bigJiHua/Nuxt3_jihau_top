<script setup lang="ts">
const right = ref(35)
onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    if (window.screenX > 765) {
      right.value = 100
    }
  }
})
</script>

<template>
  <el-backtop :right="right" :bottom="100" />
</template>

<style lang="less" scoped></style>
