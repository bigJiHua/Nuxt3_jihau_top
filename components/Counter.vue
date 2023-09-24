<template>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
</template>

<script setup lang="ts">
const counter = useCounter()
</script>

<style lang="less" scoped>
</style>
