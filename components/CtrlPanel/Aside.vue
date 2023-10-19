<script setup lang="ts">
import { User, Document, MessageBox, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <client-only>
    <el-menu default-active="1" class="el-menu-vertical-demo CtrlAside">
      <el-menu-item index="1">
          <el-icon>
            <User />
          </el-icon>
        <nuxt-link to="/CtrlView/Users">我的信息</nuxt-link>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title><el-icon>
            <Document />
          </el-icon>
          <span>文章</span>
        </template>
        <el-menu-item-group title="数据">
          <nuxt-link to="/CtrlView/Article"><el-menu-item index="2-1">我的文章</el-menu-item></nuxt-link>
        </el-menu-item-group>
        <el-menu-item-group title="编辑">
          <nuxt-link to="/CtrlView/Article/add"><el-menu-item index="2-2">发布文章</el-menu-item></nuxt-link>
          <nuxt-link to="/CtrlView/Article/cag"><el-menu-item index="2-3">修改文章</el-menu-item></nuxt-link>
          <nuxt-link to="/CtrlView/Article/wait"><el-menu-item index="2-4">草稿箱</el-menu-item></nuxt-link>
          <nuxt-link to="/CtrlView/Article/recycle"><el-menu-item index="2-5">回收站</el-menu-item></nuxt-link>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon>
            <MessageBox />
          </el-icon>
          <span>我的</span>
        </template>
        <el-menu-item-group title="数据">
          <nuxt-link to="/CtrlView/my/like"><el-menu-item index="3-1">我的喜欢</el-menu-item></nuxt-link>
          <nuxt-link to="/CtrlView/my/collect"><el-menu-item index="3-2">我的收藏</el-menu-item></nuxt-link>
          <nuxt-link to="/CtrlView/my/comment"><el-menu-item index="3-3">我的评论</el-menu-item></nuxt-link>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon>
          <Setting />
        </el-icon>
        <nuxt-link to="/CtrlView/Setting"><el-menu-item index="4-1">个性设置</el-menu-item></nuxt-link>
      </el-menu-item>
    </el-menu>
  </client-only>
</template>

<style lang="less" scoped>
.CtrlAside {
  height: calc(100vh - 60px);
  width: 100%;
  overflow: scroll;
}

.CtrlAside::-webkit-scrollbar {
  display: none;
}
</style>
