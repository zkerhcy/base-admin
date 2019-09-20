import { API_SYS } from '../prefix'
import BaseAPI from '../base'
import client from '@/lib/axios'

// 消息中心
class MsgAPI extends BaseAPI {
  constructor (prefix = `${API_SYS}/msg`) {
    super(prefix)
  }

  countMsg () {
    return client.request({
      url: `${this.prefix}/countMsg`
    })
  }

  operate (data) {
    return client.request({
      url: `${this.prefix}/operate`,
      data,
      method: 'post'
    })
  }
}

export default new MsgAPI()
