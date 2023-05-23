<template>
  <div class="container">
    <h1>핫플레이스 목록</h1>
    <div class="row">
      <div class="col-lg-3 col-md-6 mb-4" v-for="place in places" :key="place.placeId">
        <div class="card" @click="showDetail(place)">
          <img
            :src="require(`@/assets/img/springboot/img/${place.saveFolder}/${place.saveFile}`)"
            class="card-img-top"
            alt="place Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ place.subject }}</h5>
            <p class="card-text">{{ place.content }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ place.date }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <b-button variant="primary" @click="movePlaceWrite">핫플레이스 작성</b-button>
    </div>
    <!-- 상세보기 모달 -->
    <b-modal
      v-model="showModal"
      title="상세보기"
      @shown="setSelectedPlace"
      hide-footer
      header-bg-variant="transparent"
    >
      <div class="modal-body" v-if="selectedPlace">
        <h5>{{ selectedPlace.subject }}</h5>
        <p>{{ selectedPlace.content }}</p>
        <div class="image-container">
          <img
            :src="
              require(`@/assets/img/springboot/img/${selectedPlace.saveFolder}/${selectedPlace.saveFile}`)
            "
            alt="place Image"
            class="place-image"
          />
        </div>
      </div>
      <div class="modal-footer" v-if="selectedPlace">
        <b-button variant="danger" @click="deletePlace">삭제</b-button>
        <b-button variant="primary" @click="closeModal">닫기</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  data() {
    return {
      places: [],
      showModal: false,
      selectedPlace: null,
    };
  },
  created() {
    http.get("/places").then(({ data }) => {
      console.log(data);
      this.places = data;
    });
  },

  methods: {
    setSelectedPlace() {
      this.selectedPlace = { ...this.selectedPlace };
    },
    showDetail(place) {
      this.selectedPlace = place;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deletePlace() {
      // 게시물 삭제 로직 작성
    },
    movePlaceWrite() {
      this.$router.push({ name: "placewrite" });
    },
  },
};
</script>

<style>
.card {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: #f8f9fa;
}

.card:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: bold;
}

.card-text {
  color: #555;
}

.card-footer {
  border-top: 1px solid #dee2e6;
  padding: 0.5rem;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  justify-content: space-between;
}

.modal-footer button {
  margin-right: 10px;
}

.image-container {
  text-align: center;
  margin-bottom: 1rem;
}

.place-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
