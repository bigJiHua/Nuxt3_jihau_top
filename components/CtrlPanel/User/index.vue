<script setup lang="ts">
import GetUData from '@/api/User'
import { useUserDataStore } from '@/stores/useUserData'
import { UploadFilled } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
const store = useUserDataStore()
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
  { value: '澳门', label: '澳门' },
]
const uploadImg = ref(false)
// 修改用户信息
const ChangeUserData = async (type: string): Promise<void> => {
  // 获取用户信息
  const data: any = {}
  let message = ''
  const userId = store.Userdata.Users.user_id
  switch (type) {
    case 'img':
      data.user_pic = uploadImgData.value
      message = '确定要修改头像吗？'
      break
    case 'bir':
      data.birthday = dayjs(store.Userdata.Users.birthday).format('YYYY-MM-DD')
      message = '确定要修改生日吗？'
      break
    case 'sex':
      data.sex =
        store.Userdata.Users.sex === '' ? '男' : store.Userdata.Users.sex
      message = '确定要修改性别吗？'
      break
    case 'city':
      data.city = store.Userdata.Users.city
      message = '确定要修改城市吗？'
      break
    case 'cont':
      data.user_content = store.Userdata.Users.user_content
      message = '确定要修改自我介绍吗？'
      break
    default:
      break
  }
  // 调用GetUData.CagUserData方法修改用户信息
  if (await WarningTips(message)) {
    const res = await GetUData.CagUserData(userId, data)
    if (res.status === 200 && type === 'img') {
      uploadImg.value = false
    }
  }
}
const { $setBase64Avator } = useNuxtApp()
// 上传图片事件
const cagUserPic = (e: any): any | undefined => {
  if (e.file.size > 1024 * 1024 * 5) {
    ElMessage({
      message: '图片大小不能超过5M',
      type: 'error',
    })
    uploadImg.value = false
    return
  }
  void $setBase64Avator(e.file, true).then((res: any) => {
    uploadImgData.value = res
    if (uploadImgData.value !== '') {
      void ChangeUserData('img')
    }
  })
}
</script>

<template>
  <div class="Card">
    <div class="title">基本信息</div>
    <div class="CardItem">
      <div>
        用户:<nuxt-link
          :to="'/space/' + store.Userdata.Users.username"
          style="color: #fb7299; margin-left: 10px"
          >{{ store.Userdata.Users.username }}</nuxt-link
        >
      </div>
      <div>
        UID： <el-tag> {{ store.Userdata.Users.user_id }}</el-tag>
      </div>
      <div>
        身份： <el-tag>{{ store.Userdata.Users.useridentity }}</el-tag>
      </div>
    </div>
    <div class="CardItem">
      <img
        alt="用户头像"
        v-if="store.Userdata.Users.user_pic"
        :src="store.Userdata.Users.user_pic"
        class="avatar"
        style="width: 45px; height: 45px"
      />
      <el-button @click="uploadImg = true">修改头像</el-button>
    </div>
    <div class="CardItem">
      <span>生日</span>
      <div class="ItemSelect">
        <client-only>
          <el-date-picker
            v-model="store.Userdata.Users.birthday"
            type="date"
            placeholder="Pick a day"
          />
        </client-only>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('bir')"
          >修改</el-button
        >
      </div>
    </div>
    <div class="CardItem">
      <span>城市</span>
      <div class="ItemSelect">
        <client-only>
          <el-select
            v-model="store.Userdata.Users.city"
            class="m-2"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </client-only>
        <el-input v-model="store.Userdata.Users.city"></el-input>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('city')"
          >修改</el-button
        >
      </div>
    </div>
    <div class="CardItem">
      <span>性别</span>
      <div class="ItemSelect">
        <el-radio-group v-model="store.Userdata.Users.sex" class="ml-4">
          <el-radio :label="'男'" size="large">男</el-radio>
          <el-radio :label="'女'" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('sex')"
          >修改</el-button
        >
      </div>
    </div>
  </div>
  <div class="Card">
    <div class="title">自我介绍</div>
    <div class="CardItem">
      <el-input
        v-model="store.Userdata.Users.user_content"
        type="textarea"
        :rows="3"
        maxlength="120"
      ></el-input>
      <el-button type="primary" plain @click="ChangeUserData('cont')"
        >修改</el-button
      >
    </div>
  </div>
  <client-only>
    <el-dialog v-model="uploadImg" title="修改用户头像">
      <el-upload
        class="upload-demo"
        drag
        :multiple="false"
        :limit="1"
        :http-request="cagUserPic"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">把图片拖进来或者<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">jpg/png文件 大小500k以下</div>
        </template>
      </el-upload>
    </el-dialog>
  </client-only>
</template>

<style lang="less" scoped>
.Item {
  > button {
    margin-left: 10px;
  }
}

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
  > span {
    margin: 5px;
  }
  > .el-textarea {
    width: 80%;
  }
}

@media screen and(max-width: 755px) {
}
</style>
