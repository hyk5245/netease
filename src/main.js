import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from '@/router'
import * as UTIL from '@/assets/js/util.js'
import Null from '@/components/Null'
Vue.component('Null', Null);

import store from './store/index.js'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 引入所有请求API
import * as API from '@/api'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import './assets/css/variable.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$API = API,
    Vue.prototype.$UTIL = UTIL,
    Vue.prototype.$bus = this
  }
}).$mount('#app')
