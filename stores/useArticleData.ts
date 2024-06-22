// 首页文章列表
export const useArticleListStore = defineStore('ArticleData', {
  state: () => ({
    ArticleList: [] as any[]
  }),
  actions: {
    setArticleData(data: any) {
      this.ArticleList = data
    }
  },
  getters: {
    getArticleList(): any[] {
      return this.ArticleList
    }
  }
})
// 文章归档
export const useArchiveListStore = defineStore('ArchiveList', {
  state: () => ({
    ArchiveList: {
      ArchiveListData: [] as any[],
      YearListData: [] as any[]
    }
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
  }
})
