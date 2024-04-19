// 代码高亮自定义插件
import hljs from 'highlight.js'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('highlight', {
    mounted (el) {
      // 设置一直进行的定时器
      let highlight = []
      const getElment = setInterval(() => {
        highlight = el.querySelectorAll('pre code')
        if (highlight.length !== 0) {
          clearInterval(getElment)
          highlight.forEach((block: any) => {
            hljs.highlightBlock(block)
          })
        }
      }, 200)
    }
  })
})
