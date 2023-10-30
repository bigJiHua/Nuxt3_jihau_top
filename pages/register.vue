<script setup lang="ts">
import { useRouter } from 'vue-router';
import PostNewUser from '@/api/Page'
const router = useRouter()
const loading = ref(false)
const showup = ref(false)
const show = ref(false)
const msg = ref('')
const elsepassword = ref('')
const newUser: any = reactive({
  username: '',
  password: '',
  email: ''
})
const rules: any = reactive({
  username: {
    rule: /^\w{6,12}$/,
    msg: '用户名必须为字母开头6-12位'
  },
  password: {
    rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    msg: '密码不能位空,必须为8-16位非空、非纯字符密码'
  },
  email: {
    rule: /^\w+@\w+\.\w+$/g,
    msg: '邮箱格式错误'
  }
})
const newuser = async () => {
  // 异步操作，设置loading为true
  loading.value = true
  // 如果用户名、密码、邮箱都有值，判断密码是否一致
  if (validata('username')) {
    if (validata('password')) {
      if (newUser.password === elsepassword.value) {
        if (validata('email')) {
          // 发送post请求，更新用户信息
          const { data: res } = await PostNewUser.UpnewUser(newUser)
          // 设置定时器，每2秒更新一次
          setInterval(() => {
            loading.value = false
            // 如果响应状态码为200，则跳转到登录页面
            if (res.status === 200) {
              router.push('/Login')
              // 如果响应状态码不为202，则设置验证码，跳转到检查验证码页面
            } else if (res.status !== 200) {
              localStorage.setItem('VerCode', res.data.code)
              localStorage.setItem('Username', res.data.user)
              router.push(`/checkVer/${res.data.code}/${res.data.user}`)
            }
          }, 2000)
        }
      } else {
        ElMessage({
          message: '两次密码不一致，请检查',
          type: 'warning'
        })
      }
    }
  }
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
const validata = (key: string) => {
  let bool = true
  if (!rules[key].rule.test(newUser[key])) {
    ElMessage({
      message: rules[key].msg,
      type: 'warning'
    })
    bool = false
  }
  return bool
}
const comeback = async () => {
  if (await WarningTips('放弃注册吗？') ) {
    router.back()
  }
}
useHead({
  title: '注册--欢迎注册jihau.top成为高贵的用户',
  meta: [
    {
      name: 'keywords',
      content: '注册、Regisiter、JiHua、jihau.top、注册页面'
    },
    {
      name: 'description',
      content: '这是jihau.top网站的注册页面，欢迎您访问此网站！'
    }
  ]
})
</script>

<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <div class="user_input_eara">
        <h2>注册 <small>Register</small></h2>
        <el-form :model="newUser" :rules="rules" ref="newUserForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="newUser.username" placeholder="请输入用户名 (6-12位且唯一)" required></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="newUser.password" placeholder="请输入密码 (6-12位)" required></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="elsepassword" placeholder="请重新输入确认密码" required></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="newUser.email" placeholder="请输入你的邮箱" required></el-input>
          </el-form-item>
        </el-form>
        <div class="btnmenu">
          <el-button type="primary" plain @click="comeback">返回</el-button>
          <el-button type="primary" plain @click="newuser" :loading="loading">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 90vh;
  position: relative;
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    width: 45vw;
    background-color: rgb(244, 244, 244);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 25px;
  }

  .user_input_eara {
    width: 100%;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .newuser:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara>form>[name='button'] {
    float: right;
  }

  .select_city {
    width: 8vw;
  }

  .fileup {
    width: 100%;
    height: 70%;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    width: 80vw;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .user_input_eara {
    height: 100%;
    padding: 10px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .select_city,
  .select {
    width: 35vw;
  }

  .fileup {
    width: 100%;
    height: 70%;
  }
}

.newuser {
  color: #0049c7;
  font-size: 2rem;
  font-weight: bolder;
}

.wran {
  color: red;
  font-size: 0.8rem;
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.selectsex {
  margin: 0 20px 0 20px;
}

.selectcity {
  display: flex;
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cagarea {
  width: 60vw;
  height: 45vh;
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
}

.res-btn {
  padding: 10px 15px;
  border: 0;
  border-radius: 8px;
}
</style>
