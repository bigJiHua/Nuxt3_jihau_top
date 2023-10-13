<script setup lang="ts">
import { User, Document, MessageBox, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <client-only>
    <el-menu default-active="2" class="el-menu-vertical-demo CtrlAside">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <User />
          </el-icon>
          <span>个人设置</span>
        </template>
        <el-menu-item-group title="阅览">
          <el-menu-item index="1-1">我的空间</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="编辑">
          <el-menu-item index="1-2">修改信息</el-menu-item>
          <el-menu-item index="1-3">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title><el-icon>
            <Document />
          </el-icon>
          <span>文章</span>
        </template>
        <el-menu-item-group title="数据">
          <el-menu-item index="2-1">我的文章</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="编辑">
          <el-menu-item index="2-2">发布文章</el-menu-item>
          <el-menu-item index="2-3">修改文章</el-menu-item>
          <el-menu-item index="2-34">草稿箱</el-menu-item>
          <el-menu-item index="2-5">回收站</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon>
            <MessageBox />
          </el-icon>
          <span>我的</span>
        </template>
        <el-menu-item-group title="数据">
          <el-menu-item index="2-1">我的喜欢</el-menu-item>
          <el-menu-item index="2-2">我的收藏</el-menu-item>
          <el-menu-item index="2-3">我的评论</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon>
          <Setting />
        </el-icon>
        <span>个性设置</span>
      </el-menu-item>
    </el-menu>
  </client-only>
</template>

<style lang="less" scoped>
.CtrlAside {
  height: 100%;
  width: 100%
}
</style>
