<script setup lang="ts">
import GetUData from '@/api/User'
import { useUserDataStore } from '@/stores/useUserData';
import { UploadFilled } from '@element-plus/icons-vue'
const store = useUserDataStore()
let UserData: any = reactive(store.Userdata.Users)
const uploadImgData = ref('')
const options = [
  { value: '北京', label: '北京' },
  { value: '上海', label: '上海' },
  { value: '天津', label: '天津' },
  { value: '重庆', label: '重庆' },
  { value: '深圳', label: '深圳' },
  { value: '武汉', label: '武汉' },
  { value: '长沙', label: '长沙' },
  { value: '台湾', label: '台湾' },
  { value: '香港', label: '香港' },
  { value: '澳门', label: '澳门' }
]
const uploadImg = ref(false)
// 修改用户信息
const ChangeUserData = async (type: string) => {
  // 获取用户信息
  const data: any = {}
  const userId = store.Userdata.Users.user_id
  switch (type) {
    case 'img':
      data.user_pic = uploadImgData.value
      break
    case 'bir':
      data.birthday = UserData.birthday
      break
    case 'sex':
      data.sex = UserData.sex
      break
    case 'city':
      data.city = UserData.city
      break
    case 'cont':
      data.user_content = UserData.user_content
      break
    default:
      break
  }
  // 调用GetUData.CagUserData方法修改用户信息
  const res = await GetUData.CagUserData(userId, data)
  if (res.status === 200 && type === 'img') {
    uploadImg.value = false
    location.reload()
  }
}
const { $setBase64Avator } = useNuxtApp()
// 上传图片事件
const cag_pic: any = function (e: any) {
  if (e.file.size > 1024 * 1024 * 5) {
    ElMessage({
      message: '图片大小不能超过5M',
      type: 'error'
    })
    uploadImg.value = false
    return
  }
  $setBase64Avator(e.file, true).then((res: any) => {
    uploadImgData.value = res
    if (uploadImgData.value !== '') {
      ChangeUserData('img')
    }
  })
}
onMounted(() => {
  if (store.Userdata.Users.username) {
    UserData = store.Userdata.Users
  }
})
</script>

<template>
  <div class="Card">
    <div class="title">基本信息</div>
    <div class="CardItem">
      <span>用户名：<el-tag>{{ store.Userdata.Users.username }}</el-tag></span>
      <span>UID： <el-tag> {{ store.Userdata.Users.user_id }}</el-tag></span>
      <span>身份： <el-tag>{{ store.Userdata.Users.useridentity }}</el-tag></span>
    </div>
    <div class="CardItem">
      <img v-if="store.Userdata.Users.user_pic" :src="store.Userdata.Users.user_pic" class="avatar"
        style="width: 45px ;height: 45px" />
      <el-button @click="uploadImg = true">修改头像</el-button>
    </div>
    <div class="CardItem">
      <span>生日</span>
      <div class="ItemSelect">
        <client-only>
          <el-date-picker v-model="store.Userdata.Users.birthday" type="date" placeholder="Pick a day" />
        </client-only>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('bir')">修改</el-button>
      </div>
    </div>
    <div class="CardItem">
      <span>城市</span>
      <div class="ItemSelect">
        <client-only>
          <el-select v-model="store.Userdata.Users.city" class="m-2" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </client-only>
        <el-input v-model="store.Userdata.Users.city"></el-input>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('city')">修改</el-button>
      </div>
    </div>
    <div class="CardItem">
      <span>性别</span>
      <div class="ItemSelect">
        <el-radio-group v-model="store.Userdata.Users.sex" class="ml-4">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div class="Item">

        <el-button type="primary" plain @click="ChangeUserData('sex')">修改</el-button>
      </div>
    </div>
  </div>
  <div class="Card">
    <div class="title">自我介绍</div>
    <div class="CardItem">
      <el-input v-model="store.Userdata.Users.user_content" type="textarea"></el-input>
      <el-button type="primary" plain @click="ChangeUserData('cont')">修改</el-button>
    </div>
  </div>
  <client-only>
    <el-dialog v-model="uploadImg" title="修改用户头像">
      <el-upload class="upload-demo" drag :multiple="false" :limit="1" :http-request="cag_pic">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          把图片拖进来或者<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png文件 大小500k以下
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </client-only>
</template>

<style lang="less" scoped>
.Item {
  >button {
    margin-left: 10px;
  }
}

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

.ItemSelect {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

}

.CardItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 20px 0;

  >span {
    margin: 5px;
  }
}

@media screen and(max-width: 755px) {}
</style>
