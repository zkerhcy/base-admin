import { API_SYS } from '../prefix'
import BaseAPI from '../base'
import client from '@/lib/axios'

class ExportAPI extends BaseAPI {
  constructor (prefix = `${API_SYS}/export`) {
    super(prefix)
  }

  exportExcel (params) {
    return client.request({
      url: `/${this.prefix}/excel`,
      responseType: 'blob',
      params
    })
  }
}

export default new ExportAPI()
