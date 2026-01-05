<script lang="ts" setup>
import { User, Document, MessageBox } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu :router="true" default-active="/Users">
    <el-menu-item index="/Users">
      <el-icon><User /></el-icon>
      <span>我的信息</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>文章</span>
      </template>
      <el-menu-item-group title="数据">
        <el-menu-item index="/editor/list">我的文章</el-menu-item>
        <el-menu-item index="/editor/gallery">图片资源</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="编辑">
        <el-menu-item index="/editor">发布文章</el-menu-item>
        <el-menu-item index="/editor/wait">草稿箱</el-menu-item>
        <el-menu-item index="/editor/cag">修改文章</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="/Users/msg">
      <el-icon><MessageBox /></el-icon>
      <span>我的通知</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.CollapseBox {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
:deep(.el-radio-button__inner) {
  background-color: #ecf5ff;
  border: 1px solid #a0cfff;
  color: #409eff;
}
</style>
