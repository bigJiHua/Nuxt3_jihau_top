<template>
  <Editor class="mdEditor" :locale="zhHans" :value="mdContent" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import zhHans from "bytemd/locales/zh_Hans.json"
import { Editor, Viewer } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/juejin.min.css'
const emit = defineEmits(['cagEditorData'])
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'set'
  }
})
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
const selectTheme = ref(`---
theme: juejin # Markdown 主题，默认值：juejin
highlight: juejin # 代码高亮主题，默认值：juejin
# 默认设置 如不需要请删除
---
`)
const mdContent = ref(`${selectTheme.value}`)
const handleChange = (v: string) => {
  mdContent.value = v
  if (mdContent.value !== '' && mdContent.value !== props.content) {
    emit('cagEditorData', mdContent.value)
  }
}
onMounted(() => {
  console.log(props.content);
  if (props.type === 'set') {
    mdContent.value = selectTheme.value + props.content
  } else {
    mdContent.value = props.content
  }
})
</script>
<style lang="less" scoped>
:deep(.bytemd) {
  height: calc(100vh - 120px);
}
</style>