<template>
  <div>
    <label>리뷰 수정하러가기 -> </label>
    <button @click="showModal" class="btn-review">* click *</button>

    <b-modal v-model="modalVisible" title="리뷰 수정" class="modal-review">
      <div class="form-group">
        <label for="destination">여행지명: {{ review.placeName }}</label>
      </div>

      <div class="form-group">
        <label for="rating">평점:</label>
        <star-rating v-model="review.rating" :increment="0.5" class="star-rating"></star-rating>
      </div>

      <div class="form-group">
        <label for="content">내용:</label>
        <textarea id="content" v-model="review.content" class="form-control"></textarea>
      </div>

      <button @click="checkValue" class="btn-submit">수정 완료</button>
      <button @click="deleteReview" class="btn-submit">삭제</button>
    </b-modal>
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
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

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
  font-size: 18px;
  background-color: #fbff00;
  text-decoration: underline;
  color: #080000;
  border: #080000;
  padding: px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-review .modal-content {
  font-family: "Arial", sans-serif;
}

.modal-review .form-group {
  margin-bottom: 16px;
}

.modal-review label {
  font-weight: bold;
}

.modal-review .form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.star-rating {
  color: #ffd700;
  cursor: pointer;
}

.btn-submit {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
