import { API_SYS } from '../prefix'
import BaseAPI from '../base'

class RoleAPI extends BaseAPI {
  constructor (prefix = `${API_SYS}/role`) {
    super(prefix)
  }
}

export default new RoleAPI()
