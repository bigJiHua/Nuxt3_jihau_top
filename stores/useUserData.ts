export const useUserDataStore = defineStore("UserData", {
  state: () => ({
    Userdata: {
      Users: {
        username: "",
        user_pic: "",
        email: "",
        city: "",
        sex: "",
        user_content: "",
        user_id: "",
        useridentity: "",
        birthday: "",
        user_bgc: "",
      },
    },
  }),
  actions: {
    // 赋值
    setUserData(data: any) {
      this.Userdata = data;
    },
  },
  getters: {
    // 获取 用户数据
    getUserData(): any {
      return this.Userdata;
    },
    // 判断是否登录
    isLogin(): boolean {
      // 1. 先做用户名的空值保护+校验
      const username = this.Userdata?.Users?.username ?? ""; // 空值合并为""
      const isUsernameValid = typeof username === "string" && username.trim().length > 0;
      if (!isUsernameValid) return false;

      // 2. 客户端才校验token，且加异常捕获
      if (process.client) {
        try {
          const token = localStorage.getItem("token");
          // 简化token判断：排除 null/空字符串/"undefined"（防止错误存储）
          return !!token && token !== "undefined";
        } catch (error) {
          // localStorage不可用时，直接判定为未登录
          console.warn("获取登录token失败：", error);
          return false;
        }
      }
      // 3. 服务端环境：仅靠用户名无法判定登录（返回false）
      return false;
    },
  },
});

export const useAuthorDataStore = defineStore("AuthorData", {
  state: () => ({
    ArticleAuthor: "",
  }),
  actions: {
    setArticleAuthor(data: any) {
      this.ArticleAuthor = data;
    },
  },
  getters: {
    getArticleAuthor(): string {
      return this.ArticleAuthor;
    },
  },
});

export const useSpaceUserDataStore = defineStore("SpaceUserData", {
  state: () => ({
    UserData: [],
  }),
  actions: {
    setUserData(data: any) {
      this.UserData = data;
    },
  },
  getters: {
    getUserData(): any[] {
      return this.UserData;
    },
  },
});
