<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
// eslint-disable-next-line @typescript-eslint/quotes
import zhHans from 'bytemd/locales/zh_Hans.json'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Editor, Viewer } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/juejin.min.css'
import 'highlight.js/styles/default.css'

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'set',
  },
})
// 渲染md的插件
const plugins = ref([
  gfm(),
  highlight(),
  gemoji(),
  frontmatter(),
  breaks(),
  footnotes(),
  mediumZoom(),
])
const mdContent = ref('')
const emit = defineEmits(['cagEditorData'])

const handleChange = (v: string): void => {
  mdContent.value = v
  if (mdContent.value !== '' && mdContent.value !== props.content) {
    emit('cagEditorData', mdContent.value)
  }
}
onMounted(() => {
  if (props.type === 'set') {
    mdContent.value = props.content
  } else {
    mdContent.value = JSON.parse(props.content).data
  }
})
</script>
<template>
  <Editor
    class="mdEditor"
    :locale="zhHans"
    :value="mdContent"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<style lang="less" scoped>
:deep(.bytemd) {
  height: calc(100vh - 120px);
  z-index: 999;
}
</style>
