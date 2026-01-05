<script setup lang="ts">
import { Check, Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import postArticleApi from "@/api/CtrlMenu";
definePageMeta({
  layout: "ctrl-view",
});
/* ===================== 数据类型 ===================== */
interface EditorData {
  id: string;
  username: string;
  title: string;
  content: string;
  cover_img: string;
  lable: string;
  keyword: string;
  article_id: string;
  describes: string;
  state: number | string;
  pub_date: string;
}
interface Permission {
  article_id: string;
  username: string;
  user_id: string;
  allow_comment: number;
  allow_comhis: number;
  allow_like: number;
  allow_share: number;
  comment_review: number;
  is_clean_page: number;
}

// 编辑数据
const editorData: Ref<EditorData> = ref({
  id: "",
  username: "",
  title: "",
  lable: "",
  keyword: "",
  cover_img: "",
  article_id: "",
  content: "",
  describes: "",
  state: 0,
  pub_date: "",
});
// 校验规则
const rules: any = reactive({
  title: {
    rule: /\S/,
    msg: "文章标题不能为空",
  },
  content: {
    rule: /.{50,}/,
    msg: "不能水文章哦！字数大于等于50！",
  },
  lable: {
    rule: /\S/,
    msg: "忘记填标签咯！",
  },
  keyword: {
    rule: /\S/,
    msg: "填一下关键字吧！",
  },
});
const editRules = {
  title: [
    { required: true, message: "标题不能为空", trigger: "blur" },
    { min: 2, message: "标签至少 2 个字符", trigger: "blur" },
    { max: 30, message: "标签最多 30 个字符", trigger: "blur" },
  ],
  lable: [
    { required: true, message: "标签不能为空", trigger: "blur" },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (!value?.trim()) {
          callback(new Error("关键词不能为空"));
          return;
        }
        // 拆分关键词
        const parts = value.split("、");

        // 只有一个关键词 → 合法
        if (parts.length === 1) {
          callback();
          return;
        }
        // 多个关键词校验
        const isValid = parts.every((v) => v.trim() !== "");

        if (!isValid) {
          callback(new Error("请使用中文顿号 “、” 正确分隔"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
    { min: 2, message: "标签至少 2 个字符", trigger: "blur" },
    { max: 30, message: "标签最多 30 个字符", trigger: "blur" },
  ],
  keyword: [
    { required: true, message: "关键词不能为空", trigger: "blur" },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (!value?.trim()) {
          callback(new Error("关键词不能为空"));
          return;
        }
        // 拆分关键词
        const parts = value.split("、");
        // 只有一个关键词 → 合法
        if (parts.length === 1) {
          callback();
          return;
        }
        // 多个关键词校验
        const isValid = parts.every((v) => v.trim() !== "");

        if (!isValid) {
          callback(new Error("请使用中文顿号 “、” 正确分隔"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
    { min: 2, message: "标签至少 2 个字符", trigger: "blur" },
    { max: 30, message: "标签最多 30 个字符", trigger: "blur" },
  ],
  describes: [
    { required: true, message: "文章描述不能为空", trigger: "blur" },
    { min: 2, message: "标签至少 2 个字符", trigger: "blur" },
    { max: 30, message: "标签最多 30 个字符", trigger: "blur" },
  ],
};
const editFormRef = ref();

const router = useRouter();
const elContent = ref(""); // 备份修改之前的
const isTrue = ref(false); // 接收数据
const isMd = ref(false); // 切换编辑器
const isget = ref(false); // 是否渲染组件
const searchId = ref(""); // 搜索ID
// 当前选中的主题
const selectedTheme = ref("simplicity-green");
const selectedCodeTheme = ref("default");
const articleID: Ref<string> = ref(router.currentRoute.value.params.id as string);
// 切换编辑窗口
const pageMode = ref(false);
// 样式名称数组
const themes = ref([
  "simplicity-green",
  "arknights",
  "awesome-green",
  "channing-cyan",
  "Chinese-red",
  "condensed-night-purple",
  "cyanosis",
  "devui-blue",
  "fancy",
  "geek-black",
  "github",
  "greenwillow",
  "healer-readable",
  "hydrogen",
  "juejin",
  "jzman",
  "mk-cute",
  "nico",
  "orange",
  "qklhk-chocolate",
  "scrolls-light",
  "serene-rose",
  "smartblue",
  "v-green",
  "vue-pro",
  "vuepress",
  "z-blue",
]);
const codeTheme = ref([
  "a11y-dark",
  "a11y-light",
  "agate",
  "an-old-hope",
  "androidstudio",
  "arduino-light",
  "arta",
  "ascetic",
  "atom-one-dark-reasonable",
  "atom-one-dark",
  "atom-one-light",
  "brown-paper",
  "codepen-embed",
  "color-brewer",
  "dark",
  "default",
  "devibeans",
  "docco",
  "far",
  "felipec",
  "foundation",
  "github-dark-dimmed",
  "github-dark",
  "github",
  "gml",
  "googlecode",
  "gradient-dark",
  "gradient-light",
  "grayscale",
  "hybrid",
  "idea",
  "intellij-light",
  "ir-black",
  "isbl-editor-dark",
  "isbl-editor-light",
  "kimbie-dark",
  "kimbie-light",
  "lightfair",
  "lioshi",
  "magula",
  "mono-blue",
  "monokai-sublime",
  "monokai",
  "night-owl",
  "nnfx-dark",
  "nnfx-light",
  "nord",
  "obsidian",
  "paraiso-dark",
  "paraiso-light",
  "pojoaque",
  "purebasic",
  "qtcreator-dark",
  "qtcreator-light",
  "rainbow",
  "routeros",
  "school-book",
  "shades-of-purple",
  "srcery",
  "stackoverflow-dark",
  "stackoverflow-light",
  "sunburst",
  "tokyo-night-dark",
  "tokyo-night-light",
  "tomorrow-night-blue",
  "tomorrow-night-bright",
  "vs",
  "vs2015",
  "xcode",
  "xt256",
]);
// 权限数据
const permission: Ref<Permission> = ref({
  article_id: "",
  username: "",
  user_id: "",
  allow_comment: 1,
  allow_comhis: 1,
  allow_like: 1,
  allow_share: 1,
  comment_review: 0,
  is_clean_page: 0,
});
type PermissionField = keyof Permission;

const isEditInfo = ref(false);
// 编辑缓存（防止取消时污染原数据）
const editInfoTemp = ref({
  title: "",
  lable: "",
  keyword: "",
  describes: "",
  cover_img: "",
});
// 编辑缓存 （内容）
const editContentTemp = ref("");
/* ===================== 头部 ===================== */
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/file/simplicity-green.min.css",
      id: "dynamic-theme",
    },
    {
      rel: "stylesheet",
      href: "/css/code/styles/atom-one-dark.css",
      id: "dynamic-code",
    },
  ],
  title: articleID.value === "" ? "编辑文章" : "正在修改" + articleID.value + "ID的文章",
});

/* ===================== 方法 ===================== */
// 同步子组件对服务组件的数据
let syncTimer: number | null = null;
const cagEditorData = (val: string): void => {
  editContentTemp.value = val;
  isTrue.value = true;
  if (syncTimer !== null) clearTimeout(syncTimer);
  syncTimer = window.setTimeout(() => {
    isTrue.value = false;
  }, 500);
};

// 清空当前所有编辑
const deleteEditor = async (): Promise<void> => {
  if (await WarningTips("你确定要删除这篇文章吗？")) {
    if (editorData.value.id === "") {
      ElMessage({
        message: "ID 获取失败 无法执行删除该文章！",
        type: "warning",
      });
      return;
    }
    const { data: res } = await postArticleApi.UserdelArticle(editorData.value.id);
    if (res.status === 200) {
      editorData.value = {
        username: "",
        title: "",
        lable: "",
        keyword: "",
        cover_img: "",
        content: "",
        describes: "",
        state: 0,
        pub_date: "",
        id: "",
        article_id: "",
      };
      setTimeout(() => {
        void router.push("/editor/list");
      }, 500);
    }
  }
};
// 归为暂存
const waitEditor = async (): Promise<void> => {
  if (editorData.value.state === 2 || editorData.value.state === "2") {
    ElMessage({
      message: "该文章状态无误 无法执行此操作！",
      type: "warning",
    });
    return;
  }

  const cagdata = {
    id: articleID.value,
    data: {
      state: 2,
    },
  };
  await postArticleApi.UsercagArticle(cagdata).then((res: any) => {
    if (res.status === 200) {
      void getArticle(articleID.value);
      pageMode.value = false;
    }
  });
};
// 重新发布文章 这个方法被重构了
const PostNewArticle = async (isDraft: number, type: string): Promise<void> => {
  // 这个方法要处理三种状态 1.更新  2. 草稿 3. 发布
  if (editorData.value.id === "") {
    ElMessage({
      message: "ID 获取失败 无法执行删除该文章！",
      type: "warning",
    });
    return;
  }
  if (isDraft === true && editorData.value.state === 0) {
    if (await WarningTips("你确定要保存为草稿吗？")) {
      editorData.value.state = "2";
    } else return;
  } else if (editorData.value.state !== 0 && !isDraft) {
    if (await WarningTips("准备好发布了吗？")) {
      editorData.value.state = "0";
    } else return;
  } else if (isDraft === 1) {
    if (await WarningTips("准备好更新该文章了吗？")) {
      editorData.value.state = "0";
    } else return;
  }
  // 校验数据完整性
  let push = 0;
  for (const key in rules) {
    if (validata(key)) {
      push += 1;
    }
  }
  if (push === Object.keys(rules).length) {
    // 如果是md
    if (isMd.value) {
      editorData.value.content = JSON.stringify({
        data: editorData.value.content,
        theme: selectedTheme.value,
        codeTheme: selectedCodeTheme.value,
      });
    }
    const { data: res } = await postArticleApi.UsercagArticle(editorData.value);
    if (res.status === 200) {
      setTimeout(() => {
        void router.push("/editor/list");
      }, 500);
    }
  }
};
// 重定义修改内容
const cagEditor = async (state: boolean): Promise<void> => {
  if (!state) {
    isEditInfo.value = false;
    editInfoTemp.value = {
      title: "",
      lable: "",
      keyword: "",
      describes: "",
      cover_img: "",
    };
  } else {
    editInfoTemp.value = {
      title: editorData.value.title,
      lable: editorData.value.lable,
      keyword: editorData.value.keyword,
      describes: editorData.value.describes,
      cover_img: editorData.value.cover_img,
    };
    isEditInfo.value = true;
  }
};
// 修改文章信息
const submitEditinfo = async (): Promise<void> => {
  editFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.error("请检查表单内容是否完整");
      return;
    }
    const data = {
      id: articleID.value,
      data: editInfoTemp.value,
    };
    await postArticleApi.UsercagArticle(data).then((res: any) => {
      if (res.status === 200) {
        editorData.value.title = editInfoTemp.value.title;
        editorData.value.lable = editInfoTemp.value.lable;
        editorData.value.keyword = editInfoTemp.value.keyword;
        editorData.value.describes = editInfoTemp.value.describes;
        editorData.value.cover_img = editInfoTemp.value.cover_img;
        editInfoTemp.value = {
          title: "",
          lable: "",
          keyword: "",
          describes: "",
          cover_img: "",
        };
        isEditInfo.value = false;
      }
    });
  });
};
// 提交/修改文章正文内容
const EditContent = async (): Promise<void> => {
  await nextTick();
  if (editContentTemp.value.replace(/\s/g, "").length < 50) {
    ElMessage.error("文章内容不能少于 50 个有效词/字");
    return;
  }
  const cagdata = {
    id: articleID.value,
    data: {
      content: editContentTemp.value,
    },
  };
  // 如果是md
  if (isMd.value) {
    cagdata.data = {
      content: JSON.stringify({
        data: editContentTemp.value,
        theme: selectedTheme.value,
        codeTheme: selectedCodeTheme.value,
      }),
    };
  }
  if (await WarningTips("确认数据准备好提交变更了吗？")) {
    await postArticleApi.UsercagArticle(cagdata).then(() => {
      getArticle(articleID.value);
      pageMode.value = false;
    });
  }
};
const isEditContent = (type: boolean): void => {
  if (type) {
    editContentTemp.value = editorData.value.content;
  } else {
    editContentTemp.value = "";
  }
  pageMode.value = type;
};
// 获取文章内容
const getArticle = async (queryId: string): Promise<void> => {
  await postArticleApi
    .UsergetArticleData(queryId)
    .then((respone: any) => {
      const { data: res } = respone;
      if (res.status === 200) {
        void router.replace("/editor/cag/" + queryId);
        editorData.value = { ...res.data.article };
        permission.value = { ...res.data.power };
        // 匹配md开头
        if (/^md.*/i.test(queryId)) isMd.value = true;
        isget.value = true;
        // 在得到数据时展示现有的主题
        if (isMd.value) {
          try {
            selectedTheme.value = JSON.parse(res.data.article.content).theme;
            selectedCodeTheme.value = JSON.parse(res.data.article.content).codeTheme;
          } catch (e) {
            selectedTheme.value = "simplicity-green";
            selectedCodeTheme.value = "atom-one-dark";
          }
          loadTheme(selectedTheme.value, "css");
          loadTheme(selectedCodeTheme.value, "code");
        }
        searchId.value = "";
      }
    })
    .catch(() => {
      isget.value = true;
      void router.push("/editor/cag/");
    });
};
// 搜索获取文章
const searchArticle = async (): Promise<void> => {
  const regexID = /^.{3,15}$/.test(searchId.value);
  if (searchId.value === "" || !regexID) {
    ElMessage({
      message: "非法 ID",
      type: "error",
    });
  } else {
    void getArticle(searchId.value);
  }
};
// 校验规则
const validata = (key: string): boolean => {
  let bool = true;
  if (!rules[key].rule.test(editorData.value[key])) {
    ElMessage({
      message: rules[key].msg,
      type: "error",
    });
    bool = false;
  }
  return bool;
};
// 动态创建/更新 link 标签来加载 CSS 文件
const loadTheme = (theme: string, type: string = "css"): void => {
  if (theme === "") {
    theme = "simplicity-green";
  }
  const label = type === "css" ? "dynamic-theme" : "dynamic-code";
  let link = document.getElementById(`${label}`) as HTMLLinkElement | null;
  if (!link) {
    // 创建新的 link 标签
    link = document.createElement("link");
    link.id = label;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  // 设置 link 的 href 指向新的 CSS 文件
  link.href = type === "css" ? `/css/file/${theme}.min.css` : `/css/code/styles/${theme}.css`;
};
// 切换主题时调用
const onThemeChange = (theme: string, type: string = "css"): void => {
  if (type === "css") selectedTheme.value = theme;
  else selectedCodeTheme.value = theme;
  loadTheme(theme, type);
};

// 修改文章权限
const changePermission = async (type: PermissionField) => {
  if (await WarningTips("真的要修改这个权限吗？")) {
    await postArticleApi.UsercagArticlePower(
      articleID.value,
      JSON.stringify({
        [type]: permission.value[type],
      }),
    );
  } else {
    permission.value[type] = permission.value[type] === 1 ? 0 : 1;
  }
};

// 返回
onBeforeRouteLeave(async (to, from, next) => {
  // 命中 /editor/cag/**
  if (/^\/editor\/cag\/.*/.test(to.path)) {
    next();
    return;
  }
  // 其他页面才拦
  await WarningTips("你确定要离开吗？").then((ok) => {
    next(ok);
  });
});

/* ===================== 事前准备 ===================== */
onMounted(() => {
  if (articleID.value !== "") {
    void getArticle(articleID.value);
  } else {
    isget.value = false;
  }
});
</script>

<template>
  <div class="ChangeArticleArea">
    <!-- 搜索框 -->
    <div class="ItemBox SerachBox" v-show="!pageMode">
      <p>搜索文章</p>
      <input v-model="searchId" placeholder="输入ID查找你要编辑的文章" class="SerachBoxin" />
      <button class="SerachBtn" @click="searchArticle()">
        <el-icon :size="20">
          <Search />
        </el-icon>
      </button>
    </div>
    <div v-if="isget">
      <!-- 文章头部信息 -->
      <div class="Header ItemBox">
        <div class="HleftBox">
          <h2>
            <Nuxt-link :to="'/article/' + editorData.article_id" target="_blank" style="margin-right: 10px;">{{
              editorData.title
            }}</Nuxt-link>
            <el-tag v-if="editorData.state === 0" type="success">已发布</el-tag>
            <el-tag v-else-if="editorData.state === 2" type="warning">草稿</el-tag>
            <el-tag v-else-if="editorData.state === 1" type="danger">被驳回</el-tag>
            <el-tag v-else type="info">推送中</el-tag>
          </h2>
          <p>ID：{{ editorData.article_id || "—" }} · 作者：{{ editorData.username || "—" }}</p>
        </div>
        <div class="HrightBox">
          <div class="postBtn">
            <el-button type="success" :icon="Check" circle v-show="isTrue">同步</el-button>
          </div>
          <el-button type="primary" plain @click="isEditContent(true)" v-show="!pageMode">
            编辑正文
          </el-button>
          <div v-show="pageMode">
            <el-button type="warning" plain @click="isEditContent(false)"> 取消编辑 </el-button>
            <el-button type="primary" @click="EditContent">
              {{ editorData.state === 0 ? "更新" : "发布" }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- Select框切换主题 -->
      <div class="SelectThemeBox card" v-show="isMd && pageMode">
        <div>
          <p class="title">文章主题</p>
          <el-select v-model="selectedTheme" placeholder="选择样式" @change="onThemeChange">
            <el-option v-for="theme in themes" :key="theme" :label="theme" :value="theme" />
          </el-select>
        </div>
        <div>
          <p class="title">代码高亮</p>
          <el-select
            v-model="selectedCodeTheme"
            placeholder="选择样式"
            @change="onThemeChange(selectedCodeTheme, 'code')"
          >
            <el-option v-for="theme in codeTheme" :key="theme" :label="theme" :value="theme" />
          </el-select>
        </div>
      </div>
      <!--  编辑区域  -->
      <div class="editor-container" v-if="pageMode">
        <!-- 编辑器页面 -->
        <div class="EditorArea">
          <Cekditor
            v-if="!isMd"
            :content="editContentTemp"
            @cagEditorData="cagEditorData"
            :type="'cag'"
          />
          <CekditorMd
            v-else
            :content="editContentTemp"
            @cagEditorData="cagEditorData"
            :type="'cag'"
          />
        </div>
      </div>
      <div class="MoreDetailedCenter" v-show="!pageMode">
        <!-- 文章额外信息 -->
        <div class="card">
          <div class="card-header">
            <h3>文章信息</h3>
            <p @click="cagEditor(true)" class="edit" v-if="!isEditInfo">[编辑]</p>
          </div>
          <el-descriptions v-if="!isEditInfo" :column="1" border>
            <el-descriptions-item label="标题">
              {{ editorData.title || "—" }}
            </el-descriptions-item>

            <el-descriptions-item label="标签">
              {{ editorData.lable || "—" }}
            </el-descriptions-item>

            <el-descriptions-item label="关键词">
              {{ editorData.keyword || "—" }}
            </el-descriptions-item>

            <el-descriptions-item label="文章描述">
              {{ editorData.describes || "—" }}
            </el-descriptions-item>

            <el-descriptions-item label="文章封面">
              <div v-if="editorData.cover_img" class="cover_img">
                <img :src="editorData.cover_img" />
              </div>
              <span v-else>—</span>
            </el-descriptions-item>
          </el-descriptions>
          <!-- 编辑表单区域 -->
          <el-form v-else ref="editFormRef" :model="editInfoTemp" :rules="editRules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="editInfoTemp.title" />
            </el-form-item>
            <el-form-item label="标签" prop="lable">
              <el-input v-model="editInfoTemp.lable" />
            </el-form-item>
            <el-form-item label="关键词" prop="keyword">
              <el-input v-model="editInfoTemp.keyword" />
            </el-form-item>
            <el-form-item label="描述" prop="describes">
              <el-input v-model="editInfoTemp.describes" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="封面" prop="cover_img">
              <el-input v-model="editInfoTemp.cover_img" />
            </el-form-item>
            <el-form-item label="Tips">
              <p class="tips">* 上面所有选项均不可为空值</p>
              <p class="tips">* 标签和关键词必须严格按照中文顿号'、'分隔</p>
              <p class="tips">* 请确保所有输入信息的准确性</p>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="warning" plain @click="cagEditor(false)">取消</el-button>
              <el-button type="primary" plain @click="submitEditinfo">提交变更</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--文章权限  -->
        <div class="card">
          <h3>访问与互动权限</h3>
          <el-form label-width="100px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="允许评论">
                  <el-switch
                    v-model="permission.allow_comment"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('allow_comment')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评论需要审核">
                  <el-switch
                    v-model="permission.comment_review"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('comment_review')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展示历史评论">
                  <el-switch
                    v-model="permission.allow_comhis"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('allow_comhis')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="允许点赞">
                  <el-switch
                    v-model="permission.allow_like"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('allow_like')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="允许转发">
                  <el-switch
                    v-model="permission.allow_share"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('allow_share')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="干净页面模式">
                  <el-switch
                    v-model="permission.is_clean_page"
                    :active-value="1"
                    :inactive-value="0"
                    @click="changePermission('is_clean_page')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 文章操作 -->
        <div class="card card-btn">
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
          <section class="card warning">
            <h3>暂存</h3>
            <div class="danger-row">
              <el-popconfirm
                title="确定把该文章存入草稿箱吗？"
                confirm-button-text="存草稿"
                cancel-button-text="取消"
                @confirm="waitEditor"
              >
                <template #reference>
                  <el-button type="warning" plain>存草稿</el-button>
                </template>
              </el-popconfirm>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* ================= 基础布局（PC + iPad 默认） ================= */

.ChangeArticleArea {
  padding: 20px;
  height: 85vh;
  overflow-y: scroll;
}

.editor-container {
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

.ItemBox {
  margin: 10px 0;
  border-radius: 5px;
  background-color: #fff;
  padding: 15px;
}

.Header,
.HleftBox,
.HrightBox {
  display: flex;
  justify-content: space-between;
}

.Header {
  align-items: center;
}

.HleftBox {
  flex-direction: column;

  > h2 > a {
    font-size: 1.5rem;
    color: rgb(14, 95, 194);
  }

  > p {
    font-size: 0.9rem;
    padding: 3px;
    color: rgba(0, 0, 0, 0.78);
  }
}

.HrightBox {
  align-items: center;
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
  cursor: pointer;
}

.cover_img {
  padding: 5px;

  > img {
    width: 150px;
    height: 80px;
  }
}

/* ================= 搜索框 ================= */

.SerachBox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  transition: all 0.25s ease;

  > p {
    color: rgba(0, 0, 0, 0.78);
  }
}

.SerachBox:focus-within {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.15);
}

.SerachBoxin {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  color: #303133;
  border: none;
  outline: none;
  background: transparent;
}

.SerachBoxin::placeholder {
  color: #a8abb2;
}

.SerachBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #409eff;
  color: #ffffff;
  transition: all 0.2s ease;
}

.SerachBtn:hover {
  background: #66b1ff;
}

.SerachBtn:active {
  background: #337ecc;
  transform: scale(0.95);
}

/* ================= 主题选择区（PC / iPad 横向） ================= */

.SelectThemeBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  > div > p {
    font-size: 1rem;
    font-weight: 600;
    padding: 1px 15px;
    color: #409eff;
  }

  > div > .el-select {
    width: 10vw;
  }
}

/* ================= 信息卡片区（PC / iPad 双列） ================= */

.MoreDetailedCenter {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;

  .card:nth-child(3) {
    grid-column: 1 / -1;
  }
}

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
    background: #fff5f5;
    border: 1px solid #fdd;

    h3 {
      color: #d9534f;
    }
  }

  &.success {
    background: #e8ffee;
    border: 1px solid rgb(161, 255, 172);

    h3 {
      color: #009708;
    }
  }
  &.warning {
    background: #fffde8;
    border: 1px solid rgb(255, 220, 161);

    h3 {
      color: #976a00;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
}
.edit {
  color: #1985f1;
  cursor: pointer !important;
  user-select: none;
}
.tips {
  line-height: 15px !important;
  font-size: 12px;
  color: rgb(255, 57, 57);
  padding: 0;
  margin: 0;
}
.card-btn {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
/* ================= 仅手机：< 755px 才分行 ================= */

@media screen and (max-width: 755px) {
  .editor-container {
    display: block;
  }

  .ArticleDataPanel {
    width: 95vw;
    margin: 0 auto;
  }

  .postBtn {
    display: flex;
    justify-content: space-between;
    padding: 15px 2.5px 5px;
  }

  .itemBox {
    display: block;
  }

  .SelectThemeBox {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;

    > div {
      margin-right: 0;
      margin-bottom: 10px;
    }

    > div > .el-select {
      width: 100%;
    }
  }

  .MoreDetailedCenter {
    grid-template-columns: 1fr;
  }
}
</style>
