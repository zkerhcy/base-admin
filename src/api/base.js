import client from '@/lib/axios'
/**
 * Base api client
 */
class BaseAPI {
  constructor (prefix) {
    this.prefix = prefix
  }

  view (id) {
    return client.request({
      url: `/${this.prefix}/${id}`
    })
  }

  viewByObj (data) {
    return client.request({
      url: `/${this.prefix}/info`,
      data
    })
  }

  viewList (params) {
    return client.request({
      url: `/${this.prefix}/list`,
      params
    })
  }

  countList (params) {
    return client.request({
      url: `/${this.prefix}/count`,
      params
    })
  }

  create (data) {
    return client.request({
      url: `/${this.prefix}/add`,
      data,
      method: 'post'
    })
  }

  update (data) {
    return client.request({
      url: `/${this.prefix}/edit`,
      data,
      method: 'put'
    })
  }

  remove (id) {
    return client.request({
      url: `/${this.prefix}/delete/${id}`,
      method: 'delete'
    })
  }
}

export default BaseAPI
