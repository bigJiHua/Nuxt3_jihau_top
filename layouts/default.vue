<template>
  <div class="DefaultLayout">
    <Header></Header>
    <div class="body flex">
      <slot/>
    </div>
  </div>
  <Backtop></Backtop>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.body{
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
