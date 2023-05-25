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
            <font-awesome-icon
              v-for="n in this.rating"
              :key="n"
              icon="fa-solid fa-star"
            />
            <font-awesome-icon
              v-for="n in 5 - this.rating"
              :key="n"
              icon="fa-regular fa-star"
            />
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
import http from "@/util/http-common";

export default {
  components: {
    BIcon,
    // StarRating,
  },
  props: {
    destinationDetail: Object,
  },
  data() {
    return {
      contentId: 0,
      rating: 0,
    };
  },
  created() {
    this.contentId = this.$route.params.contentid;
    http
      .get(`/tour/review/avg/${this.contentId}`)
      .then(({ data }) => {
        this.rating = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.destination-info-container {
  width: 600px;
  height: 90%;
  overflow-y: auto;
}
.destination-info-container::-webkit-scrollbar {
  width: 5px;
}
.destination-info-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.destination-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  background-color: #fde7fd;
}

.photo > img {
  margin-top: 30px;
  width: 380px;
  height: 280px;
}

.destination-title {
  margin-top: 10px;
  font-size: 38px;
  margin-bottom: 20px;
  margin-left: 10px;
  text-align: center;
}
.destination-addr,
.destination-tel {
  text-align: center;
}
.destination-description {
  margin: 10px;
}
.divider {
  border: 0cap;
  margin: 20px 0;
}

.destination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: gold;
}

.destination-description ::-webkit-scrollbar-thumb {
  font-size: 18px;
  margin-right: 30px;
}
</style>