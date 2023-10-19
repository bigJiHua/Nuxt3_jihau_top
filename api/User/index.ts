import request from "../request"
// 文章页面获取作者信息
const getAuthData = function (user: string) {
  return request.get('/data/authData?user=' + user)
}

// 获取用户信息
const GetUserData = function () {
  const user = localStorage.getItem('Username')
  return request.get('/users/?user=' + user)
}
// 新增用户
const UpnewUser = function (userdata: {
  username: string,
  password: string,
  email: string
}) {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/my/reguser', params)
}
// 删除用户
const DelUser = function (user: string, deluser: string) {
  return request.get('/users/delUser?user=' + user + '&deluser=' + deluser)
}
// 修改用户信息
const CagUserData = function (userId: string, data: any) {
  const params = new URLSearchParams()
  params.append('user_id', userId)
  params.append('setData', JSON.stringify(data))
  return request.patch('/users/cagUser', params.toString())
}
// 修改用户权限
const CagUserPower = function (type: string, value: string) {
  const params = new URLSearchParams()
  params.append('type', type)
  params.append('value', value)
  return request.patch('/users/cagpow', params.toString())
}
// 修改密码
const CagPassword = function (data: { oldpwd: string, newpwd: string }) {
  const params = new URLSearchParams()
  params.append('oldpwd', data.oldpwd)
  params.append('newpwd', data.newpwd)
  return request.patch('/users/cagpwd', params)
}
export default {
  GetUserData,
  CagUserData,
  UpnewUser,
  DelUser,
  CagPassword,
  getAuthData,
  CagUserPower
}