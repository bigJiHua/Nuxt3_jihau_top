<script setup lang="ts"></script>

<template>
  <div class="RightBox">
    <!-- <RightMMe class="RightMoudle"></RightMMe> -->
    <RightMNotifyList />
    <el-affix :offset="60">
      <div class="icpArea RightArea">
        <RightMToolBox />
        <RightMArticleList />
        <RightMIcp/>
      </div>
    </el-affix>
  </div>
</template>

<style lang="less" scoped>
.RightMoudle {
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
}
.RightBox {
  width: 100%;
}
</style>
