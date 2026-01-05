<template>
  <div class="maintenance-container">
    <div class="maintenance-content">
      <h1>
        <span class="emoji">
          <img src="../../assets/icon/safegurad.png" class="logo"  alt="维护中">
        </span>
        网站维护中...
      </h1>

      <p class="message">
        我们正在进行系统升级和维护，以提供更好的服务。 感谢您的耐心等待！
      </p>

      <div class="countdown-box">
        <p>
          预计恢复时间：
          <span class="time-highlight">{{ estimatedTime }}</span>
        </p>
      </div>

      <p class="contact-info">
        如有紧急事务，请发送邮件至：
        <a :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
      </p>

      <p class="footer-text">
        &copy; 2021 - {{ currentYear }} | {{ siteName }}
      </p>
    </div>
  </div>
</template>

<script setup>
// 如果您使用的是 Nuxt 3 或 Vue 3 Composition API
import { ref, computed } from 'vue'
definePageMeta({
  layout: 'simple'
})
const siteName = ref('Power by BigJiHua')
const estimatedTime = ref('尽快恢复') // 设置具体的预计恢复时间
const contactEmail = ref('jihuaserver@163.com')

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style scoped>
/* 使用 scoped 样式确保不影响其他组件 */
.maintenance-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5; /* 浅灰色背景 */
  font-family: Arial, sans-serif;
  text-align: center;
}

.maintenance-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji {
  margin-right: 10px;
}

.message {
  color: #666;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
}

.countdown-box {
  background-color: #e6f7ff; /* 浅蓝色背景 */
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 30px;
}

.countdown-box p {
  margin: 0;
  font-size: 1.2em;
  color: #0050b3; /* 深蓝色文字 */
}

.time-highlight {
  font-weight: bold;
  font-size: 1.3em;
  color: #faad14; /* 醒目的橙色 */
  margin-left: 10px;
}

.contact-info {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 40px;
}

.contact-info a {
  color: #1890ff;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.footer-text {
  font-size: 0.8em;
  color: #aaa;
}
</style>
