<template>
  <header>
    <v-system-bar class="drag" dark color="primary" @click="toHome">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" height="15" width="15"/>
      <span class="drag"> BFBAN desktop</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon @click="appQuit">mdi-close</v-icon>
    </v-system-bar>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    appQuit() {
      window.close()
    },
    toHome () {
      if (this.$router.name == 'index') return;
      this.$router.push({
        name: 'index'
      });
    }
  }
}
</script>

<style>
@import '../../assets/css/header.css';

.drag {
  -webkit-app-region: drag;
}

.logo {
  margin-right: 10px;
}
</style>