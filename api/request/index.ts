import axios from 'axios'
import { ElNotification, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

// 创建axios实例
const request = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 5000
})

// axios请求拦截器
request.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
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
  if (!res.ismessage) return response
  if (res.status !== 200) {
    // 在需要显示通知的地方调用函数
    ElNotification({
      title: '错误',
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
}, error => {
  console.log(error);
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
    if (process.env.NODE_ENV === 'production') {
      error.context.redirect('/')
    } else {
      // 在客户端使用 router 对象进行路由跳转
      localStorage.removeItem('token')
      router.push('/')
    }
  }
  return Promise.reject(error)
})


export default request