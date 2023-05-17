<template>
    <div class="review-list">
      <h3>여행지 리뷰 목록</h3>
      <review-regist-modal></review-regist-modal>
      <b-table striped hover :items="reviews" :fields="reviewFields">
        <template #cell(rating)="row">
          <star-rating
          v-model="row.item.rating"
            :value="row.value"
            :increment="0.5"
            :read-only="true"
            :star-size="20"
            :show-rating="true"
            :star-color="'#f8c102'"
            :border-color="'#ccc'"
            :active-color="'#f8c102'"
            :inactive-color="'#ccc'"
          ></star-rating>
        </template>
      </b-table>
    
    </div>
  </template>
  
  <script>
  import { BTable } from 'bootstrap-vue';
  import StarRating from 'vue-star-rating';
  import ReviewRegistModal from "./ReviewRegistModal.vue";
  
  export default {
    components: {
      BTable,
    //   BButton,
      StarRating,
      ReviewRegistModal,
    },
    data() {
          return {
        test: 1,
        reviews: [
          { id: 1, userId: 'user1', rating: 4, content: '좋았어요!' },
          { id: 2, userId: 'user2', rating: 5, content: '너무 멋진 곳이었어요!' },
          { id: 3, userId: 'user3', rating: 3.5, content: '조금 아쉬웠지만 괜찮았어요.' },
          { id: 4, userId: 'user4', rating: 4.5, content: '추천합니다!' },
          { id: 5, userId: 'user5', rating: 2.5, content: '기대보다 별로였어요.' },
          { id: 6, userId: 'user6', rating: 5, content: '완전 만족스러웠습니다!' },
          { id: 7, userId: 'user7', rating: 3, content: '보통이었어요.' },
          { id: 8, userId: 'user8', rating: 4.5, content: '다음에도 꼭 다시 가고 싶어요!' },
        ],
        reviewFields: [
          { key: 'userId', label: '사용자 ID' },
          { key: 'rating', label: '평점' },
          { key: 'content', label: '내용' },
        ],
      };
    },
  };
  </script>
  
  <style>
  .review-list {
    margin-top: 20px;
  }
  
  .star-rating {
    display: inline-block;
    vertical-align: middle
  }
  