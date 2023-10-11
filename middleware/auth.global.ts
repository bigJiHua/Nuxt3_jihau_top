// 类似于路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  let token: string | null = ''
  const toPath = to.fullPath;
  if (toPath.match(/^\/CtrlView\//) || toPath.match(/^\/CtrlView/)) {
    if (process.env.NODE_ENV === 'development' && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
      if (token) {
        return true
      } else {
        return navigateTo('/Login')
      }
    }
  }
  return true
})
