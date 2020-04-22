<template>
  <div id="app">
    <Overview/>
  </div>
</template>
<script>

import Overview from './components/Overview.vue'

export default {
  name: 'App',
  components: {
    Overview
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f0f5;
  text-align: center;
  color: #2c3e50;
  padding-top: 2vw;
}
</style>
