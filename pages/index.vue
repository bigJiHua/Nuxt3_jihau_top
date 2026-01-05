<template>
  <div id="" class="center_box">
    <LeftM class="left"></LeftM>
    <RightM class="right"></RightM>
  </div>
</template>

<script setup lang="ts">
const { $sayHello } = useNuxtApp()
$sayHello('JiHua')
usePageHead('home')
</script>

<style lang="less" scoped>
// 电脑
@media only screen and (min-width: 755px) {
  .center_box {
    padding: 0;
    display: flex;
    position: relative;
    width: 70vw;
    margin: 0 auto;
    max-width: 1200px;
    justify-content: space-between;
  }

  .left {
    width: 43vw;
    max-width: 700px;
  }

  .right {
    width: calc(27vw - 20px);
    max-width: 480px;
    padding: 10px;
  }
}
// 手机
@media only screen and (max-width: 755px) {
  .center_box {
    width: 95vw;
    margin: 0 auto;
    padding: 0;
  }
}

// Ipad样式测试
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 755px) and (max-height: 768px) {
  .center_box {
    margin-top: 20px;
    padding: 0;
    display: flex;
    position: relative;
    width: 80vw;
    margin: 0 auto;
    max-width: 1200px;
  }

  .left {
    width: 53vw;
    margin-right: 2vw;
    max-width: 700px;
  }

  .right {
    width: 27vw;
  }
}
</style>
