import directives from './directives'

const directive = Vue => {
  Vue.directive('permission', directives.permission)
}

export default directive
