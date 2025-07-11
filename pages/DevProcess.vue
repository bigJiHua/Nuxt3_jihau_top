<script setup lang="ts">
import { computed } from 'vue'

const ListItem: any = ref([])

const SUrl = `${reqConfig.baseUrl}/data/Setting`
useFetch(SUrl, {
  method: 'get',
  params: {
    value: 'DevP',
  },
})
  .then((response) => {
    const res: any = response.data.value
    ListItem.value = res.data
  })
  .catch((error) => {
    console.error('Request failed:', error)
  })

useHead({
  title: 'jihau_top网站发展历程',
  meta: [
    {
      name: 'keywords',
      content: '发展、Login、JiHua、jihau.top、网站发展历程页面',
    },
    {
      name: 'description',
      content: '这是jihau.top网站的发展历程页面，欢迎您访问此网站！',
    },
  ],
})

// 辅助函数：拆分时间字符串（假设格式类似 "2025-05-17"）
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
    <h1 class="page-title">🚀 网站发展历程</h1>
    <p class="page-subtitle">查看网站每次迭代的更新与进步</p>
    <div class="card-grid">
      <div
        class="dev-card"
        v-for="(item, index) in ListItem"
        :key="index"
        :style="{
          background:
            index % 2 === 0
              ? 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
              : 'linear-gradient(135deg, #f1f8ff, #e3f2fd)',
        }"
      >
        <!-- 时间背景拆分显示 -->
        <div class="card-bg-time">
          <div class="year">{{ splitDate(item.set_change).year }}</div>
          <div class="md">{{ splitDate(item.set_change).md }}</div>
        </div>
        <!-- 正文内容 -->
        <div class="card-header">
          <h3 class="card-title">{{ item.set_title }}</h3>
        </div>
        <div class="card-footer" v-if="item.set_url">
          <a class="card-link" :href="item.set_url" target="_blank"
            >🔗 点击查看详情</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.DevProcess {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.page-title {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #1565c0;
}

.page-subtitle {
  font-size: 16px;
  color: #607d8b;
  margin-bottom: 32px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.dev-card {
  position: relative;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 120px;
  overflow: hidden;
}

.dev-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 背景时间拆分两行 */
.card-bg-time {
  position: absolute;
  top: 35px;
  left: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.158);
  font-weight: 900;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  user-select: none;
}

.card-bg-time .year {
  font-size: 80px;
}

.card-bg-time .md {
  font-size: 45px;
  margin-top: -8px; /* 让两行更紧凑 */
}

/* 内容层 */
.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a237e;
  word-break: break-word;
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
</style>
