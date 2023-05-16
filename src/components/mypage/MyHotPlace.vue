<template>
  <div class="container">
    <div class="card-container">
      <board-list-item
        v-for="item in myHotPlace"
        :key="item.placeId"
        :item="item"
      ></board-list-item>
    </div>
  </div>
</template>

<script>
import BoardListItem from "./BoardListItem.vue";

export default {
  name: "MyHotPlace",
  components: { BoardListItem },
  props: {
    myHotPlace: Array,
  },
  data() {
    return {
      message: "MyHotPlace",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  row-gap: 10px;
  justify-content: center;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(100px, auto));
}
</style>
