다음은 탭과 카드 삭제 버튼을 추가하여 예쁘게 꾸며진 코드입니다. 탭은 둥근
모서리와 배경색이 있는 스타일을 적용하였으며, 카드에는 삭제 버튼이
추가되었습니다. ```vue
<template>
  <div class="sidebar-container">
    <div class="main-content">
      <h2 class="text-center">여행지 정보 입력 리스트</h2>
      <b-tabs v-model="selectedDay" pills vertical>
        <b-tab
          v-for="day in dayOptions"
          :key="day.value"
          :title="day.text"
          class="tab-item"
        >
          <b-list-group>
            <b-list-group-item
              v-for="destination in getDestinationsByDay(day.value)"
              :key="destination.id"
              class="destination-list-item"
            >
              <b-card class="destination-card input-list-card">
                <h4>{{ destination.title }}</h4>
                <img
                  :src="destination.imageUrl"
                  alt="여행지 사진"
                  class="img-thumbnail"
                />
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
    </div>

    <div class="sidebar">
      <h2 class="text-center">여행지 검색 결과</h2>
      <div class="search-bar">
        <b-form-input
          v-model="searchQuery"
          placeholder="검색어를 입력하세요"
          class="search-input"
        ></b-form-input>
        <b-button
          variant="primary"
          @click="searchDestinations"
          class="search-button"
          >검색</b-button
        >
      </div>
      <b-list-group class="search-results">
        <b-list-group-item
          v-for="destination in searchResults"
          :key="destination.id"
          @click="addDestination(destination)"
          class="search-result-item"
        >
          <div class="search-result-content">
            <img
              :src="destination.imageUrl"
              alt="여행지 사진"
              class="search-result-image"
            />
            <div class="search-result-title">{{ destination.title }}</div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
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
      const dayDestination = this.destinationLists.find(
        (item) => item.day === day
      );
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
      const dayDestination = this.destinationLists.find(
        (item) => item.day === day
      );
      return dayDestination ? dayDestination.destinations : [];
    },
    formatTime(value) {
      if (!value) return "";
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding-right: 20px;
}

.sidebar {
  flex: 0 0 300px;
  background-color: #f2f2f2;
  padding: 20px;
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
  max-height: 300px;
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
</style>
