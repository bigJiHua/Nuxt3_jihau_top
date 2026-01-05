// 这里导出一个自定义 useHead 函数，用于设置页面标题、关键词和描述
type PageKey = keyof typeof SEO_PAGES;
export const usePageHead = (key: PageKey) => {
  const page = SEO_PAGES[key];
  if (!page) {
    console.warn(`[usePageHead] 未定义页面 key：${key}`);
    return;
  }
  useHead({
    title: page.title,
    meta: page.meta,
  });
};
// 这里统一管理seo
const SEO_PAGES = {
  home: {
    title: "JiHua的Web和JS开发数据",
    meta: [
      {
        name: "keywords",
        content:
          "JiHua,jihua,JiHua的Web和JS开发数据,JiHua的Web和JS开发数据,个人网站,C语言程序,Web语言,个人网站搭建",
      },
      {
        name: "description",
        content:
          "jihua的Web和js开发数据，一个神奇的个人网站，里面展现个人魅力，程序设计语言站点导航，以及软件使用方法和事件处理方法，包括但不限于C语言、C语言程序设计书籍、题型、作品等，网页逐渐搭建，不断更新中。一个神奇的个人网站！里面将有超多的内容知识。",
      },
    ],
  },
  dev: {
    title: "jihau_top网站发展历程",
    meta: [
      {
        name: "keywords",
        content: "发展、Login、JiHua、jihau.top、网站发展历程页面",
      },
      {
        name: "description",
        content: "这是jihau.top网站的发展历程页面，欢迎您访问此网站！",
      },
    ],
  },
  register: {
    title: "欢迎注册成为尊贵的用户",
    meta: [
      {
        name: "keywords",
        content: "注册、Regisiter、JiHua、jihau.top、注册页面",
      },
      {
        name: "description",
        content: "这是jihau.top网站的注册页面，欢迎您访问此网站！",
      },
    ],
  },
  spslist: {
    title: "友链-JiHua的好朋友们！",
    meta: [
      {
        name: "keywords",
        content: "友链、友情链接、JiHua、jihau.top、通知页面、好朋友",
      },
      {
        name: "description",
        content:
          "这是jihau.top网站的友链页面，欢迎您访问此网站！点击即可申请添加友链墙，互换website链接，成为最好的朋友！",
      },
    ],
  },
  login: {
    title: "登录--欢迎登录jihau.top",
    meta: [
      {
        name: "keywords",
        content: "登录、Login、JiHua、jihau.top、登录页面",
      },
      {
        name: "description",
        content: "这是jihau_top网站的登录页面，欢迎您访问此网站！",
      },
    ],
  },
  notify: {
    title: "通知",
    meta: [
      { name: "keywords", content: "通知、Notify、JiHua、jihau.top、通知页面" },
      {
        name: "description",
        content: "这是jihau.top网站的通知页面，欢迎您访问此网站！",
      },
    ],
  },
  sitemap: {
    title: "站点全速导航",
    meta: [
      {
        name: "keywords",
        content: "站点导航、JiHua、jihau.top、导航页面",
      },
      {
        name: "description",
        content: "这是jihau_top网站的导航页面，欢迎您访问此网站！",
      },
    ],
  }
} as const;
