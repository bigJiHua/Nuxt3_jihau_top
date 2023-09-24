// 默认示例
// export default defineNuxtPlugin((nuxtApp: any) => {
//   console.log(nuxtApp);
// })
export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    // 提供一个插件函数给下一指令 为sayHello 
    // 全局调用 const { $*** } = useNuxtApp()
    // const { $sayHello } = useNuxtApp()
    provide: {
      sayHello: (msg: string) => { console.log('Hello ' + msg); }
    }
  }
})