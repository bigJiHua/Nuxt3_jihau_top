<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import { useRouter } from '#vue-router'
import postArticleApi from '@/api/CtrlMenu'
const router = useRouter()
definePageMeta({
  layout: 'ctrl-view',
})
const elContent = ref('') // 备份修改之前的
const isTrue = ref(false)
const isAutoSafe = ref(false) // 自动保存
const isMd = ref(true) // 切换编辑器
const showPanel = ref(true) // 面板开关
const isLoading = ref(true) // 是否加载中
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
  isMd: true, // 默认是markdown编辑器
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
// 当前选中的主题
const selectedTheme = ref('nico')
const selectedCodeTheme = ref('googlecode')
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/css/file/nico.min.css',
      id: 'dynamic-theme',
    },
    {
      rel: 'stylesheet',
      href: '/css/code/styles/googlecode.css',
      id: 'dynamic-code',
    },
  ],
  title: '正在发布文章',
})

// 同步子组件对服务组件的数据
const cagEditorData = (cagData: string): void => {
  if (cagData === '') return
  // 备份之前的内容
  elContent.value = editorData.value.content
  // 如果数据产生了变化
  if (editorData.value.content !== cagData) {
    editorData.value.content = cagData
    // 如果开启了自动保存
    if (isAutoSafe.value) {
      void AutoSaveEditor()
    }
    isTrue.value = true
  }
  setTimeout(() => {
    isTrue.value = false
  }, 500)
}
// 自动保存编辑器内容
const AutoSaveEditor = async (): Promise<void> => {
  if (
    process.env.NODE_ENV === 'development' &&
    editorData.value.content !== ''
  ) {
    localStorage.setItem('setArtData', JSON.stringify(editorData.value))
  }
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
    editorData.value.isMd = true
  } else if (await WarningTips('你确定要切换成富文本编辑器吗？')) {
    isMd.value = false
    editorData.value.isMd = false
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
        theme: selectedTheme.value,
        codeTheme: selectedCodeTheme.value,
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
// 样式名称数组
const themes = [
  'simplicity-green',
  'arknights',
  'awesome-green',
  'channing-cyan',
  'Chinese-red',
  'condensed-night-purple',
  'cyanosis',
  'devui-blue',
  'fancy',
  'geek-black',
  'github',
  'greenwillow',
  'healer-readable',
  'hydrogen',
  'juejin',
  'jzman',
  'mk-cute',
  'nico',
  'orange',
  'qklhk-chocolate',
  'scrolls-light',
  'serene-rose',
  'smartblue',
  'v-green',
  'vue-pro',
  'vuepress',
  'z-blue',
]
const codeTheme = [
  'a11y-dark',
  'a11y-light',
  'agate',
  'an-old-hope',
  'androidstudio',
  'arduino-light',
  'arta',
  'ascetic',
  'atom-one-dark-reasonable',
  'atom-one-dark',
  'atom-one-light',
  'brown-paper',
  'codepen-embed',
  'color-brewer',
  'dark',
  'default',
  'devibeans',
  'docco',
  'far',
  'felipec',
  'foundation',
  'github-dark-dimmed',
  'github-dark',
  'github',
  'gml',
  'googlecode',
  'gradient-dark',
  'gradient-light',
  'grayscale',
  'hybrid',
  'idea',
  'intellij-light',
  'ir-black',
  'isbl-editor-dark',
  'isbl-editor-light',
  'kimbie-dark',
  'kimbie-light',
  'lightfair',
  'lioshi',
  'magula',
  'mono-blue',
  'monokai-sublime',
  'monokai',
  'night-owl',
  'nnfx-dark',
  'nnfx-light',
  'nord',
  'obsidian',
  'paraiso-dark',
  'paraiso-light',
  'pojoaque',
  'purebasic',
  'qtcreator-dark',
  'qtcreator-light',
  'rainbow',
  'routeros',
  'school-book',
  'shades-of-purple',
  'srcery',
  'stackoverflow-dark',
  'stackoverflow-light',
  'sunburst',
  'tokyo-night-dark',
  'tokyo-night-light',
  'tomorrow-night-blue',
  'tomorrow-night-bright',
  'vs',
  'vs2015',
  'xcode',
  'xt256',
]
// 动态创建/更新 link 标签来加载 CSS 文件
// 默认type为txt则文档主题样式 如果不是则加载 Code高亮样式
const loadTheme = (theme: string, type: string = 'css'): void => {
  if (theme === '' || (theme === undefined && type === 'css'))
    theme = 'simplicity-green'
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
// 切换主题时调用
const onThemeChange = (theme: string, type: string = 'css'): void => {
  if (type === 'css') selectedTheme.value = theme
  else selectedCodeTheme.value = theme
  loadTheme(theme, type)
}

onMounted(async () => {
  if (process.client) {
    try {
      // 监测本地是否有数据
      const locData = JSON.parse(localStorage.getItem('setArtData') as string)
      if (locData.content !== '') {
        isLoading.value = true
        if (
          await WarningTips(
            '检测到本地存在历史文章数据，确认加载吗？还是取消删除'
          )
        ) {
          const locData = JSON.parse(
            localStorage.getItem('setArtData') as string
          )
          editorData.value = locData
          isMd.value = locData.isMd
          isAutoSafe.value = true
          isLoading.value = false
        } else {
          localStorage.removeItem('setArtData')
          ElMessage({
            message: '删除成功！',
            type: 'success',
          })
        }
      } else {
        localStorage.removeItem('setArtData')
        isLoading.value = false
      }
    } catch (error) {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <div class="postArticleArea">
    <div class="HeaderBox">
      <el-button type="danger" plain @click="deleteEditor"
        >我不想写了</el-button
      >
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
      <div class="phone-item1">
        自动保存到本地：<el-switch
          v-model="isAutoSafe"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
      <!-- Select框切换主题 -->
      <div class="SelectThemeBox" v-if="isMd">
        <div>
          <el-button type="primary" plain disabled>主题</el-button>
          <el-select
            v-model="selectedTheme"
            placeholder="选择样式"
            @change="onThemeChange"
          >
            <el-option
              v-for="theme in themes"
              :key="theme"
              :label="theme"
              :value="theme"
            />
          </el-select>
        </div>
        <div>
          <el-button type="primary" plain disabled>Code样式</el-button>
          <el-select
            v-model="selectedCodeTheme"
            placeholder="选择样式"
            @change="onThemeChange(selectedCodeTheme, 'code')"
          >
            <el-option
              v-for="theme in codeTheme"
              :key="theme"
              :label="theme"
              :value="theme"
            />
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="PostNewArticle()">发布</el-button>
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
              <b>标题</b><span style="color: red">*</span>---设置文章标题
            </template>
            <el-input v-model="editorData.title" maxlength="30" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <b>标签</b
              ><span style="color: red">*</span>---设置文章标签(以中文顿号分隔)
            </template>
            <el-input v-model="editorData.lable" maxlength="30" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <b>关键词</b
              ><span style="color: red">*</span
              >---设置文章关键词(以中文顿号分隔)
            </template>
            <el-input v-model="editorData.keyword" maxlength="30" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <b>文章描述</b><span style="color: red">*</span>---设置文章描述
            </template>
            <el-input v-model="editorData.describes" maxlength="50" />
          </el-form-item>
          <el-form-item>
            <template #label> <b>封面</b>---设置文章封面(可选) </template>
            <el-input v-model="editorData.cover_img" maxlength="255" />
          </el-form-item>
        </el-form>
        <div class="cover_img" v-show="editorData.cover_img">
          <img :src="editorData.cover_img" alt="Cover_img" />
        </div>
        <p><span style="color: red">*</span>为必填项</p>
        <p><span style="color: red">注意：</span>标签关键词用中文顿号间隔！</p>
        <p v-if="isMd">
          不喜欢MarkDown？<el-button
            type="primary"
            @click="ChangeEditormd(false)"
            >切换编辑器</el-button
          >
        </p>
        <p v-else>
          不喜欢富文本?<el-button type="primary" @click="ChangeEditormd(true)"
            >切换编辑器</el-button
          >
        </p>
        <span style="font-size: 1em; color: red"
          >⚠正在编辑时 切换编辑器 内容 会出现错乱，请谨慎操作！</span
        >
        <!-- 输入 状态 -->
        <el-button type="success" :icon="Check" circle v-show="isTrue" />
      </div>
      <div class="EditorArea" v-if="!isMd">
        <Cekditor
          :content="editorData.content"
          @cagEditorData="cagEditorData"
          :type="'set'"
        />
      </div>
      <div class="EditorArea" v-else>
        <CekditorMd
          v-if="!isLoading"
          :content="editorData.content"
          @cagEditorData="cagEditorData"
          :type="'set'"
        />
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
  margin: 5px;
  padding: 5px;
  background-color: #ffffff;
  height: calc(100vh - 130px);
  overflow: scroll;
}
.ArticleDataPanel::-webkit-scrollbar {
  display: none;
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

.SelectThemeBox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }
  > div > .el-select {
    width: 10vw;
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
    width: 100vw;
    box-sizing: content-box;
    position: relative;

    .postBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 2.5px 5px 2.5px;

      > button {
        float: none;
      }
    }

    > :deep(.el-button):last-child {
      float: right;
      margin: 10px;
      width: 98%;
    }
  }
  .SelectThemeBox {
    margin: 10px 0 0 0;
    justify-content: space-between;
    padding: 0 5px;
    > div > .el-select {
      width: 25vw;
    }
  }
}

:deep(.el-form-item__label) {
  font-size: 0.75rem;
}
</style>
