<script setup lang="ts">
const props = defineProps({
  regcontent: {
    type: Object,
    default: () => ({
      text1: '提示1',
      text2: '提示2',
      text3: '提示3',
    }),
  },
  btn: {
    type: Object,
    default: () => ({
      text: '登录',
      link: '/Login'
    })
  }
})
</script>

<template>
  <div class="verification-area">
    <h2 class="verification-title">{{ regcontent.text1 }}</h2>
    <p class="verification-message">1.{{ regcontent.text2 }}</p>
    <p class="verification-instruction">2.{{ regcontent.text3 }}</p>
    <p class="verification-troubleshoot">请联系站长处理！</p>
    <nuxt-link :to="btn.link">
      <el-button
        class="divbtn"
        type="primary"
        plain
        style="float: right"
        >{{ btn.text }}</el-button
      >
    </nuxt-link>
  </div>
</template>

<style lang="less" scoped>
// 区域的样式
.verification-area {
  display: flex;
  flex-direction: column;
  padding: 30px; // 内边距
  width: 100%; // 确保占据可用宽度
  max-width: 400px; // 限制最大宽度，避免过宽
  box-sizing: border-box; // 包含 padding 在宽度内
  > h2 {
    align-items: center; // 水平居中所有子项
  }
}
.verification-title {
  font-size: 2em; // 标题更大
  color: #409eff; // Element Plus 主题蓝
  margin-bottom: 20px;
  font-weight: bold;
}

.verification-message,
.verification-instruction,
.verification-troubleshoot {
  font-size: 1rem;
  line-height: 1.6;
  color: #606266; // Element Plus 默认文本颜色
  margin-bottom: 10px; // 段落间距
}

.verification-instruction {
  font-weight: 500;
}

.verification-troubleshoot {
  font-size: 0.9rem;
  color: #909399; // 稍微浅一些的颜色
  margin-top: 15px; // 与上方内容间隔
}
// 响应式调整（如果需要为小屏幕单独调整 202 区域）
@media (max-width: 768px) {
  .verification-area {
    padding: 20px;
    max-width: none; // 小屏幕下不限制最大宽度
  }
  .verification-title {
    font-size: 1.8em;
  }
}
// DIV BTN
.divbtn {
  width: 120px;
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #5291d1;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
}
.divbtn {
  background: linear-gradient(135deg, #9dcdf7 0%, #4c93ff 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

.divbtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(67, 97, 238, 0.4);
}

.divbtn:active {
  transform: translateY(0);
}

.divbtn.loading {
  position: relative;
  color: transparent;
}

.divbtn.loading::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

// DIV INPUT
:deep(.el-input__wrapper) {
  border-radius: 50px;
  padding: 10px;
}
</style>
