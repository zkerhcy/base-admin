import BaseAPI from '../base'
import client from '@/lib/axios'

class TestAPI extends BaseAPI {
  constructor (prefix = 'test') {
    super(prefix)
  }

  test () {
    return client.request({
      url: `/${this.prefix}/req`
    })
  }

  getCityList () {
    return client.request({
      url: `/${this.prefix}/getDictData`
    })
  }
}

export default new TestAPI()
