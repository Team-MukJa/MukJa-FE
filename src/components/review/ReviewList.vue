<template>
  <div class="review-list">
    <h3>여행지 리뷰 목록</h3>
    <b-table striped hover :items="reviews" :fields="reviewFields">
      <template #cell(rating)="row">
        <star-rating
          :value="row.value"
          :increment="0.5"
          :read-only="true"
          :star-size="20"
          :show-rating="true"
          active-color="#f8c102"
          inactive-color="#ccc"></star-rating>
      </template>
    </b-table>
    <div v-if="!hasReview">
      <b-button variant="primary" @click="writeReview">리뷰 작성하기</b-button>
    </div>
  </div>
</template>

<script>
import { BTable, BButton } from "bootstrap-vue";
import StarRating from "vue-star-rating";

export default {
  components: {
    BTable,
    BButton,
    StarRating,
  },
  data() {
    return {
      reviews: [
        { id: 1, userId: "user1", rating: 4, content: "좋았어요!" },
        { id: 2, userId: "user2", rating: 5, content: "너무 멋진 곳이었어요!" },
        {
          id: 3,
          userId: "user3",
          rating: 3.5,
          content: "조금 아쉬웠지만 괜찮았어요.",
        },
      ],
      reviewFields: [
        { key: "userId", label: "사용자 ID" },
        { key: "rating", label: "평점" },
        { key: "content", label: "내용" },
      ],
    };
  },
  computed: {
    hasReview() {
      return this.reviews.some((review) => review.rating !== undefined);
    },
  },
  methods: {
    writeReview() {
      // 리뷰 작성하기 버튼 클릭 시 동작
      console.log("리뷰 작성하기 버튼이 클릭되었습니다.");
    },
  },
};
</script>

<style>
.review-list {
  margin-top: 20px;
}

.star-rating {
  display: inline-block;
  vertical-align: middle;
  margin: -2px 0;
}
</style>
