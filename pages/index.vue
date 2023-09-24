<template>
  <h1 class="pts">这是首页</h1>
  <NuxtLink to="/">HOME</NuxtLink>
  <NuxtLink to="/articles/123">ARTICLES</NuxtLink>
  <NuxtLink to="/event/123">EVENT</NuxtLink>
  <NuxtLink to="/custom">CUSTOM</NuxtLink>
  <Header></Header>
  <HeaderCtrl></HeaderCtrl>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
  <!-- 共享状态 -->
  <Counter />
  <h1>{{ res.api }}</h1>
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
