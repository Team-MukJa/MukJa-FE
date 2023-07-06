<template>
  <div class="destination-reviews">
    <div class="destination-info">
      <!-- 여행지 상세 정보 컴포넌트 -->
      <DestinationInfo :destinationDetail="destinationDetail" :avg="avg" />
    </div>
    <div class="reviews">
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
    http.defaults.headers["Authorization"] =
      localStorage.getItem("access-token");
    http
      .get(`/tour/review/avg/${this.contentId}`)
      .then(({ data }) => {
        console.log(data);
        this.avg = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.destination-reviews {
  margin: 10px;
  padding: 10px;
  width: 150vb;
  max-height: 80vh; /* 최대 높이를 viewport의 80%로 설정 */
  background-color: white;
  border-radius: 10px;
  display: flex;
  margin-bottom: 100px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.destination-info {
  text-align: center;
  width: 100%;
  flex: 1;
  /* padding: 20px; */
  height: 80vh; /* 수정 */
  margin-bottom: 20px; /* 추가 */

  border: #c7e2ff 1px;
}

.reviews {
  text-align: center;
  width: 100%;
  flex: 1;
  /* padding: 20px; */
  height: 80vh; /* 수정 */
  margin-bottom: 20px; /* 추가 */

  border: #c7e2ff 1px;
}
</style>
