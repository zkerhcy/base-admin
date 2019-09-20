import Mock from 'mockjs'
import { doCustomTimes } from '@/lib/util'
import wrapper from './wrapper'

const returnCount = 100
export const getDictData = req => {
  let list = []
  doCustomTimes(returnCount, i => {
    list.push(
      Mock.mock({
        uuid: i,
        id: i,
        name: '@cname',
        city: '@city'
      })
    )
  })
  let data = { list }
  return Object.assign(data, wrapper)
}
