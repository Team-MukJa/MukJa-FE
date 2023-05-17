<!-- <template>
    <div class="place-details">
      <h2>{{ place.name }}</h2><br>
      <h3>Review 목록</h3>
      <ul>
        <li v-for="review in place.reviews" :key="review.id">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
      </ul>
  
      <h3>Let's write my Review</h3>
      <form @submit.prevent="submitReview">
        <button type="submit">리뷰 등록</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        place: {
          id: 1,
          name: "소쇄원",
          address: "전남 담양군 가사문학면 소쇄원길 17 (우)57392",
          description:
            "소쇄원은 자연과 인공을 조화시킨 조선중기의 대표적인 원림으로 우리나라 선비의 고고한 품성과 절의가 풍기는 아름다움이 있다.",
          reviews: [
            {
              id: 1,
              name: "코코",
              rating: 5,
              review: "Great place!",
            },
            {
              id: 2,
              name: "여름",
              rating: 4,
              review: "Good place, but could be better.",
                },
                {
              id:3,
              name: "가을",
              rating: 2,
              review: "Good , but!! soso.. but!! Bad.. BUt!! Nice",
            },
          ],
        },
        review: {
          name: "",
          rating: 5,
          review: "",
        },
      };
    },
  };
  </script> -->

<template>
  <div>
    <h1>REVIEW ^^</h1>
    <button @click="showModal = true">Open Modal</button>

    <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Write a Review</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReview">
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="review.name"
                  required />
              </div>
              <div class="form-group">
                <label for="rating">Rating:</label>
                <select
                  id="rating"
                  class="form-control"
                  v-model.number="review.rating"
                  required>
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
              <div class="form-group">
                <label for="review">Review:</label>
                <textarea
                  id="review"
                  class="form-control"
                  v-model="review.review"
                  required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      review: {
        name: "",
        rating: 5,
        review: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    submitReview() {
      // Perform review submission logic here
      // For example, you can emit an event or make an API request
      console.log("Review submitted:", this.review);

      // Reset review form
      this.review.name = "";
      this.review.rating = 5;
      this.review.review = "";

      // Close the modal
      this.showModal = false;
    },
  },
};
</script>
