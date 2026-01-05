<template>
  <div class="DefaultLayout">
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
