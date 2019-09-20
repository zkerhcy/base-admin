import parentView from '@c/parent-view'
import Main from '@/views/Main'
const dynaComp = name => () => import(`@/views${name}`)

function generateMenu (routers, data, parentPath = '') {
  if (data) {
    try {
      data.forEach(item => {
        let menu = Object.assign({}, item)
        if (menu.name === 'main') {
          menu.component = Main
          const redirectName = redirectRouteName(item)
          menu = Object.assign(
            {
              redirect: { name: redirectName }
            },
            menu
          )
        } else {
          if (item.children) {
            menu.component = parentView
          } else {
            menu.component = dynaComp(`${parentPath}${item.path}`)
          }
        }
        if (item.children) {
          menu.children = []
          const path = `${parentPath}${item.path}${
            item.path === '/' ? '' : '/'
          }`
          generateMenu(menu.children, item.children, path)
        }
        routers.push(menu)
      })
    } catch (error) {
      console.error('Generate menu error: ', error)
    }
  }
}

function redirectRouteName (item) {
  let name
  if (item.children || item[0].children) {
    name = item.children ? redirectRouteName(item.children) : redirectRouteName(item[0].children)
  } else {
    name = item[0].name
  }
  return name
}

export default generateMenu
