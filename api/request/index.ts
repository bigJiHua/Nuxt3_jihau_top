import axios from 'axios'
import { ElNotification, ElMessage } from 'element-plus'
// 创建axios实例
const request = axios.create({
  baseURL: reqConfig.baseUrl,
  timeout: 5000
})

// axios请求拦截器
request.interceptors.request.use(config => {
  if (process.env.NODE_ENV === 'development' && localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, error => {
  ElNotification({
    title: '错误',
    message: error.message,
    type: 'error',
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
    ElNotification({
      title: '错误',
      message: res.message,
      type: 'warning',
      duration: 1500
    })
  }
  // 成功与否不再显示
  // else {
  //   ElMessage.success({
  //     message: res.message,
  //     duration: 1500
  //   })
  // }
  return response
}, error => {
  const errorCode: number = error.response.status ? error.response.status : 200
  const message = error.response.data.message ? error.response.data.message : error.message
  // 在需要显示通知的地方调用函数
  ElNotification({
    title: '错误',
    message: message,
    type: 'error',
    duration: 1500
  })
  if (errorCode === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('Username')
    localStorage.removeItem('Useridentity')
    location.reload()
  }
  // TODO 未知问题
  return error.response
})


export default request