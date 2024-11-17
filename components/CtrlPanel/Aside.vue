<script setup lang="ts">
import { User, Document, MessageBox, Setting } from '@element-plus/icons-vue'
const isCollapse = ref('280px')
</script>

<template>
  <el-radio-group v-model="isCollapse" class="CollapseBox">
    <el-radio-button :value="'280px'" v-if="isCollapse === '100px'"
      >展开</el-radio-button
    >
    <el-radio-button :value="'100px'" v-else>收缩</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="1"
    :width="isCollapse"
    class="el-menu-vertical-demo CtrlAside"
    :collapse="isCollapse === '100px'"
  >
    <el-menu-item index="1">
      <el-icon
        ><nuxt-link to="/Users"> <User /></nuxt-link>
      </el-icon>
      <template #title
        ><span><nuxt-link to="/Users">我的信息</nuxt-link></span></template
      >
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title
        ><el-icon>
          <Document />
        </el-icon>
        <span>文章</span>
      </template>
      <el-menu-item-group title="数据">
        <nuxt-link to="/editor/list"
          ><el-menu-item index="2-1">我的文章</el-menu-item></nuxt-link
        >
        <nuxt-link to="/editor/gallery"
          ><el-menu-item index="2-2">图片资源</el-menu-item></nuxt-link
        >
      </el-menu-item-group>
      <el-menu-item-group title="编辑">
        <nuxt-link to="/editor"
          ><el-menu-item index="2-3">发布文章</el-menu-item></nuxt-link
        >
        <nuxt-link to="/editor/wait"
          ><el-menu-item index="2-4">草稿箱</el-menu-item></nuxt-link
        >
        <nuxt-link to="/editor/cag"
          ><el-menu-item index="2-5">修改文章</el-menu-item></nuxt-link
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon>
        <nuxt-link to="/Users/msg"><MessageBox /></nuxt-link>
      </el-icon>
      <template #title
        ><span><nuxt-link to="/Users/msg">我的通知</nuxt-link></span></template
      >
    </el-menu-item>
    <!-- 先不做开发 -->
    <!-- <el-menu-item index="4">
        <el-icon>
          <Setting />
        </el-icon>
        <nuxt-link to="/Users/setting">个性设置</nuxt-link>
      </el-menu-item> -->
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
  background-color: #ECF5FF;
  border: 1px solid #A0CFFF;
  color: #409eff;
}
</style>
