<script setup>
definePageMeta({
  layout: 'pagedf',
})

const width = ref(0)
const height = ref(0)
const deviceType = ref('未知')
const boxWidth = ref(400) // 初始宽度
const boxHeight = ref(300) // 初始高度
const testBox = ref(null)
const customWidth = ref(400)
const customHeight = ref(300)
const sidebarOpen = ref(false)
const sidebarbr = ref(false)
const color1 = ref('#409EFF')
const color2 = ref('#409E')
const br1 = ref(1) // solid width
const br2 = ref(1) // br width
const text = ref(customWidth.value + 'px × ' + customHeight.value + 'px')

const updateViewportInfo = () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
  deviceType.value =
    width.value < 600 ? '📱 手机' : width.value < 1024 ? '📲 平板' : '💻 桌面'
}

const applyCustomSize = () => {
  boxWidth.value = customWidth.value
  boxHeight.value = customHeight.value
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  sidebarbr.value = false // 关闭边框设置
}

const setPreset = (width, height) => {
  customWidth.value = width
  customHeight.value = height
  applyCustomSize()
}
useHead({
  title: '测试魔盒',
  meta: [
    {
      name: 'keywords',
      content: '测试盒子、JiHua、jihau.top、测试页面',
    },
    {
      name: 'description',
      content: '这是jihau_top网站的测试页面，欢迎您访问此网站！',
    },
  ],
})
let resizeObserver

onMounted(() => {
  if (process.client) {
    updateViewportInfo()
    window.addEventListener('resize', updateViewportInfo)
    // 监听测试框尺寸变化
    resizeObserver = new ResizeObserver(() => {
      if (testBox.value) {
        boxWidth.value = testBox.value.offsetWidth
        boxHeight.value = testBox.value.offsetHeight
        // 更新输入框值以匹配实际尺寸
        customWidth.value = boxWidth.value
        customHeight.value = boxHeight.value
      }
    })

    if (testBox.value) resizeObserver.observe(testBox.value)

    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        sidebarOpen.value = false
      }
    })
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', updateViewportInfo)
    if (resizeObserver && testBox.value) {
      resizeObserver.disconnect()
    }
    document.removeEventListener('keydown', null)
  }
})
</script>

<template>
  <ClientOnly>
    <div class="page">
      <header class="header">
        <div class="header-content">
          <div class="info-bar">
            <div class="info-item">
              <NuxtLink to="/" class="value">返回主页</NuxtLink>
            </div>
            <div class="info-item">
              <span class="title">窗口宽度:</span>
              <span class="value">{{ width }}px</span>
            </div>
            <div class="info-item">
              <span class="title">窗口高度:</span>
              <span class="value">{{ height }}px</span>
            </div>
            <div class="info-item">
              <span class="title">设备类型:</span>
              <span class="value">{{ deviceType }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 悬浮控制侧边栏 -->
      <aside class="control-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="size" v-if="!sidebarbr">
          <div class="sidebar-header">
            <h2>尺寸控制</h2>
            <button @click="sidebarbr = true" class="close-btn">边框</button>
            <button @click="toggleSidebar" class="close-btn">关闭</button>
          </div>

          <div class="size-controls">
            <div class="input-group">
              <label for="customWidth">宽度 (px):</label>
              <input
                type="number"
                id="customWidth"
                v-model.number="customWidth"
                min="100"
                placeholder="输入宽度"
              />
            </div>
            <div class="input-group">
              <label for="customHeight">高度 (px):</label>
              <input
                type="number"
                id="customHeight"
                v-model.number="customHeight"
                min="100"
                placeholder="输入高度"
              />
            </div>
            <button @click="applyCustomSize" class="apply-button">
              <i class="fa fa-magic"></i> 应用尺寸
            </button>
          </div>

          <div class="quick-presets">
            <h3>快速预设</h3>
            <div class="preset-buttons">
              <button @click="setPreset(411, 824)" class="preset-btn">
                手机
              </button>
              <button @click="setPreset(1080, 771)" class="preset-btn">
                平板
              </button>
              <button @click="setPreset(1024, 768)" class="preset-btn">
                笔记本
              </button>
              <button @click="setPreset(83.89, 32)" class="preset-btn">
                按钮
              </button>
            </div>
          </div>
        </div>
        <div class="border-radius" v-else>
          <div class="sidebar-header">
            <h2>样式控制</h2>
            <button @click="sidebarbr = false" class="close-btn">大小</button>
            <button @click="toggleSidebar" class="close-btn">关闭</button>
          </div>

          <div class="size-controls">
            <div class="input-group">
              <label for="customWidth">边框弧度 (px):</label>
              <el-slider v-model="br1" />
              <input
                type="number"
                id="customWidth"
                v-model.number="br1"
                min="0"
              />
              <label for="customWidth">边框粗度 (px):</label>
              <el-slider v-model="br2" />
              <input
                type="number"
                id="customWidth"
                v-model.number="br2"
                min="0"
              />
            </div>
            <div class="input-group">
              <label for="customHeight">填充颜色 (px):</label>
              <button class="apply-button">
                <el-color-picker v-model="color1" show-alpha />
              </button>
              <label for="customHeight">边框颜色 (px):</label>
              <button class="apply-button">
                <el-color-picker v-model="color2" show-alpha />
              </button>
            </div>
          </div>
          <div class="quick-presets">
            <div class="input-group">
              <label for="customHeight">填充文字:</label>
              <input type="text" id="customWidth" v-model="text" />
            </div>
          </div>
        </div>
      </aside>

      <!-- 侧边栏开关按钮 -->
      <button @click="toggleSidebar" class="sidebar-toggle">功能</button>

      <!-- 中央固定的测试区域 -->
      <div class="test-container">
        <section
          ref="testBox"
          class="test-box"
          :style="
            'width:' +
            boxWidth +
            'px; height:' +
            boxHeight +
            'px;border:' +
            br2 +
            'px solid ' +
            color2 +
            '; border-radius:' +
            br1 +
            'px; background-color: ' +
            color1 +
            ';'
          "
        >
          <div class="test-box-content">
            <div class="dimension-display">
              {{ text }}
            </div>
          </div>
        </section>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
:root {
  --primary-color: #66ccff;
  --secondary-color: #3498db;
  --dark-bg: #121212;
  --card-bg: #1e1e1e;
  --accent-color: #e74c3c;
}

.page {
  background: var(--dark-bg);
  color: #eee;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.header {
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  padding: 1.5em 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2em;
}

.header h1 {
  margin: 0;
  font-size: 2em;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 0.5em;
  text-shadow: 0 0 10px rgba(102, 204, 255, 0.3);
}

.info-bar {
  display: flex;
  justify-content: center;
  gap: 1.5em;
  flex-wrap: wrap;
}

.info-item {
  background: rgba(30, 30, 30, 0.8);
  padding: 0.8em 1.5em;
  border-radius: 8px;
  border: 1px solid rgba(102, 204, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-color: rgba(102, 204, 255, 0.5);
}

.title {
  font-size: 0.9em;
  color: #aaa;
  margin-bottom: 0.2em;
}

.value {
  font-size: 1.2em;
  color: var(--primary-color);
  font-weight: 500;
}

.test-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  position: relative;
  z-index: 1;
}

.test-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(102, 204, 255, 0.1),
    inset 0 0 20px rgba(102, 204, 255, 0.05);
  transition: all 0.3s ease;
}

.test-box:hover {
  border-color: rgba(102, 204, 255, 0.6);
  box-shadow: 0 0 40px rgba(102, 204, 255, 0.2),
    inset 0 0 30px rgba(102, 204, 255, 0.1);
}

.test-box-content {
  padding: 2em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test-box h3 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(102, 204, 255, 0.2);
}

.test-box p {
  color: #aaa;
  margin-bottom: 1.5em;
}

.dimension-display {
  align-items: center;
}

.size-transition {
  transition: width 0.3s ease, height 0.3s ease;
}

.control-sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index: 20;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(102, 204, 255, 0.1);
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  padding: 1.5em;
  background: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(102, 204, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.3em;
}

.close-btn {
  width: 50px;
  height: 50px;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(102, 204, 255, 0.2);
  border-radius: 50%;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 15;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.size-controls {
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.input-group label {
  font-weight: 500;
  color: #aaa;
  font-size: 0.9em;
}

.input-group input {
  padding: 0.8em 1em;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(102, 204, 255, 0.2);
  border-radius: 8px;
  color: #eee;
  font-size: 1em;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(102, 204, 255, 0.2);
}

.apply-button {
  padding: 0.8em 1em;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  color: #121212;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 204, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  color: white;
}

.apply-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 204, 255, 0.3);
  background: linear-gradient(
    135deg,
    var(--secondary-color) 0%,
    var(--primary-color) 100%
  );
}

.apply-button:active {
  transform: translateY(0);
}

.quick-presets {
  padding: 0 1.5em 1.5em;
  margin-top: auto;
}

.quick-presets h3 {
  color: #aaa;
  font-size: 1em;
  margin-bottom: 0.8em;
}

.preset-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8em;
}

.preset-btn {
  padding: 0.6em 1em;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(102, 204, 255, 0.2);
  border-radius: 6px;
  color: #eee;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preset-btn:hover {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(102, 204, 255, 0.5);
  transform: translateY(-1px);
}

.sidebar-toggle {
  position: fixed;
  top: 2em;
  left: 2em;
  width: 40px;
  height: 40px;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(102, 204, 255, 0.2);
  border-radius: 50%;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 15;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.sidebar-toggle:hover {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(102, 204, 255, 0.5);
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(102, 204, 255, 0.2);
}

.footer {
  padding: 1em 0;
  background: rgba(20, 20, 20, 0.8);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 10;
}

.box-dimensions {
  display: flex;
  justify-content: center;
  gap: 2em;
  font-size: 1em;
  color: var(--primary-color);
  max-width: 800px;
  margin: 0 auto;
}

.dimension-item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
}

/* 通知样式 */
.notification {
  position: fixed;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8em 1.5em;
  border-radius: 8px;
  color: #fff;
  font-size: 0.9em;
  opacity: 0;
  transform: translate(-50%, 20px);
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  text-align: center;
}

.notification-show {
  opacity: 1;
  transform: translate(-50%, 0);
}

.notification-info {
  background: rgba(52, 152, 219, 0.9);
  border: 1px solid rgba(102, 204, 255, 0.3);
}

.notification-error {
  background: rgba(231, 76, 60, 0.9);
  border: 1px solid rgba(231, 76, 60, 0.3);
}

/* 背景粒子效果 */
.particle {
  position: absolute;
  background: rgba(102, 204, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
</style>
