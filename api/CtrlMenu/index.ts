import request from '../request'
// 获取当前用户所有文章
const UsergetArticle = (page: number, type?: number): any => {
  // 复用接口 type为2则获取待发布的文章list
  return request.get('/article?page=' + page + '&type=' + type)
}
// 添加文章
const UseraddArticle = (data: {
  username: string
  title: string
  content: string
  cover_img: string
  lable: string
  keyword: string
  describes: string
  state: string
  pub_date: string
  isMd: string
}): any => {
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  params.append('describes', data.describes)
  params.append('state', data.state)
  params.append('pub_date', data.pub_date)
  params.append('isMd', data.isMd)
  return request.post('/article/addart', params)
}
// 删除当前用户文章
const UserdelArticle = (id: string): any => {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.post('/article/delart', params)
}
// 获取要编辑的文章数据
const UsergetArticleData = (id: string): any => {
  const params = new URLSearchParams()
  params.append('id', id)
  return request.get('/article/getart', { params })
}
// 编辑文章
const UsercagArticle = (data: {
  id: string
  username: string
  title: string
  content: string
  cover_img: string
  lable: string
  keyword: string
  article_id: string
  describes: string
  state: string | number
}): any => {
  const params = new URLSearchParams()
  params.append('id', data.id)
  params.append('username', data.username)
  params.append('title', data.title)
  params.append('content', data.content)
  params.append('cover_img', data.cover_img)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  params.append('article_id', data.article_id)
  params.append('describes', data.describes)
  params.append('state', String(data.state))
  return request.post('/article/cagart', params)
}
export default {
  UseraddArticle,
  UsergetArticle,
  UserdelArticle,
  UsercagArticle,
  UsergetArticleData
}
