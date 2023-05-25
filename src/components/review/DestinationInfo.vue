<template>
  <div class="destination-info-container">
    <div class="destination-info">
      <div class="photo-column">
        <div class="photo">
          <img
            :src="destinationDetail.firstImage"
            alt="Destination Photo"
            class="img-fluid" />
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
            <!-- <star-rating v-model="avg" :increment="0.5" class="star-rating"></star-rating> -->
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
// import StarRating from "vue-star-rating";

export default {
  components: {
    BIcon,
    // StarRating,
  },
  props: {
    destinationDetail: Object,
    avg: Number,
  },
  data() {
    return {};
  },
  created() {},
};
</script>
<style>
.destination-info-container {
  margin-top: 30px;
  max-height: 450px; /* Define the maximum height for the scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
}

.destination-info {
  display: flex;
  margin-top: 30px;
  width: 1200px;
  height: 450px;
  background-color: #fde7fd;
}
.photo-column {
  flex: 1;
  display: flex;
  justify-content: center;
}

.photo {
  margin-top: 30px;
  width: 380px;
  height: 300px;
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
  /* border-top: 1px solid #ccc; */
  margin: 20px 0;
}

.destination-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
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
