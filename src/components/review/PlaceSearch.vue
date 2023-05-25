<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <div>
      <div class="row">
        <div class="col">
          <br />
          <label class="label">시/도: </label>
          <select-sido @select-sido="selectSido"></select-sido>
        </div>

        <div class="col">
          <br />
          <label class="label">구/군: </label>
          <select-gugun
            :sidoCode="sidoCode"
            @select-gugun="selectGugun"></select-gugun>
        </div>

        <div class="col">
          <br />
          <label class="label">키워드: </label>
          <div class="input-container">
            <input
              type="text"
              id="keyword"
              class="input-field"
              v-model="keyword" />
            <button @click="searchPlaces" class="search-button">검색</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 여기에 Category 항목 추가 -->
    <div>
      <div class="content-type-checkbox-group">
        <button
          v-for="contentType in contentTypes"
          :key="contentType.value"
          class="content-type-button"
          :class="{
            'content-type-selected': selectedContentTypes.includes(
              contentType.value
            ),
          }"
          @click="toggleContentType(contentType.value)">
          <span>{{ contentType.text }} </span>
          <img
            class="category-icon"
            width="25px"
            :src="require(`../../assets/marker/${contentType.value}.png`)"
            :alt="contentType.text" />
        </button>
      </div>
    </div>
    <kakao-map :places="places"></kakao-map>

    <div>
      <br /><br /><br />
      <h3>[ 검색 결과 ]</h3>
      <br />
      <ul></ul>
    </div>
  </div>
</template>

<script>
// ...
</script>

<style scoped></style>

<script>
import KakaoMap from "@/components/search/KakaoMap.vue";
import SelectSido from "@/components/item/SelectSido.vue";
import SelectGugun from "@/components/item/SelectGugun.vue";
import { mapActions, mapMutations } from "vuex";
import { searchDestination } from "@/api/review";
const itemStore = "itemStore";

//가져옴
export default {
  components: {
    KakaoMap,
    SelectSido,
    SelectGugun,
  },
  props: {
    //myPlace를 정의하고 상위 컴포넌트에서 전달된 데이터를 받아온다.
    // myPlace: Array,
  },

  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      keyword: "",
      places: [],
      contentTypeId: [],
      searched: false,
      gugunOptions: {
        // 여기서 값 넣어주기
      },
      contentTypes: [
        { text: "관광지", value: 12 },
        { text: "문화시설", value: 14 },
        { text: "축제/공연/행사", value: 15 },
        { text: "여행코스", value: 25 },
        { text: "레포츠", value: 28 },
        { text: "숙박", value: 32 },
        { text: "쇼핑", value: 38 },
        { text: "음식점", value: 39 },
      ],
      selectedContentTypes: [],
    };
  },
  methods: {
    toggleContentType(contentTypeValue) {
      if (this.selectedContentTypes.includes(contentTypeValue)) {
        const index = this.selectedContentTypes.indexOf(contentTypeValue);
        this.selectedContentTypes.splice(index, 1);
      } else {
        this.selectedContentTypes.push(contentTypeValue);
      }

      console.log(contentTypeValue); // contentTypeValue 쳌
      console.log(this.selectedContentTypes.length); //배열로 잘 들어갔는지 쳌
    },

    updateGugunOptions() {
      this.gugun = "";
    },
    ...mapActions(itemStore, ["getGugun"]),
    ...mapMutations(itemStore, ["CLEAR_GUGUN_LIST"]),
    selectSido(sidoCode) {
      // this.CLEAR_GUGUN_LIST();
      // this.getGugun(sidoCode);
      this.sidoCode = sidoCode;
      console.log(sidoCode);
    },
    selectGugun(gugunCode) {
      this.gugunCode = gugunCode;
      console.log(gugunCode);
    },
    searchPlaces() {
      if (this.sido === "" && this.gugun === "") {
        alert("시도와 구군을 선택해주세요.");
        return;
      }
      searchDestination(
        this.sidoCode,
        this.gugunCode,
        this.selectedContentTypes,
        this.keyword,
        ({ data }) => {
          this.places = data;
        },
        (error) => {
          console.log(error);
        }
      );

      console.log(this.selectedContentTypes);

      this.searched = true;
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 20px;
  /* font-family: "Times New Roman", Times, serif; */
  font-weight: bold;
  color: white;
  margin-right: 10px;
  border-radius: 30px;
  margin-left: 30px;
}

select,
input {
  width: 300px;
  height: 250px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: 30px;
  font-family: Arial, sans-serif;
  height: 34px; /* 높이 추가 */
}

button {
  background-color: #f7cbe1;
  height: 45px;
  width: 80px;
  color: #080808;
  font-weight: 800;
  border-radius: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  margin-left: 10px;
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
.kakao-map-container {
  border-radius: 2 0px;
  overflow: hidden;
}

.content-type-checkbox-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content-type-button {
  background-color: #fff;
  border-radius: 10px;
  width: 150px;
  margin-bottom: 1px;
  font-size: 15px;
  font-weight: 700;
  color: black;
}

.content-type-button:hover,
.content-type-selected {
  background-color: #f7cbe1; /* 연핑크색 배경으로 변경 */
}

.input-field {
  width: 100%;
  height: 34px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: 30px;
  font-family: Arial, sans-serif;
  display: block;
}

.input-container {
  display: flex;
  align-items: center;
}

.search-button {
  background-color: #f7cbe1;
  height: 38px;
  widows: 80px;
  color: #080808;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  padding: 5px 10px;
}
</style>
