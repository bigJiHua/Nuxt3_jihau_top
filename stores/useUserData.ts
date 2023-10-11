export const useUserDataStore = defineStore('UserData', {
  state: () => ({
    Userdata: {
      Users: {
        username: '',
        user_pic: ''
      }
    }
  }),
  actions: {
    setUserData(data: any) {
      this.Userdata = data
    }
  },
  getters: {
    getUserData(): any {
      return this.Userdata
    }
  },
})

export const useAuthorDataStore = defineStore('AuthorData', {
  state: () => ({
    ArticleAuthor: ''
  }),
  actions: {
    setArticleAuthor(data: any) {
      this.ArticleAuthor = data
    }
  },
  getters: {
    getArticleAuthor(): string {
      return this.ArticleAuthor
    }
  },
})
