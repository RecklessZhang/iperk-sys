<template>
  <div id="app" class="hide-scroll-bar">
    <Navbar v-if="!$route.meta.hideHeader" :_this="this"/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
}
</style>
