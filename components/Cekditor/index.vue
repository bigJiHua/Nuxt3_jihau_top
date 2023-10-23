<template>
  <div class="EditorArea" :id="id" name="content"></div>
</template>

<script setup lang="ts">
useHead({
  script: [{
    src: '/ckeditor/ckeditor.js'
  }]
})
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

// 开启同步模式 如果模式不为改
if (props.type !== 'cag') {
  const get = setInterval(() => {
    ckeditor.value.setData(props.content);
  }, 200);
  setTimeout(() => {
    clearInterval(get);
  }, 800);
}
setInterval(() => {
  if (ckeditor.value.getData() && ckeditor.value.getData() !== '' && ckeditor.value.getData() !== props.content) {
    emit('cagEditorData', ckeditor.value.getData())
  }
}, 800)

onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    //@ts-ignore
    const CKEDITOR: any = window.CKEDITOR;
    // 渲染编辑器
    if (CKEDITOR) {
      ckeditor.value = CKEDITOR.replace(id, { height: '500px' });
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
  height: calc(100vh - 200px) !important;
}
</style>
