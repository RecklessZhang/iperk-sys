import Vue from 'vue'
import Vuex from 'vuex'
// import common from '../utils/common'
Vue.use(Vuex)

// 用来存储数据
const state = {
    globalConfig: JSON.parse(localStorage.getItem('globalConfig')),

    dataList: JSON.parse(localStorage.getItem('dataList'))
}
// 响应组件中的事件
const actions = {

}
// 操作数据
const mutations = {
    INIT_DATA() {
        console.log('初始化数据')
        const globalConfig = require('./globalConfig.json')
        console.log('从文件中获取的====>')
        console.log(globalConfig)
        const dataList = require('./dataList.json')

        window.localStorage.setItem('globalConfig', JSON.stringify(globalConfig))     
        window.localStorage.setItem('dataList', JSON.stringify(dataList))    
        console.log('更新config结束')                 
    },
    UPDATE_DATALIST(state) {
        console.log('进来了')
        // 截止到今天赚了多少
        const days = Math.ceil((new Date().getTime() - new Date(state.globalConfig.outStartDateStr).getTime()) / (1000 * 3600 * 24))
        const totalEarn = days * state.globalConfig.averageRemain

        // 截止到今天允许的花销
        let totalCost = 0

        // 当前商品之前的总计花销
        let beforeCost = 0
        // 当前商品+当前商品之前的总计花销
        let nowCost = 0

        // 需要发送邮件的信息
        let sendDataList = []

        let dataList = state.dataList
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i]
            
            if ((data.price + totalCost) < totalEarn) {
                data.status = 'done'
                if (data.isSendEmail === '0') {
                    sendDataList.push(data)
                    data.isSendEmail = '1'
                }
                totalCost += data.price
            }else {
                data.status = 'working'
                data.isSendEmail = '0'
            }

            if (i !== 0) {
                beforeCost = nowCost * 1
                nowCost += beforeCost * 1 + data.price * 1
            }else {
                nowCost = data.price * 1
            }
            let needDays = Math.ceil(nowCost / 100);
            console.log('need----->')
            console.log(needDays)
            let targetDate = new Date(state.globalConfig.outStartDateStr);
            targetDate.setDate(targetDate.getDate() + needDays);
            const year = targetDate.getFullYear();
            const month = String(targetDate.getMonth() + 1).padStart(2, '0');
            const day = String(targetDate.getDate()).padStart(2, '0');
            const targetDateStr = `${year}-${month}-${day}`;
            data.targetDateStr = targetDateStr
        }
        console.log('update____')
        console.log(dataList)
        
        if(sendDataList.length > 0) {
            // common.sendEmail('123')
        }
        
        // 更新数据
        let globalConfig = {
            intervalHour: state.globalConfig.intervalHour,
            outStartDateStr: state.globalConfig.outStartDateStr,
            averageRemain: state.globalConfig.averageRemain,

            totalEarn: totalEarn,
            totalCost: totalCost,
            totalRemain: totalEarn - totalCost
        }
        localStorage.setItem('globalConfig', JSON.stringify(globalConfig))
        localStorage.setItem('dataList', JSON.stringify(dataList))

        // 创建一个Blob对象
        const blob = new Blob([JSON.stringify(dataList)], { type: 'application/json' });

        // 创建一个下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'test.json';

        // 模拟点击下载链接来保存文件
        downloadLink.click();
    }
}
// 用来将state数据进行加工
const getters = {

}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})