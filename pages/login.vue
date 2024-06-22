<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserDataStore } from '@/stores/useUserData'
import Login from '@/api/Page'
const store = useUserDataStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const show = ref(false)
const rules: any = ref({
  username: {
    rule: /^(?=(.*[a-zA-Z].*))(?=(.*\d.*))[\w]{5,12}$|^(?=(.*[a-zA-Z].*))(?=(.*_.*))[\w]{5,12}$|^(?=(.*\d.*))(?=(.*_.*))[\w]{5,12}$|^(?=.*[a-zA-Z\d_].*[a-zA-Z\d_])[\w]{5,12}$/,
    msg: '用户名不能为空!且长度为5-12位'
  },
  password: {
    rule: /^[^\u4e00-\u9fa5]{6,15}$/,
    msg: '密码不能为空!且长度为6-12位'
  }
})
const register = () => {
  if (localStorage.getItem('token')) {
    ElMessage({
      message: '已经登录啦！请勿重复登录',
      type: 'warning'
    })
    setTimeout(() => {
      router.push('/Users')
    }, 1000)
  } else {
    router.push('/register')
  }
}
const validata = (key: string) => {
  let bool = true
  if (!rules.value[key].rule.test([key])) {
    ElMessage({
      message: rules.value[key].msg,
      type: 'error'
    })
    bool = false
    return bool
  }
  return bool
}
const login = async () => {
  loading.value = true
  // 验证是否已经拥有token 输入的用户名是否合法 输入的密码是否合法
  if (localStorage.getItem('token') != null) {
    ElMessage({
      message: '已经登录啦！请勿重复登录',
      type: 'warning'
    })
    router.push('/Users')
    return
  }
  // 验证
  if (validata('username') && validata('password')) {
    // 发起请求
    const { data: res } = await Login.LoginMenu(username.value, password.value)
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
        void router.push('/Users')
      }, 1500)
    } else {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
  }
}

useHead({
  title: '登录--欢迎登录jihau.top',
  meta: [
    {
      name: 'keywords',
      content: '登录、Login、JiHua、jihau.top、登录页面'
    },
    {
      name: 'description',
      content: '这是jihau_top网站的登录页面，欢迎您访问此网站！'
    }
  ]
})
</script>

<template>
  <div class="container">
    <div class="login_conten_box">
      <img slt="登录" class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
      <div class="user_input_eara">
        <h2>登录 <small>Login</small></h2>
        <el-form :label-position="'left'" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="username" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
        </el-form>
        <div class="btnmenu">
          <el-button type="primary" plain @click="register">注册</el-button>
          <el-button type="primary" plain @click="login" :loading="loading">登录</el-button>
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
    width: 50vw;
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
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara>form>[name='button'] {
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

  .user_input_eara>h2 {
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

.res-btn {
  padding: 10px 15px;
  border: 0;
  border-radius: 8px;
}
</style>
