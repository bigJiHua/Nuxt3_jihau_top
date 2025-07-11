<script setup lang="ts">

definePageMeta({
  layout: 'pagedf',
})

useHead({
  title: '移动端错误页面测试页面',
  meta: [
    {
      name: 'keywords',
      content: '站点测试、JiHua、jihau.top、测试页面',
    },
    {
      name: 'description',
      content: '这是jihau_top网站的移动端测试页面，欢迎您访问此网站！',
    },
  ],
})
</script>

<template>
  <!-- 如果用户关闭了页面 则显示403无权页面 -->
  <div class="page403">
    <div class="container-403">
      <div class="header-403">
        <div class="decoration">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>
        <div class="header-content">
          <h1>403 - 无权限访问</h1>
          <p>哎呀，看起来你好像没有权限访问这个页面哦~</p>
        </div>
      </div>

      <div class="main-content">
        <div class="illustration">
          <div class="character">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>

            <div class="star star-1"></div>
            <div class="star star-2"></div>
            <div class="star star-3"></div>

            <div class="character-body"></div>
            <div class="character-face">
              <div class="eyes">
                <div class="eye"></div>
                <div class="eye"></div>
              </div>
              <div class="mouth"></div>
            </div>
            <div class="character-hands">
              <div class="hand left"></div>
              <div class="hand"></div>
            </div>
            <div class="lock"></div>
          </div>
        </div>

        <div class="info-section">
          <h2>哎呀，被拒之门外了~</h2>
          <p>
            可爱的小访客，这个区域需要特殊权限才能进入哦！别灰心，你可以尝试以下操作：
          </p>

          <div class="reasons">
            <h3>可能的原因：</h3>
            <ul>
              <li>你的账号没有访问此页面的权限</li>
              <li>访问请求被安全策略阻止</li>
              <li>本页数据需要该用户授予权限</li>
            </ul>
          </div>

          <div class="action-buttons">
            <nuxt-link to="/">
              <el-button type="primary">
                <i class="el-icon-house"></i> 返回首页
              </el-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 403页面样式
.page403 {
  width: 70vw;
  padding: 80px 0;
  margin: 0 auto;
}

.container-403 {
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(140, 152, 255, 0.15);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.8s ease-out;
}

.header-403 {
  background: linear-gradient(135deg, #6a7bff 0%, #8c98ff 100%);
  padding: 30px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-403 h1 {
  color: white;
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-403 p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.decoration {
  position: absolute;
  z-index: 1;
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
}

.circle-1 {
  top: -40px;
  left: -40px;
  animation: float 8s infinite ease-in-out;
}

.circle-2 {
  bottom: -60px;
  right: 50px;
  width: 160px;
  height: 160px;
  animation: float 10s infinite ease-in-out;
  animation-delay: 1s;
}

.circle-3 {
  top: 50%;
  right: -30px;
  width: 80px;
  height: 80px;
  animation: float 7s infinite ease-in-out;
  animation-delay: 0.5s;
}

.main-content {
  display: flex;
  padding: 50px 40px;
}

.illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 350px;
}

.character {
  position: relative;
  width: 220px;
  height: 300px;
}

.character-body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: bounce 4s infinite ease-in-out;
}

.character-face {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
}

.eyes {
  position: absolute;
  top: 35px;
  display: flex;
  gap: 30px;
}

.eye {
  width: 20px;
  height: 20px;
  background: #333;
  border-radius: 50%;
  position: relative;
}

.eye::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  top: 4px;
  left: 4px;
}

.mouth {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 15px;
  border-radius: 0 0 20px 20px;
  background: #ff6b6b;
}

.character-hands {
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.hand {
  width: 40px;
  height: 60px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  border-radius: 20px;
  animation: wave 3s infinite ease-in-out;
}

.hand.left {
  animation-delay: 0.5s;
}

.lock {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: #6a7bff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 4s infinite ease-in-out;
  box-shadow: 0 5px 15px rgba(106, 123, 255, 0.3);
}

.lock::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  background: #6a7bff;
  border-radius: 50%;
  top: -15px;
}

.lock::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 20px;
  background: white;
  border-radius: 5px;
}

.info-section {
  flex: 1;
  padding: 30px 0 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.info-section p {
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
}

.reasons {
  background: #f8f9ff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  border-left: 4px solid #6a7bff;
}

.reasons h3 {
  color: #6a7bff;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.reasons ul {
  padding-left: 20px;
}

.reasons li {
  margin-bottom: 10px;
  color: #5a6a7d;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.el-button {
  border-radius: 12px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(106, 123, 255, 0.2);
}

.el-button--primary {
  background: linear-gradient(135deg, #6a7bff 0%, #8c98ff 100%);
  border: none;
}

.el-button--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(106, 123, 255, 0.3);
}

.el-button--default {
  background: white;
  border: 1px solid #6a7bff;
  color: #6a7bff;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-20px);
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.cloud {
  position: absolute;
  background: white;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.cloud-1 {
  width: 60px;
  height: 25px;
  top: 40px;
  left: 30px;
  animation: float 8s infinite ease-in-out;
}

.cloud-2 {
  width: 40px;
  height: 15px;
  bottom: 70px;
  right: 40px;
  animation: float 7s infinite ease-in-out;
  animation-delay: 1s;
}

.cloud-3 {
  width: 50px;
  height: 20px;
  top: 120px;
  right: 100px;
  animation: float 6s infinite ease-in-out;
  animation-delay: 0.5s;
}

.star {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ffd166;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  animation: twinkle 3s infinite ease-in-out;
}

.star-1 {
  top: 60px;
  right: 80px;
  animation-delay: 0.2s;
}

.star-2 {
  top: 150px;
  left: 70px;
  animation-delay: 0.8s;
}

.star-3 {
  bottom: 100px;
  right: 120px;
  animation-delay: 1.4s;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 30px 20px;
  }

  .info-section {
    padding: 30px 0 0 0;
  }

  .character {
    width: 180px;
    height: 250px;
  }

  .header-403 h1 {
    font-size: 2.2rem;
  }
}
</style>
