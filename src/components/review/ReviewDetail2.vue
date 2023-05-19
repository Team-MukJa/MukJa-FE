<template>
  <div>
    <br /><br /><br /><br /><label for="sido">시/도:</label>
    <select id="sido" v-model="sido" @change="updateGugunOptions">
      <option value="">선택하세요</option>
      <option value="경기도">경기도</option>
      <option value="서울특별시">서울특별시</option>
      <option value="강원도">강원도</option>
      <option value="충청북도">충청북도</option>
      <option value="충청남도">충청남도</option>
      <option value="전라북도">전라북도</option>
      <option value="전라남도">전라남도</option>
      <option value="경상북도">경상북도</option>
      <option value="경상남도">경상남도</option>
      <option value="제주특별자치도">제주특별자치도</option>
    </select>

    <!-- <label for="gugun" v-if="sido !== ''">구/군:</label>
    <select id="gugun" v-model="gugun" v-if="sido !== ''"> -->

    <label for="gugun">구/군:</label>
    <select id="gugun" v-model="gugun">
      <option value="">선택하세요</option>
      <option
        v-for="option in gugunOptions[sido]"
        :value="option"
        :key="option">
        {{ option }}
      </option>
    </select>

    <label for="keyword">키워드:</label>
    <input type="text" id="keyword" v-model="keyword" />

    <button @click="searchPlaces">검색</button><br />

    <kakao-map></kakao-map>

    <div v-if="searched">
      <br /><br /><br />
      <h3>[ 검색 결과 ]</h3>
      <br />

      <ul>
        <!-- <li v-for="place in filteredPlaces" :key="place.id"> -->
        <li v-for="place in places" :key="place.id">
          PLACE_ID: {{ place.id }}, 시/도: {{ place.sido }}, 이름:
          {{ place.name }}, 위도: {{ place.latitude }}, 경도:
          {{ place.longitude }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/search/KakaoMap.vue";

export default {
  components: {
    KakaoMap,
  },

  data() {
    return {
      sido: "",
      gugun: "",
      keyword: "",
      places: [],
      searched: false,
      gugunOptions: {
        경기도: ["일산서구", "일산동구"],
        서울특별시: ["동작구", "용산구"],
        강원도: ["횡성군", "홍천군"],
        충청북도: ["청주시", "충주시"],
        충청남도: ["천안시", "공주시"],
        전라북도: ["전주시", "익산시"],
        전라남도: ["목포시", "여수시"],
        경상북도: ["포항시", "경주시"],
        경상남도: ["부산시", "창원시"],
        제주특별자치도: ["제주시", "서귀포시"],
      },
    };
  },
  methods: {
    updateGugunOptions() {
      this.gugun = "";
    },
    searchPlaces() {
      if (this.sido === "" && this.gugun === "") {
        alert("시도와 구군을 선택해주세요.");
        return;
      }

      // 장소 검색 로직 구현
      // 검색 결과를 this.places에 저장하고 this.searched 값을 true로 설정
      // 장소 검색 로직 구현
      // 더미 데이터로 생성된 관광지 정보
      const dummyData = [
        {
          id: 1,
          sido: "경기도",
          gugun: "일산서구",
          name: "일산호수공원",
          latitude: 37.123,
          longitude: 127.456,
        },
        {
          id: 2,
          sido: "경기도",
          gugun: "일산동구",
          name: "킨텍스",
          latitude: 37.789,
          longitude: 128.012,
        },
        {
          id: 3,
          sido: "서울특별시",
          gugun: "동작구",
          name: "남산타워",
          latitude: 36.987,
          longitude: 126.789,
        },
        {
          id: 4,
          sido: "강원도",
          gugun: "횡성군",
          name: "횡성한우마을",
          latitude: 37.456,
          longitude: 127.789,
        },
        {
          id: 5,
          sido: "강원도",
          gugun: "홍천군",
          name: "청풍문화마을",
          latitude: 36.789,
          longitude: 128.123,
        },
        {
          id: 6,
          sido: "경기도",
          gugun: "일산서구",
          name: "웨스턴돔",
          latitude: 37.234,
          longitude: 127.567,
        },
        {
          id: 7,
          sido: "경기도",
          gugun: "일산동구",
          name: "일산문화재단",
          latitude: 37.89,
          longitude: 128.123,
        },
        {
          id: 8,
          sido: "서울특별시",
          gugun: "동작구",
          name: "한강공원",
          latitude: 36.876,
          longitude: 126.654,
        },
        {
          id: 9,
          sido: "강원도",
          gugun: "횡성군",
          name: "횡성옹기촌",
          latitude: 37.567,
          longitude: 127.89,
        },
        {
          id: 10,
          sido: "강원도",
          gugun: "홍천군",
          name: "청풍사",
          latitude: 36.654,
          longitude: 128.456,
        },
        {
          id: 11,
          sido: "경기도",
          gugun: "일산서구",
          name: "덕이동주민공원",
          latitude: 37.345,
          longitude: 127.678,
        },
        {
          id: 12,
          sido: "경기도",
          gugun: "일산동구",
          name: "일산호수공원 바다방면",
          latitude: 37.901,
          longitude: 128.234,
        },

        {
          id: 13,
          sido: "서울특별시",
          gugun: "동작구",
          name: "이화 약국",
          latitude: 32.901,
          longitude: 118.234,
        },
      ];

      // 장소 검색 결과를 this.places에 저장하고 this.searched 값을 true로 설정
      this.places = dummyData;
      this.searched = true;
    },

    computed: {
      filteredPlaces() {
        if (this.sido === "" && this.gugun === "") {
          return this.places;
        }

        // sido와 gugun이 일치하는 더미 데이터만 필터링하여 반환
        return this.places.filter((place) => {
          return place.sido === this.sido && place.gugun === this.gugun;
        });
      },
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

label {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 30px;
}

select,
input,
button {
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
</style>
