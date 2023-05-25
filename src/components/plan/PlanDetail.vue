<template>
  <div>
    <div class="backg"></div>
    <div class="left-content">
      <div
        v-for="(date, index) in travelDates"
        :key="index"
        class="date-section"
      >
        <h2 class="date-heading">{{ index + 1 + "일차 " + date }}</h2>
        <div class="row">
          <div
            v-for="(spot, spotIndex) in getSpotsByDate(date)"
            :key="spotIndex"
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
                    {{ formatTime(spot.time) }}
                  </p>
                </div>
              </b-card>
            </div>
          </div>
        </div>
        <hr class="date-divider" />
      </div>
    </div>
    <!-- Modal -->
    <b-modal v-model="showModal" hide-footer hide-header>
      <plan-detail-map :spotInfo="spotInfo"></plan-detail-map>
      <plan-explain :spotInfo="spotInfo"></plan-explain>
    </b-modal>
  </div>
</template>

<style scoped>
.backg {
  z-index: -1;
  background-image: url("../../assets/paper.png");
  background-size: 1500px 850px;
  background-position: center;
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

.left-content {
  margin-top: 70px;
  background-color: transparent;
  width: 900px;
  flex: 1.5;
  height: 75vh; /* 수정 */
  margin-bottom: 20px; /* 추가 */
  overflow-y: auto;
  overflow-x: hidden;
  display: flex; /* 추가: 내부 컨텐츠를 왼쪽으로 정렬하기 위해 flex로 설정 */
  flex-direction: column; /* 추가: 내부 컨텐츠를 세로로 정렬하기 위해 flex-direction 설정 */
  justify-content: flex-start; /* 추가: 내부 컨텐츠를 위로 정렬하기 위해 justify-content 설정 */
}
.left-content::-webkit-scrollbar {
  width: 5px;
}

.left-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.spot-card-wrapper {
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
}
.row {
  height: auto; /* 기존의 고정된 높이를 제거하여 내용에 따라 높이가 조절되도록 변경 */
  margin-left: 15px;
}

.spot-card {
  width: 140px; /* 카드 너비 조정 */
  height: 200px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-right: 5px;
}

.card-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
}

.card-image img {
  width: 100px;
  height: 100px;
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

.date-heading {
  font-family: "MYYeongnamnu", sans-serif;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.spot-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.date-divider {
  border-top: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
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
      showModal: false,
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
      this.spotInfo = spot;
      this.showModal = true;
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