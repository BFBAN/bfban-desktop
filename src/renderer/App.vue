<template>
  <div id="app">
    <v-app id="inspire">
      <Header></Header>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/header/header.vue";

import { conf } from "../renderer/assets/js/index";

export default {
  name: 'bfban-desktop',
  components: {Header},
  created () {
    conf.initConf();
  }
}
</script>

<style>
@import "./assets/css/body.css";

#app {
  overflow: hidden;
}
</style>
