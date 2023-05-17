<template>
  <div>
    <h1>여행정보 상세보기</h1>
    <div v-for="(date, index) in travelDates" :key="index" class="date-section">
      <h2 class="date-heading">{{ date }}</h2>
      <div class="row">
        <div
          v-for="(spot, spotIndex) in getSpotsByDate(date)"
          :key="spotIndex"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <b-card
            class="spot-card"
            @mouseover="handleCardMouseOver"
            @mouseleave="handleCardMouseLeave"
          >
            <img :src="spot.photo" alt="여행지 사진" />
            <h3>{{ spot.title }}</h3>
            <p>{{ spot.memo }}</p>
            <p>방문 시간: {{ spot.visitTime }}</p>
          </b-card>
        </div>
      </div>
      <hr class="date-divider" />
    </div>
    <plan-map></plan-map>
  </div>
</template>

<style>
.date-section {
  margin-bottom: 40px;
}

.date-heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.spot-card {
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.spot-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.date-divider {
  border-top: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>

<script>
import PlanMap from "./PlanMap.vue";
export default {
  data() {
    return {
      travelSpots: [],
      travelDates: ["2023.05.17", "2023.05.18"], // 서버에서 받아온 일자 리스트
    };
  },
  components: {
    PlanMap,
  },
  methods: {
    getSpotsByDate(date) {
      // 서버에서 해당 일자에 해당하는 여행지 정보를 필터링하여 반환하는 함수
      return this.travelSpots.filter((spot) => spot.date === date);
    },
    handleCardMouseOver() {
      // 카드에 마우스를 올렸을 때 처리할 이벤트 핸들러
      // 예: 카드 효과 변경, 추가 정보 표시 등
    },
    handleCardMouseLeave() {
      // 카드에서 마우스가 벗어났을 때 처리할 이벤트 핸들러
      // 예: 카드 효과 원래대로 복원, 추가 정보 숨김 등
    },
  },
  mounted() {
    // 서버 API를 호출하여 travelSpots 데이터를 가져오는 로직
    // 예시로 하드코딩된 데이터 사용
    this.travelSpots = [
      {
        title: "남산",
        photo: "남산 사진 URL",
        memo: "남산에 대한 메모",
        visitTime: "방문 시간",
        date: "2023.05.17",
      },
      {
        title: "명동",
        photo: "명동 사진 URL",
        memo: "명동에 대한 메모",
        visitTime: "방문 시간",
        date: "2023.05.17",
      },

      {
        title: "경복궁",
        photo: "경복궁 사진 URL",
        memo: "경복궁에 대한 메모",
        visitTime: "방문 시간",
        date: "2023.05.18",
      },
      // 다른 여행지 정보도 추가할 수 있습니다.
    ];
  },
};
</script>
