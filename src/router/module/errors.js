import err401 from '@/views/error-page/401.vue'
import err500 from '@/views/error-page/500.vue'
export default [
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: err401
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: err500
  }
]
