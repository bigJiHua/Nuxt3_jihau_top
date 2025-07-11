<script setup lang="ts">
import { useRouter } from 'vue-router'
import PostNewUser from '@/api/Page'
import { User, Message, Lock } from '@element-plus/icons-vue'
const router = useRouter()
const loading = ref(false)
const newUser: any = reactive({
  username: '',
  password: '',
  email: '',
  elsepassword: '',
})

const newUserForm = ref()
// 定义表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern:
        /^(?=(.*[a-zA-Z].*))(?=(.*\d.*))[\w]{5,12}$|^(?=(.*[a-zA-Z].*))(?=(.*_.*))[\w]{5,12}$|^(?=(.*\d.*))(?=(.*_.*))[\w]{5,12}$|^(?=.*[a-zA-Z\d_].*[a-zA-Z\d_])[\w]{5,12}$/,
      message: '用户名不能为空!且长度为5-12位',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[^\u4e00-\u9fa5]{6,15}$/,
      message: '密码不能为空，且长度为6-15位，不能包含中文',
      trigger: 'blur',
    },
  ],
  elsepassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      pattern: /^[^\u4e00-\u9fa5]{6,15}$/,
      message: '确认密码不能为空，且长度为6-15位，不能包含中文',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的邮箱',
      trigger: 'blur',
    },
  ],
})

const isBad = ref(false)
const regcontent = ref({
  text1: '还差最后一步',
  text2: '我们注意到您的注册请求已提交，但需要进行额外的验证。',
  text3: '我们尝试向您的注册邮箱发送了验证码，但是遇到了一些问题。',
})
const newuser = async () => {
  // 异步操作，设置loading为true
  loading.value = true
  if (!newUserForm) return
  // 如果用户名、密码、邮箱都有值，判断密码是否一致
  // 验证
  try {
    await newUserForm.value?.validate()
    if (newUser.password === newUser.elsepassword) {
      // 发送post请求，更新用户信息
      await PostNewUser.UpnewUser(newUser)
        .then((response) => {
          if (response.status === 200) {
            void router.push('/Login')
          }
        })
        .catch((err) => {
          if (err.status === 406) {
            isBad.value = true
          } else if (err.status === 404) {
            isBad.value = true
            regcontent.value.text1 = '❌ 注册失败'
            regcontent.value.text2 =
              '我们注意到您的注册请求已提交，但是服务器出现了点问题。'
            regcontent.value.text3 = ''
          }
        })
      loading.value = false
    } else {
      ElMessage({
        message: '两次密码不一致，请检查',
        type: 'warning',
      })
    }
    setTimeout(() => {
      loading.value = false
    }, 2000)
  } catch (err) {
    // 表单验证未通过
    loading.value = false // 解除加载状态
  }
}
const comeback = async () => {
  if (await WarningTips('放弃注册吗？')) {
    router.back()
  }
}
useHead({
  title: '注册--欢迎注册jihau.top成为高贵的用户',
  meta: [
    {
      name: 'keywords',
      content: '注册、Regisiter、JiHua、jihau.top、注册页面',
    },
    {
      name: 'description',
      content: '这是jihau.top网站的注册页面，欢迎您访问此网站！',
    },
  ],
})
</script>

<template>
  <div class="container">
    <div class="login_conten_box">
      <div class="user_input_eara" v-if="!isBad">
        <h2>创建您的个人账户</h2>
        <el-form
          :model="newUser"
          :rules="rules"
          ref="newUserForm"
          label-position="top"
          class="newUserForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="newUser.username"
              placeholder="请输入用户名 (6-12位且唯一)"
              required
              minlength="6"
              maxlength="12"
            >
              <template #prefix>
                <el-icon :size="20">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="newUser.password"
              placeholder="请输入密码 (8-15位，包含数字和字母)"
              show-password
              required
              minlength="8"
              maxlength="15"
            >
              <template #prefix>
                <el-icon :size="20">
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="elsepassword">
            <el-input
              type="password"
              v-model="newUser.elsepassword"
              placeholder="请重新输入确认密码"
              show-password
              required
              minlength="8"
              maxlength="15"
            >
              <template #prefix>
                <el-icon :size="20">
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="newUser.email"
              placeholder="请输入你的邮箱"
              required
              minlength="1"
              maxlength="100"
            >
              <template #prefix>
                <el-icon :size="20">
                  <Message />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="btnmenu">
          <el-button
            class="divbtn btn-register"
            type="primary"
            plain
            @click="comeback"
            >返回</el-button
          >
          <el-button
            class="divbtn btn-register"
            type="primary"
            plain
            @click="newuser"
            :loading="loading"
            >注册</el-button
          >
        </div>
        <div class="xijie">
          注册即表示同意服务条款及
          <a href="/notify/YSZC">隐私政策</a>
          ，其中包括 Cookie 使用条款。
        </div>
      </div>
      <div class="verification-area" v-else>
        <h2 class="verification-title">{{ regcontent.text1 }}</h2>
        <p class="verification-message">1.{{ regcontent.text2 }}</p>
        <p class="verification-instruction">2.{{ regcontent.text3 }}</p>
        <p class="verification-troubleshoot">请联系站长处理！</p>
        <nuxt-link to="/Login">
          <el-button
            class="divbtn btn-register"
            type="primary"
            plain
            style="float: right"
            >登录</el-button
          >
        </nuxt-link>
        <!-- 如果需要，可以添加一个按钮，用于重新发送验证码或跳转到验证页面 -->
        <!-- <el-button type="primary" plain @click="resendVerificationCode">重新发送验证码</el-button> -->
        <!-- <el-button type="info" plain @click="goToVerificationPage">前往验证页面</el-button> -->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
}
.login_conten_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  padding: 20px; /* 增加内边距使内容不那么贴边 */
  box-sizing: border-box; /* 确保 padding 不会增加总宽度 */
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
}
.user_input_eara {
  width: 100%; /* 确保输入区域宽度适应父容器 */
  h2 {
    margin: 20px 0; /* 调整标题外边距 */
    text-align: center;
  }
}
.newUserForm {
  display: flex;
  flex-direction: column;
}

.btnmenu {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
:deep(.el-input, .el-form-item__label) {
  text-align: center;
  margin: 0 auto;
}
:deep(.el-input__wrapper) {
  border-radius: 50px;
  padding: 10px;
}
:deep(.el-input__prefix) {
  display: inline-flex; /* 使用 flexbox 更好地对齐图标 */
  align-items: center; /* 垂直居中对齐图标 */
  width: 40px;
  padding: 0 10px 0 0; /* 调整图标右侧内边距 */
  box-sizing: border-box;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .login_conten_box {
    width: 90%; /* 小屏幕下宽度更大 */
  }
  :deep(.el-input) {
    max-width: none; /* 小屏幕下不限制最大宽度 */
  }
}
@media (min-width: 768px) {
  .login_conten_box {
    width: 30%; /* 小屏幕下宽度更大 */
  }
}
.xijie {
  text-align: center;
  font-size: 12px;
  color: #999;
  a {
    color: #409eff;
  }
}
// DIV BTN
.divbtn {
  width: 200px;
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #5291d1;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
}

.btn-register {
  background: linear-gradient(135deg, #9dcdf7 0%, #4c93ff 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(67, 97, 238, 0.4);
}

.btn-register:active {
  transform: translateY(0);
}

.btn-register.loading {
  position: relative;
  color: transparent;
}

.btn-register.loading::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.divbtn:hover {
  background-color: #5291d1;
  color: #fff;
}

// 202 区域的样式
.verification-area {
  display: flex;
  flex-direction: column;
  padding: 30px; // 内边距
  width: 100%; // 确保占据可用宽度
  max-width: 400px; // 限制最大宽度，避免过宽
  box-sizing: border-box; // 包含 padding 在宽度内
  > h2 {
    align-items: center; // 水平居中所有子项
  }
}
.verification-title {
  font-size: 2em; // 标题更大
  color: #409eff; // Element Plus 主题蓝
  margin-bottom: 20px;
  font-weight: bold;
}

.verification-message,
.verification-instruction,
.verification-troubleshoot {
  font-size: 1rem;
  line-height: 1.6;
  color: #606266; // Element Plus 默认文本颜色
  margin-bottom: 10px; // 段落间距
}

.verification-instruction {
  font-weight: 500;
}

.verification-troubleshoot {
  font-size: 0.9rem;
  color: #909399; // 稍微浅一些的颜色
  margin-top: 15px; // 与上方内容间隔
}
// 响应式调整（如果需要为小屏幕单独调整 202 区域）
@media (max-width: 768px) {
  .verification-area {
    padding: 20px;
    max-width: none; // 小屏幕下不限制最大宽度
  }
  .verification-title {
    font-size: 1.8em;
  }
}
</style>
