<template>
    <header>
      <v-app-bar
        dense
        dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title @click="appQuit">
            title
        </v-toolbar-title>
      </v-app-bar>
    </header>
  </template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        appQuit () {
            // app.quit();
        }
    }
}
</script>

<style>
header {
    -webkit-app-region: drag;
}
</style>