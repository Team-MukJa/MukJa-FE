<template>
  <div>
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
          <label class="label">키워드: </label> <br />
          <input type="text" id="keyword" v-model="keyword" />
          <button @click="searchPlaces">검색</button>
        </div>
      </div>
    </div>
    <!-- 여기에 Category 항목 추가 -->

    <!-- <div>
      <div class="content-type-checkbox-group">
        <label
          v-for="contentType in contentTypes"
          :key="contentType.value"
          class="content-type-checkbox">
          <input
            type="checkbox"
            :value="contentType.value"
            v-model="selectedContentTypes"
            @change="toggleContentType" />
          {{ contentType.text }}
          <img
            class="category-icon"
            width="25px"
            :src="require(`../../assets/marker/${contentType.value}.png`)"
            :alt="contentType.text" />
        </label>
      </div>
    </div> -->

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
      this.selectedContentTypes.push(contentTypeValue);
      console.log(contentTypeValue); // contentTypeValue를
      console.log(this.selectedContentTypes.length);
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
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 30px;
}

select,
input {
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
  height: 34px; /* 높이 추가 */
}

button {
  background-color: #b25ef7;
  height: 35px;
  width: 50px;
  color: #fff;
  /* border-radius: 90px; */

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

.content-type-checkbox-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content-type-button {
  background-color: #fff;
  border-radius: 10px;
  width: 150px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: black;
}

.content-type-button:hover,
.content-type-selected {
  background-color: #f7cbe1; /* 연핑크색 배경으로 변경 */
}
</style>
