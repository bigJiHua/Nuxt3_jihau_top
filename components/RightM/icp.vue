<template>
  <div id="" class="footer">
    <div id="icp">
      <p>
        <img src="https://jihau.top/img/logo.png" alt="站点logo" width="30" height="25" />
        ICP备案号:<a href="https://beian.miit.gov.cn">桂ICP备123456</a>
      </p>
      <p class="icp_alt">
        Power By <a href="http://github.com/bigjihua">BigJiHua</a> | <NuxtLink to="/Notify/YSZC">隐私政策</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less">
.footer {
  text-align: center;
  color: #99a2b4;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  border-radius: 5px;
  padding: 10px;

  .top {
    right: 15px;
    position: fixed;
    bottom: 100px;
    z-index: 99;
    width: 50px;
    height: auto;
    text-align: center;
    cursor: pointer;
  }

  .nonetop {
    display: none;
  }
}
</style>
