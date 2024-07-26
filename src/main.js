import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

import 'boxicons'
import 'boxicons/css/boxicons.min.css'

import '@fortawesome/fontawesome-free/css/all.css'

import common from './utils/common.js'
Vue.prototype.common = common

Vue.use(Vuesax, {})

Vue.config.productionTip = false

// 定时器,每天八点执行
new Vue({
  created() {
    this.intervalTrigger()
  },

  methods: {
    intervalTrigger() {
      store.commit('INIT_DATA')

      const timer = setInterval(() => {
        let date = new Date()
        if (date.getHours() === store.state.globalConfig.intervalHour) {
          store.commit('UPDATE_DATALIST')

          clearInterval(timer)
        }
      }, 5000)
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
