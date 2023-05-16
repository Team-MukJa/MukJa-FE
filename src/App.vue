<template>
  <div id="app">
    <the-header></the-header>
    <div class="main-view">
      <router-view class="router-view" :userid="userid"></router-view>
    </div>
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

<style scoped>
.main-view {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    rgb(245, 230, 235),
    rgb(231, 228, 241),
    rgb(210, 218, 233),
    rgb(217, 207, 222),
    rgb(250, 207, 207),
    rgb(254, 240, 214)
  );
}
</style>
