<template>
  <div class="space-landing">
    <!-- Hero -->
    <section class="hero">
      <h1>&#x1F30C; Welcome to <span>Space</span></h1>
      <p>你的数字宇宙，从这里开始。 创建属于自己的空间，展示、记录、分享。</p>
      <div class="actions">
        <el-button type="primary" size="large" @click="createSpace">
          🚀 立即创建空间
        </el-button>
        <el-button plain size="large" @click="explore">
          🔍 探索他人空间
        </el-button>
      </div>
    </section>

    <!-- Feature 1 -->
    <section class="feature">
      <img
        src="http://j-h.top/api/public/uploads/f278e1f8732497fbc.webp"
        alt="展示"
      />
      <div class="text">
        <h2>✨ 展示你的个性</h2>
        <p>上传头像、个性签名与背景，打造完全属于你的主页风格。</p>
      </div>
    </section>

    <!-- Feature 2 -->
    <section class="feature reverse">
      <div class="text">
        <h2>📚 管理你的内容</h2>
        <p>集中管理文章、收藏、评论与粉丝，构建你的专属创作中心。</p>
      </div>
      <img
        src="http://j-h.top/api/public/uploads/8364b0820cb450b93.webp"
        alt="内容管理"
      />
    </section>

    <!-- Feature 3 -->
    <section class="feature">
      <!-- <img src="https://cdn.jsdelivr.net/gh/jihau/images/space-showcase3.png" alt="主题定制" /> -->
      <div class="text">
        <h2>🎨 以及还有更多，正在开发中...</h2>
        <p>从布局到主题颜色，一切都由你决定。让你的空间独一无二。</p>
      </div>
    </section>

    <!-- Showcase -->
    <section class="showcase">
      <h2>🌟 看看他们都在创造什么</h2>
      <p class="subtitle">这些是社区中一些精彩的空间</p>

      <div class="cards">
        <div
          class="showcase-card"
          v-for="user in showcaseUsers"
          :key="user.username"
        >
          <img :src="user.user_pic" alt="avatar" />
          <h3>{{ user.username }}</h3>
          <p>{{ user.user_content }}</p>
          <nuxt-link :to="'/space/' + user.username" target="_blank">
            <el-button type="primary" plain>进入空间</el-button>
          </nuxt-link>
        </div>
      </div>

      <div class="more">
        <el-button size="large" @click="explore">🔎 浏览更多空间</el-button>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>准备好开始了吗？</h2>
      <p>加入数千位创作者，开启属于你的数字宇宙。</p>
      <el-button type="success" size="large" @click="createSpace">
        💫 创建我的空间
      </el-button>
    </section>

    <!-- Footer -->
    <RightMIcp/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const createSpace = () => router.push('/register')
const explore = () => router.push('/Search')
interface User {
  username: string
  user_pic: string
  user_content: string
  user_bgc: string
  article_count: string
}
const showcaseUsers: Ref<User[]> = ref([])
const appConfig = useAppConfig()
const baseUrl = appConfig.site.baseUrl

const { data: resData } = await useAsyncData('spaceUsers', () =>
  $fetch(`${baseUrl}/data/spaceul`)
)
// 拿到真正的用户数组
const users = resData.value?.data ?? []

// 如果你绑定给 showcaseUsers
showcaseUsers.value = users
</script>

<style scoped>
.space-landing {
  font-family: 'Inter', sans-serif;
  color: #222;
  line-height: 1.6;
}

/* Hero */
.hero {
  text-align: center;
  padding: 6rem 1rem 4rem;
  background: linear-gradient(135deg, #eef2ff, #fdf2f8);
}

.hero h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.hero span {
  color: #4f46e5;
}

.hero p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Feature sections */
.feature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
.feature img {
  width: 45%;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.feature img:hover {
  transform: scale(1.03);
}

.feature .text {
  width: 45%;
}

.feature h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.feature p {
  color: #555;
}

/* Showcase */
.showcase {
  text-align: center;
  padding: 5rem 1rem;
  background: #fafafa;
  word-break: break-all;
}

.showcase h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.showcase .subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.showcase-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  padding: 2rem 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.showcase-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.showcase-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.showcase-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.showcase-card p {
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.more {
  margin-top: 3rem;
}

/* CTA */
.cta {
  text-align: center;
  padding: 5rem 1rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  margin: 5rem auto;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.cta p {
  margin-bottom: 1.5rem;
}

/* Footer */
.footer {
  text-align: center;
  color: #888;
  padding: 2rem 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .feature {
    flex-direction: column;
  }

  .feature.reverse {
    flex-direction: column;
  }

  .feature img,
  .feature .text {
    width: 100%;
  }

  .hero h1 {
    font-size: 2.2rem;
  }
}
</style>
