<template>
  <div>
    <ul>
      <li
        v-for="item in myReview"
        :key="item.reviewId"
        @click="goToPlaceDetail(item.placeId)"
      >
        <div class="rating">
          <font-awesome-icon
            v-for="n in item.rating"
            :key="n"
            icon="fa-solid fa-star"
          />
          <font-awesome-icon
            v-for="n in 5 - item.rating"
            :key="n"
            icon="fa-regular fa-star"
          />
          <i style="color: black; font-style: normal"
            >&nbsp;&nbsp;{{ item.placeTitle }}</i
          >
        </div>
        <div class="content">
          <span>{{ item.content }}</span>
        </div>
        <div class="userid">{{ item.userId }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyReview",
  components: {},
  props: {
    myReview: Array,
  },
  data() {
    return {
      message: "MyReview",
    };
  },
  created() {},
  methods: {
    goToPlaceDetail(id) {
      this.$router.push({ name: "ReviewDetail", params: { contentid: id } });
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  display: flex;
  align-items: center;
  color: gold;
  width: 40%;
  white-space: nowrap; /* 줄바꿈 없이 한 줄로 유지 */
  overflow: hidden; /* 내용이 넘칠 경우 가려진 부분 숨김 */
  text-overflow: ellipsis; /* 내용이 넘칠 경우 생략 부호(...) 표시 */
}
.content {
  text-align: left;
  white-space: nowrap; /* 줄바꿈 없이 한 줄로 유지 */
  overflow: hidden; /* 내용이 넘칠 경우 가려진 부분 숨김 */
  text-overflow: ellipsis; /* 내용이 넘칠 경우 생략 부호(...) 표시 */
  width: 40%;
}

.userid {
  text-align: right;
  width: 10%;
}
</style>
