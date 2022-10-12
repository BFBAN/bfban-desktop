import Vue from 'vue'
import axios from 'axios'
import vueElectron from 'electron'

import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'

import vuetify from './plugins/vuetify'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(vueElectron);
Vue.use(vuetify);

/* eslint-disable no-new */
new Vue({
  components: { App },
  vuetify,
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
