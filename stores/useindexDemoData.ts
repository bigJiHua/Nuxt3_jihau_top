// 首页轮播图
export const useIndexLunBoStore = defineStore('LunBoData', {
  state: () => ({
    LunBoList: [] as Array<any>,
  }),
  actions: {
    setLunBoData(data: any) {
      this.LunBoList = data
    }
  },
  getters: {
    getLunBoList(): Array<any> {
      return this.LunBoList
    }
  },
})