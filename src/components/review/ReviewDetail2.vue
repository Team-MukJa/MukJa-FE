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

    <!-- <template>
      <div class="col">
        <br />
        <label class="label">구/군: </label>
        <select-gugun
          :sidoCode="sidoCode"
          :gugunOptions="gugunOptions[sidoCode]"
          @select-gugun="selectGugun">
        </select-gugun>
      </div>
    </template> -->

    <kakao-map :places="places"></kakao-map>

    <div>
      <br /><br /><br />
      <h3>[ 검색 결과 ]</h3>
      <br />
      <ul>
        <!-- <li v-for="place in gugunList" :key="place.id">
          PLACE_ID: {{ place.id }}, 시/도: {{ place.sido }}, 이름:
          {{ place.name }}, 위도: {{ place.latitude }}, 경도:
          {{ place.longitude }}
        </li> -->
      </ul>
    </div>
    <!-- <b-table
      class="table"
      striped
      hover
      :items="myPlace"
      :fields="fields"
      @row-clicked="viewPost"
      responsive>
      <template #cell(id)="row">{{ row.value }}</template>
    </b-table> -->
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
      keyword: "null",
      places: [],
      contentTypeId: [12],
      searched: false,
      gugunOptions: {
        // 여기서 값 넣어주기
      },
    };
  },
  methods: {
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
        this.contentTypeId,
        this.keyword,
        ({ data }) => {
          this.places = data;
        },
        (error) => {
          console.log(error);
        }
      );
      // 장소 검색 로직 구현
      // 검색 결과를 this.places에 저장하고 this.searched 값을 true로 설정
      // 장소 검색 로직 구현
      // 더미 데이터로 생성된 관광지 정보
      console.log(this.places);
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
</style>
