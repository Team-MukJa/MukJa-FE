<template>
  <div>
    <h2>{{ myNotice }}</h2>
  </div>
</template>

<script>
export default {
  name: "MyNotice",
  components: {},
  props: {
    myNotice: Array,
  },
  data() {
    return {
      message: "MyNotice",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
