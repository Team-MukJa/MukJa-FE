<template>
  <section id="app">
    <div class="bg"></div>
    <the-header class="header"></the-header>
    <div class="main-view">
      <router-view :userid="userid" class="router-view"></router-view>
    </div>
  </section>
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
  }),
};
</script>

<style>
.bg {
  background-color: #f2f2f2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

section {
  background-size: cover;
  display: block;
  height: 100vh;
  overflow: hidden;
}

section .header {
  position: relative;
  z-index: 1000;
}

section .main-view {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
  /* background: linear-gradient(
    to bottom right,
    rgb(245, 230, 235),
    rgb(231, 228, 241),
    rgb(210, 218, 233),
    rgb(217, 207, 222),
    rgb(250, 207, 207),
    rgb(254, 240, 214)
  ); */
}

.custom-input:focus {
  outline: none;
  border-color: gray;
  box-shadow: 0 0 5px gray;
}
</style>
