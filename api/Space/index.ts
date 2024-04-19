import request from '../request'
// 获取当前用户所有文章
const UsergetArticle = async (page: number, user: string): Promise<any> => {
  return await request.get('/data/spaceart?page=' + page + '&user=' + user)
}
// 获取当前用户所有收藏
const UsergetCollect = async (page: number, user: string): Promise<any> => {
  return await request.get('/data/spacecol?page=' + page + '&user=' + user)
}
// 获取当前用户所有喜欢
const UsergetLike = async (page: number, user: string): Promise<any> => {
  return await request.get('/data/spacelike?page=' + page + '&user=' + user)
}
export default {
  UsergetArticle,
  UsergetCollect,
  UsergetLike
}
