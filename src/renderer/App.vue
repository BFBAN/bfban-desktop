<template>
  <div id="app">
    <Header></Header>
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import Header from "./components/header/header.vue";

export default {
  name: 'bfban-desktop',
  components: {Header},

}
</script>

<style>
@import "./assets/css/body.css";

#app {
  overflow: hidden;
}
</style>
