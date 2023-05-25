<template>
  <div class="container">
    <div class="left" style="height: 800px">
      <!-- <MapComponent></MapComponent> -->
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
      // title: "",
      // content: "",
      // file: null,
      // selectedDate: null,
      mapValue: "",
    };
  },
  methods: {
    mapClicked(value) {
      this.mapValue = value;
      console.log("맵 데이터");
      console.log(this.mapValue);
    },
    // submitForm() {
    //   // 게시판 작성 로직 구현
    //   const formData = new FormData();
    //   formData.append("title", this.title);
    //   formData.append("content", this.content);
    //   formData.append("file", this.file);
    //   // 여기에서 formData를 서버로 전송하는 작업을 수행할 수 있습니다.
    //   // axios 등을 사용하여 서버와 통신하는 코드를 작성할 수 있습니다.
    //   // 폼 데이터 전송 후 화면 초기화
    //   this.title = "";
    //   this.content = "";
    //   this.file = null;
    // },
    // moveList() {
    //   console.log("글목록 보러가자!!!");
    //   this.$router.push({ name: "placelist" });
    // },
  },
};
</script>

<style scoped>
.container {
  display: flex;
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
}
</style>
