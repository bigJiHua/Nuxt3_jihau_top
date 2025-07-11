<template>
  <div class="DefaultLayout">
    <Header></Header>
    <div class="body">
      <slot />
    </div>
  </div>
  <Backtop></Backtop>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.DefaultLayout {
  background-color: #edf1f5;
}

.body {
  padding: 0;
}
</style>
