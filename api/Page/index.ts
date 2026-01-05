import request from '../request'
// 首页获取轮播图
const getSetting = (val: string): any => {
  return request.get('/data/Setting?value=' + val)
}
// 用户登录
const LoginMenu = (username: string, password: string): any => {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return request.post('/auth/login', params)
}
// 用户注册
const UpnewUser = (userdata: {
  username: string
  password: string
  email: string
}): any => {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/auth/reguser', params)
}
// Space
const GetSpaceData = (user: string): any => {
  return request.get('/data/space?user=' + user)
}
export default {
  getSetting,
  LoginMenu,
  UpnewUser,
  GetSpaceData
}
