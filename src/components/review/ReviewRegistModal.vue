<template>
  <div>
    <label>리뷰 등록하러가기 -> </label>
    <button @click="showModal" class="btn-review">* click *</button>

    <b-modal v-model="modalVisible" title="리뷰 작성" class="modal-review">
      <div class="form-group">
        <label for="destination">여행지명:</label>
        <input
          id="destination"
          v-model="review.destination"
          type="text"
          class="form-control" />
      </div>

      <div class="form-group">
        <label for="rating">평점:</label>
        <star-rating
          v-model="review.rating"
          :increment="0.5"
          class="star-rating"></star-rating>
      </div>

      <div class="form-group">
        <label for="description">안내 문구:</label>
        <textarea
          id="description"
          v-model="review.description"
          class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label for="content">내용:</label>
        <textarea
          id="content"
          v-model="review.content"
          class="form-control"></textarea>
      </div>

      <button @click="submitReview" class="btn-submit">작성 완료</button>
    </b-modal>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      modalVisible: false,
      review: {
        destination: "",
        rating: 0,
        description: "",
        content: "",
      },
    };
  },
  components: {
    StarRating,
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    submitReview() {
      // 리뷰 작성 완료 후 처리하는 로직 추가
      // 예: 서버에 전송, 모달 닫기 등
      this.modalVisible = false;
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
