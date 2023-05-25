<template>
  <div>
    <button @click="showModal" class="btn-review">낭만 리뷰 등록하기</button>

    <b-modal
      hide-footer
      v-model="modalVisible"
      title="리뷰 작성"
      class="modal-review"
    >
      <div class="form-group">
        <label for="destination">여행지명: {{ title }}</label>
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

      <button @click="checkValue" class="btn-submit">작성 완료</button>
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
  props: {
    title: String,
  },
  data() {
    return {
      contentId: 0,
      modalVisible: false,
      review: {
        rating: 0,
        content: "",
        userId: "",
        placeId: 0,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  created() {
    this.contentId = this.$route.params.contentid;
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    checkValue() {
      // 리뷰 작성 완료 후 처리하는 로직 추가
      // 예: 서버에 전송, 모달 닫기 등
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
      // 만약, 내용이 다 입력되어 있다면 modifyArticle 호출
      else this.registerReview();
    },
    registerReview() {
      this.review.userId = this.userInfo.userId;
      this.review.placeId = this.contentId;
      http.post(`/tour/review/`, this.review).then(({ data }) => {
        console.log(data);
        this.$router.go(this.$router.currentRoute);
        this.modalVisible = false;
      });
    },
  },
};
</script>

<style>
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