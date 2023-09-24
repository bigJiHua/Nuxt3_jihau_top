<template>
  <h1 class="pts">这是首页</h1>
</template>

<script setup lang="ts">
const { $sayHello } = useNuxtApp()
$sayHello('JiHua')
const counter = useCounter()
import { useCounterStore } from "@/stores/index"
const store = useCounterStore()
console.log(store);
const { data: res } = await useFetch('/api/hello')
console.log(toRaw(res.value));
</script>

<style lang="less" scoped></style>
