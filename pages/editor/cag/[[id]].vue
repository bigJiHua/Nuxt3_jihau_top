<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useRouter } from '#vue-router';
import postArticleApi from '@/api/CtrlMenu'
const router = useRouter()
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
  state: 0
})
// 校验规则
const rules: any = reactive({
  title: {
    rule: /\S/,
    msg: '文章标题不能为空'
  },
  content: {
    rule: /.{50,}/,
    msg: '不能水文章哦！字数大于等于50！'
  },
  lable: {
    rule: /\S/,
    msg: '忘记填标签咯！'
  },
  keyword: {
    rule: /\S/,
    msg: '填一下关键字吧！'
  }
})
const elContent = ref('') // 备份修改之前的
const isTrue = ref(false) // 接收数据
const isMd = ref(false) // 切换编辑器
const isget = ref(false) // 是否渲染组件
const searchId = ref('')// 搜索ID

// 同步子组件对服务组件的数据
let setCount = 0
const cagEditorData = (cagData: string) => {
  setCount += 1
  if (cagData === '') return
  elContent.value = editorData.value.content
  if (editorData.value.content !== cagData) {
    editorData.value.content = cagData
    isTrue.value = true
  }
  setTimeout(() => {
    isTrue.value = false
  }, 500);
}
// 清空当前所有编辑
const deleteEditor = async (): Promise<void> => {
  if (await ElMessageBoxTips.WarningTips('你确定要删除这篇文章吗？') === 'true') {
    if (editorData.value.id === '') ElMessage({
      message: '错误！请刷新页面重试',
      type: 'warning'
    })
    const { data: res } = await postArticleApi.UserdelArticle(editorData.value.id)
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
        pub_date: ''
      }
      setTimeout(() => {
        router.push('/editor/list')
      }, 500);
    }
  }
}
// 重新发布文章
const PostNewArticle = async (isDraft: boolean | number) => {
  if (isDraft === true && editorData.value.state === 0) {
    if (await ElMessageBoxTips.WarningTips('你确定要保存为草稿吗？') === 'true') {
      editorData.value.state = "2"
    } else return
  } else if (parseInt(editorData.value.state) !== 0 && !isDraft) {
    if (await ElMessageBoxTips.WarningTips('准备好发布了吗？') === 'true') {
      editorData.value.state = "0"
    } else return
  } else if (isDraft === 1) {
    if (await ElMessageBoxTips.WarningTips('准备好更新该文章了吗？') === 'true') {
      editorData.value.state = "0"
    } else return
  }
  let push = 0
  for (const key in rules) {
    if (validata(key)) {
      push += 1
    }
  }
  if (push === Object.keys(rules).length) {
    if (isMd.value) editorData.value.content = JSON.stringify({
      data: editorData.value.content
    })
    const { data: res } = await postArticleApi.UsercagArticle(editorData.value)
    if (res.status === 200) {
      setTimeout(() => {
        router.push('/editor/list')
      }, 500);
    }
  }
}
// 获取文章内容
const getArticle = async (id?: string) => {
  const queryId = id ? id : searchId.value
  const { data: res } = await postArticleApi.UsergetArticleData(queryId as string)
  if (res.status === 404) {
    isget.value = true
    router.push('/editor/cag/')
  }
  if (res.status === 200 && res !== undefined) {
    router.replace('/editor/cag/' + queryId)
    editorData.value = { ...res.data.article }
    if (/\bmd[A-Z0-9]+\b/g.test(queryId as string)) isMd.value = true
    isget.value = true
    return
  }
}
const searchArticle = async () => {
  if (searchId.value === '') {
    ElMessage({
      message: '文章ID不能为空',
      type: 'error'
    })
  } else {
    getArticle()
  }
}
// 校验规则 
const validata = function (key: string) {
  let bool = true
  if (!rules[key].rule.test(editorData.value[key])) {
    ElMessage({
      message: rules[key].msg,
      type: 'error'
    })
    bool = false
  }
  return bool
}

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    getArticle(router.currentRoute.value.params.id as string)
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
          <el-input v-model="searchId" placeholder="查找ID获取你编辑的文章" class="input-with-select">
            <template #append>
              <el-button @click="searchArticle()" :icon="Search" />
            </template>
          </el-input>
        </div>
        <el-button type="danger" plain @click="deleteEditor">删除文章</el-button>
        <el-button type="success" plain @click="PostNewArticle(true)">存草稿</el-button>
      </div>
      <div class="postBtn">
        <el-button type="success" v-show="isTrue">同步</el-button>
        <el-button type="primary" v-if="editorData.state === 0" @click="PostNewArticle(1)">更新</el-button>
        <el-button type="primary" v-else @click="PostNewArticle(false)">发布</el-button>
      </div>
    </div>
    <div class="editor-container">
      <div class="ArticleDataPanel">
        <div class="articleState" v-if="router.currentRoute.value.params.id">
          <div>
            <h3>当前状态：</h3>
            <el-tag v-if="editorData.state === 0" type="success">已发布</el-tag>
            <el-tag v-else-if="editorData.state === 2" type="warning">草稿</el-tag>
            <el-tag v-else type="danger">未发布</el-tag>
          </div>
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
            <el-input v-model="editorData.describes" />
          </el-form-item>
          <el-form-item>
            <template #label>
              封面---设置文章封面(可选)
            </template>
            <el-input v-model="editorData.cover_img" />
          </el-form-item>
        </el-form>
        <dev class="cover_img" v-if="editorData.cover_img !== 'undefined'">
          <img :src="editorData.cover_img" alt="Cover_img">
        </dev>
        <p><span style="color: red;">*</span>为必填项</p>
        <p><span style="color: red;">*</span>不能设置图片封面为base64格式！</p>
        <p><span style="color: red;">注意：</span>标签关键词用中文顿号间隔！</p>
      </div>
      <div class="EditorArea" v-if="isget">
        <Cekditor v-if="!isMd" :content="editorData.content" @cagEditorData="cagEditorData" :type="'cag'" />
        <CekditorMd v-else :content="editorData.content" @cagEditorData="cagEditorData" :type="'cag'" />
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

  >button:last-child {
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

  >img {
    width: 80%;
    height: 90px;
  }
}

.articleState {
  padding: 10px;

  >div {
    display: flex;
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

      >button {
        float: none;
      }
    }
  }
}
</style>
