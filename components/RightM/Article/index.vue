<script setup lang="ts"></script>

<template>
  <client-only>
    <RightMUser class="RightMoudle"></RightMUser>
    <el-affix :offset="60">
      <div class="icpArea RightArea">
        <RightMArticleList></RightMArticleList>
        <RightMNotifyList></RightMNotifyList>
        <RightMIcp />
      </div>
    </el-affix>
  </client-only>
</template>

<style lang="less" scoped>
.RightMoudle {
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  box-sizing: border-box;
}

@media only screen and (min-width: 755px) {
  .RightMoudle {
    width: 25vw;
    max-width: 480px;
    padding: 10px;
  }
  .right_box {
    width: 25vw;
    max-width: 480px;
  }
  .icpArea {
    width: 25vw;
    max-width: 480px;
  }
}
</style>
