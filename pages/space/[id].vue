<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <h1>{{ $route.params.id }}</h1>
</template>

<style lang="less" scoped></style>
