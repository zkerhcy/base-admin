import menus from './menus'
import permissionList from './permissionList'
const USER_MAP = {
  admin: {
    code: 1,
    status: 'success',
    name: 'admin',
    user_id: '1',
    access: ['admin'],
    avator: '',
    menus,
    token: 'admin_token',
    username: 'MockName',
    permissionList
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return USER_MAP['admin']
}

export const logout = req => {
  return { code: 1 }
}

export const getUserInfo = req => {
  return USER_MAP['admin']
}

export const getPermission = req => {
  return USER_MAP['admin']
}
