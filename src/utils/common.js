import axios from "axios"

export default {
    goTo: function(url) {
        if(url === '/gitee') {
            window.open('', '_blank')
        }else if(url === '/github') {
            window.open('', '_blank')
        }else if(url === '/blog') {
            window.open('https://blog.qnmdmyy.top', '_blank')
        }
    },

    sendEmail: function(message) {
        let formData = new FormData()
        formData.append('email', '3362241807@qq.com')
        formData.append('message', message)

        axios.post('https://formspree.io/f/mqazenpp', formData)
    }
}