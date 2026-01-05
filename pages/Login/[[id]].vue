<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserDataStore } from "@/stores/useUserData";
import Login from "@/api/Page";
const store = useUserDataStore();
const router = useRouter();
const loading = ref(false);
const show = ref(false);
const loginForm = ref({
  username: "jihua",
  password: "123456",
});
const loginFormRef = ref();
// 定义表单验证规则
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern:
        /^(?=(.*[a-zA-Z].*))(?=(.*\d.*))[\w]{5,12}$|^(?=(.*[a-zA-Z].*))(?=(.*_.*))[\w]{5,12}$|^(?=(.*\d.*))(?=(.*_.*))[\w]{5,12}$|^(?=.*[a-zA-Z\d_].*[a-zA-Z\d_])[\w]{5,12}$/,
      message: "用户名不能为空!且长度为5-12位",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^[^\u4e00-\u9fa5]{6,15}$/,
      message: "密码不能为空，且长度为6-15位，不能包含中文",
      trigger: "blur",
    },
  ],
});

// 校验通道
const isBad = ref(false);
const regcontent = ref({
  text1: "还差最后一步",
  text2: "我们注意到您的注册请求已提交，但需要进行额外的验证。",
  text3: "我们尝试向您的注册邮箱发送了验证码，但是遇到了一些问题。",
});
const btn = ref({
  text: "返回",
  link: "/",
});
const showErrorState = (): void => {
  regcontent.value.text1 = "⚠ 登录暂时关闭";
  regcontent.value.text2 = "我们注意到您的登录请求，但是服务出现了点问题。";
  regcontent.value.text3 = "请稍后再试。";
  isBad.value = true;
};
const route = useRouter();
const appConfig = useAppConfig();
const baseUrl = appConfig.site.baseUrl;

const AuthUrl = `${baseUrl}/auth/route`;
await useAsyncData("login", () =>
  $fetch(AuthUrl, {
    method: "get",
    params: {
      path: "/login",
    },
  }),
)
  .then((res) => {    
    if (res?.data?.value?.state === "false") {
      showErrorState();
    }
  })
  .catch(() => {
    showErrorState();
  });
const register = (): any => {
  if (localStorage.getItem("token")) {
    ElMessage({
      message: "已经登录啦！请勿重复登录",
      type: "warning",
    });
    setTimeout(() => {
      void router.push("/Users");
    }, 1000);
  } else {
    void router.push("/register");
  }
};
// 添加一个路由方法
const isArt = ref(router.currentRoute.value.params.id);
// 登录方法
const login = async (): Promise<void> => {
  loading.value = true;
  // 验证是否已经拥有token 输入的用户名是否合法 输入的密码是否合法
  if (localStorage.getItem("token") != null) {
    ElMessage({
      message: "已经登录啦！请勿重复登录",
      type: "warning",
    });
    void router.push("/Users");
    return;
  }
  if (!loginFormRef.value) return;
  // 验证
  try {
    await loginFormRef.value?.validate();
    // 发起请求
    const { data: res } = await Login.LoginMenu(loginForm.value.username, loginForm.value.password);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (res.token) {
      // 判断返回状态码是否成功
      localStorage.setItem("token", res.token);
      localStorage.setItem("Username", res.data.Users.username);
      localStorage.setItem("Useridentity", res.data.Users.useridentity);
      store.setUserData(res.data);
      setTimeout(() => {
        show.value = false;
        loading.value = false;
        localStorage.removeItem("VerCode");
        if (isArt.value === "art") {
          router.back();
        } else {
          void router.push("/Users");
        }
      }, 1500);
    } else {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }
  } catch (err) {
    // 表单验证未通过
    loading.value = false; // 解除加载状态
  }
};
usePageHead("login");
</script>

<template>
  <div class="container">
    <div class="login_conten_box" v-if="!isBad">
      <img slt="登录" class="login_img" :src="icon.LoginPic" />
      <div class="user_input_eara">
        <h2>登录 <small>Login</small></h2>
        <el-form
          label-position="top"
          label-width="100px"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <el-form-item label="用户名" prop="username"
            ><el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              minlength="5"
              maxlength="15"
              name="username"
              autocomplete="username"
              :input-attrs="{
                name: 'username',
                autocomplete: 'username',
              }"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              minlength="6"
              maxlength="15"
              show-password
              name="password"
              autocomplete="current-password"
              :input-attrs="{
                name: 'password',
                autocomplete: 'current-password',
              }"
            />
          </el-form-item>
        </el-form>
        <div class="btnmenu">
          <el-button type="primary" class="divbtn" plain @click="register">注册</el-button>
          <el-button type="primary" class="divbtn" plain @click="login" :loading="loading"
            >登录</el-button
          >
        </div>
      </div>
    </div>
    <div class="login_conten_box" v-else>
      <PageItemTips :regcontent="regcontent" :btn="btn" />
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
    background-color: rgb(255, 255, 255);
    width: 80vw;
    height: 50vh;
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
    border-radius: 12px;
    background-color: #fff;
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

  .user_input_eara > form > [name="button"] {
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
    border-radius: 12px;
    background-color: #fff;
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
  border: 1px solid #5291d1;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #9dcdf7 0%, #4c93ff 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

.divbtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(67, 97, 238, 0.4);
}

.divbtn:active {
  transform: translateY(0);
}

.divbtn.loading {
  position: relative;
  color: transparent;
}

.divbtn.loading::after {
  content: "";
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
  border-radius: 12px;
  padding: 10px;
}
</style>
