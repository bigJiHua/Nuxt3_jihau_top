<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import { useRouter } from '#vue-router'
import postArticleApi from '@/api/CtrlMenu'
const router = useRouter()
definePageMeta({
  layout: 'ctrl-view',
})
// 编辑数据
const editorData: any = ref({
  username: '',
  title: '',
  lable: '',
  keyword: '',
  cover_img: '',
  content: '',
  describes: '',
  state: 0,
  pub_date: '',
  isMd: false,
})
// 校验规则
const rules: any = reactive({
  title: {
    rule: /\S/,
    msg: '文章标题不能为空',
  },
  content: {
    rule: /.{50,}/,
    msg: '不能水文章哦！字数大于等于50！',
  },
  lable: {
    rule: /\S/,
    msg: '忘记填标签咯！',
  },
  keyword: {
    rule: /\S/,
    msg: '填一下关键字吧！',
  },
})
const elContent = ref('') // 备份修改之前的
const isTrue = ref(false)
const isAutoSafe = ref(false) // 自动保存
const isMd = ref(false) // 切换编辑器
const showPanel = ref(false) // 面板开关

// 同步子组件对服务组件的数据
const cagEditorData = (cagData: string): void => {
  if (cagData === '') return
  elContent.value = editorData.value.content
  if (editorData.value.content !== cagData) {
    editorData.value.content = cagData
    isTrue.value = true
  }
  setTimeout(() => {
    isTrue.value = false
  }, 500)
}
// 清空当前所有编辑
const deleteEditor = async (): Promise<void> => {
  if (await WarningTips('你确定不保存该文本吗？(可以选择上传草稿')) {
    editorData.value = {
      username: '',
      title: '',
      lable: '',
      keyword: '',
      cover_img: '',
      content: '',
      describes: '',
      state: 0,
      pub_date: '',
    }
    void router.push('/editor/list')
  }
}
// 切换编辑器
const ChangeEditormd = async (isChange: boolean): Promise<void> => {
  if (isChange && (await WarningTips('你确定要切换成markdown编辑器吗？'))) {
    isMd.value = true
  } else if (await WarningTips('你确定要切换成富文本编辑器吗？')) {
    isMd.value = false
  }
}
// 发布文章
const PostNewArticle = async (isSet?: boolean): Promise<void> => {
  let push = 0
  for (const key in rules) {
    if (validata(key)) {
      push += 1
    }
  }
  showPanel.value = true
  isAutoSafe.value = false
  if (push === Object.keys(rules).length) {
    editorData.value.isMd = isMd.value
    editorData.value.username = localStorage.getItem('Username')
    if (isMd.value) {
      editorData.value.content = JSON.stringify({
        data: editorData.value.content,
      })
    }
    if (isSet) editorData.value.state = '2'
    const { data: res } = await postArticleApi.UseraddArticle(editorData.value)
    if (res.status === 200) {
      editorData.value = {
        username: '',
        title: '',
        lable: '',
        keyword: '',
        cover_img: '',
        content: '',
        describes: '',
        state: 0,
        pub_date: '',
      }
      localStorage.removeItem('setArtData')
      setTimeout(() => {
        if (!isSet) {
          void router.push('/article/' + res.article)
        } else {
          void router.push('/editor/wait')
        }
      }, 500)
    }
  }
}
// 校验规则
const validata = (key: string): boolean => {
  let bool = true
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!rules[key].rule.test(editorData.value[key])) {
    ElMessage({
      message: rules[key].msg,
      type: 'error',
    })
    bool = false
  }
  return bool
}
// 自动保存到本地
setInterval(() => {
  if (isAutoSafe.value) {
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('setArtData', JSON.stringify(editorData.value))
      isTrue.value = true
      setTimeout(() => {
        isTrue.value = false
      }, 200)
    }
  }
}, 2500)

onMounted(async () => {
  if (process.client) {
    // 监测本地是否有数据
    if (localStorage.getItem('setArtData') !== null) {
      if (
        await WarningTips(
          '检测到本地存在历史文章数据，确认加载吗？还是取消删除'
        )
      ) {
        editorData.value = JSON.parse(
          localStorage.getItem('setArtData') as string
        )
        isAutoSafe.value = true
      } else {
        localStorage.removeItem('setArtData')
        if (localStorage.getItem('setArtData') === null) {
          ElMessage({
            message: '删除成功！',
            type: 'success',
          })
        }
      }
    }
  }
})
</script>

<template>
  <div class="postArticleArea">
    <div class="HeaderBox">
      <div class="itemBox">
        <el-button type="danger" plain @click="deleteEditor">删除</el-button>
        <el-button type="success" plain @click="PostNewArticle(true)"
          >存草稿</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="!showPanel"
          @click="showPanel = true"
          >展开面板</el-button
        >
        <el-button type="primary" plain v-else @click="showPanel = false"
          >关闭面板</el-button
        >
        <div class="phone-none">
          备份保存到本地：<el-switch
            v-model="isAutoSafe"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </div>
      </div>
      <div class="postBtn">
        <div class="window-none">
          自动存草稿：<el-switch
            v-model="isAutoSafe"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </div>
        <el-button type="success" :icon="Check" circle v-show="isTrue" />
        <el-button type="primary" @click="PostNewArticle()">发布</el-button>
      </div>
    </div>
    <div class="editor-container">
      <div class="ArticleDataPanel" v-show="showPanel">
        <el-form
          :label-position="'top'"
          label-width="100px"
          :model="editorData"
          style="max-width: 460px"
        >
          <el-form-item>
            <template #label>
              标题<span style="color: red">*</span>---设置文章标题
            </template>
            <el-input v-model="editorData.title" />
          </el-form-item>
          <el-form-item>
            <template #label>
              标签<span style="color: red">*</span
              >---设置文章标签(以中文顿号分隔)
            </template>
            <el-input v-model="editorData.lable" />
          </el-form-item>
          <el-form-item>
            <template #label>
              关键词<span style="color: red">*</span
              >---设置文章关键词(以中文顿号分隔)
            </template>
            <el-input v-model="editorData.keyword" />
          </el-form-item>
          <el-form-item>
            <template #label>
              文章描述<span style="color: red">*</span>---设置文章描述(可选)
            </template>
            <el-input v-model="editorData.describes" />
          </el-form-item>
          <el-form-item>
            <template #label> 封面---设置文章封面(可选) </template>
            <el-input v-model="editorData.cover_img" />
          </el-form-item>
        </el-form>
        <dev class="cover_img" v-show="editorData.cover_img">
          <img :src="editorData.cover_img" alt="Cover_img" />
        </dev>
        <p><span style="color: red">*</span>为必填项</p>
        <p><span style="color: red">注意：</span>标签关键词用中文顿号间隔！</p>
        <p v-if="!isMd">
          不喜欢富文本？<el-button type="primary" @click="ChangeEditormd(true)"
            >切换编辑器</el-button
          >
        </p>
        <p v-else>
          不喜欢MarkDown？<el-button
            type="primary"
            @click="ChangeEditormd(false)"
            >切换编辑器</el-button
          >
        </p>
      </div>
      <div class="EditorArea" v-if="!isMd">
        <ClientOnly>
          <Cekditor
            :content="editorData.content"
            @cagEditorData="cagEditorData"
            :type="'set'"
          />
        </ClientOnly>
      </div>
      <div class="EditorArea" v-else>
        <ClientOnly>
          <CekditorMd
            :content="editorData.content"
            @cagEditorData="cagEditorData"
            :type="'set'"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.postArticleArea {
  padding: 5px;
}

.HeaderBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
}

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

.itemBox {
  flex: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.postBtn {
  flex: 1;

  > button:last-child {
    float: right;
  }
}

.EditorArea {
  flex: 3;
  height: calc(100vh - 110px);
  background-color: #ffffff;
}

.cover_img {
  > img {
    width: 100%;
    height: 90px;
  }
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

  .HeaderBox {
    display: block;
    padding: 0;

    .postBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 2.5px 5px 2.5px;

      > button {
        float: none;
      }
    }
  }
}
</style>
