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
    // MapComponent
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
  margin-top: 30px;
}

.left {
  width: 60vh;
  justify-content: flex-start;
  border-radius: 10px;
  margin: 10px;
}

.right {
  width: 60vh;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  border: 5px solid rgb(255, 165, 165);
}
</style>
