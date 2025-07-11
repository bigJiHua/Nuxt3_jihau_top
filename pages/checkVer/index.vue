<script setup lang="ts">
import checkMail from '@/api/Email'
import { useRouter } from 'vue-router'
const router = useRouter()
const data: any = reactive({
  user: router.currentRoute.value.params.user ?? '',
  code: router.currentRoute.value.params.code ?? '',
})
// 提交检查验证
const subCheckCode = async () => {
  if (data.code !== undefined && data.user !== undefined) {
    const { data: res } = await checkMail.checkVer(data)
    if (res.status === 200) {
      setTimeout(() => {
        void router.push('/Login')
      }, 2000)
    } else {
      void router.replace('/checkVer')
    }
  } else {
    ElMessage({
      message: '输入内容不能为空',
      type: 'error',
      duration: 2000,
    })
  }
}
</script>

<template>
  <div class="subCodeBox">
    <div class="inputBox">
      <p>输入验证码以激活您的账户</p>
      <el-form
        :label-position="'left'"
        label-width="100px"
        :model="data"
        style="max-width: 460px"
      >
        <el-form-item label="用户名">
          <el-input v-model="data.user" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="data.code" />
        </el-form-item>
      </el-form>
      <div class="subBtn">
        <router-link to="/Login"><el-button>登录</el-button></router-link>
        <el-button @click="subCheckCode">验证</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.subCodeBox {
  text-align: center;
  height: calc(100vh - 60px);
}

.inputBox {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px 40px 40px;
  border-radius: 5px;

  > p:first-child {
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .subBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and(max-width: 755px) {
  .inputBox {
    width: 75vw;
    padding: 10px;
    margin: 0 20px;
    left: 44%;
  }
}
</style>
