export const useUserDataStore = defineStore('UserData', {
  state: () => ({
    Userdata: {
      Users: {
        username: '',
        user_pic: '',
        email: '',
        city: '',
        sex: '',
        user_content: '',
        user_id: '',
        useridentity: '',
        birthday: '',
        UserPower: {
          id: 0,
          user_id: "",
          username: "",
          isadmin: 0,
          iscom: 0,
          isart: 0,
          isupimg: 0,
          isrel: 0,
          isspace: 0,
          islike: 0,
          iscol: 0
        }
      }
    } as any ,
    stateCode: 200,
  }),
  actions: {
    setUserData(data: any) {
      this.Userdata = data
    },
    setState(code: number) {
      this.stateCode = code
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
