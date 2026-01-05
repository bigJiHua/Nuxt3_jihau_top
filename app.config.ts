export default defineAppConfig({
  site: {
    baseUrl: 'http://192.168.0.1:666/api',
    ArtUrl: 'https://xxxxxxxxx.top/article/',
    sitename: 'JiHua的web和js开发数据',
    icp: {
      number: '测ICP备123456号',
    },
    ga: {
      number: '测公网安备00000000000000号',
    },
    menu: [
      { path: '/Notify', text: '通知' },
      { path: '/DevProcess', text: '发展历程' },
      { path: '/SpsList', text: '友链' },
      { path: '/checkver', text: '激活账户' },
    ],
  },
})
