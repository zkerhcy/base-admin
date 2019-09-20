import store from '@/store'
import { oneOf } from '@lib/assist'
export default {
  inserted (el, { arg, value }, { context }) {
    let pageName = context.$options.name
    if (value) {
      pageName = value
    }
    if (!oneOf(`${pageName}-${arg}`, store.state.user.permission)) {
      if (Element.prototype.remove) {
        el.remove()
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }
}
