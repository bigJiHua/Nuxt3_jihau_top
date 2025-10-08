<script setup lang="ts"></script>

<template>
  <div class="RightBox">
    <!-- <RightMMe class="RightMoudle"></RightMMe> -->
    <RightMNotifyList />
    <el-affix :offset="60">
      <div class="icpArea RightArea">
        <RightMToolBox />
        <RightMArticleList />
        <RightMIcp />
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

@media only screen and (min-width: 755px) {
  .icpArea {
    width: 25vw;
    max-width: 480px;
  }

  .right_box {
    width: 25vw;
    max-width: 480px;
  }

  .icpAreatop {
    position: fixed;
    top: 56px;
    z-index: 99;
    width: 25vw;
    max-width: 480px;
    max-height: 100vh;
    overflow: scroll;
  }

  .icpAreatop::-webkit-scrollbar {
    display: none;
  }
}
</style>
