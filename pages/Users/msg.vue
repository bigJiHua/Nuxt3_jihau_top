<script setup lang="ts">
import getMsgApi from '@/api/User'
// import dayjs from 'dayjs'
definePageMeta({
  layout: 'ctrl-view'
})
const UserMessageBox: any = ref({
  uMsg: {},
  sMsg: {}
})
const tabPosition = ref('left')
const uNullMsg = ref(true)
const sNullMsg = ref(true)
const getUserMsg = async (num?: number): Promise<void> => {
  if (num === undefined) num = 0
  const { data: res } = await getMsgApi.GetUserMessage(num)
  UserMessageBox.value.uMsg = res.data.usermsg
  UserMessageBox.value.sMsg = res.data.systemmsg
  uNullMsg.value = res.data.usermsg.length === 0
  sNullMsg.value = res.data.systemmsg.length === 0
}
const isRead = async (id: string): Promise<void> => {
  await getMsgApi.DelUserMessage(id, 'read').then(() => {
    void getUserMsg
  })
}
onMounted(() => {
  if (process.client ?? false) {
    if (window.innerWidth < 756) {
      tabPosition.value = 'top'
    }
  }
  void getUserMsg()
  // 随机请求数据方法 test
  setInterval(() => {
    const randomNum = Math.floor(Math.random() * 101) + Math.floor(Math.random() * 101)
    if (randomNum % 3 === 0) {
      // 检查是否为偶数
      void getUserMsg() // 生成偶数后执行请求方法
      // console.log(dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'))
    }
  }, 1000 * 2)
})
</script>

<template>
  <div class="UserDataBox">
    <el-tabs :tabPosition="tabPosition" type="border-card" class="Usertabs">
      <el-tab-pane label="关于我的">
        <el-empty v-if="uNullMsg" description="暂无消息" />
        <div v-else class="UserMsgList">
          <MessageItem
            @GetnewList="getUserMsg"
            v-for="(item, index) in UserMessageBox.uMsg"
            :key="index"
            :data="item"
            @click="isRead(item.id)"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
        <el-empty v-if="sNullMsg" description="暂无消息" />
        <div v-else class="UserMsgList">
          <MessageItem
            v-for="(item, index) in UserMessageBox.sMsg"
            :key="index"
            :data="item"
            :isUMsg="false"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.UserDataBox,
.Usertabs {
  height: 100%;
  width: 100%;
}

:deep(.el-tabs__content) {
  padding: 5px;
}

:deep(.el-tab-pane) {
  height: calc(100vh - 80px);
  overflow-y: scroll;
}
</style>
