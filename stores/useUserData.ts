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
        user_bgc: ''
      }
    }
  }),
  actions: {
    // 赋值
    setUserData (data: any) {
      this.Userdata = data
    }
  },
  getters: {
    // 获取 用户数据
    getUserData (): any {
      return this.Userdata
    },
    // 判断是否登录
    isLogin (): boolean {
      const username = this.Userdata?.Users?.username
      const token = localStorage.getItem('token')
      if (token === null || token === undefined || token === 'undefined' || token === '') return false
      return typeof username === 'string' && username.trim().length > 0
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
