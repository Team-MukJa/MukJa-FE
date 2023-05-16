<template>
  <div class="main-container"></div>
</template>

<script>
export default {
  name: "app-user",

  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
