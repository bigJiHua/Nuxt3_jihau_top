<script setup lang="ts">
const istop = ref(false)
const RightBox = () => {
  const RightBox = document.querySelector('.RightArea')
  const boxHeight = document.querySelector('.RightMoudle')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (RightBox && boxHeight?.clientHeight) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const docWidth =
      document.body.clientWidth ||
      document.body.offsetWidth ||
      document.body.scrollWidth
    if (docWidth > 970) {
      if (scrollTop >= boxHeight.clientHeight) {
        istop.value = true
      }
      if (scrollTop <= boxHeight.clientHeight) {
        istop.value = false
      }
    }
  }
}
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', RightBox)
  }
})
</script>

<template>
  <div class="RightBox">
    <RightMMe class="RightMoudle"></RightMMe>
    <el-affix :offset="60">
      <div :class="['icpArea', 'RightArea', { icpAreatop: istop }]">
        <RightMArticleList></RightMArticleList>
        <RightMNotifyList></RightMNotifyList>
        <RightMIcp></RightMIcp>
      </div>
    </el-affix>
  </div>
</template>

<style lang="less" scoped>
.icpArea {
  width: 100%;
}

.RightMoudle {
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
}

@media only screen and (min-width: 755px) {
  .right_box {
    width: 25vw;
    max-width: 500px;
  }

  .icpAreatop {
    position: fixed;
    top: 56px;
    z-index: 99;
    width: 25vw;
    max-width: 439px;
    max-height: 100vh;
    overflow: scroll;
  }

  .icpAreatop::-webkit-scrollbar {
    display: none;
  }
}
</style>
