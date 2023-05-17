<template>
  <div>
    <div class="destination-info">
      <!-- 여행지 상세 정보 컴포넌트 -->
      <DestinationInfo />
    </div>
    <div class="reviews">
      <!-- 여행지 리뷰 컴포넌트 -->
      <ReviewList />
    </div>
  </div>
</template>

<script>
import DestinationInfo from "@/components/review/DestinationInfo.vue";
import ReviewList from "@/components/review/ReviewList.vue";

export default {
  components: {
    DestinationInfo,
    ReviewList,
  },
  data() {
    return {
      destination: {
        photo: "",
        name: "",
        address: "",
        rating: 1,
        description: "",
      }, // 상세 정보를 담는 객체
      reviews: [], // 리뷰 목록을 담는 배열
    };
  },
  // 필요한 데이터를 가져오는 메소드 등을 추가로 작성해주세요.
  // 예: created() {
  //       this.fetchDestinationInfo();
  //       this.fetchReviews();
  //     }
};
</script>

<style>
.destination-info {
  outline: border 1px black;
}
</style>
