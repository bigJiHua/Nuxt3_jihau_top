
<script setup lang="ts">
const isSHow = ref(false)
onMounted(() => {
  if (window.innerWidth > 756) {
    isSHow.value = true
  }
  window.onresize = () => {
    if (window.innerWidth > 756) {
      isSHow.value = true
    }
  }
})
</script>
<template>
  <div class="CtrlViewLayout">
    <div class="common-layout body">
      <el-container class="mainArea">
        <el-header style="padding: 0;background-color: white; ">
          <Header></Header>
        </el-header>
        <el-container>
          <el-aside class="menu" width="200px" v-if="isSHow">
            <CtrlPanelAside></CtrlPanelAside>
          </el-aside>
          <el-main class="main">
            <slot />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
  <Backtop></Backtop>
</template>

<style lang="less" scoped>
.CtrlViewLayout {
  background-color: #edf1f5;
}

.body {
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
}

.mainArea {
  height: 100%;
  width: 100%;
}
.main {
  padding: 0;
}
.menu {
  position: relative;
}
</style>
