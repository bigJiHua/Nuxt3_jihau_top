import request from '../request'
// 核验验证码
const checkVer = function (data) {
  const params = new URLSearchParams()
  params.append('code', data.code)
  params.append('user', data.user)
  return request.post('/getmail/checkEmail', params)
}

export default {
  checkVer
}
