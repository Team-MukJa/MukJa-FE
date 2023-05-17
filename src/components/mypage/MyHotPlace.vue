<template>
  <div class="container">
    <div class="card-container">
      <b-card
        class="main-card"
        v-for="item in myHotPlace"
        :key="item.placeId"
        @click="goToHotplace"
      >
        <div class="card-image">
          <img src="@/assets/travel-plans-image.jpg" alt="핫플레이스 이미지" />
        </div>
        <h3 class="card-title">{{ item.subject }}</h3>
        <p class="card-slogan">{{ item.userId }} | {{ item.hit }}</p>
        <p class="card-slogan">{{ item.registerTime }}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHotPlace",
  components: {},
  props: {
    myHotPlace: Array,
  },
  data() {
    return {
      message: "MyHotPlace",
    };
  },
  created() {},
  methods: {
    goToHotplace() {
      // this.$router.push({ name: "hotplacelist" });
      // const plcaeId = item.plcaeId;
      // this.$router.push({ name: "otplaceview", params: { plcaeid: plcaeId } });
    },
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  row-gap: 10px;
  justify-content: center;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(100px, auto));
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
  flex: 0 0 auto;
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
