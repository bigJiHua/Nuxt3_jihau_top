<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { useUserDataStore } from '@/stores/useUserData'
import cagpwaApi from '@/api/User'
const store = useUserDataStore()
let UserData: any = reactive(store.Userdata.Users)
const dialogFormVisible = ref(false)
const data: any = reactive({
  oldpwd: '',
  newpwd: ''
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
  newpwd: [{ validator: pwdCheck, trigger: 'blur' }]
})
const validata = () => {
  let bool = true
  if (!/^[^\u4e00-\u9fa5]{6,30}$/.test(data.oldpwd)) {
    ElMessage({
      message: '请输入原密码和新密码且不能为空!且长度为6-12位',
      type: 'error'
    })
    data.oldpwd = ''
    data.newpwd = ''
    bool = false
  } else if (!/^[^\u4e00-\u9fa5]{6,30}$/.test(data.newpwd)) {
    ElMessage({
      message: '请输入原密码和新密码且不能为空!且长度为6-12位',
      type: 'error'
    })
    data.oldpwd = ''
    data.newpwd = ''
    bool = false
  } else if (data.oldpwd === '' || data.newpwd === '') {
    data.oldpwd = ''
    data.newpwd = ''
    ElMessage({
      message: '请输入原密码和新密码且不能为空!且长度为6-12位',
      type: 'error'
    })
    data.oldpwd = ''
    data.newpwd = ''
    bool = false
  } else if (data.oldpwd === data.newpwd) {
    ElMessage({
      type: 'error',
      message: '新密码不能与旧密码相同'
    })
    data.oldpwd = ''
    data.newpwd = ''
    bool = false
  }
  return bool
}
const ChangeUserPassword = async (action: boolean) => {
  dialogFormVisible.value = false
  if (!action) {
    data.oldpwd = ''
    data.newpwd = ''
    return
  }
  if (validata()) {
    const res = await cagpwaApi.CagPassword(data)
    if (res.data.status === 200) {
      //退出当前登录
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('Username')
        localStorage.removeItem('Useridentity')
        localStorage.removeItem('UserData')
        store.setUserData([])
        setTimeout(() => {
          location.reload()
        }, 1500);
      }
    }
  }

}
const delUser = async () => {
  const user = localStorage.getItem('Username')
  const deluser = localStorage.getItem('Username')
  if (user && deluser) {
    if (await ElMessageBoxTips.WarningTips('你确定要注销自己的账号吗？') === 'true') {
      if (await ElMessageBoxTips.WarningTips('你确定要注销自己的管理员账号吗？555') === 'true') {
        const res = await cagpwaApi.DelUser(user, deluser)
        if (res.data.status === 200) {
          //退出当前登录
          if (process.client) {
            localStorage.removeItem('token')
            localStorage.removeItem('Username')
            localStorage.removeItem('Useridentity')
            localStorage.removeItem('UserData')
            store.setUserData([])
            setTimeout(() => {
              location.reload()
            }, 3000);
          }
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
      <el-input v-model="store.Userdata.Users.email" disabled>
      </el-input>
      <el-button type="primary" plain disabled>修改</el-button>
    </div>
    <div class="CardItem">
      <span>手机号</span>
      <el-input placeholder="XXXXXXXXXXX" disabled>
      </el-input>
      <el-button type="primary" plain disabled>修改</el-button>
    </div>
    <div class="CardItem">
      <span>密码</span>
      <el-input placeholder="***********" disabled>
      </el-input>
      <el-button type="primary" plain @click="dialogFormVisible = true">修改</el-button>
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
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="data" :rules="rules">
        <el-form-item label="请输入旧密码" type="password" show-password prop="oldpwd">
          <el-input v-model="data.oldpwd" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入新密码" type="password" show-password prop="newpwd">
          <el-input v-model="data.newpwd" autocomplete="off" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin: 20px 0;

  >span {
    display: inline-block;
    width: 15%;
  }

  >button {
    margin-left: 15px;
  }
}

@media screen and(max-width: 755px) {
  .CardItem {
    >span {
      display: inline-block;
      width: 25%;
    }
  }

}
</style>
