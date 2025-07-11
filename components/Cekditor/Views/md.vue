<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { Viewer } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import { ref, onMounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
const data = JSON.parse(props.content).data
// 渲染 md 的插件
const plugins = ref([
  gfm(),
  highlight(),
  gemoji(),
  frontmatter(),
  breaks(),
  footnotes(),
  mediumZoom(),
])
// 动态创建/更新 link 标签来加载 CSS 文件
const loadTheme = (theme: string, type: string = 'css'): void => {
  if (type === 'code' && theme === undefined) theme = 'default'
  if (theme === '' || (theme === undefined && type === 'css')) theme = 'simplicity-green'
  const label = type === 'css' ? 'dynamic-theme' : 'dynamic-code'
  let link = document.getElementById(`${label}`) as HTMLLinkElement | null
  if (!link) {
    // 创建新的 link 标签
    link = document.createElement('link')
    link.id = label
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  // 设置 link 的 href 指向新的 CSS 文件
  link.href =
    type === 'css'
      ? `/css/file/${theme}.min.css`
      : `/css/code/styles/${theme}.css`
  // 保存到 localStorage
  localStorage.removeItem('theme')
}

// // 页面加载时加载存储的主题
onMounted(() => {
  loadTheme(JSON.parse(props.content).theme)
  loadTheme(JSON.parse(props.content).codeTheme, 'code')
})
</script>

<template>
  <!-- Markdown Viewer组件 -->
  <Viewer
    class="markdown-body"
    :tabindex="2"
    :value="data"
    :plugins="plugins"
    :locale="zhHans"
  />
</template>
