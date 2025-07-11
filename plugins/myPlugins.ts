// 默认示例
// export default defineNuxtPlugin((nuxtApp: any) => {
//   console.log(nuxtApp);
// })

import Compressor from 'compressorjs'

export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    provide: {
      // 控制台打印 hello
      sayHello: (msg: string) => { console.log('Hello ' + msg) },
      // 头像压缩并转换 Base64
      setBase64Avator: async (file: File, isBase64: boolean = false, quality: number = 0): Promise<any> => {
        return await new Promise(resolve => {
          // eslint-disable-next-line no-new
          new Compressor(file, {
            quality,
            success(result) {
              if (!isBase64) { resolve(result); return }
              const reader = new FileReader()
              reader.onloadend = () => {
                const base64Data = reader.result as string
                resolve(base64Data)
              }
              reader.readAsDataURL(result)
            },
            error (err) {
              ElMessage({
                message: err.message,
                type: 'warning'
              })
            }
          })
        })
      },
      // **增强版 copyUrl 方法**
      copyUrl: async (url: string): Promise<boolean> => {
        return await new Promise((resolve) => {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            // 使用 clipboard API 复制
            navigator.clipboard.writeText(url)
              .then(() => {
                ElMessage({
                  message: '复制成功！',
                  type: 'success'
                })
                resolve(true)
              })
              .catch(() => {
                fallbackCopyText(url, resolve)
              })
          } else {
            // 如果 clipboard API 不可用，使用回退方案
            fallbackCopyText(url, resolve)
          }
        })
      }
    }
  }
})

// **回退方案**
const fallbackCopyText = (text: string, resolve: (value: boolean) => void): any => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed' // 防止滚动
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, 99999) // 兼容 iOS

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage({
        message: '复制成功！',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '复制失败！',
        type: 'warning'
      })
    }
    resolve(successful)
  } catch (err) {
    ElMessage({
      message: '复制失败！',
      type: 'warning'
    })
    resolve(false)
  }

  document.body.removeChild(textarea)
}
