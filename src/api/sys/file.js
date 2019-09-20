import { API_SYS } from '../prefix'
import BaseAPI from '../base'
// import client from '@/lib/axios'
import config from '@conf'

class FileAPI extends BaseAPI {
  constructor (prefix = `${API_SYS}/file`) {
    super(prefix)
  }

  // 附件接口（查看图片等）
  show (id) {
    return `${config.STATIC_URL}${this.prefix}/show/${id}`
  }
}

export default new FileAPI()
