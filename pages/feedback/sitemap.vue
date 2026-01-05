<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
const groupedPages = [
  {
    category: '功能类',
    pages: [
      {
        name: '首页',
        path: '/',
        description: '欢迎来到主站主页',
        bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
      },
      {
        name: '登录',
        path: '/Login',
        description: '用户登录入口',
        bg: 'linear-gradient(135deg, #bbdefb, #90caf9)'
      },
      {
        name: '注册',
        path: '/register',
        description: '新用户注册页面',
        bg: 'linear-gradient(135deg, #cce5ff, #90caf9)'
      },
      {
        name: '账户激活',
        path: '/checkVer',
        description: '注册完成并完成邮箱验证',
        bg: 'linear-gradient(135deg, #e3f2fd, #b3e5fc)'
      },
      {
        name: '开发进程',
        path: '/DevProcess',
        description: '查看开发迭代与计划',
        bg: 'linear-gradient(135deg, #e3f2fd, #b3e5fc)'
      },
      {
        name: '友情链接',
        path: '/SpsList',
        description: '关于我的开发者朋友们',
        bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)'
      },
    ]
  },
  {
    category: '用户类',
    pages: [
      {
        name: '用户主页',
        path: '/Users',
        description: '访问用户个人页面',
        bg: 'linear-gradient(135deg, #e8eaf6, #c5cae9)'
      },
      {
        name: '用户消息',
        path: '/Users/msg',
        description: '站内私信与互动记录',
        bg: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)'
      },
      {
        name: '发布文章',
        path: '/editor',
        description: '创作与编辑文章页面',
        bg: 'linear-gradient(135deg, #e8f0fe, #d0e2ff)'
      },
      {
        name: '文章列表',
        path: '/editor/list',
        description: '查看已发布的文章',
        bg: 'linear-gradient(135deg, #e8f0fe, #cfd8dc)'
      },
      {
        name: '文章修改',
        path: '/editor/cag',
        description: '改查已发布的文章',
        bg: 'linear-gradient(135deg, #e8f0fe, #d7ccc8)'
      },
      {
        name: '文章待发布',
        path: '/editor/wait',
        description: '待发布稿件列表',
        bg: 'linear-gradient(135deg, #e3f2fd, #cfd8dc)'
      },
      {
        name: '我的图库',
        path: '/editor/gallery',
        description: '查看图片与资源管理',
        bg: 'linear-gradient(135deg, #f1f8ff, #e3f2fd)'
      },
    ]
  },
  {
    category: '通知与搜索',
    pages: [
      {
        name: '站内通知',
        path: '/Notify',
        description: '查看最新通知与动态',
        bg: 'linear-gradient(135deg, #dceefb, #b3e5fc)'
      },
      {
        name: '搜索页面',
        path: '/Search',
        description: '搜索内容与用户',
        bg: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)'
      },
    ]
  },
  {
    category: '空间与反馈',
    pages: [
      {
        name: '创作空间',
        path: '/space',
        description: '进入用户的创作空间',
        bg: 'linear-gradient(135deg, #d0f0fd, #b2ebf2)'
      },
      {
        name: '友情链接申请',
        path: '/feedback/class/spslist',
        description: '申请加入友情链接',
        bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
      },
      {
        name: '站点地图',
        path: '/sitemap.xml',
        description: '站点地图',
        bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)'
      },
      {
        name: '站点导航',
        path: '/feedback/sitemap',
        description: '反馈功能与站点结构图',
        bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)'
      },
    ]
  },
  {
    category: '测试与调试',
    pages: [
      {
        name: '桌面端错误页面测试',
        path: '/error/type-window',
        description: '用于调试与测试错误页面',
        bg: 'linear-gradient(135deg, #ffe0e0, #ffcdd2)'
      },
      {
        name: '移动端错误页面测试',
        path: '/error/type-phone',
        description: '用于调试与测试错误页面',
        bg: 'linear-gradient(135deg, #ffe0e0, #ffccbc)'
      },
      {
        name: '403页面',
        path: '/error/403',
        description: '用于调试与测试错误页面',
        bg: 'linear-gradient(135deg, #ffe0e0, #ffccbc)'
      },
      {
        name: '503页面',
        path: '/error/503',
        description: '用于调试与测试错误页面',
        bg: 'linear-gradient(135deg, #ffe0e0, #f8bbd0)'
      },
      {
        name: '测试页面大小',
        path: '/error/test',
        description: '用于调试与测试错误页面',
        bg: 'linear-gradient(135deg, #ffe0e0, #f8bbd3)'
      },
    ]
  },
]

usePageHead('sitemap')
</script>

<template>
  <div class="sitemap-container">
    <h1 class="sitemap-title">📌 站点导航</h1>
    <p class="sitemap-subtitle">点击任意卡片可快速跳转，欢迎探索！</p>
    <div v-for="group in groupedPages" :key="group.category" class="section">
      <h2 class="section-title">{{ group.category }}</h2>
      <div class="card-grid">
        <a
          v-for="item in group.pages"
          :key="item.name"
          :href="item.path"
          class="card"
          :style="{ background: item.bg }"
          target="_blank"
        >
          <div class="card-body">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <div class="card-link-icon">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sitemap-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.sitemap-title {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #1565c0;
}

.sitemap-subtitle {
  font-size: 16px;
  color: #607d8b;
  margin-bottom: 32px;
}

.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #90a4ae;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  background-color: #f5faff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-body h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a237e;
}

.card-body p {
  font-size: 13px;
  color: #455a64;
}

.card-link-icon {
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: #1e88e5;
  padding: 9px 11px 8px;
  background-color: #ffffff80;
  border-radius: 50%;
}
</style>
