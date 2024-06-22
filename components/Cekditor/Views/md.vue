<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { Viewer } from '@bytemd/vue-next'
import zhHans from "bytemd/locales/zh_Hans.json"
import 'juejin-markdown-themes/dist/simplicity-green.min.css'
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
const data = JSON.parse(props.content).data
// 渲染md的插件
const plugins = ref([
  gfm(),
  highlight(),
  gemoji(),
  frontmatter(),
  breaks(),
  footnotes(),
  mediumZoom()
])
</script>

<template>
  <Viewer class="markdown-body" :tabindex="2" :sanitize="23" :value="data" :plugins="plugins" :locale="zhHans">
  </Viewer>
</template>

<style lang="less" scoped></style>
