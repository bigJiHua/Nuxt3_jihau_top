<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useRouter } from '#vue-router'
import postArticleApi from '@/api/CtrlMenu'
definePageMeta({
  layout: 'ctrl-view',
})
// 编辑数据
const editorData: any = ref({
  id: '',
  username: '',
  title: '',
  content: '',
  cover_img: '',
  lable: '',
  keyword: '',
  article_id: '',
  describes: '',
  state: 0,
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
const router = useRouter()
const elContent = ref('') // 备份修改之前的
const isTrue = ref(false) // 接收数据
const isMd = ref(false) // 切换编辑器
const isget = ref(false) // 是否渲染组件
const searchId = ref('') // 搜索ID
// 当前选中的主题
const selectedTheme = ref('simplicity-green')
const selectedCodeTheme = ref('default')
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/css/file/simplicity-green.min.css',
      id: 'dynamic-theme',
    },
    {
      rel: 'stylesheet',
      href: '/css/code/styles/default.css',
      id: 'dynamic-code',
    },
  ],
  title: '正在修改 ' + router.currentRoute.value.params.id,
})

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
  if (await WarningTips('你确定要删除这篇文章吗？')) {
    if (editorData.value.id === '') {
      ElMessage({
        message: 'ID 获取失败 无法执行删除该文章！',
        type: 'warning',
      })
      return
    }
    const { data: res } = await postArticleApi.UserdelArticle(
      editorData.value.id
    )
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
      setTimeout(() => {
        router.push('/editor/list')
      }, 500)
    }
  }
}
// 重新发布文章
const PostNewArticle = async (isDraft: boolean | number): Promise<void> => {
  if (isDraft === true && editorData.value.state === 0) {
    if (await WarningTips('你确定要保存为草稿吗？')) {
      editorData.value.state = '2'
    } else return
  } else if (parseInt(editorData.value.state) !== 0 && !isDraft) {
    if (await WarningTips('准备好发布了吗？')) {
      editorData.value.state = '0'
    } else return
  } else if (isDraft === 1) {
    if (await WarningTips('准备好更新该文章了吗？')) {
      editorData.value.state = '0'
    } else return
  }
  // 校验数据完整性
  let push = 0
  for (const key in rules) {
    if (validata(key)) {
      push += 1
    }
  }
  if (push === Object.keys(rules).length) {
    // 如果是md
    if (isMd.value) {
      editorData.value.content = JSON.stringify({
        data: editorData.value.content,
        theme: selectedTheme.value,
        codeTheme: selectedCodeTheme.value,
      })
    }
    const { data: res } = await postArticleApi.UsercagArticle(editorData.value)
    if (res.status === 200) {
      setTimeout(() => {
        void router.push('/editor/list')
      }, 500)
    }
  }
}
// 获取文章内容
const getArticle = async (queryId: string): Promise<void> => {
  await postArticleApi
    .UsergetArticleData(queryId)
    .then((respone) => {
      const { data: res } = respone
      if (res.status === 200 && res !== undefined) {
        void router.replace('/editor/cag/' + queryId)
        editorData.value = { ...res.data.article }
        // if (/\bmd[A-Z0-9]+\b/g.test(queryId)) isMd.value = true
        // 匹配md开头
        if (/^md.*/i.test(queryId)) isMd.value = true
        isget.value = true
        // 在得到数据时展示现有的主题
        if (isMd.value) {
          selectedTheme.value =
            JSON.parse(editorData.value.content).theme !== undefined
              ? JSON.parse(editorData.value.content).theme
              : 'simplicity-green'
          selectedCodeTheme.value =
            JSON.parse(editorData.value.content).codeTheme !== undefined
              ? JSON.parse(editorData.value.content).codeTheme
              : 'default'
          loadTheme(JSON.parse(editorData.value.content).theme)
        }
        searchId.value = ''
      }
    })
    .catch(() => {
      isget.value = true
      void router.push('/editor/cag/')
    })
}
// 获取文章
const searchArticle = async (): Promise<void> => {
  const regexID = /^.{4,15}$/.test(searchId.value)
  if (searchId.value === '' || !regexID) {
    ElMessage({
      message: '非法 ID',
      type: 'error',
    })
  } else {
    void getArticle(searchId.value)
  }
}
// 校验规则
const validata = (key: string): Boolean => {
  let bool = true
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
const loadTheme = (theme: string, type: string = 'css'): void => {
  if (type === 'code' && theme === undefined) theme = 'default'
  if (theme === '' || (theme === undefined && type === 'css')) {
    theme = 'simplicity-green'
  }
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
// 返回
const comeBack = async (): Promise<void> => {
  if (await WarningTips('你确定要返回吗？数据不会被保存/更改')) {
    void router.push('/editor/list')
  }
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (router.currentRoute.value.params.id as string) {
    void getArticle(router.currentRoute.value.params.id as string)
  } else {
    isget.value = true
  }
})
</script>

<template>
  <div class="postArticleArea">
    <div class="HeaderBox">
      <div class="itemBox">
        <div class="serachBox">
          <el-input
            v-model="searchId"
            placeholder="查找ID获取你编辑的文章"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="searchArticle()" :icon="Search" />
            </template>
          </el-input>
        </div>
        <el-button type="danger" plain @click="deleteEditor"
          >删除文章</el-button
        >
        <el-button type="success" plain @click="PostNewArticle(true)"
          >存草稿</el-button
        >
        <el-button type="warning" plain @click="comeBack">返回</el-button>
        <el-button
          type="primary"
          v-if="editorData.state === 0"
          @click="PostNewArticle(1)"
          >更新</el-button
        >
        <el-button type="primary" v-else @click="PostNewArticle(false)"
          >发布</el-button
        >
      </div>
      <div class="postBtn">
        <el-button type="success" v-show="isTrue">同步</el-button>
      </div>
      <!-- Select框切换主题 -->
      <div class="SelectThemeBox" v-if="isMd">
        <div>
          <p class="title">主题</p>
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
          <p class="title">Code样式</p>
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
    </div>
    <div class="editor-container">
      <div class="ArticleDataPanel">
        <div class="articleState" v-if="router.currentRoute.value.params.id">
          <div>
            <h3>当前状态：</h3>
            <el-tag v-if="editorData.state === 0" type="success">已发布</el-tag>
            <el-tag v-else-if="editorData.state === 2" type="warning"
              >草稿</el-tag
            >
            <el-tag v-else type="danger">未发布</el-tag>
          </div>
        </div>
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
        <div class="cover_img" v-if="editorData.cover_img !== 'undefined'">
          <img :src="editorData.cover_img" alt="Cover_img" />
        </div>
        <p><span style="color: red">*</span>为必填项</p>
        <p><span style="color: red">*</span>不能设置图片封面为base64格式！</p>
        <p><span style="color: red">注意：</span>标签关键词用中文顿号间隔！</p>
      </div>
      <!-- 编辑器页面 -->
      <div class="EditorArea" v-if="isget">
        <Cekditor
          v-if="!isMd"
          :content="editorData.content"
          @cagEditorData="cagEditorData"
          :type="'cag'"
        />
        <CekditorMd
          v-else
          :content="editorData.content"
          @cagEditorData="cagEditorData"
          :type="'cag'"
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
  flex: 4;
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
  padding: 5px;
  > img {
    width: 150px;
    height: 80px;
  }
}

.articleState {
  padding: 10px;

  > div {
    display: flex;
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
  > div > p {
    font-size: 1rem;
    font-weight: 600;
    padding: 1px 15px;
    background-color: #ecf5ff;
    border: 1px solid #a0cfff;
    color: #409eff;
    text-align: center;
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
  .itemBox {
    display: block;
  }
  .SelectThemeBox {
    margin: 0 0 10px 0;
    justify-content: space-between;
    > div > .el-select {
      width: 25vw;
    }
  }
  .serachBox {
    margin: 0 0 15px 0;
  }
}
</style>
