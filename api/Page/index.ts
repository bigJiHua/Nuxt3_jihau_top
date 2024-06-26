import request from "../request"
// 首页获取轮播图
const getSetting = function (val: string) {
  return request.get('/data/Setting?value=' + val)
}
// 用户登录
const LoginMenu = function (username: string, password: string) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return request.post('/my/login', params)
}
// 用户注册
const UpnewUser = function (userdata: {
  username: string,
  password: string,
  email: string,
}) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/my/reguser', params)
}
// Space
const GetSpaceData = function (user: string) { 
  return request.get('/data/space?user=' + user)
}
export default {
  getSetting,
  LoginMenu,
  UpnewUser,
  GetSpaceData
}
