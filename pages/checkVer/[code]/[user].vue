<script setup lang="ts">
import checkMail from '@/api/Email'
import { useRouter } from 'vue-router'
const router = useRouter()
const code = ref(router.currentRoute.value.params.code)
const user = ref(router.currentRoute.value.params.user)
const data = reactive({
  user: router.currentRoute.value.params.code,
  code: router.currentRoute.value.params.user
})
// 提交检查验证
const subCheckCode = async () => {
  if (data.code !== undefined && data.user !== undefined) {
    const { data: res } = await checkMail.checkVer(data)
    if (res.status === 200) {
      setTimeout(() => {
        router.push('/Login')
      }, 2000)
    }
  } else {
    ElMessage({
      message: '输入内容不能为空',
      type: 'error',
      duration: 2000
    })
  }
}
onMounted(() => {
  if(user && code) {
    subCheckCode()
  } else {
    router.push('/checkVel')
  }
})
</script>

<template>
  <div id="" class="CheckBox">
    <h1 v-if="user">正在激活{{ user }}账户 ...</h1>
  </div>
</template>

<style lang="less" scoped>
.CheckBox {
  text-align: center;
  background-color: rgba(240, 240, 240, 0.8);
  height: calc(100vh - 60px);
}

.subCodeBox {
  text-align: center;
}
.CheckBox > h1 {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>

