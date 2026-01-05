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

// 核心修复1：封装用户数据，加空值兜底（避免访问undefined）
const userInfo = computed(() => store.Userdata?.Users || {})

// 补充：WarningTips函数（你代码中用到但未定义）
const WarningTips = async (message: string) => {
  try {
    await ElMessageBox.confirm(message, '确认修改', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    return true
  } catch {
    return false
  }
}

// 修改用户信息
const ChangeUserData = async (type: string): Promise<void> => {
  // 核心修复2：先判断用户是否登录（user_id是否存在）
  const userId = userInfo.value.user_id
  if (!userId) {
    ElMessage.error('未获取到用户信息，请重新登录')
    return
  }

  const data: any = {}
  let message = ''
  
  switch (type) {
    case 'img':
      data.user_pic = uploadImgData.value
      message = '确定要修改头像吗？'
      break
    case 'bir':
      // 核心修复3：加可选链保护，dayjs空值处理
      data.birthday = dayjs(userInfo.value.birthday).isValid() 
        ? dayjs(userInfo.value.birthday).format('YYYY-MM-DD')
        : ''
      message = '确定要修改生日吗？'
      break
    case 'sex':
      // 核心修复4：加可选链，兜底默认值
      data.sex = userInfo.value.sex || '男'
      message = '确定要修改性别吗？'
      break
    case 'city':
      data.city = userInfo.value.city || ''
      message = '确定要修改城市吗？'
      break
    case 'cont':
      data.user_content = userInfo.value.user_content || ''
      message = '确定要修改自我介绍吗？'
      break
    default:
      break
  }

  if (await WarningTips(message)) {
    try { // 核心修复5：加异常捕获，避免接口报错冒泡
      const res = await GetUData.CagUserData(userId, data)
      if (res?.status === 200 && type === 'img') {
        uploadImg.value = false
        ElMessage.success('头像修改成功')
      }
    } catch (error) {
      console.error('修改用户信息失败：', error)
      ElMessage.error('修改失败，请稍后重试')
    }
  }
}

const { $setBase64Avator } = useNuxtApp()
// 上传图片事件
const cagUserPic = (e: any): any | undefined => {
  // 核心修复6：先判断是否登录
  if (!userInfo.value.user_id) {
    ElMessage.error('请先登录')
    uploadImg.value = false
    return
  }

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
    if (uploadImgData.value) {
      void ChangeUserData('img')
    }
  }).catch(error => { // 核心修复7：捕获图片上传异常
    console.error('图片上传失败：', error)
    ElMessage.error('图片上传失败')
    uploadImg.value = false
  })
}
</script>

<template>
  <!-- 核心修复8：加v-if判断，未登录时不渲染整个组件 -->
  <div v-if="userInfo?.user_id" class="Card">
    <div class="title">基本信息</div>
    <div class="CardItem">
      <div>
        用户:
        <!-- 核心修复9：加可选链?.保护username -->
        <nuxt-link
          :to="'/space/' + (userInfo?.username || '')"
          style="color: #fb7299; margin-left: 10px"
        >
          {{ userInfo?.username || '未设置' }}
        </nuxt-link>
      </div>
      <div>
        UID： <el-tag> {{ userInfo?.user_id || '未设置' }}</el-tag>
      </div>
      <div>
        身份： <el-tag>{{ userInfo?.useridentity || '普通用户' }}</el-tag>
      </div>
    </div>
    <div class="CardItem">
      <!-- 核心修复10：加可选链?.保护user_pic -->
      <img
        alt="用户头像"
        v-if="userInfo?.user_pic"
        :src="userInfo?.user_pic"
        class="avatar"
        style="width: 45px; height: 45px"
      />
      <el-button @click="uploadImg = true">修改头像</el-button>
    </div>
    <div class="CardItem">
      <span>生日</span>
      <div class="ItemSelect">
        <client-only>
          <!-- 核心修复11：加可选链?.保护birthday -->
          <el-date-picker
            v-model="userInfo.birthday"
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
          <!-- 核心修复12：加可选链?.保护city -->
          <el-select
            v-model="userInfo.city"
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
        <el-input v-model="userInfo.city"></el-input>
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
        <!-- 核心修复13：加可选链?.保护sex -->
        <el-radio-group v-model="userInfo.sex" class="ml-4">
          <el-radio :value="'男'" size="large">男</el-radio>
          <el-radio :value="'女'" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div class="Item">
        <el-button type="primary" plain @click="ChangeUserData('sex')"
          >修改</el-button
        >
      </div>
    </div>
  </div>

  <!-- 核心修复14：未登录时不渲染自我介绍组件 -->
  <div v-if="userInfo?.user_id" class="Card">
    <div class="title">自我介绍</div>
    <div class="CardItem">
      <!-- 核心修复15：加可选链?.保护user_content -->
      <el-input
        v-model="userInfo.user_content"
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
    <!-- 核心修复16：未登录时不显示头像修改弹窗 -->
    <el-dialog v-model="uploadImg" v-if="userInfo?.user_id" title="修改用户头像">
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