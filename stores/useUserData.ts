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
          user_id: '',
          username: '',
          isadmin: 1,
          iscom: 1,
          isart: 1,
          isupimg: 1,
          isrel: 1,
          isspace: 1,
          islike: 1,
          iscol: 1,
          isfans: 1
        }
      }
    } as any,
    stateCode: 200
  }),
  actions: {
    setUserData (data: any) {
      this.Userdata = data
    },
    setState (code: number) {
      this.stateCode = code
    }
  },
  getters: {
    getUserData (): any {
      return this.Userdata
    }
  }
})

export const useAuthorDataStore = defineStore('AuthorData', {
  state: () => ({
    ArticleAuthor: ''
  }),
  actions: {
    setArticleAuthor (data: any) {
      this.ArticleAuthor = data
    }
  },
  getters: {
    getArticleAuthor (): string {
      return this.ArticleAuthor
    }
  }
})

export const useSpaceUserDataStore = defineStore('SpaceUserData', {
  state: () => ({
    UserData: []
  }),
  actions: {
    setUserData (data: any) {
      this.UserData = data
    }
  },
  getters: {
    getUserData (): any[] {
      return this.UserData
    }
  }
})
