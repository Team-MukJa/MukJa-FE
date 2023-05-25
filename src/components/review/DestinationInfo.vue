<template>
  <div class="destination-info">
    <div class="photo">
      <img :src="destinationDetail.firstImage" alt="Destination Photo" class="img-fluid" />
    </div>
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
        <span v-if="destinationDetail.tel">{{ destinationDetail.tel }}</span>
        <span v-else>-</span>
      </p>
      <hr class="divider" />
      <div class="destination-item">
        <b-icon icon="star-fill" aria-hidden="true"></b-icon>
        <!-- <star-rating v-model="avg" :increment="0.5" class="star-rating"></star-rating> -->
      </div>
      <hr class="divider" />
      <p class="destination-description">{{ destinationDetail.overview }}</p>
    </div>
    <!-- <review-regist-modal></review-regist-modal> -->
  </div>
</template>

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
    return {
    };
  },
  created() {
  },
};
</script>

<style>
.destination-info {
  display: flex;
  align-items: center;
  padding: 20px;
}

.photo {
  width: 800px;
  height: 200px;
  flex: 1;
  padding-right: 20px;
}

.photo img {
  max-width: 100%;
  height: auto;
}

.details {
  flex: 2;
}

.destination-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
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

.destination-description {
  font-size: 20px;
}
</style>
