<template>
  <div class="DefaultLayout">
    <keepAlive>
      <Header></Header>
    </keepAlive>
    <div class="body">
      <slot />
    </div>
  </div>
  <Backtop></Backtop>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.DefaultLayout {
  background-color: #edf1f5;
}

.body {
  padding: 60px 0 0 0;
}
</style>
