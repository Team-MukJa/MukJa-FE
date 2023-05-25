<template>
  <div class="main">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="section section-announcement theme-dark"
      data-analytics-section-engagement="name:announcement hero"
    >
      <div class="section-content">
        <h2 class="typography-hero-product-headline">
          {{ section.title }}
        </h2>
      </div>

      <div class="typography-body">
        <a
          href="#"
          @click="goToSection(section.link)"
          class="section-link"
          data-analytics-intrapage-link=""
        >
          {{ section.buttonText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: "떠나고 싶은곳을 찾아보세요",
          link: "AppSearch",
          buttonText: "여행지 검색하기 ",
        },
        {
          title: "아무도 몰랐던 맛집, 쉼터를 공유해 보세요",
          link: "places",
          buttonText: "나만의 장소 공유 하기",
        },
        {
          title: "나만의 여행계획을 공유해보세요",
          link: "AppPlan",
          buttonText: "여행 계획 작성하기",
        },
      ],
    };
  },
  methods: {
    goToSection(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style>
.section {
  height: 33vh;
  width: 200vh;
  background-color: #000000;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.section-content {
  margin-bottom: 10px;
}

.typography-hero-product-headline {
  text-align: center;
  font-size: 2rem;
}

.typography-body {
  text-align: center;
}

.section-link {
  display: inline-block;
  padding: 8px 24px;
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s ease-in-out;
}

.section-link:hover {
  background-color: #e5e5e5;
}
</style>
