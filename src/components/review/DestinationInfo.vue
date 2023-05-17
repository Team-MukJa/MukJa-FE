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
      name: "소쇄원",
      address: "전남 담양군 가사문학면 소쇄원길 17 (우)57392",
      rating: 5,
          description: "여행지 설명: 소쇄원은 자연과 인공을 조화시킨 조선중기의 대표적인 원림으로 우리나라 선비의 고고한 품성과 절의가 풍기는 아름다움이 있다. 정원은 계곡을 중심으로 하는 사다리꼴 형태로 되어 있다. 4.060m2의 면적에 기능과 공간의 특성에 따라 애양단구역, 오곡문구역, 제월당구역, 광풍각구역으로 구분할 수 있다. 정원 내에는 대나무, 소나무, 느티나무, 단풍나무들로 된 숲이 있다. 주위에는 흙과 돌로 쌓은 자연스러운 담이 있는데 ‘애양단’, ‘오곡문’, ‘소쇄처사양공지려’의 석판과 목판글씨가 담벽에 박혀있다. 소쇄원 안에는 영조 31년(1755) 당시 소쇄원의 모습을 목판에 새긴 그림이 남아 있어, 원래의 모습을 알 수 있다.선비의 고고한 품성과 절의가 엿보이는 아름다운 정원으로, 조선시대를 대표할 수 있는 정원이다.",
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
  width: 800px;
  height: 200px;
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
  font-size: 20px;
}
</style>
