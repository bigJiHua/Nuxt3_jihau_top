// 类似于路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const toPath = to.fullPath;
  if (toPath.match(/^\/CtrlView\//) || toPath.match(/^\/CtrlView/)) {
    if (process.env.NODE_ENV === 'development' && typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== '') {
        return true
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        return navigateTo('/Login')
      }
    }
  }
  return true
})
