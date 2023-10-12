import request from "../request"
// 首页获取文章
const getArticleList = function (page: number | string) {
  return request.get('/data/list?page=' + page)
}

// 文章归档
const getArchive = function () {
  return request.get('/data/archive')
}
// 通知列表
const getNotifyList = function () {
  const user = localStorage.getItem('Username')
  if (user) {
    return request.get('/data/notify?user=' + user)
  }
  return request.get('/data/notify')
}
// 获取文章内容
const getArchives = function (id: string) {
  const params = new URLSearchParams()
  params.append('id', id)
  const username = localStorage.getItem('Username')
  if (username !== null) {
    params.append('user', username as string)
  }
  return request.get('/data/article/', { params })
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
const UpdatedReadNum = function (id: string) {
  const params = new URLSearchParams()
  params.append('id', id)
  const username = localStorage.getItem('Username')
  if (username !== null) {
    params.append('user', username as string)
  }
  return request.get('/data/UpreadNum', { params })
}

// 搜索接口
const SearchApi = function (key: string,type:string) { 
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
  getNotifyList,
  SearchApi
}
