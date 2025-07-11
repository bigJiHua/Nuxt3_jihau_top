<script setup lang="ts">
import getNlApi from '@/api/Article'
import { RefreshRight } from '@element-plus/icons-vue'

let notifyList = ref<any[]>([])
let AllNum = ref(0)

const getDevP = async (offset: number = 0, isRefresh: boolean = false) => {
  const { data: res } = await getNlApi.getNotifyList(offset)
  notifyList.value = res.data
  AllNum.value = res.Num
  if (isRefresh && res.status === 200) {
    ElMessage({
      message: '获取最新通知成功！',
      type: 'success',
    })
  }
}

// 初始加载
void getDevP(0)

// 分页事件
const handlePageChange = (page: number) => {
  void getDevP((page - 1) * 20)
}

useHead({
  title: '通知',
  meta: [
    { name: 'keywords', content: '通知、Notify、JiHua、jihau.top、通知页面' },
    {
      name: 'description',
      content: '这是jihau.top网站的通知页面，欢迎您访问此网站！',
    },
  ],
})

// 时间拆分辅助函数，类似发展历程页面用法
const splitDate = (dateStr: string) => {
  if (!dateStr) return { year: '', md: '' }
  const parts = dateStr.split('-')
  if (parts.length >= 3) {
    return { year: parts[0], md: parts[1] + '-' + parts[2] }
  }
  return { year: dateStr, md: '' }
}
</script>

<template>
  <div class="DevProcess">
    <div class="header">
      <h1 class="page-title">
        <span>📢 通知列表</span>
        <span class="refresh-btn" @click="getDevP(0, true)">
          <el-icon><RefreshRight /></el-icon> 刷新
        </span>
      </h1>
      <p class="page-subtitle">查看最新通知和公告</p>
    </div>
    <!-- 展示部分 -->
    <div class="card-grid">
      <div
        class="notify-card"
        v-for="(item, index) in notifyList"
        :key="item.notify_id"
        :style="{
          background:
            index % 2 === 0
              ? 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
              : 'linear-gradient(135deg, #f1f8ff, #e3f2fd)',
        }"
      >
        <!-- 时间背景 -->
        <div class="card-bg-time">
          <div class="year">{{ splitDate(item.pub_date).year }}</div>
          <div class="md">{{ splitDate(item.pub_date).md }}</div>
        </div>

        <div class="notify-content">
          <nuxt-link class="notify-title" :to="`/Notify/${item.notify_id}`">{{
            item.title
          }}</nuxt-link>
        </div>
        <div class="card-footer">
          <nuxt-link
            class="card-link"
            :to="`/Notify/${item.notify_id}`"
            target="_blank"
            >🔗 点击查看详情</nuxt-link
          >
        </div>
      </div>
    </div>
    <!-- 分页按钮 -->
    <div class="pagBtnArea">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="AllNum"
        :page-size="20"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.DevProcess {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.page-title {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #1565c0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.refresh-btn {
  font-size: 1rem;
  color: #1565c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.page-subtitle {
  font-size: 16px;
  color: #607d8b;
  margin-bottom: 32px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  height: 65vh;
  overflow-y: auto;
  padding-right: 10px;
}
@media (max-width: 755px) {
  .card-grid {
    height: 70vh;
  }
}

.card-grid::-webkit-scrollbar {
  width: 8px;
}

.card-grid::-webkit-scrollbar-thumb {
  background-color: rgba(21, 101, 192, 0.3);
  border-radius: 4px;
}

.notify-card {
  position: relative;
  border-radius: 12px;
  padding: 10px 6px 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 95px;
  overflow: hidden;
  cursor: pointer;
}
.notify-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 时间背景拆分两行，透明且大号字体，绝对定位 */
.card-bg-time {
  position: absolute;
  top: 20px;
  left: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.1);
  font-weight: 900;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  user-select: none;
}

.card-bg-time .year {
  font-size: 70px;
  letter-spacing: 4px;
}

.card-bg-time .md {
  font-size: 40px;
  margin-top: -10px;
  letter-spacing: 2px;
}

/* 内容层需置于时间背景上面 */
.notify-content {
  position: relative;
  z-index: 1;
}

.notify-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a237e;
  text-decoration: none;
  margin-bottom: 10px;
  word-break: break-word;
}

.notify-title:hover {
  color: #1565c0;
  text-decoration: underline;
}
.card-footer {
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  right: 8px;
}
.card-link {
  font-size: 14px;
  color: #1e88e5;
  text-decoration: underline;
}

.pagBtnArea {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
