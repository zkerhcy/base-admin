import { API_COMMON } from '../prefix'
import BaseAPI from '../base'
import client from '@/lib/axios'

class MsgAPI extends BaseAPI {
  constructor (prefix = `${API_COMMON}/msg`) {
    super(prefix)
  }

  countMsg () {
    return client.request({
      url: `${this.prefix}/countMsg`
    })
  }

  operate () {
    return client.request({
      url: `${this.prefix}/operate`
    })
  }
}

export default new MsgAPI()
