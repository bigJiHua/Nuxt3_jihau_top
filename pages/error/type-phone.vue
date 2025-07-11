<template>
  <div class="errorPage">
    <div class="demo1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="demo2">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="demo3">
      <div></div>
      <div></div>
    </div>
    <div class="demo4">
      <div class="demo4-1">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="demo4-2"></div>
    </div>
  </div>
  <div class="errorText">
    <div class="centerBox">
      <p class="code">404</p>
      <p class="tips">这就是你想要的错误页面！移动端展示</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pagedf',
})

useHead({
  title: '移动端错误页面测试页面',
  meta: [
    {
      name: 'keywords',
      content: '站点测试、JiHua、jihau.top、测试页面',
    },
    {
      name: 'description',
      content: '这是jihau_top网站的移动端测试页面，欢迎您访问此网站！',
    },
  ],
})
</script>

<style lang="less" scoped>
.demo1 {
  display: flex;

  > div {
    height: 70vh;
    width: calc(100vw / 7);
  }

  > div:nth-child(1) {
    background-color: white;
  }

  > div:nth-child(2) {
    background-color: yellow;
  }

  > div:nth-child(3) {
    background-color: aqua;
  }

  > div:nth-child(4) {
    background-color: lawngreen;
  }

  > div:nth-child(5) {
    background-color: fuchsia;
  }

  > div:nth-child(6) {
    background-color: red;
  }

  > div:nth-child(7) {
    background-color: blue;
  }
}

.demo2 {
  display: flex;

  > div {
    height: 10vh;
    width: calc(100vw / 7);
  }

  > div:nth-child(7) {
    background-color: white;
  }

  > div:nth-child(6) {
    background-color: black;
  }

  > div:nth-child(5) {
    background-color: aqua;
  }

  > div:nth-child(4) {
    background-color: red;
  }

  > div:nth-child(3) {
    background-color: yellow;
  }

  > div:nth-child(2) {
    background-color: fuchsia;
  }

  > div:nth-child(1) {
    background-color: blue;
  }
}

.demo3 {
  display: flex;

  > div {
    width: 50vw;
    height: 10vh;
  }

  > div:nth-child(1) {
    background: linear-gradient(to right, white, black);
  }

  > div:nth-child(2) {
    background: linear-gradient(
      to right,
      red,
      yellow,
      lawngreen,
      aqua,
      blue,
      magenta
    );
  }
}

.demo4 {
  display: flex;

  > div {
    width: 50vw;
    height: 10vh;
  }

  > .demo4-1 {
    display: flex;

    > div {
      width: calc(50vw / 12);
    }
  }

  .demo4-1 > div:nth-child(1) {
    background-color: rgb(0, 0, 0);
  }

  .demo4-1 > div:nth-child(2) {
    background-color: rgb(36, 36, 36);
  }

  .demo4-1 > div:nth-child(3) {
    background-color: rgb(55, 55, 55);
  }

  .demo4-1 > div:nth-child(4) {
    background-color: rgb(75, 75, 75);
  }

  .demo4-1 > div:nth-child(5) {
    background-color: rgb(93, 92, 93);
  }

  .demo4-1 > div:nth-child(6) {
    background-color: rgb(115, 115, 115);
  }

  .demo4-1 > div:nth-child(7) {
    background-color: rgb(128, 128, 128);
  }

  .demo4-1 > div:nth-child(8) {
    background-color: rgb(155, 155, 155);
  }

  .demo4-1 > div:nth-child(9) {
    background-color: rgb(179, 179, 179);
  }

  .demo4-1 > div:nth-child(10) {
    background-color: rgb(204, 204, 204);
  }

  .demo4-1 > div:nth-child(11) {
    background-color: rgb(230, 230, 230);
  }

  .demo4-1 > div:nth-child(12) {
    background-color: rgb(255, 255, 255);
  }

  > div:nth-child(2) {
    background-color: black;
  }
}

.errorText {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(244, 244, 244, 0.368);
  text-align: center;

  .centerBox {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(206, 28, 28);
    .code {
      font-size: 10rem;
    }
    .tips {
      font-size: 1rem;
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.927);
      display: inline-block;
      padding: 10px;
    }
  }
}
</style>
