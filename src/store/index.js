import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        targetUrl: '', // 第三方链接
    },
    mutations: {
        setTargetUrl (state, targetUrl) {
            state.targetUrl = targetUrl
        },
    },
    actions: {
    },
    getters: {
        targetUrl: state => state.targetUrl,
    }
})
