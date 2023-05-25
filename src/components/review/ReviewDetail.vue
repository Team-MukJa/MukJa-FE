<template>
  <div>
    <div class="destination-info">
      <!-- 여행지 상세 정보 컴포넌트 -->
      <DestinationInfo :destinationDetail="destinationDetail" :avg="avg" />
    </div>
    <div class="reviews">
      <br />
      <!-- 여행지 리뷰 컴포넌트 -->
      <ReviewList :placeTitle="placeTitle" />
    </div>
  </div>
</template>

<script>
import DestinationInfo from "@/components/review/DestinationInfo.vue";
import ReviewList from "@/components/review/ReviewList.vue";
import http from "@/util/http-common";

export default {
  components: {
    DestinationInfo,
    ReviewList,
  },
  data() {
    return {
      contentId: 0,
      destinationDetail: {}, // 상세 정보를 담는 객체
      avg: 0,
      placeTitle: "",
      reviews: [], // 리뷰 목록을 담는 배열
    };
  },
  created() {
    this.contentId = this.$route.params.contentid;
    http
      .get(`/tour/${this.contentId}`)
      .then(({ data }) => {
        this.destinationDetail = data;
        this.placeTitle = this.destinationDetail.title;
      })
      .catch(function (error) {
        console.log(error);
      });
    http
      .get(`/tour/review/avg/${this.contentId}`)
      .then(({ data }) => {
        this.avg = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.destination-info {
  outline: border 3px black;
}
</style>
