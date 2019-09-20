import UserAPI from '@api/sys/user'
import { sessionSave, sessionRead, sessionRemove } from '@lib/tools'
import client from '@/lib/axios'
import router, { resetRouter } from '@/router'
import dynaRoute from '@/router/dynaRoute'
import msg from '@/router/module/msg'
import err404 from '@/router/module/err404'
import MsgAPI from '@api/sys/msg'
import { Modal } from 'iview'

export default {
  state: {
    userId: '',
    userCode: '',
    userName: '',
    avatarImgPath: '',
    access: [],
    menu: [], // 权限菜单
    permission: [], // 权限按钮
    unreadCount: 0
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserCode (state, code) {
      state.userCode = code
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      sessionSave('token', token)
      client.setToken(token)
    },
    setMenu (state, menu) {
      state.menu = menu
    },
    setPermission (state, permission) {
      state.permission = permission
    },
    delToken (state) {
      sessionRemove('token')
      client.delToken()
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    }
  },
  actions: {
    handleLogin ({ state, commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        UserAPI.login({
          username,
          password
        })
          .then(res => {
            const data = res.data
            if (data.status === 'success') {
              commit('setUserCode', data.code)
              commit('setUserName', data.name)
              commit('setToken', data.token)
            } else {
              commit('delToken')
              commit('setMenu', [])
            }
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        UserAPI.logout()
          .then(data => {
            commit('delToken')
            commit('setMenu', [])
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUserInfo ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        UserAPI.userInfo()
          .then(res => {
            const data = res.data
            if (data.status === 'success') {
              commit('setUserCode', data.code)
              commit('setUserName', data.name)
              dispatch('getUnreadMessageCount')
            }
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUserAuthMenu ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        try {
          if (sessionRead('token')) {
            if (state.token && state.menu && state.menu.length > 0) {
              resolve(state.menu)
            } else {
              UserAPI.userInfo()
                .then(res => {
                  const data = res.data
                  if (data.status === 'success') {
                    if (data.menus.length < 1) {
                      Modal.warning({
                        title: '提示',
                        content: '未授权用户'
                      })
                      resolve([])
                    } else {
                      const menu = {
                        path: '/',
                        name: 'main',
                        meta: {
                          hideInBread: true
                        },
                        children: [...data.menus, msg]
                      }
                      commit('setMenu', [menu])
                      commit('setPermission', data.permissionList)
                      const routes = []
                      dynaRoute(routes, state.menu)
                      resetRouter()
                      router.addRoutes(routes)
                      router.addRoutes([err404])
                      resolve([menu])
                    }
                  } else {
                    commit('delToken')
                    commit('setMenu', [])
                  }
                })
                .catch(err => {
                  console.error('err', err)
                  dispatch('handleLogOut')
                })
            }
          }
        } catch (err) {
          reject(err)
        }
      })
    },
    getUnreadMessageCount ({ state, commit }) {
      MsgAPI.countMsg().then(({ data }) => {
        if (data.status === 'success') {
          commit('setMessageCount', data.data)
        }
      })
    }
  }
}
