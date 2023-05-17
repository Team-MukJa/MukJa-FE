<template>
  <div class="cont">
    <!-- 여행 계획 리스트 -->
    <div class="left-content">
      <h2 class="text-center">여행지 정보 입력 리스트</h2>
      <b-tabs v-model="selectedDay" pills vertical>
        <b-tab v-for="day in dayOptions" :key="day.value" :title="day.text" class="tab-item">
          <b-list-group>
            <b-list-group-item
              v-for="destination in getDestinationsByDay(day.value)"
              :key="destination.id"
              class="destination-list-item"
            >
              <b-card class="destination-card input-list-card">
                <h4>{{ destination.title }}</h4>
                <img :src="destination.imageUrl" alt="여행지 사진" class="img-thumbnail" />
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
      <h2 class="text-center">여행지 검색 결과</h2>
      <div class="search-bar">
        <b-form-input
          v-model="searchQuery"
          placeholder="검색어를 입력하세요"
          class="search-input"
        ></b-form-input>
        <b-button variant="primary" @click="searchDestinations" class="search-button">
          검색
        </b-button>
      </div>
      <b-list-group class="search-results">
        <b-list-group-item
          v-for="destination in searchResults"
          :key="destination.id"
          @click="addDestination(destination)"
          class="search-result-item"
        >
          <div class="search-result-content">
            <img :src="destination.imageUrl" alt="여행지 사진" class="search-result-image" />
            <div class="search-result-title">{{ destination.title }}</div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="right-content">
      <plan-map></plan-map>
    </div>
  </div>
</template>

<script>
import PlanMap from "./PlanRegistMap.vue";

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [
        { id: 1, title: "여행지 1", imageUrl: "image1.jpg" },
        { id: 2, title: "여행지 2", imageUrl: "image2.jpg" },
        { id: 3, title: "여행지 3", imageUrl: "image3.jpg" },
      ],
      destinationLists: [
        { day: 1, destinations: [] },
        { day: 2, destinations: [] },
        { day: 3, destinations: [] },
      ],
      selectedDay: 0,
      dayOptions: [
        { value: 1, text: "1일차" },
        { value: 2, text: "2일차" },
        { value: 3, text: "3일차" },
      ],
    };
  },
  components: {
    PlanMap,
  },
  methods: {
    searchDestinations() {
      console.log("검색 결과를 가져옵니다:", this.searchQuery);
      // 검색 결과를 가져오는 로직 추가
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
      const savedDestinations = this.destinationLists.map((dayDestination) => ({
        day: dayDestination.day,
        destinations: dayDestination.destinations.map((destination) => ({
          id: destination.id,
          title: destination.title,
          visitTime: destination.visitTime,
          memo: destination.memo,
        })),
      }));
      console.log("저장된 여행지 정보:", savedDestinations);
      // 저장된 여행지 정보를 전송하는 로직 추가
      this.$router.push({ name: "PlanList" });
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
