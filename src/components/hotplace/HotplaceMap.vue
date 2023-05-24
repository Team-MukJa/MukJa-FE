<template>
  <div class="map_wrap">
    <div id="map" style="width: 100%; height: 80vh; position: relative; overflow: hidden"></div>

    <div id="menu_wrap" class="bg_white searchbox">
      <div class="searchbox">
        <div>
          <input
            type="text"
            value="이태원 맛집"
            id="keyword"
            size="15"
            @keyup.enter="searchPlaces"
          />
        </div>
        <div class="results">
          <div class="place" v-for="rs in search.results" :key="rs.id" @click="showPlace(rs)">
            <h4>
              <!-- <a
                href="#"
                @click="
                  placeRegister(rs, $event);
                  return false;
                "
                style="text-decoration: none"
                >{{ rs.place_name }}</a
              > -->
              {{ rs.place_name }}
            </h4>
            <div class="addr">{{ rs.road_address_name }}</div>
          </div>
        </div>
      </div>
      <hr />
      <!-- <ul id="placesList"></ul>
      <div id="pagination"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMapasdas",

  data() {
    return {
      // map: null,
      // markers: [],
      // infowindow: null,
      // customOverlay: null,
      // searchKeyword: null,
      // search: {
      //   keyword: null,
      //   pgn: null,
      //   results: [],
      // },
      // 수정
      mapOption: {
        center: {
          lat: 37.4990068197872,
          lng: 127.03284079061625,
        },
        level: 3,
      },
      search: {
        keyword: null,
        pgn: null,
        results: [],
      },
      placeName: "",
      firstX: "",
      firstY: "",
    };
  },
  watch: {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      setTimeout(() => {
        this.loadMap();
      }, 100);
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
      var container = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.2073, 127.6358),
          // center: new window.kakao.maps.LatLng( 36.987,  126.789), // 남산 중심 좌표
          level: 5, // 축소된 지도 레벨
        };
      var map = new window.kakao.maps.Map(container, mapOption);
      console.log("TEST" + map);
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

    searchPlaces(e) {
      console.log("검색 메소드");
      const keyword = e.target.value.trim();
      console.log(keyword);
      if (keyword.length === 0) {
        return;
      }

      const ps = new kakao.maps.services.Places();

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, (data, status, pagination) => {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        if (status === kakao.maps.services.Status.OK) {
          var bounds = new kakao.maps.LatLngBounds();
          for (var i = 0; i < data.length; i++) {
            new kakao.maps.Marker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }

        this.search.keyword = keyword;
        this.search.pgn = pagination;
        this.search.results = data;

        for (i = 0; i < data.length; i++) {
          var positions = [
            {
              content: data[i].place_name,
              url: data[i].place_url,
              latlng: new kakao.maps.LatLng(data[i].y, data[i].x),
            },
          ];
          this.firstX = data[i].x;
          this.firstY = data[i].y;
          // 마커를 생성합니다
          positions.forEach(function (pos) {
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: pos.latlng, // 마커의 위치
            });
            // marker.setMap(this.map);
            // 마커에 마우스오버 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "mouseover", function () {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
            });

            // 마커에 마우스아웃 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "mouseout", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "click", function () {
              window.open(pos.url);
            });

            var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:105%; padding:5px;">' + pos.content + "</div>",
              // removable : true
            });
            kakao.maps.event.addListener(marker, "click", function () {
              infowindow.open(map, marker);
            });
          });
        }
      });

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(this.firstY, this.firstX), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
      var map = new kakao.maps.Map(mapContainer, mapOption);
      // this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
    showPlace(movePlace) {
      console.log(movePlace);
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
}

.map_wrap {
  width: 100%;
  height: 100vh;
}

.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}

.searchbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 400px;
  z-index: 10000;
  background-color: #ffffffaa;
  width: 100 px;
  display: flex;
  flex-direction: column;
}
.results {
  flex: 1 1 auto;
  overflow-y: auto;
}
.place {
  padding: 8px;
  cursor: pointer;

  /* &:hover {
    background-color: aliceblue;
  } */
}
h4 {
  margin: 0;
}
</style>
