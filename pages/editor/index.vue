<script setup lang="ts">
import { useRouter } from '#vue-router';
const router = useRouter()
useHead({
  script: [{
    src: '/ckeditor/ckeditor.js'
  }]
})
definePageMeta({
  layout: 'ctrl-view',
})
const editorData = ref({
  title: '',
  lable: '',
  keyword: '',
  cover_img: '',
  content: '',
})
const elContent = ref('') // 备份修改之前的
const isTrue = ref(false)
const isAutoSafe = ref(false)

// 同步子组件对服务组件的数据
let setCount = 0
const cagEditorData = (cagData: string) => {
  setCount += 1
  if (cagData === '') return
  elContent.value = editorData.value.content
  if (editorData.value.content !== cagData) {
    editorData.value.content = cagData
    isTrue.value = true
    if (isAutoSafe.value === true && setCount % 10 === 0) {
      console.log('发送请求');
    }
  }
  setTimeout(() => {
    isTrue.value = false
  }, 500);
}

const deleteEditor = async (): Promise<void> => {
  if (await ElMessageBoxTips.WarningTips('你确定不保存该文本吗？(可以选择上传草稿') === 'true') {
    editorData.value = {
      title: '',
      lable: '',
      keyword: '',
      cover_img: '',
      content: '',
    }
    router.push('/editor/list')
  }
}
onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log(window.CKEDITOR);
  }
})
</script>

<template>
  <div class="editor-container">
    <div class="ArticleDataPanel">
      <div>
        是否开启自动存草稿：<el-switch v-model="isAutoSafe" class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </div>
      <el-form :label-position="'top'" label-width="100px" :model="editorData" style="max-width: 460px">
        <el-form-item>
          <template #label>
            标题<span style="color: red;">*</span>---设置文章标题
          </template>
          <el-input v-model="editorData.title" />
        </el-form-item>
        <el-form-item>
          <template #label>
            标签<span style="color: red;">*</span>---设置文章标签(以中文顿号分隔)
          </template>
          <el-input v-model="editorData.lable" />
        </el-form-item>
        <el-form-item>
          <template #label>
            关键词<span style="color: red;">*</span>---设置文章关键词(以中文顿号分隔)
          </template>
          <el-input v-model="editorData.keyword" />
        </el-form-item>
        <el-form-item>
          <template #label>
            文章描述<span style="color: red;">*</span>---设置文章描述(可选)
          </template>
          <el-input v-model="editorData.keyword" />
        </el-form-item>
        <el-form-item>
          <template #label>
            封面---设置文章封面(可选)
          </template>
          <el-input v-model="editorData.cover_img" />
        </el-form-item>
      </el-form>
      <div class="ActivityBtn">
        <el-button type="primary" plain>发布</el-button>
        <el-button type="success" plain>存草稿</el-button>
        <el-button type="danger" plain @click="deleteEditor">删除</el-button>
      </div>
      <p><span style="color: red;">*</span>为必填项</p>
      <p><span style="color: red;">注意：</span>标签关键词用中文顿号间隔！</p>
      <nuxt-link to="/editor/md">
        不喜欢富文本？<el-button type="primary">切换编辑器</el-button>
      </nuxt-link>
    </div>
    <div id="EditorArea">
      <Cekditor :content="editorData.content" @cagEditorData="cagEditorData" :type="'set'"></Cekditor>
      <div class="ShowStateBox">
        <el-button type="success" v-if="isTrue">接收</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
}

.ArticleDataPanel {
  flex: 1;
  width: 20vw;
  margin: 10px;
  padding: 5px;
  background-color: #ffffff;
}

.ActivityBtn {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

#EditorArea {
  flex: 3;
  height: 100%;
  background-color: #ffffff;
}

.ShowStateBox {
  padding: 5px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
}

@media screen and(max-width: 755px) {
  .ArticleDataPanel {
    width: 95vw;
    margin: 0 auto;
  }

  .editor-container {
    display: block;
    overflow: scroll;
  }
}
</style>
