<script setup lang="ts">
const isSHow = ref(false)
onMounted(() => {
  if (process.client) {
    if (window.innerWidth > 756) {
      isSHow.value = true
    }
    window.onresize = () => {
      if (window.innerWidth > 756) {
        isSHow.value = true
        // 暂时取消
        // location.reload()
      }
    }
  }
  //TODO 待删
  // console.log(router.currentRoute.value.path.match(/^\/CtrlView\//))
})
</script>

<template>
  <div id="HeaderBox">
    <!-- Window的Header -->
    <HeaderMenuDefalut v-if="isSHow" />
    <!-- 手机的Header -->
    <HeaderMenuCtrl v-else />
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