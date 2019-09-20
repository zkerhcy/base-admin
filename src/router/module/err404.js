import err404 from '@/views/error-page/404.vue'
export default {
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: err404
}
