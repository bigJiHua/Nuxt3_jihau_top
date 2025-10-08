const baseUrl = 'http://192.168.0.103:666/api'
const icpNumber = '测ICP备123456号'
const gaNumber = '测公网安备00000000000000号'
const MenuItem = [
  { path: '/Notify', text: '通知' },
  { path: '/DevProcess', text: '发展历程' },
  { path: '/SpsList', text: '友链' },
  { path: '/checkver', text: '激活账户' }
  // { path: 'https://www.jihau.com', text: '主站博客页面' },
  // { path: '/notify/YSZC', text: '隐私政策' },
  // { path: '/html/goods/10010.html', text: '物品寻求页面' },
  // { path: '/error/type-phone', text: '错误页面测试-phone' },
  // { path: '/error/type-window', text: '错误页面测试-Windows' }
]
export default {
  baseUrl,
  icpNumber,
  MenuItem,
  gaNumber,
}
