import config from '@conf'
import login from '@/views/login'
export default {
  path: '/login',
  name: config.LOGIN_PAGE_NAME,
  meta: {
    title: '登录',
    hide: true
  },
  component: login
}
