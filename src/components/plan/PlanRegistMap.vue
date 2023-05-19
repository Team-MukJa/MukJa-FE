<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",

  props: {
    searchResults: [],
  },

  data() {
    return {
      map: null,
      positions: [],
      markers: [],
      customOverlay: null,
    };
  },
  watch: {
    searchResults() {
      this.positions = [];
      this.searchResults.forEach((destInfo) => {
        let obj = {};
        obj.title = destInfo.subject;
        obj.latlng = new kakao.maps.LatLng(destInfo.x, destInfo.y);
        obj.img = destInfo.img;
        obj.addr = destInfo.addr;
        this.positions.push(obj);
      });
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

      this.markers = [];
      this.positions.forEach((position) => {
        const marker = new window.kakao.maps.Marker({
          map: this.map,
          title: position.title,
          img: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          position: position.latlng,
        });

        this.markers.push(marker);

        // 마우스 올렸을때 이벤트
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          this.showCustomOverlay(position);
        });

        // 마우스 내렸을때 이벤트
        kakao.maps.event.addListener(marker, "mouseout", () => {
          // this.customOverlay.setMap(null);
        });
      });

      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },

    deleteMarker() {
      console.log("마커 싹 지우자!!!", this.markers.length);
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          console.log(item);
          item.setMap(null);
        });
      }
    },

    showCustomOverlay(position) {
      if (this.customOverlay) {
        this.customOverlay.setMap(null);
      }

      var content =
        "<div class='card' style='max-width: 300px; min-width: 300px;'>" +
        "<div class='card-header d-flex justify-content-end'>" +
        "<button type='button' class='btn-close' @click=" +
        '"' +
        this.closeCard +
        '"' +
        "data-bs-dismiss='modal' aria-label='Close'></button>" +
        "</div>" +
        "<div class='row g-0'>" +
        "<div class='col-md-12'>" +
        "<img src='" +
        position.img +
        "' class='img-fluid rounded-start h-100' alt='" +
        position.title +
        "' style='object-fit: cover; width:100%; height:300px;'>" +
        "</div>" +
        "<div class='col-md-12 ps-2 pe-2 p-1'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title fw-bold fs-5 text-wrap'>" +
        position.title +
        "</h5>" +
        "<p class='card-text fs-6 text-wrap'>" +
        position.addr +
        "</p>" +
        "<button type='button'  @click='closeCard'  id = 'test' class='btn btn-primary'>상세보기</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      // let contentt = document.createElement("div");
      // contentt.style.paddingTop = "30px";
      // let closeButton = document.createElement("button");
      // closeButton.appendChild(document.createTextNode("Close"));
      // closeButton.onclick = () => {
      //   console.log("Close button clicked");
      //   // Add your close button functionality here
      // };

      // // Create details button
      // let detailsButton = document.createElement("button");
      // detailsButton.appendChild(document.createTextNode("Details"));
      // detailsButton.onclick = () => {
      //   console.log("Details button clicked");
      //   // Add your details button functionality here
      // };

      // contentt.appendChild(closeButton);
      // contentt.appendChild(detailsButton);

      // 커스텀 오버레이를 생성합니다
      this.customOverlay = new kakao.maps.CustomOverlay({
        position: position.latlng,
        content: content,
        yAnchor: 1,
      });

      // 커스텀 오버레이를 지도에 표시합니다
      this.customOverlay.setMap(this.map);
      // 커스텀 오버레이가 생성되었을 때, 스타일을 적용합니다.
    },
    handleDetailClick() {
      // 상세보기 버튼 클릭 시 실행되는 메소드
      console.log("상세보기 버튼이 클릭되었습니다.");
    },

    closeCard() {
      console.log("클릭됐어요");
      this.customOverlay.setMap(null);
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
/* 커스텀 오버레이~~~ */
.custom-overlay {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  min-width: 300px;
  font-family: Arial, sans-serif;
}

.custom-overlay__header {
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.custom-overlay__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-overlay__close {
  cursor: pointer;
}

.custom-overlay__body {
  display: flex;
  padding: 10px;
}

.custom-overlay__image {
  flex: 0 0 70px;
  margin-right: 10px;
}

.custom-overlay__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.custom-overlay__address {
  margin-bottom: 10px;
}

.custom-overlay__button {
  padding: 5px 10px;
  background-color: #007bff;
  border: none;
  color: #fff;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.custom-overlay__button:hover {
  background-color: #0056b3;
}
</style>
