import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import config from '@conf'
import directive from '@/directive'
import { sync } from 'vuex-router-sync'
import '@/plugins/iview.js'
import '@icon/iconfont.css'

// mock
require('@/mock')
// if (process.env.NODE_ENV !== 'production') require('@/mock')

// custom directive
directive(Vue)

Vue.config.productionTip = false
Vue.prototype.$config = config

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
