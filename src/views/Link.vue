<template>
  <div>
    <div class="grid-3_xs-1_sm-2_md-2" v-if="links.length">
      <div
          :key="index"
          v-for="(link, index) in links"
          class="col w-full"
      >
        <ExchangeLink
            :url="link.url"
            :title="link.title"
            :description="link.description"
            class="center"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ExchangeLink from '../components/ExchangeLink.vue'
export default{
  data() {
    return {
    links: [
      {
        id: 1,
        title: '测试',
        description: '描述',
        url: 'www.baidu.com'
      },
      {
        id: 1,
        title: '测试',
        description: '描述',
        url: 'www.baidu.com'
      }
    ]
    }},
  components: {
    ExchangeLink
  }
}
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}

</style>
