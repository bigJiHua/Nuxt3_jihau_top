// 代码高亮自定义插件
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 👈 加一个主题

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('highlight', {
    mounted(el) {
      // 设置一直进行的定时器
      let highlight = []
      const getElment = setInterval(() => {
        highlight = el.querySelectorAll('pre code')
        if (highlight.length !== 0) {
          clearInterval(getElment)
          highlight.forEach((block: any) => {
            hljs.highlightElement(block)
          })
        }
      }, 200)
    }
  })
})
