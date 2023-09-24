<template>
  <h1>event ID : {{ $route.params.id }}</h1>
  <nuxt-link to="/">HOME</nuxt-link>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less" scoped></style>
