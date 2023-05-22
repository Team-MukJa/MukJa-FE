<template>
  <div class="cont">
    <!-- 여행 계획 리스트 -->
    <div class="left-content">
      <h2 class="text-center">{{ plan.subject }}</h2>
      <b-tabs v-model="selectedDay" pills vertical>
        <b-tab v-for="day in dayOptions" :key="day.value" :title="day.text" class="tab-item">
          <b-list-group>
            <b-list-group-item
              v-for="destination in getDestinationsByDay(day.value)"
              :key="destination.id"
              class="destination-list-item"
            >
              <b-card class="destination-card input-list-card">
                <h4>{{ destination.subject }}</h4>
                <img :src="destination.img" alt="여행지 사진" class="img-thumbnail" />
                <b-form-group label="방문 시간" label-for="visit-time-input">
                  <b-form-timepicker
                    id="visit-time-input"
                    v-model="destination.visitTime"
                    minute-step="15"
                    :time-formatter="formatTime"
                    placeholder="방문 시간을 선택하세요"
                  ></b-form-timepicker>
                </b-form-group>
                <b-form-group label="메모" label-for="memo-input">
                  <b-form-textarea
                    id="memo-input"
                    v-model="destination.memo"
                    placeholder="메모를 입력하세요"
                  ></b-form-textarea>
                </b-form-group>
                <b-button
                  variant="danger"
                  size="sm"
                  @click="deleteDestination(day.value, destination.id)"
                  class="delete-button"
                >
                  삭제
                </b-button>
              </b-card>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
      <div class="save-button-container">
        <b-button variant="primary" @click="saveDestinations" class="save-button"> 저장 </b-button>
      </div>
    </div>

    <!-- 여행지 검색 결과   -->
    <div class="middle-content">
      <h2 class="text-center">여행지 검색 진행시켜!!</h2>
      <div class="search-bar">
        <b-form-input
          v-model="searchQuery"
          placeholder="검색어를 입력하세요"
          class="search-input"
        ></b-form-input>
        <b-button variant="primary" @click="searchDestinations(searchQuery)" class="search-button">
          검색
        </b-button>
      </div>
      <b-list-group class="search-results">
        <b-list-group-item
          v-for="destination in searchResults"
          :key="destination.content_id"
          @click="addDestination(destination)"
          class="search-result-item"
        >
          <div class="search-result-content">
            <img :src="destination.img" alt="여행지 사진" class="search-result-image" />
            <div class="search-result-title">{{ destination.subject }}</div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="right-content">
      <plan-map :searchResults="searchResults"></plan-map>
    </div>
  </div>
</template>

<script>
import PlanMap from "./PlanRegistMap.vue";
import { mapState } from "vuex";
import { searchByKeyword } from "@/api/plan";

const planStore = "planStore";
export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [
        // latitude
        // longitude
        // first_img
        // title
        // overview
        // content_id
      ],
      destinationLists: [
        //   { day: 1, destinations: [] },
        //   // { day: 2, destinations: [] },
        //   // { day: 3, destinations: [] },
      ],
      selectedDay: 0,
      // dayOptions: [
      //   { value: 1, text: "1일차" },
      //   { value: 2, text: "2일차" },
      //   { value: 3, text: "3일차" },
      // ],
    };
  },
  components: {
    PlanMap,
  },
  created() {
    this.destinationLists = this.generateDestinationLists();
  },
  computed: {
    // ...mapState(planStore, ["plan"]),
    ...mapState(planStore, ["plan"]),

    // 시작일과 종료일을 입력 받아 일차를 구해준다.
    dayOptions() {
      const startDate = new Date(this.plan.startDate);
      const endDate = new Date(this.plan.endDate);
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      const options = [];
      for (let i = 1; i <= diffInDays + 1; i++) {
        options.push({ value: i, text: `${i}일차` });
      }
      return options;
    },

    // destinationLists() {},
  },
  methods: {
    searchDestinations(keyword) {
      console.log(keyword + "키워드입니다");
      // 검색 결과를 가져오는 로직
      searchByKeyword(
        keyword,
        ({ data }) => {
          this.searchResults = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    generateDestinationLists() {
      const startDate = new Date(this.plan.startDate);
      const endDate = new Date(this.plan.endDate);
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      let destinationLists = [];

      for (let i = 1; i <= diffInDays + 1; i++) {
        destinationLists.push({ day: i, destinations: [] });
      }

      return destinationLists;
    },
    addDestination(destination) {
      console.log("여행지를 추가합니다:", destination);
      const dayDestination = this.destinationLists.find(
        (item) => item.day === this.selectedDay + 1
      );
      if (dayDestination) {
        dayDestination.destinations.push({
          ...destination,
          visitTime: null,
          memo: "",
        });
      }
    },
    deleteDestination(day, destinationId) {
      console.log("여행지를 삭제합니다:", day, destinationId);
      const dayDestination = this.destinationLists.find((item) => item.day === day);
      if (dayDestination) {
        const index = dayDestination.destinations.findIndex(
          (destination) => destination.id === destinationId
        );
        if (index !== -1) {
          dayDestination.destinations.splice(index, 1);
        }
      }
    },
    getDestinationsByDay(day) {
      const dayDestination = this.destinationLists.find((item) => item.day === day);
      return dayDestination ? dayDestination.destinations : [];
    },
    formatTime(value) {
      if (!value) return "";
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    saveDestinations() {
      const startDate = new Date(this.plan.startDate);

      // destinationLists를 변환하면서 날짜와 시간 계산
      const formattedDestinationLists = this.destinationLists.map((dayDestination, index) => {
        const formattedDestinations = dayDestination.destinations.map((destination) => {
          // 각 일차를 더한 날짜 계산
          const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
          const formattedDate = formatDate(date);

          // 입력된 visitTime을 활용하여 날짜와 시간을 조합
          const formattedDateTime = `${formattedDate}T${destination.visitTime}`;

          return {
            planId: this.plan.planId,
            contentId: destination.contentId,
            img: destination.img,
            content: destination.content,
            x: destination.x,
            y: destination.y,
            day: formattedDateTime,
            addr: destination.addr,
            subject: destination.subject,
          };
        });

        return formattedDestinations;
      });

      // 날짜를 원하는 형식으로 변환하는 함수
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      }

      // 변환된 데이터를 서버에 전송하는 부분은 이전 예시와 동일하게 사용하시면 됩니다.
      console.log(formattedDestinationLists);
      this.sendFormattedDestinations(formattedDestinationLists);
    },

    sendFormattedDestinations(formattedDestinationLists) {
      // 서버에 데이터 전송하는 로직을 구현해 주세요.
      // 예시: axios 또는 fetch를 사용하여 API 요청을 보내는 등의 방법을 사용할 수 있습니다.
      // 서버 요청 방식에 맞게 수정하여 사용해 주세요.
      console.log(formattedDestinationLists);
    },
  },
};
</script>

<style scoped>
.cont {
  height: 100vh; /* 화면 세로 전체 높이로 설정 */
  display: flex;
  margin: 0 auto;
}

.left-content {
  flex: 1.5;
  padding: 20px;
  height: 100vh; /* 수정 */
  overflow-y: auto; /* 추가 */
  margin-bottom: 20px; /* 추가 */
  overflow-y: auto;

  border: #c7e2ff 1px;
}
.middle-content {
  flex: 1;
  padding: 20px;
  height: 100vh; /* 수정 */
  overflow-y: auto; /* 추가 */
  margin-bottom: 20px; /* 추가 */
  border: #c7e2ff 1px;
  overflow-y: auto;
}

.right-content {
  flex: 2;
  border: #c7e2ff 1px;
  overflow-y: auto;
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
.destination-card {
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  background-color: #fff;
  position: relative;
}

.input-list-card {
  background-color: #eaf5ff;
  border: 1px solid #c7e2ff;
}

.img-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.search-button {
  min-width: 80px;
}

.search-results {
  max-height: 1000px;
  overflow-y: auto;
}

.search-result-item {
  cursor: pointer;
}

.search-result-content {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #c7e2ff;
  border-radius: 10px;
}

.search-result-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.search-result-title {
  font-size: 16px;
}

.tab-item {
  border-radius: 20px;
  background-color: #f2f2f2;
  color: #555;
  margin-bottom: 10px;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.save-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.save-button {
  min-width: 120px;
}
</style>
