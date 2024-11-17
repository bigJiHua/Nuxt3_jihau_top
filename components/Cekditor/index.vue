<template>
  <div id="Cekditor" name="content"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const props = defineProps<{
  content: {
    type: string
    default: ''
  }
  type: {
    type: string
    default: 'set'
  }
}>()
const ckeditor = ref<any>(null)
const emit = defineEmits(['cagEditorData'])
const editorValue = ref('')

onMounted(() => {
  const script = document.createElement('script')
  script.src = '/ckeditor/ckeditor.js' // 外部脚本的路径
  script.type = 'text/javascript'
  script.defer = true // 确保脚本在 DOM 完全加载后执行
  document.head.appendChild(script)

  script.onload = () => {
    // 渲染编辑器
    ckeditor.value = window.CKEDITOR.replace('Cekditor', { height: '450px' })
    ckeditor.value.setData(props.content)
    // 监听同步
    let Count = 0
    ckeditor.value.on('change', (e: any) => {
      Count += 1
      editorValue.value = e.editor.getData()
      if (props.type.type === 'set' && Count >= 120) {
        setTimeout(() => {
          emit('cagEditorData', editorValue.value)
        }, 200)
        Count = 0
      } else {
        setTimeout(() => {
          emit('cagEditorData', editorValue.value)
        }, 2500)
      }
    })
    // 开启同步模式 如果模式不为改
    if (props.type.type !== 'cag') {
      const get = setInterval(() => {
        ckeditor.value.setData(props.content)
      }, 200)
      setTimeout(() => {
        clearInterval(get)
      }, 800)
    }
  }
  script.onerror = (error) => {
    console.error('Failed to load CKEditor script', error)
  }
})

watch(
  () => props.content,
  (newValue: string) => {
    if (newValue !== ckeditor.value.getData()) {
      ckeditor.value.setData(newValue)
    }
  }
)

onBeforeUnmount(() => {
  // 销毁编辑器
  ckeditor.value.destroy()
})
</script>

<style scoped>
:deep(#cke_Cekditor) {
  height: calc(100vh - 200px);
}
</style>
