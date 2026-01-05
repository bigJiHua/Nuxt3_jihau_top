// 首页文章列表
export const useArticleListStore = defineStore('ArticleData', {
  state: () => ({
    ArticleList: [
      {
        article_id: '',
        content: '',
        cover_img: '',
        pub_date: '',
        title: '',
        username: ''
      }
    ],
    isLoading: false
  }),
  actions: {
    setArticleData (data: any) {
      this.ArticleList = data
      if (Object.keys(this.ArticleList).length > 1) this.isLoading = true
    }
  },
  getters: {
    getArticleList (): any[] {
      return this.ArticleList
    },
    getIsLoading (): boolean {
      return this.isLoading
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
    setArchive (data: any) {
      this.ArchiveList.ArchiveListData = data.Archive
      this.ArchiveList.YearListData = data.YearListData
    }
  },
  getters: {
    getArchive (): any {
      return this.ArchiveList
    }
  }
})
// 通知列表
export const useNotifyListStore = defineStore('NotifyList', {
  state: () => ({
    NotifyList: [
      {
        content: '',
        describes: '',
        id: '',
        is_delete: '',
        keyword: '',
        lable: '',
        notify_id: '',
        pub_date: '',
        read_num: '',
        state: '',
        title: '',
        username: '',
        whosee: ''
      }
    ],
    isLoading: false
  }),
  actions: {
    setNotify (data: any) {
      this.NotifyList = data
      if (Object.keys(this.NotifyList).length > 1) this.isLoading = true
    }
  },
  getters: {
    getNotify (): any {
      return this.NotifyList
    },
    getIsLoading (): boolean {
      return this.isLoading
    }
  }
})
