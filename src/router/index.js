import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import config from '@/config'
import { canGoTo } from '@/lib/util'
import { sessionRead } from '@lib/tools'
// import { getQueryString } from '@lib/assist'
const { HOME_PAGE_NAME, LOGIN_PAGE_NAME } = config

Vue.use(Router)
const createRouter = () =>
  new Router({
    routes,
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash'
  })

const router = createRouter()

const goTo = (to, menu, next) => {
  // 有权限，可访问
  if (canGoTo(to.name, menu)) next()
  // 无权限，重定向到401页面
  else next({ name: 'error_401' })
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // setup sso here
  // const ssoToken = getQueryString(window.location.search, 'token')
  // if (ssoToken) {
  //   store.commit('setToken', ssoToken)
  // }
  if (to.name && to.name.slice(0, 5) === 'error') {
    next()
    return
  }
  const noToken = !sessionRead('token')
  if (noToken) {
    if (to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME
      })
    } else {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    }
  } else {
    if (to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: HOME_PAGE_NAME // 跳转到 home page
      })
    } else {
      if (store.state.user.menu && store.state.user.menu.length > 0) {
        // 已登录且Store中有menu（检测要跳转的route是否在menu中）
        goTo(to, store.state.user.menu, next)
      } else {
        // 拉取用户信息（菜单权限信息）
        store
          .dispatch('getUserAuthMenu')
          .then(menu => {
            if (menu.length > 0) {
              if (to.name) {
                goTo(to, menu, next)
              } else {
                if (to.path) {
                  const path = to.path.split('/')
                  next({
                    name: path[path.length - 1]
                  })
                } else {
                  next({
                    name: HOME_PAGE_NAME
                  })
                }
              }
            }
          })
          .catch(() => {
            next({
              name: LOGIN_PAGE_NAME
            })
          })
      }
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
