<script setup lang="ts">
import { useRouter } from 'vue-router'
import Login from '@/api/Page'
import { CloseBold } from '@element-plus/icons-vue'
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
    rule: /^[^\u4e00-\u9fa5]{6,30}$/,
    msg: '密码不能为空!且长度为6-12位'
  }
})
const login = async () => {
  loading.value = true
  // 验证是否已经拥有token 输入的用户名是否合法 输入的密码是否合法
  const token = localStorage.getItem('token')
  if (token != 'undefined' && token != null) {
    ElMessage({
      message: '已经登录啦！请勿重复登录',
      type: 'warning'
    })
    location.reload()
    return
  } else {
    localStorage.removeItem('token')
  }
  // 验证
  if (validata('username') && validata('password')) {
    // 发起请求
    const { data: res } = await Login.LoginMenu(username.value, password.value)
    if (res.token) { loading.value = false } else {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
    // 打开开关
    // 判断返回状态码是否成功
    localStorage.setItem('token', res.token)
    localStorage.setItem('Username', res.data.Users.username)
    localStorage.setItem('Useridentity', res.data.Users.useridentity)
    location.reload()
    setTimeout(() => {
      show.value = false
      loading.value = false
      emit('closePanel')
    }, 2000)
  }
}
const register = (): void => {
  void router.push('/register')
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

// 申明对父组件操作
const emit = defineEmits(['closePanel'])
const close = () => {
  emit('closePanel')
}
</script>

<template>
  <div id="" class="showLogin">
    <!-- 遮罩层 -->
    <div class="overlay" @click="close"></div>
    <div class="login_conten_box">
      <img alt="登录" class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
      <div class="user_input_eara">
        <div class="close" @click="close">
          <el-icon class="closeBtn">
            <CloseBold />
          </el-icon>
        </div>
        <h2>登录 <small>Login</small></h2>
        <el-form :label-position="'left'" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="username" placeholder="请输入用户名" />
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

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}

.showLogin {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.user_input_eara {
  position: relative;
}

@media only screen and (min-width: 755px) {

  .login_conten_box {
    width: 50%;
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

  .login_conten_box {
    width: 90%;
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
  width: 100%;
  margin-top: 10px;

  >button {
    width: 100px
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.close {
  position: absolute;
  top: 0px;
  right: 16px;
  font-size: 1.5rem;
  color: darkgray;
}

.close:hover {
  color: black;
}
</style>
