import { API_SYS } from '../prefix'
import BaseAPI from '../base'
import client from '@/lib/axios'

class UserAPI extends BaseAPI {
  constructor (prefix = `${API_SYS}/user`) {
    super(prefix)
  }
  login (data) {
    return client.request({
      url: `${API_SYS}/login`,
      data,
      method: 'post'
    })
  }

  logout () {
    return client.request({
      url: `${API_SYS}/logout`
    })
  }

  userInfo () {
    return client.request({
      url: `${this.prefix}/userInfo`
    })
  }

  getPermission () {
    return client.request({
      url: `${API_SYS}/getUserPermissions`
    })
  }
}

export default new UserAPI()
