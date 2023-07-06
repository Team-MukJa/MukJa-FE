<template>
  <div class="destination-info-container">
    <div class="destination-info">
      <div class="photo-column">
        <div class="photo">
          <img
            :src="destinationDetail.firstImage"
            alt="Destination Photo"
            class="img-fluid"
          />
        </div>
      </div>
      <div class="details-column">
        <div class="details">
          <h2 class="destination-title">{{ destinationDetail.title }}</h2>
          <hr class="divider" />
          <p class="destination-addr">
            <b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon>
            {{ destinationDetail.zipcode }}<br />
            {{ destinationDetail.addr1 + " " + destinationDetail.addr2 }}
          </p>
          <hr class="divider" />
          <p class="destination-tel">
            <span v-if="destinationDetail.tel">{{
              destinationDetail.tel
            }}</span>
            <span v-else>-</span>
          </p>
          <hr class="divider" />
          <div class="destination-item">
            <b-icon icon="star-fill" aria-hidden="true"></b-icon>
            <star-rating
              :rating="fixedAvgReview"
              :increment="0.5"
              class="star-rating"
            ></star-rating>
          </div>
          <hr class="divider" />
          <p class="destination-description">
            {{ destinationDetail.overview }}
          </p>
        </div>
      </div>
      <!-- <review-regist-modal></review-regist-modal> -->
    </div>
  </div>
</template>

<!-- 나머지 코드는 동일 -->

<script>
import BIcon from "bootstrap-vue";
import StarRating from "vue-star-rating";
// import StarRating from "./StarRating.vue";
export default {
  components: {
    BIcon,
    StarRating,
  },
  props: {
    avg: {
      type: Number,
      required: true,
    },
    destinationDetail: Object,
  },
  data() {
    return {};
  },
  computed: {
    fixedAvgReview() {
      return this.avg;
    },
  },
};
</script>

<style scoped>
.destination-info-container {
  max-height: 450px;
  padding: 10px;
  margin: 10px;
}

.destination-info {
  margin-top: 10px;
  width: 100%;
  height: 450px;
}
.photo-column {
  flex: 1;
  display: flex;
  justify-content: center;
}

.photo {
  margin-top: 20px;
  width: 300px;
  height: 300px;
}

.img-fluid {
  border-radius: 10%;
  width: 200px;
  height: 100px;
}

.details-column {
  flex: 1;
}

.destination-title {
  font-size: 38px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.divider {
  border: 0cap;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.destination-item {
  /* display: flex; */
  /* align-items: center; */
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 200px;
}

.star-rating {
  margin-left: 10px;
  font-size: 45px;
  font-style: normal;
}

.destination-description ::-webkit-scrollbar-thumb {
  font-size: 18px;
  margin-right: 30px;
}
</style>
