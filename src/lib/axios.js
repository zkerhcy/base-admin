import axios from 'axios'
import config from '@/config'
import { LoadingBar, Message } from 'iview'
import { sessionRead } from '@lib/tools'
import router from '@/router'
import store from '@/store'

class RequestBuilder {
  constructor () {
    this.defaultOptions = config.API_OPTIONS
    this.queue = {}
  }
  destory (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      LoadingBar.finish()
    }
  }
  interceptors (instance, url) {
    // Request interceptor
    instance.interceptors.request.use(
      config => {
        if (!Object.keys(this.queue).length) {
          LoadingBar.start()
        }
        if (sessionRead('token')) {
          config.headers.token = sessionRead('token')
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // Response interceptor
    instance.interceptors.response.use(
      res => {
        this.destory(url)
        const { data, status, headers } = res
        if (status === 200) {
          if (data instanceof Blob) {
            return { data, status, headers }
          }
        } else {
          return Promise.reject(data)
        }
        return { data, status }
      },
      error => {
        Message.destroy()
        const { data, status } = error.response
        if (data) {
          if (status === 401) {
            store.commit('delToken')
            store.commit('setMenu', [])
            router.replace({
              name: config.LOGIN_PAGE_NAME
            })
          }
          if (status === 500) {
            Message.error('服务器好像出了点故障！')
          } else if (status === 401) {
            Message.warning(`${data.message}`)
          } else {
            if (data.message) {
              Message.error(`${data.message}`)
            } else {
              Message.error(`${error.message}`)
            }
          }
        }
        this.destory(url)
        return Promise.reject(error)
      }
    )
  }
  request (options) {
    const instance = axios.create()
    Object.assign(options, this.defaultOptions)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  setToken (token) {
    Object.assign(this.defaultOptions.headers, { token })
  }

  delToken () {
    delete this.defaultOptions.headers.token
  }
}

export default new RequestBuilder()
