<template>
  <div class="container">
    <div class="left" style="height: 800px">
      <the-kakao-map @map-clicked="mapClicked"></the-kakao-map>
    </div>
    <div class="right" style="background-color: white; margin: 8px">
      <hotplace-input-item :received-map-value="mapValue"></hotplace-input-item>
    </div>
  </div>
</template>

<script>
import TheKakaoMap from "./HotplaceMap.vue";

import HotplaceInputItem from "./item/HotplaceInputItem.vue";

export default {
  components: {
    // MapComponent,
    TheKakaoMap,
    HotplaceInputItem,
  },
  data() {
    return {

      mapValue: "",
    };
  },
  methods: {
    mapClicked(value) {
      this.mapValue = value;
      console.log("맵 데이터");
      console.log(this.mapValue);
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.left {
  width: 70vh;
  justify-content: flex-start;
  border-radius: 10px;
  margin: 10px;
  height: 90vh;
}

.right {
  width: 60vh;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  height: 80vh;
}
</style>
