<template>
  <div class="main-carousel">
    <div class="carousel-container" ref="carouselContainer">
      <div class="slides" :style="{ transform: `translateX(${translateX}px)` }">
        <div class="slide">
          <div class="slide-content">
            <h3>{{ slides[0].title }}</h3>
            <p>{{ slides[0].description }}</p>
            <button class="slide-button" @click="goToTravelPlans">
              <strong>당장 확인하기</strong>
            </button>
          </div>
        </div>
        <div class="slide">
          <div class="slide-content">
            <h3>{{ slides[1].title }}</h3>
            <p>{{ slides[1].description }}</p>
            <button class="slide-button" @click="goToHotPlaces">
              <strong>당장 확인하기</strong>
            </button>
          </div>
        </div>
        <div class="slide">
          <div class="slide-content">
            <h3>{{ slides[2].title }}</h3>
            <p>{{ slides[2].description }}</p>
            <button class="slide-button" @click="goToSearchLocations">
              <strong>당장 확인하기</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="indicators">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      slides: [
        {
          title: "여행 계획",
          description: "여행을 계획하고 새로운 경험을 만나보세요!",
        },
        {
          title: "핫플레이스",
          description: "핫플레이스에서 인기있는 장소와 트렌드를 확인하세요!",
        },
        {
          title: "여행지 검색",
          description: "당신의 다음 여행지를 찾아보세요!",
        },
      ],
      currentIndex: 0,
      translateX: 0,
      slideWidth: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.slideWidth = this.$refs.carouselContainer.offsetWidth;
      this.startCarousel();
    });
  },

  methods: {
    startCarousel() {
      setInterval(this.slideNext, 4000);
    },
    slideNext() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.translateX = -this.currentIndex * this.slideWidth;
    },

    goToSlide(index) {
      this.currentIndex = index;
      this.translateX = -this.currentIndex * this.slideWidth;
    },
    goToTravelPlans() {
      this.$router.push({ name: "PlanList" });
    },
    goToHotPlaces() {
      this.$router.push({ name: "hotplacelist" });
    },
    goToSearchLocations() {
      this.$router.push({ name: "search" });
    },
  },
};
</script>
<style scoped>
.main-carousel {
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  flex: 0 0 100%;
}

.slide-content {
  padding-top: 200px;
  text-align: left;
}

h3 {
  font-size: 60px;
  color: rgb(248, 240, 240);
  margin-top: 20px;
}

p {
  font-size: 25px;
  color: rgb(248, 240, 240);
  margin-top: 10px;
}

.slide-button {
  font-size: 19px;
  width: 200px;
  height: 50px;
  margin-top: 50px;
  padding: 8px;
  border: none;
  border-radius: 20px;
  background-color: rgb(248, 240, 240);
  color: black;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.slide-button:hover {
  background-color: rgb(252, 169, 169);
}

.indicators {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}

.indicator {
  width: 10px;
  height: 10px;
  background-color: rgb(248, 240, 240);
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.indicator.active {
  background-color: rgb(252, 169, 169);
  transform: scale(1.5); /* 선택된 인디케이터 크기 조정 */
}

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
</style>
