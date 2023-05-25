<template>
  <div>
    <div class="review">
      <button @click="showModal" class="btn-review">리뷰 작성하기</button>

      <b-modal
        v-model="modalVisible"
        title="낭만 리뷰 수정"
        class="modal-review"
      >
        <div class="form-group">
          <label for="destination">여행지명: {{ review.placeName }}</label>
        </div>

        <div class="form-group">
          <label for="rating">평점:</label>
          <star-rating
            v-model="review.rating"
            :increment="0.5"
            class="star-rating"
          ></star-rating>
        </div>

        <div class="form-group">
          <label for="content">내용:</label>
          <textarea
            id="content"
            v-model="review.content"
            class="form-control"
          ></textarea>
        </div>

        <button @click="checkValue" class="btn-submit">수정 완료</button>
        <button @click="deleteReview" class="btn-submit">삭제</button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import http from "@/util/http-common";
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      contentId: 0,
      modalVisible: false,
      review: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  created() {
    this.contentId = this.$route.params.contentid;
    http
      .get(`/tour/review/${this.contentId}/${this.userInfo.userId}`)
      .then(({ data }) => {
        this.review = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    checkValue() {
      let err = true;
      let msg = "";
      !this.review.rating &&
        ((msg = "평점 입력해주세요"), (err = false), this.$refs.rating.focus());
      err &&
        !this.review.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.modifyReview();
    },
    modifyReview() {
      http.put(`/tour/review/`, this.review).then(({ data }) => {
        console.log(data);
        this.$router.go(this.$router.currentRoute);
        this.modalVisible = false;
      });
    },
    deleteReview() {
      this.review.userId = this.userInfo.userId;
      this.review.placeId = this.contentId;
      http.delete(`/tour/review/${this.review.reviewId}`).then(({ data }) => {
        console.log(data);
        this.$router.go(this.$router.currentRoute);
        this.modalVisible = false;
      });
    },
  },
};
</script>

<style>
.btn-review {
  font-family: "Arial", sans-serif;
  font-size: 15px;
  margin-left: 5px;
  margin-bottom: 5px;
  background-color: #8d5ed8; /* 연핑크 배경색 */
  color: #ffffff; /* 흰색 텍스트 색상 */
  border: none;
  border-radius: 40px;
  cursor: pointer;
  outline: none; /* 클릭 시 포커스 효과 제거 */
  transition: background-color 0.3s, color 0.3s; /* 원활한 전환을 위한 트랜지션 */
}

.star-rating {
  color: #ffd700;
  cursor: pointer;
}

.btn-submit {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  background-color: #7d5df3;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
}
</style>