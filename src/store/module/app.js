import {
  getBreadCrumbList,
  getHomeRoute,
  getMenuByDynaRouter
} from '@/lib/util'
import { localSave, localRead } from '@/lib/tools'
import config from '@/config'
const { HOME_PAGE_NAME } = config

export default {
  state: {
    breadCrumbList: [],
    homeRoute: {},
    local: localRead('local')
  },
  getters: {
    menuList: (state, getters, rootState) => {
      return getMenuByDynaRouter(rootState.user.menu)
    }
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, HOME_PAGE_NAME)
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    }
  }
}
