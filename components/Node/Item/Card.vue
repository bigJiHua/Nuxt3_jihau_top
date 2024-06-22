<script setup lang="ts">
import {
  CircleCheckFilled,
  WarningFilled,
  InfoFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-confusing-void-expression
const props: any = defineProps({
  title: {
    type: String,
    default: '',
    required: true
  },
  type: {
    type: String,
    default: 'IColor',
    required: true
  }
})
</script>

<template>
  <div :class="type">
    <el-icon class="icon">
      <CircleCheckFilled v-if="type === 'SColor'" />
      <WarningFilled v-if="type === 'WColor'" />
      <CircleCloseFilled v-if="type === 'EColor'" />
      <InfoFilled v-if="type === 'IColor'" />
    </el-icon>
    <span>{{ title }}</span>
  </div>
</template>

<style lang="less" scoped>
.SColor {
  padding: 2.5px 5px;
  background-color: #e5ffec;
  display: flex;
  align-items: center;
  color: #007929;
  font-size: 10px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  .icon {
    padding: 0 1px;
  }
}
.WColor {
  padding: 2.5px 5px;
  background-color: #fff9d9;
  display: flex;
  align-items: center;
  color: #b99b00;
  font-size: 10px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  .icon {
    padding: 0 1px;
  }
}
.EColor {
  padding: 2.5px 5px;
  background-color: #ffdcdc;
  display: flex;
  align-items: center;
  color: #f56c6c;
  font-size: 10px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  .icon {
    padding: 0 1px;
  }
}
.IColor {
  padding: 2.5px 5px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  color: #474747;
  font-size: 10px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  .icon {
    padding: 0 1px;
  }
}
</style>
