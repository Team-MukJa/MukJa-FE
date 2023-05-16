<template>
  <b-card class="main-card">
    <div class="card-image">
      <img src="@/assets/travel-plans-image.jpg" alt="여행 계획 이미지" />
    </div>
    <h3 class="card-title">{{ item.subject }}</h3>
    <p class="card-slogan">{{ item.userId }} | {{ item.hit }} | {{ item.registerTime }}</p>
  </b-card>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    item: Object,
  },
};
</script>

<style>
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
