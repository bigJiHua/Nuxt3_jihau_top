<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { useUserDataStore } from '@/stores/useUserData'
import cagpwaApi from '@/api/User'
const store = useUserDataStore()
let UserData: any = reactive(store.Userdata.Users)
const dialogFormVisible = ref(false)
const data: any = ref({
  oldpwd: '',
  newpwd: '',
})
const pwdCheck = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入原密码和新密码'))
  } else {
    if (!/^[^\u4e00-\u9fa5]{6,30}$/.test(value)) {
      callback(new Error('请输入原密码和新密码且不能为空!且长度为6-12位'))
    }
    callback()
  }
}
const rules = reactive<FormRules<typeof data>>({
  oldpwd: [{ validator: pwdCheck, trigger: 'blur' }],
  newpwd: [{ validator: pwdCheck, trigger: 'blur' }],
})
const validata = (): boolean => {
  let bool = true
  if (data.value.oldpwd === '' || data.value.newpwd === '') {
    data.value.oldpwd = ''
    data.value.newpwd = ''
    ElMessage({
      message: '非法空值! 请输入长度为6-12位的原/新密码!',
      type: 'error',
    })
    data.value.oldpwd = ''
    data.value.newpwd = ''
    bool = false
  } else if (data.value.oldpwd === data.value.newpwd) {
    ElMessage({
      type: 'error',
      message: '新密码不能与旧密码相同',
    })
    data.value.oldpwd = ''
    data.value.newpwd = ''
    bool = false
  } else if (
    !/^[^\u4e00-\u9fa5]{6,30}$/.test(data.value.oldpwd) &&
    !/^[^\u4e00-\u9fa5]{6,30}$/.test(data.value.newpwd)
  ) {
    ElMessage({
      message: '请输入原密码和新密码且不能为空!且长度为6-12位',
      type: 'error',
    })
    data.value.oldpwd = ''
    data.value.newpwd = ''
    bool = false
  }
  return bool
}
// 修改用户密码
const ChangeUserPassword = async (action: boolean) => {
  dialogFormVisible.value = false
  if (!action) {
    data.value.oldpwd = ''
    data.value.newpwd = ''
    return
  }
  // 校验规则
  if (validata()) {
    const res = await cagpwaApi.CagPassword(data.value)
    if (res.data.status === 200) {
      // 退出当前登录
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('Username')
        localStorage.removeItem('Useridentity')
        localStorage.removeItem('UserData')
        store.setUserData([])
        setTimeout(() => {
          location.reload()
        }, 1500)
      }
    } else {
      data.value.oldpwd = ''
      data.value.newpwd = ''
    }
  }
}
// 注销用户
const delUser = async () => {
  const user = localStorage.getItem('Username')
  const deluser = localStorage.getItem('Username')
  if (user !== undefined && deluser !== undefined) {
    if (await WarningTips('你确定要注销自己的账号吗？')) {
      const res = await cagpwaApi.DelUser(user, deluser)
      if (res.data.status === 200) {
        // 退出当前登录
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
          localStorage.removeItem('Useridentity')
          localStorage.removeItem('UserData')
          store.setUserData([])
          setTimeout(() => {
            location.reload()
          }, 3000)
        }
      }
    }
  } else {
    alert('无法获取用户名，请刷新页面后再试')
  }
}
onMounted(() => {
  if (store.Userdata.Users.username) {
    UserData = store.Userdata.Users
  }
})
</script>

<template>
  <div class="Card" v-if="UserData">
    <div class="title">站点账号</div>
    <div class="CardItem">
      <span>邮箱</span>
      <el-input v-model="store.Userdata.Users.email" disabled> </el-input>
      <el-button type="primary" plain disabled>修改</el-button>
    </div>
    <div class="CardItem">
      <span>手机号</span>
      <el-input placeholder="XXXXXXXXXXX" disabled> </el-input>
      <el-button type="primary" plain disabled>修改</el-button>
    </div>
    <div class="CardItem">
      <span>密码</span>
      <el-input placeholder="***********" disabled> </el-input>
      <el-button type="primary" plain @click="dialogFormVisible = true"
        >修改</el-button
      >
    </div>
  </div>
  <div class="Card" v-if="UserData">
    <div class="title">更多选项</div>
    <div class="CardItem">
      不想继续使用该账号了？
      <el-button type="warning" plain @click="delUser">申请注销</el-button>
    </div>
  </div>
  <client-only>
    <el-dialog
      v-model="dialogFormVisible"
      title="修改密码"
      class="cagPwdPanel"
      top="30vh"
    >
      <el-form :model="data" :rules="rules">
        <el-form-item label="请输入原密码" prop="oldpwd">
          <el-input
            v-model="data.oldpwd"
            autocomplete="off"
            type="password"
            placeholder="请输入原密码"
            show-password
            minlength="6"
            maxlength="12"
          />
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newpwd">
          <el-input
            v-model="data.newpwd"
            autocomplete="off"
            type="password"
            placeholder="请输入新密码"
            show-password
            minlength="6"
            maxlength="12"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ChangeUserPassword(false)">取消</el-button>
          <el-button type="primary" @click="ChangeUserPassword(true)">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </client-only>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin: 20px 0;

  > span {
    display: inline-block;
    width: 15%;
  }

  > button {
    margin-left: 15px;
  }
}

@media screen and (max-width: 755px) {
  .CardItem {
    > span {
      display: inline-block;
      width: 25%;
    }
  }
}
</style>
