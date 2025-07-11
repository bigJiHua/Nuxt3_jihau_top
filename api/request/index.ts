import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建axios实例
const request = axios.create({
  baseURL: reqConfig.baseUrl,
  withCredentials: true // 允许携带cookie
})
// 增加一个请求拦截
// axios请求拦截器
request.interceptors.request.use(async (config: any) => {
  config.headers.Authorization = localStorage.getItem('token')
  config.headers.viewportWidth = window.innerWidth
  config.headers.viewportHeight = window.innerHeight
  config.headers.pixelRatio = Math.floor(window.devicePixelRatio * 1000) / 1000
  config.headers.navigatorplatform = window.navigator.userAgent
  return config
}, (error): any => {
  ElMessage({
    message: error.message,
    type: 'error',
    duration: 1500
  })
  return Promise.reject(error)
})

// axios响应式拦截器
request.interceptors.response.use(response => {
  const { data: res } = response
  // 选择性展示通知
  if (res.ismessage === false) return response
  if (res.status !== 200) {
    // 在需要显示通知的地方调用函数
    ElMessage({
      message: res.message,
      type: 'warning',
      duration: 1500
    })
  } else {
    ElMessage.success({
      message: res.message,
      duration: 1500
    })
  }
  return response
}, (error): any => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const errorCode: number = error.response ? error.response.status : 200
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const message = error.response ? error.response.data.message : error.message
  // 在需要显示通知的地方调用函数
  ElMessage({
    message,
    type: 'error',
    duration: 1500
  })
  if (errorCode === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('Username')
    localStorage.removeItem('Useridentity')
    return navigateTo('/Login')
  }
  return Promise.reject(error.response)
})

export default request
