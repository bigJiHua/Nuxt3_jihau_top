<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import PublicAPI from "@/api/AllPublic";
import dayjs from "dayjs";
definePageMeta({
  layout: "default",
});
const formRef = ref();
const route = useRouter();
const form = ref({
  set_title: "",
  set_url: "",
  set_difault: "",
  set_time: dayjs(new Date()).format("YYYY-MM-DD"),
});
const seeForm = ref({
  set_title: "JiHua",
  set_url: "https://jihau.top",
  set_difault: "https://jihau.top/img/logo.png",
  set_time: dayjs(new Date()).format("YYYY-MM-DD"),
});
const qqNumber = ref("");
const isAllRight = ref(false);
const isShow = ref(false);
const captcha = ref("");
const codeimg = ref("");
const time = ref(0);
const count: Ref<number> = ref(0);
const rules = {
  set_title: [
    { required: true, message: "请输入要展示的昵称", trigger: "blur" },
    { max: 15, message: "昵称不能超过15个字符", trigger: "blur" },
  ],
  set_url: [
    { required: true, message: "请输入网站地址", trigger: "blur" },
    { type: "url", message: "请输入有效的网址", trigger: "blur" },
  ],
  set_difault: [
    { required: true, message: "请输入您的Logo Links", trigger: "blur" },
    { max: 200, message: "Logo链接不能超过200个字符", trigger: "blur" },
  ],
  set_time: [{ required: true, message: "请选择认识时间", trigger: "change" }],
};
// 校验通道
const isOpen: Ref<boolean> = ref(false);
const appConfig = useAppConfig();
const baseUrl = appConfig.site.baseUrl;
const AuthUrl = `${baseUrl}/auth/route`;
await useAsyncData("sps", () =>
  $fetch(AuthUrl, {
    method: "get",
    params: {
      path: "/spslist",
    },
  }),
).then((res) => {
  isOpen.value = res?.data?.value?.state === "true";
});

useHead({
  title: "友链申请",
});
// 监听表单变化，同步到预览区域
watch(
  form,
  (newVal) => {
    Object.keys(newVal).forEach((key) => {
      // 只同步有值的字段，避免把旧值覆盖为空
      if (newVal[key] !== "" && newVal[key] !== null && newVal[key] !== undefined) {
        seeForm.value[key] = newVal[key];
      }
    });
  },
  { deep: true },
);
// 提交表单
const submitForm = async (): Promise<void> => {
  if (!isOpen.value) {
    ElMessage.error("非法修改代码！警告！");
    return;
  }
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (form.value.set_title === "JiHua") {
        ElMessage.warning("请不要直接提交原有数据！");
        return;
      }
      // 调用获取验证码
      void getCode();
    } else {
      ElMessage.error("有遗漏项，请检查输入内容！");
    }
  });
};
// 校验验证码
const isCaptcha = async (): Promise<void> => {
  if (!captcha.value) {
    ElMessage.error("请输入验证码！");
    return;
  }
  await PublicAPI.verifyCode("verify", captcha.value)
    .then(async (r) => {
      if (r.data.status === 200) {
        const { data: res } = await PublicAPI.postSpsList(form.value);
        if (res.status === 200) {
          isShow.value = false;
          isAllRight.value = true;
          codeimg.value = "";
          captcha.value = "";
        }
      }
    })
    .catch(() => {
      captcha.value = "";
      ElMessage.error("验证码错误，请重新输入！");
      isShow.value = false;
    });
};
// TODO 需要解决 多次请求刷新验证码的问题
// 获取验证码及倒计时逻辑简化版
const getCode = async (): Promise<void> => {
  if (count.value >= 10) {
    // 超过5次，清理数据并关闭弹窗
    captcha.value = "";
    isShow.value = false;
    codeimg.value = "";
    count.value = 0;
    ElMessage.error("尝试次数过多，请稍后再试！");
    return;
  }
  const { data } = await PublicAPI.getCode();
  codeimg.value = data;
  isShow.value = true;
  count.value++;
  time.value = 60;
  startCountDown();
};
// 计时器
const startCountDown = (): void => {
  if (time.value > 0 && isShow.value) {
    setTimeout(() => {
      time.value--;
      if (time.value <= 0 && isShow.value) {
        void getCode(); // 失效重新请求
      } else {
        startCountDown(); // 继续倒计时
      }
    }, 1000);
  }
};

// 使用qq 头像
const useQQicon = () => {
  if (!qqNumber.value) {
    ElMessage.warning("请输入QQ号码");
    return;
  }
  const qqIconUrl = `https://q.qlogo.cn/g?b=qq&nk=${qqNumber.value}&s=640`;
  form.value.set_difault = qqIconUrl;
};

const resetForm = (): void => {
  formRef.value.resetFields();
  ElMessage.info("已取消申请");
  void route.push("/SpsList");
};
</script>

<template>
  <div class="invitation-bg">
    <div v-if="isAllRight" class="success-container">
      <div class="thank-you-message">
        🎉 感谢！您已成功递交您的申请！🎉<br />
        <span>我们将在一个星期内审核完成并展示在好友列表中</span><br />
        <small style="font-size: 16px; color: #888">
          （如果内容不符合将不会展示且无任何提醒）
        </small>
      </div>
    </div>
    <div class="card-view" v-show="!isAllRight">
      <h3>预览卡片</h3>
      <div class="document_author_introduce">
        <div class="introduce_author">
          <a :href="form.set_url" class="author_logo_box" target="_blank">
            <img :src="seeForm.set_difault" class="author_logo" alt="logo" />
          </a>
          <a :href="seeForm.set_url" target="_blank" class="author_name">
            {{ seeForm.set_title }}</a
          >
        </div>
        <div class="introduce_content">
          <div class="text">🤝 我们是好朋友嗷!</div>
          <div class="item">
            <p class="settiem">
              <span class="title">认识时间</span>
              <br />
              <span class="time">{{ seeForm.set_time }}</span>
            </p>
            <el-button class="LinkBtn">访问 ta 的博客</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="invitation-card" v-show="!isAllRight">
      <el-card shadow="always">
        <template #header>
          <div class="invitation-title">💌 友链申请</div>
        </template>
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="尊称" prop="set_title">
            <el-input v-model="form.set_title" placeholder="请输入您的昵称" maxlength="15" />
          </el-form-item>

          <el-form-item label="贵站链接" prop="set_url">
            <el-input
              v-model="form.set_url"
              placeholder="如 https://yourdomain.com"
              maxlength="200"
            />
          </el-form-item>

          <el-form-item label="Logo" prop="set_difault">
            <el-input v-model="form.set_difault" placeholder="Logo URL" maxlength="150" />
            <div class="useQQinput">
              <el-input v-model="qqNumber" placeholder="QQ号码" maxlength="15" />
              <el-button type="primary" plain size="small" @click="useQQicon">使用QQ头像</el-button>
            </div>
            <p class="warningTips">
              ⚠请注意，我们不会通过你的QQ号主动联系你，如您觉得暴漏隐私请勿使用!
            </p>
          </el-form-item>
          <el-form-item label="认识时间" prop="set_time">
            <el-date-picker
              v-model="form.set_time"
              type="date"
              placeholder="请选择你与我认识的时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>
          <div class="form-actions">
            <el-button type="warning" plain @click="resetForm">取消</el-button>
            <el-button type="danger" plain v-if="!isOpen">暂停申请</el-button>
            <el-button type="primary" plain @click="submitForm" v-else>递交申请</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="isShow" title="请输入验证码：" width="350">
    <div class="captchaNum">
      <div v-html="codeimg" @click="getCode"></div>
      <div>
        <span>{{ time }}s 后刷新</span>
      </div>
    </div>
    <el-input v-model="captcha" placeholder="请输入验证码" />
    <div class="form-actions">
      <el-button type="primary" @click="isCaptcha">提交</el-button>
      <el-button @click="isShow = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<style scoped>
.invitation-bg {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  background: linear-gradient(to bottom, #fdfcfb, #e2d1c3);
  gap: 40px;
  height: calc(100vh - 60px);
  overflow: scroll;
}
.invitation-bg::-webkit-scrollbar {
  display: none;
}
.invitation-card {
  font-family: "Georgia", serif;
}
.card-view {
  position: relative;
  width: 30%;
  overflow: hidden;
  background-color: #ffffff68;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: 8px;
  padding: 30px;
}
.card-view:hover {
  background-color: #fff;
}
.card-view > h3 {
  color: #bdbbbb;
  display: flex;
  justify-content: center;
  margin: 0 0 10px 0;
}
.invitation-card {
  background: #fff8f0;
  border-radius: 16px;
  border: 1px solid #e0cdb6;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 30px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

.invitation-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #8b5e3c;
  font-family: "Times New Roman", serif;
  margin-bottom: 10px;
}

.priceArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.price {
  color: rgb(221, 78, 98);
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 5px;
}

.LinkBoxArea {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.settiem {
  text-align: center;
  color: #555;
  font-size: 0.9rem;
}

.LinkBtn {
  background-color: rgb(251, 114, 153);
  color: white !important;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;
}

.el-input,
.el-textarea {
  background-color: #fffefb;
}
.useQQinput {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  > div {
    margin-right: 10px;
  }
}
.warningTips {
  color: #ff0000;
  font-size: 0.7rem;
  margin-top: 5px;
}
/* 响应式调整 */
@media only screen and (max-width: 755px) {
  .invitation-bg {
    gap: 5px;
  }
  .card-view,
  .invitation-card {
    width: 100%;
    max-width: 90vw;
  }
}

/*原始样式*/

.document_author_introduce {
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
}
.document_author_introduce:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px #c9daef;
}
.introduce_author {
  display: grid;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px 12px 0 0;
  justify-items: center;
  position: relative;
  background-color: #eef2ff;
}
.author_logo_box {
  display: inline-block;
  width: 70px;
  height: 70px;
  background-color: #d1d1d15b;
  border-radius: 50%;
  overflow: hidden;
  .author_logo {
    width: 100%;
    height: 100%;
  }
}
.author_name {
  font-weight: 500;
  font-size: 2rem;
  color: #ff83a4;
  line-height: 30px;
}
.author_name:hover {
  color: #fc5682;
}
.introduce_content {
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.text {
  padding: 20px;
  text-align: center;
}
.item {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #f8fafc;
  overflow: hidden;
}
.settiem {
  font-size: 1rem;
}
.LinkBtn > button {
  background-color: #fb7299;
  color: white;
}
.title {
  display: inline-block;
  margin-bottom: 5px;
  font-size: 0.8rem;
}
.time {
  font-size: 0.9rem;
}

/* end */

.success-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 8px;
  z-index: 9999;
  text-align: center;
}
.thank-you-message {
  font-size: 2rem;
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .success-container {
    width: 90vw;
    padding: 20px;
  }
  .thank-you-message {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
.captchaNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
