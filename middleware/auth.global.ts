// 类似于路由守卫
export default defineNuxtRouteMiddleware((to, from): any => {
  const toPath = to.fullPath
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (toPath.match(/^\/(Users|my|editor)\//) || toPath.match(/^\/(Users|my|editor)/)) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (process.client) {
      if ((localStorage.getItem('token') != null) && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== '') {
        return true
      } else {
        return navigateTo('/Login')
      }
    }
  }
  return true
})
