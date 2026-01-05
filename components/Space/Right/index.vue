<script setup lang="ts">
interface DataProps {
  istop: boolean
}
const props = defineProps<DataProps>()
</script>

<template>
  <!-- 使用 transition 包裹 v-show 的组件 -->
  <transition name="fade-slide" mode="out-in">
    <SpaceRightUserCard v-show="props.istop" key="user-card" />
  </transition>
  <RightMIcp />
</template>

<style lang="less" scoped>
/* 定义过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease; /* 可以调节时间和缓动效果 */
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px); /* 初始向上偏移 */
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* 消失时向上偏移 */
}
</style>
