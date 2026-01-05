<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import postArticleApi from '@/api/CtrlMenu'

definePageMeta({
  layout: 'ctrl-view'
})

/* ===================== 类型 ===================== */
type PageMode = 'manage' | 'edit'

interface EditorData {
  id: string
  article_id: string
  username: string
  title: string
  content: string
  lable: string
  keyword: string
  describes: string
  cover_img: string
  state: number | string
  pub_date: string
}

interface ArticlePermission {
  id?: number
  article_id: string
  username: string
  user_id: string
  allow_comment: 0 | 1
  allow_comhis: 0 | 1
  allow_like: 0 | 1
  allow_share: 0 | 1
  comment_review: 0 | 1
  is_clean_page: 0 | 1
}

/* ===================== 基础状态 ===================== */
const router = useRouter()
const articleID = ref<string>(
  String(router.currentRoute.value.params.id || '')
)

const pageMode = ref<PageMode>('manage')
const isMd = ref(false)
const isLoaded = ref(false)

/* ===================== 数据 ===================== */
const editorData = ref<EditorData>({
  id: '',
  article_id: '',
  username: '',
  title: '',
  content: '',
  lable: '',
  keyword: '',
  describes: '',
  cover_img: '',
  state: 0,
  pub_date: ''
})

const permission = ref<ArticlePermission>({
  article_id: '',
  username: '',
  user_id: '',
  allow_comment: 1,
  allow_comhis: 1,
  allow_like: 1,
  allow_share: 1,
  comment_review: 0,
  is_clean_page: 0
})

/* ===================== 获取文章 ===================== */
const getArticle = async (id: string) => {
  try {
    const { data: res } = await postArticleApi.UsergetArticleData(id)
    if (res.status !== 200) throw new Error('Not found')

    editorData.value = res.data.article
    permission.value = res.data.permission ?? permission.value

    // md 判断
    if (/^md/i.test(id)) {
      isMd.value = true
      try {
        const parsed = JSON.parse(
          editorData.value.content as unknown as string
        )
        editorData.value.content = parsed?.data ?? editorData.value.content
      } catch {
        // 如果不是 JSON，则保持原样
      }
    }

    isLoaded.value = true
  } catch {
    ElMessage.error('文章不存在')
    router.push('/editor/list')
  }
}

/* ===================== 编辑器同步 ===================== */
const cagEditorData = (val: string) => {
  editorData.value.content = val
}

/* ===================== 保存 ===================== */
const saveArticle = async () => {
  const { data: res } = await postArticleApi.UsercagArticle(editorData.value)
  if (res.status === 200) {
    ElMessage.success('保存成功')
    pageMode.value = 'manage'
  }
}

/* ===================== 删除 ===================== */
const deleteEditor = async () => {
  if (!editorData.value.id) return
  const { data: res } = await postArticleApi.UserdelArticle(
    editorData.value.id
  )
  if (res.status === 200) {
    ElMessage.success('已删除')
    voidrouter.push('/editor/list')
  }
}

onMounted(() => {
  if (articleID.value !== '') {
    void getArticle(articleID.value)
  } else {
    ElMessage.warning('缺少文章 ID')
    void router.push('/editor/list')
  }
})
</script>

<template>
  <div v-if="isLoaded" class="page">
    <!-- 顶部 Header -->
    <div class="page-header">
      <div class="title-wrap">
        <h2 class="title">{{ editorData.title || "未命名文章" }}</h2>
        <p class="sub">
          ID：{{ editorData.article_id || "—" }} · 作者：{{
            editorData.username || "—"
          }}
        </p>
      </div>
      <div class="actions">
        <el-tag v-if="editorData.state === 0" type="success">已发布</el-tag>
        <el-tag v-else-if="editorData.state === 2" type="warning">草稿</el-tag>
        <el-tag v-else-if="editorData.state === 1" type="danger">被驳回</el-tag>
        <el-tag v-else type="info">推送中</el-tag>

        <el-button type="primary" @click="pageMode = 'edit'">
          编辑正文
        </el-button>
      </div>
    </div>

    <!-- 管理模式 -->
    <div v-if="pageMode === 'manage'" class="manage-panel">
      <!-- 基础信息 -->
      <section class="card">
        <h3>文章信息</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="标题">
            {{ editorData.title || "—" }}
          </el-descriptions-item>
          <el-descriptions-item label="标签">
            {{ editorData.lable || "—" }}
          </el-descriptions-item>
          <el-descriptions-item label="关键词">
            {{ editorData.keyword || "—" }}
          </el-descriptions-item>
          <el-descriptions-item label="文章封面">
            <div class="cover_img" v-if="editorData.cover_img !== 'undefined'">
              <img :src="editorData.cover_img" alt="Cover_img" />
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </section>

      <!-- 权限设置 -->
      <section class="card">
        <h3>访问与互动权限</h3>
        <el-form label-width="160px">
          <el-form-item label="允许评论">
            <el-switch
              v-model="permission.allow_comment"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="评论需要审核">
            <el-switch
              v-model="permission.comment_review"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="展示历史评论">
            <el-switch
              v-model="permission.allow_comhis"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="允许点赞">
            <el-switch
              v-model="permission.allow_like"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="允许转发">
            <el-switch
              v-model="permission.allow_share"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="干净页面模式">
            <el-switch
              v-model="permission.is_clean_page"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-form>
      </section>

      <!-- 危险操作 -->
      <div class="section-box">
        <section class="card danger">
          <h3>危险操作</h3>
          <div class="danger-row">
            <el-popconfirm
              title="确定要删除这篇文章吗？此操作不可撤销"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="deleteEditor"
            >
              <template #reference>
                <el-button type="danger" plain>删除文章</el-button>
              </template>
            </el-popconfirm>
          </div>
        </section>
        <section class="card success">
          <h3>暂存</h3>
          <div class="danger-row">
            <el-popconfirm
              title="确定要删除这篇文章吗？此操作不可撤销"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="deleteEditor"
            >
              <template #reference>
                <el-button type="success" plain @click="PostNewArticle(true)">存草稿</el-button>
              </template>
            </el-popconfirm>
          </div>
        </section>
      </div>
    </div>

    <!-- 编辑模式 -->
    <div v-else class="editor-mode">
      <div class="editor-toolbar">
        <div class="left">
          <el-button @click="pageMode = 'manage'">返回管理</el-button>
        </div>
        <div class="right">
          <el-button type="primary" @click="saveArticle">保存</el-button>
        </div>
      </div>

      <div class="editor-body">
        <Cekditor
          v-if="!isMd"
          :content="editorData.content"
          @cagEditorData="cagEditorData"
        />
        <CekditorMd
          v-else
          :content="editorData.content"
          @cagEditorData="cagEditorData"
        />
      </div>
    </div>
  </div>
  <!-- 空状态（可选） -->
  <div v-else class="empty">
    <el-empty description="正在加载文章…" />
  </div>
</template>

<style lang="less" scoped>
.page {
  padding: 20px;
  background: #f5f7fa;
  overflow-y: auto;
  height: 80vh;
}

/* 顶部 Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20px 24px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .title-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #333;
  }

  .sub {
    font-size: 14px;
    color: #666;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

/* 管理面板 */
.manage-panel {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;

  /* 单列卡片占满 */
  .card:nth-child(3) {
    grid-column: 1 / -1;
  }
}

/* 卡片样式 */
.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  h3 {
    margin-bottom: 16px;
    font-size: 17px;
    font-weight: 600;
    color: #444;
  }

  &.danger {
    flex: 1;
    background: #fff5f5;
    border: 1px solid #fdd;

    h3 {
      color: #d9534f;
    }

    .danger-row {
      display: flex;
      justify-content: flex-start;
    }
  }
  &.success {
    flex: 1;
    background: #e8ffee;
    border: 1px solid rgb(161, 255, 172);

    h3 {
      color: #009708;
    }

    .danger-row {
      display: flex;
      justify-content: flex-start;
    }
  }
}
.section-box {
    display: flex;
    width: 100%;
}

.cover_img {
  padding: 5px;
  > img {
    width: 150px;
    height: 80px;
  }
}
/* 编辑模式 */
.editor-mode {
  background: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #eee;
  background: #fafafa;

  .left,
  .right {
    display: flex;
    gap: 12px;
    align-items: center;
  }
}

.editor-body {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

/* 空状态 */
.empty {
  display: flex;
  min-height: 60vh;
  align-items: center;
  justify-content: center;
}

/* 响应式 */
@media (max-width: 1200px) {
  .manage-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page {
    padding: 12px;
  }

  .page-header {
    padding: 16px;
    .title {
      font-size: 20px;
    }
    .actions {
      gap: 8px;
    }
  }

  .card {
    padding: 16px;
  }

  .editor-toolbar {
    padding: 10px 12px;
  }

  .editor-body {
    padding: 12px;
  }
}
</style>
