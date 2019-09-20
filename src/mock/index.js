import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getPageTableData, getInfo } from './data'
import { getDictData } from './dict'
import { countMsg } from './constant'

Mock.mock(/\/login/, login)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/userInfo/, getUserInfo)
Mock.mock(/\/getTableData/, getTableData)
Mock.mock(/\/getPageTableData/, getPageTableData)
Mock.mock(/\/getDictData/, getDictData)
Mock.mock(/\/list/, getPageTableData)
Mock.mock(/\/countMsg/, countMsg)
Mock.mock(/\/info/, getInfo)
Mock.mock(/\/add/, getInfo)
Mock.mock(/\/edit/, getInfo)
Mock.mock(/\/delete/, getInfo)
Mock.mock(/\/count/, getInfo)
Mock.mock(/\/edit/, getInfo)
Mock.mock(/\/operate/, getInfo)
// Mock.mock(/\/*/, getInfo)

export default Mock
