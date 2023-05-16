<template>
  <div>
    <board-list-item v-for="item in myHotPlace" :key="item.placeId" :item="item"></board-list-item>
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

<style scoped></style>
