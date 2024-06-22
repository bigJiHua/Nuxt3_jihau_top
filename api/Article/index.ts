import request from '../request'
// 首页获取文章
const getArticleList = function (page: number | string) {
  return request.get('/data/list?page=' + page)
}

// 文章归档
const getArchive = (type?: string, key?: string): any => {
  return request.get('/data/archive?type=' + type + '&key=' + key)
}
// 通知列表
const getNotifyList = function (Num: number) {
  const user = localStorage.getItem('Username')
  if (user) {
    return request.get('/data/notify?user=' + user + '&Num=' + Num)
  }
  return request.get('/data/notify?Num=' + Num)
}
// 获取文章内容
const getArticle = (id: string): Promise<any> => {
  return request.get('/data/article?id=' + id)
}
// 获取文章内容(评论点赞收藏等)
const getArchives = (id: string): Promise<any> => {
  return request.get('/data/artdata?id=' + id)
}

// 获取通知内容
const getPageData = function (id: string) {
  const params = new URLSearchParams()
  params.append('id', id)
  const username = localStorage.getItem('Username')
  if (username !== null) {
    params.append('user', username as string)
  }
  return request.get('/data/page/', { params })
}

// 增加阅读数
const UpdatedReadNum = async (id: string): Promise<void> => {
  const params = new URLSearchParams()
  params.append('id', id)
  const username = localStorage.getItem('Username')
  if (username !== null) {
    params.append('user', username)
  }
  await request.get('/data/UpreadNum', { params })
}

// 搜索接口
const SearchApi = function (key: string, type: string) {
  const params = new URLSearchParams()
  params.append('key', key)
  params.append('type', type)
  return request.get('/data/search', { params })
}

export default {
  getArchives,
  UpdatedReadNum,
  getPageData,
  getArticleList,
  getArchive,
  getArticle,
  getNotifyList,
  SearchApi
}
