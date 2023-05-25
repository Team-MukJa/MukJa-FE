<template>
  <div class="cont">
    <div class="left-content">
      <!-- <h1>여행정보 상세보기</h1> -->
      <div
        v-for="(date, index) in travelDates"
        :key="index"
        class="date-section"
      >
        <h2 class="date-heading">{{ date }}</h2>
        <div class="row flex-wrap">
          <div
            v-for="(spot, spotIndex) in getSpotsByDate(date)"
            :key="spotIndex"
            class="col-lg-4 col-md-4 col-sm-6"
          >
            <div class="spot-card-wrapper">
              <b-card class="spot-card" @click="handleCardClick(spot)">
                <div class="card-image">
                  <img :src="spot.img" alt="여행지 사진" />
                </div>
                <div class="card-content">
                  <h3 class="spot-title">{{ spot.subject }}</h3>
                  <p class="spot-memo">{{ spot.memo }}</p>
                  <p class="spot-time">
                    방문 시간: <span>{{ formatTime(spot.time) }}</span>
                  </p>
                </div>
              </b-card>
            </div>
          </div>
        </div>
        <hr class="date-divider" />
      </div>
    </div>
    <b-container class="right-content">
      <b-row><plan-detail-map :spotInfo="spotInfo"></plan-detail-map></b-row>
      <b-row>
        <plan-explain :spotInfo="spotInfo"></plan-explain>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.cont {
  margin: 30px;
  width: 150vb;
  max-height: 80vh; /* 최대 높이를 viewport의 80%로 설정 */
  background-color: white;
  border-radius: 10px;
  overflow-y: auto; /* 수직 스크롤 추가 */
  display: flex;
  margin-bottom: 100px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.left-content {
  width: 1100px;
  flex: 1.5;
  /* padding: 20px; */
  height: 75vh; /* 수정 */
  overflow-y: auto; /* 추가 */
  margin-bottom: 20px; /* 추가 */
  overflow-y: auto;

  border: #c7e2ff 1px;
}
.spot-card-wrapper {
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
}
.flex-wrap {
  flex-wrap: wrap; /* 카드들이 줄을 넘어가지 않고 한 줄에 균등하게 배치 */
}
.row {
  height: auto; /* 기존의 고정된 높이를 제거하여 내용에 따라 높이가 조절되도록 변경 */
}

.spot-card {
  width: 100%; /* 카드 너비 조정 */
  margin: 5px 0;
  height: 200px;
  padding: 10px; /* 수정: padding 값을 10px로 변경 */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card-image {
  height: 100px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  height: calc(100% - 80px); /* 수정: 높이 조정 */
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  text-align: center;
}

.spot-title {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 10px;
}

.spot-memo {
  font-size: 5px;

  margin-bottom: 5px;
}

.spot-time {
  font-size: 5px;

  color: #888;
}

.spot-time span {
  color: #333;
}

.right-content {
  flex: 1;
  padding: 20px;
  height: 75vh;
  overflow-y: auto;
  margin-bottom: 20px;
  overflow-y: hidden;
  border: #c7e2ff 1px;
  flex-direction: column;
}

.right-content > * {
  height: 50%; /* 자식 컴포넌트가 동일한 크기로 나눠짐 */
}

/* 스크롤바 스타일링 */
.cont ::-webkit-scrollbar {
  width: 8px; /* 스크롤바의 너비 */
}

.cont ::-webkit-scrollbar-track {
  background-color: #f2f2f2; /* 스크롤바 트랙 배경색 */
}

.cont ::-webkit-scrollbar-thumb {
  background-color: #c7e2ff; /* 스크롤바 썸 배경색 */
  border-radius: 4px; /* 스크롤바 썸의 모서리 반경 */
}

.cont ::-webkit-scrollbar-thumb:hover {
  background-color: #a9d2ff; /* 스크롤바 썸에 호버 시 배경색 */
}
.cont > div {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.date-section {
  margin-bottom: 40px;
}

.date-heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
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
import PlanDetailMap from "./PlanDetailMap.vue";
import PlanExplain from "./PlanExplain.vue";
import { getPlanDate, getPlanDetail } from "@/api/plan";

export default {
  data() {
    return {
      planId: "",
      travelSpots: [],
      travelDates: [], // 서버에서 받아온 일자 리스트
      spotInfo: null,
    };
  },
  components: {
    PlanDetailMap,
    PlanExplain,
  },
  created() {
    this.planId = this.$route.params.planid;

    console.log(this.planId);
    getPlanDate(
      this.planId,
      ({ data }) => {
        console.log(data);
        this.travelDates = data;
      },
      (error) => {
        console.log(error);
      }
    );

    getPlanDetail(
      this.planId,
      ({ data }) => {
        console.log(data);
        this.travelSpots = data;
        this.splitDateTime();
      },
      (error) => {
        console.log(error);
      }
    );
  },

  methods: {
    getSpotsByDate(date) {
      // 서버에서 해당 일자에 해당하는 여행지 정보를 필터링하여 반환하는 함수
      return this.travelSpots.filter((spot) => spot.date === date);
    },
    splitDateTime() {
      for (let i = 0; i < this.travelSpots.length; i++) {
        // 각 항목에 새로운 속성 추가
        const parts = this.travelSpots[i].day.split(" "); // 공백을 기준으로 날짜와 시간 분리

        if (parts.length === 2) {
          // 올바른 형식의 입력인 경우
          this.travelSpots[i].date = parts[0];
          this.travelSpots[i].time = parts[1];

          console.log(this.travelSpots[i]);
        } else {
          // 올바르지 않은 형식의 입력인 경우
          this.travelSpots[i].date = "";
          this.travelSpots[i].time = "";
          console.log("날짜와 시간 형식이 올바르지 않습니다.");
        }
      }
    },
    handleCardClick(spot) {
      console.log(spot);
      this.spotInfo = spot;
      // console.log(this.spotInfo);
    },
    formatTime(time) {
      const [hours, minutes] = time.split(":");
      const formattedHours = parseInt(hours, 10) % 12 || 12;
      const amPm = parseInt(hours, 10) < 12 ? "AM" : "PM";
      return `${formattedHours}:${minutes} ${amPm}`;
    },
  },
  mounted() {},
};
</script>
