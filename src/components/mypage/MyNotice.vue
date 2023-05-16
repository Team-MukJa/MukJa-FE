<template>
  <div class="main-container">
    <div class="card-container">
      <board-list-item v-for="item in myNotice" :key="item.noticeId" :item="item"></board-list-item>
    </div>
  </div>
</template>

<script>
import BoardListItem from "./BoardListItem.vue";

export default {
  name: "MyNotice",
  components: { BoardListItem },
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
  background-repeat: no-repeat;
  background-size: cover;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
