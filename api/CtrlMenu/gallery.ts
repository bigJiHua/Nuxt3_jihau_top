import request from '../request'
// 获取图片
const getImage = (data: {
  picusername: string,
  Num: string | number
}): any => {
  const params = new URLSearchParams()
  params.append('picusername', data.picusername)
  params.append('Num', data.Num)
  return request.post('/article/img', params)
}
// 上传图片
const upImage = (file: File): any => {
  const formData = new FormData()
  formData.append('file', file, file.name)
  return request.post('/article/upimg/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除图片
const delImage = (id: string): any => {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.post('/article/imgdel', params)
}

export default {
  getImage,
  upImage,
  delImage
}
