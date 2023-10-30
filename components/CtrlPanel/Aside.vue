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
        <nuxt-link to="/Users">我的信息</nuxt-link>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title><el-icon>
            <Document />
          </el-icon>
          <span>文章</span>
        </template>
        <el-menu-item-group title="数据">
          <nuxt-link to="/editor/list"><el-menu-item index="2-1">我的文章</el-menu-item></nuxt-link>
          <nuxt-link to="/editor/gallery"><el-menu-item index="2-2">图片资源</el-menu-item></nuxt-link>
        </el-menu-item-group>
        <el-menu-item-group title="编辑">
          <nuxt-link to="/editor"><el-menu-item index="2-3">发布文章</el-menu-item></nuxt-link>
          <nuxt-link to="/editor/wait"><el-menu-item index="2-4">草稿箱</el-menu-item></nuxt-link>
          <nuxt-link to="/editor/cag"><el-menu-item index="2-5">修改文章</el-menu-item></nuxt-link>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon>
            <MessageBox />
          </el-icon>
          <span>我的</span>
        </template>
        <el-menu-item-group title="数据">
          <nuxt-link to="/my"><el-menu-item index="3-1">我的消息</el-menu-item></nuxt-link>
          <nuxt-link to="/my/like"><el-menu-item index="3-2">我的喜欢</el-menu-item></nuxt-link>
          <nuxt-link to="/my/collect"><el-menu-item index="3-3">我的收藏</el-menu-item></nuxt-link>
          <nuxt-link to="/my/comment"><el-menu-item index="3-4">我的评论</el-menu-item></nuxt-link>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon>
          <Setting />
        </el-icon>
        <nuxt-link to="/my/setting"><el-menu-item index="4-1">个性设置</el-menu-item></nuxt-link>
      </el-menu-item>
    </el-menu>
  </client-only>
</template>

<style lang="less" scoped>
.CtrlAside {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.CtrlAside::-webkit-scrollbar {
  display: none;
}
</style>
