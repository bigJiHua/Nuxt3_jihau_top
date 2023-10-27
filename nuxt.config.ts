// https://nuxt.com/docs/api/configuration/nuxt-config
// 基本配置都在这，相当于main.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // 其他模块...
    ['@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },],
    '@element-plus/nuxt',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@/assets/css/index.css',
    '@/assets/css/typeface.css',
    'element-plus/dist/index.css',
    'highlight.js/styles/monokai-sublime.css',
    'bytemd/dist/index.css'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1.0',
      title: 'JiHua的Web和JS开发数据',
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/element-plus/dist/index.css'
        },
      ],
      script: [
        { src: '/ckeditor/ckeditor.js' }
      ],
      meta: [
        {
          name: 'keywords',
          content:
            'JiHua,jihua,JiHua的Web和JS开发数据,JiHua的Web和JS开发数据,个人网站,C语言程序,Web语言,个人网站搭建',
        },
        {
          name: 'description',
          content:
            'jihua的Web和js开发数据，一个神奇的个人网站，里面展现个人魅力，程序设计语言站点导航，以及软件使用方法和事件处理方法，包括但不限于C语言、C语言程序设计书籍、题型、作品等，网页逐渐搭建，不断更新中。一个神奇的个人网站！里面将有超多的内容知识。',
        },
        {
          name: 'robots',
          content: 'all',
        },
        {
          name: 'author',
          content: 'JiHua',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'jihua的web和js开发数据',
        },
        {
          name: 'Copyright',
          content: '本页版权归JiHua所有。All Rights JiHua',
        },
        {
          name: 'referrer',
          content: 'no-referrer-when-downgrade',
        },
        {
          name: 'theme-color',
          content: '#275D2B',
        }, {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0"
        }
      ],
    }
  },
  layouts: {
    default: 'layouts/default.vue',
  },
  components: true,
  ssr: true,
  server: {
    host: '0.0.0.0', // 默认为 '0.0.0.0'
    port: process.env.NITRO_PORT || 3000, // 使用环境变量或默认为 3000
  },
})
