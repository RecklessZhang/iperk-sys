<template>
  <div style="width: 100%;">

    <div class="item-align-center mt-10">
      <vs-avatar circle size="90">
        <img src="https://vuesax.com/avatars/avatar-2.png" alt="">
      </vs-avatar>
    </div>
    <div class="item-align-center text-align-center" style="flex-direction: column;">
      <h3>张海龙</h3>
      <h5>3362241807@qq.com · Member since May 16, 2022</h5>
      <div><i class='bx bxs-group'></i> 1 follower · 0 following</div>
    </div>

    <Calendar :contributionData="contributionData" :that="this"></Calendar>

    <div class="grid-2_xs-1_sm-2_md-2 mt-10">
      <div class="col" style="height: 40vh; background-color: pink;"></div>
      <div class="col" style="height: 40vh; background-color: green;"></div>
    </div>
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
        ['2016-11-20', 1], ['2016-11-21', 1], ['2016-11-22', 1], ['2016-11-23', 1],
        ['2016-7-20', 1], ['2016-9-21', 1], ['2016-8-22', 1], ['2016-8-23', 1]
      ]
    }
  }

}
</script>
<style scoped>

</style>
