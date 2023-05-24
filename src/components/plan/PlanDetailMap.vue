<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: "PlanDetailMap",

  props: {
    spotInfo: Object,
  },

  data() {
    return {
      map: null,
      position: {},
      marker: {},
    };
  },
  watch: {
    spotInfo() {
      console.log("change");
      this.position.title = this.spotInfo.subject;
      this.position.latlng = new kakao.maps.LatLng(this.spotInfo.x, this.spotInfo.y);
      this.loadMap();

      this.loadMarker();
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },

  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=9e5f46b0f0ef1df5cba8b565bc80a020&libraries=services&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },

    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.2073, 127.6358),
        // center: new window.kakao.maps.LatLng( 36.987,  126.789), // 남산 중심 좌표
        level: 5, // 축소된 지도 레벨
      };
      this.map = new window.kakao.maps.Map(container, options);
      console.log("TEST" + this.places);
    },

    loadMarker() {
      this.deleteMarker();

      this.marker = new window.kakao.maps.Marker({
        map: this.map,
        title: this.position.title,
        img: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        position: this.position.latlng,
      });

      this.marker.setMap(this.map);
      // 4. 지도를 이동시켜주기

      this.map.setCenter(this.position.latlng);
    },

    deleteMarker() {
      console.log("마커 싹 지우자!!!");

      // this.map.setMap(null);
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
}

.text-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
