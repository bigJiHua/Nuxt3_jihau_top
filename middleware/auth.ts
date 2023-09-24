// 类似于路由守卫
// const { LoaData } = require('@/composables/loaData');
export default defineNuxtRouteMiddleware((to, from) => {
  const isLogin = true
  // console.log(to);
  // console.log(from);
  if (isLogin) {
    // 这里没有next()方法 改为navigateTo()方法
    return navigateTo(to.fullPath)
  }
  return navigateTo('/login')
})