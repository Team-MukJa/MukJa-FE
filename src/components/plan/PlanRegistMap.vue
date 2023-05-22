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

      let content = document.createElement("div");
      content.style.maxWidth = "300px";
      content.style.minWidth = "300px";

      let cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.classList.add("d-flex");
      cardHeader.classList.add("justify-content-end");

      let closeButton = document.createElement("button");
      closeButton.setAttribute("type", "button");
      closeButton.classList.add("btn-close");
      closeButton.addEventListener("click", this.closeCard);
      closeButton.setAttribute("data-bs-dismiss", "modal");
      closeButton.setAttribute("aria-label", "Close");

      cardHeader.appendChild(closeButton);
      content.appendChild(cardHeader);

      let row = document.createElement("div");
      row.classList.add("row");
      row.classList.add("g-0");

      let col12 = document.createElement("div");
      col12.classList.add("col-md-12");

      let img = document.createElement("img");
      img.setAttribute("src", position.img);
      img.classList.add("img-fluid");
      img.classList.add("rounded-start");
      img.classList.add("h-100");
      img.setAttribute("alt", position.title);
      img.style.objectFit = "cover";
      img.style.width = "100%";
      img.style.height = "300px";

      col12.appendChild(img);
      row.appendChild(col12);

      let colBody = document.createElement("div");
      colBody.classList.add("col-md-12");
      colBody.classList.add("ps-2");
      colBody.classList.add("pe-2");
      colBody.classList.add("p-1");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.classList.add("fw-bold");
      title.classList.add("fs-5");
      title.classList.add("text-wrap");
      title.appendChild(document.createTextNode(position.title));

      let addr = document.createElement("p");
      addr.classList.add("card-text");
      addr.classList.add("fs-6");
      addr.classList.add("text-wrap");
      addr.appendChild(document.createTextNode(position.addr));

      let detailButton = document.createElement("button");
      detailButton.setAttribute("type", "button");
      detailButton.addEventListener("click", this.closeCard);
      detailButton.setAttribute("id", "test");
      detailButton.classList.add("btn");
      detailButton.classList.add("btn-primary");
      detailButton.appendChild(document.createTextNode("상세보기"));

      cardBody.appendChild(title);
      cardBody.appendChild(addr);
      cardBody.appendChild(detailButton);
      colBody.appendChild(cardBody);
      row.appendChild(colBody);

      content.appendChild(row);

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
