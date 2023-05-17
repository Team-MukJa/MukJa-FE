<template>
  <div class="destination-info">
    <div class="photo">
      <img :src="photo" alt="Destination Photo" class="img-fluid" />
    </div>
    <div class="details">
      <h2 class="destination-title">{{ name }}</h2>
      <hr class="divider" />
      <p class="destination-item">
        <b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> {{ address }}
      </p>
      <hr class="divider" />
      <div class="destination-item">
        <b-icon icon="star-fill" aria-hidden="true"></b-icon>
        <star-rating
          v-model="rating"
          :increment="0.5"
          class="star-rating"></star-rating>
      </div>
      <hr class="divider" />
      <p class="destination-description">{{ description }}</p>
    </div>
    <!-- <review-regist-modal></review-regist-modal> -->
  </div>
</template>

<script>
import BIcon from "bootstrap-vue";
import StarRating from "vue-star-rating";
// import ReviewRegistModal from "./ReviewRegistModal.vue";

export default {
  components: {
    BIcon,
    StarRating,
    // ReviewRegistModal,
  },
  data() {
      return {
        //require안들어가면 사진이 안들어감
      photo: require("@/assets/travel-plans-image.jpg"),
      name: "여행지 제목",
      address: "광주 광역시 광산구 첨단 어쩌구 저쩌구",
      rating: 5,
          description: "여행지 설명: 안녀아세요 저는 아름답고 멋진 풍경이에요",
    };
  },
};
</script>

<style>
/* 필요한 스타일을 작성해주세요. */
.destination-info {
  display: flex;
  align-items: center;
  padding: 20px;
}

.photo {
  width: 1000px;
  height: 1000;
  flex: 1;
  padding-right: 20px;
}

.photo img {
  max-width: 100%;
  height: auto;
}

.details {
  flex: 2;
}

.destination-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.destination-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
}

.star-rating {
  margin-left: 10px;
  font-size:45px;
  font-style: normal;
}

.destination-description {
  font-size: 16px;
}
</style>
