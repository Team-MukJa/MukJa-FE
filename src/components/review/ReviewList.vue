<template>
  <div class="review-list-container">
    <div class="review-list">
      <h3>낭 만 리 뷰</h3>
      <div>
        <div v-show="myReview">
          <div class="content">
            <span>{{ myReview.content }}</span>
          </div>
          <div class="userid">{{ myReview.userId }}</div>
          <review-modify-modal></review-modify-modal>
        </div>
        <div v-show="!myReview">
          <review-regist-modal :title="placeTitle"></review-regist-modal>
        </div>
      </div>
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
            :inactive-color="'#ccc'"></star-rating>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import StarRating from "vue-star-rating";
import ReviewRegistModal from "./ReviewRegistModal.vue";
import ReviewModifyModal from "./ReviewModifyModal.vue";
import http from "@/util/http-common";
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  components: {
    BTable,
    StarRating,
    ReviewRegistModal,
    ReviewModifyModal,
  },
  props: {
    placeTitle: String,
  },
  data() {
    return {
      contentId: 0,
      test: 1,
      myReview: {},
      reviews: [],
      reviewFields: [
        { key: "userId", label: "* 사용자 ID" },
        { key: "rating", label: "* 평점" },
        { key: "content", label: "* 리뷰" },
      ],
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
        this.myReview = data;
      })
      .catch(function (error) {
        console.log(error);
      });
    http
      .get(`/tour/review/${this.contentId}`)
      .then(({ data }) => {
        this.reviews = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.review-list {
  background-color: #ebfbfc;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Rest of your existing styles */
.content {
  margin-bottom: 10px;
}

.userid {
  font-weight: bold;
}
</style>
