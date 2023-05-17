<template>
  <div>
    <!-- <h2>{{ message }}</h2> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppHotplace",
  components: {},
  data() {
    return {
      message: "AppHotplace 입니다",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
