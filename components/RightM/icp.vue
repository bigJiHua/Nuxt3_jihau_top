<template>
  <div id="" class="footer">
    <div id="icp">
      <p class="icp_alt">
        <img :src="reqConfig.LogoPic" alt="站点logo" width="30" height="26" />
        <a href="https://beian.miit.gov.cn" rel="noreferrer" target="_blank">{{
          reqConfig.icpNumber
        }}</a>
      </p>
      <p class="icp_alt">
        <img :src="reqConfig.gaPic" alt="公安备案ICON" width="25" height="25" />
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=00000000000000"
          rel="noreferrer"
          target="_blank"
          >{{ reqConfig.gaNumber }}</a
        >
      </p>
      <p class="icp_alt">
        Power By &nbsp;<a href="http://github.com/bigjihua">BigJiHua</a>
      </p>
      <p class="icp_alt icp_alt3">
        <span>© 2021-{{ new Date().getFullYear() }} | &nbsp;</span>
        <NuxtLink to="/Notify/YSZC">隐私政策</NuxtLink> | &nbsp;
        <NuxtLink to="/feedback/sitemap">站点导航</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.footer {
  text-align: center;
  color: #99a2b4;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
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
.icp_alt {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 5px 0;
  > img {
    margin-right: 5px;
  }
  > a {
    font-size: 0.85rem;
  }
}
.icp_alt3 {
  flex-wrap: wrap;
}
</style>
