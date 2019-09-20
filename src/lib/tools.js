export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export const oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
export const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
export const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳毫秒
 * @param {String} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  let resStr = ''
  if (startType === 'year') {
    resStr =
      year +
      '-' +
      month +
      '-' +
      date
  } else resStr = month + '-' + date
  return resStr
}

export const getDateTime = (timeStamp, startType) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') {
    resStr =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      second
  } else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor((timeStamp /= 1000))
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) {
    resStr = getDateTime(timeStamp)
  } else resStr = getDateTime(timeStamp, 'year')
  return resStr
}

/**
 * @param {String} dateStr 时间(2019-01-01)
 * @param {Boolean} full 是否包含时分秒（2019-01-01 10:30:00）
 * @returns {Date}
 */
export const getDateByStr = (dateStr, full = false) => {
  let date
  if (dateStr) {
    if (full) {
      date = new Date(
        dateStr.substring(0, 4),
        Number(dateStr.substring(5, 7)) - 1,
        dateStr.substring(8, 10),
        dateStr.substring(11, 13),
        dateStr.substring(14, 16),
        dateStr.substring(17, 19)
      )
    } else {
      date = new Date(
        dateStr.substring(0, 4),
        Number(dateStr.substring(5, 7)) - 1,
        dateStr.substring(8, 10)
      )
    }
  }
  return date
}

/**
 * @param {String} dateStr 时间(2019-01-01)
 *  @returns {String} 星期x
 */
export const getWeekByDate = dateStr => {
  let weekDay = ''
  if (dateStr) {
    const date = getDateByStr(dateStr)
    switch (date.getDay()) {
      case 1:
        weekDay = '星期一'
        break
      case 2:
        weekDay = '星期二'
        break
      case 3:
        weekDay = '星期三'
        break
      case 4:
        weekDay = '星期四'
        break
      case 5:
        weekDay = '星期五'
        break
      case 6:
        weekDay = '星期六'
        break
      case 0:
        weekDay = '星期日'
        break
      default:
        break
    }
    return weekDay
  }
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */ else {
    return !keysArr1.some(key => obj1[key] != obj2[key])
  }
}

/**
 *
 * @param {*} min
 * @param {*} max
 * @description a random number between min and max (both included):
 */
export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 *
 * @param {*} min
 * @param {*} max
 * @description a random number between min (included) and max (excluded):
 */
export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 *
 * @param {*} min second
 * @param {*} max second
 * @param {*} callback loop func
 * @description loop with random time interval
 */
export const randomInterval = (min, max, callback) => {
  let random = (Math.round(Math.random() * (max - min)) + min) * 1000
  window.setTimeout(() => {
    callback()
    randomInterval(min, max, callback)
  }, random)
}

export const localSave = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const localRead = key => {
  return window.localStorage.getItem(key) || ''
}

export const localRemove = key => {
  return window.localStorage.removeItem(key)
}

export const localClear = () => {
  return window.localStorage.clear()
}

export const sessionSave = (key, value) =>
  window.sessionStorage.setItem(key, value)

export const sessionRead = key => window.sessionStorage.getItem(key) || ''

export const sessionRemove = key => window.sessionStorage.removeItem(key)

export const sessionClear = () => window.localStorage.clear()

/**
 *
 * @param {String} str1 被查找的字符串
 * @param {String} str2 要查找的字符串
 * @param {Number} i 要查找第几个str2
 */
export const strIndex = (str1, str2, index) => {
  let x = str1.indexOf(str2)
  for (let i = 0; i < index; i++) {
    x = str1.indexOf(str2, x + 1)
  }
  return x
}

/**
 * 获取路径中的一段, eg:
 * 'path', 'path/', 'path/dir', 'path/dir/',
 * '/path', '/path/', '/path/dir', '/path/dir/'
 * 获取 path or dir
 * @param {String} path 路径字符串
 * @param {String} i 获取第i个路径值
 */
export const partOfPath = (path, i = 0) => {
  let part = path
  if (path.length <= 1) {
    part = ''
  } else {
    const a = path.split('/').filter(item => item)
    part = a[i] ? a[i] : ''
  }
  return part
}

export const typeOf = obj => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

export const deepCopy = data => {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * shuffle an array.
 * @param {Array} arr the target array.
 */
export const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1))
    let x = arr[i]
    arr[i] = arr[j]
    arr[j] = x
  }
  return arr
}
