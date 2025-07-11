<script setup lang="ts">
import checkMail from '@/api/Email'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = ref({
  user: router.currentRoute.value.params.user,
  code: router.currentRoute.value.params.code,
})
// 提交检查验证
const subCheckCode = async (): Promise<void> => {
  if (data.value.code !== undefined && data.value.user !== undefined) {
    await checkMail
      .checkVer(data.value)
      .then(() => {
        setTimeout(() => {
          void router.push('/Login')
        }, 2000)
      })
      .catch(() => {
        setTimeout(() => {
          void router.replace('/Login')
        }, 2000)
      })
  }
}
onMounted(() => {
  if (data.value.user !== undefined && data.value.code !== undefined) {
    void subCheckCode()
  }
})
</script>

<template>
  <div id="" class="CheckBox">
    <h1 v-if="data.user">正在激活{{ data.user }}账户 ...</h1>
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
  transform: translate(-50%, -50%);
}
</style>
