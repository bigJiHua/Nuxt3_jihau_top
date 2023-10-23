import request from '../request'
// 获取当前用户所有文章
const UsergetArticle = function (page: number) {
  //TODO 摒弃原有参数 Because不安全
  return request.get('/article?page=' + page)
}
// 添加文章
const UseraddArticle = function (data: {
  username: string
  title: string
  content: string
  cover_img: string
  lable: string
  keyword: string
}) {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  return request.post('/article/addart', params)
}
// 删除当前用户文章
const UserdelArticle = function (id: string) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.post('/article/delart', params)
}
// 编辑文章
const UsercagArticle = function (data: {
  id: string
  username: string
  title: string
  content: string
  cover_img: string
  lable: string,
  keyword: string,
  article_id: string
}) {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  params.append('article_id', data.article_id)
  return request.post('/article/cagart', params)
}
export default {
  UseraddArticle,
  UsergetArticle,
  UserdelArticle,
  UsercagArticle
}
