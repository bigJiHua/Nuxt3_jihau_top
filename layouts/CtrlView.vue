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
  <client-only>
    <div class="CtrlViewLayout">
      <el-container>
        <el-header
          class="CtrlHeader"
          style="padding: 0; background-color: white"
        >
          <Header></Header>
        </el-header>
        <el-container class="CtrlContent">
          <el-aside class="menu" width="200px" v-if="isSHow">
            <CtrlPanelAside></CtrlPanelAside>
          </el-aside>
          <el-main class="main">
            <slot />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </client-only>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.CtrlViewLayout {
  background-color: #edf1f5;
}
.CtrlHeader {
  width: 100%;
  height: 59px;
  overflow: hidden;
}
.menu {
  width: 200px;
  height: calc(100vh - 60px);
}
.CtrlContent {
  width: 100vw;
  height: calc(100vh - 60px);
  overflow: hidden;
  box-sizing: content-box;
}
.main {
  width: calc(100vw - 202px);
  height: 100%;
  padding: 0;
  overflow: hidden;
}
@media screen and(max-width: 755px) {
  .main {
    height: 100vh;
    width: 95vw;
    margin: 0 auto;
    overflow: scroll;
  }
}
</style>
