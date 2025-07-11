<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserDataStore } from '@/stores/useUserData'
import Login from '@/api/Page'
const store = useUserDataStore()
const router = useRouter()
const loading = ref(false)
const show = ref(false)
const loginForm = ref({
  username: '',
  password: '',
})
const loginFormRef = ref()
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
})

const register = (): any => {
  if (localStorage.getItem('token')) {
    ElMessage({
      message: '已经登录啦！请勿重复登录',
      type: 'warning',
    })
    setTimeout(() => {
      void router.push('/Users')
    }, 1000)
  } else {
    void router.push('/register')
  }
}
// 添加一个路由方法
const isArt = ref(router.currentRoute.value.params.id === 'art')
// 登录方法
const login = async (): any => {
  loading.value = true
  // 验证是否已经拥有token 输入的用户名是否合法 输入的密码是否合法
  if (localStorage.getItem('token') != null) {
    ElMessage({
      message: '已经登录啦！请勿重复登录',
      type: 'warning',
    })
    void router.push('/Users')
    return
  }
  if (!loginFormRef.value) return
  // 验证
  try {
    await loginFormRef.value?.validate()
    // 发起请求
    const { data: res } = await Login.LoginMenu(
      loginForm.value.username,
      loginForm.value.password
    )
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (res.token) {
      // 判断返回状态码是否成功
      localStorage.setItem('token', res.token)
      localStorage.setItem('Username', res.data.Users.username)
      localStorage.setItem('Useridentity', res.data.Users.useridentity)
      store.setUserData(res.data)
      setTimeout(() => {
        show.value = false
        loading.value = false
        localStorage.removeItem('VerCode')
        if (isArt.value) {
          void router.back()
        } else {
          void router.push('/Users')
        }
      }, 1500)
    } else {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
  } catch (err) {
    // 表单验证未通过
    loading.value = false // 解除加载状态
  }
}
useHead({
  title: '登录--欢迎登录jihau.top',
  meta: [
    {
      name: 'keywords',
      content: '登录、Login、JiHua、jihau.top、登录页面',
    },
    {
      name: 'description',
      content: '这是jihau_top网站的登录页面，欢迎您访问此网站！',
    },
  ],
})
</script>

<template>
  <div class="container">
    <div class="login_conten_box">
      <img slt="登录" class="login_img" :src="reqConfig.LoginPic" />
      <div class="user_input_eara">
        <h2>登录 <small>Login</small></h2>
        <el-form
          :label-position="'top'"
          label-width="100px"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" minlength="5" maxlength="15" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              minlength="6"
              maxlength="15"
            />
          </el-form-item>
        </el-form>
        <div class="btnmenu">
          <el-button
            type="primary"
            class="divbtn btn-register"
            plain
            @click="register"
            >注册</el-button
          >
          <el-button
            type="primary"
            class="divbtn btn-register"
            plain
            @click="login"
            :loading="loading"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@media only screen and (min-width: 755px) {
  .container {
    width: 100vw;
    height: calc(100vh - 60px);
    position: relative;
  }

  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 65%;
    height: 50%;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login_img {
    width: 50%;
    height: 100%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara > form > [name='button'] {
    float: right;
  }
}

@media only screen and (max-width: 755px) {
  .container {
    width: 100vw;
    height: 90vh;
    position: relative;
  }

  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 80vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login_img {
    display: none;
  }

  .user_input_eara {
    flex: 1;
    padding: 20px 25px;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// DIV BTN
.divbtn {
  width: 120px;
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

// DIV INPUT
:deep(.el-input__wrapper) {
  border-radius: 50px;
  padding: 10px;
}
</style>
