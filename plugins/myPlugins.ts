// 默认示例
// export default defineNuxtPlugin((nuxtApp: any) => {
//   console.log(nuxtApp);
// })
import Compressor from 'compressorjs'
export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    // 提供一个插件函数给下一指令 为sayHello 
    // 全局调用 const { $*** } = useNuxtApp()
    // const { $sayHello } = useNuxtApp()
    provide: {
      sayHello: (msg: string) => { console.log('Hello ' + msg); },
      setBase64Avator: (file: File, isBase64: boolean = false, quality: number = 0) => {
        return new Promise(resolve => {
          new Compressor(file, {
            quality: quality,
            success(result) {
              if (!isBase64) return resolve(result)
              const reader = new FileReader();
              reader.onloadend = function () {
                const base64Data = reader.result as string;
                resolve(base64Data);
              };
              reader.readAsDataURL(result);
            },
            error(err) {
              ElMessage({
                message: err.message,
                type: 'warning',
              })
            }
          })
        })
      },
      copyUrl: (url: string) => {
        if (process.env.NODE_ENV === 'development') {
          navigator.clipboard.writeText(url).then(
            () => {
              ElNotification({
                title: '成功',
                message: '已成功将链接复制到剪贴板！',
                type: 'success',
              })
            },
            () => {
              ElNotification({
                title: '失败',
                message: '失败，无法将文章链接复制到剪贴板',
                type: 'warning',
              })
            }
          )
        } else {
          ElNotification({
            title: '错误！',
            message: '失败，无法将文章链接复制到剪贴板',
            type: 'error',
          })
        }
      }
    }
  }
})