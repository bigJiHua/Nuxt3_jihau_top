<script setup lang="ts">
import { ref, onMounted } from 'vue'
import cagUserAPi from '@/api/User'

const UserPower = ref({
  isspace: 0,
  isrel: 0,
  isfans: 0,
  islike: 0,
  iscol: 0,
})

const UserPrivacy = ref<any[]>([])

const ChangUserPower = async (key: string, value: boolean): Promise<void> => {
  if (await WarningTips('你确定要改变改权限吗？')) {
    await cagUserAPi.CagUserPower(key, value ? 'true' : 'false')
    getUserPower()
  } else {
    UserPrivacy.value.map((item) =>
      item.class === key ? (item.value = !value) : item.value
    )
  }
}

const getUserPower = async (): Promise<void> => {
  const { data: res } = await cagUserAPi.CagUserPower('get', 'true')
  UserPower.value = res.data[0]
  // 更新 UserPrivacy
  UserPrivacy.value = [
    {
      class: 'isspace',
      text: '查看我的空间',
      value: Number(UserPower.value.isspace) === 1,
    },
    {
      class: 'isrel',
      text: '查看我的关注',
      value: Number(UserPower.value.isrel) === 1,
    },
    {
      class: 'isfans',
      text: '查看我的粉丝',
      value: Number(UserPower.value.isfans) === 1,
    },
    {
      class: 'islike',
      text: '查看我的喜欢',
      value: Number(UserPower.value.islike) === 1,
    },
    {
      class: 'iscol',
      text: '查看我的收藏',
      value: Number(UserPower.value.iscol) === 1,
    },
  ]
}

onMounted(() => {
  void getUserPower()
})
</script>

<template>
  <div class="Card">
    <div class="title">隐私设置</div>
    <div class="CardItem">
      <p v-for="(item, index) in UserPrivacy" :key="index" class="UserRadio">
        {{ item.text }}
        &nbsp;&nbsp;
        <el-switch
          v-model="item.value"
          class="ml-2"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="YES"
          inactive-text="No!"
          @click="ChangUserPower(item.class, item.value)"
        />
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Card {
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: #f5f7fa;
  margin-bottom: 15px;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #000000;
  padding-bottom: 5px;
}

.CardItem {
  .UserRadio {
    display: flex;
    align-items: center;
  }
}
</style>
