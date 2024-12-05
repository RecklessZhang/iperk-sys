<template>
  <div class="hide-scroll-bar text-align-center">
    <TimeLine :dataList="dataList"></TimeLine>
  </div>
</template>
<script>
import TimeLine from "../components/TimeLine.vue";
export default {
  name: 'Wish',
  components: {
    TimeLine
  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          name: '黑神话悟空',
          price: 268,
          count: 1,
          status: 'done',
          expireTime: '2024-08-19',
          purchaseUrlFromTaoBao: 'https://www.baidu.com',
          purchaseUrlFromJingDong: '',
          purchaseUrlFromTianMao: ''
        },
        {
          id: 2,
          name: '黑神话悟空',
          price: 268,
          count: 1,
          status: 'done',
          expireTime: '2024-08-19',
          purchaseUrlFromTaoBao: 'https://www.baidu.com',
          purchaseUrlFromJingDong: '',
          purchaseUrlFromTianMao: ''
        },
        {
          id: 3,
          name: '黑神话悟空',
          price: 268,
          count: 1,
          status: 'done',
          expireTime: '2024-08-19',
          purchaseUrlFromTaoBao: 'https://www.baidu.com',
          purchaseUrlFromJingDong: '',
          purchaseUrlFromTianMao: ''
        },
        {
          id: 4,
          name: '黑神话悟空',
          price: 268,
          count: 1,
          status: 'working',
          expireTime: '2024-08-24',
          purchaseUrlFromTaoBao: 'https://www.baidu.com',
          purchaseUrlFromJingDong: '',
          purchaseUrlFromTianMao: ''
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
