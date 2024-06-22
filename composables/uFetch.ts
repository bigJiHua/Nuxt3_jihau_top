// 封装一下useFetch

const useCustomFetch = async (requrl: string, reqOptions: any = {}): Promise<any> => {
  return await useFetch(
    requrl,
    {
      ...reqOptions
    }
  )
    .then(({ data, pending, error, refresh }) => {
      if (error.value != null) {
        console.log(error.value)
      }
      return {
        data,
        pending,
        error,
        refresh
      }
    })
    .catch((error) => {
      throw error
    })
}

export default {
  useCustomFetch
}
