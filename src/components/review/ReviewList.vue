<template>
  <div class="review-list-container">
    <div class="review-list">
      <h2 class="review-title text-center">낭 만 리 뷰</h2>
      <div class="myreview-div">
        <div v-show="myReview" class="myreview-on">
          <div class="review-content">
            {{ myReview.userId }} |
            <span class="content"> {{ myReview.content }} | </span>
            <span v-if="myReview"
              ><font-awesome-icon
                v-for="n in myReview.rating"
                :key="n"
                icon="fa-solid fa-star" />
              <font-awesome-icon
                v-for="n in 5 - myReview.rating"
                :key="n"
                icon="fa-regular fa-star"
            /></span>
          </div>
          <div class="review-actions">
            <review-modify-modal></review-modify-modal>
          </div>
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
            :inactive-color="'#ccc'"
          ></star-rating>
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
        console.log("myreview", data);
        this.myReview = data;
      })
      .catch(function (error) {
        console.log(error);
      });
    http
      .get(`/tour/review/${this.contentId}`)
      .then(({ data }) => {
        console.log("reviews", data);
        this.reviews = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>


<style scoped>
.review-list-container {
  background-color: #ebfbfc;
  height: 485px;
  width: 700px;
  border-radius: 30px;
  overflow: auto;
}

.content {
  margin-bottom: 10px;
}

.userid {
  font-weight: bold;
}

.review-title {
  margin-left: 5px;
  margin-top: 20px;
  font-weight: bold;
}

.myreview-on {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  padding: 10px;
}
.review-content {
  flex: 1;
}

.review-actions {
  margin-left: auto;
}
</style>