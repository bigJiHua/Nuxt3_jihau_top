import request from '../request'
// 文章页面获取作者信息
const getAuthData = (user: string): any => {
  return request.get('/data/authData?user=' + user)
}

// 获取用户信息
const GetUserData = (): any => {
  const user = localStorage.getItem('Username')
  return request.get('/users/?user=' + user)
}
// 新增用户
const UpnewUser = (userdata: {
  username: string
  password: string
  email: string
}): any => {
  const params = new URLSearchParams()
  params.append('username', userdata.username)
  params.append('password', userdata.password)
  params.append('email', userdata.email)
  return request.post('/my/reguser', params)
}
// 删除用户
const DelUser = (user: string, deluser: string): any => {
  return request.get('/users/delUser?user=' + user + '&deluser=' + deluser)
}
// 修改用户信息
const CagUserData = (userId: string, data: any): any => {
  const params = new URLSearchParams()
  params.append('user_id', userId)
  params.append('setData', JSON.stringify(data))
  return request.patch('/users/cagUser', params.toString())
}
// 修改用户权限
const CagUserPower = (type: string, value: string): any => {
  const params = new URLSearchParams()
  params.append('type', type)
  params.append('value', value)
  return request.patch('/users/cagpow', params.toString())
}
// 修改密码
const CagPassword = (data: { oldpwd: string, newpwd: string }): any => {
  const params = new URLSearchParams()
  params.append('oldpwd', data.oldpwd)
  params.append('newpwd', data.newpwd)
  return request.patch('/users/cagpwd', params)
}
// 获取站内通知
const GetUserMessage = (num: number): any => {
  return request.get('/users/msg?Num=' + num)
}
// 删除站内通知
const DelUserMessage = (id: string, type: string): any => {
  const params = new URLSearchParams()
  params.append('id', id)
  params.append('type', type)
  return request.patch('/users/msg', params)
}
// 用户关系类型设置
const PostUserRelation = (author: string): any => {
  const params = new URLSearchParams()
  params.append('author', author)
  return request.post('/users/relation', params)
}
// 获取对应关系类型
const getUserRelation = (author: string, met: string, Num: string): any => {
  return request.get('/users/relation?author=' + author + '&met=' + met + '&Num=' + Num)
}
// 非权限接口 查询粉丝or关注列表
const getUserRelationData = (author: string, met: string, Num: string): any => {
  return request.get('/data/relation?author=' + author + '&met=' + met + '&Num=' + Num)
}
export default {
  GetUserData,
  CagUserData,
  UpnewUser,
  DelUser,
  CagPassword,
  getAuthData,
  CagUserPower,
  GetUserMessage,
  PostUserRelation,
  getUserRelation,
  getUserRelationData,
  DelUserMessage
}
