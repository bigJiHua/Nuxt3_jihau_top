<template>
  <div class="EditorArea" :id="id" name="content"></div>
</template>

<script setup lang="ts">
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
const id = 'Cekditor';
const ckeditor = ref<any>(null);
const emit = defineEmits(['cagEditorData'])
const editorValue = ref('')

// 开启同步模式 如果模式不为改
if (props.type !== 'cag') {
  const get = setInterval(() => {
    ckeditor.value.setData(props.content);
  }, 200);
  setTimeout(() => {
    clearInterval(get);
  }, 800);
}

onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    //@ts-ignore
    const CKEDITOR: any = window.CKEDITOR;
    // 渲染编辑器
    if (CKEDITOR) {
      ckeditor.value = CKEDITOR.replace(id, { height: '450px' });
      ckeditor.value.setData(props.content);
      // 监听同步
      let Count = 0
      ckeditor.value.on('change', (e: any) => {
        Count += 1
        editorValue.value = e.editor.getData()
        if (props.type === 'set' && Count >= 120) {
          setTimeout(() => {
            emit('cagEditorData', editorValue.value);
          }, 200);
          Count = 0
        } else {
          setTimeout(() => {
            emit('cagEditorData', editorValue.value);
          }, 2500);
        }
      })
    }
  }
});

watch(() => props.content, (newValue: string) => {
  if (newValue !== ckeditor.value.getData()) {
    ckeditor.value.setData(newValue);
  }
});

onBeforeUnmount(() => {
  // 销毁编辑器
  ckeditor.value.destroy();
});

</script>

<style scoped>
:deep(#cke_Cekditor) {
  height: calc(100vh - 200px);
}
</style>
