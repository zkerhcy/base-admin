import Mock from 'mockjs'
import { doCustomTimes } from '@/lib/util'
import wrapper from './wrapper'
import { getQueryString } from '@lib/assist'

export const getTableData = req => {
  let list = []
  doCustomTimes(15, () => {
    list.push(
      Mock.mock({
        name: '@name',
        email: '@email'
      })
    )
  })
  return Object.assign(list, wrapper)
}

const total = 134
export const getPageTableData = req => {
  let index = getQueryString(req.url, 'pageNum') || 1
  let size = getQueryString(req.url, 'pageSize') || 10
  let returnCount = total - size * (index - 1)
  returnCount = returnCount > size ? size : returnCount
  let list = []
  doCustomTimes(returnCount, i => {
    list.push(
      Mock.mock({
        id: i,
        'uuid|3': /\d{5,10}-/,
        name: '@cname',
        'age|1-100': 1,
        'gender|1-2': 1,
        birth: '@date',
        email: '@email',
        city: '@city',
        images: [
          {
            name: 'img0.jpg',
            url: "@image('500x500', '#64b587', '#fff', 'Vue.js')"
          },
          {
            name: 'img1.jpg',
            url: "@image('400x300', '#894FC4', '#ddd', 'Mock.js')"
          }
        ],
        remark: '@cparagraph',
        content: '@cparagraph',
        createTime: '@date',
        'type|1': ['类型1', '类型2', '类型3'],
        status: Mock.mock('@integer(1, 2)')
      })
    )
  })

  let data = { list, total }
  return Object.assign(data, wrapper)
}

export const getInfo = req => {
  let data = {}
  return Object.assign(data, wrapper)
}
