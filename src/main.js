import Vue from 'vue'
import App from './App.vue'

import './assets/normalize.css'
import './assets/theme.css'
import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
