<template>
  <div class="place-details">
    <h2>{{ place.name }}</h2>
    <h4>Address: {{ place.address }}</h4>
    <p>{{ place.description }}</p>
    <img
      src="@/assets/travel-plans-image.jpg" alt="여행 계획 이미지" />
    <h3>Reviews</h3>
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
</script>
