import GetUData from '@/api/User'

const SelectRelation = async (user: string): Promise<boolean> => {
  const { data: res } = await GetUData.getUserRelation(
    user,
    'get',
    '0'
  )
  return res.data.relation
}

const AddRelation = async (user: string): Promise<boolean> => {
  const { data: res } = await GetUData.PostUserRelation(user)
  if (res.status !== 200) {
    return false
  }
  return true
}

export default {
  SelectRelation,
  AddRelation
}
