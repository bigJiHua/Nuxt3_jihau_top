import request from '../request'
// 获取图片
const getImage = function (data: {
  picusername: string,
  Num: string | number
}) {
  return request.post('/article/img', data)
}
// 上传图片
const upImage = function (file: File) {
  const formData = new FormData()
  formData.append('file', file, file.name)
  return request.post('/article/upimg/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除图片
const delImage = function (id: string) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.post('/article/imgdel', params)
}

export default {
  getImage,
  upImage,
  delImage
}
