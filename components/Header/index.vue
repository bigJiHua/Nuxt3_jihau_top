<script setup lang="ts">
</script>

<template>
  <div id="HeaderBox">
    <!-- Window的Header -->
    <HeaderMenuDefalut class="phone-none"/>
    <!-- 手机的Header -->
    <HeaderMenuCtrl class="window-none" />
  </div>
</template>

<style lang="less" scoped>
#HeaderBox {
  width: 100vw;
  height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 999;
}

a {
  text-decoration: none;
  color: gray;
}
</style>
