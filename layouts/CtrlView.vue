<template>
  <div class="CtrlViewLayout">
    <HeaderCtrl></HeaderCtrl>
    <div class="body">
      <slot/>
    </div>
  </div>
  <Backtop></Backtop>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.CtrlViewLayout{
  background-color: #edf1f5;
}
.body {
  padding: 60px 0 0 0;
}
</style>
