import Vue from 'vue'
import iView from 'iview'
import '@styl/iview-variables.less'

Vue.use(iView, {
  transfer: true,
  modal: {
    maskClosable: false
  }
})

Vue.prototype.$Message.config({
  duration: 3
})
