<template>
  <div id="app">
    <the-header></the-header>
    <router-view :userid="userid"></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  data: () => ({
    userid: "ssafy",
    //
  }),
};
</script>
