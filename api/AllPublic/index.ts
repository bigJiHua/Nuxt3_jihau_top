import request from '../request'
// 友链申请
// eslint-disable-next-line @typescript-eslint/naming-convention
const postSpsList = ({ set_title, set_url, set_difault, set_time }: {
  set_title: string
  set_url: string
  set_difault: string
  set_time: string
}): any => {
  const params = new URLSearchParams()
  params.append('set_title', set_title)
  params.append('set_url', set_url)
  params.append('set_difault', set_difault)
  params.append('set_time', set_time)
  return request.post('/public/spsPost', params)
};
const verifyCode = (met: string, code: string): any => {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('captcha', code)
  return request.post('/public/captcha', params)
}
const getCode = (): any => {
  return request.get('/public/captcha?met=get&page=sps', {
    withCredentials: true // 关键参数
  })
}
export default {
  postSpsList,
  verifyCode,
  getCode
}
