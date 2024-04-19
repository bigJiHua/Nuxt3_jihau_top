<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import getMsgApi from '@/api/User'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isUMsg: {
    type: Boolean,
    default: true,
  },
})
// 删除消息
const delMsg = async (id: string): Promise<any> => {
  if (id === '' || id === undefined) {
    ElMessage({
      message: '参数不全！！！',
      type: 'warning',
    })
    return
  }
  // eslint-disable-next-line no-useless-return
  if (!(await WarningTips('你确定要删除这个通知吗？'))) return
  getMsgApi
    .DelUserMessage(id,'delete')
    .then(() => {
      getNewListData()
    })
    .catch((err: any) => {
      console.log(err)
    })
}
// 申明对父组件操作
const emit = defineEmits(['GetnewList'])
const getNewListData = (): void => {
  emit('GetnewList')
}
</script>

<template>
  <div class="MsgBoxItem">
    <div class="MsgBoxItemLeft">
      <div class="UserAvatar" v-if="isUMsg">
        <img :src="data.sendUP" :alt="data.sendU" />
      </div>
      <div class="Msg">
        <div class="MsgHeader">
          <nuxt-link :to="'/space/' + data.sendU" class="name" v-if="isUMsg">{{
            data.sendU
          }}</nuxt-link>
          <span class="name" v-else>{{ data.senduser }}</span>
          <div class="MsgBoxItemRightTitle">{{ data.title }}</div>
          <div class="MsgBoxItemRightTitleTime">
            {{ dayjs(Number(data.pub_date)).format('YYYY-MM-DD') }}
          </div>
        </div>
        <div class="MsgBoxItemRightContent" v-if="data.type !== 'relation'">
          {{ data.content }}
        </div>
      </div>
    </div>
    <div class="MsgAction" v-if="isUMsg">
      <el-button
        type="danger"
        plain
        :icon="Delete"
        circle
        @click="delMsg(data.id)"
      />
    </div>
    <div class="isState" v-if="data.state === 0"></div>
  </div>
</template>

<style lang="less" scoped>
.MsgBoxItem {
  display: flex;
  justify-content: space-between;
  background-color: var(--el-color-primary-light-9);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
}

.MsgBoxItemLeft {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.UserAvatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;

  > img {
    width: 100%;
    height: 100%;
  }
}

.Msg {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  margin-right: 10px;

  .MsgBoxItemRightContent {
    margin: 8px 0;
  }
}

.MsgHeader {
  display: flex;
  align-items: center;

  .name {
    color: #fb7299;
    font-size: 1.2rem;
    margin-right: 5px;
  }

  .MsgBoxItemRightTitleTime {
    margin-left: 10px;
  }
}

.MsgBoxItemRightTitleTime {
  font-size: 0.8rem;
}

.MsgBoxItem {
  position: relative;
}
.isState {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fb7299;
  right: 0;
  top: 0;
}
@media screen and(max-width: 755px) {
  .MsgBoxItem {
    padding: 5px;
    margin: 5px;
  }
  .MsgBoxItemRightTitle {
    font-size: 0.8rem;
  }
}
</style>
