<template>
  <div class="container">
    <h1>핫플레이스 목록</h1>
    <div class="card-deck">
      <b-card v-for="place in places" :key="place.placeId" class="mb-4">
        <img :src="getImageUrl(place.saveFile)" class="card-img-top" alt="place Image" />
        <!-- <img :src="places/images/${imagePath}"" class="card-img-top" alt="place Image" /> -->
        <b-card-body>
          <h5 class="card-title">{{ place.subject }}</h5>
          <p class="card-text">{{ place.content }}</p>
        </b-card-body>
        <b-card-footer>
          <small class="text-muted">{{ place.date }}</small>
        </b-card-footer>
      </b-card>
    </div>
    <div class="text-center mt-4">
      <b-button variant="primary" @click="movePlaceWrite">핫플레이스 작성</b-button>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  data() {
    return {
      places: [],
      imageUrl: "",
    };
  },
  created() {
    // let temp = [
    //   {
    //     id: 1,
    //     title: "게시글 제목 1",
    //     content: "게시글 내용 1",
    //     image: "https://placeimg.com/300/200/arch",
    //     date: "2023-05-17",
    //   },
    // ];
    http.get("/places").then(({ data }) => {
      console.log(data);
      this.places = data;
    });
  },
  methods: {
    getImageUrl(imagePath) {
      // http.get(`/places/images/${imagePath}`);
      console.log("전");
      return `http://localhost:8080/hotplaces/${imagePath}`;
      // return `places/image${imagePath}`;
    },

    movePlaceWrite() {
      this.$router.push({ name: "placewrite" });
    },
  },
};
</script>

<style>
.card-deck {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.card {
  flex: 1 0 33.33333%;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
.card-img-top {
  border-radius: 10px 10px 0 0;
}
</style>
