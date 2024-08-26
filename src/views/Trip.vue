<template>
  <div style="overflow-x: hidden;">
    <Calendar :contributionData="contributionData" :that="this"></Calendar>
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue'
export default {
  name: 'Trip',
  components: {
    Calendar
  },
  data() {
    return {
      contributionData: [
        ['2016-01-01', 1], ['2016-01-02', 1], ['2016-01-03', 1], ['2016-01-04', 1],
        ['2016-11-20', 1], ['2016-11-21', 1], ['2016-11-22', 1], ['2016-11-23', 1]
      ]
    }
  }

}
</script>
<style scoped>

</style>
