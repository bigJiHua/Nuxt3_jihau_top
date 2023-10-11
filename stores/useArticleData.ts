// 首页文章列表
export const useArticleListStore = defineStore('ArticleData', {
  state: () => ({
    ArticleList: [] as Array<any>,
  }),
  actions: {
    setArticleData(data: any) {
      this.ArticleList = data
    }
  },
  getters: {
    getArticleList(): Array<any> {
      return this.ArticleList
    }
  },
})
// 文章归档
export const useArchiveListStore = defineStore('ArchiveList', {
  state: () => ({
    ArchiveList: {
      ArchiveListData: [] as Array<any>,
      YearListData: [] as Array<any>
    },
  }),
  actions: {
    setArchive(data: any) {
      this.ArchiveList.ArchiveListData = data.Archive
      this.ArchiveList.YearListData = data.YearListData
    }
  },
  getters: {
    getArchive(): any {
      return this.ArchiveList
    }
  },
})