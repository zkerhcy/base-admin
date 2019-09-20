import wrapper from './wrapper'

export const countMsg = req => {
  let data = 24
  return Object.assign({ data }, wrapper)
}
