import Vue from 'vue'
import App from './App.vue'
import '../public/css/style.css'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

import 'boxicons'
import 'boxicons/css/boxicons.min.css'

import '@fortawesome/fontawesome-free/css/all.css'

import axios from 'axios'

import router from './router'
import store from './store'

import common from './utils/common.js'
import echarts from 'echarts'

Vue.prototype.common = common
Vue.prototype.echarts = echarts

Vue.use(Vuesax, {})

Vue.config.productionTip = false

// 定时器,每天八点执行
new Vue({
  data: () => ({
    config: {},

    sendDataList: []
  }),

  created() {
    this.getTargets()
    this.intervalTrigger()
  },

  methods: {
    // 获取数据列表
    getTargets() {
      axios
        .get('https://iperk-api.qnmdmyy.top/api/getConfig')
        .then(res => {
          let config = res.data[0]
          this.config = config

          axios
            .get('https://iperk-api.qnmdmyy.top/api/getTargets')
            .then(resp => {
              var dataList = resp.data

              // 截止到今天赚了多少
              const days = Math.ceil((new Date().getTime() - new Date(this.config.start_date).getTime()) / (1000 * 3600 * 24))
              const totalEarn = days * this.config.average_remain

              // 截止到今天允许的花销
              let totalCost = 0

              // 需要发送邮件的信息
              let sendDataList = []

              for (let i = 0; i < dataList.length; i++) {
                let data = dataList[i]

                if ((data.price + totalCost) < totalEarn) {
                  if (data.is_send_email === '0') {
                    sendDataList.push(data)
                  }
                  totalCost += data.price
                }

              }
              this.sendDataList = sendDataList
            })
        })
    },

    intervalTrigger() {
      const timer = setInterval(() => {
        let date = new Date()
        if (date.getHours() === this.config.interval_hour) {
          if (this.sendDataList.length > 0) {
            let sendEmailMessage = ''
            for(let i = 0; i < this.sendDataList.length; i++) {
              axios.get('https://iperk-api.qnmdmyy.top/api/updateTargetSendEmail?id=' + this.sendDataList[i].id)

              sendEmailMessage = sendEmailMessage + this.sendDataList[i].name + ' '
            }

            common.sendEmail(sendEmailMessage)
          }

          clearInterval(timer)
        }
      }, 3600000)
    }
  }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
