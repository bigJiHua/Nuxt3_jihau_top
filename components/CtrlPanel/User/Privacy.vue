<script setup lang="ts">
import { useUserDataStore } from '@/stores/useUserData';
import cagUserAPi from '@/api/User';
const store = useUserDataStore()
let UserData: any = reactive(store.Userdata.Users.UserPower)
const UserPrivacy = ref([
  { class: 'isrel', text: '查看我的关注', value: store.Userdata.Users.UserPower.isrel === 1 ? true : false },
  { class: 'islike', text: '查看我的喜欢', value: store.Userdata.Users.UserPower.islike === 1 ? true : false },
  { class: 'iscol', text: '查看我的收藏', value: store.Userdata.Users.UserPower.iscol === 1 ? true : false },
  { class: 'isspace', text: '查看我的空间', value: store.Userdata.Users.UserPower.isspace === 1 ? true : false }
])
const ChangUserPower = async (key: number, is: boolean) => {
  if (await ElMessageBoxTips.WarningTips('你确定要改变改权限吗？') === 'true') {
    for (const item in store.Userdata.Users.UserPower) {
      if (UserPrivacy.value[key].class === item) {
        if ((store.Userdata.Users.UserPower[item] === 1 ? true : false) === is) {
          ElMessage({
            message: '权限未发生改变！',
            type: 'warning'
          })
        } else {
          await cagUserAPi.CagUserPower(UserPrivacy.value[key].class, is ? 'true' : 'false')
          store.Userdata.Users.UserPower[item] = is ? 1 : 0
        }
      }
    }
  } else {
    for (const index in UserPrivacy.value) {
      for (const item in UserData) {
        if (UserPrivacy.value[index].class === item) {
          UserPrivacy.value[index].value = UserData[item] === 1 ? true : false
        }
      }
    }
  }
}
onMounted(() => {
  if (store.Userdata.Users.username) {
    UserData = store.Userdata.Users.UserPower
    for (const index in UserPrivacy.value) {
      for (const item in UserData) {
        if (UserPrivacy.value[index].class === item) {
          UserPrivacy.value[index].value = UserData[item] === 1 ? true : false
        }
      }
    }
  }

})
</script>

<template>
  <div class="Card">
    <div class="title">隐私设置</div>
    <div class="CardItem">
      <span>查看权限</span>
      <el-radio-group v-for="(item, index) in UserPrivacy" :key="index" v-model="item.value" class="UserRadio">
        <el-radio :label="true" size="large" @click="ChangUserPower(index, true)">允许{{ item.text }}</el-radio>
        <el-radio :label="false" size="large" @click="ChangUserPower(index, false)">不允许{{ item.text }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Card {
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: #F5F7FA;
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

