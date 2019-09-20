// Set project configs here.
// Use `this.$config.key` get value in vue template.
export default {
  title: 'Base-Admin',

  cookieExpires: 1,

  useI18n: false,

  /**
   *  @description 默认打开的首页的路由name值
   */
  HOME_PAGE_NAME: 'main',

  /**
   *  @description 未登录时默认打开的路由name值
   */
  LOGIN_PAGE_NAME: 'login',

  API_VERSION: 'v1',

  API_OPTIONS: {
    baseURL: '/',
    headers: {},
    withCredentials: false
  },

  // 图片文件服务接口地址
  STATIC_URL: '/',

  ATTACHMENT_MAX_COUNT: 5,

  ATTACHMENT_MAX_SIZE: 5,

  PAGE_SIZE: 10,

  KEEP_ALIVE_INTERVAL: 30, // 保活时间间隔（：秒）

  DATE_FORMAT: 'YYYY-MM-DD',

  TIME_FORMAT: 'YYYY-MM-DD HH:mm',

  FULL_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss'
}
