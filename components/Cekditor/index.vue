<template>
  <div id="Cekditor"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'set', // set | cag
  },
})

const emit = defineEmits<{
  (e: 'cagEditorData', value: string): void
}>()

const ckeditor = ref<any>(null)
const editorValue = ref('')

onMounted(() => {
  const script = document.createElement('script')
  script.src = '/ckeditor/ckeditor.js'
  script.type = 'text/javascript'
  script.defer = true
  document.head.appendChild(script)

  script.onload = () => {
    ckeditor.value = window.CKEDITOR.replace('Cekditor', {
      height: '450px',
    })

    // 初始化内容（只做一次）
    if (props.content) {
      ckeditor.value.setData(props.content)
      editorValue.value = props.content
    }

    // ✅ 核心：立即同步（无延迟、无节流）
    ckeditor.value.on('change', (e: any) => {
      const data = e.editor.getData()
      editorValue.value = data
      emit('cagEditorData', data)
    })
  }

  script.onerror = (err) => {
    console.error('CKEditor load failed:', err)
  }
})

onBeforeUnmount(() => {
  if (ckeditor.value) {
    ckeditor.value.destroy()
    ckeditor.value = null
  }
})
</script>

<style scoped>
:deep(#cke_Cekditor) {
  height: calc(100vh - 200px);
}
</style>
