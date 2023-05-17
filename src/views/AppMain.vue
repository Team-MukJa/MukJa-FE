<template>
  <div class="main-container">
    <div class="card-container">
      <b-card class="main-card" @click="goToTravelPlans">
        <div class="card-image">
          <img src="../assets/travel-plans-image.jpg" alt="여행 계획 이미지" />
        </div>
        <h3 class="card-title">여행 계획</h3>
        <p class="card-slogan">여행을 계획하고 새로운 경험을 만나보세요!</p>
      </b-card>
      <b-card class="main-card" @click="goToHotPlaces">
        <div class="card-image">
          <img src="../assets/travel-plans-image.jpg" alt="핫플레이스 이미지" />
        </div>
        <h3 class="card-title">핫플레이스</h3>
        <p class="card-slogan">핫플레이스에서 인기있는 장소와 트렌드를 확인하세요!</p>
      </b-card>
      <b-card class="main-card" @click="goToSearchLocations">
        <div class="card-image">
          <img src="../assets/travel-plans-image.jpg" alt="여행지 검색 이미지" />
        </div>
        <h3 class="card-title">여행지 검색</h3>
        <p class="card-slogan">당신의 다음 여행지를 찾아보세요!</p>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToTravelPlans() {
      this.$router.push({ name: "PlanList" });
    },
    goToHotPlaces() {
      // 핫플레이스 페이지로 이동하는 메소드를 구현하세요
      this.$router.push({ name: "hotplacelist" });
    },
    goToSearchLocations() {
      // 여행지 검색 페이지로 이동하는 메소드를 구현하세요
      this.$router.push({ name: "search" });
    },
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(
    to bottom right,
    rgb(245, 230, 235),
    rgb(231, 228, 241),
    rgb(210, 218, 233),
    rgb(217, 207, 222),
    rgb(250, 207, 207),
    rgb(254, 240, 214)
  ); */
  background-repeat: no-repeat;
  background-size: cover;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.main-card {
  width: 300px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  text-align: center;
}

.card-title {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #4c4c4c;
}

.card-slogan {
  color: #888888;
}

.main-card:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
