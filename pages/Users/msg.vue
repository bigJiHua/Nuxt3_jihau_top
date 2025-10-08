<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import getMsgApi from '@/api/User'
definePageMeta({
  layout: 'ctrl-view'
})
const UserMessageBox: any = ref({
  uMsg: {},
  sMsg: {}
})
const tabPosition = ref('top')
const uNullMsg = ref(true)
const sNullMsg = ref(true)
let timer: ReturnType<typeof setInterval> | null = null // 轮询定时器id

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
    void getUserMsg()
  })
}

onMounted(() => {
  if (process.client ?? false) {
    if (window.innerWidth < 756) {
      tabPosition.value = 'top'
    }
  }
  void getUserMsg()

  // 启动轮询，每隔5秒请求一次
  timer = setInterval(() => {
    void getUserMsg()
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer) // 清理定时器
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
